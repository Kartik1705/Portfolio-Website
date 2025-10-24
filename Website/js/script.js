// ===== PORTFOLIO WEBSITE - KARTIK PANDYA =====

// ===== LOADING SCREEN ANIMATION =====
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    
    if (!loadingScreen || !progressBar) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Remove loading class after animation
            setTimeout(() => {
                document.body.classList.remove('loading');
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 200);
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        
        scrollProgress.style.width = progress + '%';
    });
}

// ===== DARK MODE TOGGLE =====
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme change
        document.body.style.transition = 'background-color 0.6s ease, color 0.6s ease';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add rotation animation to toggle button
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 400);
    });
}

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// ===== RIPPLE EFFECT MICRO-INTERACTIONS =====
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.btn, .cta-button, .project-card, .research-card, .cert-item, button, .nav-link');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ===== SCROLL-TRIGGERED ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .exp-item, .edu-card, .skill-category, .cert-item, .project-card, .research-card');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            animationObserver.observe(el);
        });
    }
}

// ===== IMPACT METRICS ANIMATED COUNTERS =====
function initImpactMetrics() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    if ('IntersectionObserver' in window) {
        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const valueElement = entry.target.querySelector('.metric-value');
                    const target = parseInt(valueElement.dataset.target);
                    const isPercent = valueElement.querySelector('.metric-percent');
                    const isDollar = valueElement.textContent.includes('$');
                    
                    animateCounter(valueElement, 0, target, 2000, isDollar, isPercent);
                    metricsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        metricCards.forEach(card => metricsObserver.observe(card));
    }
}

function animateCounter(element, start, end, duration, isDollar = false, isPercent = false) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (range * easeOutQuart));
        
        // Format number
        let displayValue = current.toLocaleString();
        if (isDollar) {
            displayValue = '$' + displayValue;
        }
        if (isPercent) {
            displayValue = current + '<span class="metric-percent">%</span>';
            element.innerHTML = displayValue;
        } else {
            element.textContent = displayValue;
        }
        
        // Add pulse animation
        element.classList.add('counting');
        setTimeout(() => element.classList.remove('counting'), 100);
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== TESTIMONIALS CAROUSEL =====
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const indicators = document.querySelectorAll('.indicator');

function changeTestimonial(direction) {
    if (testimonialCards.length === 0) return;
    
    testimonialCards[currentTestimonial].classList.remove('active');
    indicators[currentTestimonial].classList.remove('active');
    
    currentTestimonial += direction;
    
    if (currentTestimonial >= testimonialCards.length) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = testimonialCards.length - 1;
    }
    
    testimonialCards[currentTestimonial].classList.add('active');
    indicators[currentTestimonial].classList.add('active');
}

function goToTestimonial(index) {
    if (testimonialCards.length === 0) return;
    
    testimonialCards[currentTestimonial].classList.remove('active');
    indicators[currentTestimonial].classList.remove('active');
    
    currentTestimonial = index;
    
    testimonialCards[currentTestimonial].classList.add('active');
    indicators[currentTestimonial].classList.add('active');
}

// Auto-advance testimonials every 6 seconds
setInterval(() => {
    if (testimonialCards.length > 0) {
        changeTestimonial(1);
    }
}, 6000);

// Make functions globally accessible
window.changeTestimonial = changeTestimonial;
window.goToTestimonial = goToTestimonial;

// ===== FLOATING ACTION BUTTONS =====
function downloadResume() {
    // Create a temporary link to download the resume
    const link = document.createElement('a');
    link.href = 'assets/CV/Kartik_Pandya_Resume.pdf'; // Update with actual path
    link.download = 'Kartik_Pandya_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show confirmation
    showNotification('Resume download started!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#00D9B3' : '#314C6F'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 999999;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Make globally accessible
window.downloadResume = downloadResume;

// ===== ANIMATED SKILL PROGRESS BARS =====
function initSkillBars() {
    const skillWrappers = document.querySelectorAll('.skill-progress-wrapper');
    
    if ('IntersectionObserver' in window && skillWrappers.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    skillObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillWrappers.forEach(wrapper => skillObserver.observe(wrapper));
    }
}

// ===== PARALLAX SCROLLING EFFECT =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-section, .profile-img-advanced, .particles-canvas');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            if (element) {
                const speed = element.classList.contains('hero-section') ? 0.5 : 0.3;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    });
}

// ===== ADVANCED HERO ANIMATIONS =====

