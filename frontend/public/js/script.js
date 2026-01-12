// Menu toggle
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.getElementById('navMenu');

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuIcon.style.color = navMenu.classList.contains('active') ? '#dc2626' : '#fff';
    });
}

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-links');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (menuIcon) {
            menuIcon.style.color = '#fff';
        }
    });
});

// Scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.mvv-card, .equipo-card, .impacto-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Carrusel Home
const niñosData = [
    { id: 1, nombre: 'Juan', edad: 8, imagen: 'images/juan.jpg', descripcion: 'Juan necesita educación y apoyo emocional para cumplir sus sueños de ser ingeniero.' },
    { id: 2, nombre: 'María', edad: 6, imagen: 'images/maria.jpg', descripcion: 'María sueña con ser doctora y necesita oportunidades para desarrollar su potencial.' },
    { id: 3, nombre: 'Carlos', edad: 10, imagen: 'images/carlos.jpg', descripcion: 'Carlos es un líder natural de su comunidad que necesita educación integral.' }
];

let currentSlide = 0;

function nextSlide() {
    currentSlide = (currentSlide + 1) % niñosData.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + niñosData.length) % niñosData.length;
    updateCarousel();
}

function updateCarousel() {
    const niño = niñosData[currentSlide];
    if (document.getElementById('carouselImage')) {
        document.getElementById('carouselImage').src = niño.imagen;
        document.getElementById('carouselName').textContent = niño.nombre;
        document.getElementById('carouselAge').textContent = `📅 ${niño.edad} años`;
        document.getElementById('carouselDesc').textContent = niño.descripcion;
        document.getElementById('carouselNameBtn').textContent = niño.nombre;
        document.getElementById('carouselCurrent').textContent = currentSlide + 1;
    }
}

// Auto-update carrusel si existe
if (document.getElementById('carouselImage')) {
    updateCarousel();
}
