// Futuristic Preloader with Percentage Loading
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const percentageElement = document.getElementById('percentage');
    const loadingStatus = document.querySelector('.loading-status');
    
    let currentPercentage = 0;
    const loadingDuration = 4000; // 4 seconds total loading time
    const updateInterval = 50; // Update every 50ms
    const incrementValue = 100 / (loadingDuration / updateInterval);
    
    // Loading status messages
    const statusMessages = [
        "INITIALIZING SYSTEMS...",
        "LOADING CORE MODULES...",
        "ESTABLISHING CONNECTIONS...",
        "OPTIMIZING PERFORMANCE...",
        "FINALIZING SETUP...",
        "READY TO LAUNCH..."
    ];
    
    let currentStatusIndex = 0;
    
    // Function to update percentage
    function updatePercentage() {
        if (currentPercentage < 100) {
            currentPercentage += incrementValue;
            
            // Ensure we don't exceed 100
            if (currentPercentage > 100) {
                currentPercentage = 100;
            }
            
            // Update percentage display with animation
            percentageElement.textContent = Math.floor(currentPercentage);
            
            // Update status message based on percentage
            const statusIndex = Math.floor((currentPercentage / 100) * (statusMessages.length - 1));
            if (statusIndex !== currentStatusIndex && statusIndex < statusMessages.length) {
                currentStatusIndex = statusIndex;
                loadingStatus.textContent = statusMessages[statusIndex];
            }
            
            // Add special effects at certain percentages
            if (currentPercentage >= 25 && currentPercentage < 26) {
                addGlitchEffect();
            }
            
            if (currentPercentage >= 75 && currentPercentage < 76) {
                addEnergyBurst();
            }
            
            setTimeout(updatePercentage, updateInterval);
        } else {
            // Loading complete
            setTimeout(hidePreloader, 500);
        }
    }
    
    // Add glitch effect
    function addGlitchEffect() {
        const brandName = document.querySelector('.brand-name');
        brandName.style.animation = 'none';
        brandName.style.textShadow = '2px 0 #ff0080, -2px 0 #00ccff';
        
        setTimeout(() => {
            brandName.style.animation = 'brandGlow 2s ease-in-out infinite alternate';
            brandName.style.textShadow = '0 0 30px var(--accent-secondary)';
        }, 200);
    }
    
    // Add energy burst effect
    function addEnergyBurst() {
        const innerCore = document.querySelector('.inner-core');
        innerCore.style.background = 'radial-gradient(circle, #ffffff 0%, var(--accent-primary) 30%, transparent 70%)';
        innerCore.style.transform = 'translate(-50%, -50%) scale(2)';
        
        setTimeout(() => {
            innerCore.style.background = 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)';
            innerCore.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
    }
    
    // Function to hide preloader
    function hidePreloader() {
        preloader.classList.add('preloader-hidden');
        document.body.style.overflow = 'auto';
        mainContent.style.display = 'block';
        
        // Remove preloader from DOM after transition
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }
    
    // Start the loading animation
    setTimeout(updatePercentage, 500);
});

// ========== ENHANCED NAVBAR FUNCTIONALITY ==========

