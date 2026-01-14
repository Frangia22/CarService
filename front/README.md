# Front End - Servi Card

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

### ¿Qué hace esta aplicación?

**Servi Card Frontend** es una aplicación web React diseñada para gestionar tarjetas de servicio de vehículos. Permite a los usuarios:

- **Visualizar** una lista paginada de tarjetas de servicio con búsqueda por patente
- **Crear** nuevas tarjetas de servicio con información detallada del mantenimiento del vehículo
- **Ver detalles** completos de cada tarjeta de servicio en un modal
- **Eliminar** tarjetas de servicio existentes
- **Cambiar** entre temas claro y oscuro

### ¿Por qué existe y cuál es su propósito?

Esta aplicación forma parte del sistema **CarService**, diseñado para ayudar a talleres mecánicos y propietarios de vehículos a llevar un registro organizado del historial de mantenimiento de sus vehículos. El frontend proporciona una interfaz de usuario intuitiva y moderna para interactuar con la API backend.

### Conceptos Clave y Terminología

- **ServiCard**: Una tarjeta de servicio que contiene información sobre el mantenimiento realizado a un vehículo en una fecha específica
- **Patente**: Identificador único del vehículo (formato: ABC999 o AA999BC)
- **Hook personalizado**: `useServiCard` - Hook de React que encapsula la lógica de negocio para las operaciones CRUD
- **Skeleton Loading**: Componentes de carga que muestran un placeholder mientras se obtienen los datos
- **Debounce**: Técnica para limitar la frecuencia de llamadas a la API durante la búsqueda

## Arquitectura

### Estructura del Proyecto

```
front/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Checkbox.jsx
│   │   ├── Footer.jsx
│   │   ├── Input.jsx
│   │   ├── ItemList.jsx
│   │   ├── Popups.jsx
│   │   ├── ServiCardDetail.jsx
│   │   ├── TableCard.jsx
│   │   └── ToggleTheme.jsx
│   ├── hooks/               # Hooks personalizados
│   │   └── useServiCard.js
│   ├── pages/               # Páginas/Views principales
│   │   ├── Home.jsx
│   │   ├── AddCardServi.jsx
│   │   └── NotFound404.jsx
│   ├── services/            # Servicios de API
│   │   └── serviCard.js
│   ├── helpers/             # Funciones auxiliares
│   │   └── validations.js
│   ├── skeletons/           # Componentes de carga
│   │   ├── AddServiCardSkeleton.jsx
│   │   ├── HomeSkeleton.jsx
│   │   └── Table.jsx
│   ├── App.jsx              # Componente raíz con rutas
│   └── main.jsx             # Punto de entrada
├── public/                  # Archivos estáticos
├── dist/                    # Build de producción
└── package.json
```

### Flujo de Datos

```
Usuario → Componente → Hook (useServiCard) → Servicio (serviCard.js) → API Backend
```

1. **Capa de Presentación**: Componentes React (`Home.jsx`, `AddCardServi.jsx`)
2. **Capa de Lógica**: Hook personalizado (`useServiCard.js`)
3. **Capa de Servicio**: Funciones de API (`serviCard.js`)
4. **Capa de Backend**: API REST

### Stack Tecnológico

- **React 18.2.0**: Biblioteca de UI
- **React Router DOM 6.23.1**: Enrutamiento
- **Vite 5.2.0**: Build tool y dev server
- **Tailwind CSS 3.4.3**: Framework de CSS utility-first
- **DaisyUI 4.11.1**: Componentes UI sobre Tailwind
- **just-debounce-it 3.2.0**: Utilidad para debounce

## Documentación de API

### Hook: `useServiCard`

Hook personalizado que gestiona el estado y las operaciones relacionadas con las tarjetas de servicio.

#### Firma de la Función

```javascript
export function useServiCard({ rows, search })
```

#### Parámetros

- `rows` (number, opcional): Número de filas por página (default: 5)
- `search` (string, opcional): Término de búsqueda para filtrar por patente

#### Valores de Retorno

