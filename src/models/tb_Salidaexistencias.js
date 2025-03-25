import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Salidaexistencias = db.define("tb_Salidaexistencias", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    direccionsolicitante: {
        type: DataTypes.ENUM("Direccion General", "Direccion de Coordinacion Financiera Y Planeacion",
            "Direccion de Television", "Direccion de Noticias", "Direccion de Radio",
            "Direccion de Ingenieria", "Direccion de Proyectos Estrategicos", "Organo Interno de Control",
            "Direccion de Promocion e Intercambio", "Direccion Juridica",
            "Direccion de Vinculacion", "Imagen", "Estaciones de Radio", "Estaciones de Television",
          ),
        allowNull: false,
    },
    partida: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    unidadmedida: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    descripcionmaterial: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cantidadentregada: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fechasolicitud: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
    {
        timestamps: true
    }
);

export default Salidaexistencias;