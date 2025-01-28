import Solicitudes from "../models/tb_Solicitudes.js";

export const getAllSolicitudes = async (req, res) => {
    try {
        const solicitudes = await Solicitudes.findAll();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
};

export const createSolicitud = async (req, res) => {
    uploadRequest.single("archivo")(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        try {
            const { file, body } = req;
            const newSolicitud = await Solicitudes.create({
                ...body,
                archivo: file ? file.filename : null,
            });
            res.status(201).json(newSolicitud);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
};

export const updateSolicitud = async (req, res) => {
    upload.single("archivo")(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        try {
            const { file, body } = req;
            const updated = await Solicitudes.update(
                {
                    ...body,
                    archivo: file ? file.filename : null,
                },
                {
                    where: { id: req.params.id },
                }
            );
            if (updated[0] === 1) {
                const updatedSolicitud = await Solicitudes.findByPk(req.params.id);
                res.json(updatedSolicitud);
            } else {
                res.status(404).json({ message: "Solicitud no encontrada" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

export const deleteSolicitud = async (req, res) => {
    try {
        const deleted = await Solicitudes.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: "Solicitud eliminada exitosamente" });
        } else {
            res.status(404).json({ message: "Solicitud no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};