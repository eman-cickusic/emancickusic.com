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

    // NEW: Modal Logic
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
                // Clear previous content
                modalContainer.innerHTML = '';
                // Inject new project's HTML
                modalContainer.appendChild(projectDataContainer.cloneNode(true));
                
                // Show the modal with animation
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scroll
    };

    closeModalButton.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
        // Close modal only if clicking on the overlay itself, not the content container
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Add keyboard support for closing the modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});
