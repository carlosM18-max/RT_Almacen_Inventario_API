import Salidaexistencias from "../models/tb_Salidaexistencias.js";

export const getAllExistencias = async (req, res) => {
    try {
        const existencias = await Salidaexistencias.findAll();
        res.json(existencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getExistenciaById = async (req, res) => {
    try {
        const existencia = await Salidaexistencias.findByPk(req.params.id);
        if (existencia) {
            res.json(existencia);
        } else {
            res.status(404).json({ message: "Existencia no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createExistencia = async (req, res) => {
    try {
        const {
            direccion_solicitante,
            partida,
            unidad_medida,
            descripcion_material,
            cantidad_entregada,
            fecha_solicitud,
        } = req.body;
        const nuevaExistencia = await Salidaexistencias.create({
            direccion_solicitante,
            partida,
            unidad_medida,
            descripcion_material,
            cantidad_entregada,
            fecha_solicitud,
        });
        res.status(201).json(nuevaExistencia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateExistencia = async (req, res) => {
    try {
        const {
            direccion_solicitante,
            partida,
            unidad_medida,
            descripcion_material,
            cantidad_entregada,
            fecha_solicitud,
        } = req.body;
        const existencia = await Salidaexistencias.findByPk(req.params.id);
        if (existencia) {
            existencia.direccion_solicitante = direccion_solicitante;
            existencia.partida = partida;
            existencia.unidad_medida = unidad_medida;
            existencia.descripcion_material = descripcion_material;
            existencia.cantidad_entregada = cantidad_entregada;
            existencia.fecha_solicitud = fecha_solicitud;
            await existencia.save();
            res.json(existencia);
        } else {
            res.status(404).json({ message: "Existencia no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteExistencia = async (req, res) => {
    try {
        const deleted = await Salidaexistencias.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.json({ message: "Existencia eliminada exitosamente" });
        } else {
            res.status(404).json({ message: "Existencia no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};