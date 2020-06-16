+++
author = "Andryo Marzuki"
title = "ASP.NET Core Web API JWT Implementation"
date = "2020-06-16"
description = "Using a custom minimal JWT implementation in a ASP.NET Core WebApi rather than using the in-build Identity service."
tags = [
    "aspnet", "jwt",
]
+++

# Sir, may I see some identification?

I've recently made the jump from using Django to ASP.NET Core as my primary choice when developing web applications. This was initially due to me branching into using C# for things like Unity, and later realizing how much enjoyable it was to use ASP.NET Core over Django.

As I mostly use ReactJS for my application frontends, I did not need the 'Razor' pages integrated in ASP.NET. As a result, my preference was to bootstrap my projects as `webapi` rather than `webapp` or even `mvc`.

ASP.NET Core 3.1 is packaged the `Identity` service. Micrsoft's documentation on how to use this library with single page applications can be found [here](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-3.1). My general issue with this is the fact that you need to implement usage of [IdentityServer](https://identityserver.io/), and by bootstrapping your project in this manner you are using their `mvc` or `webapp` templates which contain a fair bit of bloat.

This post will outline my implementation of a lightweight JWT authentication which is intended to be easily added onto a bare-bones `webapi` project.

**Note**: At time of writing, I am using ASP.NET Core version 3.1.5. If you are using an older version of ASP.NET core, some things *may* not work.

# Implementation Summary

My implementation of JWT consists of the following components:

1. `PasswordHasher`helper to create a salt, and then a hashed password for safe storage.
2. `User` model to define what data we'd like to store in regards to our user object.
3. `UserService` to handle authentication, registration, and any other user action we might want to implement.
5. `UsersController` to map our endpoints to our service.

In addition to the above, we need to adjust our:

1. `DbContext` to include the `User` model.
2. Configure our `Startup`to use `JwtBearer` as an authentication mechanism.
3. Configure our `Startup` to use `UseAuthentication()` and `UseAuthentication()`.
4. Inject our scoped `UserService` into `Startup.`
5. Adjust any other controllers which require authorization to include `[Authorize]` in its definition.

This tutorial will cover implementing the above which will provide you the following endpoints:

1. `POST /api/user/register/` for creation of new user objects.
2. `POST /api/user/login/` to allow users to login and authenticate themselves.
3. `GET /api/user/info/` to retrieve a user's detail from their `Bearer` token.

# Component Explanation
## `PasswordHasher` Helper

The password which we'll be storing will be encrypted using a salt we will generate. It should go without saying, but do not store passwords in plaintext.

In order for us to achieve this, we'll need to create a helper function which will:

1. Generate a `byte[]` salt
2. And then hash the password using this salt, providing us a hashed password.

```cs
using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace JwtAuthExample.Helpers
{
    public interface IPasswordHasher
    {
        byte[] GenerateSalt();
        string HashPassword(string password, byte[] salt);
    }

    public class PasswordHasher : IPasswordHasher
    {
        public byte[] GenerateSalt()
        {
            var salt = new byte[128 / 8];
            using (var rng = RNGCryptoServiceProvider.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        public string HashPassword(string password, byte[] salt)
        {
            var hashedPassword = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 258 / 8
            );
            return Convert.ToBase64String(hashedPassword);
        }
    }
}
```

In the example above we take advantage of ASP.NET Core's cryptographic library and use their `Pbkdf2` key derivation function and the `HMACSHA1` algorithm to hash our password using the salt we generate with our `GenerateSalt()` function.

## `User` Model

I consider this definition my 'base' `User` model. I will normally extend this model as needed by creating another model such as `ApplicationUser` which inherits from `User`.

The data we want to capture is as follows:

1. `string` Username
2. `string` Password
3. `byte[]` Salt
4. `string` Token

Our model definition is as follows:

```cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace JwtAuthExample.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        [JsonIgnore]
        public byte[] Salt { get; set; }

        public string Token { get; set; }
    }

    public class UserDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
```

In the above example we've explicitly declared `Password` to be ignored during serialization. This is good practice to ensure that this data is never unintentionally accessible.

We'll create a Data Transfer Object (DTO) as our temporary model when doing things such as authenticating or registering the user. You'll see how this works in the `UsersController` section.

## `UserService` Service

Our `UserService` will handle all the operations related to our `User` actions.

The `Authenticate(username, password)` functions is summarized as follows:

1. `DbContext` searches the `Users` context for a match in function input `username` . If none is found at this point, `null` user is returned.
2. The function input `password` is hashed using the `Salt` saved in the database, if the saved hashed `Password` matches this output, a  new claim is created and a`JWT` token is created; this token is subsequently saved onto the User model. If this validation fails, `null` user is returned.
3. The successfully authenticated `User` is returned.

The `Register(username, password)` function is summarized as follows:

