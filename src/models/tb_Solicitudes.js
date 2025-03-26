import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Solicitudes = db.define("tb_Solicitudes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    direccion_solicitante: {
        type: DataTypes.ENUM("Direccion General", "Direccion de Coordinacion Financiera Y Planeacion",
            "Direccion de Television", "Direccion de Noticias", "Direccion de Radio",
            "Direccion de Ingenieria", "Direccion de Proyectos Estrategicos", "Organo Interno de Control",
            "Direccion de Promocion e Intercambio", "Direccion Juridica",
            "Direccion de Vinculacion", "Imagen", "Estaciones de Radio", "Estaciones de Television",
        ),
        allowNull: true,
    },
    id_articulo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_entregada: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    numero_solicitud: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
},
    {
        timestamps: true
    }
);

export default Solicitudes;