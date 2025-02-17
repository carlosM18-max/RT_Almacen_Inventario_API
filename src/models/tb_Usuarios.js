import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Usuarios = db.define("tb_Usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numero_trabajador: {
    type: DataTypes.INTEGER(6),
    allowNull: true,
    // numero de trabajador
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  apellidos: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
  },
  clave: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  // identificacion: {
  //   type: DataTypes.STRING(13),
  //   allowNull: true,
  // },
  RFC: {
    type: DataTypes.STRING(13),
    allowNull: true,
  },
  CURP: {
    type: DataTypes.STRING(18),
    allowNull: true,
  },
  direcion_pertenencia: {
    type: DataTypes.ENUM("DIRECCIÓN GENERAL", "DIRECCIÓN DE COORDINACIÓN FINANCIERA Y PLANEACIÓN",
      "DIRECCIÓN DE TELEVISIÓN", "DIRECCIÓN DE NOTICIAS", "DIRECCIÓN DE RADIO",
      "DIRECCIÓN DE INGENIERIA", "DIRECCIÓN DE PROYECTOS ESTRATEGICOS", "ORGANO INTERNO DE CONTROL",
      "DIRECCIÓN DE PROMOCIÓN E INTERCAMBIO", "DIRECCIÓN JURIDICA",
      "DIRECCIÓN DE VINCULACIÓN", "IMAGEN", "ESTACIONES DE RADIO "
    ), //pendiente
    allowNull: true,
  },
  organo_superior: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'ORGANISMOS DESCENTRALIZADOS'
    // Órgano superior (ORGANISMOS DESCENTRALIZADO)
  },
  area_presupuestal: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'RADIO Y TELEVICION DE HIDALGO'
    // Área presupuestal (DIRECCIÓN DE ADMINISTRACIÓN Y FINANZAS)
  },
  cargo: {
    type: DataTypes.ENUM("JEFE DE ÁREA A", "JEFE DE ÁREA B", "JEFE DE DEPARTAMENTO C",
      "SUBDIRECTOR A", "SUBDIRECTOR DE ÁREA C",
      "DIRECTOR DE ÁREA B", "DIRECTOR GENERAL A", "DIRECTOR GENERAL B", "SUBSECRETARIO A", "SECRETARIO В"),
    allowNull: true,
  },
  // imagen: {
  //   type: DataTypes.BLOB("long"),
  //   allowNull: true,
  // },
},
  {
    timestamps: true,
  }
);

export default Usuarios;
