import Almacenes from "./tb_Almacenes.js";
import Bajas from "./tb_Bajas.js";
import Entregas from "./tb_Entregas.js";
import Facturas from "./tb_Facturas.js";
import Inventario from "./tb_inventario.js";
import ObjetoGastos from "./tb_ObjetoGasto.js";
import Poliza from "./tb_Poliza.js";
import Proveedores from "./tb_provedores.js";
import RegistroContable from "./tb_Registrocontable.js";
import Solicitudes from "./tb_Solicitudes.js";
import Usuarios from "./tb_Usuarios.js";
import VidaUtil from "./tb_VidaUtil.js";

export const relaciones = () => {
 // Referencias de Almacenes
Almacenes.belongsTo(Facturas, { foreignKey: "id_factura", as: "facturaAlmacen" });
Facturas.hasMany(Almacenes, { foreignKey: "id", as: "almacenesFactura" });

Almacenes.belongsTo(Poliza, { foreignKey: "id_poliza", as: "polizaAlmacen" });
Poliza.hasMany(Almacenes, { foreignKey: "id", as: "almacenesPoliza" });

Almacenes.belongsTo(ObjetoGastos, { foreignKey: "codigo_armonizable", as: "partidaPresupuestal" });
ObjetoGastos.hasMany(Almacenes, { foreignKey: "id_partida", as: "almacenesPartida" });

// Referencias de Bajas
//Bajas.belongsTo(Usuarios, { foreignKey: "id_confirmacion", as: "usuarioConfirmacion" });
//Usuarios.hasMany(Bajas, { foreignKey: "id_confirmacion", as: "usuarioConfirmacionBajas" });

//Bajas.belongsTo(Usuarios, { foreignKey: "id_solicitud_retiro", as: "usuarioSolicitudRetiro" });
//Usuarios.hasMany(Bajas, { foreignKey: "id_solicitud_retiro", as: "usuarioSolicitudRetiroBajas" });

Bajas.belongsTo(Inventario, { foreignKey: "id_inventario", as: "bienBaja" });
Inventario.hasMany(Bajas, { foreignKey: "id", as: "bajasInventario" });

Bajas.belongsTo(Usuarios, { foreignKey: "id_usuario", as: "usuarioBaja" });
Usuarios.hasMany(Bajas, { foreignKey: "id", as: "bajasUsuario" });
// Referencias de Entregas
Entregas.belongsTo(Usuarios, { foreignKey: "id_usuario_entrega", as: "usuarioEntrega" });
Usuarios.hasMany(Entregas, { foreignKey: "id", as: "entregasUsuario" });

Entregas.belongsTo(Usuarios, { foreignKey: "id_usuario_recibe", as: "usuarioRecibe" });
Usuarios.hasMany(Entregas, { foreignKey: "id", as: "entregasRecibidas" });

Entregas.belongsTo(Inventario, { foreignKey: "id_inventario", as: "bienEntrega" });
Inventario.hasMany(Entregas, { foreignKey: "id", as: "entregasBien" });

Entregas.belongsTo(Almacenes, { foreignKey: "id_almacen", as: "almacenEntrega" });
Almacenes.hasMany(Entregas, { foreignKey: "id", as: "entregasAlmacen" });

Entregas.belongsTo(Solicitudes, { foreignKey: "id_solicitud", as: "solicitudEntrega" });
Solicitudes.hasMany(Entregas, { foreignKey: "id", as: "entregasSolicitud" });

// Referencias de Facturas
Facturas.belongsTo(Proveedores, { foreignKey: "nombre_proveedor", as: "proveedorFactura" });
Proveedores.hasMany(Facturas, { foreignKey: "nombre", as: "facturasProveedor" });

// Referencias de Solicitudes
Solicitudes.belongsTo(Usuarios, { foreignKey: "id_usuario_solicitud", as: "usuarioCreadorSolicitud" });
Usuarios.hasMany(Solicitudes, { foreignKey: "id", as: "solicitudesCreadas" });

Solicitudes.belongsTo(Usuarios, { foreignKey: "id_usuario_aprobador", as: "usuarioAprobadorSolicitud" });
Usuarios.hasMany(Solicitudes, { foreignKey: "id", as: "solicitudesAprobadas" });

Solicitudes.belongsTo(Almacenes, { foreignKey: "id_almacen", as: "almacenSolicitud" });
Almacenes.hasMany(Solicitudes, { foreignKey: "id", as: "solicitudesAlmacen" });

// Referencias de Vida Útil
VidaUtil.belongsTo(ObjetoGastos, { foreignKey: "id_partida", as: "partidaVidaUtil" });
ObjetoGastos.hasMany(VidaUtil, { foreignKey: "id_partida", as: "vidasUtilesPartida" });

// Referencias de Registro Contable
//RegistroContable.belongsTo(ObjetoGastos, { foreignKey: "id_partida", as: "partidaRegistro" });
//ObjetoGastos.hasMany(RegistroContable, { foreignKey: "id_partida", as: "registrosPartida" });

// Referencias de Inventario
//Inventario.belongsTo(Poliza, { foreignKey: "id_poliza", as: "polizaInventario" });
//Poliza.hasMany(Inventario, { foreignKey: "id_poliza", as: "inventariosPoliza" });
};