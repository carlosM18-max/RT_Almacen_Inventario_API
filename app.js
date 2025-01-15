import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import db from './src/config/db.js';
import areasRoutes from './src/routes/areas.Routes.js';


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
        url: `http://localhost:${process.env.PORT || 3001}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ruta a los archivos que contienen las definiciones de las rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/areas', areasRoutes);

// Mensaje que se mostrará al inicio
app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido al sistema de almacenes e inventario" });
});

const PORT = process.env.PORT || 3001;

// Función para iniciar el servidor
const startServer = async () => {
  try {
    await db.authenticate();
    console.log('------> Servidor de datos autenticado');
    await db.sync({ force: false }); // Sincronizar los modelos sin sobrescribir tablas existentes
    console.log('------> Conexión correcta a la base de datos');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
      console.log(`Documentación de Swagger disponible en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
  }
};

startServer();

export default app;