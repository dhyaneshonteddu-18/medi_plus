# 🎯 How to Update Database (Fixed Foreign Key Error)

## The Problem
You got this error:
```
ERROR: update or delete on table "medicines" violates foreign key constraint
```

This happens because you have existing orders that reference the old medicines.

## ✅ The Solution

### Step 1: Open Supabase
Go to: https://supabase.com/dashboard/project/sbcepgoyvbwifizdqvvu

### Step 2: Open SQL Editor
- Click "SQL Editor" in the left sidebar
- Click "New Query"

### Step 3: Run the Complete Update Script
- Open the file: `database/COMPLETE_UPDATE.sql`
- Copy **ALL** the content (Ctrl+A, Ctrl+C)
- Paste it into the Supabase SQL Editor
- Click the green "Run" button

### Step 4: Wait for Success
You should see:
```
Success. 43 rows returned
```

This script:
1. ✅ Deletes order_items (clears references)
2. ✅ Deletes orders (clears old orders)
3. ✅ Deletes medicines (now safe!)
4. ✅ Inserts 40 new medicines with **real Unsplash images**

### Step 5: Verify It Worked
In the same SQL Editor, run:
```sql
SELECT COUNT(*) FROM medicines;
```

Should show: **40**

---

## 🚀 Then Test Your App

### 1. Restart Dev Server
```powershell
npm run dev
```

### 2. Open Browser
Go to: `http://localhost:5173`

### 3. What You'll See
- **Real medicine images** from Unsplash!
- Pills, bottles, capsules
- Professional pharmacy photos
- Click any medicine → See detail page with 3 tabs

---

## 🎨 About the Images

All 40 medicines now use **real images from Unsplash**:
- Free stock photos
- Medicine bottles
- Pills and capsules
- Pharmacy products
- Professional quality
- 400x300px size

If Unsplash images don't load (rate limit), the app automatically shows the green placeholder.

---

## ✨ What This Does

**Before:**
- Few medicines
- No images or broken images
- Old data

**After:**
- 40 medicines across 10 categories
- Real product images
- Clean design (no coupons/membership)
- 3-tab detail system
- Ready to use!

---

## ⚠️ Important Notes

- **This deletes all existing orders!** Only use in development
- **Old medicine IDs will change** (new UUIDs generated)
- **Images load from Unsplash** (requires internet)
- **Fallback system** works if images fail

---

## 🆘 If You Get Errors

### Error: "permission denied"
**Solution:** Make sure you're logged into the correct Supabase project

### Error: "relation does not exist"
**Solution:** Run `schema.sql` first, then `COMPLETE_UPDATE.sql`

### Images don't show
**Solution:** They're loading from Unsplash - wait a few seconds or check internet connection

---

## ✅ Quick Checklist

- [ ] Opened Supabase dashboard
- [ ] Clicked SQL Editor → New Query  
- [ ] Copied ALL of COMPLETE_UPDATE.sql
- [ ] Pasted and clicked Run
- [ ] Saw "Success. 43 rows returned"
- [ ] Verified count: 40 medicines
- [ ] Restarted: npm run dev
- [ ] Opened http://localhost:5173
- [ ] Saw real medicine images!

**That's it! Your database is updated with 40 medicines and real images!** 🎉
