import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Bajas = db.define("tb_Bajas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
    // Fecha
  },
  estado_bien: {
    type: DataTypes.ENUM("Nuevo", "Bueno", "Regular", "Malo", "Inservible"), 
    allowNull: false,
    // Estado
  },
  ampara_baja: {
    type: DataTypes.BLOB,
    allowNull: false,
    // Archivo
  },
  solicitud_dictamen: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  id_inventario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // ID del inventario
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // ID del usuario
  }
}, {
  timestamps: true, // Agrega campos createdAt y updatedAt

});

export default Bajas;