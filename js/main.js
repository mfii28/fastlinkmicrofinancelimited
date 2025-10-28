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
    
    if (mobileMenuButton && mobileMenu) {
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.add('hidden');
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add shadow to navbar on scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md', 'bg-white', 'bg-opacity-95', 'backdrop-blur-sm');
            } else {
                navbar.classList.remove('shadow-md', 'bg-white', 'bg-opacity-95', 'backdrop-blur-sm');
            }
        });
    }
});
