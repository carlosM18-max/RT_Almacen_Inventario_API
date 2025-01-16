import { DataTypes } from "sequelize";
import db from "../config/db";

const Cargas = db.define("tb_Cargas", {
  // Campo `id` auto-incremental y clave primaria
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Campo `name` como cadena, no nulo
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Campo `status` como entero, con valor por defecto 1, no nulo
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});
export default Cargas;