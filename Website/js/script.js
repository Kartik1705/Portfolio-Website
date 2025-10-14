// ===== PORTFOLIO WEBSITE - KARTIK PANDYA =====

// ===== COMPANY DATA WITH LOGOS AND LINKS =====
const companiesData = [
    {
        name: "Agilent Technologies",
        logo: "AGILENT TECHNOLOGIES.png",
        website: "https://www.agilent.com",
        period: "2023 - Present",
        role: "Global Product Manager",
        description: "Leading product strategy for analytical instruments in healthcare and life sciences markets."
    },
    {
        name: "AstraZeneca",
        logo: "ASTRAZENECA.png",
        website: "https://www.astrazeneca.com",
        period: "2022 - 2023",
        role: "Product Manager",
        description: "Managed pharmaceutical product portfolios and market expansion strategies."
    },
    {
        name: "Johns Hopkins Medicine",
        logo: "JHMI.png",
        website: "https://www.hopkinsmedicine.org",
        period: "2021 - 2022",
        role: "Biomedical Research Associate",
        description: "Conducted cutting-edge research in medical device development and clinical applications."
    },
    {
        name: "Johns Hopkins Hospital",
        logo: "JHH.jpeg",
        website: "https://www.hopkinsmedicine.org/the_johns_hopkins_hospital",
        period: "2020 - 2021",
        role: "Clinical Research Coordinator",
        description: "Coordinated clinical trials and managed research protocols for medical devices."
    },
    {
        name: "Koch-Glitsch",
        logo: "KOCH-GLITSCH.png",
        website: "https://www.koch-glitsch.com",
        period: "2020 - 2020",
        role: "Process Engineer",
        description: "Optimized industrial processes and developed innovative engineering solutions."
    },
    {
        name: "Indian Oil Corporation",
        logo: "IOCL.jpeg",
        website: "https://www.iocl.com",
        period: "2019 - 2020",
        role: "Engineering Intern",
        description: "Gained experience in petroleum engineering and industrial operations."
    },
    {
        name: "Idaho National Laboratory",
        logo: "INL.png",
        website: "https://www.inl.gov",
        period: "2019 - 2019",
        role: "Research Intern",
        description: "Contributed to advanced nuclear engineering research and development projects."
    },
    {
        name: "LearnLight",
        logo: "LEARNLIGHT.png",
        website: "https://www.learnlight.com",
        period: "2018 - 2019",
        role: "Product Development Intern",
        description: "Developed educational technology products and learning management systems."
    },
    {
        name: "Motorola Solutions",
        logo: "MOTOROLA SOLUTIONS.png",
        website: "https://www.motorolasolutions.com",
        period: "2018 - 2018",
        role: "Technology Intern",
        description: "Worked on communication technology solutions and product testing."
    },
    {
        name: "Shilchar Technologies",
        logo: "SHILCHAR TECHNOLOGIES PVT. LTD..png",
        website: "https://www.shilchar.com",
        period: "2017 - 2018",
        role: "Software Development Intern",
        description: "Developed software solutions for healthcare and technology applications."
    },
    {
        name: "Trainity",
        logo: "TRAINITY.png",
        website: "https://www.trainity.com",
        period: "2017 - 2017",
        role: "Product Management Trainee",
        description: "Learned product management fundamentals and agile development methodologies."
    },
    {
        name: "NSS",
        logo: "NSS.png",
        website: "https://www.nss.gov.in",
        period: "2016 - 2017",
        role: "Volunteer",
        description: "Participated in community service and social development programs."
    }
];

// ===== EDUCATION DATA =====
const educationData = [
    {
        institution: "Johns Hopkins University",
        logo: "JOHNS HOPKINS UNIVERSITY.png",
        degree: "Master of Science",
        field: "Biomedical Engineering",
        year: "2020-2022",
        description: "Specialized in medical device design and healthcare innovation."
    },
    {
        institution: "Sardar Vallabhbhai Institute of Technology",
        logo: "SVIT.jpeg",
        degree: "Bachelor of Technology",
        field: "Biomedical Engineering", 
        year: "2016-2020",
        description: "Foundation in biomedical engineering with focus on medical instrumentation."
    },
    {
        institution: "Blue Jay School",
        logo: "BLUE JAY.png",
        degree: "Higher Secondary Certificate",
        field: "Science & Mathematics",
        year: "2014-2016",
        description: "Strong foundation in mathematics, physics, and chemistry."
    },
    {
        institution: "Nalanda Public School",
        logo: "NPLB.png",
        degree: "Secondary School Certificate",
        field: "General Studies",
        year: "2012-2014",
        description: "Comprehensive education with excellent academic performance."
    }
];

