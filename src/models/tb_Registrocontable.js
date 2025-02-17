import { DataTypes } from "sequelize";
import db from "../config/db.js";

const RegistroContable = db.define("tb_Registro_Contable", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // Nombre
    },
    cuenta: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // cuenta 
    },
    sup_cuenta: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // cuenta 
    },
    clasificador: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // clasificador
    },
},
    {
        timestamps: true
    }
);
export default RegistroContable;