import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Proveedores = db.define("tb_Proveedores", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    // Nombre
    apellidos: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // Apellido Paterno
    },
    tipo_proveedor: {
        type: DataTypes.ENUM("Fisico", "Moral"),
        allowNull: false,
    },
    RFC: {
        type: DataTypes.STRING(20),
        allowNull: false,
        // RFC
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // Dirección
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    cuenta_bancaria: {
        type: DataTypes.STRING(20),
        allowNull: false,
        // Cuenta bancaria
    },
    archivos: {
        type: DataTypes.STRING,
        allowNull: false,
        // Archivo (PDF)
    },

},
    {
        timestamps: true
    }
);
export default Proveedores;