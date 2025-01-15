import { DataTypes } from "sequelize";
import db from "../config/db";

const Vida_util = db.define("tb_vida_util", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cuenta: {
      type: DataTypes.STRING,
      allowNull: false,
      // cuenta
    },
    id_partida: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // partida
    },
    concepto: {
      type: DataTypes.STRING,
      allowNull: false,
      // concepto
    },
    años_de_vida_util: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // vida útil en años
    },
    porcentaje_depreciacion_mensual: {
      type: DataTypes.FLOAT,
      allowNull: false,
      // porcentaje de depreciación mensual
    },
    porcentaje_depreciacion_anual: {
      type: DataTypes.FLOAT,
      allowNull: false,
      // porcentaje de depreciación anual
    },
  }, {
    timestamps: true,
  });
  
  export default Vida_util;