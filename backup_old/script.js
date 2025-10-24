// ===== PORTFOLIO WEBSITE JAVASCRIPT =====

// ===== GLOBAL VARIABLES =====
let isLoading = true;

// ===== COMPANY DATA WITH LINKS =====
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
        link: "https://scholar.google.com/research-paper-1"
    },
    {
        title: "Medical Device Innovation in Point-of-Care Diagnostics",
        excerpt: "Development of portable diagnostic devices for rapid medical testing in resource-limited settings.",
        image: "2.jpg",
        type: "Medical Devices",
        link: "https://scholar.google.com/research-paper-2"
    },
    {
        title: "AI-Driven Product Management in Healthcare Technology",
        excerpt: "Leveraging artificial intelligence for strategic product decisions in the healthcare technology sector.",
        image: "4.jpg",
        type: "AI & Healthcare",
        link: "https://scholar.google.com/research-paper-3"
    },
    {
        title: "Regulatory Compliance in Global Medical Device Markets",
        excerpt: "Comprehensive analysis of international regulatory frameworks for medical device commercialization.",
        image: "5.png",
        type: "Regulatory Affairs",
        link: "https://scholar.google.com/research-paper-4"
    },
    {
        title: "Digital Health Transformation and Product Strategy",
        excerpt: "Strategic frameworks for digital transformation in healthcare organizations and product development.",
        image: "6.jpg",
        type: "Digital Health",
        link: "https://scholar.google.com/research-paper-5"
    }
];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== WEBSITE INITIALIZATION =====
function initializeWebsite() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Setup event listeners
    setupNavigation();
    setupScrollProgress();
    setupBackToTop();
    setupQuickNavigation();
    setupSkillBars();
    setupContactForm();
    setupMobileMenu();
    
    // Load dynamic content
    loadCompaniesData();
    loadEducationData();
    loadCertificatesData();
    loadResearchData();
    setupCertificatesTicker();
    setupCertificatesScrollControl();
    optimizeScrollingPerformance();
    
    // Initialize GSAP animations
    initializeGSAPAnimations();
    
    // Mark as loaded
    setTimeout(() => {
        isLoading = false;
        document.body.classList.add('loaded');
    }, 1000);
}

// ===== NAVIGATION SETUP =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.getElementById('navbar');
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active navigation highlighting
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
    });
}

// ===== MOBILE MENU SETUP =====
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// ===== SCROLL PROGRESS BAR =====
function setupScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== BACK TO TOP BUTTON =====
function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== QUICK NAVIGATION =====
function setupQuickNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');
    
    // Click handlers
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const sectionId = dot.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                const offsetTop = section.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active state on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    });
}

// ===== SKILL BARS ANIMATION =====
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
    // Initial check
    setTimeout(animateSkillBars, 1000);
}

// ===== LOAD COMPANIES DATA =====
function loadCompaniesData() {
    const timelineContainer = document.getElementById('experience-timeline');
    const companiesGrid = document.getElementById('companies-grid');
    
    // Show only the most recent 6 experiences in timeline for compactness
    const recentExperiences = companiesData.slice(0, 6);
    
    // Create timeline items
    recentExperiences.forEach((company, index) => {
        const timelineItem = createTimelineItem(company, index);
        timelineContainer.appendChild(timelineItem);
    });
    
    // Create company logos grid (show all companies)
    companiesData.forEach(company => {
        const companyLogo = createCompanyLogo(company);
        companiesGrid.appendChild(companyLogo);
    });
}

function createTimelineItem(company, index) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
    
    item.innerHTML = `
        <div class="timeline-content">
            <div class="timeline-date">${company.period}</div>
            <h3 class="timeline-title">${company.role}</h3>
            <h4 class="timeline-company">${company.name}</h4>
            <p class="timeline-description">${company.description}</p>
        </div>
        <div class="timeline-dot"></div>
    `;
    
    return item;
}

