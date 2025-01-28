import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Entregas = db.define("tb_entregas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  canticad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Cantidad
  },
  fecha_entrega: {
    type: DataTypes.DATE,
    allowNull: false,
    // Fecha de entrega
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    // Descripción
  },
  id_solicitud: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // ID de la solicitud
  },
  id_almacen: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // ID del almacén
  },
  id_inventario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // ID del inventario
  },
  id_usuario_entrega: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // ID del usuario que entrega
  },
  id_usuario_recibe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // ID del usuario que recibe
  }
});

export default Entregas;