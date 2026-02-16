// 1. FUNCIÓN DE WHATSAPP 
function irAWhatsApp(producto) {
    const telefono = "584248549244"; 
    const mensaje = `Hola! Estoy interesada en el producto: ${producto}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// 2. CARGA DINÁMICA DESDE GITHUB
async function cargarProductos() {
    const contenedor = document.getElementById('catalogo-container'); 
    if(!contenedor) return;

    contenedor.innerHTML = '<p style="text-align:center;">Cargando catálogo exclusivo...</p>';

    try {
        // Asegúrate de que el link de tu repo tenga la 'c' en jesusortizc18
        const response = await fetch('https://api.github.com/repos/jesusortizc18-coder/renacer-web/contents/data/productos');
        const archivos = await response.json();

        contenedor.innerHTML = ''; 

        for (const archivo of archivos) {
            const resProducto = await fetch(archivo.download_url);
            const producto = await resProducto.json();

            // Dibujamos la tarjeta volviendo al 'onclick' original de un solo dato
            contenedor.innerHTML += `
                <div class="product-card">
                    <img src="${producto.image}" alt="${producto.title}">
                    <div class="product-info">
                        <h3>${producto.title}</h3>
                        <p class="categoria">${producto.categoria}</p>
                        <p class="precio">${producto.precio || ''}</p>
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

// 3. INICIO AUTOMÁTICO
document.addEventListener('DOMContentLoaded', cargarProductos);
