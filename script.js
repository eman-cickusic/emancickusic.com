document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Logic
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Modal Logic
    const projectCardsAll = document.querySelectorAll('.project-card'); // Use a different variable name to avoid conflict
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalContainer = document.getElementById('project-modal-container');
    const closeModalButton = document.getElementById('modal-close');

    projectCardsAll.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); 
            const projectNumber = card.getAttribute('data-project');
            const projectDataContainer = document.getElementById(`project-${projectNumber}-data`);
            
            if (projectDataContainer) {
                modalContainer.innerHTML = '';
                // Clone the content to avoid issues with event listeners
                modalContainer.appendChild(projectDataContainer.cloneNode(true));
                
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeModalButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // 3. Back to Top Button Logic
    const backToTopButton = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Reveal on Scroll Logic
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 5. NEW: 3D Tilt Effect for Project Cards
    const tiltCards = document.querySelectorAll('.project-card');

    tiltCards.forEach(card => {
        const maxTilt = 15; // Max tilt in degrees

        card.addEventListener('mousemove', (e) => {
            // This logic is only for the tilt effect, not the click event
            if (e.target.closest('.project-card') !== card) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X position relative to the card
            const y = e.clientY - rect.top;  // Mouse Y position relative to the card
            const width = rect.width;
            const height = rect.height;

            const rotateY = (x / width - 0.5) * 2 * maxTilt;
            const rotateX = (0.5 - y / height) * 2 * maxTilt;

            // Apply the tilt transform
            card.style.transition = 'transform 0.1s ease-out'; // Faster transition while hovering
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

            // Update CSS variables for the glare effect
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            // Reset the card to its original state
            card.style.transition = 'transform 0.4s ease-out'; // Slower, smoother transition on mouse out
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
});
