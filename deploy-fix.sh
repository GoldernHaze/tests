#!/bin/bash

# Career Assistant - Quick Fix & Deploy Script
echo "🔧 Fixing Career Assistant deployment issues..."

# Remove duplicate src folder if exists
if [ -d "src" ]; then
    echo "🗑️  Removing duplicate src folder..."
    rm -rf src/
fi

# Remove wrong workflow location
if [ -d "workflows" ]; then
    echo "📁 Moving workflow to correct location..."
    mkdir -p .github/workflows
    cp workflows/deploy.yml .github/workflows/deploy.yml 2>/dev/null || true
    rm -rf workflows/
fi

# Clean install
echo "🧹 Cleaning and reinstalling dependencies..."
npm cache clean --force 2>/dev/null || true
rm -rf node_modules package-lock.json 2>/dev/null || true
npm install

# Test build
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if git is initialized
    if [ ! -d .git ]; then
        echo "🔧 Initializing git..."
        git init
        git add .
        git commit -m "Initial commit - Career Assistant"
        git branch -M main
        
        echo "📤 To deploy to GitHub:"
        echo "1. Create repository at: https://github.com/samjammerr/career-assistant"
        echo "2. Run: git remote add origin https://github.com/samjammerr/career-assistant.git"
        echo "3. Run: git push -u origin main"
        echo "4. Enable GitHub Pages in repository settings"
        echo ""
        echo "📍 Your live URL will be: https://samjammerr.github.io/career-assistant/"
    else
        echo "📤 Pushing to GitHub..."
        git add .
        git commit -m "Fix deployment issues" || true
        git push
        
        echo "✅ Code pushed! Check GitHub Actions for deployment status."
        echo "📍 Live URL: https://samjammerr.github.io/career-assistant/"
    fi
    
    echo ""
    echo "🖥️  To test locally:"
    echo "npm run dev"
    echo "Then open: http://localhost:3000"
    
else
    echo "❌ Build failed. Check errors above."
    exit 1
fi

echo ""
echo "🎉 Fix complete! Your Career Assistant is ready to deploy."