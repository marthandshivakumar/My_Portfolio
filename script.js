document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkillBars() {
        skillItems.forEach(item => {
            const percent = item.getAttribute('data-percent');
            const progressBar = item.querySelector('.skill-progress');
            
            if (isElementInViewport(item) && !progressBar.style.width) {
                progressBar.style.width = percent + '%';
            }
        });
    }
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate stats counting (supports integers and decimals)
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateStats() {
        statNumbers.forEach(number => {
            const raw = number.getAttribute('data-count');
            const isFloat = raw && raw.toString().includes('.');
            const target = parseFloat(raw) || 0;
            const duration = 1600; // Animation duration in ms
            const frameRate = 60; // fps
            const totalFrames = Math.round((duration / 1000) * frameRate);
            let frame = 0;

            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const current = target * easeOutCubic(progress);

                if (frame >= totalFrames) {
                    clearInterval(counter);
                    number.textContent = formatNumber(target, isFloat) + '+';
                } else {
                    number.textContent = formatNumber(current, isFloat);
                }
            }, 1000 / frameRate);
        });
    }

    function formatNumber(value, isFloat) {
        if (isFloat) {
            return (Math.round(value * 10) / 10).toFixed(1);
        }
        return Math.floor(value).toString();
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                if (entry.target.id === 'about') {
                    animateStats();
                }
                
                // Add animation classes for other sections as needed
                entry.target.querySelectorAll('.fade-in').forEach(el => {
                    el.classList.add('animated');
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Form submission
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Here you would typically send the form data to a server
    //         // For demo purposes, we'll just show an alert
    //         alert('Thank you for your message! I will get back to you soon.');
    //         this.reset();
    //     });
    // }
    
    // // Initialize animations
    // animateSkillBars();
    // window.addEventListener('scroll', animateSkillBars);

    // Project flip interaction: toggle .is-flipped on click (for touch) and allow keyboard toggle
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // click toggles flip unless clicking a link
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-link') || e.target.closest('.project-actions') || e.target.tagName === 'A') return;
            card.classList.toggle('is-flipped');
        });

        // keyboard accessibility: Enter or Space to toggle
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('is-flipped');
            }
        });
    });

    // Experience: Show All toggle and per-item expand/collapse
    const expSection = document.querySelector('.experience');
    const toggleBtn = document.getElementById('toggleExperience');
    if (toggleBtn && expSection) {
        toggleBtn.addEventListener('click', () => {
            const expanded = expSection.classList.toggle('expanded');
            toggleBtn.textContent = expanded ? 'Hide Details' : 'Show All';
            toggleBtn.setAttribute('aria-pressed', expanded);
        });
    }

    // Per-item header toggle (accessible via Enter/Space and click)
    document.querySelectorAll('.timeline-head').forEach(head => {
        const item = head.closest('.timeline-item');
        head.addEventListener('click', () => {
            item.classList.toggle('open');
            const expanded = item.classList.contains('open');
            head.setAttribute('aria-expanded', expanded);
        });
        head.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.classList.toggle('open');
                const expanded = item.classList.contains('open');
                head.setAttribute('aria-expanded', expanded);
            }
        });
    });
});
