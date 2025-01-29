import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Almacenes = db.define("tb_Almacenes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo_adquisicion: {
    type: DataTypes.ENUM("Donacion", "Compra", "Como dato"),
    allowNull: false,
    // Tipo de alta (donación, compra, como dato)
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    // Nombre
  },
  fecha_entrega: {
    type: DataTypes.DATE,
    allowNull: false,
    // Fecha de entrada
  },
  fecha_salida: {
    type: DataTypes.DATE,
    allowNull: true,
    // Fecha de salida
  },
  tipo_activo: {
    type: DataTypes.ENUM("Mueble", "Inmueble"),
    allowNull: false,
    // Tipo de activo (mueble, inmueble)
  },
  codigo_armonizable: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    // Código armonizable relacion con objeto de gasto
  },
  registro_contable: {
    type: DataTypes.STRING,
    allowNull: false,
    // Cuenta contable
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Cantidad
  },
  locacion: {
    type: DataTypes.ENUM("Pendiete"),
    allowNull: false,
    // Locación lleva in enum de locaciones
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    // Estatus
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
    // Motivo
  },
  // Orden de entrega
  orden_entrega: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  id_inventario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Número de inventario
  },
  id_factura: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // ID de la factura
  },
  id_solictud: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // ID de la solicitud
  },
  id_poliza: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // ID de la póliza
  }
},
  {
    timestamps: true, // Agrega campos createdAt y updatedAt
  }
);

export default Almacenes;
