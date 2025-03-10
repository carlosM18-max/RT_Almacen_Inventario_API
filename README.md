
# Radio y Televison Almacen Inventario API

API para gestionar el almacenamiento e inventario de Radio y Televisión, asegurando una conexión estable y eficiente entre la base de datos y el frontend.

## Requisitos
Para poder ejecutar la API es necesario lo siguiente:

* Tener instalado Node.js, ademas de contar con su gestor de paquetes
[![Node](https://skillicons.dev/icons?i=nodejs)](https://nodejs.org/en) 
[![npm](https://skillicons.dev/icons?i=npm)](https://www.npmjs.com/)

* Tener configurado el set up de MySQL (server, workbench, etc.) o tu base de datos preferida 
[![MySQL](https://skillicons.dev/icons?i=mysql)](https://www.mysql.com/) 
[![MongoDB](https://skillicons.dev/icons?i=mongodb)](https://www.mongodb.com/) 

* Un editor de texto (en caso de que se necesite modificar algo a tu gusto) 
[![VSCode](https://skillicons.dev/icons?i=vscode)](https://code.visualstudio.com/) 

## Instalacion

Clona el Proyecto:

```bash
  git clone https://github.com/carlosM18-max/RT_Almacen_Inventario_API.git
```
Ve a la carpeta del repositorio:

```bash
  cd RT_Almacen_Inventario_API
```
Instala las dependecias:

```bash
  npm install
```
Inicializa la base de datos y genera las relaciones de las ForeignKey (llaves foráneas):

```bash
  npm run start:force-init
```

Una vez ejecutado el script anterior, ejecuta este para iniciar la API:

```bash
  npm run start
```
Este script se utiliza una vez generadas las relaciones para no tener que crear todo desde el inicio.