const Inventario = require('../models/inventario');
const Producto = require('../models/producto');

// Registrar entrada o salida de inventario
exports.registrarTransaccion = async (req, res) => {
    const { producto, cantidad, tipo } = req.body;
    try {
        const productoDb = await Producto.findById(producto);
        if (!productoDb) return res.status(404).json({ message: 'Producto no encontrado' });

        let nuevoStock;
        if (tipo === 'entrada') {
            nuevoStock = productoDb.stock + cantidad;
        } else if (tipo === 'salida') {
            if (productoDb.stock < cantidad) {
                return res.status(400).json({ message: 'No hay suficiente stock' });
            }
            nuevoStock = productoDb.stock - cantidad;
        } else {
            return res.status(400).json({ message: 'Tipo de transacción no válido' });
        }

        // Actualizar stock del producto
        productoDb.stock = nuevoStock;
        await productoDb.save();

        // Registrar la transacción en inventario
        const transaccion = new Inventario({ producto, cantidad, tipo });
        await transaccion.save();

        res.json({ message: 'Transacción registrada correctamente', transaccion });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la transacción', error });
    }
};

// Obtener el historial de inventario
exports.getInventario = async (req, res) => {
    try {
        const inventarios = await Inventario.find().populate('producto');
        res.json(inventarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el inventario', error });
    }
};