// Language Management with Site-wide Translation
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = {
            en: { 
                greeting: "Hello, I'm", 
                code: "EN",
                about: "About",
                skills: "Skills", 
                portfolio: "Portfolio",
                services: "Services",
                contact: "Contact"
            },
            fr: { 
                greeting: "Salut, je suis", 
                code: "FR",
                about: "À propos",
                skills: "Compétences",
                portfolio: "Portfolio", 
                services: "Services",
                contact: "Contact"
            },
            es: { 
                greeting: "Hola, soy", 
                code: "ES",
                about: "Acerca",
                skills: "Habilidades",
                portfolio: "Portafolio",
                services: "Servicios", 
                contact: "Contacto"
            }
        };
        this.init();
    }
    
    init() {
        this.updateLanguage();
        this.setupLanguageSwitcher();
    }
    
    updateLanguage() {
        // Update all elements with data attributes
        document.querySelectorAll('[data-en]').forEach(element => {
            const key = element.getAttribute(`data-${this.currentLang}`);
            if (key) {
                element.textContent = key;
            }
        });
        
        // Update current language display
        const currentLangElement = document.querySelector('.current-lang');
        if (currentLangElement) {
            currentLangElement.textContent = this.translations[this.currentLang].code;
        }
        
        // Update active language option
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === this.currentLang) {
                option.classList.add('active');
            }
        });
        
        // Set document language
        document.documentElement.lang = this.currentLang;
    }
    
    setupLanguageSwitcher() {
        const languageSwitcher = document.querySelector('.language-switcher');
        const langOptions = document.querySelectorAll('.lang-option');
        
        // Toggle dropdown
        languageSwitcher.addEventListener('click', (e) => {
            if (!e.target.closest('.lang-option')) {
                languageSwitcher.classList.toggle('active');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageSwitcher.contains(e.target)) {
                languageSwitcher.classList.remove('active');
            }
        });
        
        // Language selection
        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.currentLang = option.dataset.lang;
                localStorage.setItem('language', this.currentLang);
                this.updateLanguage();
                languageSwitcher.classList.remove('active');
                
                // Add selection effect
                option.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    option.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
}

// Enhanced Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }
    
    init() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.setupThemeToggle();
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Add toggle animation
        const toggleThumb = document.querySelector('.toggle-thumb');
        toggleThumb.style.transform += ' scale(1.2)';
        setTimeout(() => {
            toggleThumb.style.transform = toggleThumb.style.transform.replace(' scale(1.2)', '');
        }, 200);
    }
    
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }
}

// Mobile Menu Management
class MobileMenuManager {
    constructor() {
        this.hamburger = document.querySelector('.hamburger-menu');
        this.mobileOverlay = document.querySelector('.mobile-menu-overlay');
        this.mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        this.init();
    }
    
    init() {
        this.setupHamburgerToggle();
        this.setupMobileLinks();
    }
    
    setupHamburgerToggle() {
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close menu when clicking overlay
        this.mobileOverlay.addEventListener('click', (e) => {
            if (e.target === this.mobileOverlay) {
                this.closeMobileMenu();
            }
        });
    }
    
    setupMobileLinks() {
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.mobileOverlay.classList.toggle('active');
        document.body.style.overflow = this.mobileOverlay.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Enhanced Navbar Effects
class NavbarEffects {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupSmoothScrolling();
    }
    
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                this.navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
            } else {
                this.navbar.style.background = 'transparent';
                this.navbar.style.boxShadow = 'none';
            }
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers after preloader
    setTimeout(() => {
        new LanguageManager();
        new ThemeManager();
        new MobileMenuManager();
        new NavbarEffects();
    }, 100);
});

// Add this simple hamburger functionality to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// ========== HERO SECTION FUNCTIONALITY ==========

// Typing Animation Fix
document.addEventListener('DOMContentLoaded', function() {
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement) {
        const roles = {
            en: ['Software Engineer', 'Graphic Designer', 'Full Stack Developer', 'UI/UX Designer', 'Creative Developer'],
            fr: ['Ingénieur Logiciel', 'Graphiste', 'Développeur Full Stack', 'Designer UI/UX', 'Développeur Créatif'],
            es: ['Ingeniero de Software', 'Diseñador Gráfico', 'Desarrollador Full Stack', 'Diseñador UI/UX', 'Desarrollador Creativo']
        };
        
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let currentLang = localStorage.getItem('language') || 'en';
        
        function type() {
            const currentRoles = roles[currentLang];
            const currentRole = currentRoles[currentRoleIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentRole.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typedTextElement.textContent = currentRole.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentCharIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % currentRoles.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing after 2.5 seconds
        setTimeout(type, 2500);
    }
});

// ========== CV DOWNLOAD FUNCTIONALITY ========== 
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadCV');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add download animation
            const originalContent = this.innerHTML;
            this.style.transform = 'scale(0.95)';
            this.innerHTML = `
                <span class="btn-icon">⏳</span>
                <span class="btn-text">Downloading...</span>
                <div class="btn-glow"></div>
            `;
            
            setTimeout(() => {
                // Create download link
                const link = document.createElement('a');
                link.href = 'assets/files/DARLINGTON ODOM_C.V.pdf'; // Update this path to your CV
                link.download = 'DARLINGTON_ODOM_CV.pdf'; // The name when downloaded
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show success message
                this.innerHTML = `
                    <span class="btn-icon">✅</span>
                    <span class="btn-text">Downloaded!</span>
                    <div class="btn-glow"></div>
                `;
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.innerHTML = originalContent;
                }, 2000);
                
            }, 1500);
        });
    }
});