function createCompanyLogo(company) {
    const logoContainer = document.createElement('a');
    logoContainer.className = 'company-logo';
    logoContainer.href = company.website;
    logoContainer.target = '_blank';
    logoContainer.title = `Visit ${company.name}`;
    logoContainer.rel = 'noopener noreferrer';
    
    // Create optimized image
    const img = document.createElement('img');
    img.src = `assets/images/companies/${company.logo}`;
    img.alt = company.name;
    img.loading = 'lazy';
    img.decoding = 'async';
    
    logoContainer.appendChild(img);
    
    // Add click tracking
    logoContainer.addEventListener('click', () => {
        console.log(`Clicked on ${company.name} logo`);
    });
    
    return logoContainer;
}

// ===== LOAD EDUCATION DATA =====
function loadEducationData() {
    const educationGrid = document.getElementById('education-grid');
    
    educationData.forEach((education, index) => {
        const educationCard = createEducationCard(education, index);
        educationGrid.appendChild(educationCard);
    });
}

function createEducationCard(education, index) {
    const card = document.createElement('div');
    card.className = 'education-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    
    card.innerHTML = `
        <img src="assets/images/education/${education.logo}" alt="${education.institution}" class="education-logo" loading="lazy">
        <h3 class="education-degree">${education.degree}</h3>
        <h4 class="education-institution">${education.institution}</h4>
        <p class="education-year">${education.year}</p>
        <p class="education-description">${education.description}</p>
    `;
    
    return card;
}

// ===== LOAD CERTIFICATES DATA =====
function loadCertificatesData() {
    const certificatesGrid = document.getElementById('certificates-grid');
    
    // Limit certificates for better performance - show key ones twice for seamless scrolling
    const keyCertificates = certificatesData.slice(0, 8); // Show only 8 most important
    const allCertificates = [...keyCertificates, ...keyCertificates];
    
    allCertificates.forEach((certificate, index) => {
        const certificateCard = createCertificateCard(certificate, index);
        certificatesGrid.appendChild(certificateCard);
    });
}

function createCertificateCard(certificate, index) {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    
    // Create image with optimized loading
    const img = document.createElement('img');
    img.className = 'certificate-image';
    img.alt = certificate.title;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = `assets/images/certificates/${certificate.image}`;
    
    card.innerHTML = `
        <div class="certificate-info">
            <h3 class="certificate-title">${certificate.title}</h3>
            <p class="certificate-issuer">${certificate.issuer}</p>
        </div>
        <div class="certificate-badge">${certificate.type}</div>
    `;
    
    // Insert image at the beginning
    card.insertBefore(img, card.firstChild);
    
    // Add click handler for certificate viewing
    card.addEventListener('click', () => {
        openCertificateModal(certificate);
    });
    
    return card;
}

// ===== CERTIFICATES SCROLL CONTROL =====
function setupCertificatesScrollControl() {
    const pauseBtn = document.getElementById('pause-scroll');
    const certificatesGrid = document.getElementById('certificates-grid');
    let isPaused = false;
    
    if (pauseBtn && certificatesGrid) {
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            
            if (isPaused) {
                certificatesGrid.style.animationPlayState = 'paused';
                pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume Scrolling';
            } else {
                certificatesGrid.style.animationPlayState = 'running';
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Scrolling';
            }
        });
        
        // Pause on hover
        certificatesGrid.addEventListener('mouseenter', () => {
            certificatesGrid.style.animationPlayState = 'paused';
        });
        
        certificatesGrid.addEventListener('mouseleave', () => {
            if (!isPaused) {
                certificatesGrid.style.animationPlayState = 'running';
            }
        });
    }
}

// ===== CERTIFICATES TICKER =====
function setupCertificatesTicker() {
    // This function is now integrated into the main certificates scroll
    console.log('Certificate scrolling initialized');
}

// ===== LOAD RESEARCH DATA =====
function loadResearchData() {
    const researchGrid = document.getElementById('research-grid');
    
    researchData.forEach((research, index) => {
        const researchCard = createResearchCard(research, index);
        researchGrid.appendChild(researchCard);
    });
}

