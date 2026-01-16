// Menu toggle
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.getElementById('navMenu');

console.log('Script.js cargado - Elementos del menú:', { menuIcon, navMenu });

if (menuIcon && navMenu) {
    // Remover event listeners previos
    const newMenuIcon = menuIcon.cloneNode(true);
    menuIcon.parentNode.replaceChild(newMenuIcon, menuIcon);
    
    // Toggle del menú al hacer clic en el ícono
    newMenuIcon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = navMenu.classList.contains('active');
        console.log('Click en menú (index), estado:', isActive);
        
        if (isActive) {
            navMenu.classList.remove('active');
            newMenuIcon.textContent = '☰';
        } else {
            navMenu.classList.add('active');
            newMenuIcon.textContent = '✕';
        }
    });

    // Cerrar el menú al hacer clic en cualquier link
    const navLinks = navMenu.querySelectorAll('.nav-links');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Click en link:', link.textContent);
            // Permitir la navegación antes de cerrar
            setTimeout(() => {
                navMenu.classList.remove('active');
                newMenuIcon.textContent = '☰';
            }, 50);
        });
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnMenuIcon = newMenuIcon.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnMenuIcon && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            newMenuIcon.textContent = '☰';
        }
    });
    
    console.log('Menú inicializado en index.html');
}

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
    { id: 1, nombre: 'Brian', edad: 5, imagen: 'images/brian.jpg', descripcion: 'Brian es un niño alegre y curioso que sueña con aprender, crecer y necesita educación y apoyo emocional.' },
    { id: 2, nombre: 'Juliana', edad: 5, imagen: 'images/juliana.jpg', descripcion: 'Juliana, con su risa contagiosa y su imaginación sin límites, es una niña de 5 años con un corazón lleno de sueños que necesita educación y desarrollo integral.' },
    { id: 3, nombre: 'Ángel Valeriano', edad: 7, imagen: 'images/angel.jpg', descripcion: 'Ángel, a sus 7 años, vive en una comunidad donde la pobreza es una realidad cotidiana y necesita educación integral y apoyo emocional.' }
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

// Animaciones en scroll para nuevas secciones
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// Observar elementos con clase .animate-on-scroll
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    animateObserver.observe(element);
});

// Observar tarjetas de alianzas
document.querySelectorAll('.alianza-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    animateObserver.observe(card);
});

// Modal de imagen
function openImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const carouselImg = document.getElementById('carouselImage');
    
    if (modal && modalImg && carouselImg) {
        modalImg.src = carouselImg.src;
        modalImg.alt = carouselImg.alt;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});
