import { DataTypes } from 'sequelize';
import db from '../config/db';

const Almacenes = db.define(
    "tb_almacenes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
        tipo_adquisicion: {
        type: DataTypes.ENUM("Donación", "Compra", "intercambio", "producción propia", "adjudicación","RTH" ),

        allowNull: false,
        // Tipo de alta (donación, compra, como dato)
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        // Nombre
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        // Descripción
      },
      tipo: {
        type: DataTypes.ENUM("Insumos", "Bien"),
        allowNull: false,
        // Tipo (insumo, bien)
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
        type: DataTypes.ENUM("mueble", "inmueble"),
        allowNull: false,
        // Tipo de activo (mueble, inmueble)
      },
      codigo_armonizable: {
        type: DataTypes.STRING,
        allowNull: false,
        // Código armonizable
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
        type: DataTypes.STRING,
        allowNull: false,
        // Locación
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        // Estatus
      },
      numero_serie: {
        type: DataTypes.STRING,
        allowNull: false,
        // Número de serie
      },
      numero_almacen: {
        type: DataTypes.STRING,
        allowNull: false,
        // Número de almacén
      },
      numero_inventario: {
        type: DataTypes.STRING,
        allowNull: false,
        // Número de inventario
      },
      motivo: {
        type: DataTypes.STRING,
        allowNull: false,
        // Motivo
      },
      tipo_resguardo: {
        type: DataTypes.ENUM("almacen", "inventario"),
        allowNull: false,
        // Tipo de resguardo (almacen, inventario)
      },
      id_articulo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // ID del artículo
      },
      id_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // ID de la factura
      },
      id_poliza: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // ID de la póliza
      },
      // Orden de entrega
      orden_entrega:{
        type:DataTypes.STRING,
        allowNull:false
      }
    },
    {
      timestamps: true, // Agrega campos createdAt y updatedAt
    }
  );
  
  export default Almacenes;
