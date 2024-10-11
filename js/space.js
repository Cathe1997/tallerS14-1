document.getElementById('btnBuscar').addEventListener('click', () => {
    const query = document.getElementById('inputBuscar').value;
    if (query) {
        buscarImagenes(query);
    } else {
        alert('Por favor ingrese un término de búsqueda');
    }
});

function buscarImagenes(query) {
    const url = `https://images-api.nasa.gov/search?q=${query}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarResultados(data.collection.items);
    })
    .catch(error => {
        console.error('Error al buscar imágenes:', error);
    });
}

function mostrarResultados(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';

    items.forEach(item => {
        const { title, description, date_created } = item.data[0];
        const imageUrl = item.links && item.links[0].href;
    if (imageUrl) {
        // Crea un div para la columna de Bootstrap haciendolo responsivo
        const col = document.createElement('div');
        col.classList.add('col-lg-3', 'col-md-6', 'col-sm-12', 'mb-4');
        const tarjeta = crearTarjeta(imageUrl, title, description, date_created);
        col.appendChild(tarjeta);
        contenedor.appendChild(col);
        }
    });
}

function crearTarjeta(imagen, titulo, descripcion, fecha) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card', 'mb-4');
    tarjeta.style.minWidth = '250px';
    tarjeta.style.height = '400px'; 

    tarjeta.innerHTML = `
        <img src="${imagen}" class="card-img-top" alt="${titulo}" style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${titulo}</h5>
            <div class="descripcion-container" style="flex-grow: 1; overflow-y: auto; max-height: 80px;">
            <p class="card-text">${descripcion || 'Sin descripción disponible'}</p>
            </div>
            <p class="card-text"><small class="text-muted">Fecha: ${new Date(fecha).toLocaleDateString()}</small></p>
        </div>
        `;

    return tarjeta;
}