// DNA Helix & Cell Canvas Animation (Life Sciences Theme)
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Mouse tracking for interactive particles
    const mouse = {
        x: null,
        y: null,
        radius: 150
    };
    
    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
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
        
        // Interactive Network Connections
        if (mouse.x && mouse.y) {
            // Draw mouse glow
            const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
            gradient.addColorStop(0, 'rgba(0, 217, 179, 0.15)');
            gradient.addColorStop(0.5, 'rgba(0, 217, 179, 0.05)');
            gradient.addColorStop(1, 'rgba(0, 217, 179, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Connect molecules to mouse
            molecules.forEach(molecule => {
                const dx = mouse.x - molecule.x;
                const dy = mouse.y - molecule.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    // Pull molecules toward mouse
                    molecule.x += dx * 0.02;
                    molecule.y += dy * 0.02;
                    
                    // Draw connection line
                    const opacity = (1 - distance / mouse.radius) * 0.5;
                    ctx.strokeStyle = `rgba(0, 217, 179, ${opacity})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(molecule.x, molecule.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                    
                    // Draw node at molecule
                    ctx.fillStyle = `rgba(0, 217, 179, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(molecule.x, molecule.y, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            
            // Connect cells to mouse (subtle)
            cells.forEach(cell => {
                const dx = mouse.x - cell.x;
                const dy = mouse.y - cell.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius * 0.7) {
                    const opacity = (1 - distance / (mouse.radius * 0.7)) * 0.3;
                    ctx.strokeStyle = `rgba(99, 132, 162, ${opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(cell.x, cell.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            });
        }
        
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
        description: "Advanced biotech training focusing on regional and commercial product strategies in the biotechnology sector."
    },
    {
        name: "Agilent Technologies",
        logo: "AGILENT TECHNOLOGIES.png",
        website: "https://www.agilent.com",
        period: "Sep 2024 - May 2025",
        role: "Marketing Co-op (Regional/Commercial Product)",
        description: "Leading regional and commercial product marketing strategies for analytical instruments in healthcare and life sciences markets."
    },
    {
        name: "Trainity",
        logo: "TRAINITY.png",
        website: "https://www.trainity.com",
        period: "Jun 2024 - Aug 2024",
        role: "Data Analyst Bootcamp",
        description: "Intensive data analytics training program focused on data-driven decision making and business intelligence."
    },
    {
        name: "Motorola Solutions",
        logo: "MOTOROLA SOLUTIONS.png",
        website: "https://www.motorolasolutions.com",
        period: "Feb 2024 - May 2024",
        role: "Product Strategy Consultant",
        description: "Developed comprehensive product strategies for communication technology solutions and IoT devices."
    },
    {
        name: "LearnLight",
        logo: "LEARNLIGHT.png",
        website: "https://www.learnlight.com",
        period: "Jan 2024 - May 2024",
        role: "User Strategy Consultant",
        description: "Consulted on user experience strategies and customer journey optimization for educational technology platforms."
    },
    {
        name: "International Iberian Nanotechnology Laboratory",
        logo: "INL.png",
        website: "https://www.inl.int",
        period: "Nov 2023 - May 2024",
        role: "Global Strategy Consultant",
        description: "Provided strategic consulting for global expansion and innovation in nanotechnology research and applications."
    },
    {
        name: "Periofill",
        logo: "PERIOFILL.png",
        website: "https://www.periofill.com",
        period: "Aug 2023 - Dec 2023",
        role: "Go-to-Market Strategy",
        description: "Developed and executed go-to-market strategies for innovative dental and periodontal medical devices."
    },
    {
        name: "AstraZeneca",
        logo: "ASTRAZENECA.png",
        website: "https://www.astrazeneca.com",
        period: "Oct 2023 - Dec 2023",
        role: "Competitive Intelligence Strategy Consultant",
        description: "Conducted competitive intelligence analysis for pharmaceutical products and market positioning strategies."
    },
    {
        name: "Johns Hopkins Hospital",
        logo: "JHH.jpeg",
        website: "https://www.hopkinshospital.org",
        period: "Aug 2023 - Oct 2023",
        role: "Healthcare/Hospital Strategy Consultant",
        description: "Developed strategic initiatives for hospital operations and healthcare service delivery optimization."
    },
    {
        name: "Dolphin Lifescience India",
        logo: "Dolphin Lifescince India.png",
        website: "https://www.dolphinlifesciences.com",
        period: "Jul 2021 - Aug 2023",
        role: "Global Product Manager",
        description: "Led global product management for life sciences and biotechnology products with focus on international market expansion."
    },
    {
        name: "Shilchar Technologies",
        logo: "SHILCHAR TECHNOLOGIES PVT. LTD..png",
        website: "https://www.shilchar.com",
        period: "Sep 2020 - Jul 2021",
        role: "Product Design & Development Engineer - GMT",
        description: "Designed and developed innovative healthcare technology products and medical device solutions."
    },
    {
        name: "Rameshwar Boiler & Utility Services",
        logo: "RAMESHWAR.png",
        website: "#",
        period: "Aug 2019 - Jun 2020",
        role: "Product Research - R&D",
        description: "Conducted research and development for industrial equipment and utility systems optimization."
    },
    {
        name: "Indian Oil Corporation",
        logo: "IOCL.jpeg",
        website: "https://www.iocl.com",
        period: "May 2019 - Jun 2019",
        role: "Industrial Training Summer Intern",
        description: "Gained hands-on experience in petroleum engineering and large-scale industrial operations."
    },
    {
        name: "Koch-Glitsch India",
        logo: "KOCH-GLITSCH.png",
        website: "https://www.koch-glitsch.com",
        period: "May 2018 - Jul 2018",
        role: "Industrial Summer Intern",
        description: "Worked on industrial process optimization and engineering solutions for mass transfer equipment."
    },
    {
        name: "NSS",
        logo: "NSS.png",
        website: "https://www.nss.gov.in",
        period: "Aug 2016 - May 2017",
        role: "Volunteering",
        description: "Participated in community service initiatives and social development programs for public welfare."
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
        link: "https://drive.google.com/file/d/12A9D4IasqRKNd8WdoZ2fiB7d-gpU1f73/view?usp=share_link",
        description: "Conducted comprehensive research on remote patient monitoring (RPM) technologies and their integration into oncology clinical trials. Analyzed market trends, regulatory frameworks, and technological innovations driving the adoption of RPM in cancer research.",
        problem: "Traditional oncology trials face challenges with patient retention, data collection frequency, and real-time monitoring. Patients often need to travel for frequent check-ups, leading to dropout rates and incomplete data collection.",
        solution: "Evaluated cutting-edge RPM technologies including wearables, mobile apps, and IoT devices. Proposed implementation framework for integrating RPM into trial protocols, focusing on patient-centric design and regulatory compliance.",
        results: [
            { label: "Improvement in Data Quality", value: "40%" },
            { label: "Patient Retention", value: "35%" },
            { label: "Cost Reduction", value: "$2M+" }
        ],
        learnings: [
            "Regulatory compliance is crucial for RPM adoption in clinical trials",
            "Patient experience design significantly impacts technology adoption",
            "Real-time data enables faster decision-making in oncology research"
        ],
        stats: {
            duration: "6 months",
            teamSize: "5 members",
            stakeholders: "12+",
            impact: "High"
        }
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

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Critical foundation features
    initLoadingScreen();
    initScrollProgress();
    initDarkMode();
    
    // Phase 2: Performance & Visual Enhancements
    initLazyLoading();
    initRippleEffect();
    initScrollAnimations();
    
    // Phase 3: Content & Interactive Features
    initImpactMetrics();
    initParallax();
    initSkillBars();
    
    // Phase 4: Advanced Visualizations & Interactions
    initSkillsChart();
    initKeyboardShortcuts();
    
    // Phase 5: Analytics, Forms & Timeline
    initEasterEggs();
    initAnalytics();
    initContactForm();
    initNewsletter();
    initTimeline();
    
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
    initExperienceTabs();
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

// ===== LOAD EXPERIENCE WITH COMPACT CARDS =====
let currentExpFilter = 'all';

function loadExperience() {
    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer) return;
    
    timelineContainer.innerHTML = '';
    
    // Filter experiences
    let filteredCompanies = companiesData;
    
    if (currentExpFilter === 'current') {
        // Only NPLB
        filteredCompanies = companiesData.filter(c => 
            c.name === "No Patient Left Behind"
        );
    } else if (currentExpFilter === 'product') {
        // Product roles but exclude NPLB and Motorola
        filteredCompanies = companiesData.filter(c => 
            c.role.toLowerCase().includes('product') && 
            c.name !== "No Patient Left Behind" &&
            c.name !== "Motorola Solutions"
        );
    } else if (currentExpFilter === 'consulting') {
        filteredCompanies = companiesData.filter(c => 
            c.role.toLowerCase().includes('consult') || c.role.toLowerCase().includes('strategy')
        );
    } else if (currentExpFilter === 'engineering') {
        filteredCompanies = companiesData.filter(c => 
            c.role.toLowerCase().includes('engineer') || c.role.toLowerCase().includes('r&d')
        );
    }
    
    filteredCompanies.forEach((company, index) => {
        // Determine category for styling
        let category = 'experience';
        if (company.role.toLowerCase().includes('product')) category = 'product';
        else if (company.role.toLowerCase().includes('consult') || company.role.toLowerCase().includes('strategy')) category = 'consulting';
        else if (company.role.toLowerCase().includes('engineer') || company.role.toLowerCase().includes('r&d')) category = 'engineering';
        else if (company.role.toLowerCase().includes('fellowship') || company.role.toLowerCase().includes('bootcamp')) category = 'training';
        
        // Create timeline item
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-category', category);
        timelineItem.style.animationDelay = `${index * 0.1}s`;
        
        // Extract key achievements from description
        const achievements = [
            company.description
        ];
        
        // Determine key skills based on role
        const skills = [];
        if (company.role.toLowerCase().includes('product')) {
            skills.push('Product Strategy', 'Market Analysis', 'Product Development');
        }
        if (company.role.toLowerCase().includes('marketing')) {
            skills.push('Marketing Strategy', 'Brand Management', 'Go-to-Market');
        }
        if (company.role.toLowerCase().includes('consult') || company.role.toLowerCase().includes('strategy')) {
            skills.push('Strategic Planning', 'Business Analysis', 'Stakeholder Management');
        }
        if (company.role.toLowerCase().includes('engineer')) {
            skills.push('Product Design', 'R&D', 'Technical Development');
        }
        if (company.role.toLowerCase().includes('global')) {
            skills.push('International Markets', 'Global Strategy');
        }
        
        // Build timeline card HTML
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-card" data-category="${category}">
                    <div class="timeline-arrow"></div>
                    <div class="timeline-card-header">
                        <img src="assets/images/companies/${company.logo}" 
                             alt="${company.name}" 
                             class="timeline-company-logo"
                             onerror="this.style.display='none'">
                        <div class="timeline-role-info">
                            <h3 class="timeline-role">${company.role}</h3>
                            <p class="timeline-company">${company.name}</p>
                        </div>
                    </div>
                    <div class="timeline-date">
                        <i class="far fa-calendar-alt"></i>
                        ${company.period}
                    </div>
                    ${achievements.length > 0 ? `
                        <div class="timeline-achievements">
                            <h4>Key Contributions</h4>
                            <ul>
                                ${achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${skills.length > 0 ? `
                        <div class="timeline-skills">
                            ${skills.map(skill => `<span class="timeline-skill-tag">${skill}</span>`).join('')}
                        </div>
                    ` : ''}
                    ${company.website && company.website !== '#' ? `
                        <a href="${company.website}" target="_blank" class="timeline-link">
                            <i class="fas fa-external-link-alt"></i>
                            Visit Company
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
    
    // Show empty state if no experiences
    if (filteredCompanies.length === 0) {
        timelineContainer.innerHTML = `
            <div class="timeline-empty">
                <i class="fas fa-briefcase"></i>
                <p>No experiences found in this category.</p>
            </div>
        `;
    }
}

// Experience Category Filter Pills
function initExperienceTabs() {
    const pills = document.querySelectorAll('.exp-category-pill');
    
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Update active state
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            // Update filter and reload
            currentExpFilter = pill.getAttribute('data-filter');
            loadExperience();
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
                    <button class="project-quick-view" onclick="openProjectModal(${index})">
                        <i class="fas fa-expand"></i>
                        View Details
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
                <button onclick="openProjectModal(${index})" class="project-link" style="cursor: pointer; background: none; border: none; color: inherit; text-align: left; width: 100%; padding: 0; font: inherit;">
                    View Case Study <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        // Add click handler to entire card
        projectCard.style.cursor = 'pointer';
        projectCard.addEventListener('click', (e) => {
            // Don't trigger if clicking on buttons
            if (e.target.closest('button')) return;
            openProjectModal(index);
        });
        
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

// ===== PROJECT MODAL FUNCTIONS =====
function openProjectModal(projectIndex) {
    const project = projectsData[projectIndex];
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    // Populate hero section
    document.getElementById('modalHeroImage').src = `assets/images/projects/${project.image}`;
    document.getElementById('modalHeroImage').alt = project.title;
    document.getElementById('modalCompany').textContent = project.company;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalType').textContent = project.type;
    
    // Generate stars
    const stars = Array(5).fill(0).map((_, i) => {
        return i < (project.impact || 4) 
            ? '<i class="fas fa-star"></i>' 
            : '<i class="far fa-star"></i>';
    }).join('');
    document.getElementById('modalRating').innerHTML = stars;
    
    // Populate content
    document.getElementById('modalDescription').textContent = project.description || project.excerpt;
    document.getElementById('modalProblem').textContent = project.problem || "Detailed problem statement coming soon.";
    document.getElementById('modalSolution').textContent = project.solution || "Detailed solution overview coming soon.";
    
    // Populate results
    const resultsContainer = document.getElementById('modalResults');
    if (project.results && project.results.length > 0) {
        resultsContainer.innerHTML = `
            <div class="project-modal-stats">
                ${project.results.map(result => `
                    <div class="project-modal-stat">
                        <span class="project-modal-stat-label">${result.label}</span>
                        <span class="project-modal-stat-value">${result.value}</span>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        resultsContainer.innerHTML = '<p>Results and metrics available in the full case study.</p>';
    }
    
    // Populate learnings
    const learningsSection = document.getElementById('modalLearningsSection');
    const learningsList = document.getElementById('modalLearnings');
    if (project.learnings && project.learnings.length > 0) {
        learningsSection.style.display = 'block';
        learningsList.innerHTML = project.learnings.map(learning => 
            `<li>${learning}</li>`
        ).join('');
    } else {
        learningsSection.style.display = 'none';
    }
    
    // Populate technologies
    const techContainer = document.getElementById('modalTechnologies');
    if (project.technologies && project.technologies.length > 0) {
        techContainer.innerHTML = project.technologies.map(tech => 
            `<span class="project-modal-tech-badge">${tech}</span>`
        ).join('');
    }
    
    // Populate stats
    const statsContainer = document.getElementById('modalStats');
    if (project.stats) {
        statsContainer.innerHTML = `
            ${project.stats.duration ? `
                <div class="project-modal-stat">
                    <span class="project-modal-stat-label">Duration</span>
                    <span class="project-modal-stat-value">${project.stats.duration}</span>
                </div>
            ` : ''}
            ${project.stats.teamSize ? `
                <div class="project-modal-stat">
                    <span class="project-modal-stat-label">Team Size</span>
                    <span class="project-modal-stat-value">${project.stats.teamSize}</span>
                </div>
            ` : ''}
            ${project.stats.stakeholders ? `
                <div class="project-modal-stat">
                    <span class="project-modal-stat-label">Stakeholders</span>
                    <span class="project-modal-stat-value">${project.stats.stakeholders}</span>
                </div>
            ` : ''}
            ${project.stats.impact ? `
                <div class="project-modal-stat">
                    <span class="project-modal-stat-label">Impact Level</span>
                    <span class="project-modal-stat-value">${project.stats.impact}</span>
                </div>
            ` : ''}
        `;
    }
    
    // Set link
    document.getElementById('modalLink').href = project.link;
    
    // Show modal with animation
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = '';
}

function shareProject() {
    const title = document.getElementById('modalTitle').textContent;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this project: ${title}`,
            url: url
        }).then(() => {
            showNotification('Project shared successfully!', 'success');
        }).catch(() => {
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Link copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy link', 'info');
    });
}

// Make functions globally available
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.shareProject = shareProject;

// ===== KEYBOARD SHORTCUTS SYSTEM =====
const keyboardShortcuts = {
    // Navigation shortcuts
    'h': { action: () => scrollToSection('home'), description: 'Go to Home' },
    'a': { action: () => scrollToSection('about'), description: 'Go to About' },
    'e': { action: () => scrollToSection('experience'), description: 'Go to Experience' },
    's': { action: () => scrollToSection('education'), description: 'Go to Skills' },
    'p': { action: () => scrollToSection('projects'), description: 'Go to Projects' },
    'r': { action: () => scrollToSection('research'), description: 'Go to Research' },
    
    // Feature shortcuts
    'd': { action: () => toggleDarkMode(), description: 'Toggle Dark Mode' },
    't': { action: () => scrollToTop(), description: 'Scroll to Top' },
    'b': { action: () => scrollToBottom(), description: 'Scroll to Bottom' },
    
    // Action shortcuts
    'c': { action: () => openContactDialog(), description: 'Contact Me' },
    '/': { action: () => showShortcutsHelp(), description: 'Show Shortcuts' },
    '?': { action: () => showShortcutsHelp(), description: 'Show Help' },
    
    // Special combinations (Ctrl/Cmd + key)
    'ctrl+k': { action: () => focusSearch(), description: 'Quick Search' },
    'ctrl+d': { action: () => downloadResume(), description: 'Download Resume' }
};

let isShortcutsHelpVisible = false;

function initKeyboardShortcuts() {
    let pressedKeys = new Set();
    
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in inputs
        if (e.target.matches('input, textarea, select')) return;
        
        const key = e.key.toLowerCase();
        pressedKeys.add(key);
        
        // Check for Ctrl/Cmd combinations
        if (e.ctrlKey || e.metaKey) {
            const combo = `ctrl+${key}`;
            if (keyboardShortcuts[combo]) {
                e.preventDefault();
                keyboardShortcuts[combo].action();
                showShortcutNotification(combo);
                return;
            }
        }
        
        // Check for single key shortcuts
        if (keyboardShortcuts[key]) {
            e.preventDefault();
            keyboardShortcuts[key].action();
            showShortcutNotification(key);
        }
        
        // Close modals on Escape
        if (key === 'escape') {
            closeProjectModal();
            if (isShortcutsHelpVisible) {
                hideShortcutsHelp();
            }
        }
    });
    
    document.addEventListener('keyup', (e) => {
        pressedKeys.delete(e.key.toLowerCase());
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function openContactDialog() {
    // Try to open email FAB action
    const emailFab = document.getElementById('emailFab');
    if (emailFab) {
        emailFab.click();
    } else {
        window.location.href = 'mailto:kartikpandya@example.com';
    }
}

function focusSearch() {
    // If there's a search input, focus it
    const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]');
    if (searchInput) {
        searchInput.focus();
    } else {
        showNotification('Search not available', 'info');
    }
}

function showShortcutsHelp() {
    if (isShortcutsHelpVisible) {
        hideShortcutsHelp();
        return;
    }
    
    // Create shortcuts help modal
    const helpModal = document.createElement('div');
    helpModal.id = 'shortcuts-help-modal';
    helpModal.className = 'shortcuts-help-modal active';
    
    const shortcuts = Object.entries(keyboardShortcuts).map(([key, data]) => {
        const displayKey = key.replace('ctrl+', '⌘/Ctrl + ').toUpperCase();
        return `
            <div class="shortcut-item">
                <kbd class="shortcut-key">${displayKey}</kbd>
                <span class="shortcut-desc">${data.description}</span>
            </div>
        `;
    }).join('');
    
    helpModal.innerHTML = `
        <div class="shortcuts-help-overlay" onclick="hideShortcutsHelp()"></div>
        <div class="shortcuts-help-content">
            <div class="shortcuts-help-header">
                <h3>⌨️ Keyboard Shortcuts</h3>
                <button onclick="hideShortcutsHelp()" class="shortcuts-help-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="shortcuts-help-body">
                <div class="shortcuts-section">
                    <h4>Navigation</h4>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">H</kbd>
                        <span class="shortcut-desc">Go to Home</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">A</kbd>
                        <span class="shortcut-desc">Go to About</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">E</kbd>
                        <span class="shortcut-desc">Go to Experience</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">S</kbd>
                        <span class="shortcut-desc">Go to Skills</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">P</kbd>
                        <span class="shortcut-desc">Go to Projects</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">R</kbd>
                        <span class="shortcut-desc">Go to Research</span>
                    </div>
                </div>
                
                <div class="shortcuts-section">
                    <h4>Actions</h4>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">D</kbd>
                        <span class="shortcut-desc">Toggle Dark Mode</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">T</kbd>
                        <span class="shortcut-desc">Scroll to Top</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">B</kbd>
                        <span class="shortcut-desc">Scroll to Bottom</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">C</kbd>
                        <span class="shortcut-desc">Contact Me</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">⌘/Ctrl + D</kbd>
                        <span class="shortcut-desc">Download Resume</span>
                    </div>
                </div>
                
                <div class="shortcuts-section">
                    <h4>Help</h4>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">?</kbd>
                        <span class="shortcut-desc">Show/Hide This Help</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd class="shortcut-key">ESC</kbd>
                        <span class="shortcut-desc">Close Modals</span>
                    </div>
                </div>
            </div>
            <div class="shortcuts-help-footer">
                <p>💡 Press <kbd>?</kbd> anytime to toggle this help</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(helpModal);
    isShortcutsHelpVisible = true;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function hideShortcutsHelp() {
    const helpModal = document.getElementById('shortcuts-help-modal');
    if (helpModal) {
        helpModal.classList.remove('active');
        setTimeout(() => {
            helpModal.remove();
        }, 300);
    }
    isShortcutsHelpVisible = false;
    document.body.style.overflow = '';
}

function showShortcutNotification(key) {
    const displayKey = key.replace('ctrl+', '⌘/Ctrl + ').toUpperCase();
    const action = keyboardShortcuts[key]?.description || 'Action';
    
    // Create subtle notification
    const notification = document.createElement('div');
    notification.className = 'shortcut-notification';
    notification.innerHTML = `
        <kbd>${displayKey}</kbd>
        <span>${action}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 1500);
}

// Make functions globally available
window.hideShortcutsHelp = hideShortcutsHelp;

// ===== SOCIAL MEDIA SHARING SYSTEM =====
function toggleShareMenu() {
    const shareMenu = document.getElementById('shareMenu');
    if (shareMenu) {
        shareMenu.classList.toggle('active');
    }
}

function shareOn(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const description = encodeURIComponent("Check out Kartik Pandya's portfolio - Product Manager & Biotech Innovation Leader");
    
    let shareUrl = '';
    
    switch(platform) {
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
            showNotification('Opening LinkedIn share...', 'success');
            break;
            
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
            showNotification('Opening Twitter share...', 'success');
            break;
            
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
            showNotification('Opening Facebook share...', 'success');
            break;
            
        case 'email':
            const subject = encodeURIComponent('Check out this portfolio');
            const body = encodeURIComponent(`I thought you might be interested in ${title}\n\n${window.location.href}`);
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
            showNotification('Opening email client...', 'success');
            break;
            
        case 'copy':
            navigator.clipboard.writeText(window.location.href).then(() => {
                showNotification('Link copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Failed to copy link', 'info');
            });
            break;
            
        default:
            showNotification('Share option not available', 'info');
    }
    
    // Close menu after sharing
    setTimeout(() => {
        toggleShareMenu();
    }, 500);
}

// Close share menu when clicking outside
document.addEventListener('click', (e) => {
    const shareMenu = document.getElementById('shareMenu');
    const shareFab = document.getElementById('shareFab');
    
    if (shareMenu && shareFab && shareMenu.classList.contains('active')) {
        if (!shareMenu.contains(e.target) && !shareFab.contains(e.target)) {
            shareMenu.classList.remove('active');
        }
    }
});

// Make functions globally available
window.toggleShareMenu = toggleShareMenu;
window.shareOn = shareOn;

// ===== EASTER EGGS & HIDDEN FEATURES =====

// DNA Sequence Game
let dnaSequence = '';
const correctSequence = 'ATCG'; // Type "ATCG" to unlock
let sequenceTimeout = null;

function handleDNASequence(key) {
    dnaSequence += key.toUpperCase();
    
    clearTimeout(sequenceTimeout);
    sequenceTimeout = setTimeout(() => {
        dnaSequence = '';
    }, 2000);
    
    if (dnaSequence === correctSequence) {
        unlockDNASecret();
        dnaSequence = '';
    } else if (dnaSequence.length > correctSequence.length) {
        dnaSequence = '';
    }
}

function unlockDNASecret() {
    // Add special DNA animation
    const body = document.body;
    body.style.animation = 'dna-pulse 2s ease-in-out';
    
    // Create secret message
    const secretDiv = document.createElement('div');
    secretDiv.className = 'dna-secret-message';
    secretDiv.innerHTML = `
        <div class="dna-secret-content">
            <i class="fas fa-dna" style="font-size: 3rem; color: var(--accent-green); margin-bottom: 1rem;"></i>
            <h3>🧬 DNA Sequence Unlocked!</h3>
            <p>You found the hidden code! Here's a secret:</p>
            <p style="font-style: italic; color: var(--accent-green);">"Innovation is in my DNA - literally and figuratively!"</p>
            <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 1rem; padding: 0.5rem 1.5rem; background: var(--accent-green); color: white; border: none; border-radius: 8px; cursor: pointer;">
                Got it! 🧬
            </button>
        </div>
    `;
    document.body.appendChild(secretDiv);
    
    setTimeout(() => body.style.animation = '', 2000);
    showNotification('🧬 Secret unlocked! You found the DNA code!', 'success');
}

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

function handleKonamiCode(key) {
    konamiCode.push(key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join(',').includes(konamiSequence.join(','))) {
        activateKonamiMode();
        konamiCode = [];
    }
}

function activateKonamiMode() {
    // Add rainbow particles effect
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
            });
        }
        
        function animateRainbow() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fill();
                
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });
        }
        
        const rainbowInterval = setInterval(animateRainbow, 50);
        setTimeout(() => {
            clearInterval(rainbowInterval);
            initParticles(); // Reset to normal
        }, 5000);
    }
    
    showNotification('🎮 Konami Code Activated! Rainbow mode engaged!', 'success');
}

// Secret Dev Console Message
function initDevConsoleMessage() {
    const styles = [
        'color: #00D9B3',
        'font-size: 20px',
        'font-weight: bold',
        'text-shadow: 2px 2px 4px rgba(0,217,179,0.3)'
    ].join(';');
    
    console.log('%c🧬 Hello, fellow developer!', styles);
    console.log('%cWelcome to my portfolio source code!', 'color: #6384A2; font-size: 14px;');
    console.log('%cInterested in the tech stack?', 'color: #314C6F; font-size: 12px;');
    console.log('%c- Vanilla JavaScript (no frameworks!)', 'color: #00D9B3; font-size: 11px;');
    console.log('%c- Chart.js for visualizations', 'color: #00D9B3; font-size: 11px;');
    console.log('%c- CSS Grid & Flexbox for layouts', 'color: #00D9B3; font-size: 11px;');
    console.log('%c- Progressive Web App features', 'color: #00D9B3; font-size: 11px;');
    console.log('%c\nEaster eggs hidden in the code:', 'color: #314C6F; font-size: 12px; margin-top: 10px;');
    console.log('%c1. Type "ATCG" anywhere on the page 🧬', 'color: #6384A2; font-size: 11px;');
    console.log('%c2. Try the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) 🎮', 'color: #6384A2; font-size: 11px;');
    console.log('%c3. Triple-click on my name in the hero section 👤', 'color: #6384A2; font-size: 11px;');
    console.log('%c\nLet\'s connect! kartikpandya@example.com', 'color: #00D9B3; font-size: 12px; margin-top: 10px;');
}

// Triple Click on Name Easter Egg
function initNameEasterEgg() {
    const heroTitle = document.querySelector('.hero-title');
    let clickCount = 0;
    let clickTimer = null;
    
    if (heroTitle) {
        heroTitle.addEventListener('click', () => {
            clickCount++;
            
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
            
            if (clickCount === 3) {
                activateNameSecret();
                clickCount = 0;
            }
        });
    }
}

function activateNameSecret() {
    const secretAchievement = document.createElement('div');
    secretAchievement.className = 'achievement-popup';
    secretAchievement.innerHTML = `
        <div class="achievement-content">
            <i class="fas fa-trophy" style="font-size: 2.5rem; color: gold; margin-bottom: 0.5rem;"></i>
            <h3>🏆 Achievement Unlocked!</h3>
            <p><strong>"The Persistent One"</strong></p>
            <p style="font-size: 0.9rem; opacity: 0.8;">You triple-clicked my name! Curiosity +100</p>
        </div>
    `;
    document.body.appendChild(secretAchievement);
    
    setTimeout(() => {
        secretAchievement.style.animation = 'slideOut 0.5s ease-in forwards';
        setTimeout(() => secretAchievement.remove(), 500);
    }, 4000);
    
    showNotification('🏆 Achievement Unlocked: The Persistent One!', 'success');
}

// Special Date Animations
function checkSpecialDates() {
    const now = new Date();
    const month = now.getMonth();
    const date = now.getDate();
    
    // April 25 - DNA Day
    if (month === 3 && date === 25) {
        activateDNADayMode();
    }
    
    // October 31 - Halloween
    if (month === 9 && date === 31) {
        activateHalloweenMode();
    }
    
    // December 25 - Christmas
    if (month === 11 && date === 25) {
        activateChristmasMode();
    }
}

function activateDNADayMode() {
    showNotification('🧬 Happy DNA Day! April 25th - Celebrating the discovery of DNA structure!', 'success');
    
    const banner = document.createElement('div');
    banner.className = 'special-date-banner';
    banner.innerHTML = `
        <div style="text-align: center; padding: 1rem; background: linear-gradient(135deg, var(--primary-navy), var(--primary-blue)); color: white;">
            <i class="fas fa-dna"></i> Happy DNA Day! 🧬
        </div>
    `;
    document.body.prepend(banner);
}

function activateHalloweenMode() {
    showNotification('🎃 Happy Halloween! Spooky mode activated!', 'success');
    document.body.style.filter = 'hue-rotate(30deg)';
}

function activateChristmasMode() {
    showNotification('🎄 Merry Christmas! Ho ho ho!', 'success');
    
    // Add snowflakes
    for (let i = 0; i < 20; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄️';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        document.body.appendChild(snowflake);
    }
}

// Initialize all easter eggs
function initEasterEggs() {
    initDevConsoleMessage();
    initNameEasterEgg();
    checkSpecialDates();
    
    // Listen for DNA sequence and Konami code
    document.addEventListener('keydown', (e) => {
        // Skip if in input field
        if (e.target.matches('input, textarea')) return;
        
        // Check for DNA sequence letters
        if (['a', 't', 'c', 'g'].includes(e.key.toLowerCase())) {
            handleDNASequence(e.key);
        }
        
        // Check for Konami code
        handleKonamiCode(e.key);
    });
}

// ===== ANALYTICS & PERFORMANCE MONITORING =====

// Track custom events
function trackEvent(category, action, label = '', value = 0) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': value
        });
    }
    
    // Also log to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`Analytics Event: ${category} | ${action} | ${label} | ${value}`);
    }
}

