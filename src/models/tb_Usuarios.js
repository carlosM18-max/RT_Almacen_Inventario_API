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
    allowNull: false
    // numero de trabajador
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identificacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RFC: {
    type: DataTypes.STRING(13),
    allowNull: false,
  },
  CURP: {
    type: DataTypes.STRING(18),
    allowNull: false,
  },
  direcion_pertenencia: {
    type: DataTypes.ENUM("DIRECCIÓN GENERAL", "DIRECCIÓN DE COORDINACIÓN FINANCIERA Y PLANEACIÓN",
      "DIRECCIÓN DE TELEVISIÓN", "DIRECCIÓN DE NOTICIAS", "DIRECCIÓN DE RADIO", 
      "DIRECCIÓN DE INGENIERIA", "DIRECCIÓN DE PROYECTOS ESTRATEGICOS","ORGANO INTERNO DE CONTROL", 
      "DIRECCIÓN DE PROMOCIÓN E INTERCAMBIO", "DIRECCIÓN JURIDICA",
      "DIRECCIÓN DE VINCULACIÓN","IMAGEN","ESTACIONES DE RADIO "
    ), //pendiente
    allowNull: false
  },
  organo_superior: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ORGANISMOS DESCENTRALIZADOS'
    // Órgano superior (ORGANISMOS DESCENTRALIZADO)
  },
  area_presupuestal: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'RADIO Y TELEVICION DE HIDALGO'
    // Área presupuestal (DIRECCIÓN DE ADMINISTRACIÓN Y FINANZAS)
  },
  cargo: {
    type: DataTypes.ENUM("JEFE DE ÁREA A", "JEFE DE ÁREA B", "JEFE DE DEPARTAMENTO C",
      "SUBDIRECTOR A", "SUBDIRECTOR DE ÁREA C",
      "DIRECTOR DE ÁREA B", "DIRECTOR GENERAL A", "DIRECTOR GENERAL B", "SUBSECRETARIO A", "SECRETARIO В"),
    allowNull: false
  },
  imagen: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Usuarios;
