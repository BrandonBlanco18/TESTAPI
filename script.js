document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('formCliente');

  form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const email = document.getElementById('email').value;

      // Enviar los datos al servidor (usando fetch)
      fetch('http://localhost:2707/api/clientes', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre, apellido, email })
      })
      .then(response => response.json())
      .then(data => {
          console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });

  // Funciones para gestionar productos e inventario
  const productForm = document.getElementById('productForm');
  const transactionForm = document.getElementById('transactionForm');
  const inventoryTableBody = document.querySelector('#inventoryTable tbody');

  // Obtener productos del servidor
  async function obtenerProductos() {
      const response = await fetch('http://localhost:2707/api/productos');
      const productos = await response.json();
      productos.forEach(producto => agregarProductoATabla(producto));
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

      const nuevoProducto = {
          nombre: document.getElementById('nombreProducto').value,
          descripcion: document.getElementById('descripcionProducto').value,
          precio: document.getElementById('precioProducto').value,
          stock: document.getElementById('stockProducto').value,
          categoria: document.getElementById('categoriaProducto').value
      };

      const response = await fetch('http://localhost:2707/api/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoProducto)
      });

      const producto = await response.json();
      agregarProductoATabla(producto);
      productForm.reset();