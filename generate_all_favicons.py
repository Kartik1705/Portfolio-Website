#!/usr/bin/env python3
"""
COMPLETE FAVICON GENERATOR - Google-Style Professional Circular Favicons
Generates all necessary sizes and formats for perfect display across:
- Browser tabs (all browsers)
- Bookmarks
- iOS devices (iPhone, iPad)
- Android devices (home screen)
- Windows tiles
- Progressive Web Apps (PWA)
"""
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import os
import json

# Input and output configuration
INPUT_IMAGE = "assets/images/profile.jpg"
OUTPUT_DIR = "assets/images/favicons"

# Create output directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

# All required favicon sizes for complete cross-platform support
FAVICON_SIZES = {
    # Browser favicons
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'favicon-48x48.png': 48,
    
    # Apple Touch Icons (iOS)
    'apple-touch-icon-57x57.png': 57,
    'apple-touch-icon-60x60.png': 60,
    'apple-touch-icon-72x72.png': 72,
    'apple-touch-icon-76x76.png': 76,
    'apple-touch-icon-114x114.png': 114,
    'apple-touch-icon-120x120.png': 120,
    'apple-touch-icon-144x144.png': 144,
    'apple-touch-icon-152x152.png': 152,
    'apple-touch-icon-180x180.png': 180,
    'apple-touch-icon.png': 180,  # Default Apple Touch Icon
    
    # Android Chrome
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
    
    # Microsoft Tiles
    'mstile-70x70.png': 70,
    'mstile-144x144.png': 144,
    'mstile-150x150.png': 150,
    'mstile-310x310.png': 310,
    
    # High-res for PWA and modern browsers
    'favicon-196x196.png': 196,
    'favicon-256x256.png': 256,
}

