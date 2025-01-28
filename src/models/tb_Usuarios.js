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
    validate: {
      isEmail: true,
    },
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
    type: DataTypes.ENUM("DIRECTOR GENERAL",
      "ASISTENTE DE LA DIRECCIÓN GENERAL",
      "AUXILIAR DEL DEPARTAMENTO DE LA DIRECCIÓN GENERAL",
      "RECEPCIÓN ENTRADA PRINCIPAL",
      "DIRECCIÓN DE COORDINACIÓN FINANCIERA Y PLANEACIÓN",
      "DIR. DE COORD. FINANCIERA Y PLAN.",
      "SUBDIRECTORA DE PLANEACIÓN",
      "SUBDIRECTOR DE ADMINISTRACIÓN",
      "AUXILIAR DIR. DE COORD. FINANCIERA Y PLAN.",
      "RECURSOS HUMANOS",
      "SERVICIOS GENERALES",
      "ALMACÉN",
      "ARCHIVO",
      "TECNOLOGÍAS DE LA INFORMACIÓN",
      "DIRECCIÓN DE TELEVISIÓN",
      "SUBDIRECTOR DE CONTENIDOS",
      "ENCARGADA DE DTO. DE PLAN.",
      "POSTPRODUCCIÓN DE TELEVISIÓN",
      "ASISTENTE DE DIRECCIÓN DE TELEVISIÓN",
      "ENCARGADA DE DEPARTAMENTO DE VIDEOTECA",
      "ENCARGADO DE ÁREA DE DEPORTES",
      "ISLA EDICIÓN DE TELEVISIÓN",
      "CABINA DE VIDEO MASTER",
      "DIRECCIÓN DE NOTICIAS",
      "DIRECTORA DE NOTICIAS",
      "SUBDIRECTORA DE NOTICIAS",
      "ASISTENTE DE REDACCIÓN DE NOTICIAS",
      "ENCARGADO DE LA ISLA DE NOTICIAS",
      "REPORTERO",
      "REPORTERA",
      "DIRECCIÓN DE RADIO",
      "DIRECTOR DE RED ESTATAL DE RADIO",
      "SECRETARIA PARTICULAR DIR. RADIO",
      "RADIO PRODUCCIÓN",
      "SUBDIRECTOR DE RADIO",
      "GERENTE DE RADIO",
      "SUB. COORD. DE NOTICIAS DE RADIO",
      "CABINA DE GRABACIÓN",
      "DIRECCIÓN DE INGENIERÍA",
      "DIRECTOR DE INGENIERÍA",
      "SUB. DE INGENIERÍA",
      "ESTACIÓN TERRENA",
      "AULA DE MEDIOS",
      "CENTRAL DE APARATOS",
      "DIRECCIÓN DE PROYECTOS ESTRATÉGICOS",
      "DIRECTOR DE PROYECTOS ESTRATÉGICOS",
      "SUBDIRECTOR DE CONTENIDOS",
      "ÓRGANO INTERNO DE CONTROL",
      "TITULAR DEL ÓRGANO INTERNO DE RADIO Y TELEVISIÓN DE H.",
      "CONTRALORÍA",
      "DIRECCIÓN DE PROMOCIÓN E INTERCAMBIO",
      "DIRECTOR DE PROMOCIÓN E INTERCAMBIO",
      "JEFE DE OFICINA",
      "DIRECCIÓN JURÍDICA",
      "DIRECTOR JURÍDICO",
      "DIRECCIÓN DE VINCULACIÓN",
      "DIRECTOR DE VINCULACIÓN",
      "SUBDIRECTORA IMAGEN",
      "SUBDIRECTOR DE IMAGEN",
      "ESTACIONES DE RADIO",
      "ESTACIÓN DE RADIO JACALA",
      "ESTACIÓN DE RADIO TLANCHINOL",
      "ESTACIÓN DE RADIO HUEJUTLA",
      "RED ESTATAL DE RADIO"
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
