/**
 * Constantes para las rutas de imágenes locales
 * Las imágenes deben estar almacenadas en public/images/
 */

export const images = {
  // Logo de la empresa
  logo: '/images/logo.png',
  
  // Logo horizontal para Footer
  logoHorizontal: '/images/logo-horizontal.png',
  
  // Imagen de portada (Home)
  cover: '/images/cover.jpg',
  
  // Imagen sobre nosotros (About)
  about: '/images/about.jpg',
  
  // Imágenes de servicios (Services)
  services: {
    led: [
      '/images/services/led-1.jpg',
      '/images/services/led-2.jpg',
      '/images/services/led-3.jpg',
    ],
    monocolumnas: [
      '/images/services/monocolumnas-1.jpg',
      '/images/services/monocolumnas-2.jpg',
      '/images/services/monocolumnas-3.jpg',
    ],
    formatos: [
      '/images/services/formatos-1.jpg',
      '/images/services/formatos-2.jpg',
      '/images/services/formatos-3.jpg',
    ],
    ruteros: [
      '/images/services/ruteros-1.jpg',
      '/images/services/ruteros-2.jpg',
      '/images/services/ruteros-3.jpg',
    ],
  },
} as const;

