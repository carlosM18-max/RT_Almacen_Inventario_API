import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Proveedores = db.define("tb_Proveedores", {
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
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
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