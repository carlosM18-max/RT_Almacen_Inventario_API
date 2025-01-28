import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Solicitudes = db.define("tb_Solicitudes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // Descripción del artículo solicitado
    Cantidad_Solicitar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Unidad_Medida:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Cantidad solicitada del artículo

    archivo: {
        type: DataTypes.BLOB, // Tipo de dato para el archivo, ajusta según necesites
        allowNull: true, // Dependiendo si siempre se incluye un archivo o no
    },
    // ID del usuario que aprueba el pedido
    id_usuario_aprobador: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // ID del usuario que realiza la solicitud
    id_usuario_solicitud: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_almacen: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
},
    {
        timestamps: true
    }
);

export default Solicitudes;