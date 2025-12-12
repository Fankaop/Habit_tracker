// HTMX event handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle HTMX after swap events
    document.body.addEventListener('htmx:afterSwap', function(evt) {
        // Re-initialize animations for new content
        initializeAnimations();

        // Update page title if needed
        const titleElement = evt.detail.target.querySelector('title');
        if (titleElement) {
            document.title = titleElement.textContent;
        }

        // Smooth scroll to top after content swap
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Handle HTMX before request
    document.body.addEventListener('htmx:beforeRequest', function(evt) {
        // Show loading state if needed
        const target = evt.detail.target;
        if (target) {
            target.style.opacity = '0.7';
        }
    });

    // Handle HTMX after request
    document.body.addEventListener('htmx:afterRequest', function(evt) {
        const target = evt.detail.target;
        if (target) {
            target.style.opacity = '1';
        }
    });

    // Initialize animations on page load
    initializeAnimations();

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 pointer-events-none z-50';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
            scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Light interactivity
    initializeInteractiveElements();

    // Initialize letter animation for title
    initializeLetterAnimation();
});

// Initialize animations for elements
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Stagger animations for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
    });
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple effect to buttons (optional)
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'absolute bg-white/30 rounded-full animate-ping';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.left = `${e.offsetX - 10}px`;
            ripple.style.top = `${e.offsetY - 10}px`;
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC to close modals or go back
        if (e.key === 'Escape') {
            // Implement modal close logic if needed
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}



// Initialize letter animation for the main title
function initializeLetterAnimation() {
    const titleElement = document.getElementById('main-title');
    if (titleElement && !titleElement.classList.contains('animated')) {
        const text = titleElement.textContent;
        titleElement.innerHTML = '';
        titleElement.classList.add('animated');

        // Split text into characters and wrap each in a span
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'letter';
            span.style.animationDelay = `${index * 0.1}s`;
            titleElement.appendChild(span);
        });
    }
}

// Export for potential use in other scripts
window.HabitTracker = {
    initializeAnimations,
    initializeInteractiveElements,
    initializeLetterAnimation
};
