import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Inventario = db.define("tb_Inventario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo_inventario: {
        type: DataTypes.ENUM('RTH', 'PG', 'GOB', 'NT', 'GA'),
        allowNull: false,
        // Tipo de inventario
    },
    numero_inventario: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        // Número de inventario
    },
    color: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // Color
    },
    material: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // Material
    },
    marca: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // Marca
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // Modelo
    },
    serie: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // Serie
    },
    tipo_posesion: {
        type: DataTypes.ENUM('inventario', 'Comodato'),
        allowNull: false,
        // Tipo de posesión
    },
    estado_bien: {
        type: DataTypes.ENUM('Nuevo', 'Bueno', 'Regular', 'Malo', 'Inservible'),
        allowNull: false,
        // Estado del bien
    },
    id_registrocontable: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        timestamps: true, // Agrega campos createdAt y updatedAt
    }
);
export default Inventario;