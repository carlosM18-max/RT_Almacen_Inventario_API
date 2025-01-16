import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Areas = db.define('tb_Areas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    abreviatura: {
        type: DataTypes.STRING(10),
        allowNull: true
    }

}, {
    timestamps: true
});

export default Areas;