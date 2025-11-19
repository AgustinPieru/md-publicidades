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
  
  // Logos de clientes (para el carrusel)
  // Usando logos de placeholder para pruebas - Reemplazar con logos reales cuando estén disponibles
  clients: [
    'https://logo.clearbit.com/coca-cola.com',
    'https://logo.clearbit.com/microsoft.com',
    'https://logo.clearbit.com/apple.com',
    'https://logo.clearbit.com/google.com',
    'https://logo.clearbit.com/amazon.com',
    'https://logo.clearbit.com/nike.com',
    'https://logo.clearbit.com/adidas.com',
    'https://logo.clearbit.com/pepsi.com',
  ],
} as const;

