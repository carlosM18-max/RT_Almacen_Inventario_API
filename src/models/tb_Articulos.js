import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Articulos = db.define("tb_Articulos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numero_factura: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_objetogasto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  importe_sin_iva: {
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