// Scroll to Section Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Hero Scroll Effects
class HeroScrollEffects {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.brandName = document.querySelector('.brand-name-hero');
        this.particles = document.querySelectorAll('.particle-float');
        this.shapes = document.querySelectorAll('.shape');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        const heroHeight = this.hero.offsetHeight;
        const scrollPercent = scrollY / heroHeight;
        
        // Parallax effect for brand name
        if (this.brandName) {
            this.brandName.style.transform = `translateY(${scrollY * 0.5}px)`;
            this.brandName.style.opacity = 1 - scrollPercent * 1.5;
        }
        
        // Parallax effect for particles
        this.particles.forEach((particle, index) => {
            const speed = 0.3 + (index * 0.1);
            particle.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        // Rotate shapes on scroll
        this.shapes.forEach((shape, index) => {
            const rotation = scrollY * (0.1 + index * 0.05);
            shape.style.transform += ` rotate(${rotation}deg)`;
        });
    }
}

// Enhanced Language Manager (Update the existing one)
class EnhancedLanguageManager extends LanguageManager {
    constructor() {
        super();
        this.typingAnimation = null;
    }
    
    init() {
        super.init();
        // Initialize typing animation
        setTimeout(() => {
            this.typingAnimation = new TypingAnimation();
        }, 100);
    }
    
    updateLanguage() {
        super.updateLanguage();
        // Update typing animation language
        if (this.typingAnimation) {
            this.typingAnimation.updateLanguage(this.currentLang);
        }
    }
}

// Update the initialization
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        new EnhancedLanguageManager(); // Use enhanced version
        new ThemeManager();
        new MobileMenuManager();
        new NavbarEffects();
        new CVDownloader();
        new HeroScrollEffects();
    }, 100);
});

// ========== LANGUAGE SWITCHING FIX ========== 
document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    console.log('Language elements found:', { languageBtn, languageDropdown, optionsCount: languageOptions.length }); // Debug
    
    if (languageBtn && languageDropdown && languageOptions.length > 0) {
        // Load saved language
        const savedLang = localStorage.getItem('language') || 'en';
        updateLanguageDisplay(savedLang);
        updatePageLanguage(savedLang);
        
        // Toggle dropdown
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log('Language button clicked'); // Debug
            languageDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('show');
            }
        });
        
        // Handle language selection
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const selectedLang = this.getAttribute('data-lang');
                console.log('Language selected:', selectedLang); // Debug
                
                if (selectedLang) {
                    // Update active state
                    languageOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Save and apply language
                    localStorage.setItem('language', selectedLang);
                    updateLanguageDisplay(selectedLang);
                    updatePageLanguage(selectedLang);
                    
                    // Close dropdown
                    languageDropdown.classList.remove('show');
                }
            });
        });
        
        function updateLanguageDisplay(lang) {
            const flags = { en: '🇺🇸', fr: '🇫🇷', es: '🇪🇸' };
            const flagIcon = languageBtn.querySelector('.flag-icon');
            const langText = languageBtn.querySelector('.language-text');
            
            if (flagIcon && flags[lang]) {
                flagIcon.textContent = flags[lang];
            }
            if (langText) {
                langText.textContent = lang.toUpperCase();
            }
            
            // Update active option
            languageOptions.forEach(opt => {
                const optLang = opt.getAttribute('data-lang');
                if (optLang === lang) {
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                }
            });
            
            console.log('Language display updated to:', lang); // Debug
        }
        
        function updatePageLanguage(lang) {
            // Update all elements with data attributes
            const elementsToUpdate = document.querySelectorAll('[data-en]');
            console.log('Found elements to update:', elementsToUpdate.length); // Debug
            
            elementsToUpdate.forEach(element => {
                const langAttr = `data-${lang}`;
                if (element.hasAttribute(langAttr)) {
                    const newText = element.getAttribute(langAttr);
                    element.textContent = newText;
                    console.log('Updated element:', element.tagName, 'to:', newText); // Debug
                }
            });
        }
    } else {
        console.log('Language elements not found!', { languageBtn, languageDropdown, optionsCount: languageOptions.length }); // Debug
    }
});