// Scroll depth tracking
function initScrollDepthTracking() {
    const depths = [25, 50, 75, 100];
    const tracked = new Set();
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        
        depths.forEach(depth => {
            if (scrollPercentage >= depth && !tracked.has(depth)) {
                tracked.add(depth);
                trackEvent('Engagement', 'scroll_depth', `${depth}%`, depth);
            }
        });
    });
}

// Section view tracking
function initSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                trackEvent('Navigation', 'section_view', sectionId);
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// CTA tracking
function initCTATracking() {
    // Track all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary, .fab-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = button.textContent.trim() || button.getAttribute('data-tooltip') || 'Unknown CTA';
            trackEvent('CTA', 'click', buttonText);
        });
    });
    
    // Track resume downloads
    const resumeButton = document.getElementById('resumeFab');
    if (resumeButton) {
        resumeButton.addEventListener('click', () => {
            trackEvent('Conversion', 'resume_download', 'PDF Resume');
        });
    }
    
    // Track calendar bookings
    const calendarButton = document.getElementById('calendarFab');
    if (calendarButton) {
        calendarButton.addEventListener('click', () => {
            trackEvent('Conversion', 'calendar_click', 'Schedule Meeting');
        });
    }
    
    // Track email clicks
    const emailButtons = document.querySelectorAll('a[href^="mailto:"]');
    emailButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('Conversion', 'email_click', 'Contact Email');
        });
    });
}

