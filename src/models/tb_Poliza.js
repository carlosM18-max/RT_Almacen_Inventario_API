import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Poliza = db.define("tb_Poliza", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        // Descripción del bien asegurado
    },
    cobertura: {
        type: DataTypes.STRING(255),
        allowNull: true,
        // Cobertura
    },
    tipo: {
        type: DataTypes.ENUM("Egresos", "Presupuestales", "Donaciones", "Cheques", "Ingresos", "Transferencias", "Retenciones", "Depositos"),
        allowNull: true,
        // Tipo: egresos, presupuestales, diario, cheques, ingresos
    },
    cantidad: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    calidad: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    deducible: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        // Deducible
    },
    limites_indemnizacion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        // Límites de indemnización
    },
    periodo_vigencia: {
        type: DataTypes.DATEONLY,
        allowNull: false
        // Periodo de vigencia
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    archivo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    prima: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        // Prima
    },
    clausulas_exclusion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        // Cláusulas de exclusión
    },
},
    {
        timestamps: true
    }
);

export default Poliza;