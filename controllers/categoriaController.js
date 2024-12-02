const Categoria = require('../categoria');

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const categoriaExistente = await Categoria.findOne({ nombre });
        if (categoriaExistente) {
            return res.status(400).json({ message: "La categoría ya existe" });
        }
        const nuevaCategoria = new Categoria({ nombre });
        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
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
        res.status(500).json({ message: "Error al obtener categorías", error: err });
    }
};

// Obtener una categoría por ID
exports.obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json(categoria);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener la categoría", error: err });
    }
};

// Actualizar una categoría por ID
exports.actualizarCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const categoria = await Categoria.findByIdAndUpdate(req.params.id, { nombre }, { new: true });
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json(categoria);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar la categoría", error: err });
    }
};

// Eliminar una categoría por ID
exports.eliminarCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json({ message: "Categoría eliminada" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar la categoría", error: err });
    }
};
