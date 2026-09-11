# Medicine Images Setup Guide

## Current Status ✅
- **Placeholder SVG created**: All medicines now use a green-themed medicine bottle SVG placeholder
- **40 medicines added** to database with detailed descriptions
- **Click-to-view enabled**: Clicking medicine images/cards on Home and Medicines pages navigates to detail view
- **Error handling**: Images automatically fallback to placeholder if loading fails

## What Works Now
1. ✅ SVG placeholder displays for all medicines
2. ✅ Click on any medicine image → Opens detailed overview page
3. ✅ 3-tab detail page (Overview, Usage & Dosage, Precautions)
4. ✅ No broken images - graceful fallback
5. ✅ Green theme consistent with your design

## How to Add Real Medicine Images

### Option 1: Use the Placeholder (Current Setup)
The SVG placeholder is already working! It shows:
- Green medicine bottle icon
- Pills
- "Click to view details" text
- Matches your green/white theme

### Option 2: Add Real Product Images

#### Step 1: Prepare Images
- **Format**: PNG, JPG, or WebP
- **Size**: 400x300px (4:3 aspect ratio recommended)
- **Background**: White or transparent
- **File size**: Under 200KB each
- **Quality**: High resolution, clear product shot

#### Step 2: Name Your Images
Use simple, lowercase names matching the medicine:
```
paracetamol.png
ibuprofen.png
aspirin.png
amoxicillin.png
vitamin-d3.png
omega-3.png
metformin.png
etc.
```

#### Step 3: Place in Folder
Put all images in: `public/images/medicines/`

#### Step 4: Update Database
Run this SQL in Supabase to update image paths:
```sql
-- Example: Update specific medicine image
UPDATE medicines 
SET image_url = '/images/medicines/paracetamol.png' 
WHERE name = 'Paracetamol 500mg';

-- Or update all at once with a pattern
UPDATE medicines 
SET image_url = '/images/medicines/' || 
  LOWER(REPLACE(REPLACE(name, ' ', '-'), 'mg', '')) || '.png';
```

### Option 3: Use Online Image URLs
You can use direct URLs from CDNs or image hosting:

```sql
UPDATE medicines 
SET image_url = 'https://yourdomain.com/images/paracetamol.png' 
WHERE name = 'Paracetamol 500mg';
```

## File Structure
```
medicare-plus/
├── public/
│   └── images/
│       ├── medicines/
│       │   ├── placeholder.svg  ← Working now!
│       │   ├── paracetamol.png  ← Add yours here
│       │   ├── ibuprofen.png
│       │   └── ... (add 40 images)
│       └── stores/
│           ├── store1.jpg
│           ├── store2.jpg
│           └── store3.jpg
```

## Where Images Are Used

### 1. Home Page (Featured Medicines)
- Displays 6 random medicines
- Click image → Goes to detail page
- Shows "Rx Required" badge if prescription needed

### 2. Medicines Page (All Medicines)
- Grid of all 40 medicines
- Search and filter by category
- Click image → Goes to detail page
- Shows category badge

### 3. Medicine Detail Page
- Large product image
- 3-tab information system:
  - **Overview**: Uses, mechanism, duration
  - **Usage**: Dosage instructions
  - **Precautions**: Safety information
- Add to cart functionality

## Image Fallback System
The app has smart error handling:
```javascript
onError={(e) => {
  e.target.src = '/images/medicines/placeholder.svg'
}}
```
If any image fails to load, it automatically shows the placeholder.

## Quick Test
1. Run the app: `npm run dev`
2. Go to Home page
3. Click any medicine image
4. Should navigate to detail page with 3 tabs

## All 40 Medicines in Database

### Pain Relief (5)
- Paracetamol 500mg
- Ibuprofen 400mg
- Aspirin 75mg
- Diclofenac 50mg
- Tramadol 50mg

### Antibiotics (4)
- Amoxicillin 500mg
- Azithromycin 250mg
- Ciprofloxacin 500mg
- Doxycycline 100mg

### Vitamins (6)
- Vitamin D3 1000 IU
- Omega-3 Fish Oil
- Multivitamin Complex
- Vitamin C 1000mg
- Calcium + D3
- B-Complex

### Allergy (4)
- Cetirizine 10mg
- Loratadine 10mg
- Montelukast 10mg
- Phenylephrine

### Digestive (5)
- Omeprazole 20mg
- Probiotics Daily
- Ranitidine 150mg
- Loperamide
- Pancreatin

### Diabetes (3)
- Metformin 500mg
- Glimepiride 2mg
- Insulin Glargine

### Cardiovascular (5)
- Amlodipine 5mg
- Atorvastatin 10mg
- Losartan 50mg
- Metoprolol 50mg
- Clopidogrel 75mg

### Respiratory (2)
- Salbutamol Inhaler
- Budesonide Inhaler

### Skin Care (2)
- Clotrimazole Cream
- Hydrocortisone 1%

### Mental Health (2)
- Escitalopram 10mg
- Alprazolam 0.5mg

## Next Steps
1. ✅ Database updated with 40 medicines
2. ✅ Placeholder SVG working
3. ✅ Click-to-view functionality active
4. ✅ Detail pages with tabs complete
5. 🔄 (Optional) Add real product images following guide above

## Need Help?
- Images not showing? Check browser console for 404 errors
- Detail page not opening? Verify database has been updated with seed.sql
- Want different placeholder? Edit `public/images/medicines/placeholder.svg`
