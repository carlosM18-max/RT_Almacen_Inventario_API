import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Solicitudes = db.define("tb_Solicitudes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad_solicitar: {
        type: DataTypes.INTEGER(50),
        allowNull: true,
    },
    unidad_medida: {
        type: DataTypes.INTEGER(50),
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    archivo: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
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