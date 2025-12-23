# Agave Fitness

**Plataforma de bienestar físico integral y entrenamiento virtual inteligente.**

Agave Fitness es una aplicación web moderna, **Serverless** (sin backend) y ejecutada 100% en el cliente, diseñada para gestionar el bienestar físico del usuario en un solo lugar. Combina la flexibilidad de un generador de rutinas personalizado con la experiencia inmersiva de un centro de entrenamiento virtual.

## Galería del Proyecto

A continuación se muestran algunas capturas de la interfaz "Premium" y la experiencia de usuario:

![Vista de la Aplicación](./Design/Screenshot%202025-12-22%20161003.png)
*Interfaz principal con diseño moderno y accesible.*

![Generador de Rutinas](./Design/Screenshot%202025-12-22%20161120.png)
*Panel de generación de rutinas personalizadas.*

---

## Características Principales

### 1. Centro de Entrenamiento Virtual (VOD)
El "Netflix" de tu gimnasio. Una biblioteca de clases bajo demanda que utiliza YouTube como fuente de contenido, organizada por categorías:
*   **Categorías**: Yoga, HIIT, Fuerza, Dance.
*   **Filtrado Inteligente**: Búsqueda por duración, intensidad o tipo de clase.
*   **Reproductor Integrado**: Experiencia fluida sin salir de la aplicación.

### 2. Generador de Rutinas Inteligente
Un sistema avanzado que crea entrenamientos adaptados a tus recursos y metas:
*   **Selección de Equipamiento**: Desde peso corporal (calistenia) hasta gimnasio completo (mancuernas, barras, máquinas).
*   **Equipamiento Detallado**: Posibilidad de especificar aparatos concretos (banco, poleas, kettlebells).
*   **Enfoque Muscular**: Tren superior, inferior, core o cuerpo completo.
*   **Objetivos Claros**: Hipertrofia, Fuerza, Resistencia o Definición.
*   **Generación al Instante**: Algoritmos en el cliente que arman la rutina perfecta en segundos.

### 3. Seguimiento y Progreso
*   Registro de horas de entrenamiento.
*   Historial de actividad.
*   Visualización de progreso personal.

## Arquitectura y Tecnología

Este proyecto destaca por su arquitectura **Client-Side** robusta y escalable:
*   **Vanilla JavaScript (ES Modules)**: Sin frameworks pesados, garantizando rendimiento y control total.
*   **HTML5 & CSS3**: Diseño responsivo, elegante y con animaciones fluidas (Glassmorphism, gradientes).
*   **Serverless**: No requiere base de datos ni servidor API; todo ocurre en el navegador del usuario.
*   **Arquitectura Modular**: Código organizado en componentes, servicios y vistas para facilitar el mantenimiento.

## Cómo Ejecutar el Proyecto

Debido al uso de **ES Modules**, el proyecto debe servirse a través de un servidor web local para evitar restricciones de seguridad del navegador (CORS).


### Opción Recomendada: Python
Si tienes Python instalado, ejecuta el siguiente comando en la carpeta raíz:

```powershell
python -m http.server 80
```

Luego abre `http://localhost:80` en tu navegador.

### Opción Alternativa: Visual Studio Code 
1.  Instala la extensión **Live Server**.
2.  Haz clic derecho en `index.html`.
3.  Selecciona **"Open with Live Server"**.



## Compartir en Internet Temporalmente a través de Ngrok

1.  Descarga e instala [Ngrok](https://ngrok.com/).
2.  Ejecuta el siguiente comando en la carpeta raíz:

```powershell
ngrok http 80
```

Luego abre `http://localhost:80` en tu navegador.


## Getting Started Next.JS

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
