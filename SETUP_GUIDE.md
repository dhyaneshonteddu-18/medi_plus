# Quick Setup Guide - MediCare Plus

## ⚡ Fast Track Setup (2 Minutes)

### Step 1: Install Dependencies (30 seconds)
```bash
cd medicare-plus
npm install
```

### Step 2: Create Supabase Project (1 minute)
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub or email
4. Click "New Project"
5. Choose organization and set project name: `medicare-plus`
6. Set a database password (save it!)
7. Choose region closest to you
8. Click "Create new project"
9. Wait 2 minutes for provisioning

### Step 3: Setup Database (30 seconds)
1. In Supabase dashboard, click **SQL Editor** in left sidebar
2. Click "New Query"
3. Open `database/schema.sql` in your code editor
4. Copy ALL content and paste in Supabase SQL Editor
5. Click **RUN** (bottom right)
6. Wait for success message
7. Click "New Query" again
8. Open `database/seed.sql`
9. Copy ALL content and paste in SQL Editor
10. Click **RUN**

### Step 4: Configure Environment (30 seconds)
1. In Supabase, click **Settings** (gear icon in sidebar)
2. Click **API** in settings menu
3. Copy the **Project URL** (starts with https://)
4. Copy the **anon public** key (long string)
5. In your code editor, create `.env` file in `medicare-plus` folder
6. Add these lines:

```
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

### Step 5: Run Application (10 seconds)
```bash
npm run dev
```

Open browser to: **http://localhost:5173**

## ✅ Verify Everything Works

### Test 1: Signup
1. Click "Sign Up"
2. Fill form with:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - Password: test123
3. Click "Sign Up"
4. Should redirect to Medicines page

### Test 2: Browse & Add to Cart
1. Click on any medicine
2. Click "Add to Cart"
3. Cart icon should show "1"
4. Click cart icon
5. Should see your item

### Test 3: Place Order
1. In cart, click "Proceed to Checkout"
2. Fill delivery details
3. Click "Place Order"
4. Should redirect to "My Orders"
5. Should see your order listed

### Test 4: Verify Persistence
1. Close browser tab
2. Open new tab to http://localhost:5173
3. Login with same credentials
4. Cart should be empty (order was placed)
5. Click "My Orders"
6. Your order should still be there ✅

## 🐛 Troubleshooting

### Error: "Invalid API credentials"
- Check `.env` file exists in `medicare-plus` folder
- Verify no spaces in URLs or keys
- Make sure you copied the **anon** key, not service_role key

### Error: Database errors
- Go back to Supabase SQL Editor
- Run schema.sql again
- Then run seed.sql again

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Changes not showing
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache

## 📊 What to Show Judges

1. **Authentication**: 
   - Sign up with new account
   - Logout
   - Login again

2. **Medicine Browsing**:
   - Search for "Paracetamol"
   - Filter by category "Vitamins"
   - Click a medicine to view details

3. **Cart Management**:
   - Add 3 different medicines
   - Change quantities
   - Remove one item
   - Show cart total updates

4. **Checkout**:
   - Proceed to checkout
   - Fill all fields (show validation errors if empty)
   - Place order

5. **Order History**:
   - Navigate to "My Orders"
   - Expand order to show items
   - Refresh page - order still there

6. **Database Persistence**:
   - Open Supabase dashboard
   - Go to Table Editor
   - Show `orders` table with your order
   - Show `order_items` table with items

## 🎯 Bonus Features to Demo

1. **Search**: Type "pain" in medicine search
2. **Category Filter**: Select "Antibiotics" from dropdown
3. **Input Validation**: Try signup with invalid email, see error
4. **Responsive Design**: Resize browser window, show mobile view
5. **Order Status**: Show different order statuses in Orders page

## 📱 Mobile Testing

1. Open Chrome DevTools (F12)
2. Click device toolbar icon (or Ctrl+Shift+M)
3. Select "iPhone 12 Pro"
4. Navigate through entire app
5. Everything should work smoothly

---

**You're ready to compete! Good luck! 🚀**
