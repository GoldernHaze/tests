#!/bin/bash

# Career Assistant - Automated Setup Script
# This script will set up your project and prepare it for deployment

echo "🚀 Setting up Career Assistant..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    echo "🔄 Trying to clear cache and reinstall..."
    npm cache clean --force
    rm -rf node_modules package-lock.json
    npm install
    
    if [ $? -ne 0 ]; then
        echo "❌ Still failed. Please check your internet connection and try again."
        exit 1
    fi
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Add your API keys if needed."
fi

# Test build
echo "🏗️  Testing build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi

echo "✅ Build successful"

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Career Assistant setup"
    echo "✅ Git repository initialized"
fi

echo ""
echo "🎉 Setup complete! Here's what you can do now:"
echo ""
echo "🖥️  Start development server:"
echo "   npm run dev"
echo "   Then open: http://localhost:3000"
echo ""
echo "🌐 Deploy to GitHub Pages:"
echo "   1. Create repository at: https://github.com/samjammerr/career-assistant"
echo "   2. Run: git remote add origin https://github.com/samjammerr/career-assistant.git"
echo "   3. Run: git push -u origin main"
echo "   4. Enable GitHub Pages in repository settings"
echo ""
echo "📋 Your live URL will be: https://samjammerr.github.io/career-assistant/"
echo ""
echo "✨ Happy coding!"