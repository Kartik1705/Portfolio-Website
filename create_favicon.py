#!/usr/bin/env python3
"""
Create circular favicon with dark blue border like LinkedIn profile picture
"""
from PIL import Image, ImageDraw
import os

# Input and output paths
input_image = "assets/images/profile.jpg"
output_ico = "favicon.ico"
output_png = "assets/images/favicon.png"

def create_linkedin_style_favicon(img, size):
    """Create a circular favicon with dark blue border like LinkedIn"""
    # Convert to RGB
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Get dimensions
    width, height = img.size
    
    # Crop to focus on upper-center (where face usually is)
    crop_size = min(width, height)
    
    # Focus on face area (upper portion)
    left = (width - crop_size) // 2
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
    
    # Create output image with dark blue border (like your website theme)
    # Dark blue color from your website: #0D1B2A or #314C6F
    border_color = (13, 27, 42)  # #0D1B2A - dark navy blue
    border_width = max(2, int(size * 0.08))  # 8% border width
    
    # Calculate inner circle size
    inner_size = size - (border_width * 2)
    
    # Create base image with dark blue background
    output = Image.new('RGB', (size, size), border_color)
    
    # Create circular mask for the photo
    mask = Image.new('L', (inner_size, inner_size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, inner_size, inner_size), fill=255)
    
    # Resize photo to fit inside the border
    photo_resized = img_resized.resize((inner_size, inner_size), Image.Resampling.LANCZOS)
    
    # Create circular photo with transparency
    circular_photo = Image.new('RGBA', (inner_size, inner_size), (0, 0, 0, 0))
    circular_photo.paste(photo_resized, (0, 0))
    circular_photo.putalpha(mask)
    
    # Paste circular photo onto the dark blue background
    output.paste(circular_photo, (border_width, border_width), circular_photo)
    
    # Create outer circular mask to make the entire favicon circular
    outer_mask = Image.new('L', (size, size), 0)
    outer_draw = ImageDraw.Draw(outer_mask)
    outer_draw.ellipse((0, 0, size, size), fill=255)
    
    # Apply outer mask
    final_output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    final_output.paste(output, (0, 0))
    final_output.putalpha(outer_mask)
    
    return final_output

try:
    # Open the profile image
    img = Image.open(input_image)
    print(f"Original image size: {img.size}")
    
    print("\nCreating LinkedIn-style circular favicon with dark blue border...")
    
    # Create high-quality PNG (256x256) with transparency
    favicon_256 = create_linkedin_style_favicon(img, 256)
    favicon_256.save(output_png, format='PNG', optimize=True)
    print(f"✓ Created {output_png} (256x256, circular with dark blue border)")
    
    # Create ICO with multiple sizes
    icon_sizes = [16, 32, 48, 64]
    favicon_images = []
    
    for size in icon_sizes:
        circular_img = create_linkedin_style_favicon(img, size)
        # Convert to RGB with white background for ICO
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
    print(f"✓ Created {output_ico} (multi-size, circular with dark blue border)")
    
    print("\n✅ LinkedIn-style circular favicon created successfully!")
    print("  - Dark blue border (#0D1B2A)")
    print("  - Perfectly circular shape")
    print("  - Face-focused crop")
    print("  - Matches your website theme")
    
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
