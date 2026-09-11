# Visual Verification Guide - What You Should See

## 🖥️ Step-by-Step Visual Guide

### 1. Development Server Terminal

When you run `npm run dev`, you should see:

```
✅ CORRECT OUTPUT:
npm notice run medicare-plus@0.0.0 dev
npm notice run vite
  VITE v8.3.0  ready in 202 ms
  ➜  Local:   http://localhost:5175/
  ➜  Network: use --host to expose
```

```
❌ WRONG - If you see errors like:
- [plugin:vite:css] PostCSS errors
- module is not defined
- Cannot find module
→ See TROUBLESHOOTING.md
```

---

### 2. Browser - Homepage (Not Logged In)

Open http://localhost:5175

#### ✅ What You SHOULD See:

**Navigation Bar:**
- Logo: "MediCare Plus" with a + icon in a teal box
- Links: "Home" "Medicines" 
- Right side: Cart icon, "Login" button, "Sign Up" button (teal)
- Background: Dark with slight transparency (glassmorphism)

**Hero Section:**
- LARGE heading: "Your Health, Our Priority"
- Text in gradient: white → light teal → teal
- Subheading: "Access quality medicines delivered..."
- Two buttons: "Browse Medicines" (teal) and "Create Account" (dark gray)
- Background: Dark with soft teal glowing circles

**Features Section:**
- Three cards in a row (mobile: stacked):
  1. "100% Genuine" with shield icon
  2. "Fast Delivery" with lightning icon  
  3. "Best Prices" with money icon
- Cards: Dark background, hover effect (slight lift)

**Featured Medicines:**
- Heading: "Featured Medicines"
- Grid of 6 medicine cards:
  - Each card shows: image, name, price, "Add to Cart" button
  - Hover: card lifts slightly
  - Dark background with rounded corners

