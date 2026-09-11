# Medicine Images Setup Guide

## 📁 Folder Structure
```
public/
└── images/
    └── medicines/
        ├── README.md
        ├── placeholder.png.txt
        ├── paracetamol.png
        ├── ibuprofen.png
        ├── aspirin.png
        ├── amoxicillin.png
        ├── azithromycin.png
        ├── vitamin-d3.png
        ├── omega-3.png
        ├── multivitamin.png
        ├── cetirizine.png
        ├── loratadine.png
        ├── omeprazole.png
        ├── probiotics.png
        ├── metformin.png
        ├── amlodipine.png
        └── atorvastatin.png
```

## 🎨 Image Specifications

### Required Dimensions
- **Size**: 400x300px (4:3 aspect ratio)
- **Format**: PNG (recommended) or JPG
- **Max file size**: 200KB per image
- **Background**: White or transparent
- **DPI**: 72-96

### Image Optimization
All images are automatically optimized by the application:
- Lazy loading enabled
- `object-contain` for proper aspect ratio
- Responsive sizing with CSS
- Background gradient in dark mode

## 📥 How to Add Images

### Method 1: Download from Stock Sites
1. Visit free stock photo sites:
   - Unsplash (unsplash.com)
   - Pexels (pexels.com)
   - Pixabay (pixabay.com)

2. Search for: "medicine pills", "tablets", "capsules", "vitamin bottles"

3. Download images at 400x300px or resize them

4. Rename to match database names:
   - `paracetamol.png`
   - `ibuprofen.png`
   - etc.

5. Place in `public/images/medicines/` folder

### Method 2: Create Placeholder Images
Use a tool like Figma, Canva, or Photoshop to create simple medicine images:
- Add pill/capsule shapes
- Use brand colors (green/white theme)
- Add medicine name as text
- Export as PNG

### Method 3: Use Online Generators
1. Go to placeholder.com or via.placeholder.com
2. Generate 400x300 images
3. Download and rename appropriately

## 🗄️ Update Database
After adding images, the database is already configured to use local paths:
```sql
'/images/medicines/paracetamol.png'
'/images/medicines/ibuprofen.png'
-- etc.
```

If you need to update, re-run `database/seed.sql` in Supabase.

## ✅ Current Implementation

### Image Display
- **Home Page**: Featured medicines with optimized images
- **Medicines Page**: Grid view with all products
- **Medicine Detail**: Large product image
- **Cart**: Small thumbnail images
- **Orders**: Order history with product images

### CSS Classes Used
```css
.medicine-image {
  width: 100%;
  height: 12rem; /* 48px * 4 = 192px */
  object-fit: contain;
  background: linear-gradient to bottom-right, 
    from gray-50 to gray-100;
  /* Dark mode */
  dark:from gray-800/50 dark:to emerald-900/20;
  border-radius: 0.5rem;
}
```

### Features
- ✅ Lazy loading for performance
- ✅ Fallback to placeholder image
- ✅ Responsive sizing
- ✅ Greenish gradient in dark mode
- ✅ Proper aspect ratio maintained
- ✅ Optimized for all screen sizes

## 🎯 Best Practices

1. **Consistent Style**: Use similar photography style for all products
2. **Clean Background**: White or transparent backgrounds work best
3. **Good Lighting**: Ensure products are well-lit and clear
4. **Centered Products**: Keep medicine/bottle centered in frame
5. **Compression**: Use tools like TinyPNG to compress images

## 🔧 Testing

After adding images:
1. Start dev server: `npm run dev`
2. Navigate to Medicines page
3. Check if images load correctly
4. Test in both light and dark modes
5. Verify responsive behavior on mobile

## 📝 Notes

- Images are served from `/public` folder
- Path in database: `/images/medicines/filename.png`
- No build step required - images are static assets
- Vite automatically handles asset optimization
- Images are cached by browser for performance

## 🚀 Quick Start

1. Create/download 15 medicine images
2. Resize to 400x300px
3. Save as PNG files with correct names
4. Place in `public/images/medicines/`
5. Restart dev server
6. Images will appear automatically!

## ⚠️ Troubleshooting

**Images not showing?**
- Check file names match exactly (case-sensitive)
- Verify images are in correct folder
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for 404 errors

**Images too large?**
- Compress using TinyPNG.com
- Resize to 400x300px
- Use PNG format with optimization

**Dark mode looks bad?**
- Images with transparent backgrounds work best
- White backgrounds also work well with gradient overlay
