// ===== PORTFOLIO WEBSITE - KARTIK PANDYA =====

// ===== ADVANCED HERO ANIMATIONS =====

// DNA Helix & Cell Canvas Animation (Life Sciences Theme)
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const dnaHelixes = [];
    const cells = [];
    const molecules = [];
    
    // DNA Helix Structure
    class DNAHelix {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = 0.01;
            this.amplitude = 30;
            this.wavelength = 80;
            this.height = 150;
            this.opacity = Math.random() * 0.3 + 0.2;
        }
        
        update() {
            this.angle += this.speed;
            this.y -= 0.3;
            if (this.y < -this.height) {
                this.y = canvas.height + this.height;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Draw DNA double helix
            for (let i = 0; i < this.height; i += 5) {
                const offset = Math.sin((i / this.wavelength) * Math.PI * 2 + this.angle) * this.amplitude;
                
                // Left strand - Navy Primary
                ctx.fillStyle = `rgba(49, 76, 111, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(offset, i - this.height/2, 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Right strand - Soft Blue
                ctx.fillStyle = `rgba(99, 132, 162, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(-offset, i - this.height/2, 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Connection lines (phosphate backbone) - Cream
                if (i % 10 === 0) {
                    ctx.strokeStyle = `rgba(244, 235, 222, ${this.opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(offset, i - this.height/2);
                    ctx.lineTo(-offset, i - this.height/2);
                    ctx.stroke();
                }
            }
            
            ctx.restore();
        }
    }
    
    // Cell Structure
    class Cell {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 30 + 20;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.25 + 0.15;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = Math.random() * 0.01 - 0.005;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            if (this.x > canvas.width + this.size) this.x = -this.size;
            if (this.x < -this.size) this.x = canvas.width + this.size;
            if (this.y > canvas.height + this.size) this.y = -this.size;
            if (this.y < -this.size) this.y = canvas.height + this.size;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // Cell membrane - Navy Blue
            ctx.strokeStyle = `rgba(49, 76, 111, ${this.opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.stroke();
            
            // Nucleus - Soft Blue
            ctx.fillStyle = `rgba(99, 132, 162, ${this.opacity * 0.8})`;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
            
            // Organelles (mitochondria-like) - Dark Navy
            for (let i = 0; i < 3; i++) {
                const angle = (Math.PI * 2 / 3) * i;
                const x = Math.cos(angle) * this.size * 0.6;
                const y = Math.sin(angle) * this.size * 0.6;
                
                ctx.fillStyle = `rgba(31, 60, 92, ${this.opacity * 0.6})`;
                ctx.beginPath();
                ctx.ellipse(x, y, 4, 6, angle, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        }
    }
    
    // Molecule (protein/antibody structures)
    class Molecule {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 2;
            this.speedX = Math.random() * 0.6 - 0.3;
            this.speedY = Math.random() * 0.6 - 0.3;
            this.opacity = Math.random() * 0.4 + 0.3;
            this.color = Math.random() > 0.5 ? 'rgba(99, 132, 162' : 'rgba(49, 76, 111';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `${this.color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize entities
    for (let i = 0; i < 5; i++) dnaHelixes.push(new DNAHelix());
    for (let i = 0; i < 15; i++) cells.push(new Cell());
    for (let i = 0; i < 50; i++) molecules.push(new Molecule());
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw molecules (background layer)
        molecules.forEach(molecule => {
            molecule.update();
            molecule.draw();
        });
        
        // Draw molecular bonds
        molecules.forEach((moleculeA, indexA) => {
            molecules.slice(indexA + 1, indexA + 5).forEach(moleculeB => {
                const dx = moleculeA.x - moleculeB.x;
                const dy = moleculeA.y - moleculeB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(127, 140, 141, ${0.15 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(moleculeA.x, moleculeA.y);
                    ctx.lineTo(moleculeB.x, moleculeB.y);
                    ctx.stroke();
                }
            });
        });
        
        // Draw DNA helixes (mid layer)
        dnaHelixes.forEach(helix => {
            helix.update();
            helix.draw();
        });
        
        // Draw cells (foreground layer)
        cells.forEach(cell => {
            cell.update();
            cell.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typed Role Animation
function initTypedRole() {
    const roles = [
        'Product Marketer',
        'Strategy Consultant',
        'Healthcare Innovator',
        'Go-to-Market Strategist',
        'Product Manager'
    ];
    
    const typedElement = document.getElementById('typed-role');
    if (!typedElement) return;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (!isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else {
                typingSpeed = 100;
            }
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
            
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1500);
}

// Counter Animation for Stats
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-inline');
    let animated = false;
    
    const animateCounter = (element) => {
        const target = parseInt(element.dataset.count);
        const numElement = element.querySelector('.stat-num-inline');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                numElement.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                numElement.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                stats.forEach((stat, index) => {
                    setTimeout(() => animateCounter(stat), index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsContainer = document.querySelector('.hero-stats-inline');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

// ===== COMPANY DATA WITH LOGOS AND LINKS =====
const companiesData = [
    {
        name: "No Patient Left Behind",
        logo: "NPLB.png",
        website: "https://www.nopatientleftbehind.org",
        period: "Aug 2025 - Oct 2025",
        role: "Biotech Fellowship (Regional/Commercial Product)",
        description: "Advanced biotech training focusing on regional and commercial product strategies in the biotechnology sector.",
        category: "current"
    },
    {
        name: "Agilent Technologies",
        logo: "AGILENT TECHNOLOGIES.png",
        website: "https://www.agilent.com",
        period: "Sep 2024 - May 2025",
        role: "Marketing Co-op (Regional/Commercial Product)",
        description: "Leading regional and commercial product marketing strategies for analytical instruments in healthcare and life sciences markets.",
        category: "product-marketing"
    },
    {
        name: "Trainity",
        logo: "TRAINITY.png",
        website: "https://www.trainity.com",
        period: "Jun 2024 - Aug 2024",
        role: "Data Analyst Bootcamp",
        description: "Intensive data analytics training program focused on data-driven decision making and business intelligence.",
        category: "consulting"
    },
    {
        name: "Motorola Solutions",
        logo: "MOTOROLA SOLUTIONS.png",
        website: "https://www.motorolasolutions.com",
        period: "Feb 2024 - May 2024",
        role: "Product Strategy Consultant",
        description: "Developed comprehensive product strategies for communication technology solutions and IoT devices.",
        category: "consulting"
    },
    {
        name: "LearnLight",
        logo: "LEARNLIGHT.png",
        website: "https://www.learnlight.com",
        period: "Jan 2024 - May 2024",
        role: "User Strategy Consultant",
        description: "Consulted on user experience strategies and customer journey optimization for educational technology platforms.",
        category: "consulting"
    },
    {
        name: "International Iberian Nanotechnology Laboratory",
        logo: "INL.png",
        website: "https://www.inl.int",
        period: "Nov 2023 - May 2024",
        role: "Global Strategy Consultant",
        description: "Provided strategic consulting for global expansion and innovation in nanotechnology research and applications.",
        category: "consulting"
    },
    {
        name: "Periofill",
        logo: "PERIOFILL.png",
        website: "https://www.periofill.com",
        period: "Aug 2023 - Dec 2023",
        role: "Go-to-Market Strategy",
        description: "Developed and executed go-to-market strategies for innovative dental and periodontal medical devices.",
        category: "product-marketing"
    },
    {
        name: "AstraZeneca",
        logo: "ASTRAZENECA.png",
        website: "https://www.astrazeneca.com",
        period: "Oct 2023 - Dec 2023",
        role: "Competitive Intelligence Strategy Consultant",
        description: "Conducted competitive intelligence analysis for pharmaceutical products and market positioning strategies.",
        category: "product-marketing"
    },
    {
        name: "Johns Hopkins Hospital",
        logo: "JHH.jpeg",
        website: "https://www.hopkinshospital.org",
        period: "Aug 2023 - Oct 2023",
        role: "Healthcare/Hospital Strategy Consultant",
        description: "Developed strategic initiatives for hospital operations and healthcare service delivery optimization.",
        category: "consulting"
    },
    {
        name: "Dolphin Lifescience India",
        logo: "Dolphin Lifescince India.png",
        website: "https://www.dolphinlifesciences.com",
        period: "Jul 2021 - Aug 2023",
        role: "Global Product Manager",
        description: "Led global product management for life sciences and biotechnology products with focus on international market expansion.",
        category: "product-marketing"
    },
    {
        name: "Shilchar Technologies",
        logo: "SHILCHAR TECHNOLOGIES PVT. LTD..png",
        website: "https://www.shilchar.com",
        period: "Sep 2020 - Jul 2021",
        role: "Product Design & Development Engineer - GMT",
        description: "Designed and developed innovative healthcare technology products and medical device solutions.",
        category: "research"
    },
    {
        name: "Rameshwar Boiler & Utility Services",
        logo: "RAMESHWAR.png",
        website: "#",
        period: "Aug 2019 - Jun 2020",
        role: "Product Research - R&D",
        description: "Conducted research and development for industrial equipment and utility systems optimization.",
        category: "research"
    },
    {
        name: "Indian Oil Corporation",
        logo: "IOCL.jpeg",
        website: "https://www.iocl.com",
        period: "May 2019 - Jun 2019",
        role: "Industrial Training Summer Intern",
        description: "Gained hands-on experience in petroleum engineering and large-scale industrial operations.",
        category: "research"
    },
    {
        name: "Koch-Glitsch India",
        logo: "KOCH-GLITSCH.png",
        website: "https://www.koch-glitsch.com",
        period: "May 2018 - Jul 2018",
        role: "Industrial Summer Intern",
        description: "Worked on industrial process optimization and engineering solutions for mass transfer equipment.",
        category: "consulting"
    },
    {
        name: "NSS",
        logo: "NSS.png",
        website: "https://www.nss.gov.in",
        period: "Aug 2016 - May 2017",
        role: "Volunteering",
        description: "Participated in community service initiatives and social development programs for public welfare.",
        category: "product-marketing"
    }
];

// ===== EDUCATION DATA =====
const educationData = [
    {
        institution: "Johns Hopkins University",
        logo: "JOHNS HOPKINS UNIVERSITY.png",
        degree: "Master of Science in Engineering Management",
        field: "Smart Product & Device Design - Medical, Healthcare & Clinical",
        year: "2023-2025",
        description: "Specialized in smart medical device design, healthcare innovation, and clinical product development with focus on engineering management."
    },
    {
        institution: "Sardar Vallabhbhai Patel Institute of Technology",
        logo: "SVIT.jpeg",
        degree: "Bachelor of Technology",
        field: "Mechanical Engineering",
        year: "2016-2020",
        description: "Comprehensive foundation in mechanical engineering with emphasis on product design, manufacturing systems, and engineering principles."
    }
];

// ===== SKILLS DATA =====
const skillsData = {
    productFrameworks: [
        "SWOT", "White Space", "RICE", "MoSCoW", "JTBD", "AARRR", "MECE", 
        "OKRs", "KPI", "Kotter's 8-step", "Churn Analysis", "Funnel Analysis", 
        "Chasm Model", "4Ps", "7Ps", "Value Proposition Canvas", 
        "Blue Ocean Strategy", "Customer Persona Mapping"
    ],
    technicalSkills: [
        "Tableau", "Power BI", "Spotfire", "SAP CRM", "Figma", "Qlik", 
        "Pivot tables", "Microsoft Office", "Salesforce", "Google Analytics", 
        "JIRA", "SQL", "R", "SharePoint", "AutoCAD 2D & 3D", "Solid Works", 
        "Solid Edge", "Inventor", "Creo", "Ansys", "SAP ERP", "CFD", "FEA"
    ]
};

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
        title: "A Detailed View on Industrial Safety and Health Analytics using Machine Learning Hybrid Ensemble Techniques",
        authors: "Kartik Pandya, et al.",
        journal: "IEEE Conference",
        year: "2022",
        excerpt: "Advanced machine learning approaches for enhancing workplace safety and health monitoring in industrial environments.",
        abstract: "This research presents hybrid ensemble machine learning techniques for comprehensive industrial safety and health analytics, improving workplace monitoring and predictive maintenance systems.",
        image: "research-placeholder.jpg",
        type: "Machine Learning & Safety",
        category: "Machine Learning",
        citations: 105,
        link: "https://ieeexplore.ieee.org/abstract/document/9936474",
        doi: "10.1109/ICAC3N56670.2022.9936474"
    },
    {
        title: "Management of Shipment Content using Novel Practices of Supply Chain Management and Big Data Analytics",
        authors: "Kartik Pandya, et al.",
        journal: "IEEE Conference",
        year: "2023",
        excerpt: "Innovative supply chain management strategies leveraging big data analytics for optimized shipment operations.",
        abstract: "Novel practices in supply chain management combined with big data analytics for enhanced shipment content management and operational efficiency.",
        image: "4.jpg",
        type: "Supply Chain & Big Data",
        category: "Supply Chain",
        citations: 99,
        link: "https://ieeexplore.ieee.org/abstract/document/10011003",
        doi: "10.1109/ICCMC56507.2023.10011003"
    },
    {
        title: "Smart Supply Chain Management using Big Data Analysis and Machine Learning",
        authors: "Kartik Pandya, et al.",
        journal: "IEEE Conference",
        year: "2022",
        excerpt: "Integration of machine learning and big data analytics for intelligent supply chain optimization and decision making.",
        abstract: "Comprehensive framework integrating machine learning algorithms with big data analysis for smart supply chain management and optimization.",
        image: "2.jpg",
        type: "Supply Chain & ML",
        category: "Supply Chain",
        citations: 12,
        link: "https://ieeexplore.ieee.org/abstract/document/9936359",
        doi: "10.1109/ICAC3N56670.2022.9936359"
    },
    {
        title: "Utilization of Triple Blend Biodiesel towards Performance and Emission Characteristics of Diesel Engine",
        authors: "Kartik Pandya, et al.",
        journal: "Google Scholar",
        year: "2020",
        excerpt: "Experimental analysis of triple blend biodiesel for improved engine performance and reduced emissions in sustainable energy.",
        abstract: "Experimental study on triple blend biodiesel application in diesel engines, analyzing performance metrics and emission characteristics for sustainable energy solutions.",
        image: "1.jpg",
        type: "Sustainable Energy",
        category: "Energy",
        citations: 6,
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=28lx5DsAAAAJ&citation_for_view=28lx5DsAAAAJ:2osOgNQ5qMEC",
        doi: "10.1063/5.0162688"
    },
    {
        title: "A Novel Approach to Tackle and Predict Absenteeism of Students Using Deep Learning and Data Analytics",
        authors: "Kartik Pandya, et al.",
        journal: "IEEE Conference",
        year: "2022",
        excerpt: "Deep learning and data analytics framework for predicting and addressing student absenteeism patterns in educational institutions.",
        abstract: "Novel deep learning approach combined with data analytics for predicting student absenteeism, enabling proactive intervention strategies.",
        image: "research-placeholder.jpg",
        type: "Deep Learning & Education",
        category: "Machine Learning",
        citations: 10,
        link: "https://ieeexplore.ieee.org/abstract/document/9936410",
        doi: "10.1109/ICAC3N56670.2022.9936410"
    },
    {
        title: "Experiential and Theoretical Analysis of 4 Stroke VCR Engine and Calculation of Waste Heat Recovery",
        authors: "Kartik Pandya, et al.",
        journal: "IJSREM",
        year: "2019",
        excerpt: "Comprehensive experimental and theoretical study on VCR engines with focus on waste heat recovery for improved energy efficiency.",
        abstract: "Combined experimental and theoretical analysis of 4-stroke VCR engines with emphasis on waste heat recovery calculations for enhanced energy efficiency.",
        image: "5.png",
        type: "Mechanical Engineering",
        category: "Machine Learning",
        citations: 2007,
        link: "https://ijsrem.com/download/experiential-and-theoretical-analysis-of-4-stroke-vcr-engine-and-calculation-of-waste-heat-recovery/",
        doi: "N/A"
    }
];

// ===== PROJECTS DATA =====
const projectsData = [
    {
        title: "Analysis of Innovative Trends in Remote Patient Monitoring with Relevance to Oncology Trials",
        company: "AstraZeneca",
        excerpt: "Comprehensive analysis of remote patient monitoring technologies and their applications in oncology clinical trials.",
        image: "project1.jpg",
        type: "Healthcare Innovation",
        category: "healthcare",
        impact: 5,
        technologies: ["Clinical Trials", "Remote Monitoring", "Oncology", "Healthcare Tech"],
        link: "https://drive.google.com/file/d/12A9D4IasqRKNd8WdoZ2fiB7d-gpU1f73/view?usp=share_link"
    },
    {
        title: "Analysis of the iFood Marketing Analytics Dataset for Enhanced Marketing Strategies",
        company: "iFood",
        excerpt: "Data-driven marketing analysis leveraging customer behavior insights for strategic marketing optimization.",
        image: "project2.jpg",
        type: "Marketing Analytics",
        category: "product",
        impact: 4,
        technologies: ["Marketing Analytics", "Data Science", "Customer Insights", "Python"],
        link: "https://drive.google.com/file/d/182QJxPBa3a3fB_Mzy3FiiEZF__DeSL_7/view?usp=share_link"
    },
    {
        title: "Comprehensive Market Research Report on Residential Energy Storage",
        company: "Energy Sector",
        excerpt: "In-depth market research and analysis of residential energy storage systems and market opportunities.",
        image: "project3.jpg",
        type: "Market Research",
        category: "strategy",
        impact: 4,
        technologies: ["Market Research", "Energy Systems", "Strategic Analysis", "Competitive Intelligence"],
        link: "https://drive.google.com/file/d/1LcMuXDH0x1D-mxRiK5xlLhxW7B0krTcM/view?usp=share_link"
    },
    {
        title: "Framework for Identifying AI Products that has Potential for Success",
        company: "AI Strategy",
        excerpt: "Strategic framework for evaluating and identifying AI products with high success potential in the market.",
        image: "project4.jpg",
        type: "AI Product Strategy",
        category: "technology",
        impact: 5,
        technologies: ["Artificial Intelligence", "Product Strategy", "Framework Design", "Innovation"],
        link: "https://drive.google.com/file/d/1Qhbvlz80wyEpiDmP5SDx4m_eQhgbGPto/view?usp=share_link"
    },
    {
        title: "Gen Z Investing Behaviour Market Research",
        company: "DriveWealth",
        excerpt: "Market research analyzing Gen Z investment patterns, behaviors, and preferences in financial markets.",
        image: "project5.jpg",
        type: "Market Research",
        category: "product",
        impact: 4,
        technologies: ["Market Research", "Financial Analysis", "Consumer Behavior", "Data Analytics"],
        link: "https://drive.google.com/file/d/12CQSm_hZENzuWkiDrXE8y5ZBACAqUCfX/view?usp=share_link"
    },
    {
        title: "Harnessing Technology for a Greener Tomorrow with Bintelligent",
        company: "Bintelligent",
        excerpt: "Sustainable technology solutions and environmental impact analysis for green technology initiatives.",
        image: "project6.jpg",
        type: "Sustainability",
        category: "technology",
        impact: 4,
        technologies: ["Sustainability", "Green Tech", "Environmental Impact", "Innovation"],
        link: "https://drive.google.com/file/d/19UcZGHaPq9mMuxXmHJQ0WvTwFoN4Oolo/view?usp=share_link"
    },
    {
        title: "Interactive Visualization using Tableau - King County, Washington Housing Sales Dashboard",
        company: "Data Visualization",
        excerpt: "Interactive data visualization dashboard analyzing housing market trends and sales patterns in King County.",
        image: "project7.jpg",
        type: "Data Visualization",
        category: "technology",
        impact: 3,
        technologies: ["Tableau", "Data Visualization", "Real Estate Analytics", "Dashboard Design"],
        link: "https://drive.google.com/file/d/1-9EnO7JUM8X2rF9_9T-yTgNURwhELK_o/view?usp=share_link"
    },
    {
        title: "3D Food Printing Innovation",
        company: "International Iberian Nanotechnology Laboratory",
        excerpt: "Innovative research on 3D food printing technologies and applications in the food industry.",
        image: "project8.jpg",
        type: "Innovation & Research",
        category: "technology",
        impact: 5,
        technologies: ["3D Printing", "Nanotechnology", "Food Tech", "R&D"],
        link: "https://drive.google.com/file/d/1Wyl-AVOfiF8muIr0Hnd0Xa7QsKmWUOmX/view?usp=share_link"
    },
    {
        title: "M&A Strategy for WBA's Pharmaceutical Retail Business",
        company: "Walgreens Boots Alliance",
        excerpt: "Strategic mergers and acquisitions analysis for pharmaceutical retail business expansion and optimization.",
        image: "project9.jpg",
        type: "Business Strategy",
        category: "strategy",
        impact: 5,
        technologies: ["M&A Strategy", "Pharmaceutical Retail", "Business Analysis", "Strategic Planning"],
        link: "https://drive.google.com/file/d/1cfihP2FYUlOb1GQflAMD00cR3suYJkVP/view?usp=share_link"
    },
    {
        title: "OptiFlow - Streamlining Supply Chain for Seamless Nearshore Transitions",
        company: "Supply Chain Optimization",
        excerpt: "Supply chain optimization solution for efficient nearshore manufacturing transitions and operations.",
        image: "project11.jpg",
        type: "Supply Chain",
        category: "strategy",
        impact: 4,
        technologies: ["Supply Chain", "Operations", "Optimization", "Manufacturing"],
        link: "https://drive.google.com/file/d/1jk9zzKkqrk747-k1iUaTaTvCRfyS1rmL/view?usp=share_link"
    },
    {
        title: "PM VALLEY Product Case",
        company: "Product Management",
        excerpt: "Comprehensive product management case study analyzing product strategy and execution frameworks.",
        image: "project12.jpg",
        type: "Product Management",
        category: "product",
        impact: 4,
        technologies: ["Product Management", "Strategy Framework", "Product Development", "Case Study"],
        link: "https://drive.google.com/file/d/18y2PqMDLvDA6y8DsMfdQgiAd6vGwxHft/view?usp=share_link"
    },
    {
        title: "Product Prioritization Decision Making Tool",
        company: "Product Strategy",
        excerpt: "Strategic decision-making framework and tools for effective product prioritization and roadmap planning.",
        image: "project13.jpg",
        type: "Product Strategy",
        category: "product",
        impact: 5,
        technologies: ["Product Prioritization", "Decision Framework", "Roadmap Planning", "Strategic Tools"],
        link: "https://drive.google.com/file/d/1NsZAW_T3uoHphFJMsrM0uVKJwAN9Moq8/view?usp=share_link"
    },
    {
        title: "Proposal for an Innovative Business Strategy for Commercial Airplane Segment",
        company: "Aerospace",
        excerpt: "Strategic business proposal for innovation and growth in the commercial airplane industry segment.",
        image: "project14.jpg",
        type: "Business Strategy",
        category: "strategy",
        impact: 4,
        technologies: ["Aviation Strategy", "Business Innovation", "Market Analysis", "Strategic Proposal"],
        link: "https://drive.google.com/file/d/195dFtVYRbVF3zVYAAabFNDai9cNNO7T8/view?usp=share_link"
    },
    {
        title: "UI/UX Design - An MVP for Homeless People",
        company: "Social Impact",
        excerpt: "User-centered UI/UX design for a minimum viable product addressing the needs of homeless populations.",
        image: "project15.jpg",
        type: "UI/UX Design",
        category: "technology",
        impact: 5,
        technologies: ["UI/UX Design", "MVP Development", "Social Impact", "User Research"],
        link: "https://drive.google.com/file/d/1JUMycmqDaDKdGb25mrWd8SWNigttcZJP/view?usp=share_link"
    },
    {
        title: "Visual Symphony - Elevating Small Apparel Stores through Strategic Merchandising",
        company: "Retail Strategy",
        excerpt: "Strategic merchandising and visual management solutions for small apparel retail business optimization.",
        image: "project16.jpg",
        type: "Retail Strategy",
        category: "strategy",
        impact: 4,
        technologies: ["Retail Strategy", "Visual Merchandising", "Business Optimization", "Strategic Planning"],
        link: "https://drive.google.com/file/d/1Af-CIHPGhLYs10bvb0-WpHs1fbTOyl2l/view?usp=share_link"
    }
];

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Advanced hero animations
    initParticles();
    initTypedRole();
    initCounterAnimation();
    initRotatingOpportunities();
    initAboutImageRotation();
    
    // Standard initialization
    setupNavigation();
    setupMobileMenu();
    loadExperience();
    loadEducation();
    loadSkills();
    loadCertificates();
    initCertificateTabs();
    initCertificateModal();
    loadResearch();
    initResearchTabs();
    loadProjects();
    initProjectTabs();
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

// ===== LOAD EXPERIENCE WITH SIMPLE TIMELINE =====
function loadExperience() {
    const container = document.getElementById('experience-cards');
    if (!container) return;
    
    container.innerHTML = '';
    
    companiesData.forEach((company, index) => {
        const card = document.createElement('div');
        card.className = 'exp-card';
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
        
        // Determine skills based on role
        const skills = [];
        if (company.role.toLowerCase().includes('product')) {
            skills.push('Product Strategy', 'Market Analysis');
        }
        if (company.role.toLowerCase().includes('marketing')) {
            skills.push('Marketing Strategy', 'Brand Management');
        }
        if (company.role.toLowerCase().includes('consult') || company.role.toLowerCase().includes('strategy')) {
            skills.push('Strategic Planning', 'Business Analysis');
        }
        
        // Determine if this card is odd (right side) or even (left side)
        const isOdd = (index + 1) % 2 !== 0;
        
        if (isOdd) {
            // Odd cards: empty left, dot center, content right
            card.innerHTML = `
                <div class="exp-card-spacer"></div>
                <div class="exp-card-dot-wrapper">
                    <div class="exp-card-dot"></div>
                </div>
                <div class="exp-card-content">
                    <div class="exp-header">
                        <img src="assets/images/companies/${company.logo}" alt="${company.name}" class="exp-logo" onerror="this.style.display='none'">
                        <div class="exp-title-group">
                            <h3 class="exp-role">${company.role}</h3>
                            <p class="exp-company">${company.name}</p>
                        </div>
                    </div>
                    <div class="exp-date">
                        <i class="far fa-calendar-alt"></i>
                        ${company.period}
                    </div>
                    <p class="exp-description">${company.description}</p>
                    ${skills.length > 0 ? `
                        <div class="exp-skills">
                            ${skills.map(skill => `<span class="exp-skill-tag">${skill}</span>`).join('')}
                        </div>
                    ` : ''}
                    ${company.website && company.website !== '#' ? `
                        <a href="${company.website}" target="_blank" class="exp-link">
                            <i class="fas fa-external-link-alt"></i>
                            Visit Company
                        </a>
                    ` : ''}
                </div>
            `;
        } else {
            // Even cards: content left, dot center, empty right
            card.innerHTML = `
                <div class="exp-card-content">
                    <div class="exp-header">
                        <img src="assets/images/companies/${company.logo}" alt="${company.name}" class="exp-logo" onerror="this.style.display='none'">
                        <div class="exp-title-group">
                            <h3 class="exp-role">${company.role}</h3>
                            <p class="exp-company">${company.name}</p>
                        </div>
                    </div>
                    <div class="exp-date">
                        <i class="far fa-calendar-alt"></i>
                        ${company.period}
                    </div>
                    <p class="exp-description">${company.description}</p>
                    ${skills.length > 0 ? `
                        <div class="exp-skills">
                            ${skills.map(skill => `<span class="exp-skill-tag">${skill}</span>`).join('')}
                        </div>
                    ` : ''}
                    ${company.website && company.website !== '#' ? `
                        <a href="${company.website}" target="_blank" class="exp-link">
                            <i class="fas fa-external-link-alt"></i>
                            Visit Company
                        </a>
                    ` : ''}
                </div>
                <div class="exp-card-dot-wrapper">
                    <div class="exp-card-dot"></div>
                </div>
                <div class="exp-card-spacer"></div>
            `;
        }
        
        // Add category data attribute for filtering
        card.setAttribute('data-category', company.category);
        
        container.appendChild(card);
    });
    
    // Initialize filter functionality
    initializeExperienceFilters();
}

// ===== EXPERIENCE FILTER FUNCTIONALITY =====
function initializeExperienceFilters() {
    const filterButtons = document.querySelectorAll('.experience-filter-btn');
    const experienceCards = document.querySelectorAll('.exp-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards with animation
            experienceCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.style.display = 'grid';
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = '';
                        }, 10);
                    }, index * 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
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
            <p class="description">${edu.description}</p>
        `;
        
        educationGrid.appendChild(eduCard);
    });
}

// ===== LOAD SKILLS =====
function loadSkills() {
    // Load Product Frameworks
    const productFrameworksPills = document.getElementById('product-frameworks-pills');
    if (productFrameworksPills) {
        productFrameworksPills.innerHTML = '';
        skillsData.productFrameworks.forEach((skill, index) => {
            const pill = document.createElement('span');
            pill.className = 'skill-pill';
            pill.textContent = skill;
            pill.style.animationDelay = `${index * 0.05}s`;
            productFrameworksPills.appendChild(pill);
        });
    }
    
    // Load Technical Skills
    const technicalSkillsPills = document.getElementById('technical-skills-pills');
    if (technicalSkillsPills) {
        technicalSkillsPills.innerHTML = '';
        skillsData.technicalSkills.forEach((skill, index) => {
            const pill = document.createElement('span');
            pill.className = 'skill-pill';
            pill.textContent = skill;
            pill.style.animationDelay = `${index * 0.05}s`;
            technicalSkillsPills.appendChild(pill);
        });
    }
}

// ===== LOAD CERTIFICATES WITH FLIP CARD GALLERY =====
let currentCategoryFilter = 'all';

function loadCertificates() {
    const certificatesGallery = document.getElementById('certificates-gallery');
    if (!certificatesGallery) return;
    
    certificatesGallery.innerHTML = '';
    
    // Filter certificates based on current category
    const filteredCerts = currentCategoryFilter === 'all' 
        ? certificatesData 
        : certificatesData.filter(cert => cert.type === currentCategoryFilter);
    
    filteredCerts.forEach((cert, index) => {
        const actualIndex = certificatesData.indexOf(cert);
        
        // Create flip card container
        const flipCard = document.createElement('div');
        flipCard.className = 'cert-flip-card';
        flipCard.style.animationDelay = `${index * 0.1}s`;
        
        // Determine icon based on certificate type
        let iconClass = 'fas fa-certificate';
        if (cert.type === 'Product Management') iconClass = 'fas fa-box-open';
        else if (cert.type === 'Marketing') iconClass = 'fas fa-bullhorn';
        else if (cert.type === 'AI/ML') iconClass = 'fas fa-robot';
        else if (cert.type === 'Process Improvement') iconClass = 'fas fa-chart-line';
        
        flipCard.innerHTML = `
            <div class="cert-flip-inner">
                <!-- Front of Card -->
                <div class="cert-flip-front">
                    <i class="${iconClass} cert-icon"></i>
                    <h3 class="cert-front-title">${cert.title}</h3>
                    <p class="cert-front-issuer">${cert.issuer}</p>
                    <span class="cert-type-badge">${cert.type}</span>
                </div>
                
                <!-- Back of Card -->
                <div class="cert-flip-back">
                    <img src="assets/images/certificates/${cert.image}" 
                         alt="${cert.title}" 
                         class="cert-preview-image"
                         onerror="this.style.display='none'">
                    <div class="cert-back-details">
                        <div>
                            <h3 class="cert-back-title">${cert.title}</h3>
                            <p class="cert-back-issuer">${cert.issuer}</p>
                        </div>
                        <button class="cert-view-button" onclick="openCertificateModal(${actualIndex})">
                            <i class="fas fa-expand"></i>
                            View Certificate
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        certificatesGallery.appendChild(flipCard);
    });
    
    // Show empty state if no certificates
    if (filteredCerts.length === 0) {
        certificatesGallery.innerHTML = `
            <div class="cert-empty">
                <i class="fas fa-certificate"></i>
                <p>No certificates found in this category.</p>
            </div>
        `;
    }
}

// Certificate Tab Filtering
function initCertificateTabs() {
    const pills = document.querySelectorAll('.cert-category-pill');
    
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Update active state
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            // Update filter and reload
            currentCategoryFilter = pill.getAttribute('data-category');
            loadCertificates();
        });
    });
}

// Certificate Modal Functions
let currentCertIndex = 0;

function openCertificateModal(index) {
    currentCertIndex = index;
    const modal = document.getElementById('certificate-modal');
    const cert = certificatesData[index];
    
    if (!modal || !cert) {
        console.error('Modal or certificate not found', { modal, cert, index });
        return;
    }
    
    // Update modal content
    const modalImage = document.getElementById('modal-cert-image');
    const modalTitle = document.getElementById('modal-cert-title');
    const modalIssuer = document.getElementById('modal-cert-issuer');
    const modalType = document.getElementById('modal-cert-type');
    
    if (modalImage) modalImage.src = `assets/images/certificates/${cert.image}`;
    if (modalTitle) modalTitle.textContent = cert.title;
    if (modalIssuer) modalIssuer.textContent = cert.issuer;
    if (modalType) modalType.textContent = cert.type;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Make function globally accessible
window.openCertificateModal = openCertificateModal;


function closeCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateCertificate(direction) {
    currentCertIndex += direction;
    
    // Loop around
    if (currentCertIndex < 0) {
        currentCertIndex = certificatesData.length - 1;
    } else if (currentCertIndex >= certificatesData.length) {
        currentCertIndex = 0;
    }
    
    openCertificateModal(currentCertIndex);
}

// Initialize Certificate Modal Event Listeners
function initCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    if (!modal) return;
    
    // Close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCertificateModal);
    }
    
    // Backdrop click
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closeCertificateModal);
    }
    
    // Navigation buttons
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateCertificate(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateCertificate(1);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeCertificateModal();
                break;
            case 'ArrowLeft':
                navigateCertificate(-1);
                break;
            case 'ArrowRight':
                navigateCertificate(1);
                break;
        }
    });
}

// ===== LOAD RESEARCH =====
// ===== LOAD RESEARCH PUBLICATIONS =====
let currentResearchFilter = 'all';

function loadResearch() {
    const researchPublications = document.getElementById('research-publications');
    if (!researchPublications) return;
    
    researchPublications.innerHTML = '';
    
    // Filter research papers based on current category
    const filteredPapers = currentResearchFilter === 'all'
        ? researchData
        : researchData.filter(paper => paper.category === currentResearchFilter);
    
    filteredPapers.forEach((paper, index) => {
        const paperCard = document.createElement('div');
        paperCard.className = 'research-paper-card';
        paperCard.style.animationDelay = `${index * 0.1}s`;
        paperCard.setAttribute('data-paper-id', index);
        
        paperCard.innerHTML = `
            <div class="paper-header">
                <h3 class="paper-title">${paper.title}</h3>
                <p class="paper-authors">${paper.authors}</p>
                <div class="paper-meta">
                    <span class="paper-journal">${paper.journal}</span>
                    <span class="paper-year">${paper.year}</span>
                    <span class="paper-citations">
                        <i class="fas fa-quote-right"></i>
                        ${paper.citations} citations
                    </span>
                </div>
            </div>
            
            <p class="paper-excerpt">${paper.excerpt}</p>
            
            <div class="paper-abstract" id="abstract-${index}">
                <div class="paper-abstract-title">Abstract</div>
                <p class="paper-abstract-text">${paper.abstract}</p>
            </div>
            
            <div class="paper-footer">
                <div class="paper-doi">
                    <strong>DOI:</strong> ${paper.doi}
                </div>
                <div class="paper-actions">
                    <button class="paper-btn paper-btn-abstract" onclick="toggleAbstract(${index})">
                        <i class="fas fa-align-left"></i>
                        Abstract
                    </button>
                    <a href="${paper.link}" target="_blank" class="paper-btn">
                        <i class="fas fa-external-link-alt"></i>
                        View Publication
                    </a>
                </div>
            </div>
        `;
        
        researchPublications.appendChild(paperCard);
    });
    
    // Show empty state if no papers found
    if (filteredPapers.length === 0) {
        researchPublications.innerHTML = `
            <div class="research-empty">
                <i class="fas fa-file-alt"></i>
                <p>No publications found in this category.</p>
            </div>
        `;
    }
}

// Toggle abstract visibility
function toggleAbstract(index) {
    const abstract = document.getElementById(`abstract-${index}`);
    if (abstract) {
        abstract.classList.toggle('expanded');
    }
}

// Research category filtering
function initResearchTabs() {
    const pills = document.querySelectorAll('.research-category-pill');
    
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Update active state
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            // Update filter and reload
            currentResearchFilter = pill.getAttribute('data-filter');
            loadResearch();
        });
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

// ===== LOAD PROJECTS =====
// Track current filter for projects
let currentProjectFilter = 'all';

function loadProjects() {
    const projectsMasonry = document.getElementById('projects-masonry');
    if (!projectsMasonry) return;
    
    projectsMasonry.innerHTML = '';
    
    // Filter projects based on current filter
    const filteredProjects = projectsData.filter(project => {
        if (currentProjectFilter === 'all') return true;
        return project.category === currentProjectFilter;
    });
    
    // Display filtered projects with masonry layout
    filteredProjects.forEach((project, index) => {
        // Calculate dynamic card height based on content
        const baseHeight = 10; // Base 500px (10 rows * 50px)
        let cardHeight = baseHeight;
        
        // Add height for long titles
        if (project.title.length > 80) cardHeight += 1;
        
        // Add height for multiple tags
        if (project.technologies && project.technologies.length > 3) cardHeight += 1;
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.setProperty('--card-height', cardHeight);
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectCard.setAttribute('data-category', project.category);
        
        // Generate star rating
        const stars = Array(5).fill(0).map((_, i) => {
            return i < (project.impact || 4) 
                ? '<i class="fas fa-star"></i>' 
                : '<i class="far fa-star"></i>';
        }).join('');
        
        projectCard.innerHTML = `
            <div class="project-thumbnail-wrapper">
                <img src="assets/images/projects/${project.image}" 
                     alt="${project.title}" 
                     class="project-thumbnail"
                     onerror="this.parentElement.innerHTML='<div class=\\'project-placeholder\\'><i class=\\'fas fa-project-diagram\\'></i><span>${project.type}</span></div>'">
                <div class="project-overlay">
                    <button class="project-quick-view" onclick="window.open('${project.link}', '_blank')">
                        <i class="fas fa-expand"></i>
                        Quick View
                    </button>
                </div>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <span class="project-company">${project.company}</span>
                    <div class="project-rating">
                        ${stars}
                    </div>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-excerpt">${project.excerpt}</p>
                ${project.technologies && project.technologies.length > 0 ? `
                    <div class="project-tags">
                        ${project.technologies.slice(0, 4).map(tech => 
                            `<span class="project-tag">${tech}</span>`
                        ).join('')}
                    </div>
                ` : ''}
                <a href="${project.link}" target="_blank" class="project-link">
                    View Case Study <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        projectsMasonry.appendChild(projectCard);
    });
    
    // Show message if no projects found
    if (filteredProjects.length === 0) {
        projectsMasonry.innerHTML = `
            <div class="project-empty">
                <i class="fas fa-project-diagram"></i>
                <p>No projects found in this category.</p>
            </div>
        `;
    }
}

function initProjectTabs() {
    const pills = document.querySelectorAll('.project-category-pill');
    if (!pills.length) return;
    
    pills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Update active pill
            pills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter and reload projects
            currentProjectFilter = this.getAttribute('data-filter');
            loadProjects();
        });
    });
}

// ===== ROTATING OPPORTUNITIES TEXT =====
function initRotatingOpportunities() {
    const roleElement = document.getElementById('rotating-role');
    if (!roleElement) return;
    
    const roles = ['PM', 'Consulting', 'PMM'];
    let currentIndex = 0;
    
    function rotateText() {
        // Fade out
        roleElement.style.opacity = '0';
        roleElement.style.transform = 'translateY(-5px)';
        
        setTimeout(() => {
            // Change text
            currentIndex = (currentIndex + 1) % roles.length;
            roleElement.textContent = roles[currentIndex];
            
            // Fade in
            roleElement.style.opacity = '1';
            roleElement.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add transition styles
    roleElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Rotate every 3 seconds
    setInterval(rotateText, 3000);
}

// ===== ABOUT ME IMAGE ROTATION =====
function initAboutImageRotation() {
    const images = document.querySelectorAll('.about-image');
    const indicators = document.querySelectorAll('.indicator');
    const captionText = document.getElementById('image-caption-text');
    
    if (images.length === 0) return;
    
    const captions = [
        'Exploring new perspectives',
        'Adventures & discoveries',
        'Living the journey'
    ];
    
    let currentIndex = 0;
    
    function rotateImages() {
        // Remove active class from current image and indicator
        images[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % images.length;
        
        // Add active class to new image and indicator
        images[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
        
        // Update caption with fade effect
        captionText.style.opacity = '0';
        setTimeout(() => {
            captionText.textContent = captions[currentIndex];
            captionText.style.opacity = '1';
        }, 300);
    }
    
    // Add transition to caption
    captionText.style.transition = 'opacity 0.3s ease';
    
    // Rotate every 3 seconds
    setInterval(rotateImages, 3000);
    
    // Add click functionality to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            images[currentIndex].classList.remove('active');
            indicators[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            images[currentIndex].classList.add('active');
            indicators[currentIndex].classList.add('active');
            
            captionText.style.opacity = '0';
            setTimeout(() => {
                captionText.textContent = captions[currentIndex];
                captionText.style.opacity = '1';
            }, 300);
        });
    });
}

// ===== ADVANCED MAGNETIC CURSOR WITH SMOOTH TRAIL =====
function initCustomCursor() {
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Track mouse movement - instant update
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Fast smooth cursor animation
    function animateCursor() {
        // Faster follow effect - increased from 0.15 to 0.35
        const speed = 0.35;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover effect on interactive elements with magnetic attraction
    const hoverElements = document.querySelectorAll('a, button, .timeline-toggle, .research-category-pill, .project-category-pill, .cert-item, .project-card, .back-to-top, .schedule-meeting-btn, input, textarea, select, .cert-flip-card, .exp-category-pill, .profile-status');
    
    hoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        elem.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
});

// ===== CERTIFICATE ZOOM FUNCTIONALITY =====

