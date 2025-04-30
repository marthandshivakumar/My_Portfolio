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
    
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            const duration = 2000; // Animation duration in ms
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    number.textContent = target + '+';
                } else {
                    number.textContent = Math.floor(current);
                }
            }, 16);
        });
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
});