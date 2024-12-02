document.addEventListener("DOMContentLoaded", function() {
    const formCliente = document.getElementById('formCliente');
  
    // Manejo del formulario de clientes
    formCliente.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
  
        if (!nombre || !apellido || !email) {
            return alert("Todos los campos son obligatorios.");
        }
  
        try {
            const response = await fetch('http://localhost:2707/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, email })
            });
  
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
  
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            alert('Cliente creado con éxito');
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al crear el cliente.');
        }
    });
  
    // Funciones para gestionar productos e inventario
    const productForm = document.getElementById('productForm');
    const inventoryTableBody = document.querySelector('#inventoryTable tbody');
  
    // Obtener productos del servidor
    async function obtenerProductos() {
        try {
            const response = await fetch('http://localhost:2707/api/productos');
            if (!response.ok) throw new Error('Error al obtener productos');
  
            const productos = await response.json();
            productos.forEach(producto => agregarProductoATabla(producto));
        } catch (error) {
            console.error('Error al obtener productos:', error);
            alert('No se pudieron cargar los productos.');
        }
    }
  
    // Agregar un producto a la tabla
    function agregarProductoATabla(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td>${producto.categoria.nombre}</td>
            <td>
                <button class="btn btn-danger" onclick="eliminarProducto('${producto._id}')">Eliminar</button>
            </td>
        `;
        inventoryTableBody.appendChild(row);
    }
  
    // Enviar nuevo producto al servidor
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const nombreProducto = document.getElementById('nombreProducto').value;
        const descripcionProducto = document.getElementById('descripcionProducto').value;
        const precioProducto = parseFloat(document.getElementById('precioProducto').value);
        const stockProducto = parseInt(document.getElementById('stockProducto').value);
        const categoriaProducto = document.getElementById('categoriaProducto').value;
  
        if (!nombreProducto || !descripcionProducto || isNaN(precioProducto) || isNaN(stockProducto) || !categoriaProducto) {
            return alert("Todos los campos son obligatorios y deben tener un formato válido.");
        }
  
        const nuevoProducto = {
            nombre: nombreProducto,
            descripcion: descripcionProducto,
            precio: precioProducto,
            stock: stockProducto,
            categoria: categoriaProducto
        };
  
        try {
            const response = await fetch('http://localhost:2707/api/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto)
            });
  
            if (!response.ok) throw new Error('Error al crear el producto');
  
            const producto = await response.json();
            agregarProductoATabla(producto);
            alert('Producto creado con éxito');
            productForm.reset(); // Limpiar formulario
        } catch (error) {
            console.error('Error al crear el producto:', error);
            alert('Hubo un error al crear el producto.');
        }
    });
  
    // Llamada inicial para cargar los productos en la tabla
    obtenerProductos();
  });
  