const Producto = require('../productos'); 


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
        const productos = await Producto.find().populate('categoria'); // Asegúrate de que el campo `categoria` esté correctamente referenciado
        res.status(200).json(productos); // Devolver los productos con la información de la categoría
    } catch (err) {
        res.status(500).json({ message: "Error al obtener productos", error: err });
    }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByIdAndDelete(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar producto", error: err });
    }
};