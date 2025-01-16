import Almacenes from "./tb_Almacenes.js";
import Areas from "./tb_Areas.js";
import Articulos from "./tb_Articulos.js";
import Bajas from "./tb_Bajas.js";
import Cargas from "./tb_Cargas.js";
import Compras from "./tb_Compras.js";
import Departamentos from "./tb_Departamentos.js";
import Entregas from "./tb_Entregas.js";
import Facturas from "./tb_Facturas.js";
import ObjetoDeGasto from "./tb_ObjetoGasto.js";
import Politica from "./tb_Politicas.js";
import Solicitudes from "./tb_Solicitudes.js";
import Usuarios from "./tb_Usuarios.js";
import VidaUtil from "./tb_VidaUtil.js";

export const relaciones = () => {
  // RELACIÓN CON DE ARTÍCULOS
  Articulos.belongsTo(VidaUtil, { foreignKey: "id_de_vida_util", as: "vidaUtil" });
  VidaUtil.belongsTo(Articulos, { foreignKey: "id", as: "articuloVidaUtil" });

  Articulos.belongsTo(Politica, { foreignKey: "id_de_poliza", as: "articuloPoliza" });
  Politica.belongsTo(Articulos, { foreignKey: "id", as: "polizaArticulo" });

  Articulos.belongsTo(Facturas, { foreignKey: "id_de_la_factura", as: "articuloFactura" });
  Facturas.belongsTo(Articulos, { foreignKey: "id", as: "facturaArticulo" });

  // Referencias de Baja
  Bajas.belongsTo(Usuarios, { foreignKey: "id_confirmacion", as: "usuarioConfirmacion" });
  Usuarios.belongsTo(Casualtys, { foreignKey: "id", as: "usuarioConfirmacionBaja" });

  Bajas.belongsTo(Usuarios, { foreignKey: "id_solicitud_retiro", as: "usuarioSolicitudRetiro" });
  Usuarios.belongsTo(Casualtys, { foreignKey: "id", as: "usuarioSolicitudRetiroBaja" });

  Bajas.belongsTo(Articulos, { foreignKey: "id_articulos", as: "bajaArticulo" });
  Articulos.belongsTo(Casualtys, { foreignKey: "id", as: "articuloBaja" });

  // SE REFERENCIA A ALMACEN POR QUE AHORA TIENE INVENTARIOS
  Bajas.belongsTo(Areas, { foreignKey: "id_inventario", as: "bajaInventario" });
  Areas.belongsTo(Casualtys, { foreignKey: "id", as: "inventarioBaja" });

  // Referencias de Entregas
  Entregas.belongsTo(Areas, { foreignKey: "id_almacen", as: "entregaAlmacen" });
  Areas.belongsTo(Entregas, { foreignKey: "id", as: "almacenEntrega" });

  Entregas.belongsTo(Areas, { foreignKey: "id_inventario", as: "entregaInventario" });
  Areas.belongsTo(Entregas, { foreignKey: "id", as: "inventarioEntrega" });

  Entregas.belongsTo(Articulos, { foreignKey: "id_articulos", as: "entregaArticulo" });
  Articulos.belongsTo(Entregas, { foreignKey: "id", as: "articuloEntrega" });

  Entregas.belongsTo(Usuarios, { foreignKey: "id_usuario_entrega", as: "usuarioEntrega" });
  Usuarios.belongsTo(Entregas, { foreignKey: "id", as: "usuarioEntrega" });

  Entregas.belongsTo(Usuarios, { foreignKey: "id_usuario_recibe", as: "usuarioRecibe" });
  Usuarios.belongsTo(Entregas, { foreignKey: "id", as: "usuarioRecibeEntrega" });

  // Referencias de departamentos
  Departamentos.belongsTo(Areas, { foreignKey: "id_area", as: "departamentoArea" });
  Areas.belongsTo(Departamentos, { foreignKey: "id", as: "areaDepartamento" });

  // REFERENCIAS A SOLICITUD 
  Solicitudes.belongsTo(Usuarios, { foreignKey: "id_usuario_aprobador", as: "usuarioAprobador" });
  Usuarios.belongsTo(Solicitudes, { foreignKey: "id", as: "usuarioAprobadorSolicitud" });

  Solicitudes.belongsTo(Usuarios, { foreignKey: "id_usuario_solicitud", as: "usuarioSolicitante" });
  Usuarios.belongsTo(Solicitudes, { foreignKey: "id", as: "usuarioSolicitanteSolicitud" });

  Solicitudes.belongsTo(Articulos, { foreignKey: "id_articulo", as: "solicitudArticulo" });
  Articulos.belongsTo(Solicitudes, { foreignKey: "id", as: "articuloSolicitud" });

  Solicitudes.belongsTo(Areas, { foreignKey: "id_numero_inventario", as: "solicitudAlmacen" });
  Areas.belongsTo(Solicitudes, { foreignKey: "id", as: "almacenSolicitud" });

  Solicitudes.belongsTo(ObjetoDeGasto, { foreignKey: "id_propuesta_requicicion", as: "solicitudObjetoGasto" });
  ObjetoDeGasto.belongsTo(Solicitudes, { foreignKey: "id", as: "objetoGastoSolicitud" });

  Solicitudes.belongsTo(Solicitudes, { foreignKey: "id_petición_de_padre", as: "solicitudPadre" });
  Solicitudes.belongsTo(Solicitudes, { foreignKey: "id", as: "padreSolicitud" });

  // REFERENCIAS A USUARIOS 
  Usuarios.belongsTo(Cargas, { foreignKey: "id_cargo", as: "usuarioCargo" });
  Cargas.belongsTo(Usuarios, { foreignKey: "id", as: "cargoUsuario" });

  Usuarios.belongsTo(Departamentos, { foreignKey: "id_departamento", as: "usuarioDepartamento" });
  Departamentos.belongsTo(Usuarios, { foreignKey: "id", as: "departamentoUsuario" });

  // REFERENCIAS DE ALMACÉN 
  Almacenes.belongsTo(Articulos, { foreignKey: "id_articulo", as: "almacenArticulo" });
  Articulos.hasMany(Almacenes, { foreignKey: "id", as: "articuloAlmacenes" });

  Almacenes.belongsTo(Facturas, { foreignKey: "id_factura", as: "almacenFactura" });
  Facturas.belongsTo(Almacenes, { foreignKey: "id", as: "facturaAlmacen" });

  Almacenes.belongsTo(Politica, { foreignKey: "id_poliza", as: "almacenPoliza" });
  Politica.belongsTo(Almacenes, { foreignKey: "id", as: "polizaAlmacen" });

  //REFERENCIAS DE VIDA UTIL
  VidaUtil.belongsTo(ObjetoDeGasto, { foreignKey: "id_partida", as: "vidaUtilObjetoGasto" });
  ObjetoDeGasto.belongsTo(VidaUtil, { foreignKey: "id", as: "objetoGastoVidaUtil" });

  //REFERENCIAS DE COMPRAS
  Compras.belongsTo(Facturas, { foreignKey: "id_factura", as: "compraFactura" });
  Facturas.belongsTo(Compras, { foreignKey: "id", as: "facturaCompra" });
};