**Colors You Should See:**
- Background: Very dark gray (almost black)
- Accents: Teal/cyan (#06b6d4)
- Text: White and light gray
- Buttons: Teal gradients
- Cards: Dark gray with borders

#### ❌ What You Should NOT See:
- Plain white background
- No styling (just black text on white)
- Broken images everywhere
- Missing buttons
- Plain HTML look
→ If you see this, check .env file and restart server

---

### 3. Sign Up Page

Click "Sign Up" button

#### ✅ What You SHOULD See:

**Page Layout:**
- Centered card with dark background
- Glowing teal circles in background
- Form title: "Create Account"
- Subtitle: "Join MediCare Plus for faster checkout"

**Form Fields (all with dark inputs):**
1. "Full Name" input
2. "Email" input
3. "Phone Number" input
4. "Password" input
5. "Confirm Password" input
6. Large teal "Sign Up" button
7. Bottom text: "Already have an account? Login"

**Validation (when you make mistakes):**
- Empty field: Red border + error text below
- Invalid email: "Invalid email format"
- Short password: "Password must be at least 6 characters"
- Password mismatch: "Passwords do not match"

#### Test This:
1. Leave all fields empty → Click Sign Up
2. You should see red errors under each field
3. Type something in a field
4. The error should disappear immediately

---

### 4. After Successful Sign Up

#### ✅ What You SHOULD See:

**Automatic redirect to:** `/medicines` page

**Top Right Changed:**
- Your name appears: "Test User"
- Your email: "test@example.com"
- "Sign Out" button (instead of Login/Sign Up)

**New nav link appeared:**
- "My Orders" link in navigation

**Medicines Page:**
- Search bar at top
- Category dropdown
- Grid of ALL 15 medicines
- Can click any medicine to see details

#### ❌ If This Doesn't Happen:
- Still on sign up page → Check browser console (F12)
- Error message → Check .env credentials
- Can't find user in Supabase → Re-run schema.sql

---

### 5. Medicines Listing Page

Go to "Medicines" or click "Browse Medicines"

#### ✅ What You SHOULD See:

**Top Section:**
- Heading: "All Medicines"
- Search bar with magnifying glass icon
- Category dropdown showing "All Categories"
- Results count: "Showing 15 of 15 medicines"

**Medicine Grid:**
15 medicine cards showing:
1. Paracetamol 500mg - $4.99
2. Ibuprofen 400mg - $6.99
3. Aspirin 75mg - $5.49
4. Amoxicillin 500mg - $12.99 (Rx Required badge)
5. Azithromycin 250mg - $15.99 (Rx Required badge)
6. Vitamin D3 1000 IU - $8.99
7. Omega-3 Fish Oil - $18.99
8. Multivitamin Complex - $14.99
9. Cetirizine 10mg - $7.99
10. Loratadine 10mg - $6.99
11. Omeprazole 20mg - $11.99
12. Probiotics Daily - $22.99
13. Metformin 500mg - $9.99 (Rx Required badge)
14. Amlodipine 5mg - $13.99 (Rx Required badge)
15. Atorvastatin 10mg - $16.99 (Rx Required badge)

**Each Card Shows:**
- Medicine image (or placeholder)
- Category badge (top left): "Pain Relief", "Vitamins", etc.
- "Rx Required" badge if prescription needed (top right, red)
- Medicine name
- Description (2 lines max)
- Price in large teal text
- "Add to Cart" button

#### Test Search:
1. Type "pain" in search
2. Should see only: Paracetamol, Ibuprofen, Aspirin
3. Clear search
4. All 15 medicines return

#### Test Category Filter:
1. Select "Vitamins" from dropdown
2. Should see only: Vitamin D3, Omega-3, Multivitamin
3. Select "All Categories"
4. All 15 medicines return

---

### 6. Medicine Detail Page

Click any medicine card

#### ✅ What You SHOULD See:

**Left Side:**
- Large medicine image
- If Rx required: Red warning box below image

**Right Side:**
- Category badge
- Medicine name as large heading
- Price (large, teal)
- "per unit" text
- Description card (dark box with full description)
- Stock Status card:
  - Green dot + "In Stock (XXX available)"
  - Or Red dot + "Out of Stock"
- Quantity selector:
  - Minus button
  - Number in center
  - Plus button
  - Total price calculation
- "Add to Cart" button (full width, teal)

**Back Button:**
- Top left: "← Back to Medicines"

#### Test Quantity:
1. Click + button
2. Quantity increases
3. Total price updates
4. Click Add to Cart
5. Cart icon (top right) shows badge "1"

---

### 7. Shopping Cart

Click cart icon (top right)

#### ✅ What You SHOULD See:

**If Cart Has Items:**

**Left Side (Cart Items):**
- Each item in a dark card:
  - Medicine image (small)
  - Name
  - Price per unit
  - Quantity controls (-, number, +)
  - Remove button (X)
  - Item total

**Right Side (Order Summary):**
- "Order Summary" heading
- Subtotal: $XX.XX
- Delivery: Free (in green)
- Total: $XX.XX (large, teal)
- "Proceed to Checkout" button (teal)
- "Continue Shopping" link

#### Test Cart Features:
1. Change quantity with + / - buttons
2. Total updates immediately
3. Click X to remove item
4. Item disappears
5. If cart becomes empty...

**If Cart Is Empty:**
- Shopping bag icon (gray)
- "Your cart is empty"
- "Add some medicines to get started"
- "Browse Medicines" button

---

### 8. Checkout Page

Click "Proceed to Checkout" (must be logged in)

#### ✅ What You SHOULD See:

**Left Side (Delivery Details Form):**
- Heading: "Delivery Details"
- Full Name field (pre-filled with your name)
- Delivery Address textarea
- Phone Number field (pre-filled with your phone)
- Payment Method card:
  - Cash icon
  - "Cash on Delivery"
  - "Pay when you receive your order"

**Right Side (Order Summary Sidebar):**
- Each item with quantity
- Subtotal
- Delivery: Free
- Total (large)
- "Place Order" button

#### Test Validation:
1. Clear the address field
2. Try to place order
3. See red error: "Address is required"
4. Fill it back in
5. Error disappears

#### After Clicking "Place Order":
- Loading state: "Placing Order..."
- Then redirects to "/orders"
- Shows success message (green):
  - "Order placed successfully!"
  - "Your order will be delivered within 24-48 hours"

---

### 9. Order History Page

Go to "My Orders" or after checkout

#### ✅ What You SHOULD See:

**If You Have Orders:**

Each order card shows:
- Order ID (first 8 characters)
- Status badge (color-coded):
  - Pending = Yellow
  - Processing = Blue
  - Shipped = Purple
  - Delivered = Green
  - Cancelled = Red
- Date & time placed
- Total amount (large, teal)
- Delivery details card (dark):
  - Name
  - Phone
  - Address
- Item count: "X items"
- Click to expand/collapse items

**When Expanded:**
- Shows each item:
  - Medicine image
  - Name
  - Quantity
  - Price

#### Test Persistence:
1. Refresh the page (F5)
2. Orders still there ✅
3. Close browser completely
4. Open again
5. Login
6. Orders still there ✅

**If No Orders Yet:**
- Shopping bag icon
- "No orders yet"
- "Start shopping to see your orders here"

---

### 10. Mobile View Test

Resize browser to mobile size (375px width)

#### ✅ What You SHOULD See:

**Navigation:**
- Logo still visible
- Cart icon visible
- Login/Name visible
- Links may stack or hide (hamburger menu)

**Homepage:**
- Hero text smaller but readable
- Feature cards stacked vertically
- Medicine grid: 1 card per row

**Medicines Page:**
- Search bar full width
- Category dropdown full width
- Cards stacked: 1 per row

**Cart:**
- Cart items full width
- Order summary below items (not beside)

**Checkout:**
- Form full width
- Summary below form (not beside)

**Everything Still Works:**
- ✅ Can scroll
- ✅ Buttons are tappable
- ✅ Forms are usable
- ✅ Text is readable

---

## 🔍 Verification in Supabase Dashboard

### Table Editor - What You Should See:

#### 1. profiles table:
- Your user row with:
  - id (UUID)
  - full_name: "Test User"
  - email: "test@example.com"
  - phone: "1234567890"
  - created_at timestamp

#### 2. medicines table:
- 15 rows of medicine data
- Columns: id, name, description, price, category, image_url, in_stock, stock_quantity, requires_prescription

#### 3. orders table (after placing an order):
- Your order row with:
  - id (UUID)
  - user_id (matches your profile id)
  - total_amount (decimal)
  - status: "pending"
  - delivery_name, delivery_address, delivery_phone
  - created_at timestamp

#### 4. order_items table (after placing an order):
- One row per item in your order:
  - id (UUID)
  - order_id (matches your order)
  - medicine_id (matches a medicine)
  - quantity (integer)
  - price_at_time (decimal)

#### 5. cart_items table:
- If logged in and have items in cart:
  - Your cart items
- If you checked out:
  - Should be empty (cleared after order)

### Authentication → Users:
- You should see your user account:
  - Email
  - Created at timestamp
  - Last sign in
  - Email confirmed: false (because we disabled it)

---

## 🎯 Final Verification Checklist

Before competition, verify ALL of these:

- [ ] **Dev server starts with no errors**
- [ ] **Homepage loads with dark theme and teal accents**
- [ ] **Can see "MediCare Plus" logo**
- [ ] **Can see 6 featured medicines on homepage**
- [ ] **Can click "Sign Up" and see the form**
- [ ] **Form validation shows red errors when needed**
- [ ] **Can create new account successfully**
- [ ] **Redirects to medicines page after signup**
- [ ] **Name appears in top right after login**
- [ ] **Can see all 15 medicines in grid**
- [ ] **Search bar filters medicines correctly**
- [ ] **Category dropdown filters medicines correctly**
- [ ] **Can click a medicine to see details**
- [ ] **Can add medicine to cart**
- [ ] **Cart badge shows count**
- [ ] **Can view cart and see items**
- [ ] **Can change quantities in cart**
- [ ] **Can remove items from cart**
- [ ] **Cart total calculates correctly**
- [ ] **Can proceed to checkout (when logged in)**
- [ ] **Checkout form pre-fills name and phone**
- [ ] **Form validation works on checkout**
- [ ] **Can place order successfully**
- [ ] **Redirects to order history after order**
- [ ] **Can see order in "My Orders"**
- [ ] **Can expand order to see items**
- [ ] **Refresh page - order still there**
- [ ] **Close browser, reopen, login - order still there**
- [ ] **Mobile view works (resize browser)**
- [ ] **All buttons work on mobile**
- [ ] **Can see user in Supabase Auth**
- [ ] **Can see medicines in Supabase table**
- [ ] **Can see order in Supabase orders table**
- [ ] **Can see order items in Supabase order_items table**

**If ALL checked = 100% READY FOR COMPETITION** 🏆

---

## 🐛 Common Visual Issues

### Issue: Everything looks plain (black text on white)
**Cause**: Tailwind CSS not loading  
**Fix**: Check terminal for CSS errors, restart dev server

### Issue: No medicines showing
**Cause**: Database not seeded or .env wrong  
**Fix**: Run seed.sql in Supabase, check .env

### Issue: Can't login after signup
**Cause**: Email confirmation enabled  
**Fix**: Disable in Supabase Auth → Providers → Email

### Issue: Images not loading
**Cause**: Unsplash URLs (normal)  
**Effect**: Placeholder images show - this is FINE for competition

### Issue: Cart icon not bouncing
**Cause**: Animation timing  
**Effect**: Cosmetic only - not critical

---

**Use this guide to visually verify every part of your application before the competition!**
