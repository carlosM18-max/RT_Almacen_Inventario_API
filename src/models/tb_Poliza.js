import { DataTypes } from "sequelize";
import db from "../config/db.js";

// TODO: Tabla de Polizas terminada

const Poliza = db.define("tb_Poliza", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numero_poliza: {
        type: DataTypes.STRING(255),
        allowNull: true,
        // Cobertura
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        // Descripción del bien asegurado
    },
    tipo: {
        type: DataTypes.ENUM("Egresos", "Presupuestales", "Donaciones", "Cheques", "Ingresos", "Transferencias", "Retenciones", "Depositos"),
        allowNull: true,
        // Tipo: egresos, presupuestales, diario, cheques, ingresos
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    archivo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
},
    {
        timestamps: true
    }
);

export default Poliza;