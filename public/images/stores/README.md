# Medical Store Images

This folder contains images of medical stores/pharmacies for the homepage showcase section.

## Image Requirements

### Specifications
- **Format**: JPG or PNG
- **Size**: 1200x400px (3:1 aspect ratio) - wide landscape
- **Max file size**: 300KB per image
- **Quality**: High resolution, professional photography
- **Lighting**: Well-lit, clean, professional appearance

### File Names
- `store1.jpg` - First pharmacy image
- `store2.jpg` - Second pharmacy image
- `store3.jpg` - Third pharmacy image

## Image Guidelines

### What to Include
✅ Modern pharmacy interiors
✅ Well-organized medicine shelves
✅ Clean, professional environment
✅ Good lighting and visibility
✅ Professional staff (optional)
✅ Clear branding (if applicable)

### What to Avoid
❌ Blurry or low-quality images
❌ Poor lighting
❌ Cluttered or messy spaces
❌ Personal information visible
❌ Copyrighted logos (unless you have permission)

## Where to Find Images

### Free Stock Photo Sites
1. **Unsplash**: Search "pharmacy interior", "medical store"
2. **Pexels**: Search "pharmacy", "drugstore"
3. **Pixabay**: Search "pharmacy interior"

### Example Search Terms
- "pharmacy interior"
- "medical store"
- "drugstore shelves"
- "pharmacy counter"
- "medicine shelves"
- "healthcare store"

## Implementation

### Current Setup
The homepage displays 3 images in a hover-based slideshow:
- **Hover Effect**: Images transition when you hover over them
- **Auto-slide**: Images automatically cycle every 3 seconds
- **Smooth Transitions**: 700ms fade effect
- **Overlay**: Dark gradient with pharmacy name

### CSS Classes
```css
.store-slide {
  transition: opacity 0.7s ease-in-out;
  animation: store-auto-slide 9s infinite;
}
```

### HTML Structure
Each image has:
- Full-width background image
- Dark gradient overlay at bottom
- Pharmacy name (can be customized)
- Descriptive tagline

## Customization

### Change Pharmacy Names
Edit in `src/pages/Home.jsx`:
```jsx
<h3 className="text-2xl font-bold mb-2">Your Pharmacy Name</h3>
<p className="text-gray-200">Your tagline here</p>
```

### Adjust Timing
In `src/index.css`:
```css
/* Change 9s to your preferred total cycle time */
animation: store-auto-slide 9s infinite;

/* Stagger delays: 0s, 3s, 6s for 3 images */
/* If you want 4 seconds per image: 0s, 4s, 8s */
```

## Quick Start

1. **Download 3 pharmacy images** from stock sites
2. **Resize to 1200x400px** (use tools like Photoshop, Canva, or online resizers)
3. **Optimize file size** (use TinyJPG.com or Squoosh.app)
4. **Rename files**:
   - First image → `store1.jpg`
   - Second image → `store2.jpg`
   - Third image → `store3.jpg`
5. **Place in this folder** (`public/images/stores/`)
6. **Refresh browser** to see changes

## Example Image URLs (For Testing)

If you don't have images yet, you can use these Unsplash URLs temporarily:

```javascript
// In Home.jsx, temporarily use these URLs:
"https://images.unsplash.com/photo-1576671494200-79e247262301?w=1200&h=400&fit=crop"
"https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200&h=400&fit=crop"
"https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=400&fit=crop"
```

Then replace with your own local images later.

## Tips

1. **Consistent Style**: Use images with similar lighting and angles
2. **Brand Colors**: Choose images that complement your green theme
3. **Professional Look**: High-quality images build trust
4. **Compress Images**: Reduce file sizes without losing quality
5. **Test Both Themes**: Check appearance in light and dark modes

## Troubleshooting

**Images not showing?**
- Check file names are exactly: `store1.jpg`, `store2.jpg`, `store3.jpg`
- Verify files are in `public/images/stores/` folder
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors

**Slideshow not working?**
- Ensure CSS is loaded properly
- Check for JavaScript errors in console
- Try hard refresh

**Images look stretched?**
- Resize to 1200x400px (3:1 ratio)
- Use `object-cover` CSS property (already applied)
