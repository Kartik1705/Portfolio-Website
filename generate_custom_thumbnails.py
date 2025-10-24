"""
Generate Custom Project Thumbnails for Portfolio Website
Creates 15 unique, professional thumbnails matching the new navy/cream color scheme
Each thumbnail is highly relevant to its project name and content
"""

from PIL import Image, ImageDraw, ImageFont
import os

# New Color Palette
CREAM_LIGHT = (249, 244, 232)   # #F9F4E8
CREAM_MEDIUM = (244, 235, 222)  # #F4EBDE
NAVY_PRIMARY = (49, 76, 111)    # #314C6F
BLUE_SECONDARY = (99, 132, 162) # #6384A2
NAVY_DARK = (31, 60, 92)        # #1F3C5C

# Thumbnail specifications
THUMBNAIL_SIZE = (800, 600)
OUTPUT_DIR = "Website/assets/images/projects"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_gradient_background(draw, width, height, color1, color2):
    """Create a vertical gradient background"""
    for y in range(height):
        ratio = y / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

def draw_text_with_shadow(draw, text, position, font, text_color, shadow_offset=3):
    """Draw text with a subtle shadow for depth"""
    x, y = position
    # Shadow
    draw.text((x + shadow_offset, y + shadow_offset), text, font=font, fill=(0, 0, 0, 100))
    # Main text
    draw.text((x, y), text, font=font, fill=text_color)

