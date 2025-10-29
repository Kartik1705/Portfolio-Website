#!/usr/bin/env python3
"""
Download Adwiti Liberatore's LinkedIn profile image
"""
import urllib.request
import ssl

# LinkedIn profile image URL
linkedin_image_url = "https://media.licdn.com/dms/image/v2/D5603AQGxO8vY8RISTA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718301295093"

# Output path
output_path = "assets/images/recommendations/adwiti-liberatore.jpg"

# Create SSL context that doesn't verify certificates (for LinkedIn)
context = ssl._create_unverified_context()

# Set headers to mimic a browser
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

try:
    # Create request with headers
    request = urllib.request.Request(linkedin_image_url, headers=headers)
    
    # Download the image
    with urllib.request.urlopen(request, context=context) as response:
        image_data = response.read()
        
        # Save to file
        with open(output_path, 'wb') as f:
            f.write(image_data)
    
    print(f"✓ Successfully downloaded image to {output_path}")
    print(f"✓ Image size: {len(image_data)} bytes")
    
except Exception as e:
    print(f"❌ Error downloading image: {e}")
    print("\n💡 Alternative: Please manually download Adwiti's LinkedIn profile picture")
    print("   1. Go to: https://www.linkedin.com/in/adwiti-liberatore/")
    print("   2. Right-click on her profile picture")
    print("   3. Save as: assets/images/recommendations/adwiti-liberatore.jpg")
