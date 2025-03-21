import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// TODO: Tabla de Articulos terminada

const Articulos = db.define("tb_Articulos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_factura: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_objetogasto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  iva: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  importe_con_iva: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  unidad_medida: {
    type: DataTypes.ENUM("Piezas", "Paquetes", "Cajas", "Kilogramos", "Litros", "Metros", "Rollos", "Bultos"),
    allowNull: false,
  },
  total_ingreso: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  foto_articulo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default Articulos;