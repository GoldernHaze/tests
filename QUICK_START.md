# 🚀 Quick Start Guide - Career Assistant

## ⚡ Super Fast Setup (2 minutes)

### 1. Download and Setup
```bash
# If you have the code, navigate to folder
cd career-assistant

# Install everything
npm install
```

### 2. Start the Website
```bash
npm run dev
```

### 3. Open Your Browser
Go to: **http://localhost:3000**

That's it! Your website is running! 🎉

---

## 🌐 Put it on GitHub Pages (5 minutes)

### Step 1: Create GitHub Repository
1. Go to https://github.com/samjammerr
2. Click "New repository"
3. Name it: `career-assistant`
4. Make it public
5. Click "Create repository"

### Step 2: Upload Your Code
```bash
# In your project folder, run these commands:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/samjammerr/career-assistant.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages"
4. Under "Source", select "GitHub Actions"
5. Wait 2-3 minutes

### Step 4: Your Website is Live! 🌟
Your website will be at:
**https://samjammerr.github.io/career-assistant/**

---

## 🆘 If Something Goes Wrong

### Problem: npm install fails
```bash
# Try this:
npm cache clean --force
npm install
```

### Problem: Port 3000 already in use
```bash
# Use a different port:
npm run dev -- --port 3001
# Then go to: http://localhost:3001
```

### Problem: Build fails
```bash
# Check for errors:
npm run build
# Fix any errors shown
```

---

## 📞 Need Help?

1. **Check the console** - Press F12 in your browser, look for red errors
2. **Make sure Node.js is installed** - Run: `node --version` (should be 16+)
3. **Contact us**: team@lnmiitunderdogs.com

---

**🎯 Goal: Get your Career Assistant website live in under 10 minutes!**

**Live URL after deployment:** https://samjammerr.github.io/career-assistant/