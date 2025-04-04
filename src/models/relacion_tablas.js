import Almacenes from "./tb_Almacenes.js";
import Articulos from "./tb_Articulos.js";
import Bajas from "./tb_Bajas.js";
import Entregas from "./tb_Entregas.js";
import Facturas from "./tb_Facturas.js";
import Inventario from "./tb_Inventario.js";
import ObjetoGastos from "./tb_ObjetoGasto.js";
import Poliza from "./tb_Poliza.js";
import Proveedores from "./tb_Proveedores.js";
import RegistroContable from "./tb_Registrocontable.js";
import Solicitudes from "./tb_Solicitudes.js";
import Usuarios from "./tb_Usuarios.js";
import VidaUtil from "./tb_VidaUtil.js";
import Personas from "./tb_Personas.js";


export const relaciones = () => {
   // Referencias de Almacenes
   Almacenes.belongsTo(Facturas, { foreignKey: "id_factura", as: "facturaAlmacen", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Facturas.hasMany(Almacenes, { foreignKey: "id", as: "almacenesFactura", onDelete: "CASCADE", onUpdate: "CASCADE" });

   Almacenes.belongsTo(Poliza, { foreignKey: "id_poliza", as: "polizaAlmacen", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Poliza.hasMany(Almacenes, { foreignKey: "id", as: "almacenesPoliza", onDelete: "CASCADE", onUpdate: "CASCADE" });

   Almacenes.belongsTo(ObjetoGastos, { foreignKey: "codigo_armonizable", as: "partidaPresupuestal", onDelete: "CASCADE", onUpdate: "CASCADE" });
   ObjetoGastos.hasMany(Almacenes, { foreignKey: "id", as: "almacenesPartida", onDelete: "CASCADE", onUpdate: "CASCADE" });

   Bajas.belongsTo(Inventario, { foreignKey: "id_inventario", as: "bienBaja", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Inventario.hasMany(Bajas, { foreignKey: "id", as: "bajasInventario", onDelete: "CASCADE", onUpdate: "CASCADE" });

   Bajas.belongsTo(Usuarios, { foreignKey: "id_usuario", as: "usuarioBaja", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Usuarios.hasMany(Bajas, { foreignKey: "id", as: "bajasUsuario", onDelete: "CASCADE", onUpdate: "CASCADE" });

   // Referencias de Entregas
   Entregas.belongsTo(Usuarios, { foreignKey: "id_usuario_entrega", as: "usuarioEntrega", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Usuarios.hasMany(Entregas, { foreignKey: "id", as: "entregasUsuario", onDelete: "CASCADE", onUpdate: "CASCADE" });

   Entregas.belongsTo(Usuarios, { foreignKey: "id_usuario_recibe", as: "usuarioRecibe", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Usuarios.hasMany(Entregas, { foreignKey: "id", as: "entregasRecibidas", onDelete: "CASCADE", onUpdate: "CASCADE" });

   Entregas.belongsTo(Solicitudes, { foreignKey: "id_solicitud", as: "solicitudEntrega", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Solicitudes.hasMany(Entregas, { foreignKey: "id", as: "entregasSolicitud", onDelete: "CASCADE", onUpdate: "CASCADE" });

   Entregas.belongsTo(Inventario, { foreignKey: "id_inventario", as: "bienEntrega", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Inventario.hasMany(Entregas, { foreignKey: "id", as: "entregasBien", onDelete: "CASCADE", onUpdate: "CASCADE" });

   Entregas.belongsTo(Almacenes, { foreignKey: "id_almacen", as: "almacenEntrega", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Almacenes.hasMany(Entregas, { foreignKey: "id", as: "entregasAlmacen", onDelete: "CASCADE", onUpdate: "CASCADE" });

   // Referencias de Facturas
   Facturas.belongsTo(Proveedores, { foreignKey: "id_proveedor", as: "proveedorFactura", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Proveedores.hasMany(Facturas, { foreignKey: "id", as: "facturasProveedor", onDelete: "CASCADE", onUpdate: "CASCADE" });

   Inventario.belongsTo(RegistroContable, { foreignKey: "id_registrocontable", as: "InventariConta", onDelete: "CASCADE", onUpdate: "CASCADE" });
   RegistroContable.hasMany(Inventario, { foreignKey: "id", as: "Regisinventa", onDelete: "CASCADE", onUpdate: "CASCADE" });

   // Referencias de Solicitudes
    // Relación entre solicitides y articulos
   Solicitudes.belongsTo(Articulos, { foreignKey: "id_articulo", as: "articuloSolicitud", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Articulos.hasMany(Solicitudes, { foreignKey: "id", as: "solicitudesArticulo", onDelete: "CASCADE", onUpdate: "CASCADE" });

   // Referencias de Vida Útil
   VidaUtil.belongsTo(ObjetoGastos, { foreignKey: "id_partida", as: "partidaVidaUtil", onDelete: "CASCADE", onUpdate: "CASCADE" });
   ObjetoGastos.hasMany(VidaUtil, { foreignKey: "id_partida", as: "vidasUtilesPartida", onDelete: "CASCADE", onUpdate: "CASCADE" });

   
   // Relación entre Usuarios y Persona
   Usuarios.belongsTo(Personas, { foreignKey: "id_persona", as: "persona", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Personas.hasMany(Usuarios, { foreignKey: "id", as: "usuarios", onDelete: "CASCADE", onUpdate: "CASCADE" });

   // Relación entre Articulos y Objeto de gasto
   Articulos.belongsTo(ObjetoGastos, { foreignKey: "id_objetogasto", as: "partidaArticulo", onDelete: "CASCADE", onUpdate: "CASCADE" });
   ObjetoGastos.hasMany(Articulos, { foreignKey: "id", as: "articulosPartida", onDelete: "CASCADE", onUpdate: "CASCADE" });
   // Relación entre Articulos y Facturas
   Articulos.belongsTo(Facturas, { foreignKey: "id_factura", as: "facturaArticulo", onDelete: "CASCADE", onUpdate: "CASCADE" });
   Facturas.hasMany(Articulos, { foreignKey: "id", as: "articulosFactura", onDelete: "CASCADE", onUpdate: "CASCADE" });
  
   
};