# Vercel Deployment Guide for Medicare Plus

## Problem: Blank Page on Vercel

If your app shows a blank page on Vercel, follow these steps:

## Solution Steps

### 1. Add Environment Variables in Vercel

Your app needs these environment variables to connect to Supabase:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

**Steps to add them:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **medi-plus** project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. Add each variable:
   - **Name:** `VITE_SUPABASE_URL`
   - **Value:** `https://sbcepgoyvbwifizdqvvu.supabase.co`
   - Click **Add**
   
   - **Name:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** (copy from your local `.env` file)
   - Click **Add**

6. Make sure to select **Production**, **Preview**, and **Development** for both variables

### 2. Redeploy Your Application

After adding environment variables:

1. Go to **Deployments** tab
2. Click the **three dots (⋯)** on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (usually 1-2 minutes)

### 3. Verify Build Settings (Should already be correct)

In **Settings** → **General**:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 4. Check for Errors

If still blank, check browser console:

1. Open your deployed site
2. Press **F12** (or right-click → Inspect)
3. Go to **Console** tab
4. Look for error messages (usually red text)
5. Share the error message for help

### 5. Common Issues

#### Issue: "Supabase client not initialized"
**Solution:** Environment variables not set. Go back to Step 1.

#### Issue: "Failed to fetch"
**Solution:** Check Supabase project is active and URL is correct.

#### Issue: Build fails with "command not found"
**Solution:** Ensure `package.json` has correct scripts.

## Vercel Configuration File (Optional)

You can create `vercel.json` in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures proper routing for React Router.

## Quick Checklist

- [ ] Environment variables added in Vercel
- [ ] Both variables set for Production/Preview/Development
- [ ] Redeployed after adding variables
- [ ] Browser console checked for errors
- [ ] Supabase project is active and accessible

## Need Help?

If issue persists:
1. Share browser console errors
2. Share Vercel build logs (Settings → Deployments → Click deployment → View Build Logs)
3. Verify Supabase credentials are correct