// Project interactions tracking
function initProjectTracking() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectTitle = card.querySelector('.project-title')?.textContent || 'Unknown Project';
            trackEvent('Content', 'project_view', projectTitle);
        });
    });
}

// Social share tracking (enhance existing shareOn function)
const originalShareOn = window.shareOn;
if (originalShareOn) {
    window.shareOn = function(platform) {
        trackEvent('Social', 'share', platform);
        return originalShareOn(platform);
    };
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Track page load time
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;
            
            trackEvent('Performance', 'page_load', 'total_time', Math.round(pageLoadTime));
            trackEvent('Performance', 'server_response', 'connect_time', Math.round(connectTime));
            trackEvent('Performance', 'dom_render', 'render_time', Math.round(renderTime));
            
            // Track Core Web Vitals if available
            if ('web-vitals' in window) {
                // This would require the web-vitals library
                // For now, we'll use basic performance API
            }
            
            // Log performance metrics
            console.log('Performance Metrics:', {
                pageLoad: pageLoadTime + 'ms',
                serverResponse: connectTime + 'ms',
                domRender: renderTime + 'ms'
            });
        }, 0);
    });
}

// Error tracking
function initErrorTracking() {
    window.addEventListener('error', (e) => {
        trackEvent('Error', 'javascript_error', `${e.message} at ${e.filename}:${e.lineno}`, 0);
        console.error('Tracked error:', e.message);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        trackEvent('Error', 'promise_rejection', e.reason, 0);
        console.error('Tracked promise rejection:', e.reason);
    });
}