def create_thumbnail_1_astrazeneca():
    """AstraZeneca - Remote Patient Monitoring"""
    img = Image.new('RGB', THUMBNAIL_SIZE, CREAM_MEDIUM)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Gradient background
    create_gradient_background(draw, THUMBNAIL_SIZE[0], THUMBNAIL_SIZE[1], NAVY_PRIMARY, NAVY_DARK)
    
    # Draw medical monitoring elements
    # Heart rate line
    points = []
    for x in range(0, 800, 40):
        y = 300 + (20 if (x // 40) % 2 == 0 else -20)
        points.append((x, y))
    draw.line(points, fill=CREAM_LIGHT, width=3)
    
    # Data circles (vital signs)
    vital_positions = [(150, 200), (400, 200), (650, 200), (150, 450), (400, 450), (650, 450)]
    for pos in vital_positions:
        draw.ellipse([pos[0]-30, pos[1]-30, pos[0]+30, pos[1]+30], 
                     fill=None, outline=BLUE_SECONDARY, width=3)
        draw.ellipse([pos[0]-15, pos[1]-15, pos[0]+15, pos[1]+15], 
                     fill=BLUE_SECONDARY)
    
    # Title overlay
    overlay = Image.new('RGBA', THUMBNAIL_SIZE, (0, 0, 0, 180))
    img.paste(overlay, (0, 0), overlay)
    
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
        font_subtitle = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
    except:
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
    
    draw.text((400, 250), "Remote Patient", font=font_title, fill=CREAM_LIGHT, anchor="mm")
    draw.text((400, 310), "Monitoring", font=font_title, fill=CREAM_LIGHT, anchor="mm")
    draw.text((400, 360), "Oncology Trials", font=font_subtitle, fill=BLUE_SECONDARY, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project1.jpg"), quality=95)
    print("✓ Generated: project1.jpg (AstraZeneca)")

def create_thumbnail_2_ifood():
    """iFood - Marketing Analytics"""
    img = Image.new('RGB', THUMBNAIL_SIZE, CREAM_LIGHT)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Cream background with navy accents
    draw.rectangle([0, 0, 800, 600], fill=CREAM_LIGHT)
    
    # Draw analytics charts
    # Bar chart
    bar_heights = [150, 280, 200, 340, 250]
    bar_width = 80
    start_x = 100
    for i, height in enumerate(bar_heights):
        x = start_x + i * (bar_width + 40)
        y = 400 - height
        draw.rectangle([x, y, x + bar_width, 400], fill=NAVY_PRIMARY)
        draw.rectangle([x, y - 10, x + bar_width, y], fill=BLUE_SECONDARY)
    
    # Funnel shape
    funnel_points = [(550, 150), (750, 150), (700, 250), (600, 250)]
    draw.polygon(funnel_points, fill=BLUE_SECONDARY, outline=NAVY_DARK)
    
    funnel_points2 = [(600, 250), (700, 250), (680, 320), (620, 320)]
    draw.polygon(funnel_points2, fill=NAVY_PRIMARY, outline=NAVY_DARK)
    
    # Title
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 52)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 480), "Marketing Analytics", font=font, fill=NAVY_DARK, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project2.jpg"), quality=95)
    print("✓ Generated: project2.jpg (iFood)")

def create_thumbnail_3_energy():
    """Energy Storage Market Research"""
    img = Image.new('RGB', THUMBNAIL_SIZE, NAVY_DARK)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Battery visualization
    # Battery outline
    battery_rect = [200, 200, 600, 400]
    draw.rectangle(battery_rect, outline=CREAM_LIGHT, width=4)
    
    # Battery terminal
    draw.rectangle([600, 270, 630, 330], fill=CREAM_LIGHT)
    
    # Battery charge levels (3 bars)
    charge_width = (battery_rect[2] - battery_rect[0] - 40) // 3
    for i in range(3):
        x_start = battery_rect[0] + 20 + i * (charge_width + 10)
        colors = [BLUE_SECONDARY, NAVY_PRIMARY, BLUE_SECONDARY]
        draw.rectangle([x_start, battery_rect[1] + 40, 
                       x_start + charge_width, battery_rect[3] - 40], 
                      fill=colors[i])
    
    # Energy wave
    wave_points = []
    for x in range(100, 700, 10):
        import math
        y = 500 + int(30 * math.sin(x / 30))
        wave_points.append((x, y))
    draw.line(wave_points, fill=CREAM_MEDIUM, width=3)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 46)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 100), "Energy Storage", font=font, fill=CREAM_LIGHT, anchor="mm")
    draw.text((400, 530), "Market Research", font=font, fill=CREAM_MEDIUM, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project3.jpg"), quality=95)
    print("✓ Generated: project3.jpg (Energy Storage)")

def create_thumbnail_4_ai_framework():
    """AI Product Success Framework"""
    img = Image.new('RGB', THUMBNAIL_SIZE, CREAM_LIGHT)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Neural network visualization
    layers = [
        [(150, 100), (150, 200), (150, 300), (150, 400), (150, 500)],
        [(350, 150), (350, 250), (350, 350), (350, 450)],
        [(550, 200), (550, 300), (550, 400)],
        [(700, 300)]
    ]
    
    # Draw connections
    for i in range(len(layers) - 1):
        for node1 in layers[i]:
            for node2 in layers[i + 1]:
                draw.line([node1, node2], fill=BLUE_SECONDARY, width=1)
    
    # Draw nodes
    for layer in layers:
        for node in layer:
            draw.ellipse([node[0]-20, node[1]-20, node[0]+20, node[1]+20], 
                        fill=NAVY_PRIMARY, outline=NAVY_DARK, width=2)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 50), "AI Product Success", font=font, fill=NAVY_DARK, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project4.jpg"), quality=95)
    print("✓ Generated: project4.jpg (AI Framework)")

