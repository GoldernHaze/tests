# 🚀 Career Assistant - Complete Deployment Guide

## 📋 Prerequisites

Before starting, make sure you have:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **GitHub Account** - [Create one here](https://github.com/)
- **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

## 🏠 Local Development Setup

### Step 1: Clone/Download the Project

**Option A: If you have the code already**
```bash
# Navigate to your project folder
cd career-assistant
```

**Option B: If using Git**
```bash
# Clone from GitHub (replace with your repo URL)
git clone https://github.com/samjammerr/career-assistant.git
cd career-assistant
```

### Step 2: Install Dependencies
```bash
# Install all required packages
npm install
```

### Step 3: Set up Environment Variables (Optional)
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file and add your API keys (if you have them)
# VITE_YOUTUBE_API_KEY=your_youtube_api_key
# VITE_GITHUB_TOKEN=your_github_token
# VITE_OPENAI_API_KEY=your_openai_api_key
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
Your website will be available at:
**🔗 http://localhost:3000**

## 🌐 GitHub Pages Deployment

### Method 1: Using GitHub Actions (Recommended)

1. **Push your code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/samjammerr/career-assistant.git
git push -u origin main
```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **GitHub Actions**

3. **Create GitHub Action workflow:**
Create `.github/workflows/deploy.yml` in your repository

4. **Your site will be available at:**
`https://samjammerr.github.io/career-assistant/`

### Method 2: Using gh-pages Package

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json:**
Add these to your package.json:
```json
{
  "homepage": "https://samjammerr.github.io/career-assistant",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

## 🔗 Alternative Hosting Options

### Vercel (Recommended for React)
1. Visit [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Deploy automatically

### Netlify
1. Visit [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Connect your repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`

## 🛠️ Build for Production
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🐛 Troubleshooting

### Common Issues:

1. **Node version error:**
   - Ensure Node.js version 16+ is installed
   - Run: `node --version`

2. **Package installation fails:**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build fails:**
   ```bash
   # Check for TypeScript errors
   npm run build
   ```

4. **Port already in use:**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   # Or use different port
   npm run dev -- --port 3001
   ```

## 📱 Mobile Testing
- **iOS**: Use Safari or install as PWA
- **Android**: Use Chrome or install as PWA

## 🔧 Performance Optimization
- Images are optimized automatically
- Code splitting is handled by Vite
- Lazy loading is implemented for components

## 🆘 Need Help?

If you encounter issues:
1. Check the console for errors (F12 in browser)
2. Ensure all files are in correct locations
3. Verify Node.js and npm versions
4. Check GitHub repository settings
5. Contact: team@lnmiitunderdogs.com

## 📋 Checklist Before Deployment

- [ ] All files are in correct folders
- [ ] package.json has correct dependencies
- [ ] Build command works (`npm run build`)
- [ ] No TypeScript errors
- [ ] Environment variables are set (if needed)
- [ ] Repository is public (for GitHub Pages)

---

**🎉 Congratulations! Your Career Assistant website is now live!**

Share your live link: `https://samjammerr.github.io/career-assistant/`