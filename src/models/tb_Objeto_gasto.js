import { DataTypes } from "sequelize";
import db from "../config/db"; 

const Objetogastos = db.define(
    "tb_objeto_gasto",
    {
        capitulo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      concepto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gestion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      especifica: {
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
      timestamps: true, 
      freezeTableName: true 
    }
  );
  
  export default Objetogastos;