// ===== CERTIFICATES DATA =====
const certificatesData = [
    {
        title: "Certified Scrum Product Owner (CSPO)",
        issuer: "Scrum Alliance",
        image: "CSPO_page-0001.jpg",
        type: "Product Management"
    },
    {
        title: "AI Product Management",
        issuer: "Professional Certification",
        image: "AI PRODUCT MANAGEMENT.png",
        type: "AI/ML"
    },
    {
        title: "Lean Six Sigma White Belt",
        issuer: "Professional Institute",
        image: "LEAN SIX SIGMA WHITE BELT_page-0001.jpg",
        type: "Process Improvement"
    },
    {
        title: "Six Sigma White Belt - Marketing",
        issuer: "Professional Institute",
        image: "SIX SIGMA WHITE BELT - MARKETING_page-0001.jpg",
        type: "Marketing"
    },
    {
        title: "Product Management: Building a Product Strategy",
        issuer: "LinkedIn Learning",
        image: "CertificateOfCompletion_Product Management Building a Product Strategy_page-0001.jpg",
        type: "Product Management"
    },
    {
        title: "Product Management: Building a Product Roadmap",
        issuer: "LinkedIn Learning",
        image: "CertificateOfCompletion_Product Management Building a Product Roadmap_page-0001.jpg",
        type: "Product Management"
    },
    {
        title: "Product Management: Customer Development",
        issuer: "LinkedIn Learning",
        image: "CertificateOfCompletion_Product Management Customer Development_page-0001.jpg",
        type: "Product Management"
    },
    {
        title: "Technical Product Management",
        issuer: "LinkedIn Learning",
        image: "CertificateOfCompletion_Technical Product Management_page-0001.jpg",
        type: "Product Management"
    },
    {
        title: "Advanced Product Marketing",
        issuer: "LinkedIn Learning",
        image: "CertificateOfCompletion_Advanced Product Marketing_page-0001.jpg",
        type: "Marketing"
    },
    {
        title: "Marketing Foundations: Value Proposition Development",
        issuer: "LinkedIn Learning",
        image: "CertificateOfCompletion_Marketing Foundations Value Proposition Development_page-0001.jpg",
        type: "Marketing"
    },
    {
        title: "Marketing Strategy: Competitive Intelligence",
        issuer: "LinkedIn Learning",
        image: "CertificateOfCompletion_Marketing Strategy Competitive Intelligence 2022_page-0001.jpg",
        type: "Marketing"
    },
    {
        title: "Product Marketing: Competitive Intelligence",
        issuer: "LinkedIn Learning",
        image: "CertificateOfCompletion_Product Marketing Competitive Intelligence-2_page-0001.jpg",
        type: "Marketing"
    }
];

// ===== RESEARCH PAPERS DATA =====
const researchData = [
    {
        title: "Advanced Biomedical Signal Processing for Healthcare Applications",
        excerpt: "Innovative approaches to biomedical signal analysis using machine learning algorithms for improved diagnostic accuracy.",
        image: "1.jpg",
        type: "Biomedical Engineering",
        link: "#"
    },
    {
        title: "Medical Device Innovation in Point-of-Care Diagnostics",
        excerpt: "Development of portable diagnostic devices for rapid medical testing in resource-limited settings.",
        image: "2.jpg",
        type: "Medical Devices",
        link: "#"
    },
    {
        title: "AI-Driven Product Management in Healthcare Technology",
        excerpt: "Leveraging artificial intelligence for strategic product decisions in the healthcare technology sector.",
        image: "4.jpg",
        type: "AI & Healthcare",
        link: "#"
    },
    {
        title: "Regulatory Compliance in Global Medical Device Markets",
        excerpt: "Comprehensive analysis of international regulatory frameworks for medical device commercialization.",
        image: "5.png",
        type: "Regulatory Affairs",
        link: "#"
    },
    {
        title: "Digital Health Transformation and Product Strategy",
        excerpt: "Strategic frameworks for digital transformation in healthcare organizations and product development.",
        image: "6.jpg",
        type: "Digital Health",
        link: "#"
    }
];

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupNavigation();
    setupMobileMenu();
    loadExperience();
    loadEducation();
    loadCertificates();
    loadResearch();
    setupBackToTop();
}

