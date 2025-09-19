// Scroll Animation Effects
document.addEventListener('DOMContentLoaded', function() {
    // Create Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll(
        '.intro, .projects, .experience, .recommendations, .reachOutWrapper, .article22, .timeline-item, .testimonial-card, .wrapperIntro, .progWrapper'
    );

    // Add animation classes and observe elements
    elementsToAnimate.forEach((element, index) => {
        // Add staggered delay for multiple items of the same type
        const delay = (index % 3) * 0.1; // 0s, 0.1s, 0.2s stagger
        element.style.setProperty('--animation-delay', `${delay}s`);
        
        // Add initial state class
        element.classList.add('scroll-animate');
        
        // Start observing
        observer.observe(element);
    });

    // Special handling for project cards
    const projectCards = document.querySelectorAll('.article22');
    projectCards.forEach((card, index) => {
        card.style.setProperty('--animation-delay', `${index * 0.15}s`);
    });

    // Special handling for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--animation-delay', `${index * 0.2}s`);
    });

    // Special handling for skill progress bars
    const progressBars = document.querySelectorAll('.progWrapper');
    progressBars.forEach((bar, index) => {
        bar.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });

    // Special handling for testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.setProperty('--animation-delay', `${index * 0.3}s`);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.wrapper');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Navbar background on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Typewriter completion handler (glow effect removed)
    // const typewriter = document.querySelector('.typewriter');
    // if (typewriter) {
    //     setTimeout(() => {
    //         typewriter.classList.add('completed');
    //     }, 8000);
    // }

    // Counter animation when footer comes into view
    const counters = document.querySelectorAll('#clickCount, #scrollCount, #spacebarCount');
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('counter-animate');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        footerObserver.observe(counter);
    });
});