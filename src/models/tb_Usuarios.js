import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Usuarios = db.define("tb_Usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rol: {
    type: DataTypes.ENUM("Administrador", "Almacenes", "Inventario"),
    allowNull: true,
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
  password: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  confirmPassword: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  departamento: {
    type: DataTypes.STRING(50),
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
    defaultValue: 'RADIO Y TELEVICION DE HIDALGO'
    // Área presupuestal (DIRECCIÓN DE ADMINISTRACIÓN Y FINANZAS)
  },
  /* cargo: {
    type: DataTypes.ENUM("Jefe de Area A", "Jefe de Area B", "Jefe de Departamento C",
      "Subdirector A", "Subdirector de Area C",
      "Director de Area B", "Director General A", "Director General B",
      "Subsecretario A", "Secretario В"),
    allowNull: true,
  }, */
  fecha_registro: {
    type: DataTypes.DATE,
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
