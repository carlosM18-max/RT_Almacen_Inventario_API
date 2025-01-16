import { DataTypes } from "sequelize";
import db from "../config/db.js";

const ObjetoGastos = db.define(
  "tb_Objeto_Gastos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    capitulo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    concepto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gestion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    especifica: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    timestamps: true
  }
);

export default ObjetoGastos;