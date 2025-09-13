# Netlify Deployment Guide

This guide will help you deploy your UniqueSkillsLab project to Netlify alongside your existing Vercel deployment.

## Files Added for Netlify

- `netlify.toml` - Netlify configuration file
- `netlify/functions/` - Directory containing Netlify Functions
  - `download-app.js` - APK download function
  - `categories.js` - Categories API function
  - `courses.js` - Courses API function
  - `sitemap.xml.js` - Sitemap generation function

## Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign up/Login with your GitHub account

2. **Create New Site**
   - Click "New site from Git"
   - Select "GitHub" as your Git provider
   - Choose your `Uniqueskilkslab` repository

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18
   - Click "Deploy site"

4. **Environment Variables** (if any)
   - Go to Site Settings → Environment Variables
   - Add any environment variables you use in Vercel

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   # Initialize (first time only)
   netlify init
   
   # Deploy to preview
   netlify deploy
   
   # Deploy to production
   netlify deploy --prod
   ```

## Configuration Details

### Build Process
- Netlify will automatically run `npm install` and `npm run build`
- Your Next.js app will be built and served from the `.next` directory
- API routes are converted to Netlify Functions

### API Routes
Your existing API routes are now available as:
- `/api/download-app` → `/.netlify/functions/download-app`
- `/api/categories` → `/.netlify/functions/categories`
- `/api/courses` → `/.netlify/functions/courses`
- `/api/sitemap.xml` → `/.netlify/functions/sitemap.xml`

### Headers and Security
- Security headers are configured in `netlify.toml`
- CORS is enabled for all API functions
- APK download headers are preserved

## Testing Your Deployment

1. **Check Build Logs**
   - Monitor the build process in Netlify dashboard
   - Look for any errors or warnings

2. **Test API Endpoints**
   - Test your API functions: `https://your-site.netlify.app/.netlify/functions/categories`
   - Test APK download: `https://your-site.netlify.app/api/download-app?app=uniqueskillslab`

3. **Test Static Pages**
   - Verify all pages load correctly
   - Check that images and assets are served properly

## Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to Site Settings → Domain Management
   - Add your custom domain
   - Configure DNS settings as instructed

2. **SSL Certificate**
   - Netlify automatically provides SSL certificates
   - Your site will be available at `https://your-domain.com`

## Monitoring and Maintenance

1. **Build Notifications**
   - Netlify will email you about build status
   - You can configure Slack/Discord notifications

2. **Analytics**
   - Enable Netlify Analytics in Site Settings
   - Monitor traffic and performance

3. **Form Handling**
   - If you add forms, Netlify Forms can handle submissions
   - No backend required for simple contact forms

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18)
   - Verify all dependencies are in `package.json`
   - Check build logs for specific errors

2. **API Functions Not Working**
   - Ensure functions are in `netlify/functions/` directory
   - Check function syntax and exports
   - Verify CORS headers are set

3. **Static Files Not Loading**
   - Check that files are in `public/` directory
   - Verify file paths in your code

### Support
- Netlify Documentation: https://docs.netlify.com/
- Netlify Community: https://community.netlify.com/

## Benefits of Dual Deployment

- **Redundancy**: If one platform has issues, you have a backup
- **Testing**: Test changes on one platform before deploying to the other
- **Performance**: Compare performance between platforms
- **Features**: Use unique features of each platform
- **Cost**: Utilize free tiers of both platforms

Your project is now ready for Netlify deployment! 🚀
