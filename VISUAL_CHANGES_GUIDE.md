# Before & After - Website Structure

## NAVIGATION BAR

### BEFORE:
```
[Logo] Kartik Pandya
├── Home
├── About
├── Experience
├── Education
├── Projects
├── Certificates
├── Research
├── Contact
└── [Download Resume]
```

### AFTER:
```
[Logo] Kartik Pandya
├── Home (merged with About)
├── Experience
├── Education & Skills (merged with Certificates)
├── Projects
├── Research
└── [Download CV]

[Fixed Social Sidebar - RIGHT]     [Schedule Meeting - BOTTOM LEFT]
```

---

## PAGE SECTIONS

### BEFORE:
```
┌─────────────────────────────────────┐
│  1. HOME (Hero)                     │
│     - Profile, title, social links  │
├─────────────────────────────────────┤
│  2. ABOUT                           │
│     - Bio, skills cards             │
├─────────────────────────────────────┤
│  3. EXPERIENCE                      │
│     - 15 companies timeline         │
├─────────────────────────────────────┤
│  4. EDUCATION                       │
│     - JHU, SVIT                     │
├─────────────────────────────────────┤
│  5. PROJECTS                        │
│     - 16 projects                   │
├─────────────────────────────────────┤
│  6. CERTIFICATES                    │
│     - Scrolling carousel            │
│     - Draggable, pause button       │
├─────────────────────────────────────┤
│  7. RESEARCH                        │
│     - 6 papers (wrong images)       │
├─────────────────────────────────────┤
│  8. CONTACT                         │
│     - Email, LinkedIn, Scholar      │
└─────────────────────────────────────┘
```

### AFTER:
```
┌─────────────────────────────────────┐  │ [LinkedIn]  │
│  1. HOME (MERGED WITH ABOUT)        │  │ [Instagram] │ ← Fixed
│     - Profile, title                │  │ [Email]     │   Social
│     - About bio inline              │  │ [Scholar]   │   Sidebar
│     - No separate section           │  │             │
├─────────────────────────────────────┤  │             │
│  2. EXPERIENCE                      │  │             │
│     - 15 companies timeline         │  │             │
├─────────────────────────────────────┤  │             │
│  3. EDUCATION, SKILLS & CERTS       │  │             │
│     ┌─────────────────────────────┐ │  │             │
│     │ 📚 EDUCATION                │ │  │             │
│     │   - JHU, SVIT               │ │  │             │
│     ├─────────────────────────────┤ │  │             │
│     │ 🛠️ SKILLS (NEW!)            │ │  │             │
│     │   Product Frameworks:       │ │  │             │
│     │   [SWOT] [RICE] [OKRs]...  │ │  │             │
│     │   Technical Skills:         │ │  │             │
│     │   [Tableau] [SQL] [CAD]... │ │  │             │
│     ├─────────────────────────────┤ │  │             │
│     │ 🎖️ CERTIFICATIONS           │ │  │             │
│     │   - Trackpad scroll         │ │  │             │
│     │   - No drag                 │ │  │             │
│     │   - Fixed aspect ratios     │ │  │             │
│     └─────────────────────────────┘ │  │             │
├─────────────────────────────────────┤  │             │
│  4. PROJECTS                        │  │             │
│     - 16 projects                   │  │             │
├─────────────────────────────────────┤  │             │
│  5. RESEARCH                        │  │             │
│     - 6 papers (FIXED IMAGES!)      │  │             │
└─────────────────────────────────────┘  │             │
                                         
[📅 Schedule Meeting] ← Fixed button (bottom left)
```

---

## CERTIFICATE DISPLAY

### BEFORE:
```
[Hover to Pause]
┌────────────────────────────────────────────┐
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  │
│  │ CERT │  │ CERT │  │ CERT │  │ CERT │  │ ← Draggable
│  │ 1    │  │ 2    │  │ 3    │  │ 4    │  │   Cropped images
│  │[img] │  │[img] │  │[img] │  │[img] │  │   Slow (30s)
│  └──────┘  └──────┘  └──────┘  └──────┘  │
└────────────────────────────────────────────┘
        [⏸️ Pause/Play Button]
```