def create_thumbnail_5_genz():
    """Gen Z Investing Behaviour"""
    img = Image.new('RGB', THUMBNAIL_SIZE, NAVY_PRIMARY)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Stock market graph
    import random
    random.seed(42)
    
    # Upward trending line
    points = []
    y_start = 450
    for i in range(0, 800, 20):
        y = y_start - (i // 3) + random.randint(-15, 15)
        points.append((i, y))
        y_start = y
    
    draw.line(points, fill=CREAM_LIGHT, width=4)
    
    # Area under curve
    for i in range(len(points) - 1):
        x1, y1 = points[i]
        x2, y2 = points[i + 1]
        draw.polygon([(x1, y1), (x2, y2), (x2, 600), (x1, 600)], 
                    fill=(*BLUE_SECONDARY, 100))
    
    # Mobile phone outline (Gen Z)
    phone_rect = [600, 100, 750, 350]
    draw.rounded_rectangle(phone_rect, radius=20, outline=CREAM_LIGHT, width=3)
    draw.ellipse([655, 300, 695, 340], fill=CREAM_LIGHT)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 50)
    except:
        font = ImageFont.load_default()
    
    draw.text((300, 100), "Gen Z", font=font, fill=CREAM_LIGHT, anchor="mm")
    draw.text((300, 160), "Investing", font=font, fill=CREAM_MEDIUM, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project5.jpg"), quality=95)
    print("✓ Generated: project5.jpg (Gen Z Investing)")

def create_thumbnail_6_bintelligent():
    """Bintelligent - Green Technology"""
    img = Image.new('RGB', THUMBNAIL_SIZE, CREAM_LIGHT)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Draw leaf shape (sustainability)
    leaf_points = [(400, 150), (350, 250), (320, 350), (350, 450), 
                   (400, 500), (450, 450), (480, 350), (450, 250)]
    draw.polygon(leaf_points, fill=BLUE_SECONDARY, outline=NAVY_DARK, width=3)
    
    # Leaf vein
    draw.line([(400, 150), (400, 500)], fill=NAVY_PRIMARY, width=4)
    
    # Circuit board pattern
    circuit_positions = [(100, 100), (700, 100), (100, 550), (700, 550)]
    for pos in circuit_positions:
        draw.rectangle([pos[0]-30, pos[1]-30, pos[0]+30, pos[1]+30], 
                      outline=NAVY_PRIMARY, width=2)
        draw.line([(pos[0], pos[1]-30), (pos[0], pos[1]-50)], fill=NAVY_PRIMARY, width=2)
        draw.line([(pos[0], pos[1]+30), (pos[0], pos[1]+50)], fill=NAVY_PRIMARY, width=2)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 52)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 50), "Green Technology", font=font, fill=NAVY_DARK, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project6.jpg"), quality=95)
    print("✓ Generated: project6.jpg (Bintelligent)")

def create_thumbnail_7_tableau():
    """King County Housing Dashboard"""
    img = Image.new('RGB', THUMBNAIL_SIZE, NAVY_DARK)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Dashboard layout
    # Top bar
    draw.rectangle([50, 50, 750, 120], fill=NAVY_PRIMARY, outline=CREAM_LIGHT, width=2)
    draw.text((400, 85), "HOUSING DASHBOARD", 
             font=ImageFont.load_default(), fill=CREAM_LIGHT, anchor="mm")
    
    # Chart 1 - Pie chart
    draw.pieslice([100, 150, 300, 350], start=0, end=120, fill=BLUE_SECONDARY)
    draw.pieslice([100, 150, 300, 350], start=120, end=240, fill=NAVY_PRIMARY)
    draw.pieslice([100, 150, 300, 350], start=240, end=360, fill=CREAM_MEDIUM)
    
    # Chart 2 - Bar chart
    bar_heights = [80, 120, 100, 150, 110]
    for i, h in enumerate(bar_heights):
        x = 380 + i * 70
        draw.rectangle([x, 350-h, x+50, 350], fill=BLUE_SECONDARY)
    
    # Map outline (King County)
    map_points = [(500, 400), (600, 420), (650, 500), (580, 550), (480, 530), (450, 480)]
    draw.polygon(map_points, fill=CREAM_MEDIUM, outline=NAVY_PRIMARY, width=2)
    
    # Location markers
    for i in range(5):
        import random
        random.seed(i)
        x = random.randint(480, 630)
        y = random.randint(420, 540)
        draw.ellipse([x-5, y-5, x+5, y+5], fill=BLUE_SECONDARY)
    
    img.save(os.path.join(OUTPUT_DIR, "project7.jpg"), quality=95)
    print("✓ Generated: project7.jpg (Tableau Dashboard)")

