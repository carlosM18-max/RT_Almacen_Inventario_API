import Departamentos from "../models/tb_Departamentos.js";

export const getAllDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamentos.findAll();
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDepartamentoById = async (req, res) => {
    try {
        const departamento = await Departamentos.findByPk(req.params.id);
        if (departamento) {
            res.json(departamento);
        } else {
            res.status(404).json({ message: 'Departamento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createDepartamento = async (req, res) => {
    try {
        const { nombre, abreviatura, estado, id_area } = req.body;
        const newDepartamento = await Departamentos.create({ nombre, abreviatura, estado, id_area });
        res.status(201).json(newDepartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDepartamento = async (req, res) => {
    try {
        const { nombre, abreviatura, estado, id_area } = req.body;
        const updated = await Departamentos.update(
            { nombre, abreviatura, estado, id_area },
            { where: { id: req.params.id } }
        );
        if (updated[0] === 1) {
            const updatedDepartamento = await Departamentos.findByPk(req.params.id);
            res.json(updatedDepartamento);
        } else {
            res.status(404).json({ message: 'Departamento no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteDepartamento = async (req, res) => {
    try {
        const deleted = await Departamentos.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Departamento eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Departamento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};