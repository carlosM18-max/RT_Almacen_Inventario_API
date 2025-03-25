import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Configuración de la conexión
import db from './config/db.js';
import { getDbState, setDbState, resetDbState } from './config/db.State.js';
// Rutas Almacen con archivos de descargas y cargas
import almacenRouter from './routes/almacenesRoutes.js';
// Rutas Articulos con archivos de descargas y cargas
import articulosRouter from './routes/articulosRoutes.js';
import uploadArticulosRouter from './routes/articulosFilesRoutes.js';
// Rutas Bajas con archivos de descargas y cargas
import bajasRouter from './routes/bajasRoutes.js';
// Rutas Entregas con archivos de descargas y cargas
import entregasRouter from './routes/entregasRoutes.js';
import uploadDeliveriesRouter from './routes/deliveriesFilesRoutes.js';
// Rutas Facturas con archivos de descargas y cargas
import facturasRouter from './routes/facturasRoutes.js';
import uploadFacturasRouter from './routes/facturasFilesRoutes.js';
// Rutas Generales de descargas y cargas
import uploadRouter from './routes/uploadFilesRoutes.js';
// Rutas Objetos de Gasto con archivos de descargas y cargas
import objetoGastoRouter from './routes/objetoGastoRoutes.js';
// Rutas Polizas con archivos de descargas y cargas
import polizasRouter from './routes/polizaRoutes.js';
import uploadPolizasRouter from './routes/polizaFileRoutes.js';
import { getAllData } from './controllers/polizaController.js';
// Rutas Proveedores con archivos de descargas y cargas
import proveedoresRouter from './routes/proveedorRoutes.js';
import uploadProvRouter from './routes/proveedorFilesRoutes.js';
// Rutas Personas con archivos de descargas y cargas
import personaRouter from './routes/personasRoutes.js';
import uploadUserRouter from './routes/personsFilesRoutes.js';
// Rutas Solicitudes con archivos de descargas y cargas
import solicitudesRouter from './routes/solicitudesRoutes.js';
// Rutas Usuarios con archivos de descargas y cargas
import usuariosRouter from './routes/usuariosRoutes.js';
// Relación (FK)
import { relaciones } from './models/relacion_tablas.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Sistema de Almacenes e Inventario',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema de almacenes e inventario',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
    components: {
      schemas: {
        UploadResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Archivo subido correctamente',
            },
            fileName: {
              type: 'string',
              example: 'archivo.pdf',
            },
            fileUrl: {
              type: 'string',
              format: 'uri',
              example: 'http://localhost:3000/uploads/archivo.pdf',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/almacenes', almacenRouter);
app.use('/api/articulos', articulosRouter);
app.use('/api/articulos-files', uploadArticulosRouter);
app.use('/api/bajas', bajasRouter);
app.use('/api/entregas', entregasRouter);
app.use('/api/facturas', facturasRouter);
app.use('/api/objetoGastos', objetoGastoRouter);
app.use('/api/personas', personaRouter);
app.use('/api/polizas', polizasRouter);
app.use('/api/polizas-files', uploadPolizasRouter);
app.use('/api/solicitudes', solicitudesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/proveedor', proveedoresRouter);
app.use('/api/all-data', getAllData);
// Rutas de descargas y cargas
app.use('/api/upload', uploadRouter);
// Facturas
app.use('/api/facturas', uploadFacturasRouter); // Lista
app.use('/api/facturas-files', uploadFacturasRouter); // Por nombre
// personas
app.use('/api/users-upload', uploadUserRouter); // Subir
app.use('/api/users-files', uploadUserRouter); // Lista
app.use('/api/user-files', uploadUserRouter); // Por nombre
app.use('/api/users', uploadUserRouter); // Descargas
// Proveedores
app.use('/api/proveedores', uploadProvRouter);
app.use('/api/proveedores-files', uploadProvRouter); // Lista

// Entregas
app.use('/api/deliveries-upload', uploadDeliveriesRouter);
app.use('/api/deliveries-files', uploadDeliveriesRouter);

// Mensaje que se mostrará al inicio
app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido al sistema de almacenes e inventario" });
});

const initializeDatabase = async (force = false) => {
  if (force) {
    resetDbState();
  }

  const dbState = getDbState();

  if (!dbState.initialized || force) {
    console.log('------> Inicializando la base de datos');

    // Sincronizar los modelos
    await db.sync({ alter: true });
    console.log('------> Modelos sincronizados con la base de datos');

    // Ejecutar las relaciones de las tablas
    relaciones();
    console.log("------> Estableciendo relaciones de las tablas, cargando...");

    // Volver a sincronizar para aplicar las relaciones
    await db.sync({ alter: true });
    console.log("------> Relaciones y Foreign Keys aplicadas a la base de datos");

    // Obtener la fecha y hora actual
    const now = new Date();
    setDbState({ initialized: true, lastInitialized: now.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }) });

    // Imprimir mensaje de inicialización con hora actual
    console.log(`------> Base de datos inicializada a las ${now.toLocaleTimeString()}`);
  } else {
    console.log(`------> Base de datos ya inicializada (última inicialización: ${dbState.lastInitialized})`);
  }
};

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Conexión a la base de datos
    await db.authenticate();
    console.log('------> Servidor de datos autenticado');

    // Cambia el parámetro a true si quieres forzar la reinicialización
    const forceInit = process.argv.includes('--force-init');
    await initializeDatabase(forceInit);

    // Servidor ejecutándose
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
      console.log(`Interfaz Swagger (API) disponible en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Error en la conexión o sincronización de la base de datos:', error);
  }
};

startServer();

export default app;