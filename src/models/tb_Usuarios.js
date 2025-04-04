import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Personas from "./tb_Personas.js";

// TODO: Tabla de Usuarios terminada

const Usuarios = db.define("tb_Usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_persona: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Personas,
      key: 'id'
    }
  },
  rol: {
    type: DataTypes.ENUM("Administrador", "Inventario", "Almacenes", "Usuario"),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },

},
  {
    timestamps: true,
  }
);

export default Usuarios;
