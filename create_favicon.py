#!/usr/bin/env python3
"""
Create circular favicon from profile picture with face focus
"""
from PIL import Image, ImageDraw
import os

# Input and output paths
input_image = "assets/images/profile.jpg"
output_ico = "favicon.ico"
output_png = "assets/images/favicon.png"

def create_circular_thumbnail(img, size):
    """Create a circular thumbnail focused on the center/face"""
    # Convert to RGB
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Get dimensions
    width, height = img.size
    
    # Crop to focus on upper-center (where face usually is in portraits)
    # Take a square from the center-top area
    crop_size = min(width, height)
    
    # Adjust crop to focus more on upper portion (face area)
    left = (width - crop_size) // 2
    # Move top up by 15% to focus on face instead of full body
    top = max(0, int((height - crop_size) * 0.15))
    right = left + crop_size
    bottom = top + crop_size
    
    # Ensure we don't go out of bounds
    if bottom > height:
        bottom = height
        top = bottom - crop_size
    
    img_cropped = img.crop((left, top, right, bottom))
    
    # Resize to target size with high-quality resampling
    img_resized = img_cropped.resize((size, size), Image.Resampling.LANCZOS)
    
    # Create circular mask
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    # Create output image with transparency
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img_resized, (0, 0))
    output.putalpha(mask)
    
    return output

try:
    # Open the profile image
    img = Image.open(input_image)
    print(f"Original image size: {img.size}")
    
    # Create circular favicon in multiple sizes
    print("\nCreating circular favicons...")
    
    # Create high-quality PNG (256x256)
    favicon_256 = create_circular_thumbnail(img, 256)
    favicon_256.save(output_png, format='PNG', optimize=True)
    print(f"✓ Created {output_png} (256x256, circular)")
    
    # Create ICO with multiple sizes (for better browser support)
    icon_sizes = [16, 32, 48, 64]
    favicon_images = []
    
    for size in icon_sizes:
        circular_img = create_circular_thumbnail(img, size)
        # Convert back to RGB for ICO format (with white background)
        rgb_img = Image.new('RGB', (size, size), (255, 255, 255))
        rgb_img.paste(circular_img, (0, 0), circular_img)
        favicon_images.append(rgb_img)
    
    # Save as ICO
    favicon_images[0].save(
        output_ico,
        format='ICO',
        sizes=[(s, s) for s in icon_sizes],
        append_images=favicon_images[1:]
    )
    print(f"✓ Created {output_ico} (multi-size, circular)")
    
    print("\n✅ Circular favicon files created successfully!")
    print("  - favicon.ico (root directory) - circular with face focus")
    print("  - assets/images/favicon.png - circular with transparent background")
    
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
