#!/usr/bin/env python3
"""
Create HIGHLY VISIBLE circular favicon with light background
Professional look with subtle background that's always visible
"""
from PIL import Image, ImageDraw, ImageFilter
import os

input_image = "assets/images/profile.jpg"
output_ico = "favicon.ico"
output_png = "assets/images/favicon.png"
output_dir = "assets/images/favicons"

def create_visible_circular_favicon(img, size, bg_color=(240, 242, 245)):
    """
    Create circular favicon with LIGHT GRAY background for maximum visibility.
    Background: Light gray (240, 242, 245) - always visible on any browser theme
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
    
    # === CREATE IMAGE WITH LIGHT GRAY BACKGROUND ===
    final_img = Image.new('RGB', (size, size), bg_color)
    
    # === CIRCULAR MASK ===
    mask_size = size * 4
    mask = Image.new('L', (mask_size, mask_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    
    # Draw solid white circle
    mask_draw.ellipse([0, 0, mask_size, mask_size], fill=255)
    mask = mask.resize((size, size), Image.Resampling.LANCZOS)
    
    # === BORDER ===
    border_width = max(2, int(size * 0.025))
    border_img = Image.new('RGB', (size, size), bg_color)
    border_draw = ImageDraw.Draw(border_img)
    
    # Dark blue border
    border_color = (30, 58, 95)
    for i in range(border_width):
        offset = i
        border_draw.ellipse(
            [offset, offset, size - offset - 1, size - offset - 1],
            outline=border_color,
            width=1
        )
    
    # === ASSEMBLE ===
    img_final = img_upscaled.resize((size, size), Image.Resampling.LANCZOS)
    
    # Paste the photo into the circular area
    final_img.paste(img_final, (0, 0), mask)
    
    # Add border on top
    border_mask = Image.new('L', (size, size), 0)
    border_mask_draw = ImageDraw.Draw(border_mask)
    for i in range(border_width):
        offset = i
        border_mask_draw.ellipse(
            [offset, offset, size - offset - 1, size - offset - 1],
            outline=255,
            width=1
        )
    
    final_img.paste(border_img, (0, 0), border_mask)
    
    return final_img

def main():
    print("🎨 Creating VISIBLE favicon with light gray background...")
    
    if not os.path.exists(input_image):
        print(f"❌ Error: {input_image} not found!")
        return
    
    img = Image.open(input_image)
    print(f"✓ Loaded: {img.size}")
    
    # High quality PNG
    favicon_256 = create_visible_circular_favicon(img, 256)
    favicon_256.save(output_png, 'PNG', quality=95, optimize=True)
    print(f"✓ {output_png}")
    
    # Multi-size ICO
    sizes = [16, 24, 32, 48, 64]
    ico_images = []
    for size in sizes:
        favicon = create_visible_circular_favicon(img, size)
        ico_images.append(favicon)
    
    ico_images[0].save(output_ico, format='ICO', sizes=[(s, s) for s in sizes])
    print(f"✓ {output_ico} - {', '.join(f'{s}x{s}' for s in sizes)}")
    
    # Additional sizes for all platforms
    os.makedirs(output_dir, exist_ok=True)
    
    all_sizes = {
        'favicon-16x16.png': 16,
        'favicon-32x32.png': 32,
        'favicon-48x48.png': 48,
        'favicon-96x96.png': 96,
        'favicon-128x128.png': 128,
        'favicon-256x256.png': 256,
        'apple-touch-icon-57x57.png': 57,
        'apple-touch-icon-60x60.png': 60,
        'apple-touch-icon-72x72.png': 72,
        'apple-touch-icon-76x76.png': 76,
        'apple-touch-icon-114x114.png': 114,
        'apple-touch-icon-120x120.png': 120,
        'apple-touch-icon-144x144.png': 144,
        'apple-touch-icon-152x152.png': 152,
        'apple-touch-icon.png': 180,
        'android-chrome-192x192.png': 192,
        'android-chrome-512x512.png': 512,
        'mstile-70x70.png': 70,
        'mstile-144x144.png': 144,
        'mstile-150x150.png': 150,
        'mstile-310x150.png': 310,
        'mstile-310x310.png': 310,
    }
    
    for filename, size in all_sizes.items():
        favicon = create_visible_circular_favicon(img, size)
        favicon.save(os.path.join(output_dir, filename), 'PNG', quality=95, optimize=True)
    
    print(f"✓ Generated {len(all_sizes)} additional sizes in {output_dir}/")
    print("\n✅ SUCCESS! Favicon with LIGHT GRAY background generated!")
    print("📌 Background color: Light gray (240, 242, 245)")
    print("💡 This will be visible on ALL browser themes (light & dark)")

if __name__ == '__main__':
    main()
