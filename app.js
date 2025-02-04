import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import multer from 'multer';
// Configuración de la conexión
import db from './src/config/db.js';
import { getDbState, setDbState, resetDbState } from './src/config/db.State.js';
// Importación de las rutas
import almacenRouter from './src/routes/almacenesRoutes.js';
import bajasRouter from './src/routes/bajasRoutes.js';
import entregasRouter from './src/routes/entregasRoutes.js';
import objetoGastoRouter from './src/routes/objetoGastoRoutes.js';
import solicitudesRouter from './src/routes/solicitudesRoutes.js';
import facturasRouter from './src/routes/facturasRoutes.js';
import polizasRouter from './src/routes/polizaRoutes.js';
import { getAllData } from './src/controllers/polizaController.js';
// Importacion de archivos de descargas y cargas
import uploadRouter from './src/routes/uploadFilesRoutes.js';
import uploadUserRouter from './src/routes/userFilesRoutes.js';
import uploadDeliveriesRouter from './src/routes/deliveriesFilesRoutes.js';
import { uploadDelivery } from './src/config/fileUploadConfig.js';
// Relación (FK)
import { relaciones } from './src/models/relacion_tablas.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(uploadDelivery.any());

// Rutas
app.use('/api/almacenes', almacenRouter);
app.use('/api/bajas', bajasRouter);
app.use('/api/entregas', entregasRouter);
app.use('/api/facturas', facturasRouter);
app.use('/api/objetoGastos', objetoGastoRouter);
app.use('/api/polizas', polizasRouter);
app.use('/api/all-data', getAllData);
app.use('/api/solicitudes', solicitudesRouter);
// Rutas de descargas y cargas
app.use('/api/upload', uploadRouter);
app.use('/api/upload-files', uploadRouter);
app.use('/api/users-upload', uploadUserRouter);
app.use('/api/users-files', uploadUserRouter);
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
    await db.sync({ force: true });
    console.log('------> Modelos sincronizados con la base de datos');

    // Ejecutar las relaciones de las tablas
    relaciones();
    console.log("------> Estableciendo relaciones de las tablas, cargando...");

    // Volver a sincronizar para aplicar las relaciones
    await db.sync({ alter: true });
    console.log("------> Relaciones y Foreign Keys aplicadas a la base de datos");

    // Obtener la fecha y hora actual
    const now = new Date();
    setDbState({initialized: true, lastInitialized: now.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })});

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