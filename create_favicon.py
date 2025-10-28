#!/usr/bin/env python3
"""
Create favicon from profile picture
"""
from PIL import Image
import os

# Input and output paths
input_image = "assets/images/profile.jpg"
output_ico = "favicon.ico"
output_png = "assets/images/favicon.png"

try:
    # Open the profile image
    img = Image.open(input_image)
    
    # Convert to RGB if necessary
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Create square image by cropping to center
    width, height = img.size
    min_dimension = min(width, height)
    left = (width - min_dimension) // 2
    top = (height - min_dimension) // 2
    right = left + min_dimension
    bottom = top + min_dimension
    img_square = img.crop((left, top, right, bottom))
    
    # Create favicon sizes
    # ICO format with multiple sizes
    icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    img_square.save(output_ico, format='ICO', sizes=icon_sizes)
    print(f"✓ Created {output_ico}")
    
    # Create PNG version (256x256 for better quality)
    img_256 = img_square.resize((256, 256), Image.Resampling.LANCZOS)
    img_256.save(output_png, format='PNG', optimize=True)
    print(f"✓ Created {output_png}")
    
    print("\n✓ Favicon files created successfully!")
    print("  - favicon.ico (root directory)")
    print("  - assets/images/favicon.png")
    
except Exception as e:
    print(f"✗ Error: {e}")
    print("\nTrying alternative method...")
    
    # Alternative method without ICO format
    try:
        img = Image.open(input_image)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        width, height = img.size
        min_dimension = min(width, height)
        left = (width - min_dimension) // 2
        top = (height - min_dimension) // 2
        img_square = img.crop((left, top, left + min_dimension, top + min_dimension))
        
        # Just create PNG versions
        img_32 = img_square.resize((32, 32), Image.Resampling.LANCZOS)
        img_32.save("favicon-32x32.png", format='PNG', optimize=True)
        
        img_256 = img_square.resize((256, 256), Image.Resampling.LANCZOS)
        img_256.save(output_png, format='PNG', optimize=True)
        
        print("✓ Created PNG favicon files")
        
    except Exception as e2:
        print(f"✗ Alternative method also failed: {e2}")