// Time on page tracking
function initTimeTracking() {
    let startTime = Date.now();
    let isActive = true;
    
    // Track when user becomes inactive
    let inactivityTimer;
    function resetInactivity() {
        isActive = true;
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            isActive = false;
        }, 30000); // 30 seconds of inactivity
    }
    
    document.addEventListener('mousemove', resetInactivity);
    document.addEventListener('keydown', resetInactivity);
    document.addEventListener('scroll', resetInactivity);
    document.addEventListener('click', resetInactivity);
    
    resetInactivity();
    
    // Track time on page before leaving
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('Engagement', 'time_on_page', isActive ? 'active' : 'inactive', timeSpent);
    });
}

// Dark mode preference tracking
function trackDarkModeUsage() {
    const darkModeToggle = document.querySelector('.theme-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            trackEvent('Preference', 'dark_mode', isDark ? 'enabled' : 'disabled');
        });
    }
}

// Device and browser info
function trackDeviceInfo() {
    const deviceInfo = {
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform
    };
    
    trackEvent('Device', 'info', JSON.stringify(deviceInfo));
}

// Initialize all analytics
function initAnalytics() {
    initScrollDepthTracking();
    initSectionTracking();
    initCTATracking();
    initProjectTracking();
    initPerformanceMonitoring();
    initErrorTracking();
    initTimeTracking();
    trackDarkModeUsage();
    trackDeviceInfo();
    
    // Track initial page view
    trackEvent('Page', 'view', document.title);
    
    console.log('📊 Analytics initialized with comprehensive tracking');
}

