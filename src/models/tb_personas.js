import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// TODO: Tabla de Personas terminada

const Personas = db.define("tb_Personas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  apellidos: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  numero_trabajador: {
    type: DataTypes.INTEGER(6),
    allowNull: true,
    // numero de trabajador
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
  },
  departamento: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  identificacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  RFC: {
    type: DataTypes.STRING(13),
    allowNull: true,
  },
  CURP: {
    type: DataTypes.STRING(18),
    allowNull: true,
  },
  direccion_pertenencia: {
    type: DataTypes.ENUM("Direccion General", "Direccion de Coordinacion Financiera Y Planeacion",
      "Direccion de Television", "Direccion de Noticias", "Direccion de Radio",
      "Direccion de Ingenieria", "Direccion de Proyectos Estrategicos", "Organo Interno de Control",
      "Direccion de Promocion e Intercambio", "Direccion Juridica",
      "Direccion de Vinculacion", "Imagen", "Estaciones de Radio", "Estaciones de Television",
    ), //pendiente
    allowNull: true,
  },
  organo_superior: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Organismos Desentralizados'
    // Órgano superior (ORGANISMOS DESCENTRALIZADO)
  },
  area_presupuestal: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Radio Y Television de Hidalgo'
    // Área presupuestal (DIRECCIÓN DE ADMINISTRACIÓN Y FINANZAS)
  },
  cargo: {
    type: DataTypes.ENUM("Jefe de Area A", "Jefe de Area B", "Jefe de Departamento C",
      "Subdirector A", "Subdirector de Area C",
      "Director de Area B", "Director General A", "Director General B",
      "Subsecretario A", "Secretario В"),
    allowNull: true,
  },
  nivel: {
    type: DataTypes.ENUM("007", "89A", "89B", "09C", "10A", "10B", "10C", "11A", "11B", "11C",
      "11S", "12S", "12A", "12B", "13A", "13B", "13S", "1S3", "1A3", "14S", "14B", "015"),
    allowNull: true,
  },
  fecha_registro: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},
  {
    timestamps: true
  }
);
export default Personas;