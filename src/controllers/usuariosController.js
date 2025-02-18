import Usuarios from "../models/tb_Usuarios.js";
import path from "path";

export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener usuarios",
            error: error.message,
        });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuarios.findByPk(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener usuario",
            error: error.message,
        });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const {
            rol,
            numero_trabajador,
            nombre,
            apellidos,
            password,
            confirm_password,
            departamento,
            email,
            RFC,
            CURP,
            direccion_pertenencia,
            organo_superior,
            area_presupuestal,
            fecha_registro
        } = req.body;

        // Obtener las rutas de los archivos
        const identificacion = req.files ? req.files.identificacion[0].path : null;
        const imagen = req.files ? req.files.imagen[0].path : null;

        console.log(req.body); // Verifica los datos recibidos
        console.log(req.files); // Verifica los archivos recibidos

        if (!rol || !numero_trabajador || !nombre || !apellidos || !password || !confirm_password || !email) {
            return res.status(400).json({ message: "Los campos obligatorios son: rol, numero_trabajador, nombre, apellidos, password, confirm_password, email" });
        }

        const newUsuario = await Usuarios.create({
            rol,
            numero_trabajador,
            nombre,
            apellidos,
            password,
            confirm_password,
            departamento,
            email,
            RFC,
            CURP,
            direccion_pertenencia,
            organo_superior,
            area_presupuestal,
            fecha_registro,
            identificacion,
            imagen
        });

        res.status(201).json(newUsuario);
    } catch (error) {
        res.status(400).json({
            message: "Error al crear usuario",
            error: error.message,
        });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const updated = await Usuarios.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated[0] === 1) {
            const updatedUsuario = await Usuarios.findByPk(req.params.id);
            res.json(updatedUsuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar usuario",
            error: error.message,
        });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const deleted = await Usuarios.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.json({ message: "Usuario eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar usuario",
            error: error.message,
        });
    }
};