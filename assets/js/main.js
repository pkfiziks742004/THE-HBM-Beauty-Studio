/**
 * THE HBM - High Performance Vanilla JavaScript
 * Optimized with IntersectionObserver & requestAnimationFrame for 60fps smoothness
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header & Active Nav Spy (Throttled with requestAnimationFrame) ---
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let isTicking = false;

    function onScroll() {
        const scrollY = window.scrollY;
        
        // Sticky Header Toggle
        if (scrollY > 50) {
            header && header.classList.add('scrolled');
        } else {
            header && header.classList.remove('scrolled');
        }
        
        // Active Section Navigation Tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 160)) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }
        
        isTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(onScroll);
            isTicking = true;
        }
    }, { passive: true });
    
    // Initial run
    onScroll();

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            mobileToggle.innerHTML = isActive ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
                lucide.createIcons();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
                if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
                    lucide.createIcons();
                }
            });
        });
    }

    // --- High-Performance Scroll Reveal (IntersectionObserver) ---
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Unobserve once animated
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(reveal => revealObserver.observe(reveal));
    } else {
        // Fallback for older browsers
        reveals.forEach(reveal => reveal.classList.add('active'));
    }

    // --- Liquid / Water Ripple Button Effect ---
    const buttons = document.querySelectorAll('.btn-liquid, .btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            let oldRipple = this.querySelector('.ripple');
            if (oldRipple) { oldRipple.remove(); }

            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            let rect = this.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            
            let size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x - size/2}px`;
            ripple.style.top = `${y - size/2}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 700);
        });
    });

    // --- Interactive Beauty Menu Tabs ---
    const menuTabs = document.querySelectorAll('.menu-tab-btn');
    const menuPanes = document.querySelectorAll('.menu-pane');

    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                menuTabs.forEach(t => t.classList.remove('active'));
                menuPanes.forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                
                const targetId = tab.getAttribute('data-target');
                if (targetId) {
                    const targetPane = document.getElementById(targetId);
                    if (targetPane) {
                        targetPane.classList.add('active');
                    }
                }
            });
        });
    }

    // --- Testimonial Slider ---
    const track = document.getElementById('testimonial-track');
    if (track && track.children.length > 0) {
        const slides = Array.from(track.children);
        const nextButton = document.getElementById('test-next');
        const prevButton = document.getElementById('test-prev');
        const dotsContainer = document.getElementById('test-dots');
        
        let currentIndex = 0;
        let slideInterval;

        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, idx) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (idx === 0) dot.classList.add('active');
                dot.addEventListener('click', () => moveToSlide(idx));
                dotsContainer.appendChild(dot);
            });
        }
        
        const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

        function moveToSlide(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            if (slides[index]) slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentIndex = index;
        }

        function nextSlide() {
            let nextIndex = (currentIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        }

        function prevSlide() {
            let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveToSlide(prevIndex);
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }

        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        const sliderContainer = document.querySelector('#testimonials');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderContainer.addEventListener('mouseleave', startInterval);
        }
        
        startInterval();
    }

    // --- Gallery Filtering logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && items.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                items.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                    }
                });
                updateLightboxItems();
            });
        });
    }

    // --- Load More / Show Less Gallery Images ---
    const loadMoreBtn = document.getElementById('load-more-btn');
    let isGalleryExpanded = false;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const hiddenItems = document.querySelectorAll('.hbm-hidden-item, .hbm-was-hidden');
            
            isGalleryExpanded = !isGalleryExpanded;
            
            if (isGalleryExpanded) {
                hiddenItems.forEach(item => {
                    item.classList.remove('hbm-hidden-item');
                    item.classList.add('hbm-was-hidden');
                });
                loadMoreBtn.innerHTML = 'SHOW LESS <i data-lucide="arrow-up"></i>';
            } else {
                hiddenItems.forEach(item => {
                    item.classList.add('hbm-hidden-item');
                    item.classList.remove('hbm-was-hidden');
                });
                loadMoreBtn.innerHTML = 'VIEW FULL GALLERY <i data-lucide="arrow-right"></i>';
                
                const gallerySection = document.querySelector('.hbm-gallery-section');
                if (gallerySection) {
                    gallerySection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
                lucide.createIcons();
            }
            
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter) {
                activeFilter.click();
            }
        });
    }

    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    let activeImages = [];
    let currentLightboxIndex = 0;

    function updateLightboxItems() {
        if (!lightbox) return;
        activeImages = Array.from(document.querySelectorAll('.portfolio-item.show img'));
    }
    
    if (lightbox && lightboxImg) {
        updateLightboxItems(); 

        items.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    currentLightboxIndex = activeImages.indexOf(img);
                    showLightbox(img.src);
                }
            });
        });

        function showLightbox(src) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function showNextImage() {
            if (activeImages.length === 0) return;
            currentLightboxIndex = (currentLightboxIndex + 1) % activeImages.length;
            lightboxImg.src = activeImages[currentLightboxIndex].src;
        }

        function showPrevImage() {
            if (activeImages.length === 0) return;
            currentLightboxIndex = (currentLightboxIndex - 1 + activeImages.length) % activeImages.length;
            lightboxImg.src = activeImages[currentLightboxIndex].src;
        }

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (nextBtn) nextBtn.addEventListener('click', showNextImage);
        if (prevBtn) prevBtn.addEventListener('click', showPrevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        });
    }

    // --- Video Lightbox ---
    const videoBtn = document.getElementById('hbm-video-btn');
    const videoLightbox = document.getElementById('video-lightbox');
    const videoCloseBtn = document.getElementById('video-lightbox-close');
    const videoFrame = document.getElementById('video-frame');

    if (videoBtn && videoLightbox && videoFrame) {
        videoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = videoBtn.getAttribute('data-video');
            if (videoUrl) {
                videoFrame.src = videoUrl;
                videoLightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        const closeVideoLightbox = () => {
            videoLightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            videoFrame.src = '';
        };

        if (videoCloseBtn) {
            videoCloseBtn.addEventListener('click', closeVideoLightbox);
        }

        videoLightbox.addEventListener('click', (e) => {
            if (e.target === videoLightbox) closeVideoLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (videoLightbox.classList.contains('active') && e.key === 'Escape') {
                closeVideoLightbox();
            }
        });
    }
});

