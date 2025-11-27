/**
 * Constantes para las rutas de imágenes locales
 * Las imágenes deben estar almacenadas en public/images/
 */

export const images = {
  // Logo de la empresa
  logo: '/images/logo.svg',
  
  // Logo horizontal para Footer
  logoHorizontal: '/images/logo-horizontal.svg',
  
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
        '/images/led-2.jpg',
        '/images/led-3.jpg',
        '/images/led-4.jpeg',
        '/images/led-5.jpeg',
      ],
      monocolumnas: [
        '/images/monocolumnas-1.jpg',
        '/images/monocolumnas-2.png',
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
        '/images/sextuple-1.jpeg',
        '/images/sextuple-2.jpeg',
      ]
    },
    eventos: [
      '/images/eventos-1.jpeg',
      '/images/eventos-2.jpg',
      '/images/eventos-3.jpg',
      '/images/eventos-4.jpg',
    ] as string[],
    marketingDeportivo: [
      '/images/marketing-deportivo-1.jpg',
      '/images/marketing-deportivo-2.jpg',
      '/images/marketing-deportivo-3.jpg',
      '/images/marketing-deportivo-4.jpg',
      '/images/marketing-deportivo-5.jpg',
      '/images/marketing-deportivo-6.jpg',
      '/images/marketing-deportivo-7.jpeg',
      '/images/marketing-deportivo-8.jpeg',
    ] as string[],
    rental: [
      '/images/rental-1.png',
      '/images/rental-2.jpg',
    ] as string[],
  },
  
  // Logos de clientes (para el carrusel)
  // Usando logos de placeholder para pruebas - Reemplazar con logos reales cuando estén disponibles
  clients: [
    '/images/empresa-1.svg',
    '/images/empresa-2.svg',
    '/images/empresa-3.svg',
    '/images/empresa-4.svg',
    '/images/empresa-5.svg',
    '/images/empresa-6.svg',
    '/images/empresa-7.svg',
    '/images/empresa-8.svg',
    '/images/empresa-9.svg',
    '/images/empresa-10.svg',
    '/images/empresa-11.svg',
  ],

  // Logos de aliados estratégicos
  // Por ahora reutilizamos algunos logos de ejemplo; reemplazar por los logos reales de aliados
  strategicAllies: [
    '/images/empresa-1.svg',
    '/images/empresa-4.svg',
    '/images/empresa-7.svg',
    '/images/empresa-9.svg',
  ],
  
  // Logos de organizaciones de las que somos miembros
  // Reemplazar con logos reales cuando estén disponibles
  members: [
    '/images/member-1.svg', // Logo de organización 1
    '/images/member-2.svg', // Logo de organización 2
    '/images/member-3.svg', // Logo de organización 3
    '/images/member-4.svg', // Logo de organización 4
  ],
} as const;

