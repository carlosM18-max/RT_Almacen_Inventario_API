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
        type: DataTypes.FLOAT(11, 10),
        allowNull: false
    },
    deducible: {
        type: DataTypes.FLOAT(11, 10),
        allowNull: true,
        // Deducible
    },
    limites_indemnizacion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        // Límites de indemnización
    },
    periodo_vigencia: {
        type: DataTypes.DATE,
        allowNull: false
        // Periodo de vigencia
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    archivo: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    prima: {
        type: DataTypes.FLOAT(11, 10),
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