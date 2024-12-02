const Categoria = require('../categoria'); // Importa el modelo de Categoria

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
    try {
        const { nombre } = req.body; // Obtén el nombre de la categoría desde la solicitud
        
        // Verifica si la categoría ya existe
        const categoriaExistente = await Categoria.findOne({ nombre });
        if (categoriaExistente) {
            return res.status(400).json({ message: "La categoría ya existe" });
        }
        
        // Crea y guarda la nueva categoría
        const nuevaCategoria = new Categoria({ nombre });
        await nuevaCategoria.save();

        res.status(201).json(nuevaCategoria); // Devuelve la categoría creada
    } catch (err) {
        res.status(500).json({ message: "Error al crear la categoría", error: err });
    }
};

// Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener las categorías", error: err });
    }
};
