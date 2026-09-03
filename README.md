# 🎵 Aplicación de Gestión de Asistencia

Aplicación web full-stack desarrollada para gestionar la asistencia de los miembros de una agrupación musical a ensayos y eventos.

El proyecto permite administrar miembros, registrar asistencias, consultar el historial de ensayos y obtener estadísticas de participación.

La aplicación nació como una solución para una necesidad real y posteriormente se ha preparado para poder desplegarse mediante Docker en un servidor Linux.

> **Privacidad:** los datos utilizados en la versión pública y en cualquier demostración del proyecto son ficticios. Los datos reales de los usuarios no forman parte de este repositorio.

---

## 🚀 Funcionalidades

* Gestión de miembros de la agrupación.
* Alta y edición de miembros.
* Baja lógica de miembros sin eliminar su historial.
* Importación de miembros desde archivos Excel.
* Registro de ensayos y eventos.
* Registro de asistencia por miembro.
* Historial de ensayos.
* Eliminación de ensayos.
* Cálculo del porcentaje de asistencia por miembro.
* Detección de miembros con menos del 80 % de asistencia durante el último mes.
* Búsqueda y filtros.
* Interfaz responsive para escritorio y dispositivos móviles.
* Persistencia de datos mediante SQLite.

---

## 🛠️ Tecnologías utilizadas

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express
* better-sqlite3
* Multer
* XLSX / ExcelJS

### Base de datos

* SQLite

### Infraestructura y despliegue

* Docker
* Docker Compose
* Nginx
* Ubuntu Server

---

## 🏗️ Arquitectura

La aplicación sigue una arquitectura cliente-servidor.

```text
Navegador
    │
    ▼
Nginx
    │
    ├── /        → Frontend React
    │
    └── /api     → Backend Express
                       │
                       ▼
                    SQLite
```

El frontend se compila mediante Vite y se sirve como contenido estático utilizando Nginx.

Nginx también funciona como reverse proxy para las peticiones dirigidas a `/api`, que son enviadas al contenedor del backend.

El backend utiliza Express para proporcionar una API REST y SQLite para almacenar los datos.

---

## 📁 Estructura del proyecto

```text
aplicacion-asist/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── repositories/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── types/
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── volumes/
│   └── sqlite/
│
└── docker-compose.yml
```

---

## 🔧 Backend

El backend está organizado utilizando varias capas:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
SQLite
```

### Routes

Definen los endpoints disponibles en la API.

### Controllers

Reciben las peticiones HTTP y devuelven las respuestas.

### Services

Contienen la lógica de negocio de la aplicación.

### Repositories

Gestionan directamente las operaciones sobre SQLite.

Esta separación permite mantener desacoplada la lógica HTTP de la lógica de negocio y del acceso a datos.

---

## 👥 Gestión de miembros

Cada miembro contiene información como:

* Número
* Nombre
* Categoría
* Instrumento
* Estado activo/inactivo

Los miembros no se eliminan físicamente de la base de datos cuando abandonan la agrupación.

En su lugar se utiliza una **baja lógica**:

```text
activo = 0
```

Esto permite conservar todas las asistencias históricas asociadas al miembro.

Si posteriormente vuelve a formar parte de la agrupación, puede ser reactivado manteniendo su historial anterior.

---

## 📥 Importación desde Excel

La aplicación permite importar la lista de miembros desde un archivo Excel.

Durante la importación:

1. Se lee el archivo.
2. Se comprueba si cada miembro ya existe.
3. Los miembros existentes son actualizados.
4. Los nuevos miembros son insertados.
5. Los miembros que ya no aparecen en el listado pasan a estado inactivo.

De esta forma se mantiene actualizado el listado sin eliminar información histórica.

---

## 📅 Gestión de ensayos

Cada ensayo contiene:

* Fecha
* Tipo
* Registro de asistencia

Para cada miembro se almacena si estuvo presente o ausente.

El histórico permite consultar posteriormente las asistencias registradas en cada ensayo.

---

## 📊 Estadísticas

La aplicación calcula estadísticas directamente a partir de los registros almacenados.

Actualmente incluye:

### Porcentaje de asistencia

Para cada miembro:

```text
porcentaje =
asistencias / total de ensayos × 100
```

### Avisos de baja asistencia

Se muestran los miembros cuya asistencia durante el último mes se encuentra por debajo del:

```text
80 %
```

---

## 🌐 API REST

Algunos de los endpoints disponibles son:

```text
GET    /api/members
POST   /api/members
PUT    /api/members/:id
DELETE /api/members/:id

GET    /api/ensayos
POST   /api/ensayos
DELETE /api/ensayos/:id

POST   /api/import/members

GET    /api/statistics/attendance
GET    /api/statistics/warnings
```

---

## 🐳 Docker

La aplicación está completamente dockerizada.

Docker Compose gestiona actualmente dos servicios principales:

```text
frontend
backend
```

El frontend utiliza un **multi-stage build**:

```text
Node.js
   │
   ├── npm install
   └── npm run build
           │
           ▼
         dist/
           │
           ▼
         Nginx
```

La imagen final del frontend contiene únicamente Nginx y los archivos estáticos generados por Vite.

---

## 💾 Persistencia

SQLite se almacena fuera del contenedor mediante un volumen.

```text
Servidor
│
└── volumes/sqlite/database.sqlite
            │
            ▼
       /data/database.sqlite
            │
            ▼
        Backend
```

Esto permite reconstruir o eliminar los contenedores sin perder los datos almacenados.

La ruta de la base de datos se configura mediante la variable de entorno:

```text
DB_PATH
```

---

## ▶️ Ejecutar con Docker

### Requisitos

* Docker
* Docker Compose

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd aplicacion-asist
```

Construir y ejecutar:

```bash
docker compose up -d --build
```

La aplicación estará disponible normalmente en:

```text
http://localhost
```

Para detenerla:

```bash
docker compose down
```

---

## 💻 Desarrollo local

### Backend

```bash
cd backend
npm install
npm run dev
```

El backend se ejecuta por defecto en:

```text
http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite mostrará la URL del servidor de desarrollo, normalmente:

```text
http://localhost:5173
```

---

## 🔒 Privacidad y datos

Este proyecto fue desarrollado para solucionar una necesidad real.

Por motivos de privacidad:

* Las bases de datos reales no forman parte del repositorio.
* Los archivos SQLite están excluidos mediante `.gitignore`.
* Los archivos subidos temporalmente no se versionan.
* No se publican nombres ni datos pertenecientes a usuarios reales.
* Cualquier versión pública o demostración utiliza exclusivamente datos ficticios.

---

## 📌 Estado del proyecto

El proyecto se encuentra en una primera versión funcional.

Actualmente está siendo probado en un entorno real para detectar posibles mejoras de experiencia de usuario y nuevas necesidades.

Posibles mejoras futuras:

* Autenticación y gestión de usuarios.
* Sistema automático de copias de seguridad.
* Exportación avanzada de estadísticas.
* Mejoras adicionales de interfaz móvil.
* HTTPS y dominio público.
* Automatización del despliegue mediante CI/CD.

---

## 👨‍💻 Autor

Proyecto desarrollado por Julián Villaescusa como proyecto full-stack orientado al aprendizaje y aplicación práctica de:

* Desarrollo frontend
* Desarrollo backend
* Diseño de APIs REST
* Bases de datos
* Docker
* Administración básica de servidores Linux
* Despliegue de aplicaciones web
