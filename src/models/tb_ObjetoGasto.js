import { DataTypes } from "sequelize";
import db from "../config/db.js";

const ObjetoGastos = db.define("tb_Objeto_Gastos", {
  id_partida: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // se relaciona con el codigo armonizado de la tabla de almacenes
  },
  capitulo: {
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