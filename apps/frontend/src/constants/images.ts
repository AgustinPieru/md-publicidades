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
  about: '/images/about.jpeg',
  
  // Imágenes de servicios (Services) - Solo para OOH / Vía Pública
  services: {
    led: [
      '/images/led-1.png',
    ],
    monocolumnas: [
      '/images/monocolumnas-1.jpg',
    ],
    ruteros: [
      '/images/ruteros-1.jpg',
    ],
  },
} as const;

