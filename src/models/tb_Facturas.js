import { DataTypes } from "sequelize";
import db from "../config/db.js";

// TODO: Tabla de Facturas terminada

const Facturas = db.define("tb_Facturas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo_alta: {
        type: DataTypes.ENUM("Compra (CM)", "Donacion (DN)", "Comodato (CO)"),
        allowNull: false,
    },
    tipo_documento_ampara: {
        type: DataTypes.ENUM("Contrato De Comodato (CO)", "Comprobante Fiscal Digital por Internet (CFDI)"),
        allowNull: false,
        // Tipo de documento que ampara
    },
    fecha_adquisicion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        // Fecha de adquisición
    },
    numero_de_factura: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // Número de factura
    },
    tipo_compra: {
        type: DataTypes.ENUM("Presupuesto", "Estatal"),
        allowNull: false,
        // Tipo de compra
    },
    concepto: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // Concepto
    },
    fecha_factura: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        // Fecha
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Nombre del proveedor va asociada con la tabla de proveedores
    },
    cantidad: {
        type: DataTypes. DECIMAL(10, 2),
        allowNull: false,
        // Cantidad
    },
    precio_unitario: {
        type: DataTypes. DECIMAL(10, 2),
        allowNull: false,
        // Precio unitario
    },
    sub_total: {
        type: DataTypes. DECIMAL(10, 2),
        allowNull: false,
        // Subtotal
    },
    iva: {
        type: DataTypes. DECIMAL(10, 2),
        allowNull: false,
        // IVA
    },
    total: {
        type: DataTypes. DECIMAL(10, 2),
        allowNull: false,
        // Total
    },
    archivo_pdf: {
        type: DataTypes.TEXT,
        allowNull: false,
        // Archivo (PDF)
    },
},
    {
        timestamps: true,
    }
);

export default Facturas;