// ===== NAVIGATION =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.querySelector('.mobile-toggle').classList.remove('active');
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// ===== LOAD EXPERIENCE =====
function loadExperience() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    companiesData.forEach((company, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.animationDelay = `${index * 0.1}s`;
        
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="company-header">
                    <img src="assets/images/companies/${company.logo}" alt="${company.name}" class="company-logo" onclick="window.open('${company.website}', '_blank')">
                    <div class="company-info">
                        <h3>${company.role}</h3>
                        <h4><a href="${company.website}" target="_blank">${company.name}</a></h4>
                        <span class="timeline-date">${company.period}</span>
                    </div>
                </div>
                <p>${company.description}</p>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// ===== LOAD EDUCATION =====
function loadEducation() {
    const educationGrid = document.querySelector('.education-grid');
    if (!educationGrid) return;
    
    educationGrid.innerHTML = '';
    
    educationData.forEach((edu, index) => {
        const eduCard = document.createElement('div');
        eduCard.className = 'education-card';
        eduCard.style.animationDelay = `${index * 0.1}s`;
        
        eduCard.innerHTML = `
            <div class="edu-logo">
                <img src="assets/images/education/${edu.logo}" alt="${edu.institution}">
            </div>
            <h3>${edu.institution}</h3>
            <p class="degree">${edu.degree} - ${edu.field}</p>
            <p class="year">${edu.year}</p>
            <p class="description">${edu.description}</p>
        `;
        
        educationGrid.appendChild(eduCard);
    });
}

// ===== LOAD CERTIFICATES WITH SCROLLING =====
let isPaused = false;

function loadCertificates() {
    const certificatesTrack = document.getElementById('certificates-track');
    if (!certificatesTrack) return;
    
    certificatesTrack.innerHTML = '';
    
    // Duplicate certificates for seamless loop
    const duplicatedCerts = [...certificatesData, ...certificatesData, ...certificatesData];
    
    duplicatedCerts.forEach((cert, index) => {
        const certCard = document.createElement('div');
        certCard.className = 'certificate-card';
        
        certCard.innerHTML = `
            <img src="assets/images/certificates/${cert.image}" alt="${cert.title}">
            <div class="cert-overlay">
                <h4>${cert.title}</h4>
                <p>${cert.issuer}</p>
                <span class="cert-type">${cert.type}</span>
            </div>
        `;
        
        certificatesTrack.appendChild(certCard);
    });
    
    // Setup pause/play button
    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            certificatesTrack.style.animationPlayState = isPaused ? 'paused' : 'running';
            pauseBtn.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
        });
    }
    
    // Pause on hover
    certificatesTrack.addEventListener('mouseenter', () => {
        certificatesTrack.style.animationPlayState = 'paused';
    });
    
    certificatesTrack.addEventListener('mouseleave', () => {
        if (!isPaused) {
            certificatesTrack.style.animationPlayState = 'running';
        }
    });
}

// ===== LOAD RESEARCH =====
function loadResearch() {
    const researchGrid = document.getElementById('research-grid');
    if (!researchGrid) return;
    
    researchGrid.innerHTML = '';
    
    researchData.forEach((paper, index) => {
        const paperCard = document.createElement('div');
        paperCard.className = 'research-card';
        paperCard.style.animationDelay = `${index * 0.1}s`;
        
        paperCard.innerHTML = `
            <div class="research-image">
                <img src="assets/images/research/${paper.image}" alt="${paper.title}">
                <span class="research-type">${paper.type}</span>
            </div>
            <div class="research-content">
                <h3>${paper.title}</h3>
                <p>${paper.excerpt}</p>
                <a href="${paper.link}" class="read-more" target="_blank">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        researchGrid.appendChild(paperCard);
    });
}

// ===== BACK TO TOP BUTTON =====
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ===== SCROLL INDICATOR =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    });
}