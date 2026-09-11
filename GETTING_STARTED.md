# Getting Started with MediCare Plus

Welcome! This guide will get you up and running in under 2 minutes.

## 🚀 Quick Start (For the Competition)

### Prerequisites Check
Before starting, make sure you have:
- ✅ Node.js installed (v18 or higher)
- ✅ A web browser (Chrome recommended)
- ✅ Internet connection
- ✅ A Supabase account (free - create at supabase.com)

### Step-by-Step Setup

#### 1️⃣ Install Dependencies (30 seconds)
Open your terminal in the `medicare-plus` folder and run:
```bash
npm install
```
Wait for installation to complete.

#### 2️⃣ Create Supabase Project (1 minute)
1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Name it: `medicare-plus`
4. Set a strong database password (save it!)
5. Choose a region (nearest to you)
6. Click "Create new project"
7. Wait ~2 minutes for setup

#### 3️⃣ Setup Database (1 minute)
Once your Supabase project is ready:

1. In Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Open the file `database/schema.sql` in your code editor
4. Copy EVERYTHING and paste in the SQL Editor
5. Click **"RUN"** (bottom right)
6. Wait for "Success" message

7. Click **"New Query"** again
8. Open the file `database/seed.sql`
9. Copy EVERYTHING and paste in SQL Editor
10. Click **"RUN"**
11. You should see "Success. Rows returned: 15" or similar

#### 4️⃣ Get API Credentials (30 seconds)
1. In Supabase, click **Settings** (gear icon) in the sidebar
2. Click **API** in the settings menu
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (a long string)
4. Keep this tab open, you'll need these values next

#### 5️⃣ Create Environment File (30 seconds)
1. In your code editor, create a new file called `.env` in the `medicare-plus` folder
   - NOT `.env.txt` or `.env.example` - just `.env`
2. Copy and paste this template:

```
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

3. Replace `paste_your_project_url_here` with your Project URL from Supabase
4. Replace `paste_your_anon_key_here` with your anon public key
5. Save the file

**Example of what it should look like:**
```
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MzI0MjYxMzksImV4cCI6MTk0ODAwMjEzOX0.xxxxxxxxxxxxxxxxxxxxx
```

#### 6️⃣ Start the Application (10 seconds)
In your terminal, run:
```bash
npm run dev
```

You should see:
```
VITE v8.3.0  ready in 931 ms
➜  Local:   http://localhost:5173/
```

#### 7️⃣ Open in Browser
Click the link or open your browser to:
```
http://localhost:5173
```

## ✅ Verify It's Working

You should see:
- ✅ A dark-themed homepage with "Your Health, Our Priority"
- ✅ A navigation bar with "MediCare Plus" logo
- ✅ "Sign Up" and "Login" buttons in the top right
- ✅ A "Featured Medicines" section with 6 medicine cards

If you see this, **congratulations! Your setup is complete! 🎉**

## 🧪 Quick Test

Let's verify everything works:

### Test 1: Sign Up (30 seconds)
1. Click "Sign Up" button
2. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Phone: `1234567890`
   - Password: `test123`
   - Confirm Password: `test123`
3. Click "Sign Up"
4. Should redirect to Medicines page

### Test 2: Add to Cart (15 seconds)
1. Click on any medicine card
2. On the detail page, click "Add to Cart"
3. Click cart icon (top right) - it should show "1"
4. You should see your medicine in the cart

### Test 3: Place Order (30 seconds)
1. In cart, click "Proceed to Checkout"
2. Fill in delivery address
3. Click "Place Order"
4. Should redirect to "My Orders" page
5. Your order should appear!

### Test 4: Check Database (15 seconds)
1. Go back to Supabase dashboard
2. Click "Table Editor"
3. Click on "orders" table
4. You should see your order there!

**If all 4 tests pass, everything is working perfectly! ✅**

## 🎬 You're Ready for the Competition!

Your application is now:
- ✅ Fully functional
- ✅ Connected to a real database
- ✅ Ready to demonstrate

## 🆘 Troubleshooting

### Problem: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org

### Problem: Port 5173 already in use
**Solution**: Kill the existing process or use a different port:
```bash
npm run dev -- --port 3000
```

### Problem: "Invalid API credentials"
**Solution**: 
1. Check your `.env` file exists
2. Make sure there are NO spaces around the = sign
3. Make sure you copied the entire URL and key
4. Restart the dev server after creating `.env`

### Problem: Database errors
**Solution**: 
1. Go to Supabase SQL Editor
2. Run schema.sql again (it will skip existing tables)
3. Run seed.sql again

### Problem: Can't log in after signing up
**Solution**: 
1. Go to Supabase dashboard
2. Click "Authentication" > "Users"
3. If you see your user with a "confirm email" status:
   - Go to "Authentication" > "Settings" > "Email Auth"
   - Disable "Enable email confirmations"
   - Try signing up again with a different email

### Problem: White/blank page
**Solution**: 
1. Open browser console (F12)
2. Check for errors
3. Most common: forgot to create `.env` file
4. Solution: Create `.env` with your Supabase credentials

## 📚 Next Steps

Once everything is working:

1. ✅ Read `COMPETITION_CHECKLIST.md` - Pre-demo testing
2. ✅ Read `PROJECT_SUMMARY.md` - Complete overview
3. ✅ Practice the demo flow (2-3 times)
4. ✅ Test on mobile view (Chrome DevTools)

## 💡 Pro Tips

1. **Test 30 mins before judging** - Make sure everything still works
2. **Close unnecessary apps** - Avoid distractions during demo
3. **Have backup screenshots** - In case of technical issues
4. **Practice your demo** - Smooth demo = confident presentation
5. **Know your features** - Be ready to explain what you built

## 🎯 Demo Script

When judges arrive:

**"Hi! This is MediCare Plus, a full-stack online pharmacy."**

1. **"Let me sign up..."** [Create account - 20s]
2. **"Here's our medicine catalog with search and filter..."** [Show features - 20s]
3. **"I'll add a few items to cart..."** [Add 3 items - 15s]
4. **"And checkout..."** [Fill form, place order - 30s]
5. **"Here's my order history..."** [Show orders - 15s]
6. **"And in the database..."** [Show Supabase - 15s]
7. **"It's also fully responsive..."** [Mobile view - 15s]

**Total: 2 minutes 10 seconds ✨**

## 🏆 You're All Set!

Your MediCare Plus application is ready to impress the judges!

**Good luck with the competition! 🚀**

---

**Need help?** Check the other documentation files:
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Detailed setup
- `COMPETITION_CHECKLIST.md` - Testing checklist
- `FEATURES.md` - Complete feature list
- `PROJECT_SUMMARY.md` - Project overview
