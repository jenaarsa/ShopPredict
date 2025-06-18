# ShopPredict - Documentación Técnica del Proyecto

## Descripción General

ShopPredict es una plataforma web avanzada de análisis predictivo que utiliza técnicas de Machine Learning para predecir la intención de compra de usuarios en sitios de e-commerce. El proyecto está basado en el dataset UCI "Online Shoppers Purchasing Intention" del sitio web Columbia.com.tr, que contiene 12,330 sesiones de usuario con múltiples variables comportamentales.

## Arquitectura del Sistema

### Frontend (Cliente)
El frontend está construido como una Single Page Application (SPA) moderna que combina análisis de datos, visualización interactiva y predicción en tiempo real mediante inteligencia artificial.

### Backend (API)
La aplicación se conecta a una API REST desplegada en Google Cloud Run que maneja las predicciones de Machine Learning y el procesamiento de consultas en lenguaje natural.

## Stack Tecnológico

### Lenguajes de Programación
- **TypeScript**: Lenguaje principal del frontend, proporcionando tipado estático y mejor experiencia de desarrollo
- **JavaScript**: Para configuraciones y scripts de build
- **CSS**: A través de Tailwind CSS para el diseño y estilos

### Framework y Librerías Frontend

#### React 18.3.1
- **Hooks utilizados**: useState para manejo de estado local
- **Componentes funcionales**: Arquitectura moderna basada en componentes funcionales
- **Event handling**: Manejo de formularios y interacciones de usuario
- **Conditional rendering**: Renderizado condicional para estados de carga y resultados

#### Tailwind CSS 3.4.1
- **Utility-first CSS framework**: Para diseño responsivo y moderno
- **Gradientes y animaciones**: Efectos visuales avanzados
- **Sistema de colores**: Paleta coherente y profesional
- **Responsive design**: Breakpoints para móvil, tablet y desktop

#### Lucide React 0.344.0
- **Iconografía**: Más de 20 iconos diferentes utilizados (BarChart3, Bot, TrendingUp, Users, etc.)
- **Consistencia visual**: Iconos vectoriales escalables y coherentes

### Herramientas de Desarrollo

#### Vite 5.4.2
- **Build tool moderno**: Reemplazo de Create React App
- **Hot Module Replacement (HMR)**: Desarrollo en tiempo real
- **Optimización de bundles**: Mejor performance en producción
- **Plugin de React**: Integración nativa con React

#### TypeScript 5.5.3
- **Tipado estático**: Prevención de errores en tiempo de compilación
- **IntelliSense mejorado**: Mejor experiencia de desarrollo
- **Interfaces y tipos**: Definición clara de estructuras de datos

#### ESLint 9.9.1
- **Linting avanzado**: Configuración con TypeScript ESLint
- **React Hooks rules**: Validación de patrones de React
- **React Refresh**: Integración con hot reloading

### Herramientas de Estilo y CSS

#### PostCSS 8.4.35
- **Procesamiento de CSS**: Transformación y optimización
- **Autoprefixer**: Compatibilidad cross-browser automática

#### Tailwind CSS
- **Configuración personalizada**: Extensión de tema con tamaños de fuente y contenedores
- **Purge CSS**: Eliminación de CSS no utilizado en producción

## Funcionalidades Principales

### 1. Dashboard Interactivo
- **Integración con Google Looker Studio**: Iframe embebido para visualización de datos
- **Métricas en tiempo real**: 12,330 sesiones analizadas
- **Responsive design**: Adaptable a diferentes tamaños de pantalla

### 2. Análisis de Clustering
- **Algoritmo K-Means**: Segmentación de usuarios en 5 clústeres distintos
- **Visualización t-SNE**: Proyección dimensional para mejor comprensión
- **Análisis de componentes principales**: Reducción de dimensionalidad

#### Clústeres Identificados:
1. **Clúster 0**: Visitantes de fechas especiales (6.1% conversión)
2. **Clúster 1**: Usuario promedio (15.5% conversión)
3. **Clúster 2**: Rebotadores (0.6% conversión)
4. **Clúster 3**: Usuarios de alto valor (40.4% conversión)
5. **Clúster 4**: Exploradores comprometidos (27.9% conversión)

### 3. Chatbot Predictivo con IA
- **API REST**: Conexión a Google Cloud Run
- **Procesamiento de lenguaje natural**: Interpretación de consultas en español
- **Predicción en tiempo real**: Respuestas instantáneas basadas en ML
- **Manejo de estados**: Loading, error handling y resultados

## Arquitectura de Componentes

### Componente Principal (App.tsx)
```typescript
// Estados principales
const [chatInput, setChatInput] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [prediction, setPrediction] = useState('');
const [showPrediction, setShowPrediction] = useState(false);
```

