# ContaMovil - Web 🌐🛠️

Repositorio del cliente web para el ecosistema de **ContaMovil**. Este dashboard está construido con **React 19** y **Vite**, enfocado en la gestión administrativa, reportes avanzados y exportación de datos para comercios.

## 🏗️ Arquitectura del Proyecto

El frontend utiliza una estructura orientada a dominios y escalabilidad, alineada con principios de **Clean Architecture**:

*   **Domain-Driven Design (Partial):** Lógica de negocio organizada en la carpeta `domains/` para separar entidades y casos de uso.
*   **Shared Components:** Componentes de UI reutilizables basados en **Radix UI** y **Shadcn UI**.
*   **State Management:** Gestión de estado ligero y eficiente con **Zustand**.
*   **Modular Routing:** Navegación protegida y basada en componentes con `react-router-dom`.

## 🛠️ Stack Tecnológico

### Core
*   **Framework:** [React](https://react.dev/) v19.1.1
*   **Build Tool:** [Vite](https://vitejs.dev/) v7.1.2
*   **Type System:** [TypeScript](https://www.typescriptlang.org/)
*   **Router:** `react-router-dom` v7.8.2

### UI & Styling
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) con animaciones de `tailwindcss-animate`.
*   **Componentes:** [Radix UI](https://www.radix-ui.com/) (Primitives para accesibilidad).
*   **Icons:** [Lucide React](https://lucide.dev/).
*   **Theming:** `next-themes` para soporte de modo oscuro/claro.
*   **Notifications:** `sonner` para toasts de alta fidelidad.

### Integraciones y Utilidades
*   **BaaS:** [@supabase/supabase-js](https://supabase.com/) para autenticación y persistencia de datos.
*   **Data Handling:** `exceljs` para la generación y exportación de reportes operativos en Excel.
*   **Date Management:** `date-fns` y `react-day-picker`.

## 📁 Estructura de Directorios

Basado en la organización del código fuente (ver `src/` en las capturas):

*   `src/app/`: Configuración principal de la aplicación y proveedores.
*   `src/auth/`: Lógica, vistas y hooks específicos de autenticación con Supabase.
*   `src/domains/`: Módulos de lógica de negocio (Inventario, Ventas, Clientes).
*   `src/shared/`: Componentes, hooks, tipos y utilidades globales.
*   `src/styles/`: Configuraciones globales de CSS y temas de Tailwind.
*   `src/contexts/`: Proveedores de contexto de React para estado compartido.

## ⚙️ Scripts de Desarrollo

*   `npm run dev`: Inicia el servidor de desarrollo local con Vite (soporta `--host`).
*   `npm run build`: Compila el proyecto con TypeScript y genera el build optimizado en `/dist`.
*   `npm run lint`: Ejecuta ESLint para asegurar la calidad y consistencia del código.
*   `npm run preview`: Previsualiza localmente el build de producción.

## 🚀 Despliegue

El proyecto incluye una configuración de `vercel.json` para despliegues continuos en **Vercel**, optimizado para aplicaciones SPA con enrutamiento del lado del cliente.

---
**Nota:** Este repositorio es privado. Mantener el tipado estricto en `domains/` y seguir el flujo de trabajo de Git establecido para el equipo.
