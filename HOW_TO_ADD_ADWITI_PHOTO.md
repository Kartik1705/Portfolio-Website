# 📸 How to Add Adwiti's Real LinkedIn Photo

## ✅ Current Status
- Professional placeholder avatar with initials "AL" is currently live
- Gradient background (LinkedIn blue to navy)
- Located at: `assets/images/recommendations/adwiti-liberatore.jpg`

## 🎯 To Replace with Real Photo

### Method 1: Manual Download (Easiest)
1. **Visit her LinkedIn profile**:
   - Go to: https://www.linkedin.com/in/adwiti-liberatore/

2. **Download her profile picture**:
   - Right-click on her profile picture
   - Select "Save Image As..."
   - Save as: `adwiti-liberatore.jpg`

3. **Replace the file**:
   - Navigate to: `Portfolio-Website/assets/images/recommendations/`
   - Replace the existing `adwiti-liberatore.jpg` with the downloaded image

4. **Recommended Image Specs**:
   - Format: JPG or PNG
   - Minimum size: 400x400px
   - Aspect ratio: 1:1 (square)
   - File size: Keep under 200KB for fast loading

5. **Deploy**:
   ```bash
   git add assets/images/recommendations/adwiti-liberatore.jpg
   git commit -m "Update Adwiti's profile photo with real LinkedIn image"
   git push origin main
   ```

### Method 2: Use LinkedIn Profile Picture URL
If you have her direct image URL:
1. Update the HTML `src` attribute in `index.html` (line ~540)
2. Change from local path to direct URL

### Method 3: Screenshot (If download fails)
1. Open her LinkedIn profile
2. Take a high-quality screenshot of her profile picture
3. Crop to square (1:1 ratio)
4. Save as JPG
5. Replace the file as in Method 1

## 🎨 What's Already Set Up

The CSS is ready to display the real image beautifully:
- ✅ Circular crop (border-radius: 50%)
- ✅ Hover effects (scale, rotate, ring animation)
- ✅ Shadow effects
- ✅ Responsive sizing
- ✅ Fallback styling if image fails to load

## 📍 File Location
```
Portfolio-Website/
└── assets/
    └── images/
        └── recommendations/
            └── adwiti-liberatore.jpg  ← Replace this file
```

## 🚀 After Replacing
The image will automatically:
- Show in circular frame
- Have hover effects (grows, rotates, shows ring)
- Link to her LinkedIn profile
- Work on all devices (responsive)
- Display properly in both light and dark modes

## 💡 Tips
- Use highest quality image available
- Square images work best (avoid rectangular)
- Ensure face is centered
- Recommended dimensions: 400x400px or higher
- Keep file size reasonable (< 200KB)

---

**Current Image**: Professional placeholder with "AL" initials
**Status**: ✅ Live and working
**Next Step**: Replace with real LinkedIn photo when ready