function createResearchCard(research, index) {
    const card = document.createElement('a');
    card.className = 'research-card';
    card.href = research.link;
    card.target = '_blank';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    
    card.innerHTML = `
        <img src="assets/images/research/${research.image}" alt="${research.title}" class="research-image" loading="lazy">
        <div class="research-content">
            <h3 class="research-title">${research.title}</h3>
            <p class="research-excerpt">${research.excerpt}</p>
            <div class="research-meta">
                <span class="research-type">${research.type}</span>
                <span>Read More</span>
            </div>
        </div>
        <div class="research-overlay">
            <i class="fas fa-external-link-alt"></i>
            <span>View Research Paper</span>
        </div>
    `;
    
    // Add click tracking
    card.addEventListener('click', () => {
        console.log(`Clicked on research: ${research.title}`);
    });
    
    return card;
}

// ===== CERTIFICATE MODAL =====
function openCertificateModal(certificate) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'certificate-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 2rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'certificate-modal-content';
    modalContent.style.cssText = `
        max-width: 800px;
        max-height: 90vh;
        background: white;
        border-radius: 1rem;
        overflow: hidden;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <button class="modal-close" style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            z-index: 10001;
            transition: background 0.3s ease;
        ">
            <i class="fas fa-times"></i>
        </button>
        <img src="assets/images/certificates/${certificate.image}" alt="${certificate.title}" style="
            width: 100%;
            height: auto;
            display: block;
        ">
        <div style="padding: 2rem;">
            <h3 style="margin: 0 0 1rem 0; color: var(--primary-blue);">${certificate.title}</h3>
            <p style="margin: 0; color: var(--text-secondary);">Issued by: ${certificate.issuer}</p>
            <span style="
                display: inline-block;
                background: var(--primary-gradient);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 1rem;
                font-size: 0.9rem;
                margin-top: 1rem;
            ">${certificate.type}</span>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animate in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close handlers
    const closeModal = () => {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    };
    
    modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    // ESC key handler
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// ===== CONTACT FORM =====
function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== GSAP ANIMATIONS =====
function initializeGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    const tl = gsap.timeline();
    tl.from('.hero-profile', { duration: 1, y: 50, opacity: 0, ease: 'power2.out' })
      .from('.hero-title', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.5')
      .from('.hero-subtitle', { duration: 0.6, y: 20, opacity: 0, ease: 'power2.out' }, '-=0.4')
      .from('.hero-description', { duration: 0.6, y: 20, opacity: 0, ease: 'power2.out' }, '-=0.3')
      .from('.hero-stats', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.2')
      .from('.hero-actions', { duration: 0.6, y: 20, opacity: 0, ease: 'power2.out' }, '-=0.2')
      .from('.social-links', { duration: 0.6, y: 20, opacity: 0, ease: 'power2.out' }, '-=0.1');
    
    // Parallax effect for hero background
    gsap.to('.hero-particles', {
        y: -100,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Stagger animations for cards
    gsap.utils.toArray('.company-logo').forEach((logo, index) => {
        gsap.from(logo, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: logo,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.certificate-card, .research-card, .education-card');
    animatedElements.forEach(el => observer.observe(el));
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    // Performance timing
    if ('performance' in window) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', (e) => {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.certificate-modal-overlay');
        modals.forEach(modal => {
            if (modal.style.opacity === '1') {
                modal.click();
            }
        });
    }
    
    // Enter key for clickable elements
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('certificate-card') || 
            focusedElement.classList.contains('company-logo')) {
            focusedElement.click();
        }
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Intersection Observer for lazy loading and animations
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Optimize image loading
                if (!img.complete) {
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    }, { once: true });
                } else {
                    img.classList.add('loaded');
                }
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Optimize certificate scrolling performance
function optimizeScrollingPerformance() {
    const certificatesGrid = document.getElementById('certificates-grid');
    if (certificatesGrid) {
        // Use GPU acceleration
        certificatesGrid.style.transform = 'translateZ(0)';
        certificatesGrid.style.willChange = 'transform';
        
        // Pause animation when not visible
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    certificatesGrid.style.animationPlayState = 'running';
                } else {
                    certificatesGrid.style.animationPlayState = 'paused';
                }
            });
        });
        
        scrollObserver.observe(certificatesGrid);
    }
}

// ===== EXPORT FOR GLOBAL ACCESS =====
window.portfolioApp = {
    scrollToElement,
    showNotification,
    openCertificateModal,
    companiesData,
    educationData,
    certificatesData,
    researchData
};