```javascript
{
  getServiCard: Function,        // Obtiene lista de tarjetas
  dataRow: Array,                // Array de tarjetas de servicio
  totalItems: Number,            // Total de items
  totalPages: Number,            // Total de páginas
  currentPage: Number,          // Página actual
  loading: Boolean,             // Estado de carga
  error: String | null,        // Mensaje de error
  getServiCardByPk: Function,   // Obtiene una tarjeta por ID
  cardSelect: Object,           // Tarjeta seleccionada
  createNewServiCard: Function, // Crea una nueva tarjeta
  deletedServiCard: Function    // Elimina una tarjeta
}
```

#### Ejemplo de Uso

```javascript
import { useServiCard } from "../hooks/useServiCard";

function Home() {
  const [rows] = useState(5);
  const [search, setSearch] = useState("");
  const {
    getServiCard,
    dataRow,
    loading,
    getServiCardByPk,
    cardSelect,
    deletedServiCard,
  } = useServiCard({ rows, search });

  // Usar los valores y funciones retornados
}
```

#### Manejo de Errores

El hook maneja errores internamente y los expone a través del estado `error`. Las funciones pueden lanzar excepciones que deben ser capturadas en los componentes.

```javascript
try {
  const res = await deletedServiCard(id);
  if (res) {
    // Éxito
  }
} catch (error) {
  // Manejar error
  setShow({ ...show, error: true, message: "Hubo un error al eliminar" });
}
```

---

### Servicio: `serviCard.js`

Módulo que contiene las funciones para realizar peticiones HTTP a la API backend.

#### Funciones Disponibles

##### `getServiCardAll(rows, search, page)`

Obtiene una lista paginada de tarjetas de servicio.

**Parámetros:**

- `rows` (number, opcional): Número de elementos por página
- `search` (string, opcional): Término de búsqueda (patente)
- `page` (number, opcional): Número de página

**Retorna:** `Promise<Object>` con la estructura:

```javascript
{
  dataRow: Array,      // Array de tarjetas
  totalItems: Number,
  totalPages: Number,
  currentPage: Number
}
```

**Ejemplo:**

```javascript
const result = await getServiCardAll(5, "ABC123", 1);
console.log(result.dataRow); // Array de tarjetas
```

**Manejo de Errores:**

```javascript
try {
  const result = await getServiCardAll(5, "ABC123");
} catch (error) {
  console.error("Error al obtener tarjetas:", error);
}
```

##### `getServiCardById(id)`

Obtiene una tarjeta de servicio específica por su ID.

**Parámetros:**

- `id` (number | string): ID de la tarjeta

**Retorna:** `Promise<Object>` con la estructura:

```javascript
{
  dataRow: Array; // Array con un solo elemento (la tarjeta)
}
```

**Ejemplo:**

```javascript
const result = await getServiCardById(1);
const card = result.dataRow[0];
```

##### `createServiCard(dataServiCard)`

Crea una nueva tarjeta de servicio.

**Parámetros:**

- `dataServiCard` (Object): Objeto con los datos de la tarjeta

**Estructura del objeto:**

```javascript
{
  patent: string,              // Requerido
  kilometers: number,          // Requerido
  date: string,               // Requerido (formato: YYYY-MM-DD)
  engine: boolean,
  type_of_oil: string,
  filter_of_oil: boolean,
  filter_of_air: string,
  gasoline_filter: boolean,
  filter_of_gasoil: boolean,
  filter_anti_polen: string,
  plugs: boolean,
  box_of_velocity: string,
  timing_belt: boolean,
  brake_fluid: boolean,
  brake_pads: boolean,
  alignment: boolean,
  differential: boolean,
  change_engine_water: boolean
}
```

**Retorna:** `Promise<Object>` con la respuesta del servidor

**Ejemplo:**

```javascript
const newCard = {
  patent: "ABC123",
  kilometers: 10000,
  date: "2024-05-30",
  engine: true,
  type_of_oil: "5w40",
};

const result = await createServiCard(newCard);
if (!result.errors) {
  // Éxito
}
```

