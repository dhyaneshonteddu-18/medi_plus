# Complete Supabase Setup Guide - Step by Step

## 🎯 What You'll Do in Supabase

1. Create a new project
2. Run the database schema (creates 5 tables)
3. Run the seed data (adds 15 medicines)
4. Get your API credentials
5. Configure authentication settings

**Total Time: 5 minutes**

---

## Step 1: Create Supabase Account & Project

### 1.1 Go to Supabase Website
Open your browser and go to: **https://supabase.com**

### 1.2 Sign In or Sign Up
- If you have an account: Click **"Sign In"**
- If new: Click **"Start your project"** → Sign up with:
  - GitHub (recommended)
  - Or email

### 1.3 Create New Organization (First Time Only)
If this is your first time:
1. You'll be asked to create an organization
2. Name it anything (e.g., "My Projects" or your name)
3. Choose the **Free plan**
4. Click **"Create organization"**

### 1.4 Create New Project
1. Click the **"New Project"** button (green button)
2. Fill in the form:
   - **Name**: `medicare-plus`
   - **Database Password**: Create a strong password
     - ⚠️ **IMPORTANT**: Save this password! You'll need it later
     - Example: `MediCare@2026!Strong`
   - **Region**: Choose closest to you
     - If in India: Singapore (Southeast Asia)
     - If in US: West US (Oregon) or East US (North Virginia)
     - If in Europe: West EU (Ireland)
3. Click **"Create new project"**

### 1.5 Wait for Setup
- You'll see "Setting up project..."
- This takes about **1-2 minutes**
- Don't close the browser tab!
- When done, you'll see the project dashboard

---

## Step 2: Run Database Schema

### 2.1 Open SQL Editor
1. In the left sidebar, find and click **"SQL Editor"**
   - It has a `</>` icon
2. You'll see the SQL Editor interface

### 2.2 Create New Query
1. Click the **"New Query"** button (top left)
2. You'll see an empty SQL editor

### 2.3 Copy Schema SQL
1. Go back to your code editor
2. Open the file: `database/schema.sql`
3. Select ALL content (Ctrl+A or Cmd+A)
4. Copy it (Ctrl+C or Cmd+C)

### 2.4 Paste and Run
1. Go back to Supabase SQL Editor
2. Paste the SQL (Ctrl+V or Cmd+V)
3. Click the **"RUN"** button (bottom right corner)
   - It's a green button with a play icon ▶

### 2.5 Verify Success
You should see:
```
Success. No rows returned
```

This means:
- ✅ 5 tables created: profiles, medicines, orders, order_items, cart_items
- ✅ All indexes created
- ✅ All security policies (RLS) created
- ✅ All triggers created

---

## Step 3: Add Sample Medicine Data

### 3.1 Create Another New Query
1. In SQL Editor, click **"New Query"** again
2. You'll get a fresh empty editor

### 3.2 Copy Seed SQL
1. Go to your code editor
2. Open the file: `database/seed.sql`
3. Select ALL content (Ctrl+A)
4. Copy it (Ctrl+C)

### 3.3 Paste and Run
1. Go back to Supabase SQL Editor
2. Paste the SQL (Ctrl+V)
3. Click **"RUN"** button

### 3.4 Verify Success
You should see:
```
Success. Rows returned: 15
```

This means:
- ✅ 15 medicines added to database
- ✅ Includes: Pain Relief, Antibiotics, Vitamins, Allergy, Digestive, Diabetes, Cardiovascular medicines

### 3.5 Verify Data in Table Editor
1. In the left sidebar, click **"Table Editor"**
2. Click on **"medicines"** table
3. You should see 15 rows of medicine data
4. You can scroll through and see:
   - Paracetamol
   - Ibuprofen
   - Vitamin D3
   - Omega-3 Fish Oil
   - etc.

**If you see 15 medicines, you're good!** ✅

---

## Step 4: Get Your API Credentials

### 4.1 Open Settings
1. In the left sidebar, click the **⚙️ Settings** icon (gear icon at bottom)

### 4.2 Go to API Settings
1. In Settings menu, click **"API"**
2. You'll see your project credentials