// ========== THEME TOGGLE FIX ========== 
document.addEventListener('DOMContentLoaded', function() {
    // Target the correct class name
    const themeToggle = document.querySelector('.theme-toggle');
    
    console.log('Theme toggle found:', themeToggle); // Debug line
    
    if (themeToggle) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        // Add click event
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Theme toggle clicked'); // Debug line
            
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log('Switching from', currentTheme, 'to', newTheme); // Debug line
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        function updateThemeIcon(theme) {
            // Update the icon inside the theme toggle
            const icon = themeToggle.querySelector('.theme-icon') || 
                        themeToggle.querySelector('span') ||
                        themeToggle;
            
            if (icon) {
                icon.textContent = theme === 'dark' ? '☀️' : '🌙';
                console.log('Icon updated to:', icon.textContent); // Debug line
            }
        }
    } else {
        console.log('Theme toggle button not found!'); // Debug line
    }
});

// ========== ABOUT SECTION ANIMATIONS ========== 
document.addEventListener('DOMContentLoaded', function() {
    // Animated Counter for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about')) {
                    // Start counter animation when about section is visible
                    setTimeout(animateCounters, 500);
                }
                
                // Add visible class for animations
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe about section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
// ========== SKILLS SECTION ANIMATIONS ========== 
document.addEventListener('DOMContentLoaded', function() {
    // Animated Skill Bars
    function animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const progressBar = item.querySelector('.skill-progress');
                const percentageSpan = item.querySelector('.skill-percentage');
                const targetWidth = progressBar.getAttribute('data-width');
                
                // Animate the progress bar
                progressBar.style.width = targetWidth + '%';
                
                // Animate the percentage counter
                let currentPercentage = 0;
                const increment = targetWidth / 100; // Smooth animation
                
                const counter = setInterval(() => {
                    currentPercentage += increment;
                    if (currentPercentage >= targetWidth) {
                        currentPercentage = targetWidth;
                        clearInterval(counter);
                    }
                    percentageSpan.textContent = Math.floor(currentPercentage) + '%';
                }, 20);
                
            }, index * 200); // Stagger the animations
        });
    }
    
    // Intersection Observer for Skills Section
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start skill bar animations when skills section is visible
                setTimeout(animateSkillBars, 500);
                
                // Add visible class for other animations
                entry.target.classList.add('visible');
                
                // Disconnect observer after first trigger
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Add hover effects for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const progressBar = this.querySelector('.skill-progress');
            progressBar.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.8)';
        });
        
        item.addEventListener('mouseleave', function() {
            const progressBar = this.querySelector('.skill-progress');
            progressBar.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
        });
    });
});