##### `deleteServiCard(id)`

Elimina una tarjeta de servicio.

**Parámetros:**

- `id` (number | string): ID de la tarjeta a eliminar

**Retorna:** `Promise<Object>` con la respuesta del servidor

**Ejemplo:**

```javascript
const result = await deleteServiCard(1);
if (result.success) {
  // Tarjeta eliminada
}
```

---

### Helpers: `validations.js`

Funciones de validación para formularios.

#### `validateRequired(value, fieldName)`

Valida que un campo tenga un valor.

**Parámetros:**

- `value` (any): Valor a validar
- `fieldName` (string): Nombre del campo para el mensaje de error

**Retorna:** `string` - Mensaje de error vacío si es válido, mensaje de error si no lo es

**Ejemplo:**

```javascript
const error = validateRequired("", "Patente");
// Retorna: 'Patente es requerido'

const error2 = validateRequired("ABC123", "Patente");
// Retorna: '' (válido)
```

#### `validateIsNumber(value, fieldName)`

Valida que un valor sea un número válido mayor que 0.

**Parámetros:**

- `value` (any): Valor a validar
- `fieldName` (string): Nombre del campo para el mensaje de error

**Retorna:** `string` - Mensaje de error vacío si es válido, mensaje de error si no lo es

**Ejemplo:**

```javascript
const error = validateIsNumber("abc", "Kilometros");
// Retorna: 'Kilometros debe ser un numero'

const error2 = validateIsNumber(10000, "Kilometros");
// Retorna: '' (válido)
```

#### `validatePatent(value)`

Valida el formato de una patente (ABC999 o AA999BC).

**Parámetros:**

- `value` (string): Patente a validar

**Retorna:** `string` - Mensaje de error vacío si es válido, mensaje de error si no lo es

**Ejemplo:**

```javascript
const error = validatePatent("ABC123");
// Retorna: '' (válido)

const error2 = validatePatent("AA123BC");
// Retorna: '' (válido)

const error3 = validatePatent("123ABC");
// Retorna: 'Patente debe tener el formato ABC999 o AA999BC'
```

## Detalles de Implementación

### Decisiones de Diseño Importantes

1. **Lazy Loading de Componentes**: Las páginas principales (`Home` y `AddCardServi`) se cargan de forma diferida usando `React.lazy()` para mejorar el rendimiento inicial.

2. **Debounce en Búsqueda**: Se implementa debounce de 500ms en la búsqueda para evitar múltiples llamadas a la API mientras el usuario escribe.

3. **Separación de Responsabilidades**:

   - Componentes: Solo presentación
   - Hooks: Lógica de estado y efectos
   - Servicios: Comunicación con API
   - Helpers: Funciones puras de utilidad

4. **Manejo de Estado Local**: Cada componente maneja su propio estado local para UI (modales, mensajes, formularios), mientras que el estado de datos se gestiona en el hook.

5. **Temas con DaisyUI**: Se utiliza DaisyUI para temas predefinidos (`emerald` y `business`) con persistencia en `localStorage`.

### Dependencias e Integraciones

#### Variables de Entorno

El proyecto requiere la siguiente variable de entorno:

- `VITE_API_URL`: URL base de la API backend

**Configuración:**
Crear un archivo `.env` en la raíz de `front/`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

#### Integración con Backend

El frontend se comunica con el backend a través de endpoints REST:

- `GET /servi-card?rows={rows}&search={search}` - Listar tarjetas
- `GET /servi-card/{id}` - Obtener tarjeta por ID
- `POST /servi-card` - Crear nueva tarjeta
- `DELETE /servi-card/{id}` - Eliminar tarjeta

### Rutas de la Aplicación

```javascript
/                    → Home (Lista de tarjetas)
/add-card-servi      → AddCardServi (Formulario de creación)
/*                   → NotFound404 (Página 404)
```

## Ejemplos de Uso

### Caso de Uso 1: Listar y Buscar Tarjetas

