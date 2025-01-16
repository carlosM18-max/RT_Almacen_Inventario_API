import { DataTypes } from "sequelize";
import db from "../config/db";

export const Departamentos = db.define("tb_Departamentos", {
  // Campo `id` auto-incremental y clave primaria
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Campo `nombre` como cadena, no nulo
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Campo `abreviatura` como cadena de longitud máxima 5 caracteres, no nulo
  abreviatura: {
    type: DataTypes.CHAR(5),
    allowNull: false,
  },
  // Campo `estado` como entero, con valor por defecto 1, no nulo
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  // Campo `areaId` como entero, no nulo, con referencia a la tabla `Area`
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
export default Departamentos;