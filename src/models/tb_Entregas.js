import { DataTypes } from "sequelize";
import db from "../config/db";

const Entregas = db.define("tb_Entregas", {
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
    estado: {
      type: DataTypes.ENUM("proceso", "entregado", "cancelado", "en inventario", "bajo resguardo"),
      allowNull: false,
      // Estado
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: false,
      // Observaciones
    },
    fotos_entrada: {
      type: DataTypes.STRING,
      allowNull: false,
      // Fotos de entrada
    },
    tipo: {
      type: DataTypes.ENUM("externo", "interno"),
      allowNull: false,
      // Tipo
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: true,
      // Ubicación
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
    id_articulos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // ID del bien
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