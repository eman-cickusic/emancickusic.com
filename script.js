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
});
