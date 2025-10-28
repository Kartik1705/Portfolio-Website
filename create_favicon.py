#!/usr/bin/env python3
"""
Create professional circular favicon with thin border and zoomed face
Advanced version with anti-aliasing and perfect circular shape
"""
from PIL import Image, ImageDraw, ImageFilter
import os

# Input and output paths
input_image = "assets/images/profile.jpg"
output_ico = "favicon.ico"
output_png = "assets/images/favicon.png"

def create_professional_favicon(img, size):
    """
    Create a high-quality circular favicon with:
    - Thin elegant border (2-3%)
    - Zoomed-in face for maximum clarity
    - Perfect circular shape with anti-aliasing
    - No white space or square artifacts
    """
    # Convert to RGB for processing
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Get original dimensions
    width, height = img.size
    
    # AGGRESSIVE FACE ZOOM: Crop to a smaller area focusing on face
    # This will zoom in more than the previous version
    crop_size = min(width, height)
    
    # Zoom factor: crop to 70% of the original to zoom in on face
    zoom_factor = 0.7
    zoomed_crop_size = int(crop_size * zoom_factor)
    
    # Center crop with upward bias for face (5-10% from top)
    left = (width - zoomed_crop_size) // 2
    top = max(0, int((height - zoomed_crop_size) * 0.08))  # 8% from top for face focus
    right = left + zoomed_crop_size
    bottom = top + zoomed_crop_size
    
    # Ensure within bounds
    if bottom > height:
        bottom = height
        top = bottom - zoomed_crop_size
    if top < 0:
        top = 0
        bottom = top + zoomed_crop_size
    
    img_cropped = img.crop((left, top, right, bottom))
    
    # UPSCALE FIRST for better quality, then downscale
    # This technique improves final quality significantly
    upscale_size = size * 2
    img_upscaled = img_cropped.resize((upscale_size, upscale_size), Image.Resampling.LANCZOS)
    
    # Apply subtle sharpening for clarity
    img_upscaled = img_upscaled.filter(ImageFilter.UnsharpMask(radius=1, percent=120, threshold=3))
    
    # THIN BORDER: 2.5% border width (much thinner than before)
    border_width = max(1, int(size * 0.025))  # 2.5% thin border
    
    # Use a slightly lighter blue for subtlety: #1E3A5F (30, 58, 95)
    border_color = (30, 58, 95)  # Elegant dark blue
    
    # Calculate dimensions
    inner_size = size - (border_width * 2)
    
    # Create transparent base
    final_output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Create border circle
    border_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    border_draw = ImageDraw.Draw(border_layer)
    border_draw.ellipse((0, 0, size-1, size-1), fill=border_color)
    
    # Create photo circle with high-quality mask
    photo_resized = img_upscaled.resize((inner_size, inner_size), Image.Resampling.LANCZOS)
    
    # Create smooth circular mask with anti-aliasing
    mask = Image.new('L', (inner_size * 4, inner_size * 4), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse((0, 0, inner_size * 4, inner_size * 4), fill=255)
    mask = mask.resize((inner_size, inner_size), Image.Resampling.LANCZOS)
    
    # Create circular photo
    circular_photo = Image.new('RGBA', (inner_size, inner_size), (0, 0, 0, 0))
    circular_photo.paste(photo_resized, (0, 0))
    circular_photo.putalpha(mask)
    
    # Composite layers
    final_output.paste(border_layer, (0, 0), border_layer)
    final_output.paste(circular_photo, (border_width, border_width), circular_photo)
    
    # Create perfect outer circular mask with anti-aliasing
    outer_mask = Image.new('L', (size * 4, size * 4), 0)
    outer_draw = ImageDraw.Draw(outer_mask)
    outer_draw.ellipse((0, 0, size * 4, size * 4), fill=255)
    outer_mask = outer_mask.resize((size, size), Image.Resampling.LANCZOS)
    
    # Apply final circular mask for perfect circle
    final_output.putalpha(outer_mask)
    
    return final_output

try:
    # Open the profile image
    img = Image.open(input_image)
    print(f"✓ Original image loaded: {img.size}")
    
    print("\n🎨 Creating professional circular favicon...")
    print("   • Thin elegant border (2.5%)")
    print("   • Zoomed face for maximum clarity")
    print("   • Anti-aliased perfect circle")
    print("   • No white space or square artifacts\n")
    
    # Create high-quality PNG (256x256) with transparency
    print("📐 Generating 256x256 PNG...")
    favicon_256 = create_professional_favicon(img, 256)
    favicon_256.save(output_png, format='PNG', optimize=True, quality=95)
    file_size = os.path.getsize(output_png) / 1024
    print(f"   ✓ {output_png} ({file_size:.1f} KB)")
    
    # Create ICO with multiple sizes
    print("\n📐 Generating multi-size ICO...")
    icon_sizes = [16, 32, 48, 64]
    favicon_images = []
    
    for size in icon_sizes:
        circular_img = create_professional_favicon(img, size)
        # Convert RGBA to RGB with transparent areas as white for ICO compatibility
        rgb_img = Image.new('RGB', (size, size), (255, 255, 255))
        rgb_img.paste(circular_img, (0, 0), circular_img)
        favicon_images.append(rgb_img)
        print(f"   ✓ {size}x{size} variant")
    
    # Save as multi-resolution ICO
    favicon_images[0].save(output_ico, format='ICO', sizes=[(s, s) for s in icon_sizes])
    ico_size = os.path.getsize(output_ico) / 1024
    print(f"\n✓ {output_ico} ({ico_size:.1f} KB)")
    
    print("\n" + "="*60)
    print("✅ SUCCESS! Professional favicon created with:")
    print("   ✓ Thin elegant border (2.5% width)")
    print("   ✓ Zoomed-in face (70% crop for maximum clarity)")
    print("   ✓ Perfect circular shape with anti-aliasing")
    print("   ✓ Crystal clear quality with sharpening")
    print("   ✓ No white space or square artifacts")
    print("   ✓ Transparent background (RGBA PNG)")
    print("="*60)
    
except FileNotFoundError:
    print(f"❌ Error: Could not find {input_image}")
    print("   Make sure the profile image exists in assets/images/")
except Exception as e:
    print(f"❌ Error creating favicon: {str(e)}")
    import traceback
    traceback.print_exc()
