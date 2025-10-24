#!/usr/bin/env python3
"""
Generate Project Thumbnails for Portfolio Website
Creates consistent 600x400px thumbnails with gradients and text
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Project data matching the website
projects = [
    {"name": "project1.jpg", "title": "Remote Patient\nMonitoring", "subtitle": "Oncology Trials", "color": "#0066cc"},
    {"name": "project2.jpg", "title": "iFood Marketing\nAnalytics", "subtitle": "Marketing Strategy", "color": "#00a651"},
    {"name": "project3.jpg", "title": "Residential Energy\nStorage", "subtitle": "Market Research", "color": "#ff6b35"},
    {"name": "project4.jpg", "title": "AI Product\nFramework", "subtitle": "AI Strategy", "color": "#0066cc"},
    {"name": "project5.jpg", "title": "Gen Z Investing\nBehaviour", "subtitle": "Market Research", "color": "#00a651"},
    {"name": "project6.jpg", "title": "Bintelligent\nSustainability", "subtitle": "Green Tech", "color": "#00a651"},
    {"name": "project7.jpg", "title": "Tableau\nDashboard", "subtitle": "Data Visualization", "color": "#0066cc"},
    {"name": "project8.jpg", "title": "3D Food\nPrinting", "subtitle": "Innovation", "color": "#ff6b35"},
    {"name": "project9.jpg", "title": "WBA M&A\nStrategy", "subtitle": "Business Strategy", "color": "#0066cc"},
    {"name": "project10.jpg", "title": "GC:MS E&L\nTechnology", "subtitle": "Market Research", "color": "#00a651"},
    {"name": "project11.jpg", "title": "OptiFlow Supply\nChain", "subtitle": "Optimization", "color": "#0066cc"},
    {"name": "project12.jpg", "title": "PM VALLEY\nCase Study", "subtitle": "Product Management", "color": "#ff6b35"},
    {"name": "project13.jpg", "title": "Product\nPrioritization", "subtitle": "Product Strategy", "color": "#0066cc"},
    {"name": "project14.jpg", "title": "Aerospace\nStrategy", "subtitle": "Business Strategy", "color": "#00a651"},
    {"name": "project15.jpg", "title": "UI/UX MVP\nHomeless", "subtitle": "Social Impact", "color": "#ff6b35"},
    {"name": "project16.jpg", "title": "Visual Symphony\nRetail", "subtitle": "Retail Strategy", "color": "#0066cc"},
]

def create_thumbnail(project_data, output_path):
    """Create a professional gradient thumbnail"""
    width, height = 600, 400
    
    # Create image with gradient
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Parse color
    color = project_data["color"]
    r = int(color[1:3], 16)
    g = int(color[3:5], 16)
    b = int(color[5:7], 16)
    
    # Draw gradient
    for y in range(height):
        ratio = y / height
        # Darker at top, lighter at bottom
        new_r = int(r * (0.3 + ratio * 0.7))
        new_g = int(g * (0.3 + ratio * 0.7))
        new_b = int(b * (0.3 + ratio * 0.7))
        draw.line([(0, y), (width, y)], fill=(new_r, new_g, new_b))
    
    # Add pattern overlay
    for i in range(0, width, 50):
        for j in range(0, height, 50):
            draw.rectangle([i, j, i+2, j+2], fill=(255, 255, 255, 30))
    
    # Try to use a nice font, fallback to default
    try:
        title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
        subtitle_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Draw title (centered)
    title_text = project_data["title"]
    title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_height = title_bbox[3] - title_bbox[1]
    title_x = (width - title_width) // 2
    title_y = height // 2 - 50
    
    # Draw shadow
    draw.multiline_text((title_x+2, title_y+2), title_text, fill=(0, 0, 0, 128), font=title_font, align='center')
    # Draw text
    draw.multiline_text((title_x, title_y), title_text, fill=(255, 255, 255), font=title_font, align='center')
    
    # Draw subtitle
    subtitle_text = project_data["subtitle"]
    subtitle_bbox = draw.textbbox((0, 0), subtitle_text, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = height // 2 + 40
    
    draw.text((subtitle_x+1, subtitle_y+1), subtitle_text, fill=(0, 0, 0, 128), font=subtitle_font)
    draw.text((subtitle_x, subtitle_y), subtitle_text, fill=(255, 255, 255, 200), font=subtitle_font)
    
    # Save image
    img.save(output_path, 'JPEG', quality=90)
    print(f"Created: {output_path}")

def main():
    # Output directory
    output_dir = "/Users/kartikpandya/Desktop/Github/Portfolio-Website/Website/assets/images/projects"
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Generate all thumbnails
    for project in projects:
        output_path = os.path.join(output_dir, project["name"])
        create_thumbnail(project, output_path)
    
    print(f"\n✅ Successfully created {len(projects)} project thumbnails!")

if __name__ == "__main__":
    main()
