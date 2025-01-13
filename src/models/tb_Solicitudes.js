import { DataTypes } from "sequelize";
import db from "../config/db";

const Solicitudes = db.define("tb_solicitudes", {
    // Descripción del artículo solicitado
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Cantidad solicitada del artículo
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tipo:{
        type:DataTypes.ENUM("Insumo","Bien"),
        allowNull: true,
    },
    // Estado o situación del pedido
    estado: {
        type: DataTypes.ENUM("En Espera", "Aceptado", "Rechazado"),
        allowNull: false,
        defaultValue: "En Espera"
    },
    // Nombre del archivo asociado al pedido, si aplica
    archivo: {
        type: DataTypes.STRING, // Tipo de dato para el archivo, ajusta según necesites
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
    // Nombre o tipo del artículo solicitado
    id_articulo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // Número de almacen asociado al artículo
    id_numero_inventario: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // Número de inventario asociado al artículo
    id_numero_almacen: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // comentario
    comentario:{
    type:DataTypes.STRING,
    allowNull:true
    },
    // tipo de rechazo 
    tipo_rechazo:{
        type:DataTypes.ENUM("Falta de presupuesto","No planeado"),
        allowNull:true
    },
    // tipo de proyecto
    tipo_proyecto:{
        type:DataTypes.ENUM("Radio","Televisión"),
        allowNull:true
    },
    // propuesta de requicicion
    id_propuesta_requicicion:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    id_petición_de_padre: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },


});

export default Solicitudes;