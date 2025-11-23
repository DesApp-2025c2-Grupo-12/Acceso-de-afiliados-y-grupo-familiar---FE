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
├─ node_modules/
├─ public/
│   ├─ vite.svg
│   ├─ imagenes/
│   │   ├─ prestadores/
│   │   │   ├─ 1/
│   │   │   │   ├─ 1.jpg
│   │   │   │   ├─ 2.jpg
│   │   │   │   └─ 3.jpg
│   │   │   ├─ 2/
│   │   │   │   ├─ 1.jpg
│   │   │   │   ├─ 2.jpg
│   │   │   │   └─ 3.jpg
│   │   │   ├─ 3/
│   │   │   │   ├─ 1.jpg
│   │   │   │   ├─ 2.jpg
│   │   │   │   └─ 3.jpg
│   │   │   ├─ 4/
│   │   │   │   ├─ 1.jpg
│   │   │   │   ├─ 2.jpg
│   │   │   │   └─ 3.jpg
│   │   │   ├─ 5/
│   │   │   │   ├─ 1.jpg
│   │   │   │   ├─ 2.jpg
│   │   │   │   └─ 3.jpg
│   │   │   ├─ 6/
│   │   │   │   ├─ 1.jpg
│   │   │   │   ├─ 2.jpg
│   │   │   │   └─ 3.jpg
│   │   │   ├─ 7/
│   │   │   │   ├─ 1.jpg
│   │   │   │   ├─ 2.jpg
│   │   │   │   └─ 3.jpg
│   │   │   ├─ 8/
│   │   │   │   ├─ 1.jpg
│   │   │   │   ├─ 2.jpg
│   │   │   │   └─ 3.jpg
│   │   │   ├─ 9/
│   │   │   │   ├─ 1.jpg
│   │   │   │   ├─ 2.jpg
│   │   │   │   └─ 3.jpg
│   │   │   └─ 10/
│   │   │       ├─ 1.jpg
│   │   │       ├─ 2.jpg
│   │   │       └─ 3.jpg
│   │   ├─ centroMedico/
│   │   │   ├─ 1.jpg
│   │   │   ├─ 2.jpg
│   │   │   ├─ 3.jpg
│   │   │   ├─ 4.jpg
│   │   │   └─ 5.jpg
│   │   └─ logoPDF/
│   │       └─ LogoPDF.jpeg
├─ src/
│   ├─ assets/
│   │   ├─ icons/
│   │   │   ├─ autorizaciones-1.svg
│   │   │   ├─ autorizaciones-2.svg
│   │   │   ├─ home-1.svg
│   │   │   ├─ home-2.svg
│   │   │   ├─ prestadores-1.svg
│   │   │   ├─ prestadores-2.svg
│   │   │   ├─ recetas-1.svg
│   │   │   ├─ recetas-2.svg
│   │   │   ├─ reintegros-1.svg
│   │   │   ├─ reintegros-2.svg
│   │   │   ├─ turnos-1.svg
│   │   │   └─ turnos-2.svg
│   │   ├─ logo.png
│   │   └─ react.svg
│   ├─ components/
│   │   ├─ Cards/
│   │   │   └─ CardPersonalizada.jsx
│   │   ├─ Footer/
│   │   │   ├─ Footer.jsx
│   │   │   └─ Footer.css
│   │   ├─ Form/
│   │   │   ├─ Form.jsx
│   │   │   └─ Form.css
│   │   ├─ Header/
│   │   │   └─ Header.jsx
│   │   ├─ Navbar/
│   │   │   ├─ Navbar.jsx
│   │   │   └─ Navbar.css
│   │   └─ protectedRoutes/
│   │       └─ protectedRoutes.jsx
│   ├─ data/
│   │   ├─ grupoFamiliar.json
│   │   └─ reintegros.json
│   ├─ pages/
│   │   ├─ autorizaciones/
│   │   │   ├─ autorizaciones.jsx
│   │   │   ├─ buscarAutorizacion.jsx
│   │   │   ├─ cardAutorizacion.jsx
│   │   │   ├─ editarAutorizacion.jsx
│   │   │   ├─ nuevaAutorizacion.jsx
│   │   │   └─ verAutorizacion.jsx
│   │   ├─ home/
│   │   │   ├─ Home.jsx
│   │   │   └─ home.css
│   │   ├─ login/
│   │   │   ├─ Login.jsx
│   │   │   └─ login.css
│   │   ├─ prestadores/
│   │   │   ├─ PrestadorCard.jsx
│   │   │   ├─ PrestadorDetallesModal.jsx
│   │   │   ├─ PrestadorFilters.jsx
│   │   │   ├─ PrestadorList.jsx
│   │   │   ├─ PrestadorModal.jsx
│   │   │   └─ prestadores.jsx
│   │   ├─ recetas/
│   │   │   ├─ buscarReceta.jsx
│   │   │   ├─ cardReceta.jsx
│   │   │   ├─ descargarReceta.jsx
│   │   │   ├─ nuevaReceta.jsx
│   │   │   ├─ recetas.jsx
│   │   │   └─ renovarReceta.jsx
│   │   ├─ register/
│   │   │   ├─ Register.jsx
│   │   │   └─ register.css
│   │   ├─ reintegros/
│   │   │   ├─ CardReintegro.jsx
│   │   │   ├─ ModalDetalleReintegro.jsx
│   │   │   ├─ ModalNuevoReintegro.jsx
│   │   │   ├─ reintegros.jsx
│   │   │   └─ reintegros.css
│   │   └─ turnos/
│   │       ├─ turnos.jsx
│   │       ├─ nuevaTurno.jsx
│   │       └─ turnos.css
│   ├─ utils/
│   │   ├─ filtro.js
│   │   ├─ form.js
│   │   └─ utils.js
├─ App.css
├─ App.jsx
├─ index.css
├─ main.jsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js
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