// ========== PORTFOLIO SECTION FUNCTIONALITY ========== 
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });
    
    // Project Modal Functionality
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Project data (you can expand this with real project data)
    const projectData = {
        1: {
            title: "E-Commerce Platform",
            description: "A comprehensive e-commerce solution built with modern technologies. Features include user authentication, payment processing, inventory management, and an admin dashboard. The platform is designed to handle high traffic and provides a seamless shopping experience.",
            image: "assets/images/project1.jpg",
            tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
            github: "https://github.com/darlculus/ecommerce-platform",
            live: "https://ecommerce-demo.darlculus.com"
        },
        2: {
            title: "Brand Identity Design",
            description: "Complete brand identity package for a tech startup including logo design, color palette, typography guidelines, business cards, and brand manual. The design reflects innovation and trustworthiness.",
            image: "assets/images/project2.jpg",
            tech: ["Illustrator", "Photoshop", "Figma", "InDesign"],
            behance: "https://behance.net/darlculus/brand-identity"
        },
        3: {
            title: "Fitness Tracking App",
            description: "Cross-platform mobile application for fitness tracking with workout plans, progress analytics, social features, and integration with wearable devices. Built with React Native for optimal performance.",
            image: "assets/images/project3.jpg",
            tech: ["React Native", "Firebase", "HealthKit", "Redux", "Expo"],
            github: "https://github.com/darlculus/fitness-tracker",
            store: "https://apps.apple.com/fitness-tracker"
        },
        4: {
            title: "Task Management Dashboard",
            description: "Collaborative project management tool with real-time updates, team collaboration features, advanced analytics, and customizable workflows. Perfect for remote teams and agile development.",
            image: "assets/images/project4.jpg",
            tech: ["Vue.js", "Socket.io", "PostgreSQL", "Chart.js", "Vuex"],
            github: "https://github.com/darlculus/task-manager",
            live: "https://taskmanager.darlculus.com"
        },
        5: {
            title: "Design System",
            description: "Comprehensive design system with reusable components, style guides, design tokens, and documentation. Created for consistency across multiple products and teams.",
            image: "assets/images/project5.jpg",
            tech: ["Figma", "Design Tokens", "Storybook", "Sketch"],
            figma: "https://figma.com/design-system-darlculus"
        },
        6: {
            title: "AI Analytics Platform",
            description: "Machine learning-powered analytics platform with predictive insights, automated reporting, and interactive data visualizations. Helps businesses make data-driven decisions.",
            image: "assets/images/project6.jpg",
            tech: ["Python", "TensorFlow", "D3.js", "FastAPI", "Pandas"],
            github: "https://github.com/darlculus/ai-analytics",
            live: "https://analytics.darlculus.com"
        }
    };
    
    // Preview button functionality
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                
                // Clear and populate tech tags
                modalTech.innerHTML = '';
                project.tech.forEach(tech => {
                    const tag = document.createElement('span');
                    tag.className = 'tech-tag';
                    tag.textContent = tech;
                    modalTech.appendChild(tag);
                });
                
                // Update action buttons
                const githubBtn = document.getElementById('modalGithub');
                const liveBtn = document.getElementById('modalLive');
                
                if (project.github) {
                    githubBtn.style.display = 'flex';
                    githubBtn.onclick = () => window.open(project.github, '_blank');
                } else {
                    githubBtn.style.display = 'none';
                }
                
                if (project.live) {
                    liveBtn.style.display = 'flex';
                    liveBtn.onclick = () => window.open(project.live, '_blank');
                } else if (project.behance) {
                    liveBtn.innerHTML = '<span>🎨</span> View on Behance';
                    liveBtn.onclick = () => window.open(project.behance, '_blank');
                    liveBtn.style.display = 'flex';
                } else if (project.figma) {
                    liveBtn.innerHTML = '<span>🎯</span> View in Figma';
                    liveBtn.onclick = () => window.open(project.figma, '_blank');
                    liveBtn.style.display = 'flex';
                } else if (project.store) {
                    liveBtn.innerHTML = '<span>📱</span> App Store';
                    liveBtn.onclick = () => window.open(project.store, '_blank');
                    liveBtn.style.display = 'flex';
                } else {
                    liveBtn.style.display = 'none';
                }
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal functionality
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Load More Button (placeholder functionality)
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Add your load more functionality here
            console.log('Load more projects...');
            // You can implement pagination or lazy loading here
        });
    }
    
    // Intersection Observer for Portfolio Items
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all portfolio items
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        portfolioObserver.observe(item);
    });
});


