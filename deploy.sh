#!/bin/bash
# Local build script for testing Hugo site
# For automated deployment, push to main branch and GitHub Actions will handle it

hugo --minify

echo "Build complete! Site is in ./public"
echo "To deploy to GitHub Pages, push to main branch:"
echo "  git add ."
echo "  git commit -m 'Your message'"
echo "  git push origin main"
