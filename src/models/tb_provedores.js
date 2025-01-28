import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Proveedores = db.define(
    "tb_Proveedores",
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        // Nombre
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false,
            // Apellido Paterno
        },
        tipo_proveedor: {
        type: DataTypes.ENUM("Persona Física", "Persona Moral"),
        allowNull: false,
        },
        rfc: {
        type: DataTypes.STRING,
        allowNull: false,
        // RFC
        },
        direccion: {
        type: DataTypes.TEXT,
        allowNull: false,
        // Dirección
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El teléfono no puede estar vacío"
                },
                isNumeric: {
                    msg: "El teléfono debe contener solo números"
                },
                len: {
                    args: [10, 15],
                    msg: "El teléfono debe tener entre 10 y 15 caracteres"
                }
            },
            // Teléfono
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El email no puede estar vacío"
                },
                isEmail: {
                    msg: "Debe ser un email válido"
                }
            },
            // Email
        },
        cuenta_bancaria: {
        type: DataTypes.STRING,
        allowNull: false,
        // Cuenta bancaria
        },
        archivo_acuerdo: {
        type: DataTypes.BLOB,
        allowNull: false,
        // Archivo (PDF)
        },

    },
    {
        timestamps: true
    }
    );
    export default Proveedores;