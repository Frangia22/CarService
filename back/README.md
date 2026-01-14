# Back End - Servi Card API

## 📋 Tabla de Contenidos

- [Overview](#overview)
- [Arquitectura](#arquitectura)
- [Documentación de API](#documentación-de-api)
- [Detalles de Implementación](#detalles-de-implementación)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Mejores Prácticas](#mejores-prácticas)
- [Errores Comunes](#errores-comunes)
- [Instalación y Configuración](#instalación-y-configuración)

## Overview

### ¿Qué hace esta API?

**Servi Card Backend** es una API REST desarrollada con Node.js y Express que proporciona endpoints para gestionar tarjetas de servicio de vehículos. La API permite realizar operaciones CRUD (Create, Read, Update, Delete) sobre las tarjetas de servicio, incluyendo funcionalidades de búsqueda y paginación.

### ¿Por qué existe y cuál es su propósito?

Esta API forma parte del sistema **CarService**, diseñado para ayudar a talleres mecánicos y propietarios de vehículos a llevar un registro organizado del historial de mantenimiento de sus vehículos. El backend proporciona una capa de servicio robusta y segura que gestiona la persistencia de datos, validaciones y lógica de negocio.

### Conceptos Clave y Terminología

- **API REST**: Interfaz de programación que sigue los principios REST (Representational State Transfer)
- **ORM (Sequelize)**: Object-Relational Mapping que facilita la interacción con la base de datos MySQL
- **Middleware**: Funciones que se ejecutan en el ciclo de vida de una petición HTTP
- **Validación**: Proceso de verificar que los datos recibidos cumplan con los requisitos esperados
- **Paginación**: Técnica para dividir grandes conjuntos de datos en páginas más pequeñas
- **CORS**: Cross-Origin Resource Sharing, mecanismo de seguridad para controlar acceso entre dominios
- **Helmet**: Middleware de seguridad que ayuda a proteger la aplicación de vulnerabilidades comunes

## Arquitectura

### Estructura del Proyecto

```
back/
├── bin/
│   └── www                    # Punto de entrada del servidor
├── config/
│   └── config.js              # Configuración de Sequelize
├── controllers/               # Controladores (lógica de HTTP)
│   ├── index.js
│   └── serviCard.js
├── helpers/                   # Funciones auxiliares
│   ├── pagination.js
│   └── validations.js
├── middleware/                # Middlewares personalizados
│   └── validations.js
├── migrations/                # Migraciones de base de datos
│   └── 20240525011317-create-servi-car.js
├── models/                    # Modelos de Sequelize
│   ├── index.js
│   └── servicar.js
├── services/                  # Lógica de negocio
│   ├── index.js
│   └── serviCard.js
├── utils/                     # Utilidades
│   ├── validateEnv.js
│   └── winstonLogger.js
├── v1/
│   └── routes/                # Rutas de la API
│       ├── index.js
│       └── serviCard.js
├── logs/                      # Archivos de log
├── app.js                     # Configuración de Express
└── package.json
```

### Flujo de Datos

```
Cliente HTTP → Express (app.js) → Rutas (v1/routes) → Middleware (validaciones) → Controlador → Servicio → Modelo (Sequelize) → Base de Datos MySQL
```

1. **Capa de Rutas**: Define los endpoints y métodos HTTP (`v1/routes/serviCard.js`)
2. **Capa de Middleware**: Valida y procesa las peticiones (`middleware/validations.js`)
3. **Capa de Controladores**: Maneja las peticiones HTTP y respuestas (`controllers/serviCard.js`)
4. **Capa de Servicios**: Contiene la lógica de negocio (`services/serviCard.js`)
5. **Capa de Modelos**: Interactúa con la base de datos (`models/servicar.js`)

### Stack Tecnológico

- **Node.js**: Entorno de ejecución JavaScript
- **Express 4.19.2**: Framework web para Node.js
- **Sequelize 6.36.0**: ORM para bases de datos SQL
- **MySQL2 3.9.1**: Driver para MySQL
- **express-validator 7.0.1**: Middleware para validación de datos
- **Winston 3.11.0**: Sistema de logging
- **Helmet 7.1.0**: Seguridad HTTP
- **CORS 2.8.5**: Manejo de Cross-Origin Resource Sharing
- **dotenv 16.4.1**: Gestión de variables de entorno
- **envalid 8.0.0**: Validación de variables de entorno

## Documentación de API

### Endpoints Disponibles

#### Base URL

```
http://localhost:3000/api/v1
```

#### Endpoints de ServiCard

##### `GET /servi-card`

Obtiene una lista paginada de tarjetas de servicio con opción de búsqueda.

**Query Parameters:**

- `page` (number, opcional): Número de página (default: 0)
- `size` o `rows` (number, opcional): Tamaño de página (default: 5)
- `search` (string, opcional): Término de búsqueda para filtrar por patente

**Ejemplo de Request:**

```bash
GET /api/v1/servi-card?page=0&size=5&search=ABC123
```

**Respuesta Exitosa (200):**

```json
{
  "dataRow": [
    {
      "id": 1,
      "patent": "ABC123",
      "date": "2024-05-30",
      "kilometers": 10000,
      "engine": true,
      "type_of_oil": "5w40",
      "filter_of_oil": true,
      "filter_of_air": "Cambio",
      "gasoline_filter": false,
      "filter_of_gasoil": false,
      "filter_anti_polen": "Limpieza",
      "plugs": false,
      "box_of_velocity": "Nivel",
      "timing_belt": false,
      "brake_fluid": true,
      "brake_pads": false,
      "alignment": false,
      "differential": false,
      "change_engine_water": false,
      "createdAt": "2024-05-30T10:00:00.000Z",
      "updatedAt": "2024-05-30T10:00:00.000Z"
    }
  ],
  "totalItems": 1,
  "totalPages": 1,
  "currentPage": 0
}
```

**Respuesta de Error (404):**

```json
{
  "error": {},
  "message": "No hay tarjetas"
}
```

---

##### `GET /servi-card/:id`

Obtiene una tarjeta de servicio específica por su ID.

**Path Parameters:**

- `id` (number, requerido): ID de la tarjeta

**Ejemplo de Request:**

```bash
GET /api/v1/servi-card/1
```

**Respuesta Exitosa (200):**

```json
{
  "dataRow": [
    {
      "id": 1,
      "patent": "ABC123",
      "kilometers": 10000,
      "date": "2024-05-30",
      // ... resto de campos
    }
  ]
}
```

**Respuesta de Error (404):**

```json
{
  "message": "Tarjeta no encontrada"
}
```

---

##### `POST /servi-card`

Crea una nueva tarjeta de servicio.

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "patent": "ABC123",
  "kilometers": 10000,
  "date": "2024-05-30",
  "engine": true,
  "type_of_oil": "5w40",
  "filter_of_oil": true,
  "filter_of_air": "Cambio",
  "gasoline_filter": false,
  "filter_of_gasoil": false,
  "filter_anti_polen": "Limpieza",
  "plugs": false,
  "box_of_velocity": "Nivel",
  "timing_belt": false,
  "brake_fluid": true,
  "brake_pads": false,
  "alignment": false,
  "differential": false,
  "change_engine_water": false
}
```

**Campos Requeridos:**

- `patent` (string, 6-9 caracteres): Patente del vehículo
- `kilometers` (integer, 2-8 dígitos): Kilometraje
- `date` (date, formato YYYY-MM-DD): Fecha del servicio

**Campos Opcionales:**

- `engine` (boolean): Cambio de aceite del motor
- `type_of_oil` (string, 3-6 caracteres): Tipo de aceite
- `filter_of_oil` (boolean): Filtro de aceite
- `filter_of_air` (string, 6-9 caracteres): Filtro de aire
- `gasoline_filter` (boolean): Filtro de nafta
- `filter_of_gasoil` (boolean): Filtro de gasoil
- `filter_anti_polen` (string, 6-9 caracteres): Filtro anti-polen
- `plugs` (boolean): Bujías
- `box_of_velocity` (string, 5-16 caracteres): Caja de velocidad
- `timing_belt` (boolean): Correa de distribución
- `brake_fluid` (boolean): Líquido de freno
- `brake_pads` (boolean): Pastillas de freno
- `alignment` (boolean): Alineación
- `differential` (boolean): Diferencial
- `change_engine_water` (boolean): Reemplazo agua motor

**Ejemplo de Request:**

```bash
POST /api/v1/servi-card
Content-Type: application/json

{
  "patent": "ABC123",
  "kilometers": 10000,
  "date": "2024-05-30"
}
```

**Respuesta Exitosa (201):**

```json
{
  "message": "Tarjeta created"
}
```

**Respuesta de Error - Validación (400):**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Patente es requerido y debe tener formato valido",
      "path": "patent",
      "location": "body"
    }
  ]
}
```

**Respuesta de Error - Creación Fallida (400):**

```json
{
  "error": "Tarjeta not created [mensaje de error]"
}
```

---

##### `PUT /servi-card/:id`

Actualiza una tarjeta de servicio existente.

**Path Parameters:**

- `id` (number, requerido): ID de la tarjeta a actualizar

**Body (JSON):**

Mismo formato que `POST /servi-card`, pero todos los campos son opcionales.

**Ejemplo de Request:**

```bash
PUT /api/v1/servi-card/1
Content-Type: application/json

{
  "kilometers": 15000,
  "engine": false
}
```

**Respuesta Exitosa (201):**

```json
{
  "message": "Tarjeta actualizada con exito"
}
```

**Respuesta de Error - No Encontrada (404):**

```json
{
  "error": "Tarjeta no encontrada"
}
```

**Respuesta de Error - Servidor (500):**

```json
{
  "error": "Error message"
}
```

---

##### `DELETE /servi-card/:id`

Elimina una tarjeta de servicio.

**Path Parameters:**

- `id` (number, requerido): ID de la tarjeta a eliminar

**Ejemplo de Request:**

```bash
DELETE /api/v1/servi-card/1
```

**Respuesta Exitosa (200):**

```json
{
  "message": "Tarjeta/s eliminadas"
}
```

**Respuesta de Error - No Encontrada (404):**

```json
{
  "error": "Tarjeta/s no encontradas"
}
```

**Respuesta de Error - Servidor (500):**

```json
{
  "error": "Tarjeta/s no eliminadas"
}
```

---

##### `GET /servi-card/hello`

Endpoint de prueba para verificar que la API está funcionando.

**Ejemplo de Request:**

```bash
GET /api/v1/servi-card/hello
```

**Respuesta Exitosa (200):**

```
Hello world!!
```

---

### Servicios: `serviCard.js`

Módulo que contiene la lógica de negocio para las operaciones de tarjetas de servicio.

#### `getServiCardAll(req, res)`

Obtiene una lista paginada de tarjetas con búsqueda opcional.

**Parámetros:**

- `req` (Request): Objeto de petición Express con query params `page`, `size`, `search`
- `res` (Response): Objeto de respuesta Express (no se usa directamente)

**Retorna:** `Promise<Object>` con estructura:

```javascript
{
  dataRow: Array,      // Array de tarjetas
  totalItems: Number,  // Total de items
  totalPages: Number,  // Total de páginas
  currentPage: Number // Página actual
}
```

**Ejemplo:**

```javascript
const result = await getServiCardAll(req, res);
// result = { dataRow: [...], totalItems: 10, totalPages: 2, currentPage: 0 }
```

**Manejo de Errores:**

Lanza `Error` si hay problemas con la consulta a la base de datos.

---

#### `getServiCardById(id)`

Obtiene una tarjeta por su ID.

**Parámetros:**

- `id` (number | string): ID de la tarjeta

**Retorna:** `Promise<Object>` con estructura:

```javascript
{
  dataRow: Array  // Array con un solo elemento (la tarjeta) o null
}
```

**Ejemplo:**

```javascript
const result = await getServiCardById(1);
// result = { dataRow: [{ id: 1, patent: "ABC123", ... }] }
```

**Manejo de Errores:**

Lanza `Error` si hay problemas con la consulta a la base de datos.

---

#### `createServiCard(serviCardData)`

Crea una nueva tarjeta de servicio.

**Parámetros:**

- `serviCardData` (Object): Objeto con los datos de la tarjeta

**Retorna:** `Promise<Object>` - Instancia de Sequelize del modelo creado

**Ejemplo:**

```javascript
const data = {
  patent: "ABC123",
  kilometers: 10000,
  date: "2024-05-30"
};

const serviCard = await createServiCard(data);
// serviCard = { id: 1, patent: "ABC123", ... }
```

**Manejo de Errores:**

Lanza `Error` si hay problemas al crear el registro (validaciones de Sequelize, restricciones de BD, etc.).

---

#### `updateServiCard(id, serviCardData)`

Actualiza una tarjeta existente.

**Parámetros:**

- `id` (number | string): ID de la tarjeta
- `serviCardData` (Object): Objeto con los campos a actualizar

**Retorna:** `Promise<Number>` - Número de filas afectadas (0 si no existe, 1 si se actualizó)

**Ejemplo:**

```javascript
const data = { kilometers: 15000 };
const rowsAffected = await updateServiCard(1, data);
// rowsAffected = 1 (si se actualizó) o 0 (si no existe)
```

**Manejo de Errores:**

Lanza `Error` si hay problemas al actualizar el registro.

---

#### `deleteServiCard(req, res)`

Elimina una o más tarjetas.

**Parámetros:**

- `req` (string): String con IDs separados por coma (ej: "1,2,3")
- `res` (Response): Objeto de respuesta Express (no se usa directamente)

**Retorna:** `Promise<Number>` - Número de filas eliminadas

**Ejemplo:**

```javascript
const deleteCount = await deleteServiCard("1,2,3");
// deleteCount = 3 (si se eliminaron 3 tarjetas)
```

**Manejo de Errores:**

Lanza `Error` si hay problemas al eliminar los registros.

---

### Helpers: `pagination.js`

Funciones auxiliares para manejar la paginación de datos.

#### `getPagination(page, size)`

Calcula el límite y offset para la paginación.

**Parámetros:**

- `page` (number, opcional): Índice de página (default: 0)
- `size` (number, opcional): Tamaño de página (default: 5)

**Retorna:** `Promise<Object>` con estructura:

```javascript
{
  limit: Number,   // Número de elementos por página
  offset: Number   // Desplazamiento desde el inicio
}
```

**Ejemplo:**

```javascript
const { limit, offset } = await getPagination(1, 10);
// limit = 10, offset = 10 (página 1 con 10 elementos)
```

#### `PaginateData(data, page, limit)`

Formatea los datos paginados con metadatos.

**Parámetros:**

- `data` (Object): Objeto con `count` y `rows` de Sequelize
- `page` (number, opcional): Índice de página (default: 0)
- `limit` (number): Límite de elementos por página

**Retorna:** `Promise<Object>` con estructura:

```javascript
{
  dataRow: Array,      // Array de elementos
  totalItems: Number,  // Total de items
  totalPages: Number,  // Total de páginas
  currentPage: Number  // Página actual
}
```

**Ejemplo:**

```javascript
const result = await PaginateData(
  { count: 25, rows: [...] },
  0,
  10
);
// result = { dataRow: [...], totalItems: 25, totalPages: 3, currentPage: 0 }
```

---

### Validaciones: `helpers/validations.js`

Middleware de validación usando `express-validator`.

#### `serviCardValidations`

Array de middlewares de validación para el endpoint de creación de tarjetas.

**Validaciones Aplicadas:**

- `patent`: Requerido, string, longitud 6-9 caracteres
- `kilometers`: Requerido, entero, longitud 2-8 dígitos
- `date`: Requerido, formato de fecha válido
- `engine`: Boolean
- `type_of_oil`: Opcional, string, longitud 3-6 caracteres
- `filter_of_oil`: Boolean
- `filter_of_air`: Opcional, string, longitud 6-9 caracteres
- `gasoline_filter`: Boolean
- `filter_of_gasoil`: Boolean
- `filter_anti_polen`: Opcional, string, longitud 6-9 caracteres
- `plugs`: Boolean
- `box_of_velocity`: Opcional, string, longitud 5-16 caracteres
- `timing_belt`: Boolean
- `brake_fluid`: Boolean
- `brake_pads`: Boolean
- `alignment`: Boolean
- `differential`: Boolean
- `change_engine_water`: Boolean

**Uso:**

```javascript
router.post("/", serviCardValidations, serviCardController.createServiCard);
```

**Respuesta de Error (400):**

Si alguna validación falla, se retorna:

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Mensaje de error",
      "path": "nombre_campo",
      "location": "body"
    }
  ]
}
```

---

## Detalles de Implementación

### Decisiones de Diseño Importantes

1. **Arquitectura en Capas**: Separación clara entre rutas, controladores, servicios y modelos para facilitar el mantenimiento y testing.

2. **Validación con express-validator**: Se utiliza `express-validator` para validar los datos de entrada antes de procesarlos, proporcionando mensajes de error claros.

3. **Paginación por Defecto**: Todas las consultas de listado incluyen paginación para evitar sobrecargar la base de datos y mejorar el rendimiento.

4. **Búsqueda con Sequelize Op.substring**: La búsqueda por patente utiliza `Op.substring` de Sequelize para búsquedas parciales (case-insensitive).

5. **Logging con Winston**: Sistema de logging robusto con rotación diaria de archivos y diferentes niveles de log (debug, info, error).

6. **Seguridad con Helmet**: Se utiliza Helmet para proteger la aplicación de vulnerabilidades comunes de seguridad HTTP.

7. **CORS Configurable**: CORS configurado con whitelist para controlar qué dominios pueden acceder a la API.

8. **Validación de Variables de Entorno**: Se utiliza `envalid` para validar que todas las variables de entorno requeridas estén presentes y tengan valores válidos.

### Dependencias e Integraciones

#### Variables de Entorno Requeridas

El proyecto requiere las siguientes variables de entorno (definidas en `.env`):

```env
# Servidor
PORT=3000
APP=Servi-Car-Api
ENVIRONMENT=development  # o production

# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=servicar_db
DB_DIALECT=mysql

# Logging
LOG_LEVEL=debug  # debug, info, error

# CORS (separado por espacios)
CORS=http://localhost:5173 http://localhost:3000
```

**Configuración:**

Crear un archivo `.env` en la raíz de `back/` con las variables anteriores.

#### Base de Datos

La aplicación utiliza **MySQL** como base de datos relacional. Sequelize se encarga de la gestión de conexiones y operaciones.

**Migraciones:**

Las migraciones se ejecutan con Sequelize CLI:

```bash
npx sequelize-cli db:migrate
```

**Modelo Principal:**

El modelo `ServiCar` representa una tarjeta de servicio con los siguientes campos:

- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
- `patent` (STRING)
- `kilometers` (INTEGER)
- `date` (DATEONLY)
- `engine` (BOOLEAN)
- `type_of_oil` (STRING)
- `filter_of_oil` (BOOLEAN)
- `filter_of_air` (STRING)
- `gasoline_filter` (BOOLEAN)
- `filter_of_gasoil` (BOOLEAN)
- `filter_anti_polen` (STRING)
- `plugs` (BOOLEAN)
- `box_of_velocity` (STRING)
- `timing_belt` (BOOLEAN)
- `brake_fluid` (BOOLEAN)
- `brake_pads` (BOOLEAN)
- `alignment` (BOOLEAN)
- `differential` (BOOLEAN)
- `change_engine_water` (BOOLEAN)
- `createdAt` (DATE)
- `updatedAt` (DATE)

### Sistema de Logging

El sistema de logging utiliza **Winston** con las siguientes características:

- **Rotación Diaria**: Los logs se guardan en archivos con formato `Servi-Car-Api-YYYY-MM-DD.log`
- **Compresión**: Los archivos antiguos se comprimen automáticamente
- **Retención**: Se mantienen logs de los últimos 15 días
- **Tamaño Máximo**: 10MB por archivo
- **Niveles**: debug, info, error
- **Formato**: JSON con timestamp y metadata

**Ubicación de Logs:**

```
back/logs/Servi-Car-Api-YYYY-MM-DD.log
```

## Ejemplos de Uso

### Caso de Uso 1: Listar Tarjetas con Paginación

```javascript
// Request
GET /api/v1/servi-card?page=0&size=10

// Response (200)
{
  "dataRow": [
    {
      "id": 1,
      "patent": "ABC123",
      "date": "2024-05-30",
      "kilometers": 10000
    },
    // ... más tarjetas
  ],
  "totalItems": 25,
  "totalPages": 3,
  "currentPage": 0
}
```

### Caso de Uso 2: Buscar Tarjetas por Patente

```javascript
// Request
GET /api/v1/servi-card?search=ABC

// Response (200)
{
  "dataRow": [
    {
      "id": 1,
      "patent": "ABC123",
      "date": "2024-05-30"
    },
    {
      "id": 5,
      "patent": "ABC456",
      "date": "2024-05-28"
    }
  ],
  "totalItems": 2,
  "totalPages": 1,
  "currentPage": 0
}
```

### Caso de Uso 3: Crear una Nueva Tarjeta

```javascript
// Request
POST /api/v1/servi-card
Content-Type: application/json

{
  "patent": "XYZ789",
  "kilometers": 5000,
  "date": "2024-06-01",
  "engine": true,
  "type_of_oil": "5w40",
  "filter_of_oil": true
}

// Response (201)
{
  "message": "Tarjeta created"
}

// Si hay errores de validación (400)
{
  "errors": [
    {
      "type": "field",
      "msg": "Patente es requerido y debe tener formato valido",
      "path": "patent",
      "location": "body"
    }
  ]
}
```

### Caso de Uso 4: Actualizar una Tarjeta

```javascript
// Request
PUT /api/v1/servi-card/1
Content-Type: application/json

{
  "kilometers": 15000,
  "engine": false
}

// Response (201)
{
  "message": "Tarjeta actualizada con exito"
}

// Si no existe (404)
{
  "error": "Tarjeta no encontrada"
}
```

### Caso de Uso 5: Eliminar una Tarjeta

```javascript
// Request
DELETE /api/v1/servi-card/1

// Response (200)
{
  "message": "Tarjeta/s eliminadas"
}

// Si no existe (404)
{
  "error": "Tarjeta/s no encontradas"
}
```

## Mejores Prácticas

### 1. Manejo de Errores

Siempre captura y maneja los errores apropiadamente:

```javascript
try {
  const serviCard = await serviCardService.createServiCard(req.body);
  res.status(201).json({ message: "Tarjeta created" });
} catch (error) {
  logger.api.error("Error creating serviCard:", error);
  res.status(400).json({ error: `Tarjeta not created ${error}` });
}
```

### 2. Validación de Datos

Siempre valida los datos de entrada antes de procesarlos:

```javascript
router.post("/", serviCardValidations, serviCardController.createServiCard);
```

### 3. Uso de Logging

Registra eventos importantes y errores:

```javascript
logger.api.debug("Conexión con la Base de Datos: EXITOSA");
logger.api.error("Error:", error);
```

### 4. Respuestas Consistentes

Mantén un formato consistente en las respuestas:

```javascript
// Éxito
res.status(200).json({ dataRow: [...], totalItems: 10 });

// Error
res.status(404).json({ error: "Tarjeta no encontrada" });
```

### 5. Paginación

Siempre usa paginación en endpoints de listado:

```javascript
const { limit, offset } = await getPagination(page, size);
const cards = await ServiCar.findAndCountAll({
  limit,
  offset,
  // ...
});
```

### 6. Ordenamiento

Ordena los resultados de manera consistente:

```javascript
order: [["date", "DESC"]]; // Más recientes primero
```

### 7. Validación de Variables de Entorno

Valida las variables de entorno al iniciar la aplicación:

```javascript
validateEnv.validate(); // Lanza error si faltan variables
```

## Errores Comunes

### 1. No Validar Variables de Entorno

❌ **Incorrecto:**

```javascript
const port = process.env.PORT; // Puede ser undefined
```

✅ **Correcto:**

```javascript
validateEnv.validate(); // Valida todas las variables requeridas
const port = process.env.PORT; // Garantizado que existe
```

### 2. No Manejar Errores de Base de Datos

❌ **Incorrecto:**

```javascript
const serviCard = await ServiCar.create(data);
res.status(201).json({ message: "Created" });
```

✅ **Correcto:**

```javascript
try {
  const serviCard = await ServiCar.create(data);
  res.status(201).json({ message: "Created" });
} catch (error) {
  logger.api.error("Error creating serviCard:", error);
  res.status(400).json({ error: error.message });
}
```

### 3. No Validar Datos de Entrada

❌ **Incorrecto:**

```javascript
router.post("/", serviCardController.createServiCard); // Sin validación
```

✅ **Correcto:**

```javascript
router.post("/", serviCardValidations, serviCardController.createServiCard);
```

### 4. Olvidar Paginación

❌ **Incorrecto:**

```javascript
const cards = await ServiCar.findAll(); // Puede retornar miles de registros
```

✅ **Correcto:**

```javascript
const { limit, offset } = await getPagination(page, size);
const cards = await ServiCar.findAndCountAll({
  limit,
  offset,
});
```

### 5. No Manejar CORS Correctamente

❌ **Incorrecto:**

```javascript
app.use(cors()); // Permite todos los orígenes
```

✅ **Correcto:**

```javascript
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
```

### 6. No Usar Logging

❌ **Incorrecto:**

```javascript
console.log("Error:", error); // No se guarda en archivos
```

✅ **Correcto:**

```javascript
logger.api.error("Error:", error); // Se guarda en logs rotativos
```

### 7. No Verificar Existencia Antes de Actualizar

❌ **Incorrecto:**

```javascript
const updated = await ServiCar.update(data, { where: { id } });
// No verifica si existe
```

✅ **Correcto:**

```javascript
const serviCardExist = await ServiCar.findByPk(id);
if (serviCardExist !== null) {
  const updated = await ServiCar.update(data, { where: { id } });
} else {
  return false;
}
```

## Instalación y Configuración

### Requisitos Previos

- Node.js 16+
- MySQL 8.0+
- pnpm (recomendado) o npm

### Instalación

1. **Instalar dependencias:**

```bash
cd back
pnpm install
```

2. **Configurar base de datos:**

Crear una base de datos MySQL:

```sql
CREATE DATABASE servicar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. **Configurar variables de entorno:**

Crear archivo `.env` en la raíz de `back/`:

```env
PORT=3000
APP=Servi-Car-Api
ENVIRONMENT=development
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=servicar_db
DB_DIALECT=mysql
LOG_LEVEL=debug
CORS=http://localhost:5173 http://localhost:3000
```

4. **Ejecutar migraciones:**

```bash
npx sequelize-cli db:migrate
```

5. **Ejecutar en desarrollo:**

```bash
pnpm start
```

El servidor iniciará en `http://localhost:3000`

6. **Ejecutar en producción:**

```bash
pnpm prod
```

### Scripts Disponibles

- `pnpm start`: Inicia el servidor en modo desarrollo con nodemon (auto-reload)
- `pnpm prod`: Inicia el servidor en modo producción
- `pnpm lint`: Ejecuta el linter ESLint con auto-fix

### Estructura de Logs

Los logs se guardan en la carpeta `logs/` con el siguiente formato:

```
logs/
├── Servi-Car-Api-2024-05-30.log
├── Servi-Car-Api-2024-05-29.log.gz
└── Servi-Car-Api-2024-05-28.log.gz
```

### Migraciones de Base de Datos

**Crear una nueva migración:**

```bash
npx sequelize-cli migration:generate --name nombre-de-la-migracion
```

**Ejecutar migraciones:**

```bash
npx sequelize-cli db:migrate
```

**Revertir última migración:**

```bash
npx sequelize-cli db:migrate:undo
```

**Revertir todas las migraciones:**

```bash
npx sequelize-cli db:migrate:undo:all
```

---

## 📝 Notas Adicionales

- El proyecto utiliza **ESLint** con la configuración **Standard** para mantener la consistencia del código
- La API sigue el estándar RESTful con códigos de estado HTTP apropiados
- Se utiliza **Sequelize** como ORM, lo que facilita el cambio de base de datos si es necesario
- El sistema de logging con Winston permite auditoría y debugging en producción
- La validación de variables de entorno con `envalid` previene errores de configuración comunes

---

**Última actualización:** Mayo 2024
