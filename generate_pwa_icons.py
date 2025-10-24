#!/usr/bin/env python3
"""
PWA Icon Generator for Portfolio Website
Creates 192x192 and 512x512 icons with DNA helix theme
"""

from PIL import Image, ImageDraw, ImageFont
import math

def create_dna_icon(size):
    """Create a DNA helix icon with biotech theme"""
    
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Color scheme - Navy and Cream
    navy = (49, 76, 111, 255)  # #314C6F
    blue = (99, 132, 162, 255)  # #6384A2
    cream = (249, 244, 232, 255)  # #F9F4E8
    accent = (0, 217, 179, 255)  # #00D9B3
    
    # Background circle with gradient effect
    padding = size // 10
    circle_bbox = [padding, padding, size - padding, size - padding]
    
    # Draw main background circle
    draw.ellipse(circle_bbox, fill=navy)
    
    # Draw DNA helix
    center_x = size // 2
    center_y = size // 2
    helix_width = size // 3
    helix_height = size * 0.7
    
    # Number of points for smooth helix
    num_points = 50
    strand_width = max(2, size // 40)
    
    # Draw two DNA strands
    for i in range(num_points - 1):
        # Progress along helix (0 to 1)
        t1 = i / num_points
        t2 = (i + 1) / num_points
        
        # Y positions
        y1 = center_y - helix_height // 2 + t1 * helix_height
        y2 = center_y - helix_height // 2 + t2 * helix_height
        
        # X positions for strand 1 (sine wave)
        angle1 = t1 * 4 * math.pi
        angle2 = t2 * 4 * math.pi
        x1_strand1 = center_x + math.sin(angle1) * helix_width // 2
        x2_strand1 = center_x + math.sin(angle2) * helix_width // 2
        
        # X positions for strand 2 (opposite phase)
        x1_strand2 = center_x - math.sin(angle1) * helix_width // 2
        x2_strand2 = center_x - math.sin(angle2) * helix_width // 2
        
        # Draw strand 1 (blue/accent gradient)
        color1 = accent if i % 8 < 4 else blue
        draw.line([(x1_strand1, y1), (x2_strand1, y2)], 
                 fill=color1, width=strand_width)
        
        # Draw strand 2 (cream)
        draw.line([(x1_strand2, y1), (x2_strand2, y2)], 
                 fill=cream, width=strand_width)
        
        # Draw connecting base pairs at crossover points
        if i % 6 == 0:
            base_width = max(1, strand_width // 2)
            draw.line([(x1_strand1, y1), (x1_strand2, y1)], 
                     fill=cream, width=base_width)
    
    # Draw decorative circles at crossover points
    num_circles = 8
    for i in range(num_circles):
        t = i / num_circles
        angle = t * 4 * math.pi
        y = center_y - helix_height // 2 + t * helix_height
        
        # Circles on strand 1
        x_strand1 = center_x + math.sin(angle) * helix_width // 2
        circle_r = max(2, size // 50)
        draw.ellipse(
            [x_strand1 - circle_r, y - circle_r, 
             x_strand1 + circle_r, y + circle_r],
            fill=accent
        )
        
        # Circles on strand 2
        x_strand2 = center_x - math.sin(angle) * helix_width // 2
        draw.ellipse(
            [x_strand2 - circle_r, y - circle_r, 
             x_strand2 + circle_r, y + circle_r],
            fill=cream
        )
    
    # Add initials or text (optional - for larger icon)
    if size >= 512:
        try:
            # Try to use a nice font, fall back to default
            font_size = size // 8
            try:
                font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
            except:
                font = ImageFont.load_default()
            
            # Draw "KP" at bottom
            text = "KP"
            # Get text size using textbbox
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            text_x = center_x - text_width // 2
            text_y = size - padding - text_height - size // 20
            
            # Draw text with shadow
            draw.text((text_x + 2, text_y + 2), text, fill=(0, 0, 0, 100), font=font)
            draw.text((text_x, text_y), text, fill=cream, font=font)
        except Exception as e:
            print(f"Could not add text: {e}")
    
    return img


def main():
    """Generate PWA icons"""
    print("🧬 Generating PWA Icons with DNA Theme...")
    
    # Create 192x192 icon
    print("Creating 192x192 icon...")
    icon_192 = create_dna_icon(192)
    icon_192.save('assets/images/icon-192x192.png', 'PNG')
    print("✅ Saved: assets/images/icon-192x192.png")
    
    # Create 512x512 icon
    print("Creating 512x512 icon...")
    icon_512 = create_dna_icon(512)
    icon_512.save('assets/images/icon-512x512.png', 'PNG')
    print("✅ Saved: assets/images/icon-512x512.png")
    
    # Also create favicon (32x32)
    print("Creating 32x32 favicon...")
    icon_32 = create_dna_icon(32)
    icon_32.save('assets/images/favicon-32x32.png', 'PNG')
    print("✅ Saved: assets/images/favicon-32x32.png")
    
    # Create apple touch icon (180x180)
    print("Creating 180x180 Apple touch icon...")
    icon_180 = create_dna_icon(180)
    icon_180.save('assets/images/apple-touch-icon.png', 'PNG')
    print("✅ Saved: assets/images/apple-touch-icon.png")
    
    print("\n🎉 All PWA icons generated successfully!")
    print("\nNext steps:")
    print("1. Check assets/images/ folder for generated icons")
    print("2. Icons are already referenced in manifest.json")
    print("3. Add favicon link to HTML <head>:")
    print('   <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32x32.png">')
    print('   <link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png">')


if __name__ == '__main__':
    main()
