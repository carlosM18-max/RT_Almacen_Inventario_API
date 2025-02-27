import Proveedores from "../models/tb_Provedores.js";
import path from "path";

export const getAllProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedores.findAll();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener proveedores",
            error: error.message,
        });
    }
};

export const getProveedorById = async (req, res) => {
    try {
        const proveedor = await Proveedores.findByPk(req.params.id);
        if (proveedor) {
            res.json(proveedor);
        } else {
            res.status(404).json({ message: "Proveedor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener proveedor",
            error: error.message,
        });
    }
};

export const createProveedor = async (req, res) => {
    try {
        const {
            nombre,
            apellidos,
            tipo_proveedor,
            RFC,
            direccion,
            telefono,
            email,
            cuenta_bancaria
        } = req.body;

        // Obtener las rutas de los archivos
        const archivos = req.files ? req.files.archivos.map(file => file.path) : [];
        console.log(req.body);
        console.log(req.files);

        const newProveedor = await Proveedores.create({
            nombre,
            apellidos,
            tipo_proveedor,
            RFC,
            direccion,
            telefono,
            email,
            cuenta_bancaria,
            archivos: archivos.join(';'),
        });

        res.status(201).json(newProveedor);
    } catch (error) {
        res.status(400).json({
            message: "Error al crear el proveedor",
            error: error.message,
        });
    }
};

export const updateProveedor = async (req, res) => {
    try {
        const updated = await Proveedores.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated[0] === 1) {
            const updatedProveedor = await Proveedores.findByPk(req.params.id);
            res.json(updatedProveedor);
        } else {
            res.status(404).json({ message: "Proveedor no encontrado" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar el proveedor",
            error: error.message,
        });
    }
};

export const deleteProveedor = async (req, res) => {
    try {
        const deleted = await Proveedores.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.json({ message: "Proveedor eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Proveedor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el proveedor",
            error: error.message,
        });
    }
};