// ========== CONTACT SECTION FUNCTIONALITY ========== 
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const formStatus = document.getElementById('formStatus');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        hideStatusMessages();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Simulate API call (replace with your actual endpoint)
            await simulateFormSubmission(data);
            
            // Show success message
            showSuccessMessage();
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            showErrorMessage();
            console.error('Form submission error:', error);
                } finally {
            // Hide loading state
            submitBtn.classList.remove('loading');
        }
    });
    
    // Simulate form submission (replace with actual API call)
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure (90% success rate)
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }
    
    // Show success message
    function showSuccessMessage() {
        hideStatusMessages();
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
    
    // Show error message
    function showErrorMessage() {
        hideStatusMessages();
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
    
    // Hide all status messages
    function hideStatusMessages() {
        successMessage.classList.remove('show');
        errorMessage.classList.remove('show');
    }
    
    // Form validation and styling
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        // Remove existing error state
        field.classList.remove('error');
        removeErrorMessage(field);
        
        // Check if required field is empty
        if (isRequired && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation (optional)
        if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        // Insert error message after the input group
        const inputGroup = field.closest('.input-group');
        inputGroup.appendChild(errorElement);
    }
    
    function removeErrorMessage(field) {
        const inputGroup = field.closest('.input-group');
        const existingError = inputGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Auto-resize textarea
    const textarea = contactForm.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
    
    // Contact cards animation on scroll
    const contactCards = document.querySelectorAll('.contact-card');
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        contactObserver.observe(card);
    });
    
    // Social links tracking (optional analytics)
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.classList[1]; // Gets the platform class (linkedin, github, etc.)
            console.log(`Social link clicked: ${platform}`);
            // Add your analytics tracking here
        });
    });
    
    // Copy email to clipboard functionality
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showCopyNotification('Email copied to clipboard!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopyNotification('Email copied to clipboard!');
            }
            
            // Still open email client after a short delay
            setTimeout(() => {
                window.location.href = this.href;
            }, 1000);
        });
    }
    
    function showCopyNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

