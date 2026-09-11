# Troubleshooting: Medicine Detail Page Not Loading

## Issue
When clicking on medicine cards, the page is blank or shows "No routes matched location" error.

## Steps to Fix

### Step 1: Update Database (MOST IMPORTANT!)
You MUST run the seed.sql in Supabase first!

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy ALL content from `database/seed.sql`
5. Paste it into the SQL editor
6. Click "Run" button
7. You should see "Success. 40 rows returned"

**If you see an error about duplicate keys:**
```sql
-- Run this FIRST to clear old data
DELETE FROM medicines;

-- Then run the INSERT statements from seed.sql
```

### Step 2: Verify Data in Supabase
1. Go to "Table Editor" in Supabase
2. Click on "medicines" table
3. You should see 40 rows of medicines
4. Check that each row has:
   - id (UUID)
   - name
   - description
   - price
   - category
   - image_url = '/images/medicines/placeholder.svg'
   - in_stock = true
   - stock_quantity (number)

### Step 3: Check Browser Console
1. Open your app in browser
2. Press F12 to open Developer Tools
3. Go to "Console" tab
4. Refresh the page
5. Look for these messages:
   - "Featured medicines loaded: [Array]" ← Should show 6 medicines
   - If you see errors, note what they say

### Step 4: Test Navigation
1. On Home page, click any medicine card
2. URL should change to something like: `http://localhost:5173/medicine/abc-123-def`
3. Check console for:
   - "MedicineDetail rendered with ID: abc-123-def"
   - "Fetching medicine with ID: abc-123-def"
   - "Medicine data: {object}"

### Common Issues & Solutions

#### Issue: "No routes matched location"
**Solution:** 
- Make sure App.jsx has both routes (already fixed):
```javascript
<Route path="/medicine/:id" element={<MedicineDetail />} />
<Route path="/medicines/:id" element={<MedicineDetail />} />
```

#### Issue: "Medicine not found"
**Solution:**
- Database not updated
- Run seed.sql in Supabase (Step 1 above)

#### Issue: Blank page, no errors
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Restart dev server: `npm run dev`

#### Issue: "Error fetching medicine: Object"
**Solution:**
- Check Supabase connection
- Verify .env file has correct credentials:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Step 5: Manual Test
Try accessing a medicine directly:
1. Go to Supabase → Table Editor → medicines
2. Copy any medicine's ID (UUID format)
3. In browser, go to: `http://localhost:5173/medicine/PASTE_ID_HERE`
4. Should show the medicine detail page

### Still Not Working?

Run this diagnostic query in Supabase SQL Editor:
```sql
-- Check if medicines exist
SELECT COUNT(*) as total_medicines FROM medicines;

-- Check first 3 medicines
SELECT id, name, category, in_stock FROM medicines LIMIT 3;

-- Check if all have images
SELECT COUNT(*) as without_images 
FROM medicines 
WHERE image_url IS NULL OR image_url = '';
```

Expected results:
- total_medicines: 40
- Should see 3 medicine names
- without_images: 0

### Debug Mode
Check browser console for these exact messages:
1. ✅ "Featured medicines loaded: Array(6)"
2. ✅ "MedicineDetail rendered with ID: [some-uuid]"
3. ✅ "Fetching medicine with ID: [some-uuid]"
4. ✅ "Medicine data: {id: '...', name: '...', ...}"

If ANY of these are missing, that's where the problem is!

### Last Resort
If nothing works:
1. Stop dev server (Ctrl+C)
2. Clear node_modules: `Remove-Item -Recurse -Force node_modules`
3. Reinstall: `npm install`
4. Restart: `npm run dev`
5. Clear browser cache completely
6. Try incognito/private window

---

## Quick Checklist
- [ ] Ran seed.sql in Supabase
- [ ] See 40 medicines in Supabase table editor
- [ ] .env file exists with correct credentials
- [ ] Dev server is running
- [ ] No errors in browser console
- [ ] Can see medicine cards on Home page
- [ ] Clicking card changes URL
- [ ] Console shows "MedicineDetail rendered"
