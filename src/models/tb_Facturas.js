import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Facturas = db.define("tb_Facturas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo_alta: {
        type: DataTypes.ENUM("Compra CM", "Domacion DN", "Comodato CO"),
        allowNull: false,
    },
    numero_de_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Número de factura
    },
    tipo_compra: {
        type: DataTypes.ENUM("Presupuesto", "Estatal"),
        allowNull: false,
        // Tipo de compra
    },
    Tipo_documento_ampara: {
        type: DataTypes.ENUM("(Contrato De Comodato CO", "Comprobante Fiscal Digital por Internet CFDI"),
        allowNull: false,
        // Tipo de documento que ampara
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
    fecha_adquisicion: {
        type: DataTypes.DATE,
        allowNull: false,
        // Fecha de adquisición
    },
    archivo_pdf: {
        type: DataTypes.BLOB,
        allowNull: false,
        // Archivo (PDF)
    },
    nombre_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Nombre del proveedor va asociada con la tabla de proveedores
    },
    cantidad: {
        type: DataTypes.STRING,
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
        type: DataTypes.FLOAT(10),
        allowNull: false,
        // Total
    },
}, {
    timestamps: true,
});

export default Facturas;