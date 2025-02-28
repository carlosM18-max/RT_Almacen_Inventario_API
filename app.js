import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Configuración de la conexión
import db from './src/config/db.js';
import { getDbState, setDbState, resetDbState } from './src/config/db.State.js';
// Rutas Almacen con archivos de descargas y cargas
import almacenRouter from './src/routes/almacenesRoutes.js';
// Rutas Bajas con archivos de descargas y cargas
import bajasRouter from './src/routes/bajasRoutes.js';
// Rutas Entregas con archivos de descargas y cargas
import entregasRouter from './src/routes/entregasRoutes.js';
import uploadDeliveriesRouter from './src/routes/deliveriesFilesRoutes.js';
// Rutas Facturas con archivos de descargas y cargas
import facturasRouter from './src/routes/facturasRoutes.js';
// Rutas Generales de descargas y cargas
import uploadRouter from './src/routes/uploadFilesRoutes.js';
// Rutas Objetos de Gasto con archivos de descargas y cargas
import objetoGastoRouter from './src/routes/objetoGastoRoutes.js';
// Rutas Polizas con archivos de descargas y cargas
import polizasRouter from './src/routes/polizaRoutes.js';
import { getAllData } from './src/controllers/polizaController.js';
// Rutas Proveedores con archivos de descargas y cargas
import proveedoresRouter from './src/routes/proveedorRoutes.js';
import uploadProvRouter from './src/routes/proveedorFilesRoutes.js';
// Rutas Solicitudes con archivos de descargas y cargas
import solicitudesRouter from './src/routes/solicitudesRoutes.js';
// Rutas Usuarios con archivos de descargas y cargas
import usuariosRouter from './src/routes/usuariosRoutes.js';
import uploadUserRouter from './src/routes/userFilesRoutes.js';
// Relación (FK)
import { relaciones } from './src/models/relacion_tablas.js';

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
app.use('/api/bajas', bajasRouter);
app.use('/api/entregas', entregasRouter);
app.use('/api/facturas', facturasRouter);
app.use('/api/objetoGastos', objetoGastoRouter);
app.use('/api/polizas', polizasRouter);
app.use('/api/solicitudes', solicitudesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/proveedor', proveedoresRouter);
app.use('/api/all-data', getAllData);
// Rutas de descargas y cargas
app.use('/api/upload', uploadRouter);
// Usuarios
app.use('/api/users-upload', uploadUserRouter); // Subir
app.use('/api/users-files', uploadUserRouter); // Lista
app.use('/api/user-files', uploadUserRouter); // Por nombre
app.use('/api/users', uploadUserRouter); // Descargas
// Proveedores
app.use('/api/proveedores', uploadProvRouter);
app.use('/api/proveedores-files', uploadProvRouter); // Lista
app.use('/api/proveedor-files', uploadProvRouter); // Por nombre
app.use('/api/proveedores', uploadProvRouter); // Descargas

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