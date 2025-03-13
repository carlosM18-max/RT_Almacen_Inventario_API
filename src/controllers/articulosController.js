import Articulos from "../models/tb_Articulos.js";
import ObjetoGastos from "../models/tb_ObjetoGasto.js";
import path from "path";
import fs from "fs";

export const getAllArticulos = async (req, res) => {
    try {
        const articulos = await Articulos.findAll();
        res.json(articulos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los articulos", error: error.message });
    }
};

export const getArticulosById = async (req, res) => {
    try {
        const articulo = await Articulos.findByPk(req.params.id);
        if (articulo) {
            res.json(articulo);
        } else {
            res.status(404).json({ message: "Articulo no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el articulo", error: error.message });
    }
};

export const createArticulo = async (req, res) => {
    try {
        const {
            numero_factura,
            id_objetogasto, 
            nombre,
            importe_sin_iva,
            iva,
            importe_con_iva,
            cantidad,
            unidad_medida,
            total_ingreso
        } = req.body;

        // Verificar si un objeto de gasto existe
        const objetoGasto = await ObjetoGastos.findByPk(id_objetogasto);
        if (!objetoGasto) {
            return res.status(400).json({ message: "El objeto de gasto no existe" });
        }

        // Verificar si se han subido archivos
        const foto_articulo = req.files ? req.files.foto_articulo.map(file => file.path) : [];
        console.log(req.body);
        console.log(req.files);

        const newArticulo = await Articulos.create({
            numero_factura,
            id_objetogasto, //foranea
            nombre,
            importe_sin_iva,
            iva,
            importe_con_iva,
            cantidad,
            unidad_medida,
            total_ingreso,
            foto_articulo: foto_articulo.join(';'),
        });

        res.status(201).json(newArticulo);
    } catch (error) {
        res.status(400).json({
            message: "Error al crear el articulo",
            error: error.message,
        });
    }
};

export const updateArticulo = async (req, res) => {
    try {
        const articulo = await Articulos.findByPk(req.params.id);

        if (!articulo) {
            return res.status(404).json({ message: "Articulo no encontrado" });
        }

        const {
            numero_factura,
            id_objetogasto,
            nombre,
            importe_sin_iva,
            iva,
            importe_con_iva,
            cantidad,
            unidad_medida,
            total_ingreso
        } = req.body;

        let archivos = articulo.foto_articulo;
        let archivosAntiguos = archivos ? archivos.split(';') : []; 

        if (req.files && req.files.foto_articulo) {
            // Si hay nuevos archivos, actualizamos la ruta
            archivos = req.files.foto_articulo.map(file => file.path).join(';');

            // Eliminamos los archivos antiguos
            archivosAntiguos.forEach(filePath => {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }

        await articulo.update({
            numero_factura,
            id_objetogasto,
            nombre,
            importe_sin_iva,
            iva,
            importe_con_iva,
            cantidad,
            unidad_medida,
            total_ingreso,
            foto_articulo: archivos,
        });

        res.json({ message: "Articulo actualizado correctamente", articulo });
    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar el articulo",
            error: error.message,
        });
    }
};

export const deleteArticulo = async (req, res) => {
    try {
        const deleted = await Articulos.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.json({ message: "Articulo eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Articulo no encontrado" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el articulo",
            error: error.message,
        });
    }
};

export const deleteArticuloArchivo = async (req, res) => {
    try {
        const { id } = req.params;
        const { fileName } = req.body;

        // Buscamos por el ID
        const articulo = await Articulos.findByPk(id);

        if (!articulo) {
            return res.status(404).json({ message: "Articulo no encontrado" });
        }

        // lista de los archivos
        let archivosActuales = articulo.foto_articulo ? articulo.foto_articulo.split(';') : [];

        // Buscar el archivo por su nombre
        const archivoAEliminar = archivosActuales.find(file => file.includes(fileName));

        if (!archivoAEliminar) {
            return res.status(404).json({ message: "Archivo no encontrado" });
        }

        // Eliminar el archivo
        if (fs.existsSync(archivoAEliminar)) {
            fs.unlinkSync(archivoAEliminar);
        }

        // Eliminar la ruta del archivo existente
        archivosActuales = archivosActuales.filter(file => !file.includes(fileName));

        // Actualizar la BD con las nuevas rutas
        await articulo.update({ foto_articulo: archivosActuales.join(';') });

        res.status(200).json({
            message: "Archivo eliminado exitosamente",
            archivos: archivosActuales
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al eliminar el archivo",
            error: error.message,
        });
    }
};

export const addArticuloArchivo = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscamos por el ID
        const articulo = await Articulos.findByPk(id);

        if (!articulo) {
            return res.status(404).json({ message: "Articulo no encontrado" });
        }

        // Lista de los archivos
        let archivosActuales = articulo.foto_articulo ? articulo.foto_articulo.split(';') : [];

        // Agregar nuevos archivos a los que ya existen
        if (req.files?.foto_articulo && req.files.foto_articulo.length > 0) {
            const nuevosArchivos = req.files.foto_articulo.map(file => file.path);
            archivosActuales = [...archivosActuales, ...nuevosArchivos];
        }

        // Actualizar la BD con las nuevas rutas
        await articulo.update({ foto_articulo: archivosActuales.join(';') });

        res.json({
            message: "Archivos agregados correctamente",
            archivos: archivosActuales,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al agregar los archivos",
            error: error.message,
        });
    }
};
