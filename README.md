# Logitravel Frontend Challenge - Alejandro Guiter

Este repositorio contiene dos implementaciones del mismo reto técnico:
una en **Vanilla JS** y otra en **React + TypeScript**.

El objetivo es gestionar una lista de cadenas de texto con operaciones de:

- Añadir ítems (con validación).
- Seleccionar uno o varios ítems.
- Eliminar ítems seleccionados o con doble click.
- Deshacer (undo) el último cambio.
- Uso de un **modal animado** para añadir nuevos ítems.

## 🚀 Deploy

[Demo en Vercel](https://lt-challenge.vercel.app/)

## 📂 Estructura del repositorio

```plaintext
├── vanilla/   # Implementación en HTML, CSS y JS plano
└── react/     # Implementación en React + TypeScript (con Vite)
```

## 🛠️ Tecnologías usadas

- Vanilla: HTML5, CSS3, JavaScript ES6
- React: React 18, TypeScript, Vite
- Estilos: SCSS (Google Fonts: Montserrat)
- Testing: Vitest + React Testing Library
- CI/CD: GitHub Actions (build + test en cada push/PR)
- Deploy: Vercel (auto-deploys de master + previews en PRs)

## ▶️ Como ejecutar localmente

## Vanilla

Abrir `vanilla/index.html` en el navegador.

## React

`cd react`,
`npm install` &&
`npm run dev`

## ✅ Features implementadas

- [x] Añadir items desde modal animado
- [x] Eliminar múltiples items seleccionadors
- [x] Eliminar ítem con doble click
- [x] Historial de cambios, acción UNDO.
- [x] Tests unitarios y de integración
- [x] CI/CD con GitHub Actions
- [x] Deploy en Vercel

## 🧪 Testing

`cd react` &&
`npm run test`

## ⚙️ CI/CD

Este proyecto incluye un workflow de GitHub Actions:

- Corre en cada push y pull_request.
- Instala dependencias, build y ejecuta los tests.
- Asegura que la rama main siempre sea estable.

Archivo: `.github/workflows/ci.yml`

## 💡 Posibles mejoras a futuro

Estas features no fueron requeridas en el challenge, pero podrían añadirse para enriquecer la aplicación:

- Persistencia de datos: guardar en localStorage o en una API real para no perder los ítems al refrescar.
- Accesibilidad.
- Dark mode.
- Internacionalización con i18n.
- Pruebas E2E con Playwright.
- Drag & drop para quitar items de la lista o reodernarlos.
- Reglas en branches: Evitar push a main, garantizar revisión de codigo de un compañero de equipo en los PR, solicitar minimo coverage (vitest config).
