import Usuarios from "../models/tb_Usuarios.js";
import Personas from "../models/tb_Personas.js";

// TODO: Controlador de Usuarios terminado

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
        const { id_persona, rol, password } = req.body;

        // Verificar si la persona existe
        const persona = await Personas.findByPk(id_persona);
        if (!persona) {
            return res.status(400).json({ message: "La persona no existe" });
        }

         // Establecer la variable de sesión @usuario_email
        const usuarioEmail = req.user?.email || "correo-no-disponible";
        await db.query(`SET @usuario_email = '${usuarioEmail}';`);

        const newUsuario = await Usuarios.create({
            id_persona,
            rol,
            password,
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