def create_thumbnail_8_3d_printing():
    """3D Food Printing Innovation"""
    img = Image.new('RGB', THUMBNAIL_SIZE, CREAM_LIGHT)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # 3D printer structure
    # Frame
    draw.rectangle([200, 100, 600, 500], outline=NAVY_DARK, width=4)
    draw.line([(200, 100), (250, 50), (650, 50), (600, 100)], fill=NAVY_DARK, width=4)
    draw.line([(600, 100), (650, 50)], fill=NAVY_DARK, width=4)
    
    # Print head
    draw.rectangle([350, 200, 450, 240], fill=NAVY_PRIMARY, outline=NAVY_DARK, width=2)
    
    # Extruder nozzle
    nozzle_points = [(390, 240), (410, 240), (405, 260), (395, 260)]
    draw.polygon(nozzle_points, fill=BLUE_SECONDARY)
    
    # Food being printed (spiral)
    import math
    spiral_points = []
    for angle in range(0, 720, 10):
        r = 30 + angle / 30
        x = 400 + r * math.cos(math.radians(angle))
        y = 370 + r * math.sin(math.radians(angle))
        spiral_points.append((x, y))
    draw.line(spiral_points, fill=NAVY_PRIMARY, width=6)
    
    # Molecular structure
    molecule_positions = [(150, 150), (150, 200), (150, 250), (200, 175), (200, 225)]
    for pos in molecule_positions:
        draw.ellipse([pos[0]-8, pos[1]-8, pos[0]+8, pos[1]+8], 
                    fill=BLUE_SECONDARY, outline=NAVY_PRIMARY, width=2)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 520), "3D Food Printing", font=font, fill=NAVY_DARK, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project8.jpg"), quality=95)
    print("✓ Generated: project8.jpg (3D Food Printing)")

