# MultiversoHub 🚀

Una aplicación móvil desarrollada con React Native y Expo que te permite explorar el multiverso de Rick and Morty. Descubre personajes, episodios y aventuras de todas las dimensiones en una experiencia inmersiva y moderna.

## 📱 Resumen del Proyecto

MultiversoHub es una aplicación móvil que conecta con la API de Rick and Morty para ofrecer una experiencia completa de exploración del multiverso. La aplicación incluye:

- **Exploración de Personajes**: Navega por todos los personajes del multiverso con información detallada.
- **Sistema de Favoritos**: Guarda tus personajes favoritos para acceso rápido.
- **Estadísticas**: Visualiza métricas sobre el multiverso.
- **Tema Personalizable**: Interfaz adaptable con soporte para temas.
- **Gestión de Conectividad**: Indicador visual cuando no hay conexión a internet.
- **Telemetría**: Sistema de seguimiento de uso para mejoras continuas.

## 🛠️ Tecnologías Usadas

### Frontend
- **React Native** - Framework principal para desarrollo móvil.
- **Expo** - Plataforma de desarrollo y despliegue.
- **TypeScript** - Tipado estático para JavaScript.
- **React Navigation** - Navegación entre pantallas.

### Estado y Contexto
- **React Context API** - Gestión de estado global.
- **AsyncStorage** - Almacenamiento local persistente.

### UI y Componentes
- **Expo Vector Icons** - Iconografía.
- **React Native Safe Area Context** - Manejo de áreas seguras.
- **React Native Screens** - Optimización de pantallas.

### Conectividad y Red
- **@react-native-community/netinfo** - Monitoreo de conectividad.

### Desarrollo
- **Expo Status Bar** - Control de la barra de estado.

## 🚀 Cómo Ejecutar el Proyecto

### Prerrequisitos

1. **Node.js** 
2. **npm** o **yarn** o **bun**
3. **Expo CLI** 
4. **Expo Go** app en tu dispositivo móvil (iOS/Android).

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd MultiversoHub
   ```

2. **Instala las dependencias**
   ```bash
   # Con npm
   npm install
   
   # Con bun
   bun install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   # Con npm
   npm start
   
   # Con bun
   bun start
   ```

### Ejecución en Dispositivos

#### Método 1: Expo Go (Recomendado para desarrollo)
1. Instala **Expo Go** desde App Store (iOS) o Google Play Store (Android).
2. Ejecuta `npm start` o `yarn start`
3. Escanea el código QR que aparece en la terminal con la app Expo Go.

#### Método 2: Emulador/Simulador
```bash
# Para Android
npm run android

# Para iOS (solo en macOS)
npm run ios

# Para Web
npm run web
```

## 🎯 Características Principales

### 🏠 Pantalla Principal
- Tarjeta de bienvenida personalizada.
- Estadísticas del multiverso.
- Navegación rápida a secciones principales.

### 👥 Gestión de Personajes
- Lista completa de personajes del multiverso.
- Información detallada de cada personaje.
- Sistema de filtros por estado, especie, género.
- Búsqueda en tiempo real.

### ❤️ Sistema de Favoritos
- Guardar personajes favoritos.
- Acceso rápido desde la pantalla principal.
- Persistencia local de datos.

### ⚙️ Configuraciones
- Personalización de tema.
- Gestión de preferencias.
- Configuración de la aplicación.

### 🌐 Conectividad
- Indicador visual de estado de conexión.
- Banner de "sin conexión" no intrusivo.
- Gestión automática de estados de red.


## 📱 Compatibilidad

- **iOS**
- **Android**
- **Web**

## 🎯 Decisiones Importantes y Aprendizajes

### Arquitectura y Estructura
- **Separación de responsabilidades**: Implementación de una arquitectura modular con carpetas específicas para `components`, `context`, `services`, `types` y `screens`, facilitando el mantenimiento y escalabilidad.

### Gestión de Estado
- **Contextos especializados**: Creación de contextos específicos (`ConnectivityContext`, `FavouritesContext`, `StatsContext`, `ThemeContext`) en lugar de un contexto monolítico, siguiendo el principio de responsabilidad única.

- **Persistencia local**: Uso de AsyncStorage para mantener el estado de favoritos y configuraciones entre sesiones de la aplicación.

### UX/UI
- **Banner de conectividad**: Decisión de reemplazar un modal intrusivo por un banner discreto para mostrar el estado de conectividad, mejorando la experiencia del usuario.

- **Navegación híbrida**: Implementación de navegación por tabs para las secciones principales y stack navigation para flujos específicos (como detalles de los personajes).


### Desarrollo y Mantenimiento

### Aprendizajes Clave
-**General**: Mi primera App utilizando expo y todo su ecosistema.

-**Async-storage**: Utilizacion de async-storage para el manejo de favoritos y cache.

- **Telemetría**: Implementación de un sistema de telemetría.



## 👨‍💻 Autor

Desarrollado usando React Native y Expo.

---

