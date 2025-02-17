import { DataTypes } from "sequelize";
import db from "../config/db.js";

const VidaUtil = db.define("tb_Vida_Util", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cuenta: {
    type: DataTypes.STRING(255),
    allowNull: false,
    // cuenta
  },
  id_partida: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // partida
  },
  concepto: {
    type: DataTypes.STRING(255),
    allowNull: false,
    // concepto
  },
  años_de_vida_util: {
    type: DataTypes.INTEGER(50),
    allowNull: false,
    // vida útil en años
  },
  porcentaje_depreciacion_mensual: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    // porcentaje de depreciación mensual
  },
  porcentaje_depreciacion_anual: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    // porcentaje de depreciación anual
  },
},
  {
    timestamps: true,
  }
);

export default VidaUtil;