import { DataTypes } from "sequelize";
import db from "../config/db";

const Politica = db.define("tb_Politica", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
        // Descripción del bien asegurado
    },
    cobertura: {
        type: DataTypes.STRING,
        allowNull: true,
        // Cobertura
    },
    tipo: {
        type: DataTypes.ENUM("egresos", "presupuestales", "diario", "cheques", "ingresos"),
        allowNull: true,
        // Tipo: egresos, presupuestales, diario, cheques, ingresos
    },
    prima: {
        type: DataTypes.FLOAT,
        allowNull: true,
        // Prima
    },
    deducible: {
        type: DataTypes.FLOAT,
        allowNull: true,
        // Deducible
    },
    limites_indemnizacion: {
        type: DataTypes.STRING,
        allowNull: true,
        // Límites de indemnización
    },
    periodo_vigencia: {
        type: DataTypes.DATE,
        allowNull: true,
        // Periodo de vigencia
    },
    clausulas_exclusion: {
        type: DataTypes.STRING,
        allowNull: true,
        // Cláusulas de exclusión
    },
    archivo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Politica;