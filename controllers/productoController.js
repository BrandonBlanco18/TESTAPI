const Producto = require('../productos');
const Categoria = require('../categoria');

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoriaNombre } = req.body;

        // Buscar la categoría por su nombre
        const categoria = await Categoria.findOne({ nombre: categoriaNombre });

        // Si no se encuentra la categoría, enviar un error
        if (!categoria) {
            return res.status(400).json({ message: "Categoría no encontrada" });
        }

        // Crear el producto con el ObjectId de la categoría encontrada
        const producto = new Producto({
            nombre,
            descripcion,
            precio,
            stock,
            categoria: categoria._id // Usamos el ObjectId de la categoría
        });

        await producto.save(); // Guardar el producto en la base de datos
        res.status(201).json(producto); // Responder con el producto creado
    } catch (err) {
        res.status(500).json({ message: "Error al crear el producto", error: err });
    }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('categoria'); // Popula la categoría asociada
        res.status(200).json(productos);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener productos", error: err });
    }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID del producto desde los parámetros de la URL
        const { nombre, descripcion, precio, stock, categoriaNombre } = req.body; // Datos para actualizar

        // Verificar si la categoría existe
        const categoria = await Categoria.findOne({ nombre: categoriaNombre });
        if (!categoria) {
            return res.status(400).json({ message: "Categoría no encontrada" });
        }

        // Actualizar el producto
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { nombre, descripcion, precio, stock, categoria: categoria._id }, // Nuevos valores
            { new: true } // Esta opción devuelve el producto actualizado
        );

        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json(productoActualizado); // Devolver el producto actualizado
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el producto", error: err });
    }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params; // ID del producto a eliminar
        const producto = await Producto.findByIdAndDelete(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar producto", error: err });
    }
};
