document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    
    // Add shadow to header on scroll for depth
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Modal Logic
    const projectCards = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalContainer = document.getElementById('project-modal-container');
    const closeModalButton = document.getElementById('modal-close');

    projectCards.forEach(card => {
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // NEW: Back to Top Button Logic
    const backToTopButton = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        // Show button if page is scrolled more than 400px
        if (window.scrollY > 400) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
