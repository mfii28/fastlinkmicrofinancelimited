// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide spinner when page is loaded
    window.addEventListener('load', function() {
        const spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.classList.add('hidden');
        }
    });

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    if (mobileMenuButton && mobileMenu) {
        // Toggle mobile menu
        const toggleMenu = (e) => {
            if (e) e.stopPropagation();
            mobileMenuButton.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('overflow-hidden');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            
            // Set focus to first menu item when opening
            if (!mobileMenu.classList.contains('active')) {
                const firstLink = mobileMenu.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        };
        
        mobileMenuButton.addEventListener('click', toggleMenu);
        
        // Close mobile menu when clicking outside or on a link
        const closeMenu = (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenuButton.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('overflow-hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        };
        
        document.addEventListener('click', closeMenu);
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu();
                mobileMenuButton.focus();
            }
        });
        
        // Trap focus inside mobile menu when open
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableContent = mobileMenu.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        e.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        e.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
        });
    }

    // Hero Carousel Functionality
    const heroCarousel = () => {
        const carousel = document.getElementById('hero-carousel');
        if (!carousel) return;

        const slides = carousel.children;
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        let slideInterval;
        const slideIntervalTime = 7000;

        // Set initial active slide
        const showSlide = (index) => {
            // Hide all slides
            Array.from(slides).forEach((slide, i) => {
                slide.style.display = 'none';
                if (dots[i]) {
                    dots[i].classList.remove('bg-white');
                    dots[i].classList.add('bg-white/50');
                }
            });

            // Show current slide
            if (slides[index]) {
                slides[index].style.display = 'flex';
                if (dots[index]) {
                    dots[index].classList.remove('bg-white/50');
                    dots[index].classList.add('bg-white');
                }
            }
        };

        // Next slide
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        // Previous slide
        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        // Start autoplay
        const startAutoplay = () => {
            slideInterval = setInterval(nextSlide, slideIntervalTime);
        };

        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            startAutoplay();
        });

        // Navigation events
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });

        // Initialize
        showSlide(currentSlide);
        startAutoplay();
    };

    // Initialize the carousel
    heroCarousel();

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const icon = button.querySelector('svg');
            
            // Toggle answer visibility
            answer.classList.toggle('hidden');
            
            // Toggle icon rotation
            icon.classList.toggle('transform');
            icon.classList.toggle('rotate-180');
            
            // Close other open FAQs
            document.querySelectorAll('.faq-question').forEach(otherButton => {
                if (otherButton !== button) {
                    const otherAnswer = otherButton.nextElementSibling;
                    const otherIcon = otherButton.querySelector('svg');
                    otherAnswer.classList.add('hidden');
                    otherIcon.classList.remove('transform', 'rotate-180');
                }
            });
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    const scrollToElement = (element, offset = 100) => {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenuButton.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        body.classList.remove('overflow-hidden');
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                    }
                    
                    // Scroll to target with offset for fixed header
                    const headerHeight = document.querySelector('nav')?.offsetHeight || 80;
                    scrollToElement(target, headerHeight + 20);
                }
            }
        });
    });
    
    // Handle page load with hash in URL
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            // Small timeout to ensure DOM is fully loaded
            setTimeout(() => {
                const headerHeight = document.querySelector('nav')?.offsetHeight || 80;
                scrollToElement(target, headerHeight + 20);
            }, 100);
        }
    }
    
    // Add shadow to navbar on scroll and handle mobile menu
    const navbar = document.querySelector('nav');
    if (navbar) {
        let lastScrollTop = 0;
        const navbarHeight = navbar.offsetHeight;
        
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove shadow and background on scroll
            if (scrollTop > 50) {
                navbar.classList.add('shadow-md', 'bg-white', 'bg-opacity-95', 'backdrop-blur-sm');
            } else {
                navbar.classList.remove('shadow-md', 'bg-white', 'bg-opacity-95', 'backdrop-blur-sm');
            }
            
            // Hide/show navbar on scroll (for mobile)
            if (window.innerWidth < 1024) { // Only on mobile
                if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
                    // Scrolling down
                    navbar.style.transform = `translateY(-${navbarHeight}px)`;
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };
        
        // Throttle scroll events for better performance
        let isScrolling;
        window.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(handleScroll, 50);
        }, { passive: true });
        
        // Initial check
        handleScroll();
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
});