def create_circular_favicon(img, size, border_width_percent=2.5):
    """
    Create a perfect circular favicon with Google-style quality
    
    Args:
        img: PIL Image object
        size: Output size in pixels
        border_width_percent: Border width as percentage of size
    
    Returns:
        PIL Image object (RGBA with transparency)
    """
    # Convert to RGB
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    width, height = img.size
    
    # Smart cropping: Focus on face area with zoom
    crop_size = min(width, height)
    
    # Zoom factor for face visibility (70% crop = 1.43x zoom)
    zoom_factor = 0.70
    zoomed_crop_size = int(crop_size * zoom_factor)
    
    # Center horizontally, slightly up for face focus
    left = (width - zoomed_crop_size) // 2
    top = max(0, int((height - zoomed_crop_size) * 0.08))
    right = left + zoomed_crop_size
    bottom = top + zoomed_crop_size
    
    # Boundary checks
    if bottom > height:
        bottom = height
        top = bottom - zoomed_crop_size
    if top < 0:
        top = 0
        bottom = top + zoomed_crop_size
    
    # Crop to face area
    img_cropped = img.crop((left, top, right, bottom))
    
    # SUPER-SAMPLING: Render at 4x size for perfect anti-aliasing
    supersample = 4
    large_size = size * supersample
    
    # Resize to large size with best quality
    img_large = img_cropped.resize((large_size, large_size), Image.Resampling.LANCZOS)
    
    # Apply subtle sharpening for clarity
    img_large = img_large.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
    
    # Calculate border dimensions
    border_width = max(1, int(size * border_width_percent / 100)) * supersample
    inner_size = large_size - (border_width * 2)
    
    # Border color: Professional dark blue
    border_color = (30, 58, 95)  # #1E3A5F
    
    # Create transparent canvas
    output = Image.new('RGBA', (large_size, large_size), (0, 0, 0, 0))
    
    # Step 1: Create border circle
    border_layer = Image.new('RGBA', (large_size, large_size), (0, 0, 0, 0))
    border_draw = ImageDraw.Draw(border_layer)
    border_draw.ellipse((0, 0, large_size-1, large_size-1), fill=border_color + (255,))
    
    # Step 2: Create photo mask (perfect circle)
    mask = Image.new('L', (inner_size, inner_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse((0, 0, inner_size-1, inner_size-1), fill=255)
    
    # Resize photo to fit inside border
    photo_resized = img_large.resize((inner_size, inner_size), Image.Resampling.LANCZOS)
    
    # Apply circular mask to photo
    circular_photo = Image.new('RGBA', (inner_size, inner_size), (0, 0, 0, 0))
    circular_photo.paste(photo_resized, (0, 0))
    circular_photo.putalpha(mask)
    
    # Composite layers
    output.paste(border_layer, (0, 0), border_layer)
    output.paste(circular_photo, (border_width, border_width), circular_photo)
    
    # Step 3: Apply outer circular mask for perfect circle
    outer_mask = Image.new('L', (large_size, large_size), 0)
    outer_draw = ImageDraw.Draw(outer_mask)
    outer_draw.ellipse((0, 0, large_size-1, large_size-1), fill=255)
    
    # Apply smooth edges with slight blur for anti-aliasing
    outer_mask = outer_mask.filter(ImageFilter.GaussianBlur(radius=1))
    output.putalpha(outer_mask)
    
    # Downscale to target size (creates perfect anti-aliasing)
    output = output.resize((size, size), Image.Resampling.LANCZOS)
    
    return output

def generate_ico_file():
    """Generate multi-resolution .ico file for browsers"""
    img = Image.open(INPUT_IMAGE)
    
    # ICO sizes: 16, 32, 48, 64
    ico_sizes = [16, 32, 48, 64]
    ico_images = []
    
    print("\n📦 Generating favicon.ico (multi-resolution)...")
    for size in ico_sizes:
        circular = create_circular_favicon(img, size)
        # Convert to RGB with white background for ICO
        rgb = Image.new('RGB', (size, size), (255, 255, 255))
        rgb.paste(circular, (0, 0), circular)
        ico_images.append(rgb)
        print(f"   ✓ {size}x{size}")
    
    # Save as ICO
    ico_images[0].save('favicon.ico', format='ICO', sizes=[(s, s) for s in ico_sizes])
    size_kb = os.path.getsize('favicon.ico') / 1024
    print(f"   ✓ favicon.ico ({size_kb:.1f} KB)")

def generate_all_png_favicons():
    """Generate all PNG favicons in various sizes"""
    img = Image.open(INPUT_IMAGE)
    
    print("\n📐 Generating PNG favicons for all platforms...")
    print("="*60)
    
    for filename, size in FAVICON_SIZES.items():
        output_path = os.path.join(OUTPUT_DIR, filename)
        
        # Create circular favicon
        circular = create_circular_favicon(img, size)
        
        # Save with optimization
        circular.save(output_path, format='PNG', optimize=True, quality=95)
        
        size_kb = os.path.getsize(output_path) / 1024
        print(f"✓ {filename:35} ({size}x{size:3}) - {size_kb:5.1f} KB")
    
    print("="*60)

def generate_browserconfig_xml():
    """Generate browserconfig.xml for Windows tiles"""
    browserconfig = """<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="/assets/images/favicons/mstile-70x70.png"/>
            <square150x150logo src="/assets/images/favicons/mstile-150x150.png"/>
            <square310x310logo src="/assets/images/favicons/mstile-310x310.png"/>
            <TileColor>#1E3A5F</TileColor>
        </tile>
    </msapplication>
</browserconfig>
"""
    
    with open('browserconfig.xml', 'w') as f:
        f.write(browserconfig)
    
    print("\n✓ browserconfig.xml created (Windows tiles)")

def generate_site_webmanifest():
    """Generate site.webmanifest for PWA and Android"""
    manifest = {
        "name": "Kartik Pandya - Product Manager & Healthcare Innovator",
        "short_name": "Kartik Pandya",
        "icons": [
            {
                "src": "/assets/images/favicons/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/assets/images/favicons/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "theme_color": "#1E3A5F",
        "background_color": "#0D1B2A",
        "display": "standalone"
    }
    
    with open('site.webmanifest', 'w') as f:
        json.dump(manifest, f, indent=2)
    
    print("✓ site.webmanifest created (PWA & Android)")

def generate_html_snippet():
    """Generate HTML code snippet for easy integration"""
    html_snippet = """
<!-- Favicons - Complete Cross-Platform Support -->
<!-- Standard Favicons -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicons/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/assets/images/favicons/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="196x196" href="/assets/images/favicons/favicon-196x196.png">

<!-- Apple Touch Icons (iOS) -->
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicons/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="152x152" href="/assets/images/favicons/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="144x144" href="/assets/images/favicons/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="120x120" href="/assets/images/favicons/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="114x114" href="/assets/images/favicons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="76x76" href="/assets/images/favicons/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="72x72" href="/assets/images/favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="60x60" href="/assets/images/favicons/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="57x57" href="/assets/images/favicons/apple-touch-icon-57x57.png">

<!-- Android Chrome -->
<link rel="icon" type="image/png" sizes="192x192" href="/assets/images/favicons/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/assets/images/favicons/android-chrome-512x512.png">

<!-- Web App Manifest -->
<link rel="manifest" href="/site.webmanifest">

<!-- Microsoft Tiles -->
<meta name="msapplication-TileColor" content="#1E3A5F">
<meta name="msapplication-TileImage" content="/assets/images/favicons/mstile-144x144.png">
<meta name="msapplication-config" content="/browserconfig.xml">

<!-- Theme Colors -->
<meta name="theme-color" content="#1E3A5F">
<meta name="msapplication-navbutton-color" content="#1E3A5F">
<meta name="apple-mobile-web-app-status-bar-style" content="#1E3A5F">
"""
    
    with open('favicon_html_snippet.txt', 'w') as f:
        f.write(html_snippet.strip())
    
    print("✓ favicon_html_snippet.txt created (copy to your HTML)")

def main():
    """Main execution function"""
    print("\n" + "="*60)
    print("🎨 PROFESSIONAL CIRCULAR FAVICON GENERATOR")
    print("   Google-Style Quality | All Platforms")
    print("="*60)
    
    try:
        # Verify input image exists
        if not os.path.exists(INPUT_IMAGE):
            print(f"\n❌ ERROR: Could not find {INPUT_IMAGE}")
            print("   Please ensure your profile image is in assets/images/")
            return
        
        img = Image.open(INPUT_IMAGE)
        print(f"\n✓ Input image loaded: {img.size} ({INPUT_IMAGE})")
        
        # Generate all favicons
        generate_ico_file()
        generate_all_png_favicons()
        generate_browserconfig_xml()
        generate_site_webmanifest()
        generate_html_snippet()
        
        # Summary
        print("\n" + "="*60)
        print("✅ SUCCESS! All favicons generated:")
        print("="*60)
        print(f"📁 Location: {OUTPUT_DIR}/")
        print(f"📊 Total files: {len(FAVICON_SIZES) + 4}")
        print("\n📦 Generated files:")
        print("   ✓ favicon.ico (root directory)")
        print(f"   ✓ {len(FAVICON_SIZES)} PNG files (various sizes)")
        print("   ✓ browserconfig.xml (Windows)")
        print("   ✓ site.webmanifest (PWA/Android)")
        print("   ✓ favicon_html_snippet.txt (integration code)")
        
        print("\n🎯 Features:")
        print("   ✓ Perfect circular shape (like Google)")
        print("   ✓ Thin elegant border (2.5%)")
        print("   ✓ Zoomed face for clarity")
        print("   ✓ Anti-aliased smooth edges")
        print("   ✓ Transparent background")
        print("   ✓ 4x super-sampling for quality")
        print("   ✓ All platform sizes included")
        
        print("\n📱 Supported Platforms:")
        print("   ✓ All web browsers (Chrome, Firefox, Safari, Edge)")
        print("   ✓ iOS devices (iPhone, iPad)")
        print("   ✓ Android devices (home screen)")
        print("   ✓ Windows tiles")
        print("   ✓ Progressive Web Apps (PWA)")
        print("   ✓ Bookmarks and favorites")
        
        print("\n📝 Next Steps:")
        print("   1. Copy the HTML code from 'favicon_html_snippet.txt'")
        print("   2. Paste it into your index.html <head> section")
        print("   3. Commit and push to GitHub")
        print("   4. Clear browser cache or use Incognito mode to test")
        print("="*60)
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
