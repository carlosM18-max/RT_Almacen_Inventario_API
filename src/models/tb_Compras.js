import { DataTypes } from "sequelize";
import db from "../config/db";

const Compras = db.define("tb_compras", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cotizacion1: {
      type: DataTypes.STRING,// cotizacion
      allowNull: false,
    },
    cotizacion2: {
      type: DataTypes.STRING,// cotizacion
      allowNull: false,
    },
    cotizacion3: {
      type: DataTypes.STRING,// cotizacion
      allowNull: false,
    },
    cuadro_comparativo: {
      type: DataTypes.STRING, // cuadro comparativo 
      allowNull: false,
    },
    orden_compra: {
      type: DataTypes.STRING, //orden de compra
      allowNull: false,
    },
    id_factura: {
      type: DataTypes.INTEGER, // referenacia a factura
      allowNull: false,
    },
  });
  
  export default Compras;