// Finance Template JavaScript

// Ensure URL has http or https prefix
function ensureHttpPrefix(url) {
    if (!url) return '';
    return url.match(/^https?:\/\//) ? url : `https://${url}`;
}

// Fix all external links
function fixExternalLinks() {
    // Find all a tags with href attributes
    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip internal links (starting with # or /) and mailto/tel links
        if (!href || href.startsWith('#') || href.startsWith('/') || 
            href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
        }
        
        // Skip links that already have a protocol
        if (href.match(/^https?:\/\//)) {
            return;
        }
        
        // Add https:// prefix to external links
        link.setAttribute('href', `https://${href}`);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    handlePublicationLinks();
    initResearchInterestsAnimation();
    
    // Handle hamburger menu toggling
    const menuToggle = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.nav-links');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Fix external links
    fixExternalLinks();
}); 

// Initialize animations for page elements
function initAnimations() {
    // Animate on scroll for skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use the original width that was stored in the data attribute
                entry.target.style.width = entry.target.dataset.originalWidth;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        // Store the original width in a data attribute
        const originalWidth = bar.style.width;
        bar.dataset.originalWidth = originalWidth;
        // Set width to 0 initially
        bar.style.width = '0%';
        // Observe the element
        observer.observe(bar);
    });
    
    // Fade in animations for cards and sections
    const fadeElements = document.querySelectorAll('.experience-card, .project-card, .education-item, .publication-card, .teaching-card, .award-card, .skill-card, .contact-card');
    
    fadeElements.forEach(element => {
        element.classList.add('fade-element');
    });
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Handle publication links
function handlePublicationLinks() {
    const pubLinks = document.querySelectorAll('.publication-link');
    
    pubLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                alert('This would link to the publication in a real application.');
            } else if (href) {
                // Ensure external links have proper http prefix
                const fixedHref = ensureHttpPrefix(href);
                if (fixedHref !== href) {
                    link.setAttribute('href', fixedHref);
                }
            }
        });
    });
}

// Initialize animations for research interests
function initResearchInterestsAnimation() {
    const researchInterests = document.querySelectorAll('.research-interest');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    researchInterests.forEach(item => {
        item.classList.add('fade-element');
        observer.observe(item);
    });
}

// Add CSS for animations
document.head.appendChild(document.createElement('style')).textContent = `
    .fade-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`; 