// ===== CONTACT FORM & NEWSLETTER =====

// Contact Form Validation & Submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateContactForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked
        };
        
        // Show loading state
        const submitBtn = document.getElementById('contactSubmit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Send email using EmailJS (replace with your service)
            await sendContactEmail(formData);
            
            // Show success message
            showFormStatus('success', '✅ Message sent successfully! I\'ll get back to you soon.');
            
            // Reset form
            form.reset();
            
            // Track conversion
            trackEvent('Conversion', 'contact_form_submit', 'Success');
            
            // Add to newsletter if checked
            if (formData.newsletter) {
                subscribeToNewsletter(formData.email);
            }
            
        } catch (error) {
            // Show error message
            showFormStatus('error', '❌ Failed to send message. Please try again or email directly.');
            trackEvent('Error', 'contact_form_error', error.message);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

function validateContactForm() {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('active');
    });
    
    // Validate name
    const name = document.getElementById('name').value.trim();
    if (name.length < 2) {
        showFieldError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    const subject = document.getElementById('subject').value;
    if (!subject) {
        showFieldError('subjectError', 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message').value.trim();
    if (message.length < 10) {
        showFieldError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
}

function showFormStatus(type, message) {
    const statusElement = document.getElementById('formStatus');
    if (statusElement) {
        statusElement.className = `form-status ${type}`;
        statusElement.textContent = message;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusElement.className = 'form-status';
            statusElement.textContent = '';
        }, 5000);
    }
}

async function sendContactEmail(formData) {
    // Simulate email sending (replace with actual EmailJS or backend API)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Replace this with actual email service integration
            // Example: emailjs.send('service_id', 'template_id', formData)
            const success = Math.random() > 0.1; // 90% success rate for demo
            if (success) {
                resolve();
            } else {
                reject(new Error('Email service unavailable'));
            }
        }, 1500);
    });
}

