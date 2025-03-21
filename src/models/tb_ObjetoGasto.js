import { DataTypes } from "sequelize";
import db from "../config/db.js";

// TODO: Tabla de ObjetoGastos terminada

const ObjetoGastos = db.define("tb_Objeto_Gastos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numero_partida: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
},
  {
    timestamps: false
  }
);

export default ObjetoGastos;