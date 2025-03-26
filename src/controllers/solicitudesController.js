import Solicitudes from "../models/tb_Solicitudes.js";
import Articulos from "../models/tb_Articulos.js";

export const getAllSolicitudes = async (req, res) => {
    try {
        const solicitudes = await Solicitudes.findAll();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las solicitudes", error: error.message });
    }
};

export const getSolicitudById = async (req, res) => {
    try {
        const solicitud = await Solicitudes.findByPk(req.params.id);
        if (solicitud) {
            res.json(solicitud);
        } else {
            res.status(404).json({ error: "Solicitud no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la solicitud", error: error.message });
    }
};

export const createSolicitud = async (req, res) => {
    try {
        const {
            numero_solicitud,
            direccion_solicitante,
            id_articulo,
            cantidad_entregada,
        } = req.body;

        // Verificar si el artículo existe
        const articulo = await Articulos.findByPk(id_articulo);
        if (!articulo) {
            return res.status(404).json({ message: "Artículo no encontrado o no existente" });
        }

        const newSolicitud = await Solicitudes.create({
            numero_solicitud,
            direccion_solicitante,
            id_articulo,
            cantidad_entregada,
        });
        res.status(201).json(newSolicitud);
    } catch (error) {
        res.status(400).json({
            message: "Error al crear la solicitud",
            error: error.message
        })
    }
};

export const updateSolicitud = async (req, res) => {
    try {
        const solicitud = await Solicitudes.findByPk(req.params.id);

        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada" });
        }

        const {
            numero_solicitud,
            direccion_solicitante,
            id_articulo,
            cantidad_entregada,
        } = req.body;

        await solicitud.update({
            numero_solicitud,
            direccion_solicitante,
            id_articulo,
            cantidad_entregada,
        });

        res.json({message: "Solicitud actualizada exitosamente", solicitud});
    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar la solicitud",
            error: error.message,
        });
    }
};

export const deleteSolicitud = async (req, res) => {
    try {
        const solicitud = await Solicitudes.findByPk(req.params.id);
        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada" });
        }
        await solicitud.destroy();
        res.json({ message: "Solicitud eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la solicitud", error: error.message });
    }
};