### 4.3 Copy Project URL
1. Find the section **"Project URL"**
2. You'll see something like: `https://abcdefghijkl.supabase.co`
3. Click the **copy icon** next to it
4. Or select and copy (Ctrl+C)

**Save this somewhere!** You'll need it in 1 minute.

### 4.4 Copy Anon Key
1. Scroll down to **"Project API keys"**
2. Find **"anon public"** key
   - It's a LONG string starting with `eyJhbGc...`
   - **NOT** the `service_role` key (that's different!)
3. Click the **copy icon** or select and copy
4. It should be around 300+ characters long

**Save this too!**

**⚠️ IMPORTANT**: 
- Copy the **anon** key (public, safe to use in frontend)
- Do NOT use the **service_role** key (that's for backend only)

---

## Step 5: Configure Authentication Settings

### 5.1 Open Authentication Settings
1. In left sidebar, click **"Authentication"**
2. Click **"Providers"** tab

### 5.2 Configure Email Provider
1. Click on **"Email"** in the providers list
2. Scroll down to **"Confirm email"** section

### 5.3 Disable Email Confirmation (For Testing)
1. Find the toggle: **"Enable email confirmations"**
2. Turn it **OFF** (toggle to the left)
3. This allows you to sign up without email verification
4. Click **"Save"** button at the bottom

**Why disable?**
- For competition/testing, you don't want to wait for email confirmations
- Users can sign up and login immediately
- You can enable it later for production

### 5.4 Verify Settings
You should see:
- ✅ Email provider: Enabled
- ✅ Email confirmations: Disabled

---

## Step 6: Create Your .env File

### 6.1 Open Your Code Editor
1. Go back to your `medicare-plus` project folder
2. In the root folder (same level as `package.json`)

### 6.2 Create .env File
1. Create a new file named: `.env`
   - Exactly `.env` - no `.txt`, no other extension
   - On Windows: Make sure you see file extensions
   - File → Save As → Change "Save as type" to "All Files"
   - Name it `.env`

### 6.3 Add Your Credentials
Paste this template:

```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 6.4 Replace with Your Values
Replace the placeholders with what you copied from Supabase:

**Example:**
```
VITE_SUPABASE_URL=https://abcdefghijkl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjIwMTU1NzYwMDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 6.5 Save the File
- Press Ctrl+S (or Cmd+S)
- Make sure it's saved as `.env` in the root folder

### 6.6 Verify File Location
Your folder structure should look like:
```
medicare-plus/
├── .env                 ← Your new file HERE
├── .env.example
├── package.json
├── src/
├── database/
└── ...
```

---

## Step 7: Restart Your Dev Server

### 7.1 Stop Current Server
1. Go to your terminal where `npm run dev` is running
2. Press **Ctrl+C** to stop it

### 7.2 Start Again
```bash
npm run dev
```

### 7.3 Wait for Server to Start
You should see:
```
VITE v8.3.0  ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

## Step 8: Test Your Application

### 8.1 Open in Browser
Open: **http://localhost:5173** (or whatever port is shown)

### 8.2 Test Sign Up
1. Click **"Sign Up"** button (top right)
2. Fill in the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Phone: `1234567890`
   - Password: `test123`
   - Confirm: `test123`
3. Click **"Sign Up"**

### 8.3 Check if It Works
**If successful:**
- ✅ You'll be redirected to the Medicines page
- ✅ You'll see your name in the top right
- ✅ You'll see 15 medicines in a grid

**If you get an error:**
- Check browser console (F12)
- Verify your `.env` file has correct credentials
- Make sure you restarted the dev server

### 8.4 Verify in Supabase
1. Go back to Supabase dashboard
2. Click **"Authentication"** → **"Users"**
3. You should see your user account listed!
4. This confirms the connection is working ✅

### 8.5 Test Complete Flow
1. Click on a medicine
2. Click "Add to Cart"
3. Click cart icon (top right)
4. Click "Proceed to Checkout"
5. Fill in delivery address
6. Click "Place Order"
7. You should see "Order placed successfully!"

### 8.6 Verify Order in Database
1. Go to Supabase → **"Table Editor"**
2. Click **"orders"** table
3. You should see your order!
4. Click **"order_items"** table
5. You should see the items from your order!

**If you see this, EVERYTHING IS WORKING PERFECTLY!** 🎉

---

## Troubleshooting

### Problem: "Invalid API credentials"

**Check 1**: Verify .env file
```bash
# In terminal, check if file exists
cat .env
# or on Windows:
type .env
```

You should see your credentials. If not, create the file again.

**Check 2**: Verify no extra spaces
Your .env should look like:
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

NOT:
```
VITE_SUPABASE_URL = https://xxx.supabase.co  ← Extra spaces!
VITE_SUPABASE_ANON_KEY= eyJhbGc...           ← Space after =
```

**Check 3**: Restart dev server
Stop (Ctrl+C) and run `npm run dev` again

---

### Problem: Can't Sign Up - Email Confirmation Required

**Solution:**
1. Go to Supabase → Authentication → Providers
2. Click "Email"
3. Turn OFF "Enable email confirmations"
4. Save
5. Try signing up again with a NEW email

---

### Problem: No medicines showing

**Solution:**
1. Go to Supabase → Table Editor → medicines
2. Check if you see 15 rows
3. If empty, go to SQL Editor
4. Run `seed.sql` again

---

### Problem: Can't place order - Permission denied

**Solution:**
1. Make sure you're logged in (check top right)
2. Go to Supabase → Table Editor
3. Click "orders" table
4. Click the "RLS" tab
5. You should see policies enabled
6. If not, re-run `schema.sql`

---

### Problem: Project paused

Supabase free tier pauses projects after 1 week of inactivity.

**Solution:**
1. Go to Supabase dashboard
2. Click "Resume Project" button
3. Wait 30 seconds
4. Refresh your app

---

## Summary Checklist

Before the competition, verify:

- [ ] Supabase project created
- [ ] schema.sql executed successfully
- [ ] seed.sql executed successfully
- [ ] 15 medicines visible in Table Editor
- [ ] API credentials copied
- [ ] .env file created with correct credentials
- [ ] Email confirmations disabled in Auth settings
- [ ] Dev server restarted
- [ ] Can sign up new user
- [ ] User appears in Authentication → Users
- [ ] Medicines display on homepage
- [ ] Can add to cart
- [ ] Can place order
- [ ] Order appears in orders table

**If all checked, you're 100% ready!** ✅

---

## Quick Reference - Supabase URLs

| What | Where to Find |
|------|---------------|
| **Dashboard** | https://supabase.com/dashboard |
| **SQL Editor** | Dashboard → SQL Editor (left sidebar) |
| **Table Editor** | Dashboard → Table Editor (left sidebar) |
| **Authentication** | Dashboard → Authentication (left sidebar) |
| **API Settings** | Dashboard → Settings ⚙️ → API |
| **Database** | Dashboard → Database (left sidebar) |

---

## What Each Table Does

| Table | Purpose | What It Stores |
|-------|---------|----------------|
| **profiles** | User profiles | Name, email, phone (extends auth.users) |
| **medicines** | Product catalog | Medicine info, prices, stock, images |
| **orders** | Customer orders | Order totals, delivery info, status |
| **order_items** | Order details | Which medicines in each order, quantities |
| **cart_items** | Shopping cart | Current cart items for logged-in users |

---

## Security Features Enabled

✅ **Row Level Security (RLS)** - Users can only see their own data  
✅ **Hashed Passwords** - Passwords encrypted with bcrypt  
✅ **JWT Tokens** - Secure session management  
✅ **API Keys** - Separate keys for client and server  
✅ **Foreign Keys** - Data integrity maintained  
✅ **Cascading Deletes** - Related data cleaned up automatically  

---

## Need Help?

### During Setup
1. Check browser console (F12) for errors
2. Check terminal for dev server errors
3. Verify each step was completed
4. Refer to TROUBLESHOOTING.md

### During Competition
1. Have screenshots of working app as backup
2. Show Supabase database tables to judges
3. Explain what you built, not what's broken
4. Stay calm - technical issues happen!

---

**You've got this! Follow these steps carefully and you'll have a working app! 🚀**