### AFTER:
```
[Scroll with trackpad or mouse]
┌────────────────────────────────────────────┐
│  ┌─────┐  ┌──────┐  ┌─────┐  ┌──────┐    │
│  │CERT │  │ CERT │  │CERT │  │ CERT │    │ ← No drag
│  │ 1   │  │  2   │  │ 3   │  │  4   │    │   Proper aspect ratio
│  │     │  │      │  │     │  │      │    │   Fast (20s)
│  │[img]│  │[img] │  │[img]│  │[img] │    │   Trackpad control
│  └─────┘  └──────┘  └─────┘  └──────┘    │
└────────────────────────────────────────────┘
        [Scroll hint text only]
```

---

## RESEARCH PAPER IMAGES

### BEFORE (WRONG):
```
Paper 1: ML Safety          → [Diesel Engine Image ❌]
Paper 2: Shipment Mgmt      → [Correct Image ✅]
Paper 3: Supply Chain       → [Correct Image ✅]
Paper 4: Diesel Engine      → [Placeholder ❌]
Paper 5: Student Absent     → [VCR Engine Image ❌]
Paper 6: VCR Engine         → [Wrong Image ❌]
```

### AFTER (CORRECT):
```
Paper 1: ML Safety          → [Placeholder ✅]
Paper 2: Shipment Mgmt      → [Correct Image ✅]
Paper 3: Supply Chain       → [Correct Image ✅]
Paper 4: Diesel Engine      → [Diesel Engine Image ✅]
Paper 5: Student Absent     → [Placeholder ✅]
Paper 6: VCR Engine         → [VCR Engine Image ✅]
```

---

## SKILLS DISPLAY (NEW!)

```
┌───────────────────────────────────────────────────────┐
│  💡 PRODUCT FRAMEWORKS                                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ SWOT │ │ RICE │ │OKRs  │ │ 4Ps  │ │AARRR │  ...  │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘       │
│                                                       │
│  💻 TECHNICAL SKILLS                                  │
│  ┌────────┐ ┌───────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │Tableau │ │Power BI│ │ SQL  │ │ JIRA │ │Figma │...│
│  └────────┘ └───────┘ └──────┘ └──────┘ └──────┘   │
└───────────────────────────────────────────────────────┘
   ↑ Hover effects, color-coded, interactive
```

---

## FIXED UI ELEMENTS

```
┌─────────────────────────────────────────────────────┐
│                                         ┌─┐         │
│  NAVIGATION BAR                         │ │ LinkedIn│
│                                         └─┘         │
│                                         ┌─┐         │
│  SCROLLABLE CONTENT                     │ │Instagram│
│  - Home                                 └─┘         │
│  - Experience                           ┌─┐         │
│  - Education & Skills                   │ │Email    │
│  - Projects                             └─┘         │
│  - Research                             ┌─┐         │
│                                         │ │Scholar  │
│                                         └─┘         │
│                                                     │
│  ┌──────────────────┐                              │
│  │📅 Schedule Meet  │  ← Always visible             │
│  └──────────────────┘                              │
└─────────────────────────────────────────────────────┘
```

---

## MOBILE VIEW

### Phone Layout:
```
┌─────────────────┐
│   NAVIGATION    │
│                 │
│  HERO + ABOUT   │
│  (merged)       │
│                 │
│  EXPERIENCE     │
│                 │
│  EDUCATION      │
│  + SKILLS       │
│  + CERTS        │
│  (3 in 1)       │
│                 │
│  PROJECTS       │
│                 │
│  RESEARCH       │
│                 │
│ [Social    ]    │← Smaller
│ [Sidebar   ]    │  icons
│                 │
│ [📅]            │← Icon only
└─────────────────┘
```

---

## KEY IMPROVEMENTS VISUALIZATION

```
❌ REMOVED:
   • Separate About section
   • Separate Certificates section  
   • Contact section
   • Certificate drag system
   • Hover-to-pause functionality
   • Pause/play button

✅ ADDED:
   • Skills section (41 skills)
   • Fixed social sidebar (right)
   • Schedule meeting button (left)
   • Trackpad scroll control
   • Better certificate aspect ratios
   
✅ FIXED:
   • Research paper image mappings
   • Certificate cropping issues
   • Navigation clarity

✅ MERGED:
   • Home + About → Single hero
   • Education + Skills + Certificates → Unified section
```

---

## DATA SUMMARY

### Sections: 8 → 5
### Navigation Links: 8 → 5
### Skills Displayed: 0 → 41
### Fixed UI Elements: 1 → 3 (back to top, social sidebar, meeting button)
### Image Corrections: 4 research paper thumbnails fixed