// Newsletter Modal
function initNewsletter() {
    // Show newsletter modal after 30 seconds (first visit only)
    const hasSeenNewsletter = localStorage.getItem('hasSeenNewsletter');
    if (!hasSeenNewsletter) {
        setTimeout(() => {
            showNewsletterModal();
            localStorage.setItem('hasSeenNewsletter', 'true');
        }, 30000);
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                showNewsletterStatus('error', 'Please enter a valid email address');
                return;
            }
            
            try {
                await subscribeToNewsletter(email);
                showNewsletterStatus('success', '🎉 Subscribed! Check your email for confirmation.');
                trackEvent('Conversion', 'newsletter_signup', 'Modal');
                
                setTimeout(() => {
                    closeNewsletterModal();
                }, 2000);
                
            } catch (error) {
                showNewsletterStatus('error', 'Failed to subscribe. Please try again.');
                trackEvent('Error', 'newsletter_error', error.message);
            }
        });
    }
}

function showNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    if (modal) {
        modal.classList.add('active');
        trackEvent('Engagement', 'newsletter_modal_view', 'Auto');
    }
}

function closeNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function showNewsletterStatus(type, message) {
    const statusElement = document.getElementById('newsletterStatus');
    if (statusElement) {
        statusElement.className = `newsletter-status ${type}`;
        statusElement.textContent = message;
        
        setTimeout(() => {
            statusElement.className = 'newsletter-status';
            statusElement.textContent = '';
        }, 5000);
    }
}

async function subscribeToNewsletter(email) {
    // Simulate newsletter subscription (replace with Mailchimp API)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Replace with actual Mailchimp integration
            // Example: mailchimp.lists.addListMember(listId, { email_address: email })
            const success = Math.random() > 0.1;
            if (success) {
                resolve();
            } else {
                reject(new Error('Subscription service unavailable'));
            }
        }, 1000);
    });
}

