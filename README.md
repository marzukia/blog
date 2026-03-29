# marzukia.github.io Blog

This is a Hugo-based blog deployed to GitHub Pages.

## Deployment

### Automated Deployment (Recommended)

The site is automatically deployed to GitHub Pages when you push to the `main` branch:

1. Make your changes to content, themes, or configuration
2. Commit your changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```
3. Push to main:
   ```bash
   git push origin main
   ```

GitHub Actions will automatically build and deploy your site to `https://marzukia.github.io/`

### Custom Domain

The site is configured to use `mrzk.io` as a custom domain. To set this up:

1. Go to your GitHub repository settings
2. Navigate to "Pages" (or "Domains" if using custom domain)
3. Add `mrzk.io` as a custom domain
4. Configure your DNS records:
   - CNAME: `www.mrzk.io` → `marzukia.github.io`
   - CNAME: `mrzk.io` → `marzukia.github.io`

### Local Testing

To test your changes locally before deploying:

```bash
# Build the site
./deploy.sh

# Or use Hugo directly
hugo --minify
```

The built site will be in the `./public` directory.

## Development

### Prerequisites

- Hugo (extended version)
- Go (for Hugo compilation)

### Running Locally

```bash
hugo server --minify
```

Then visit `http://localhost:1313` to view your site.

## Configuration

- **Base URL**: `https://marzukia.github.io/`
- **Custom Domain**: `mrzk.io`
- **Theme**: Congo v2
- **Analytics**: Google Analytics (G-F52W3SZVZ4)

## File Structure

```
.
├── content/          # Your blog posts and pages
├── config/           # Hugo configuration
├── themes/           # Hugo themes
├── static/           # Static assets
├── .github/          # GitHub Actions workflows
└── public/           # Built site (ignored in git)
```

## Troubleshooting

### Build Failures

Check the GitHub Actions logs for build errors. Common issues:

- Missing dependencies in `go.mod`
- Theme issues
- Configuration errors

### Deployment Issues

1. Ensure you're pushing to the `main` branch
2. Check that the GitHub Actions workflow is enabled
3. Verify repository settings allow GitHub Pages deployment
