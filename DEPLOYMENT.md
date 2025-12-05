# Deploying Your Site to the Web

This guide covers multiple ways to deploy your MasseurMatch static site online.

## Option 1: GitHub Pages (Recommended - Free & Automated)

The easiest option. Your site deploys automatically whenever you push to GitHub.

### Setup Steps:
1. **Push your repository to GitHub**
   - Create a repository at https://github.com/new
   - Push this project to it

2. **Enable GitHub Pages in your repository**
   - Go to your repository Settings
   - Scroll to "Pages" section (left sidebar)
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"
     - This uses the workflow already configured in `.github/workflows/deploy.yml`

3. **That's it!**
   - Your site will deploy to `https://yourusername.github.io/MasseurMatch`
   - Or configure a custom domain in the Pages settings

### How it works:
- Every time you push to the `main` branch, GitHub Actions automatically builds and publishes your site
- The workflow file (`.github/workflows/deploy.yml`) handles this automatically

---

## Option 2: Netlify (Free & Simple)

Great alternative with good free tier and easy setup.

### Setup Steps:
1. **Connect your GitHub repository**
   - Go to https://app.netlify.com/signup
   - Click "Connect to Git"
   - Authorize and select your repository

2. **Configure build settings**
   - Build command: (leave empty - no build needed)
   - Publish directory: `.` (root folder)

3. **Deploy**
   - Click "Deploy"
   - Your site gets a URL like `your-site-12345.netlify.app`
   - Updates deploy automatically on git push

4. **Custom domain** (optional)
   - In Netlify settings, add your custom domain

---

## Option 3: Vercel (Free & Fast)

Another popular option, similar to Netlify.

### Setup Steps:
1. Go to https://vercel.com/signup
2. Choose "Continue with GitHub"
3. Select your repository
4. Leave default settings (detects static site automatically)
5. Click "Deploy"
6. Your site is live at `your-project.vercel.app`

---

## Option 4: Traditional Web Hosting (Paid)

For more control, use services like:
- **Bluehost, GoDaddy, Hostinger** - Full control, simple FTP upload
- **AWS S3 + CloudFront** - Scalable, professional setup
- **DigitalOcean** - Droplets or App Platform

### Basic steps:
1. Sign up for a hosting provider
2. Upload files via FTP/SFTP or their control panel
3. Point your domain to the hosting provider's nameservers

---

## Option 5: Local Testing Before Deployment

Test your site locally before pushing live:

```bash
# From your project directory
python3 -m http.server 8000

# Then open in your browser:
# http://localhost:8000
```

---

## Firebase Configuration (Optional)

To enable lead capture with Firebase:

1. Create a Firebase project at https://firebase.google.com
2. Set up Firestore database
3. Open `script.js` and update the `firebaseConfig` object with your credentials
4. Commit and push - your site redeploys with Firebase enabled

---

## DNS & Custom Domain

If you're using a custom domain:

1. **Purchase a domain** from GoDaddy, Namecheap, etc.
2. **Point it to your hosting** by updating DNS records:
   - For GitHub Pages: Add CNAME record pointing to `yourusername.github.io`
   - For Netlify: Update nameservers to Netlify's
   - For Vercel: Update nameservers to Vercel's
3. **Wait for DNS propagation** (usually 15 minutes to 24 hours)

---

## Quick Comparison

| Option | Cost | Ease | Custom Domain | Automation |
|--------|------|------|---|---|
| GitHub Pages | Free | Easy | Yes | Yes |
| Netlify | Free+ | Easy | Yes | Yes |
| Vercel | Free+ | Easy | Yes | Yes |
| Bluehost | ~$4/mo | Medium | Yes | No |
| AWS S3 | ~$1/mo | Hard | Yes | No |

---

## Troubleshooting

**Site not updating?**
- GitHub Pages: Check the Actions tab for deployment status
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

**404 errors on pages?**
- Make sure all file paths are correct (case-sensitive on Linux)
- Check that `index.html` is in the root directory

**Custom domain not working?**
- DNS changes take 24 hours to fully propagate
- Verify DNS records are correct for your provider

---

## Recommended Path for You

1. **Start:** Push to GitHub (if not already done)
2. **Easiest:** Use GitHub Pages (free, automatic)
3. **Later:** Add a custom domain if needed
4. **Optional:** Add Firebase for lead capture

That's it! Your site will be live in minutes.