```javascript
import { useState } from "react";
import { useServiCard } from "../hooks/useServiCard";
import debounce from "just-debounce-it";
import { useCallback } from "react";

function Home() {
  const [rows] = useState(5);
  const [search, setSearch] = useState("");
  const { getServiCard, dataRow, loading } = useServiCard({ rows, search });

  const debounceSearchData = useCallback(
    debounce((rows, search) => {
      getServiCard(rows, search);
    }, 500),
    []
  );

  const handleChangeSearch = (event) => {
    const newSearch = event.target.value;
    debounceSearchData(rows, newSearch);
    setSearch(newSearch);
  };

  return (
    <input
      onChange={handleChangeSearch}
      type="text"
      placeholder="Buscar por patente"
    />
  );
}
```

### Caso de Uso 2: Crear una Nueva Tarjeta

```javascript
import { useState } from "react";
import { useServiCard } from "../hooks/useServiCard";
import { validateRequired, validateIsNumber } from "../helpers/validations";

function AddCardServi() {
  const { createNewServiCard } = useServiCard();
  const [patent, setPatent] = useState("");
  const [kilometers, setKilometers] = useState(0);
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({
    patent: "",
    kilometers: "",
    date: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones
    const newErrors = {
      patent: validateRequired(patent, "Patente"),
      kilometers:
        validateRequired(kilometers, "Kilometros") ||
        validateIsNumber(kilometers, "Kilometros"),
      date: validateRequired(date, "Fecha"),
    };

    if (Object.values(newErrors).every((error) => error === "")) {
      const data = {
        patent: patent.toUpperCase(),
        kilometers: Number(kilometers),
        date,
        engine: false,
        // ... otros campos
      };

      try {
        const res = await createNewServiCard(data);
        if (!res.errors) {
          // Éxito - redirigir o mostrar mensaje
        }
      } catch (error) {
        // Manejar error
      }
    } else {
      setErrors(newErrors);
    }
  };

  return <form onSubmit={handleSubmit}>{/* Campos del formulario */}</form>;
}
```

### Caso de Uso 3: Ver Detalles y Eliminar

```javascript
function Home() {
  const { getServiCardByPk, cardSelect, deletedServiCard } = useServiCard();

  const handleView = (id) => {
    document.getElementById("my_modal_1").showModal();
    getServiCardByPk(id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deletedServiCard(id);
      if (res) {
        getServiCard(5); // Recargar lista
        // Mostrar mensaje de éxito
      }
    } catch (error) {
      // Mostrar mensaje de error
    }
  };

  return (
    <>
      <button onClick={() => handleView(card.id)}>Ver</button>
      <button onClick={() => handleDelete(card.id)}>Eliminar</button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <ServiCardDetail dataRow={cardSelect} />
        </div>
      </dialog>
    </>
  );
}
```

## Mejores Prácticas

### 1. Validación de Formularios

Siempre valida los campos requeridos antes de enviar:

```javascript
const isFormValid = () => {
  return (
    !validateRequired(patent) &&
    !validateRequired(kilometers) &&
    !validateIsNumber(kilometers) &&
    !validateRequired(date)
  );
};
```

### 2. Manejo de Errores

Siempre envuelve las llamadas a la API en bloques try-catch:

```javascript
try {
  const res = await createNewServiCard(data);
  if (!res.errors) {
    // Éxito
  } else {
    // Error del servidor
  }
} catch (error) {
  // Error de red o excepción
  console.error("Error:", error);
}
```

### 3. Debounce en Búsquedas

Usa debounce para búsquedas en tiempo real:

```javascript
const debounceSearchData = useCallback(
  debounce((rows, search) => {
    getServiCard(rows, search);
  }, 500),
  []
);
```

### 4. Normalización de Datos

Convierte la patente a mayúsculas automáticamente:

```javascript
const handleChangePatent = (event) => {
  const newPatent = event.target.value.toUpperCase();
  setPatent(newPatent);
};
```

### 5. Estados de Carga

Muestra skeletons o spinners durante las cargas:

