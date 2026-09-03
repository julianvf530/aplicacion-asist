# 🎺 Aplicación de Control de Asistencia

Aplicación web para gestionar la asistencia de los miembros de una banda de música.

Permite gestionar miembros, registrar ensayos y eventos, consultar el historial de asistencia y visualizar estadísticas.

El proyecto está desarrollado como una aplicación **full-stack**, con React en el frontend, Node.js/Express en el backend y SQLite como base de datos.

## ✨ Funcionalidades

* 👥 Gestión de miembros: añadir, editar, eliminar y buscar.
* 🔎 Filtros por categoría e instrumento.
* 📅 Registro de asistencia a ensayos y eventos.
* 📖 Historial de ensayos y eventos.
* 📊 Estadísticas de asistencia.
* 📥 Importación de miembros desde Excel.
* 📱 Interfaz responsive.
* 🗄️ Persistencia mediante SQLite.

## 🛠️ Tecnologías

**Frontend**

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios

**Backend**

* Node.js
* Express
* SQLite
* better-sqlite3
* ExcelJS / XLSX
* Multer

**Infraestructura**

* Docker
* Docker Compose
* Nginx

## 📁 Estructura

```text
aplicacion-asist/
├── frontend/          # Aplicación React
├── backend/           # API REST + SQLite
├── docker/             # Configuración Docker
├── docker-compose.yml
└── package.json
```

## 🚀 Probar la aplicación

### Requisitos

* Node.js
* npm
* Git

### Instalación

```bash
git clone https://github.com/julianvf530/aplicacion-asist.git
cd aplicacion-asist
npm install
```

### Ejecutar la demo

```bash
npm run demo
```

La demo genera automáticamente una base de datos SQLite independiente con **60 miembros ficticios, 25 ensayos/eventos y sus registros de asistencia**, y después inicia el frontend y el backend.

Accede a:

**http://localhost:5173**

Los datos de demostración se regeneran cada vez que se ejecuta `npm run demo` y no contienen información real.

## 🗄️ Base de datos

La aplicación utiliza SQLite y separa los datos de demostración de la base de datos utilizada en producción.

Las bases de datos y otros datos sensibles están excluidos del repositorio mediante `.gitignore`.

## 🎯 Objetivo

El proyecto busca sustituir un sistema manual de control de asistencia por una aplicación web sencilla, centralizada y fácil de utilizar, además de servir como proyecto práctico de desarrollo **full-stack**.
