import Personas from "../models/tb_Personas.js";
import path from "path";

export const getAllPersons = async (req, res) => {
    try {
        const personas = await Personas.findAll();
        res.status(200).json(personas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPersonbyId = async (req, res) => {
    try {
        const persona = await Personas.findByPk(req.params.id);
        if (persona) {
            res.status(200).json(persona);
        } else {
            res.status(404).json({ message: "Persona no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPerson = async (req, res) => {
    try {
        const {
            nombre,
            apellidos,
            numero_trabajador,
            email,
            departamento,
            RFC,
            CURP,
            direccion_pertenencia,
            organo_superior,
            area_presupuestal,
            cargo,
            nivel,
            fecha_registro
        } = req.body;

        // Obtener las rutas de los archivos
        const identificacion = req.files ? req.files.identificacion.map(file => file.path) : [];
        const imagen = req.files ? req.files.imagen.map(file => file.path) : [];

        console.log(req.body);
        console.log(req.files);

        const newperson = await Personas.create({
            nombre,
            apellidos,
            numero_trabajador,
            email,
            departamento,
            RFC,
            CURP,
            direccion_pertenencia,
            organo_superior,
            area_presupuestal,
            cargo,
            nivel,
            fecha_registro,
            identificacion: identificacion.join(';'),
            imagen: imagen.join(';')
        });

        res.status(201).json(newperson);
    } catch (error) {
        res.status(400).json({
            message: "Error al crear a la persona",
            error: error.message,
        });
    }
};

export const updatePerson = async (req, res) => {
    try {
        const updated = await Personas.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated[0] === 1) {
            const updatedPerson = await Personas.findByPk(req.params.id);
            res.json(updatedPerson);
        } else {
            res.status(404).json({ message: "Persona no encontrada" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar persona",
            error: error.message,
        });
    }
};

export const deletePerson = async (req, res) => {
    try {
        const deleted = await Personas.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.json({ message: "Persona eliminada exitosamente" });
        } else {
            res.status(404).json({ message: "Persona no encontrada" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar persona",
            error: error.message,
        });
    }
};