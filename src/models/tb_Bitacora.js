import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Bitacora = db.define("tb_Bitacora", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tabla: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  operacion: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  descrpcion: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  usuario_responsable: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  timestamps: false,
});

export default Bitacora;