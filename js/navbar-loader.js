// Cargar la navbar automáticamente en todas las páginas excepto index
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si no estamos en index.html
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isIndexPage = currentPage === 'index.html' || currentPage === '';
    
    if (!isIndexPage) {
        // Agregar Font Awesome si no está ya cargado
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fontAwesomeLink = document.createElement('link');
            fontAwesomeLink.rel = 'stylesheet';
            fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
            document.head.appendChild(fontAwesomeLink);
        }
        
        // Cargar la navbar desde el archivo externo
        fetch('components/navbar.html')
            .then(response => response.text())
            .then(data => {
                // Insertar la navbar al inicio del body
                document.body.insertAdjacentHTML('afterbegin', data);
                
                // Marcar la página actual
                markCurrentPage();
                
                // Inicializar el menú móvil después de cargar la navbar
                initMobileMenu();
            })
            .catch(error => console.error('Error cargando navbar:', error));
    } else {
        // Si estamos en index
        markCurrentPage();
        initMobileMenu();
    }
});

// Función para marcar la página actual en el menú
function markCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active-page');
        }
    });
}

// Función para inicializar el menú móvil
function initMobileMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const navMenu = document.getElementById('navMenu');
    
    console.log('Inicializando menú móvil...', { menuIcon, navMenu });
    
    if (menuIcon && navMenu) {
        // Remover event listeners previos si existen
        const newMenuIcon = menuIcon.cloneNode(true);
        menuIcon.parentNode.replaceChild(newMenuIcon, menuIcon);
        
        // Toggle del menú al hacer clic en el ícono
        newMenuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            console.log('Click en menú, estado actual:', isActive);
            
            if (isActive) {
                navMenu.classList.remove('active');
                newMenuIcon.textContent = '☰';
            } else {
                navMenu.classList.add('active');
                newMenuIcon.textContent = '✕';
            }
            
            console.log('Nuevo estado:', navMenu.classList.contains('active'));
        });

        // Cerrar el menú al hacer clic en cualquier link
        const navLinks = navMenu.querySelectorAll('.nav-links');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Click en link:', link.textContent);
                // Permitir la navegación antes de cerrar
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    newMenuIcon.textContent = '☰';
                }, 50);
            });
        });

        // Cerrar el menú al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnMenuIcon = newMenuIcon.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnMenuIcon && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                newMenuIcon.textContent = '☰';
            }
        });
        
        console.log('Menú móvil inicializado correctamente');
    } else {
        console.error('No se encontraron elementos del menú:', { menuIcon, navMenu });
    }
}

// Actualizar el menú cuando cambie el tamaño de la ventana
window.addEventListener('resize', function() {
    // Cerrar el menú si se cambia a desktop
    const navMenu = document.getElementById('navMenu');
    if (window.innerWidth > 960 && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const menuIcon = document.getElementById('menuIcon');
        if (menuIcon) menuIcon.textContent = '☰';
    }
});
