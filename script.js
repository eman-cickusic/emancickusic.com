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

    // 2. Modal Logic (Variables defined here for global use)
    const projectCardsAll = document.querySelectorAll('.project-card');
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

    // 5. 3D Tilt Effect for Project Cards
    const tiltCards = document.querySelectorAll('.project-card');
    tiltCards.forEach(card => {
        const maxTilt = 15;
        card.addEventListener('mousemove', (e) => {
            if (e.target.closest('.project-card') !== card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;
            const rotateY = (x / width - 0.5) * 2 * maxTilt;
            const rotateX = (0.5 - y / height) * 2 * maxTilt;
            card.style.transition = 'transform 0.1s ease-out';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s ease-out';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // 6. Exit Intent Prompt Logic
    const exitIntentOverlay = document.getElementById('exit-intent-overlay');
    const exitIntentCloseButton = document.getElementById('exit-intent-close');
    let exitIntentPromptShown = false;

    const showExitIntentPrompt = () => {
        if (!exitIntentPromptShown && !modalOverlay.classList.contains('active')) {
            exitIntentOverlay.classList.add('active');
            exitIntentPromptShown = true;
        }
    };

    const closeExitIntentPrompt = () => {
        exitIntentOverlay.classList.remove('active');
    };

    document.body.addEventListener('mouseout', (e) => {
        if (e.clientY <= 0) {
            showExitIntentPrompt();
        }
    });

    exitIntentCloseButton.addEventListener('click', closeExitIntentPrompt);
    exitIntentOverlay.addEventListener('click', (e) => {
        if (e.target === exitIntentOverlay) {
            closeExitIntentPrompt();
        }
    });

    // 7. Universal Keyboard (ESC key) Support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modalOverlay.classList.contains('active')) {
                closeModal();
            }
            if (exitIntentOverlay.classList.contains('active')) {
                closeExitIntentPrompt();
            }
        }
    });
});
