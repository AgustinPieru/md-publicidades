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
  
  // Imagen del fundador (About)
  founder: '/images/gerente-marce.jpg', // Imagen de test - Reemplazar con imagen real
  
  // Imágenes del equipo (About) - Imágenes de test - Reemplazar con imágenes reales
  team: {
    marcelo: '/images/gerente-marce.jpg',
    marina: '/images/comercial-mari.jpg',
    angelina: '/images/contenido-ange.jpg',
    paula: '/images/medios-pauli.jpg',
    carolina: '/images/administracion-caro.jpg',
    liliana: '/images/logistica-lili.jpg',
    gaston: '/images/gestion-gasti.jpeg',
  },
  
  // Imágenes de servicios (Services)
  services: {
    viaPublica: {
      led: [
        '/images/led-1.jpg',
      ],
      monocolumnas: [
        '/images/monocolumnas-1.jpg',
      ],
      ruteros: [
        '/images/ruteros-1.jpg',
        '/images/ruteros-2.jpg',
        '/images/ruteros-3.jpg',
      ],
      formatos: [
        '/images/formatos-1.jpg',
        '/images/formatos-2.jpg',
        '/images/formatos-3.jpg',
      ],
      medianeras: [
        '/images/medianera-1.jpg',
        '/images/medianera-2.jpg',
      ],
      sextuples: [
        '/images/sextuple-1.png',
        '/images/sextuple-2.jpg',
      ]
    },
    eventos: [
      '/images/eventos-1.jpg',
      '/images/eventos-2.jpg',
    ] as string[],
    marketingDeportivo: [
      '/images/marketing-deportivo-1.jpg',
      '/images/marketing-deportivo-2.jpg',
      '/images/marketing-deportivo-3.jpg',
      '/images/marketing-deportivo-4.jpg',
      '/images/marketing-deportivo-5.jpg',
    ] as string[],
    rental: [
      '/images/rental-1.png',
      '/images/rental-2.jpg',
      '/images/rental-3.jpg',
      '/images/rental-4.jpg',
    ] as string[],
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
  
  // Logos de organizaciones de las que somos miembros
  // Reemplazar con logos reales cuando estén disponibles
  members: [
    '/images/member-1.png', // Logo de organización 1
    '/images/member-2.png', // Logo de organización 2
    '/images/member-3.png', // Logo de organización 3
    '/images/member-4.png', // Logo de organización 4
  ],
} as const;

