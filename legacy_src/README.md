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


