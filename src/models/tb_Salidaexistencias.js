import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Salidaexistencias = db.define("tb_Salida_Existencias", {
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
        allowNull: false,
    },
    partida: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    unidad_medida: {
        type: DataTypes.ENUM("Pieza", "Paquete", "Caja", "Rollo", "Litro", "Metro", "Kilogramo"),
        allowNull: false,
    },
    descripcion_material: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cantidad_entregada: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fecha_solicitud: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
},
    {
        timestamps: true
    }
);

export default Salidaexistencias;