1. `DbContext` searches the `Users` context for a match in function input `username`, if one is found `null` is returned.
2. If no existing `User` is found, a `Salt` is generated using `PasswordHasher().GenerateSalt()` and then the password is hashed using `PasswordHasher().HashPassword(password, salt)`.
3. Upon successful generation of the above, a new `User` is created.

This is defined as follows:

```cs
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;

using JwtAuthExample.Models;
using JwtAuthExample.Helpers;

namespace JwtAuthExample.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        Task<User> Register(string username, string password);
    }

    public class UserService: IUserService
    {
        private readonly JwtAuthExampleContext _context;

        public UserService(JwtAuthExampleContext context)
        {
            _context = context;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            var hasher = new PasswordHasher();
            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.Username == username
            );

            if (user == null)
            {
                return null;
            }

            var hashedPassword = hasher.HashPassword(password, user.Salt);

            if (user.Password == hashedPassword)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("SECRETCODESTRING");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature
                    )
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);
                await _context.SaveChangesAsync();
            } else {
                user = null;
            }

            return user;
        }

        public async Task<User> Register(string username, string password)
        {
            var validUser = await _context.Users.FirstOrDefaultAsync(x =>
                x.Username == username
            );

            if (validUser != null)
            {
                return null;
            }

            var hasher = new PasswordHasher();
            var salt = hasher.GenerateSalt();
            var hashedPassword = hasher.HashPassword(password, salt);

            var user = new ApplicationUser
            {
                Username = username,
                Password = hashedPassword,
                Salt = salt
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return user;
        }
    }
}
```

## `UsersController` Controller

The majority of this code example in this section should hopefully be self explanatory.

My `[HttpGet("info")]` route demonstrates how to get the `User` in the controller by using the `JWT` claim.

```cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

using JwtAuthExample.Services;
using JwtAuthExample.Models;
using JwtAuthExample.Helpers;

namespace JwtAuthExample.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly JwtAuthExampleContext _context;

        private readonly IUserService _userService;
        private readonly IUserTools _userTools;

        public UsersController(IUserService userService, JwtAuthExampleContext context)
        {
            _userService = userService;
            _context = context;
            _userTools = new UserTools();
        }

        [HttpGet("info")]
        public async Task<ActionResult<User>> GetUser()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var user = await _context.Users.FindAsync(long.Parse(userId));

            if (user == null)
                return BadRequest();

            return user;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult<User>> Authenticate([FromBody]UserDTO model)
        {
            var user = await _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new {message = "Username or password is incorrect"});

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser(UserDTO model)
        {
            var user = await _userService.Register(model.Username, model.Password);

            if (user == null)
                return BadRequest(new {message = "Username already exists"});

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }
    }
}
```

# Implementing our Components

## Adding `User` to your `DbContext`

In your `DbContext` you'll need to add the following:

```cs
public virtual DbSet<ApplicationUser> Users { get; set; }
```

Once you've done this, make sure you migrate and affect your changes by doing the following:

```bash
dotnet ef migrations add  AddUserModel -v
dotnet ef database update -v
```

## Adding `JwtBearer`

You'll need to install the `JwtBearer` package by running the following command:

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

We need to tell our application to use `JwtBearer` as it's authentication mechanism.

Adjust your `ConfigureServices(IServiceCollection services)` to include the following:

```cs
var key = Encoding.ASCII.GetBytes("SECRETCODESTRING");
services.AddAuthentication(x =>
{
	x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
	x.RequireHttpsMetadata = false;
	x.SaveToken = true;
	x.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(key),
		ValidateIssuer = false,
		ValidateAudience = false
	};
});
```

## Adding `UserService`

We need to inject our `UserService` and it's interface `IUserService` into `Startup`.

Adjust your `ConfigureServices(IServiceCollection services)` to include the following:

```cs
services.AddScoped<IUserService, UserService>();
```

## Final Touches

Adjust your `Configure(IApplicationBuilder app, IWebHostEnvironment env)` with the following additions:

```cs
app.UseAuthentication();
app.UseAuthorization();
```

## Requiring Authorization for your Controllers

You can now specify `[Authorize]` at the top of your controller definitions to require a `JWT` token. If you want to allow anonymous access to a route, you can specify the `[AllowAnonymous]` decorator for the specific route.

# Closing Thoughts

Implementing your own alternative to `Identity` is not overly cumbersome - it can be done quite quickly and effectively as above.

While I was predominately using Django, I found myself using third party libraries to achieve what I wanted. The result of this was that I did not truly understand the flow of my program's authentication.

By doing the above implementation, I was able to:

1. Understand the process very clearly
2. Ensure that the `JWT` implementation did not contain additional bloat.

Lastly, I hope this post was helpful, if you have any comments or critiques to my approach for implementing `JWT` above I'd love to hear it.
