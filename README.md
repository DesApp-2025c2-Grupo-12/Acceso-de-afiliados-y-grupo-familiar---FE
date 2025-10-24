# Acceso de afiliados y grupo familiar desde el Front End

# 🖱️ Objetivo
El proyecto de afiliados es una aplicación web desarrollada con el fin de que los afiliados a la empresa (Medicina Integral) y algunos miembros del grupo familiar puedan:

* Solicitar turnos de atención.
* Gestionar reintegros.
* Abrir pedidos de autorización de prestaciones que deben ser autorizadas.
* Registrar recetas para las que se solicita cobertura por parte de la empresa.
* Consultar la cartilla de prestadores.

# 💾 Tecnologías utilizadas
* Javascript. 
* React.
* Express.
* NodeJS.
* Sequelice.
* Vite.
* Figma.

# 🗂️ Estructura del Proyecto

```
Acceso-de-afiliados-y-grupo-familiar---FE/
│
├─ public/
│   └─ vite.svg
│
├─ src/
│   ├─ assets/
│   │
│   ├─ components/
│   │   ├─ Cards/
│   │   │   └─ CardsPersonalizadas.jsx
│   │   ├─ Footer/
│   │   │   └─ Footer.jsx
│   │   ├─ Form/
│   │   │   └─ Form.jsx
│   │   ├─ Header/
│   │   │   └─ Header.jsx
│   │   └─ Navbar/
│   │       └─ Navbar.jsx
│   │
│   └─ protectedRoutes/
│       └─ protectedRoutes.jsx
│
├─ data/
│   └─ prestadores.json
│
├─ pages/
│   ├─ autorizaciones/
│   │   └─ Autorizaciones.jsx
│   ├─ home/
│   │   └─ Home.jsx
│   ├─ login/
│   │   └─ Login.jsx
│   ├─ prestadores/
│   │   ├─ Prestadores.jsx
│   │   ├─ PrestadorFilters.jsx
│   │   ├─ PrestadorList.jsx
│   │   └─ PrestadorModal.jsx
│   └─ recetas/
│       ├─ BuscarReceta.jsx
│       ├─ CardReceta.jsx
│       ├─ Receta.jsx
│       ├─ DescargarReceta.jsx
│       ├─ NuevaReceta.jsx
│       └─ RenovarReceta.jsx
│
├─ utils/
│   ├─ filtro.jsx
│   ├─ form.jsx
│   └─ utils.jsx
│
├─ App.jsx
├─ app.css
├─ main.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ vite.config.js
├─ eslint.config.js
├─ .gitignore
└─ README.md


```

# 🚀 Uso
1. Clonar el repositorio.
2. Instalar las dependencias con npm install.
3. Ejecutar el servidor de desarrollo con npm run dev.

# 🧑‍💻 Autores
Proyecto académico desarrollado en el marco de la Universidad Nacional de Hurlingham (UnaHur). Equipo de desarrollo:

* Diego Andrés Primera.
* Gabriel Facundo Gutiérrez.
* Ezequiel Escobar.
* Franco Cantero.
* Luana Belén Calderón.