// Add CSS for form errors and notifications
const additionalCSS = `
.input-group input.error,
.input-group textarea.error,
.input-group select.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.field-error {
    display: block;
    color: #ef4444;
    font-size: 0.8rem;
    margin-top: 5px;
    margin-left: 5px;
    font-weight: 500;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// ========== SCROLL TO TOP BUTTON FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const progressRing = document.querySelector('.progress-ring-fill');
    const circumference = 2 * Math.PI * 30; // radius = 30
    
    // Set up the progress ring
    progressRing.style.strokeDasharray = circumference;
    progressRing.style.strokeDashoffset = circumference;
    
    // Create gradient for progress ring
    const svg = document.querySelector('.progress-ring');
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.id = 'progressGradient';
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#00ff88');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#ff6b6b');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.insertBefore(defs, svg.firstChild);
    
    // Scroll event handler
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // Show/hide button
        if (scrollTop > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
        
        // Update progress ring
        const offset = circumference - (scrollPercent * circumference);
        progressRing.style.strokeDashoffset = offset;
    }
    
    // Smooth scroll to top function
    function scrollToTop() {
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        const duration = 1500; // 1.5 seconds
        
        // Add launch animation
        scrollToTopBtn.style.animation = 'rocketLaunch 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            window.scrollTo(0, startPosition * (1 - easeOutQuart));
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                // Reset animation after scroll completes
                setTimeout(() => {
                    scrollToTopBtn.style.animation = '';
                }, 500);
            }
        }
        
        requestAnimationFrame(animateScroll);
        
        // Add some fun effects
        createScrollParticles();
        playRocketSound();
    }
    
    // Create particle effects
    function createScrollParticles() {
        const particleCount = 15;
        const buttonRect = scrollToTopBtn.getBoundingClientRect();
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'scroll-particle';
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: linear-gradient(45deg, #00ff88, #ff6b6b);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                left: ${buttonRect.left + buttonRect.width / 2}px;
                top: ${buttonRect.top + buttonRect.height / 2}px;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 100 + Math.random() * 100;
            const lifetime = 1000 + Math.random() * 500;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: lifetime,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }
    }
    
    // Play rocket sound effect (optional)
    function playRocketSound() {
        // Create a simple beep sound using Web Audio API
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    }
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Initial call
    handleScroll();
    
        // Add hover sound effect
    scrollToTopBtn.addEventListener('mouseenter', function() {
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    });
    
    // Add rocket trail animation on scroll
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            scrollToTopBtn.classList.add('scrolling');
            isScrolling = true;
            
            setTimeout(() => {
                scrollToTopBtn.classList.remove('scrolling');
                isScrolling = false;
            }, 150);
        }
    });
});

// Add additional CSS for rocket launch animation and effects
const rocketCSS = `
@keyframes rocketLaunch {
    0% {
        transform: translateY(0) scale(1);
    }
    20% {
        transform: translateY(-20px) scale(1.2);
    }
    40% {
        transform: translateY(-100px) scale(1.1) rotate(10deg);
    }
    60% {
        transform: translateY(-200px) scale(1) rotate(-5deg);
    }
    80% {
        transform: translateY(-400px) scale(0.8) rotate(0deg);
        opacity: 0.7;
    }
    100% {
        transform: translateY(-600px) scale(0.5);
        opacity: 0;
    }
}

.scroll-to-top.scrolling .rocket-body {
    animation: rocketBoost 0.15s ease-out;
}

.scroll-to-top.scrolling .flame {
    animation-duration: 0.05s;
    transform: scaleY(1.5);
}

@keyframes rocketBoost {
    0% { transform: translateY(0); }
    50% { transform: translateY(-5px) scale(1.1); }
    100% { transform: translateY(0); }
}

.scroll-particle {
    animation: particleExplode 1s ease-out forwards;
}

@keyframes particleExplode {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0);
        opacity: 0;
    }
}

/* Enhanced flame effects */
.scroll-to-top:hover .flame-1 {
    background: linear-gradient(to top, #ff4500, #ff6b35);
    height: 25px;
}

.scroll-to-top:hover .flame-2 {
    background: linear-gradient(to top, #ff6b35, #ffa500);
    height: 20px;
}

.scroll-to-top:hover .flame-3 {
    background: linear-gradient(to top, #ffa500, #ffff00);
    height: 15px;
}

/* Pulsing glow effect */
.scroll-to-top::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    animation: glowPulse 3s ease-in-out infinite;
    z-index: -1;
}

@keyframes glowPulse {
    0%, 100% { 
        opacity: 0;
        transform: scale(0.8);
    }
    50% { 
        opacity: 1;
        transform: scale(1.2);
    }
}

.scroll-to-top:hover::before {
    animation-duration: 1s;
}

/* Stars background effect */
.scroll-to-top::after {
    content: '✨';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
    opacity: 0;
    animation: starTwinkle 2s ease-in-out infinite;
}

@keyframes starTwinkle {
    0%, 100% { 
        opacity: 0;
        transform: translateX(-50%) translateY(0) rotate(0deg);
    }
    50% { 
        opacity: 1;
        transform: translateX(-50%) translateY(-10px) rotate(180deg);
    }
}

.scroll-to-top:hover::after {
    animation-duration: 0.5s;
}
`;

// Inject the rocket CSS
const rocketStyleSheet = document.createElement('style');
rocketStyleSheet.textContent = rocketCSS;
document.head.appendChild(rocketStyleSheet);