def create_thumbnail_9_wba():
    """WBA - M&A Strategy"""
    img = Image.new('RGB', THUMBNAIL_SIZE, NAVY_PRIMARY)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Two companies merging
    # Company 1
    draw.ellipse([100, 200, 300, 400], fill=BLUE_SECONDARY, outline=CREAM_LIGHT, width=3)
    
    # Company 2
    draw.ellipse([500, 200, 700, 400], fill=NAVY_DARK, outline=CREAM_LIGHT, width=3)
    
    # Merger arrow
    arrow_points = [(320, 300), (480, 300)]
    draw.line(arrow_points, fill=CREAM_LIGHT, width=8)
    # Arrow head
    draw.polygon([(480, 280), (520, 300), (480, 320)], fill=CREAM_LIGHT)
    
    # Plus sign in center
    draw.line([(380, 300), (420, 300)], fill=CREAM_MEDIUM, width=6)
    draw.line([(400, 280), (400, 320)], fill=CREAM_MEDIUM, width=6)
    
    # Pharmacy cross symbols
    draw.line([(190, 270), (210, 270)], fill=CREAM_LIGHT, width=4)
    draw.line([(200, 260), (200, 280)], fill=CREAM_LIGHT, width=4)
    
    draw.line([(590, 270), (610, 270)], fill=CREAM_MEDIUM, width=4)
    draw.line([(600, 260), (600, 280)], fill=CREAM_MEDIUM, width=4)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 46)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 100), "M&A Strategy", font=font, fill=CREAM_LIGHT, anchor="mm")
    draw.text((400, 500), "Pharmaceutical Retail", font=font, fill=CREAM_MEDIUM, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project9.jpg"), quality=95)
    print("✓ Generated: project9.jpg (WBA M&A)")

def create_thumbnail_10_optiflow():
    """OptiFlow - Supply Chain"""
    img = Image.new('RGB', THUMBNAIL_SIZE, CREAM_MEDIUM)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Supply chain flow
    # Nodes (warehouses/facilities)
    nodes = [
        (150, 300), (350, 200), (350, 400), (550, 200), (550, 400), (700, 300)
    ]
    
    # Connections (routes)
    connections = [
        (0, 1), (0, 2), (1, 3), (2, 4), (3, 5), (4, 5)
    ]
    
    for start, end in connections:
        draw.line([nodes[start], nodes[end]], fill=BLUE_SECONDARY, width=4)
        # Add direction arrow
        mid_x = (nodes[start][0] + nodes[end][0]) // 2
        mid_y = (nodes[start][1] + nodes[end][1]) // 2
        draw.polygon([(mid_x-5, mid_y-8), (mid_x+5, mid_y-8), (mid_x, mid_y+2)], 
                    fill=NAVY_PRIMARY)
    
    # Draw nodes
    for node in nodes:
        draw.rectangle([node[0]-30, node[1]-25, node[0]+30, node[1]+25], 
                      fill=NAVY_PRIMARY, outline=NAVY_DARK, width=3)
        # Warehouse door
        draw.rectangle([node[0]-10, node[1]-5, node[0]+10, node[1]+15], 
                      fill=CREAM_LIGHT)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 52)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 80), "OptiFlow", font=font, fill=NAVY_DARK, anchor="mm")
    draw.text((400, 520), "Supply Chain Optimization", font=font, fill=NAVY_PRIMARY, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project11.jpg"), quality=95)
    print("✓ Generated: project11.jpg (OptiFlow)")

def create_thumbnail_11_pm_valley():
    """PM VALLEY Product Case"""
    img = Image.new('RGB', THUMBNAIL_SIZE, NAVY_DARK)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Product roadmap
    # Timeline
    draw.line([(100, 300), (700, 300)], fill=CREAM_LIGHT, width=4)
    
    # Milestones
    milestones = [150, 300, 450, 600]
    milestone_labels = ["Q1", "Q2", "Q3", "Q4"]
    
    for i, x in enumerate(milestones):
        draw.ellipse([x-15, 285, x+15, 315], fill=BLUE_SECONDARY, outline=CREAM_LIGHT, width=3)
        
        # Feature boxes above timeline
        y_offset = -80 if i % 2 == 0 else -150
        draw.rectangle([x-40, 300+y_offset-40, x+40, 300+y_offset], 
                      fill=NAVY_PRIMARY, outline=CREAM_LIGHT, width=2)
        
        # Connecting line
        draw.line([(x, 300), (x, 300+y_offset)], fill=CREAM_MEDIUM, width=2)
    
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 52)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
    except:
        font_title = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    draw.text((400, 450), "Product Roadmap", font=font_title, fill=CREAM_LIGHT, anchor="mm")
    draw.text((400, 500), "PM VALLEY Case Study", font=font_small, fill=BLUE_SECONDARY, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project12.jpg"), quality=95)
    print("✓ Generated: project12.jpg (PM VALLEY)")

def create_thumbnail_12_prioritization():
    """Product Prioritization Tool"""
    img = Image.new('RGB', THUMBNAIL_SIZE, CREAM_LIGHT)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Priority matrix (2x2)
    # Draw quadrants
    center_x, center_y = 400, 300
    quad_size = 180
    
    # Axes
    draw.line([(center_x - quad_size, center_y), (center_x + quad_size, center_y)], 
             fill=NAVY_DARK, width=4)
    draw.line([(center_x, center_y - quad_size), (center_x, center_y + quad_size)], 
             fill=NAVY_DARK, width=4)
    
    # Quadrant colors
    # Top-left (High Impact, Low Effort) - Priority
    draw.rectangle([center_x - quad_size, center_y - quad_size, center_x, center_y], 
                  fill=(*BLUE_SECONDARY, 100), outline=NAVY_PRIMARY, width=2)
    
    # Top-right (High Impact, High Effort)
    draw.rectangle([center_x, center_y - quad_size, center_x + quad_size, center_y], 
                  fill=(*NAVY_PRIMARY, 80), outline=NAVY_PRIMARY, width=2)
    
    # Bottom-left (Low Impact, Low Effort)
    draw.rectangle([center_x - quad_size, center_y, center_x, center_y + quad_size], 
                  fill=(*CREAM_MEDIUM, 150), outline=NAVY_PRIMARY, width=2)
    
    # Bottom-right (Low Impact, High Effort) - Avoid
    draw.rectangle([center_x, center_y, center_x + quad_size, center_y + quad_size], 
                  fill=(*NAVY_DARK, 60), outline=NAVY_PRIMARY, width=2)
    
    # Add sample project dots
    projects = [
        (center_x - 100, center_y - 100, NAVY_DARK),  # High priority
        (center_x + 80, center_y - 80, NAVY_PRIMARY),
        (center_x - 60, center_y + 70, BLUE_SECONDARY),
        (center_x + 100, center_y + 90, NAVY_DARK)
    ]
    
    for x, y, color in projects:
        draw.ellipse([x-15, y-15, x+15, y+15], fill=color, outline=CREAM_LIGHT, width=2)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 80), "Prioritization Matrix", font=font, fill=NAVY_DARK, anchor="mm")
    
    # Axis labels
    draw.text((400, 520), "EFFORT →", font=ImageFont.load_default(), fill=NAVY_PRIMARY, anchor="mm")
    draw.text((130, 300), "↑ IMPACT", font=ImageFont.load_default(), fill=NAVY_PRIMARY, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project13.jpg"), quality=95)
    print("✓ Generated: project13.jpg (Prioritization Tool)")

def create_thumbnail_13_aerospace():
    """Aerospace - Commercial Airplane Strategy"""
    img = Image.new('RGB', THUMBNAIL_SIZE, NAVY_PRIMARY)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Airplane silhouette
    # Fuselage
    fuselage = [(150, 280), (600, 260), (650, 290), (640, 310), (590, 320), (150, 320)]
    draw.polygon(fuselage, fill=CREAM_LIGHT, outline=NAVY_DARK, width=3)
    
    # Wings
    wing_points = [(300, 290), (280, 200), (380, 270), (360, 290)]
    draw.polygon(wing_points, fill=CREAM_MEDIUM, outline=NAVY_DARK, width=3)
    
    # Tail
    tail_points = [(610, 260), (620, 180), (650, 260)]
    draw.polygon(tail_points, fill=CREAM_MEDIUM, outline=NAVY_DARK, width=3)
    
    # Windows
    for x in range(200, 600, 30):
        draw.ellipse([x, 290, x+10, 305], fill=BLUE_SECONDARY)
    
    # Flight path
    import math
    path_points = []
    for x in range(50, 750, 10):
        y = 450 - int(20 * math.sin(x / 100))
        path_points.append((x, y))
    draw.line(path_points, fill=BLUE_SECONDARY, width=3)
    
    # Strategy arrows
    draw.line([(100, 100), (250, 100)], fill=CREAM_LIGHT, width=6)
    draw.polygon([(250, 85), (280, 100), (250, 115)], fill=CREAM_LIGHT)
    
    draw.line([(550, 100), (700, 100)], fill=CREAM_LIGHT, width=6)
    draw.polygon([(700, 85), (730, 100), (700, 115)], fill=CREAM_LIGHT)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 520), "Aviation Strategy", font=font, fill=CREAM_LIGHT, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project14.jpg"), quality=95)
    print("✓ Generated: project14.jpg (Aerospace)")

