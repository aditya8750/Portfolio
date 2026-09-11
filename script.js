// ===== SPACE STARFIELD ANIMATION ENGINE =====
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.2;
        this.alpha = Math.random();
        this.alphaSpeed = Math.random() * 0.015 + 0.005;
        this.speedY = Math.random() * 0.2 + 0.05;
    }

    update() {
        this.y -= this.speedY;
        if (this.y < 0) this.y = canvas.height;

        this.alpha += this.alphaSpeed;
        if (this.alpha > 1 || this.alpha < 0) {
            this.alphaSpeed = -this.alphaSpeed;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.alpha)})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

animateStars();

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===== EMAILJS FORM SUBMISSION HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        emailjs.sendForm('service_f5vslal', 'template_5qipqms', this)
            .then(() => {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
            }, (error) => {
                console.error('EmailJS Error:', error);
                alert('Failed to send message. Please try emailing directly at aditya8744sharma@gmail.com');
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            });
    });
}



const heroImgCard = document.querySelector('.hero-visual-img-wrapper');

if (heroImgCard) {
    heroImgCard.addEventListener('mousemove', (e) => {
        const rect = heroImgCard.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X position inside card
        const y = e.clientY - rect.top;  // Mouse Y position inside card
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt angles based on mouse distance from center
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        
        heroImgCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    // Reset card tilt when mouse leaves
    heroImgCard.addEventListener('mouseleave', () => {
        heroImgCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}