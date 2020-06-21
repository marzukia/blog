+++
author = "Andryo Marzuki"
title = "Mocking DbContext in ASP.NET Core for xUnit Tests"
date = "2020-06-18"
description = "Using a custom minimal JWT implementation in a ASP.NET Core WebApi rather than using the in-build Identity service."
tags = [
    "ASP.NET Core", "xUnit", "Unit Testing"
]
+++

Having unit tests in your application is important to ensure that your application functions how you intend for it to function. This is especially important as the scope and complexity of your application increases in size.

My starting point was this [MSDN article](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test) discussing how to use xUnit with ASP.NET Core. The example itself is quite bare in my opinion, it doesn't actually provide any real useful examples on how to implement xUnit with your application's `DbContext`.

Mocking is the process of creating an instance of your context which you can populate with fake data, as the name suggests you are making a 'mock' of it. By mocking your `DbContext` you are able to isolate behaviour related to your Services which call upon your database.

**Note**: This is a follow up to my [previous article](https://marzukia.github.io/asp.net-core-web-api-jwt-implementation/), where I outlined how I implemented JWT authentication in my Web API.

## The Setup

Queue two great testing libraries: [Moq](https://github.com/Moq/moq4/) and [MockQueryable](https://github.com/romantitov/MockQueryable).

```bash
dotnet add package Moq
dotnet add package MockQueryable.Moq
```

With these libraries installed, we can get started writing our unit tests. The steps to set up a basic unit test which uses a mocked `DbContext` is as follows:

1. Create some fake data which we'll use to test
```cs
var users = new List<ApplicationUser>() {
    new ApplicationUser() {
        Username = "test",
        Password = "gw9L3AOoUxiEuKahonc17Twg47Sam64b4rm/ui/zTjU=",
        Salt = Encoding
            .ASCII
            .GetBytes("\xea2858b16c8357ecb9ba6ababaa05594")
    }
};
```
2. Convert this data into a queryable set using `MockQuerayble`.

```cs
var mock = users.AsQueryable().BuildMockDbSet();
```

3. Create new `DbContext` taking advantage of `UseInMemoryDatabase()`. You can find more discussion about this on this [MSDN article](https://docs.microsoft.com/en-us/ef/core/miscellaneous/testing/).

```cs
var options = new DbContextOptionsBuilder<UnitTestExampleContext>()
    .UseInMemoryDatabase(databaseName: "UserServiceTest")
    .Options;

MockContext = new Mock<UnitTestExampleContext>(options);
```

4. Setup our `MockContext` to map our `Users` model correctly.

```cs
MockContext.Setup(c => c.Users).Returns(mock.Object);
```

5. Instantiate your `UserService` and pass through the `MockContext` into its constructor.

```cs
_userService = new UserService(MockContext.Object);
```

6. Write your tests!

```cs
[Fact]
public virtual async Task AuthenticateUser_IsValidUser_ReturnUser()
{
    var user = await _userService
        .Authenticate("test", "testerday123");

    Assert.True(user.GetType() == typeof(User),
        "Valid user did not return a User object");
}
```

## Full Working Example

```cs
using System.Text;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

using UnitTestExample.Services;
using UnitTestExample.Models;

using Xunit;

using Moq;
using MockQueryable.Moq;

namespace UnitTestExample.Tests.Services
{
    public class UserServiceTest
    {
        private readonly IUserService _userService;

        protected Mock<UnitTestExampleContext> MockContext;

        public UserServiceTest()
        {
            var users = new List<ApplicationUser>() {
                new ApplicationUser() {
                    Username = "test",
                    Password = "gw9L3AOoUxiEuKahonc17Twg47Sam64b4rm/ui/zTjU=",
                    Salt = Encoding.ASCII
                        .GetBytes("\xea2858b16c8357ecb9ba6ababaa05594")
                }
            };

            var mock = users.AsQueryable().BuildMockDbSet();

            var options = new DbContextOptionsBuilder<UnitTestExampleContext>()
                .UseInMemoryDatabase(databaseName: "UserServiceTest")
                .Options;

            MockContext = new Mock<UnitTestExampleContext>(options);
            MockContext
                .Setup(c => c.Users)
                .Returns(mock.Object);

            _userService = new UserService(MockContext.Object);
        }

        [Fact]
        public virtual async Task AuthenticateUser_IsValidUser_ReturnUser()
        {
            var user = await _userService
                .Authenticate("test", "testerday123");

            Assert.True(user.GetType() == typeof(User),
                "Valid user did not return a User object");
        }
    }
}
```

## Closing Thoughts

It's not a hard process to set up a mocked `DbContext`, however with the lack of general documentation it can be quite confusing initially.

Hope I've saved you some time and good luck!