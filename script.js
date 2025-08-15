document.addEventListener('DOMContentLoaded', () => {

    // 1. DEFINE ALL CONSTANTS
    const header = document.querySelector('header');
    const projectCardsAll = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalContainer = document.getElementById('project-modal-container');
    const closeModalButton = document.getElementById('modal-close');
    const backToTopButton = document.getElementById('back-to-top-btn');
    const revealElements = document.querySelectorAll('.reveal');
    const exitIntentOverlay = document.getElementById('exit-intent-overlay');
    const exitIntentCloseButton = document.getElementById('exit-intent-close');
    const magneticButtons = document.querySelectorAll('.cta-button');

    // 2. INITIALIZE ALL LOGIC
    
    // Header Scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Modals
    if (modalOverlay) {
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
    }

    // Back to Top Button
    if (backToTopButton) {
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
    }

    // Reveal on Scroll (Must run for content to be visible)
    if (revealElements.length > 0) {
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
    }

    // 3D Tilt for Project Cards
    projectCardsAll.forEach(card => {
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

    // Exit Intent Prompt
    if (exitIntentOverlay) {
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
    }
    
    // Magnetic Buttons
    if (magneticButtons.length > 0) {
        const magneticStrength = 0.4;
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                button.style.transform = `translate(${x * magneticStrength}px, ${y * magneticStrength}px) scale(1.05)`;
            });
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0,0) scale(1.05)';
                setTimeout(() => {
                    if (!button.matches(':hover')) {
                        button.style.transform = 'translate(0,0) scale(1)';
                    }
                }, 100);
            });
        });
    }

    // Universal Keyboard (ESC key) Support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modalOverlay && modalOverlay.classList.contains('active')) {
                modalOverlay.querySelector('.modal-close-button').click();
            }
            if (exitIntentOverlay && exitIntentOverlay.classList.contains('active')) {
                exitIntentOverlay.querySelector('.exit-intent-close').click();
            }
        }
    });
});
const canvas = document.getElementById('cloud-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let nodes = [];
        const numNodes = window.innerWidth > 768 ? 100 : 30; // Fewer nodes on mobile
        const edgeDistance = 150;
        const nodeBaseRadius = 2;
        const mouse = { x: null, y: null, radius: 150 };

        const colors = {
            node: 'rgba(150, 150, 150, 0.7)',
            edge: 'rgba(0, 113, 227, 0.15)',
            activeNode: 'rgba(0, 113, 227, 0.9)'
        };

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow drift
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = nodeBaseRadius + Math.random() * 2;
                this.opacity = 0;
            }

            update() {
                // Drift
                this.x += this.vx;
                this.y += this.vy;

                // Fade in/out logic
                if (this.opacity < 1) {
                    this.opacity += 0.01;
                }

                // Edge wrapping
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                const distToMouse = Math.hypot(this.x - mouse.x, this.y - mouse.y);
                const isActive = distToMouse < mouse.radius;

                ctx.fillStyle = isActive ? colors.activeNode : colors.node;
                ctx.globalAlpha = this.opacity;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
        }

        const init = () => {
            setCanvasSize();
            nodes = [];
            for (let i = 0; i < numNodes; i++) {
                nodes.push(new Node());
            }
        };

        const connect = () => {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                    if (dist < edgeDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = colors.edge;
                        ctx.globalAlpha = Math.min(nodes[i].opacity, nodes[j].opacity) * (1 - dist / edgeDistance);
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach(node => {
                node.update();
                node.draw();
            });
            connect();
            requestAnimationFrame(animate);
        };
        
        window.addEventListener('resize', init);
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        init();
        animate();
    }
});```
