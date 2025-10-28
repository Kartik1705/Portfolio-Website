#!/usr/bin/env python3
"""
Create visible circular favicon with solid background
Like Google - they have colored backgrounds, not pure transparency
"""
from PIL import Image, ImageDraw, ImageFilter
import os

input_image = "assets/images/profile.jpg"
output_ico = "favicon.ico"
output_png = "assets/images/favicon.png"
output_dir = "assets/images/favicons"

def create_visible_circular_favicon(img, size, bg_color=(255, 255, 255)):
    """
    Create circular favicon with SOLID background (like Google).
    Google doesn't use transparent backgrounds - they use solid colors!
    """
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    width, height = img.size
    
    # === FACE ZOOM ===
    crop_size = min(width, height)
    zoom_factor = 0.65
    zoomed_crop_size = int(crop_size * zoom_factor)
    
    left = (width - zoomed_crop_size) // 2
    top = max(0, int((height - zoomed_crop_size) * 0.05))
    right = left + zoomed_crop_size
    bottom = top + zoomed_crop_size
    
    if bottom > height:
        bottom = height
        top = bottom - zoomed_crop_size
    if top < 0:
        top = 0
        bottom = top + zoomed_crop_size
    
    img_cropped = img.crop((left, top, right, bottom))
    
    # === QUALITY ===
    upscale_size = size * 3
    img_upscaled = img_cropped.resize((upscale_size, upscale_size), Image.Resampling.LANCZOS)
    img_upscaled = img_upscaled.filter(ImageFilter.UnsharpMask(radius=1.5, percent=150, threshold=3))
    
    # === CREATE IMAGE WITH SOLID BACKGROUND ===
    final_img = Image.new('RGB', (size, size), bg_color)
    
    # Thin border
    border_width = max(2, int(size * 0.025))
    border_color = (30, 58, 95)  # Dark blue
    
    # Create circular mask for photo
    mask_size = size * 4
    smooth_mask = Image.new('L', (mask_size, mask_size), 0)
    mask_draw = ImageDraw.Draw(smooth_mask)
    smooth_mask_draw = ImageDraw.Draw(smooth_mask)
    smooth_mask_draw.ellipse((0, 0, mask_size, mask_size), fill=255)
    smooth_mask = smooth_mask.resize((size, size), Image.Resampling.LANCZOS)
    
    # Resize photo
    photo_resized = img_upscaled.resize((size, size), Image.Resampling.LANCZOS)
    
    # Draw border circle on background
    draw = ImageDraw.Draw(final_img)
    draw.ellipse((0, 0, size-1, size-1), outline=border_color, width=border_width)
    
    # Create circular photo
    photo_temp = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    photo_temp.paste(photo_resized, (0, 0))
    photo_temp.putalpha(smooth_mask)
    
    # Paste photo onto white background
    final_img.paste(photo_temp, (0, 0), photo_temp)
    
    return final_img

def main():
    try:
        print("=" * 70)
        print("🎯 CREATING VISIBLE CIRCULAR FAVICON")
        print("   (With solid background like Google actually uses)")
        print("=" * 70)
        
        img = Image.open(input_image)
        print(f"\n✓ Loaded: {img.size}")
        
        os.makedirs(output_dir, exist_ok=True)
        
        # White background (most visible)
        print("\n🎨 Creating favicons with WHITE background...")
        
        # Main PNG
        favicon_256 = create_visible_circular_favicon(img, 256, bg_color=(255, 255, 255))
        favicon_256.save(output_png, format='PNG', optimize=True, quality=100)
        print(f"   ✓ {output_png}")
        
        # ICO
        icon_sizes = [16, 24, 32, 48, 64]
        favicon_images = []
        for icon_size in icon_sizes:
            favicon_images.append(create_visible_circular_favicon(img, icon_size, bg_color=(255, 255, 255)))
            print(f"   ✓ {icon_size}x{icon_size}")
        
        favicon_images[0].save(output_ico, format='ICO', sizes=[(s, s) for s in icon_sizes])
        print(f"\n✓ {output_ico}")
        
        # All sizes
        print("\n🎨 Creating all sizes...")
        sizes_dict = {
            'favicon-16x16.png': 16,
            'favicon-32x32.png': 32,
            'favicon-48x48.png': 48,
            'favicon-96x96.png': 96,
            'favicon-196x196.png': 196,
            'favicon-256x256.png': 256,
            'apple-touch-icon.png': 180,
            'apple-touch-icon-57x57.png': 57,
            'apple-touch-icon-60x60.png': 60,
            'apple-touch-icon-72x72.png': 72,
            'apple-touch-icon-76x76.png': 76,
            'apple-touch-icon-114x114.png': 114,
            'apple-touch-icon-120x120.png': 120,
            'apple-touch-icon-144x144.png': 144,
            'apple-touch-icon-152x152.png': 152,
            'apple-touch-icon-180x180.png': 180,
            'android-chrome-192x192.png': 192,
            'android-chrome-512x512.png': 512,
            'mstile-70x70.png': 70,
            'mstile-144x144.png': 144,
            'mstile-150x150.png': 150,
            'mstile-310x310.png': 310,
        }
        
        for filename, size in sizes_dict.items():
            favicon = create_visible_circular_favicon(img, size, bg_color=(255, 255, 255))
            output_path = os.path.join(output_dir, filename)
            favicon.save(output_path, format='PNG', optimize=True, quality=100)
            print(f"   ✓ {filename}")
        
        print("\n" + "=" * 70)
        print("✅ SUCCESS! Visible circular favicon created!")
        print("=" * 70)
        print("\n🎯 FEATURES:")
        print("   ✓ WHITE solid background (VISIBLE)")
        print("   ✓ Circular profile photo")
        print("   ✓ Thin dark blue border")
        print("   ✓ Zoomed face - crystal clear")
        print("   ✓ Like Google's favicon style (solid background)")
        print("\n   NOTE: Google doesn't use transparent backgrounds!")
        print("   They use solid colors so favicons are always visible.")
        print("=" * 70)
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
