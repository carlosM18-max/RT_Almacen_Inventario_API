import { DataTypes } from "sequelize";
import db from "../config/db";

const articulos = db.define(
    "tb_articulos",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        // nombre
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
        // marca
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false,
        // modelo
      },
      fecha_de_adquisición: {
        type: DataTypes.STRING,
        allowNull: true,
        // fecha de adquisición
      },
      número_de_serie: {
        type: DataTypes.STRING,
        allowNull: true,
        // número de serie
      },
      estado: {
        type: DataTypes.ENUM("reparacion", "en uso", "baja", "descompuesto"),
        allowNull: false,
        // estado
      },
      descripción: {
        type: DataTypes.TEXT,
        allowNull: false,
        // descripción
      },
      características: {
        type: DataTypes.TEXT,
        allowNull: false,
        // características
      },
      tipo: {
        type: DataTypes.ENUM("Insumos", "Bien"),
        // tipo
      },
      QR: {
        type: DataTypes.TEXT,
        allowNull: false,
        // QR
      },
      fotos_entrada: {
        type: DataTypes.STRING,
        allowNull: true,
        // fotos (hasta 5)
      },
      id_de_vida_util: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // id de vida útil
      },
      id_de_póliza: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // id de póliza
      },
      id_de_la_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // id de la factura
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default articulos;