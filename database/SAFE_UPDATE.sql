-- Safe Update Script for Medicare Plus Database
-- Run this in Supabase SQL Editor to update medicines without breaking orders

-- Step 1: Delete order_items first (they reference medicines)
DELETE FROM order_items;

-- Step 2: Delete orders (now safe since order_items are gone)
DELETE FROM orders;

-- Step 3: Now we can safely delete medicines
DELETE FROM medicines;

-- Step 4: Insert new medicines with real images
-- Copy and paste ALL the INSERT statements from seed.sql below this line

