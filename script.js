document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    
    // Add shadow to header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Modal Logic
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

});
