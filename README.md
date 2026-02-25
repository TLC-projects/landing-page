# 🎓 TLC - Centro de Entrenamiento & Aprendizaje de Idiomas

Landing page oficial del Centro de Entrenamiento y Aprendizaje de Idiomas TLC en Colombia. Sitio web moderno y accesible construido con Astro, React y TailwindCSS.

## 🌟 Características

- ✅ **SEO Optimizado** - Meta tags completos, Open Graph, Twitter Cards, Schema.org
- ♿ **Accesibilidad (A11Y)** - Componentes accesibles, contraste, navegación por teclado
- 🎨 **Modo Oscuro** - Tema claro/oscuro con persistencia
- 📱 **Responsive Design** - Diseño adaptativo para todos los dispositivos
- 🚀 **Alto Rendimiento** - Optimizado con Astro para carga ultrarrápida
- 🎤 **Audio Accesibilidad** - Descripción por audio para usuarios con discapacidad visual

## 🚀 Estructura del Proyecto

```text
/
├── public/
│   ├── assets/
│   │   ├── images/         # Imágenes del sitio
│   │   ├── icons/          # Iconos
│   │   ├── fonts/          # Fuentes personalizadas
│   │   └── audio/          # Archivos de audio para A11Y
│   ├── robots.txt          # Configuración SEO para bots
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── sections/       # Secciones reutilizables
│   │   └── ui/             # Componentes UI (buttons, cards, etc)
│   ├── hooks/              # Custom React hooks
│   ├── layouts/
│   │   └── Layout.astro    # Layout principal con SEO
│   ├── lib/                # Utilidades y servicios
│   ├── pages/              # Rutas del sitio
│   │   ├── index.astro
│   │   ├── inscripcion.astro
│   │   ├── quienes-somos.astro
│   │   └── programas/      # Programas académicos
│   └── styles/             # Estilos globales
├── astro.config.mjs        # Configuración Astro + Sitemap
├── tsconfig.json
└── package.json
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto en la terminal:

| Comando                   | Acción                                              |
| :------------------------ | :-------------------------------------------------- |
| `npm install`             | Instala las dependencias                            |
| `npm run dev`             | Inicia servidor de desarrollo en `localhost:4321`   |
| `npm run build`           | Construye el sitio para producción en `./dist/`     |
| `npm run preview`         | Previsualiza el build localmente antes de desplegar |
| `npm run astro ...`       | Ejecuta comandos CLI de Astro                       |
| `npm run astro -- --help` | Obtiene ayuda sobre Astro CLI                       |

## 🔧 Tecnologías Utilizadas

- **[Astro](https://astro.build)** - Framework web moderno
- **[React](https://react.dev)** - Componentes interactivos
- **[TailwindCSS](https://tailwindcss.com)** - Framework CSS utility-first
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Lucide Icons](https://lucide.dev/)** - Iconos modernos
- **[React Hook Form](https://react-hook-form.com/)** - Manejo de formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas

## 🌐 Configuración del Sitio

### Dominio Principal
Actualizar en `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://ceaitlc.edu.co',
  // ...
})
```

## 📦 Instalación y Desarrollo

1. **Clonar el repositorio**
   ```bash
   git clone git@github.com:TLC-projects/landing-page.git
   cd landing-page
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4321
   ```

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `./dist/`

### Preview del Build
```bash
npm run preview
```

## ❤️ Hecho con el 💙 en Books&Books  

Nos enorgullece desarrollar este proyecto como parte del compromiso de **Books&Books** con la educación y la innovación tecnológica. 🌟  

Gracias por visitar nuestro proyecto. ¡Juntos podemos hacer del aprendizaje una experiencia increíble! 🥳✨  
