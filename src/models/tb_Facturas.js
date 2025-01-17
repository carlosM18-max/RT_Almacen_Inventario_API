import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Facturas = db.define("tb_Facturas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numero_de_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Número de factura
    },
    tipo_compra: {
        type: DataTypes.ENUM("Adjudicación", "Licitacion", "Donación", "Convenio", "Intercambio"),
        allowNull: false,
        // Tipo de compra
    },
    concepto: {
        type: DataTypes.STRING,
        allowNull: false,
        // Concepto
    },
    iva: {
        type: DataTypes.FLOAT,
        allowNull: false,
        // IVA
    },
    fecha_factura: {
        type: DataTypes.DATE,
        allowNull: false,
        // Fecha
    },
    archivo_pdf: {
        type: DataTypes.STRING,
        allowNull: false,
        // Archivo (PDF)
    },
    nombre_proveedor: {
        type: DataTypes.STRING,
        allowNull: false,
        // Nombre del proveedor
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Cantidad
    },
    precio_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
        // Precio unitario
    },
    sub_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        // Subtotal
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        // Total
    },
    teléfono_proveedor: {
        type: DataTypes.STRING(10),
        allowNull: false,
        // Teléfono del proveedor
    },
    RFC_proveedor: {
        type: DataTypes.STRING(13),
        allowNull: false,
        // RFC del proveedor
    },
    dirección_proveedor: {
        type: DataTypes.STRING,
        allowNull: true,
        // Dirección del proveedor
    },
    archivo_sat: {
        type: DataTypes.STRING,
        allowNull: false,
        // Archivo (PDF) del SAT
    }
}, {
    timestamps: true,
});

export default Facturas;