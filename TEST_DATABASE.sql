-- Run this in Supabase SQL Editor to test if medicines are loaded

-- 1. Check total count
SELECT COUNT(*) as total_medicines FROM medicines;
-- Expected: 40

-- 2. Check first 5 medicines
SELECT id, name, category, price, image_url, in_stock 
FROM medicines 
ORDER BY name 
LIMIT 5;
-- Should show 5 medicines with placeholder.svg paths

-- 3. Check if all images are set correctly
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN image_url LIKE '%placeholder.svg%' THEN 1 END) as with_placeholder,
  COUNT(CASE WHEN image_url IS NULL OR image_url = '' THEN 1 END) as without_image
FROM medicines;
-- Expected: total=40, with_placeholder=40, without_image=0

-- 4. If you need to RESET and reload data:
-- UNCOMMENT THESE LINES (remove the -- at the start of each line):

-- DELETE FROM medicines;
-- Then copy and paste ALL the INSERT statements from seed.sql file

-- 5. Sample query to test a specific medicine
SELECT * FROM medicines WHERE name = 'Paracetamol 500mg';
-- Should return 1 row with all details
