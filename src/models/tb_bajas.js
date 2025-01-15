import { DataTypes } from "sequelize";
import db from "../config/db";

const Bajas = db.define("tb_Bajas", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
    type: DataTypes.ENUM("prestamo", "descompuesto", "descontinuación"),
    allowNull: true,
    // Tipo (préstamo, descompuesto, descontinuación)
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
    // Fecha
  },
  razon: {
    type: DataTypes.STRING,
    allowNull: true,
    // Razón
  },
  estado: {
    type: DataTypes.ENUM("Revisión","Aceptada","Rechazada"),
    allowNull: false,
    // Estado
  },
  alta_baja: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: 0

    // Alta/Baja
  },
  archivo:{
    type: DataTypes.STRING,
    allowNull: false,
    // Archivo
  },
  id_confirmacion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // ID de confirmación
  },
  id_solicitud_retiro: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // ID de solicitud de retiro
  },
  id_articulos: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // ID del bien
  },
  id_inventario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // ID del inventario
  },
  id_usuario:{
    type: DataTypes.INTEGER,
    allowNull: false,
    // ID del usuario
  }
}, {
  timestamps: true, // Agrega campos createdAt y updatedAt
  
});

export default Bajas;