```javascript
{
  loading ? (
    <TableSkeleton rows={[1, 2, 3, 4, 5]} />
  ) : (
    <TableCard dataRow={dataRow} />
  );
}
```

### 6. Persistencia de Tema

Guarda la preferencia del usuario en localStorage:

```javascript
const [theme, setTheme] = useState(() => {
  return window.localStorage.getItem("theme") || "business";
});

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("theme", theme);
}, [theme]);
```

## Errores Comunes

### 1. Olvidar Validar Antes de Enviar

❌ **Incorrecto:**

```javascript
const handleSubmit = async (event) => {
  event.preventDefault();
  await createNewServiCard(data); // Sin validación
};
```

✅ **Correcto:**

```javascript
const handleSubmit = async (event) => {
  event.preventDefault();
  if (isFormValid()) {
    await createNewServiCard(data);
  }
};
```

### 2. No Manejar Errores de Red

❌ **Incorrecto:**

```javascript
const res = await createNewServiCard(data);
if (!res.errors) {
  // Éxito
}
```

✅ **Correcto:**

```javascript
try {
  const res = await createNewServiCard(data);
  if (!res.errors) {
    // Éxito
  }
} catch (error) {
  // Manejar error de red
  setShow({ error: true, message: "Error de conexión" });
}
```

### 3. No Usar Debounce en Búsquedas

❌ **Incorrecto:**

```javascript
const handleChangeSearch = (event) => {
  setSearch(event.target.value);
  getServiCard(rows, event.target.value); // Llamada en cada tecla
};
```

✅ **Correcto:**

```javascript
const debounceSearchData = useCallback(
  debounce((rows, search) => {
    getServiCard(rows, search);
  }, 500),
  []
);

const handleChangeSearch = (event) => {
  const newSearch = event.target.value;
  debounceSearchData(rows, newSearch);
  setSearch(newSearch);
};
```

### 4. Olvidar Resetear el Formulario

❌ **Incorrecto:**

```javascript
const handleSubmit = async (event) => {
  await createNewServiCard(data);
  // Formulario sigue con datos
};
```

✅ **Correcto:**

```javascript
const handleSubmit = async (event) => {
  const res = await createNewServiCard(data);
  if (!res.errors) {
    resetForm(); // Limpiar formulario
  }
};
```

### 5. No Verificar Variables de Entorno

❌ **Incorrecto:**

```javascript
const API_URL = "http://localhost:3000/api/v1"; // Hardcodeado
```

✅ **Correcto:**

```javascript
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error("VITE_API_URL no está definida");
}
```

## Instalación y Configuración

### Requisitos Previos

- Node.js 16+
- pnpm (recomendado) o npm

### Instalación

1. **Instalar dependencias:**

```bash
cd front
pnpm install
```

2. **Configurar variables de entorno:**
   Crear archivo `.env` en la raíz de `front/`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

3. **Ejecutar en desarrollo:**

```bash
pnpm dev
```

4. **Build para producción:**

```bash
pnpm build
```

5. **Preview del build:**

```bash
pnpm preview
```

### Scripts Disponibles

- `pnpm dev`: Inicia el servidor de desarrollo (puerto 5173 por defecto)
- `pnpm build`: Genera el build de producción en `dist/`
- `pnpm preview`: Previsualiza el build de producción
- `pnpm lint`: Ejecuta el linter ESLint

### Estructura de Build

El build se genera en la carpeta `dist/` con la siguiente estructura:

```
dist/
├── assets/        # Archivos JS y CSS optimizados
├── img/          # Imágenes estáticas
└── index.html    # HTML principal
```

---

## 📝 Notas Adicionales

- El proyecto utiliza **ESLint** con la configuración **Standard** para mantener la consistencia del código
- Los componentes están escritos en **JSX** sin TypeScript
- Se utiliza **Tailwind CSS** con **DaisyUI** para el diseño, lo que permite cambios rápidos de tema
- La aplicación es completamente responsive y funciona en dispositivos móviles y desktop

---

**Última actualización:** Mayo 2024
