// 1. MANTÉN TU FUNCIÓN DE WHATSAPP (No la borres)
function irAWhatsApp(producto) {
    const telefono = "584248549244"; // Tu número configurado
    const mensaje = `Hola! Estoy interesada en el producto: ${producto}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// 2. EL NUEVO "TOQUE DE MAGIA" (Carga dinámica)
async function cargarProductos() {
    const contenedor = document.getElementById('catalogo-container'); 
    if(!contenedor) return; // Seguridad por si no encuentra el div

    contenedor.innerHTML = '<p style="text-align:center;">Cargando catálogo exclusivo...</p>';

    try {
        // Conexión con tu repositorio en GitHub
        const response = await fetch('https://api.github.com/repos/jesusortizc18-coder/renacer-web/contents/data/productos');
        const archivos = await response.json();

        contenedor.innerHTML = ''; // Limpiamos el mensaje de carga

        for (const archivo of archivos) {
            const resProducto = await fetch(archivo.download_url);
            const producto = await resProducto.json();

            // Dibujamos la tarjeta con los datos del JSON
            contenedor.innerHTML += `
                <div class="product-card">
                    <img src="${producto.image}" alt="${producto.title}">
                    <div class="product-info">
                        <h3>${producto.title}</h3>
                        <p class="categoria">${producto.categoria}</p>
                        ${producto.precio ? `<p class="precio">${producto.precio}</p>` : ''}
                        <button class="btn-primary" onclick="irAWhatsApp('${producto.title}')">
                            Consultar disponibilidad
                        </button>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error:", error);
        contenedor.innerHTML = '<p>Error al cargar los productos. Intenta más tarde.</p>';
    }
}

// 3. INICIAR TODO AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', cargarProductos);
