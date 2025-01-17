import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Configuración de la conexión
import db from './src/config/db.js';
import { getDbState, setDbState, resetDbState } from './src/config/db.State.js';
// Importación de las rutas
import areasRoutes from './src/routes/areasRoutes.js';
import almacenRouter from './src/routes/almacenesRoutes.js';
// Importacion de archvios de descargas y cargas
import uploadRouter from './src/routes/uploadFilesRoutes.js';
import uploadUserRouter from './src/routes/userFilesRoutes.js'
import uploadDeliveriesRouter from './src/routes/deliveriesFilesRoutes.js'

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
  apis: ['./src/routes/*.js'], // Asegúrate de que la ruta incluya todos los archivos de rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/areas', areasRoutes);
app.use('/api/almacenes', almacenRouter);
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
    console.log("------> Relaciones definidas correctamente");

    // Volver a sincronizar para aplicar las relaciones
    await db.sync({ alter: true });
    console.log("------> Relaciones y foreign keys aplicadas a la base de datos");

    // Marcar la base de datos como inicializada
    setDbState({ initialized: true, lastInitialized: new Date().toISOString() });
    console.log("------> Base de datos marcada como inicializada");
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

    // Inicializar la base de datos
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