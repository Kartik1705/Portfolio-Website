#!/usr/bin/env python3
"""
Create a professional placeholder image for Adwiti Liberatore
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_professional_avatar(name, output_path, size=400):
    """Create a professional avatar with initials"""
    
    # Get initials
    initials = ''.join([word[0].upper() for word in name.split()[:2]])
    
    # Create image with gradient background
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)
    
    # Professional gradient colors (LinkedIn blue to navy)
    color1 = (0, 119, 181)  # LinkedIn blue
    color2 = (49, 76, 111)  # Navy
    
    # Create gradient
    for y in range(size):
        blend = y / size
        r = int(color1[0] * (1 - blend) + color2[0] * blend)
        g = int(color1[1] * (1 - blend) + color2[1] * blend)
        b = int(color1[2] * (1 - blend) + color2[2] * blend)
        draw.line([(0, y), (size, y)], fill=(r, g, b))
    
    # Add circular mask
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse([0, 0, size, size], fill=255)
    
    # Create final circular image
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img, (0, 0))
    output.putalpha(mask)
    
    # Add initials
    try:
        # Try to use a nice font
        font_size = size // 3
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        # Fallback to default font
        font = ImageFont.load_default()
    
    # Draw initials
    draw = ImageDraw.Draw(output)
    
    # Get text bounding box for centering
    bbox = draw.textbbox((0, 0), initials, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - font_size // 10
    
    # Draw text with shadow for depth
    shadow_offset = 3
    draw.text((x + shadow_offset, y + shadow_offset), initials, fill=(0, 0, 0, 100), font=font)
    draw.text((x, y), initials, fill=(255, 255, 255, 255), font=font)
    
    # Save as JPEG
    # Convert RGBA to RGB for JPEG
    background = Image.new('RGB', (size, size), (240, 242, 245))
    background.paste(output, (0, 0), output)
    
    background.save(output_path, 'JPEG', quality=95, optimize=True)
    print(f"✓ Created professional avatar: {output_path}")
    print(f"✓ Size: {size}x{size}px")
    print(f"✓ Initials: {initials}")

if __name__ == '__main__':
    # Create directory if it doesn't exist
    os.makedirs('assets/images/recommendations', exist_ok=True)
    
    # Create avatar for Adwiti Liberatore
    create_professional_avatar(
        'Adwiti Liberatore',
        'assets/images/recommendations/adwiti-liberatore.jpg',
        size=400
    )
    
    print("\n📝 Note: This is a professional placeholder.")
    print("   To add her real photo:")
    print("   1. Visit: https://www.linkedin.com/in/adwiti-liberatore/")
    print("   2. Right-click her profile picture and 'Save Image As...'")
    print("   3. Save to: assets/images/recommendations/adwiti-liberatore.jpg")
    print("   4. Commit and push the changes")
