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
    '/images/logos_empresas-01.svg',
    '/images/logos_empresas-02.svg',
    '/images/logos_empresas-03.svg',
    '/images/logos_empresas-04.svg',
    '/images/logos_empresas-05.svg',
    '/images/logos_empresas-06.svg',
    '/images/logos_empresas-07.svg',
    '/images/logos_empresas-08.svg',
    '/images/logos_empresas-09.svg',
    '/images/logos_empresas-10.svg',
    '/images/logos_empresas-11.svg',
    '/images/logos_empresas-12.svg',
    '/images/logos_empresas-13.svg',
    '/images/logos_empresas-14.svg',
    '/images/logos_empresas-15.svg',
    '/images/logos_empresas-16.svg',
    '/images/logos_empresas-17.svg',
    '/images/logos_empresas-18.svg',
    '/images/logos_empresas-19.svg',
    '/images/logos_empresas-20.svg',
    '/images/logos_empresas-21.svg',
    '/images/logos_empresas-22.svg',
    '/images/logos_empresas-23.svg',
    '/images/logos_empresas-24.svg',
    '/images/logos_empresas-25.svg',
    '/images/logos_empresas-26.svg',
    '/images/logos_empresas-27.svg',
    '/images/logos_empresas-28.svg',
    '/images/logos_empresas-29.svg',
    '/images/logos_empresas-30.svg',
    '/images/logos_empresas-31.svg',
    '/images/logos_empresas-32.svg',
    '/images/logos_empresas-33.svg',
    '/images/logos_empresas-34.svg',
    '/images/logos_empresas-35.svg',
    '/images/logos_empresas-36.svg',
    '/images/logos_empresas-37.svg',
    '/images/logos_empresas-38.svg',
    '/images/logos_empresas-39.svg',
    '/images/logos_empresas-40.svg',
    '/images/logos_empresas-41.svg',
    '/images/logos_empresas-42.svg',
    '/images/logos_empresas-43.svg',
  ],

  // Logos de aliados estratégicos
  // Por ahora reutilizamos algunos logos de ejemplo; reemplazar por los logos reales de aliados
  strategicAllies: [
    '/images/logos_empresas-38.svg',
    '/images/logos_empresas-39.svg',
    '/images/logos_empresas-40.svg',
    '/images/logos_empresas-41.svg',
    '/images/logos_empresas-42.svg',
    '/images/logos_empresas-43.svg',
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