def create_thumbnail_14_homeless_mvp():
    """Homeless MVP - UI/UX Design"""
    img = Image.new('RGB', THUMBNAIL_SIZE, CREAM_LIGHT)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Mobile phone mockup
    phone_outer = [250, 80, 550, 520]
    phone_screen = [270, 110, 530, 490]
    
    # Phone frame
    draw.rounded_rectangle(phone_outer, radius=30, fill=NAVY_DARK)
    
    # Screen
    draw.rounded_rectangle(phone_screen, radius=20, fill=CREAM_MEDIUM)
    
    # Notch
    draw.rectangle([370, 110, 430, 125], fill=NAVY_DARK)
    
    # UI elements on screen
    # Header
    draw.rectangle([290, 140, 510, 180], fill=NAVY_PRIMARY)
    
    # Menu icon
    for i in range(3):
        draw.rectangle([300, 150 + i*15, 340, 155 + i*15], fill=CREAM_LIGHT)
    
    # Cards
    card_y_positions = [200, 300, 400]
    for y in card_y_positions:
        draw.rounded_rectangle([290, y, 510, y+60], radius=10, 
                              fill=BLUE_SECONDARY, outline=NAVY_PRIMARY, width=2)
        # Card content lines
        draw.rectangle([310, y+15, 430, y+20], fill=CREAM_LIGHT)
        draw.rectangle([310, y+35, 380, y+40], fill=CREAM_MEDIUM)
    
    # Heart icon (compassion)
    heart_center = (680, 300)
    heart_points = [
        (heart_center[0], heart_center[1] + 30),
        (heart_center[0] - 40, heart_center[1] - 10),
        (heart_center[0] - 20, heart_center[1] - 40),
        (heart_center[0], heart_center[1] - 20),
        (heart_center[0] + 20, heart_center[1] - 40),
        (heart_center[0] + 40, heart_center[1] - 10)
    ]
    draw.polygon(heart_points, fill=BLUE_SECONDARY, outline=NAVY_PRIMARY, width=3)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 46)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 560), "Social Impact MVP", font=font, fill=NAVY_DARK, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project15.jpg"), quality=95)
    print("✓ Generated: project15.jpg (Homeless MVP)")

