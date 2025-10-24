#!/usr/bin/env python3
"""
Generate Company Logo Placeholders
"""

from PIL import Image, ImageDraw, ImageFont
import os

companies = [
    {"name": "PERIOFILL.png", "text": "PERIOFILL", "color": "#0066cc"},
    {"name": "RAMESHWAR.png", "text": "RAMESHWAR\nBOILER", "color": "#ff6b35"},
]

def create_logo(company_data, output_path):
    """Create a simple text-based logo"""
    width, height = 400, 400
    
    # Create white background
    img = Image.new('RGB', (width, height), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    # Parse color
    color = company_data["color"]
    r = int(color[1:3], 16)
    g = int(color[3:5], 16)
    b = int(color[5:7], 16)
    
    # Draw border
    border_width = 10
    draw.rectangle([border_width, border_width, width-border_width, height-border_width], 
                   outline=(r, g, b), width=border_width)
    
    # Try to use a nice font
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
    except:
        font = ImageFont.load_default()
    
    # Draw text (centered)
    text = company_data["text"]
    bbox = draw.multiline_textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    text_x = (width - text_width) // 2
    text_y = (height - text_height) // 2
    
    draw.multiline_text((text_x, text_y), text, fill=(r, g, b), font=font, align='center')
    
    # Save image
    img.save(output_path, 'PNG')
    print(f"Created: {output_path}")

def main():
    output_dir = "/Users/kartikpandya/Desktop/Github/Portfolio-Website/Website/assets/images/companies"
    
    for company in companies:
        output_path = os.path.join(output_dir, company["name"])
        create_logo(company, output_path)
    
    print(f"\n✅ Successfully created {len(companies)} company logos!")

if __name__ == "__main__":
    main()
