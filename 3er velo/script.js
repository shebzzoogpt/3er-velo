/* ============================================
   3er - Vélo Cargo Électrique
   JavaScript - Interactions & Animations
   Avec effets interactifs sur les images
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Custom Cursor
    // ==========================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        if (cursor) {
            cursor.style.left = cursorX - 6 + 'px';
            cursor.style.top = cursorY - 6 + 'px';
        }
        
        if (cursorFollower) {
            cursorFollower.style.left = followerX - 20 + 'px';
            cursorFollower.style.top = followerY - 20 + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .feature-card, .spec-item, .benefit-card, .stat, .floating-badge, .bike-image-container, .specs-hotspot');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'scale(2)';
            if (cursorFollower) cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'scale(1)';
            if (cursorFollower) cursorFollower.style.transform = 'scale(1)';
        });
    });
    
    // ==========================================
    // Navigation Scroll Effect
    // ==========================================
    const nav = document.querySelector('nav');
    
    // Mobile menu elements (defined early for use in smooth scroll)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    if (mobileMenuBtn && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuBtn.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ==========================================
    // Smooth Scroll for Navigation Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                if (mobileMenuBtn && mobileMenuOverlay) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // Scroll Reveal Animation
    // ==========================================
    const reveals = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        reveals.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 50);
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // ==========================================
    // Hero Bike Image Interactive Effect
    // ==========================================
    const bikeWrapper = document.querySelector('.bike-wrapper');
    const bikeImageContainer = document.querySelector('.bike-image-container');
    const bikePhoto = document.querySelector('.bike-photo');
    const floatingBadges = document.querySelectorAll('.floating-badge');
    
    if (bikeWrapper && bikeImageContainer) {
        bikeWrapper.addEventListener('mousemove', (e) => {
            const rect = bikeWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Parallax effect on the bike image
            if (bikePhoto) {
                bikePhoto.style.transform = `scale(1.05) translate(${x * 20}px, ${y * 20}px)`;
            }
            
            // Inverse parallax on floating badges
            floatingBadges.forEach((badge, index) => {
                const intensity = 15 + (index * 5);
                badge.style.transform = `translate(${-x * intensity}px, ${-y * intensity}px)`;
            });
        });
        
        bikeWrapper.addEventListener('mouseleave', () => {
            if (bikePhoto) {
                bikePhoto.style.transform = 'scale(1)';
            }
            
            floatingBadges.forEach(badge => {
                badge.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // ==========================================
    // Specs Image Interactive Hotspots
    // ==========================================
    const specsImageContainer = document.querySelector('.specs-image-container');
    const specsBikePhoto = document.querySelector('.specs-bike-photo');
    
    if (specsImageContainer && specsBikePhoto) {
        specsImageContainer.addEventListener('mousemove', (e) => {
            const rect = specsImageContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Subtle zoom effect following mouse
            specsBikePhoto.style.transform = `scale(1.02) translate(${x * 10}px, ${y * 10}px)`;
        });
        
        specsImageContainer.addEventListener('mouseleave', () => {
            specsBikePhoto.style.transform = 'scale(1)';
        });
    }
    
    // ==========================================
    // Parallax Effect on Hero
    // ==========================================
    const heroVisual = document.querySelector('.hero-visual');
    const heroShapes = document.querySelectorAll('.shape');
    const bikeGlow = document.querySelector('.bike-glow');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrolled < heroHeight) {
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
            
            heroShapes.forEach((shape, index) => {
                const speed = 0.05 + (index * 0.02);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            if (bikeGlow) {
                bikeGlow.style.opacity = 0.6 - (scrolled * 0.001);
            }
        }
    });
    
    // ==========================================
    // Feature Cards Tilt Effect
    // ==========================================
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ==========================================
    // Spec Items Hover Animation
    // ==========================================
    const specItems = document.querySelectorAll('.spec-item');
    
    specItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
    });
    
    // ==========================================
    // Eco Stats Circle Animation
    // ==========================================
    const ecoSection = document.querySelector('.eco');
    let ecoAnimated = false;
    
    function animateEcoCircles() {
        if (ecoAnimated || !ecoSection) return;
        
        const rect = ecoSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            ecoAnimated = true;
            
            const circles = document.querySelectorAll('.progress-circle');
            circles.forEach((circle, index) => {
                setTimeout(() => {
                    circle.style.strokeDashoffset = '0';
                }, index * 200);
            });
        }
    }
    
    window.addEventListener('scroll', animateEcoCircles);
    animateEcoCircles();
    
    // ==========================================
    // Floating Badges Random Animation
    // ==========================================
    floatingBadges.forEach((badge, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        badge.style.animationDelay = `${randomDelay}s`;
        badge.style.animationDuration = `${randomDuration}s`;
    });
    
    // ==========================================
    // Image Loading Animation
    // ==========================================
    const images = document.querySelectorAll('.bike-photo, .specs-bike-photo');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // If already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // ==========================================
    // Hotspot Click Handler
    // ==========================================
    const hotspots = document.querySelectorAll('.specs-hotspot');
    
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            // Toggle active state
            hotspots.forEach(h => h.classList.remove('active'));
            hotspot.classList.add('active');
            
            // Get tooltip text
            const tooltip = hotspot.querySelector('.hotspot-tooltip');
            if (tooltip) {
                // Could trigger additional actions here
                console.log('Hotspot clicked:', tooltip.textContent);
            }
        });
    });
    
    // ==========================================
    // Stats Counter Animation
    // ==========================================
    const stats = document.querySelectorAll('.stat-value');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;
        
        const rect = heroStats.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;
            // Stats are already set, just trigger entrance animation
            stats.forEach((stat, index) => {
                stat.style.opacity = '0';
                stat.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    stat.style.transition = 'all 0.5s ease';
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();
    
    // ==========================================
    // Intersection Observer for Performance
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // ==========================================
    // Scroll Progress
    // ==========================================
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // ==========================================
    // Page Load Animation
    // ==========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial reveal animations
        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach((el, index) => {
                if (el.getBoundingClientRect().top < window.innerHeight) {
                    setTimeout(() => {
                        el.classList.add('active');
                    }, index * 100);
                }
            });
        }, 300);
    });
    
    // ==========================================
    // Console Branding
    // ==========================================
    console.log('%c3er - Vélo Cargo Électrique', 'color: #0066FF; font-size: 24px; font-weight: bold;');
    console.log('%cMobilité urbaine réinventée', 'color: #64748b; font-size: 14px;');
    console.log('%c🚲 Site vitrine avec images interactives', 'color: #3b82f6; font-size: 12px;');
    
});