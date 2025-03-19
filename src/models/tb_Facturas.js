import { DataTypes } from "sequelize";
import db from "../config/db.js";

// TODO: Tabla de Facturas terminada

const Facturas = db.define("tb_Facturas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo_compra: {
        type: DataTypes.ENUM("Directa", "Licitacion", "Invitacion"),
        allowNull: false,
    },
    contrato_compra : {
        type: DataTypes.TEXT,
        allowNull: false
        // Documento de contrato
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
    tipo_presupuesto: {
        type: DataTypes.ENUM("Ingresos Propios", "Recurso Estatal"),
        allowNull: false,
        // Tipo de compra
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