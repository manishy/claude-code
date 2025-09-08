# GitHub Pages Deployment Guide

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## 🚀 Automatic Deployment

The site will automatically deploy when you:
1. Push to the `main` branch
2. The GitHub Action will build the Next.js app
3. Deploy the static files to GitHub Pages

## 🔧 Setup Instructions

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Push Your Code
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 3. Monitor Deployment
1. Go to **Actions** tab in your GitHub repository
2. Watch the "Deploy to GitHub Pages" workflow
3. Once complete, your site will be live!

## 🌐 Access Your Site

Your site will be available at:
```
https://[your-username].github.io/[repository-name]/
```

The architecture page specifically will be at:
```
https://[your-username].github.io/[repository-name]/architecture/
```

## 📁 What Gets Deployed

- **Homepage**: Interactive showcase of your learning projects
- **Architecture Page**: Complete Claude Code documentation
- **Interactive Components**: Tic-tac-toe and Pong games
- **Responsive Design**: Works on all devices

## 🔧 Manual Deployment (if needed)

If you want to deploy manually:

```bash
# Build the project
npm run build

# The 'out' directory contains your static site
# You can upload this to any static hosting service
```

## 🐛 Troubleshooting

If deployment fails:
1. Check the **Actions** tab for error details
2. Ensure all dependencies are in `package.json`
3. Verify the `next.config.mjs` has `output: 'export'`
4. Make sure GitHub Pages is set to "GitHub Actions" source

## 📝 Notes

- The site uses Next.js static export
- All Material-UI styles are properly bundled
- Images and assets are optimized for static hosting
- The site works without JavaScript (progressive enhancement)