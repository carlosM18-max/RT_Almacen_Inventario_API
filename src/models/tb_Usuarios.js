import { DataTypes } from "sequelize";
import db from "../config/db";

const Usuarios = db.define("tb_usuarios", {
    numero_trabajador:{
      type:DataTypes.INTEGER(6),
      allowNull:false
      // numero de trabajador
    },
    inscripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo:{
      type: DataTypes.ENUM("almacen","inventario","rh","admin","comun","economia"),
      allowNull:false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        isEmail: true,
      },
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
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    area_presupuestal: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'RADIO Y TELEVISION'
      // Área presupuestal (RADIO Y TELEVISION)
    },
    organo_superior: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ORGANISMOS DESCENTRALIZADO'
      // Órgano superior (ORGANISMOS DESCENTRALIZADO)
    },
    id_cargo:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    id_departamento:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    timestamps: true, 
    freezeTableName: true,
  });
  
  export default Usuarios;