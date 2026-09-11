# Deployment Guide (Optional)

If you want to deploy your application so judges can access it online, here are quick deployment options:

## Option 1: Vercel (Recommended - Fastest)

### Steps (2 minutes):

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
cd medicare-plus
vercel
```

3. **Follow prompts**:
   - Link to existing project? N
   - Project name? medicare-plus
   - Directory? ./
   - Want to override settings? N

4. **Set Environment Variables**:
```bash
vercel env add VITE_SUPABASE_URL
# Paste your Supabase URL

vercel env add VITE_SUPABASE_ANON_KEY
# Paste your Supabase anon key
```

5. **Deploy to Production**:
```bash
vercel --prod
```

You'll get a URL like: `https://medicare-plus-xxx.vercel.app`

## Option 2: Netlify

### Steps:

1. **Build the project**:
```bash
npm run build
```

2. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

3. **Deploy**:
```bash
netlify deploy --prod --dir=dist
```

4. **Set Environment Variables** in Netlify dashboard:
   - Go to Site Settings → Environment Variables
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

## Option 3: GitHub Pages (More Steps)

1. Create GitHub repository
2. Push code
3. Enable GitHub Pages in repo settings
4. Use GitHub Actions for deployment

## Important Notes

### Environment Variables
Make sure to set these on your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Supabase Settings
In Supabase Dashboard → Authentication → URL Configuration:
- Add your deployed URL to "Site URL"
- Add your deployed URL to "Redirect URLs"

### Build Command
```bash
npm run build
```

### Output Directory
```
dist
```

## Testing Deployed App

After deployment, test these scenarios:

1. ✅ Open deployed URL
2. ✅ Create new account
3. ✅ Browse medicines
4. ✅ Add to cart
5. ✅ Place order
6. ✅ View orders
7. ✅ Logout and login again
8. ✅ Check mobile responsiveness

## Troubleshooting Deployment

### Issue: White screen after deployment
- Check browser console for errors
- Verify environment variables are set correctly
- Ensure build completed without errors

### Issue: API errors
- Verify Supabase URL is correct in deployment environment
- Check Supabase anon key is correct
- Ensure Supabase project is not paused (free tier auto-pauses after inactivity)

### Issue: 404 on routes
- For Vercel: Add `vercel.json` with rewrites
- For Netlify: Add `_redirects` file in public folder

## Quick Fix Files

### For Vercel - vercel.json
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### For Netlify - public/_redirects
```
/*    /index.html   200
```

---

**Note**: Deployment is OPTIONAL for the competition. Running locally is perfectly acceptable!
