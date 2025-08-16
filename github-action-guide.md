# GitHub Integration Guide

## 🌐 GitHub Pages Deployment

### What Works:
- ✅ **Web Interface** - Browser-based ping tool
- ✅ **CORS-enabled URLs** - Services that allow cross-origin requests
- ✅ **Static hosting** - No server costs

### Limitations:
- ❌ **CORS restrictions** - Cannot ping most external services
- ❌ **No continuous operation** - Only runs when page is open
- ❌ **Browser limitations** - Security policies restrict cross-origin requests

### Setup:
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. The workflow will automatically deploy the web version

## ⚡ GitHub Actions Integration

### What Works:
- ✅ **Scheduled pinging** - Automatic hourly execution
- ✅ **Full network access** - No CORS restrictions
- ✅ **Reliable execution** - Runs on GitHub's infrastructure
- ✅ **Manual triggering** - On-demand execution

### Limitations:
- ❌ **Time limits** - Maximum 6 hours per job
- ❌ **Minimum interval** - 5-minute minimum for scheduled runs
- ❌ **Not truly continuous** - Scheduled execution only

### Setup Instructions:

#### 1. Add Repository Secrets
```
Settings → Secrets and variables → Actions → New repository secret
```
- **Name:** `URL_TO_PING`
- **Value:** `https://your-app.onrender.com`

#### 2. Enable Workflows
The workflows are automatically enabled when you push the `.github/workflows/` files.

#### 3. Manual Trigger
- Go to "Actions" tab
- Select "Keep Render Services Awake"
- Click "Run workflow"
- Optionally specify custom URL and duration

### Workflow Schedule
```yaml
schedule:
  - cron: '0 * * * *'  # Every hour
```

### Custom Intervals
You can modify the cron schedule:
- `*/30 * * * *` - Every 30 minutes
- `0 */2 * * *` - Every 2 hours
- `0 9-17 * * 1-5` - Business hours, weekdays only

## 🎯 Recommended Usage

### For Maximum Uptime:
1. **GitHub Actions** - Scheduled pinging every hour
2. **Desktop/CLI** - For continuous local operation
3. **Web Version** - For quick testing of CORS-enabled services

### For Render.com Specifically:
Most Render.com services support CORS, so the web version should work fine. However, GitHub Actions provides more reliable scheduling.

## 📊 Monitoring

### GitHub Actions Logs:
- View execution logs in the "Actions" tab
- Download artifacts with detailed ping results
- Monitor success/failure rates

### Web Interface:
- Real-time statistics
- Response time tracking
- Success rate monitoring

## 🚀 Deployment Commands

```bash
# Deploy web version to GitHub Pages
git add .github/workflows/deploy-pages.yml web/
git commit -m "Add GitHub Pages deployment"
git push origin main

# Set up GitHub Actions pinging
git add .github/workflows/ping-service.yml
git commit -m "Add GitHub Actions ping service"
git push origin main

# Then add URL_TO_PING secret in repository settings
```

## 🔧 Troubleshooting

### Common Issues:

**GitHub Actions not running:**
- Check if workflows are enabled in repository settings
- Verify repository secrets are set correctly
- Check Actions tab for error messages

**Web version CORS errors:**
- Ensure target URL supports CORS
- Try using the desktop/CLI version instead
- Check browser console for detailed error messages

**Deployment failures:**
- Verify GitHub Pages is enabled
- Check workflow permissions in repository settings
- Ensure `web/index.html` file exists and is valid
