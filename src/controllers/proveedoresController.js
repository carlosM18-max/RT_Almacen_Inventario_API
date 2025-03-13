import Proveedores from "../models/tb_Proveedores.js";
import path from "path";
import fs from "fs";

// TODO: Controlador de Proveedores terminado

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
        const proveedor = await Proveedores.findByPk(req.params.id);

        if (!proveedor) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

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

        let archivos = proveedor.archivos; // Rutas actuales de los archivos
        let archivosAntiguos = archivos ? archivos.split(';') : []; // Convertimos en array

        if (req.files && req.files.archivos) {
            // Si hay nuevos archivos, actualizamos la ruta
            archivos = req.files.archivos.map(file => file.path).join(';');

            // Eliminamos los archivos antiguos
            archivosAntiguos.forEach(filePath => {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // Elimina el archivo
                }
            });
        }

        // Actualizamos la BD con los nuevos datos
        await proveedor.update({
            nombre,
            apellidos,
            tipo_proveedor,
            RFC,
            direccion,
            telefono,
            email,
            cuenta_bancaria,
            archivos, // Nueva ruta de archivos
        });

        res.json({ message: "Proveedor actualizado correctamente", proveedor });
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

export const getProveedorArchivos = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el proveedor por su ID
        const proveedor = await Proveedores.findByPk(id);

        if (!proveedor) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        // Obtener la lista de archivos
        const archivos = proveedor.archivos ? proveedor.archivos.split(';') : [];

        res.json({
            id: proveedor.id,
            archivos: archivos,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los archivos del proveedor",
            error: error.message,
        });
    }
};

export const deleteProveedorArchivo = async (req, res) => {
    try {
        const { id } = req.params;
        const { fileName } = req.body;

        // Buscar el proveedor por su ID
        const proveedor = await Proveedores.findByPk(id);

        if (!proveedor) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        // Obtener la lista actual de archivos
        let archivosActuales = proveedor.archivos ? proveedor.archivos.split(';') : [];

        // Buscar el archivo por su nombre
        const archivoAEliminar = archivosActuales.find(file => file.includes(fileName));

        if (!archivoAEliminar) {
            return res.status(404).json({ message: "Archivo no encontrado" });
        }

        // Eliminar el archivo del sistema de archivos
        if (fs.existsSync(archivoAEliminar)) {
            fs.unlinkSync(archivoAEliminar); // Eliminar el archivo
        }

        // Eliminar la ruta del archivo de la lista
        archivosActuales = archivosActuales.filter(file => !file.includes(fileName));

        // Actualizar la BD con la nueva lista de archivos
        await proveedor.update({ archivos: archivosActuales.join(';') });

        res.json({
            message: "Archivo eliminado correctamente",
            archivos: archivosActuales,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al eliminar el archivo del proveedor",
            error: error.message,
        });
    }
};

export const addProveedorArchivos = async (req, res) => {
    try {
        const { id } = req.params;
        

        // Buscar el proveedor por su ID
        const proveedor = await Proveedores.findByPk(id);

        if (!proveedor) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        // Obtener la lista actual de archivos
        let archivosActuales = proveedor.archivos ? proveedor.archivos.split(';') : [];

        // Si hay nuevos archivos, agregarlos a la lista existente
        if (req.files?.archivos) {
            const nuevosArchivos = req.files.archivos.map(file => file.path);
            archivosActuales = [...archivosActuales, ...nuevosArchivos];
        }

        // Actualizar la BD con los nuevos archivos
        await proveedor.update({ archivos: archivosActuales.join(';') });

        res.json({
            message: "Archivos agregados correctamente",
            archivos: archivosActuales,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al agregar archivos al proveedor",
            error: error.message,
        });
    }
};