### Funciones Principales

#### handleSubmit()
- **Validación de entrada**: Verificación de input no vacío
- **Llamada a API**: Fetch POST a Google Cloud Run
- **Manejo de errores**: Try-catch con mensajes de error
- **Actualización de estado**: Loading states y resultados

#### scrollToSection()
- **Navegación suave**: Smooth scrolling entre secciones
- **UX mejorada**: Navegación intuitiva sin page reload

## Integración con APIs Externas

### Google Cloud Run API
```typescript
const response = await fetch('https://api-backend-proyecto-final-especializacion-951527847571.us-central1.run.app/conversar', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mensaje: chatInput.trim()
  })
});
```

### Google Looker Studio
- **Iframe embebido**: Visualización de dashboard completo
- **Sandbox security**: Configuración segura de iframe
- **Responsive**: Adaptable a diferentes resoluciones

## Diseño y UX

### Sistema de Colores
- **Gradientes**: from-blue-600 to-indigo-600 para elementos principales
- **Paleta de clústeres**: 5 colores distintos para diferenciación visual
- **Estados de hover**: Transiciones suaves en todos los elementos interactivos

### Tipografía
- **Jerarquía clara**: Desde text-4xl hasta text-sm
- **Font weights**: Variación entre normal, medium, semibold y bold
- **Line height**: Optimizado para legibilidad (leading-relaxed)

### Animaciones
- **CSS Keyframes**: Animación fade-in personalizada
- **Transitions**: Duración 300ms para hover states
- **Transform effects**: Scale en botones principales

## Configuración del Proyecto

### Vite Configuration
```typescript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### Tailwind Configuration
```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        base: '18px',
      },
      maxWidth: {
        'content': '1440px',
      },
    },
  },
};
```

### TypeScript Configuration
- **Target ES2020**: Compatibilidad moderna
- **Strict mode**: Tipado estricto habilitado
- **JSX**: React JSX transform
- **Module resolution**: Bundler mode para Vite

## Optimizaciones de Performance

### Bundle Optimization
- **Tree shaking**: Eliminación de código no utilizado
- **Code splitting**: Carga bajo demanda
- **Asset optimization**: Compresión de imágenes y recursos

### Runtime Performance
- **React.StrictMode**: Detección de side effects
- **Efficient re-renders**: Uso optimizado de useState
- **Lazy loading**: Iframe carga diferida

## Seguridad

### Content Security Policy
- **Iframe sandbox**: Restricciones de seguridad para contenido externo
- **HTTPS**: Todas las conexiones encriptadas
- **Input validation**: Sanitización de entradas de usuario

## Deployment y Build

### Build Process
```bash
npm run build  # Vite build optimizado
npm run preview  # Preview de producción local
```

### Production Optimizations
- **Minification**: CSS y JavaScript minificados
- **Asset hashing**: Cache busting automático
- **Gzip compression**: Compresión de assets estáticos

## Métricas y Analytics

### Dataset Utilizado
- **Fuente**: UCI Machine Learning Repository
- **Origen**: Columbia.com.tr (sitio de ropa deportiva)
- **Tamaño**: 12,330 sesiones de usuario
- **Variables**: 18 features comportamentales y demográficas
- **Período**: 12 meses de datos de navegación

### Variables Principales
- **Administrative**: Páginas administrativas visitadas
- **Informational**: Páginas informativas visitadas  
- **ProductRelated**: Páginas de productos visitadas
- **BounceRates**: Tasas de rebote
- **ExitRates**: Tasas de salida
- **PageValues**: Valor promedio de páginas
- **SpecialDay**: Proximidad a días especiales
- **Month**: Mes de la sesión
- **OperatingSystems**: Sistema operativo del usuario
- **Browser**: Navegador utilizado
- **Region**: Región geográfica
- **TrafficType**: Tipo de tráfico
- **VisitorType**: Tipo de visitante (nuevo/recurrente)
- **Weekend**: Si la sesión fue en fin de semana

## Conclusión

ShopPredict representa una implementación completa de una aplicación web moderna que combina análisis de datos, visualización interactiva y predicción con inteligencia artificial. El proyecto demuestra el uso efectivo de tecnologías web actuales, buenas prácticas de desarrollo y una arquitectura escalable que puede servir como base para aplicaciones empresariales de análisis predictivo.

La combinación de React, TypeScript, Tailwind CSS y la integración con servicios de Google Cloud crea una experiencia de usuario fluida y profesional, mientras que el análisis de clustering y las predicciones de ML proporcionan valor real para la toma de decisiones en e-commerce.