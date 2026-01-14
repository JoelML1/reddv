// Footer Loader - Carga el footer en todas las páginas excepto index.html
document.addEventListener('DOMContentLoaded', function() {
    // Solo cargar footer si no estamos en index.html
    const isIndexPage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/');
    
    if (!isIndexPage) {
        // Cargar Font Awesome si no está cargado
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fontAwesomeLink = document.createElement('link');
            fontAwesomeLink.rel = 'stylesheet';
            fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
            document.head.appendChild(fontAwesomeLink);
        }
        
        fetch('components/footer.html?v=' + new Date().getTime())
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el footer');
                }
                return response.text();
            })
            .then(data => {
                // Insertar el footer antes del cierre del body
                document.body.insertAdjacentHTML('beforeend', data);
                console.log('Footer cargado correctamente');
            })
            .catch(error => {
                console.error('Error al cargar el footer:', error);
            });
    }
});
