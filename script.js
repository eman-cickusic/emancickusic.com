document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    
    // Add shadow to header on scroll for depth
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Modal Logic (Enhanced for Accessibility) ---
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.modal');
    let lastFocusedElement; // Variable to store the last focused element

    // Function to open a modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            lastFocusedElement = document.activeElement; // Save focus
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            modal.querySelector('.close-button').focus(); // Move focus to the close button
        }
    }

    // Function to close all modals
    function closeModal() {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
        if (lastFocusedElement) {
            lastFocusedElement.focus(); // Restore focus
        }
    }

    // Add click event to each project card
    projectCards.forEach(card => {
        // Make card focusable and operable with Enter key
        card.setAttribute('tabindex', '0'); 
        
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            openModal(modalId);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const modalId = card.getAttribute('data-modal');
                openModal(modalId);
            }
        });
    });

    // Add click event to all close buttons
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal if user clicks outside the content area
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Close modal on 'Escape' key press and trap focus
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
        
        // Focus trapping inside modal
        const activeModal = document.querySelector('.modal[style*="display: block"]');
        if (activeModal && event.key === 'Tab') {
            const focusableElements = activeModal.querySelectorAll('a[href], button, [tabindex="0"], input, textarea, select');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) { // if shift + tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else { // if tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        }
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.4 // 40% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const navLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                
                // Remove active class from all links first
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to the correct link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
