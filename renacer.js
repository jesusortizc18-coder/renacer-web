// 1. FUNCIÓN DE WHATSAPP MEJORADA
// Ahora recibe el nombre del producto y la URL de la imagen
function irAWhatsApp(producto, imagenUrl) {
    const telefono = "584248549244";
    
    // Construimos el mensaje con el link de la foto incluido
    const mensaje = `¡Hola! Estoy interesada en este producto:
    
⭐ *${producto}*
🖼️ Ver referencia: ${imagenUrl}

¿Podrías darme más información?`;

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// 2. CARGA DINÁMICA DESDE GITHUB
async function cargarProductos() {
    const contenedor = document.getElementById('catalogo-container'); 
    if(!contenedor) return;

    contenedor.innerHTML = '<p style="text-align:center;">Cargando catálogo exclusivo...</p>';

    try {
        const response = await fetch('https://api.github.com/repos/jesusortizc18-coder/renacer-web/contents/data/productos');
        const archivos = await response.json();

        contenedor.innerHTML = ''; 

        for (const archivo of archivos) {
            const resProducto = await fetch(archivo.download_url);
            const producto = await resProducto.json();

            // INSERTAMOS LOS DATOS. Nota el cambio en el 'onclick' del botón:
            contenedor.innerHTML += `
                <div class="product-card">
                    <img src="${producto.image}" alt="${producto.title}">
                    <div class="product-info">
                        <h3>${producto.title}</h3>
                        <p class="categoria">${producto.categoria}</p>
                        <p class="precio">${producto.precio || ''}</p>
                        <button class="btn-primary" onclick="irAWhatsApp('${producto.title}', '${producto.image}')">
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

// 3. INICIO AUTOMÁTICO
document.addEventListener('DOMContentLoaded', cargarProductos);