def create_thumbnail_15_visual_symphony():
    """Visual Symphony - Retail Merchandising"""
    img = Image.new('RGB', THUMBNAIL_SIZE, NAVY_DARK)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Store layout (top view)
    # Walls
    draw.rectangle([100, 150, 700, 450], outline=CREAM_LIGHT, width=5)
    
    # Display racks (rectangles)
    racks = [
        (150, 200, 250, 250),
        (300, 200, 400, 250),
        (450, 200, 550, 250),
        (150, 300, 250, 350),
        (300, 300, 400, 350),
        (450, 300, 550, 350)
    ]
    
    for rack in racks:
        draw.rectangle(rack, fill=NAVY_PRIMARY, outline=BLUE_SECONDARY, width=2)
        # Clothing items
        draw.line([(rack[0]+10, rack[1]+10), (rack[2]-10, rack[1]+10)], 
                 fill=CREAM_MEDIUM, width=3)
        draw.line([(rack[0]+10, rack[1]+25), (rack[2]-10, rack[1]+25)], 
                 fill=CREAM_MEDIUM, width=3)
    
    # Mannequin (simplified)
    mannequin_x, mannequin_y = 630, 280
    # Head
    draw.ellipse([mannequin_x-20, mannequin_y-30, mannequin_x+20, mannequin_y+10], 
                fill=CREAM_LIGHT, outline=BLUE_SECONDARY, width=2)
    # Body
    draw.rectangle([mannequin_x-15, mannequin_y+10, mannequin_x+15, mannequin_y+60], 
                  fill=BLUE_SECONDARY, outline=CREAM_LIGHT, width=2)
    
    # Customer flow path (dotted line)
    path_points = [(120, 380), (200, 380), (200, 280), (350, 280), (350, 380), (500, 380)]
    for i in range(0, len(path_points)-1, 2):
        if i+1 < len(path_points):
            draw.line([path_points[i], path_points[i+1]], fill=CREAM_MEDIUM, width=3)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
    except:
        font = ImageFont.load_default()
    
    draw.text((400, 80), "Visual Merchandising", font=font, fill=CREAM_LIGHT, anchor="mm")
    draw.text((400, 520), "Retail Strategy", font=font, fill=BLUE_SECONDARY, anchor="mm")
    
    img.save(os.path.join(OUTPUT_DIR, "project16.jpg"), quality=95)
    print("✓ Generated: project16.jpg (Visual Symphony)")

def main():
    """Generate all thumbnails"""
    print("\n🎨 Generating Custom Project Thumbnails...")
    print("=" * 60)
    print(f"Color Palette: Navy/Cream (iColorPalette)")
    print(f"Output Directory: {OUTPUT_DIR}")
    print(f"Thumbnail Size: {THUMBNAIL_SIZE[0]}x{THUMBNAIL_SIZE[1]}px")
    print("=" * 60)
    
    # Generate all thumbnails
    create_thumbnail_1_astrazeneca()
    create_thumbnail_2_ifood()
    create_thumbnail_3_energy()
    create_thumbnail_4_ai_framework()
    create_thumbnail_5_genz()
    create_thumbnail_6_bintelligent()
    create_thumbnail_7_tableau()
    create_thumbnail_8_3d_printing()
    create_thumbnail_9_wba()
    create_thumbnail_10_optiflow()
    create_thumbnail_11_pm_valley()
    create_thumbnail_12_prioritization()
    create_thumbnail_13_aerospace()
    create_thumbnail_14_homeless_mvp()
    create_thumbnail_15_visual_symphony()
    
    print("=" * 60)
    print(f"✅ Successfully generated 15 custom thumbnails!")
    print(f"📁 Location: {OUTPUT_DIR}")
    print("\nAll thumbnails match the new navy/cream color scheme")
    print("and are highly relevant to their respective projects.")
    print("=" * 60)

if __name__ == "__main__":
    main()