// Make functions globally available
window.closeNewsletterModal = closeNewsletterModal;

// ===== INTERACTIVE CAREER TIMELINE =====
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Animate timeline stats on scroll
    const timelineStats = document.querySelector('.timeline-stats');
    if (timelineStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTimelineStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(timelineStats);
    }
}

function animateTimelineStats() {
    const statNumbers = document.querySelectorAll('.timeline-stat-number');
    statNumbers.forEach((stat, index) => {
        const target = stat.textContent.replace('+', '');
        const isPlus = stat.textContent.includes('+');
        const duration = 1500;
        const start = 0;
        const increment = parseInt(target) / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= parseInt(target)) {
                stat.textContent = target + (isPlus ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (isPlus ? '+' : '');
            }
        }, 16);
        
        // Add entrance animation
        stat.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });
}

// ===== SKILLS VISUALIZATION CHART =====
let skillsChart = null;
let currentChartType = 'radar';

const skillsChartData = {
    labels: [
        'Product Strategy',
        'Market Research',
        'Data Analysis',
        'Stakeholder Management',
        'Technical Skills',
        'Go-to-Market',
        'User Research',
        'Business Analytics',
        'Leadership',
        'Innovation'
    ],
    datasets: [{
        label: 'Proficiency Level',
        data: [95, 90, 85, 92, 80, 88, 87, 90, 85, 93],
        backgroundColor: 'rgba(49, 76, 111, 0.2)',
        borderColor: 'rgba(49, 76, 111, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(0, 217, 179, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 217, 179, 1)',
        pointRadius: 5,
        pointHoverRadius: 7
    }]
};

function initSkillsChart() {
    const canvas = document.getElementById('skillsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Create chart with initial type
    skillsChart = new Chart(ctx, {
        type: currentChartType,
        data: skillsChartData,
        options: getChartOptions(currentChartType)
    });
    
    // Add chart toggle event listeners
    const toggleBtns = document.querySelectorAll('.chart-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const chartType = this.getAttribute('data-chart');
            switchChartType(chartType);
            
            // Update active state
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Generate custom legend
    generateCustomLegend();
    
    // Animate chart on scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const chartContainer = document.querySelector('.skills-chart-container');
    if (chartContainer) {
        observer.observe(chartContainer);
    }
}

function getChartOptions(type) {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false // Using custom legend
            },
            tooltip: {
                backgroundColor: 'rgba(31, 60, 92, 0.95)',
                titleColor: '#F9F4E8',
                bodyColor: '#F9F4E8',
                borderColor: 'rgba(0, 217, 179, 0.5)',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.parsed.y + '%';
                    }
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    };
    
    if (type === 'radar') {
        return {
            ...commonOptions,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: '#6384A2',
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: 'rgba(99, 132, 162, 0.2)'
                    },
                    pointLabels: {
                        color: '#314C6F',
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                }
            }
        };
    } else if (type === 'bar') {
        return {
            ...commonOptions,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#6384A2'
                    },
                    grid: {
                        color: 'rgba(99, 132, 162, 0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: '#314C6F',
                        font: {
                            size: 11,
                            weight: '600'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        };
    } else if (type === 'polar') {
        return {
            ...commonOptions,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: '#6384A2',
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: 'rgba(99, 132, 162, 0.2)'
                    }
                }
            }
        };
    }
    
    return commonOptions;
}

function switchChartType(type) {
    if (!skillsChart) return;
    
    currentChartType = type;
    
    // Update chart type and options
    skillsChart.destroy();
    
    const canvas = document.getElementById('skillsChart');
    const ctx = canvas.getContext('2d');
    
    // Adjust dataset styling based on chart type
    let updatedData = JSON.parse(JSON.stringify(skillsChartData));
    
    if (type === 'bar') {
        updatedData.datasets[0].backgroundColor = 'rgba(49, 76, 111, 0.8)';
        updatedData.datasets[0].borderColor = 'rgba(49, 76, 111, 1)';
    } else if (type === 'polar') {
        // Create gradient colors for polar chart
        updatedData.datasets[0].backgroundColor = [
            'rgba(49, 76, 111, 0.7)',
            'rgba(99, 132, 162, 0.7)',
            'rgba(0, 217, 179, 0.7)',
            'rgba(49, 76, 111, 0.6)',
            'rgba(99, 132, 162, 0.6)',
            'rgba(0, 217, 179, 0.6)',
            'rgba(49, 76, 111, 0.5)',
            'rgba(99, 132, 162, 0.5)',
            'rgba(0, 217, 179, 0.5)',
            'rgba(49, 76, 111, 0.4)'
        ];
        updatedData.datasets[0].borderColor = '#fff';
        updatedData.datasets[0].borderWidth = 2;
    } else {
        updatedData.datasets[0].backgroundColor = 'rgba(49, 76, 111, 0.2)';
        updatedData.datasets[0].borderColor = 'rgba(49, 76, 111, 1)';
    }
    
    skillsChart = new Chart(ctx, {
        type: type,
        data: updatedData,
        options: getChartOptions(type)
    });
}

function generateCustomLegend() {
    const legendContainer = document.getElementById('chartLegend');
    if (!legendContainer) return;
    
    legendContainer.innerHTML = '';
    
    skillsChartData.labels.forEach((label, index) => {
        const value = skillsChartData.datasets[0].data[index];
        
        const legendItem = document.createElement('div');
        legendItem.className = 'chart-legend-item';
        
        // Determine color based on value
        let color;
        if (value >= 90) {
            color = '#00D9B3'; // Green for expert
        } else if (value >= 80) {
            color = '#314C6F'; // Navy for advanced
        } else {
            color = '#6384A2'; // Blue for proficient
        }
        
        legendItem.innerHTML = `
            <div class="chart-legend-color" style="background: ${color};"></div>
            <span class="chart-legend-label">${label}</span>
            <span class="chart-legend-value">${value}%</span>
        `;
        
        // Add click to highlight on chart
        legendItem.addEventListener('click', () => {
            // Flash effect
            legendItem.style.transform = 'scale(1.05)';
            setTimeout(() => {
                legendItem.style.transform = '';
            }, 200);
        });
        
        legendContainer.appendChild(legendItem);
    });
}

// ===== CERTIFICATE ZOOM FUNCTIONALITY =====

