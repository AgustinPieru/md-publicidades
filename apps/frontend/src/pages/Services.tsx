import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Grid, Paper, Card, CardContent, CardActionArea, Chip, Dialog, DialogContent, IconButton, Divider, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SectionHeader from '../components/SectionHeader';
import PageContainer from '../components/PageContainer';
import OptimizedImage from '../components/OptimizedImage';
import Lightbox from '../components/Lightbox';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { images } from '../constants/images';
import { contactData } from '../constants/contact';

interface ServiceLocation {
  address: string;
  city?: string;
  province?: string;
  signType?: string;
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  fullDescription: string;
  images: string[];
  locations?: ServiceLocation[];
  showLocations?: boolean;
}

const oohServices: ServiceCard[] = [
  {
    id: 'monocolumnas',
    title: 'Monocolumnas',
    description: 'Tu marca en lo más alto. Ubicadas estratégicamente para maximizar la visibilidad y el impacto de cada campaña.',
    fullDescription: 'Tu marca en lo más alto. Ubicadas estratégicamente para maximizar la visibilidad y el impacto de cada campaña.',
    image: images.services.viaPublica.monocolumnas[0],
    imageAlt: 'Monocolumnas',
    images: [
      ...images.services.viaPublica.monocolumnas,
    ],
    showLocations: true,
    locations: [
      { 
        address: 'Circunvalación Rosario altura Bv. 27 de febrero', 
        province: 'ROSARIO',
        signType: 'PANTALLA LED + CARTEL FIJO',
      },
      { 
        address: 'Circunvalación Rosario altura bv avellaneda', 
        province: 'ROSARIO',
        signType: 'CARTELES FIJOS DE LOS DOS LADOS',
      },
      { 
        address: 'Autopista 9 altura Ruta A174', 
        province: 'CORDOBA',
        signType: 'CARTELES FIJOS DE LOS DOS LADOS',
      },
    ],
  },
  {
    id: 'pantallas-led',
    title: 'Pantallas LED',
    description: 'Llegamos a todas las provincias del país, con más de 350 ubicaciones.',
    fullDescription: 'Llegamos a todas las provincias del país, con más de 350 ubicaciones.',
    image: images.services.viaPublica.led[0],
    imageAlt: 'Pantallas LED',
    images: [
      ...images.services.viaPublica.led,
    ],
  },
  {
    id: 'ruteros',
    title: 'Ruteros',
    description: 'Más de 250 ubicaciones distribuidas en el país. Posibilidad de instalación de nuevos dispositivos en zonas a determinar por pedido de las empresas.',
    fullDescription: 'Más de 250 ubicaciones distribuidas en el país. Posibilidad de instalación de nuevos dispositivos en zonas a determinar por pedido de las empresas.',
    image: images.services.viaPublica.ruteros[0],
    imageAlt: 'Ruteros',
    images: [
      ...images.services.viaPublica.ruteros,
    ],
  },
  {
    id: 'medianeras',
    title: 'Medianeras',
    description: 'Las medianeras se destacan por su gran escala y ubicación estratégica, facilitando una visibilidad periférica efectiva.',
    fullDescription: 'Las medianeras se destacan por su gran escala y ubicación estratégica, facilitando una visibilidad periférica efectiva. Son soportes ideales para campañas de lanzamiento, posicionamiento y acciones de largo plazo debido a su alta exposición y permanencia.',
    image: images.services.viaPublica.medianeras[0] ,
    imageAlt: 'Medianeras',
    images: [
      ...images.services.viaPublica.medianeras
    ],
  },
  {
    id: 'grandes-formatos',
    title: 'Grandes Formatos / Hipervallas',
    description: 'Estructuras publicitarias de gran superficie, instaladas en puntos de tráfico intenso. Contamos con más de 1.500 ubicaciones.',
    fullDescription: 'Estructuras publicitarias de gran superficie, instaladas en puntos de tráfico intenso para garantizar una comunicación clara, amplia y efectiva durante largos períodos. Contamos con más de 1.500 ubicaciones.',
    image: images.services.viaPublica.formatos[0],
    imageAlt: 'Grandes Formatos',
    images: [
      ...images.services.viaPublica.formatos,
    ],
  },
  {
    id: 'sextuples',
    title: 'Séxtuples',
    description: 'Soportes estratégicamente ubicados en avenidas y zonas de alto tránsito. Su formato y repetición secuencial permiten una exposición constante.',
    fullDescription: 'Los séxtuples son soportes estratégicamente ubicados en avenidas y zonas de alto tránsito. Su formato y repetición secuencial permiten una exposición constante, logrando gran visibilidad y recordación de marca.',
    image: images.services.viaPublica.sextuples[0],
    imageAlt: 'Séxtuples',
    images: [
      ...images.services.viaPublica.sextuples,
    ],
  },
];

const eventosCaptions = [
  'Comercialización Sueño celeste',
  'Comercialización Sueño celeste ',
  'Comercialización Expo Rural Rafaela',
  'Comercialización Expo Rural Rafaela',
];

const marketingDeportivoCaptions = [
  'Presencia en la cancha de River Plate',
  'Presencia en la cancha de Colón',
  'Presencia en la cancha de River Plate',
  'Asesoramiento de sponsoreo para Hospital Italiano Rosario e Italmedica en Club Atlético Newell´s Old Boys',
  'Presencia de marca en la despedida de Maxi Rodriguez',
];

const Services = () => {
  const location = useLocation();
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const whatsappNumber = contactData.whatsapp.replace(/\D/g, '');

  const buildWhatsAppUrl = (serviceLabel: string) => {
    const message = `Hola, me gustaría recibir más información sobre ${serviceLabel}.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  // Scroll automático a la sección cuando hay un hash en la URL
  useEffect(() => {
    const scrollToSection = () => {
      if (location.hash) {
        const elementId = location.hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return true;
        }
      }
      return false;
    };

    if (!scrollToSection()) {
      const timeout = setTimeout(() => {
        scrollToSection();
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [location.hash, location.pathname]);

  // Precargar solo las imágenes principales que se ven en las cards iniciales.
  // El resto de las imágenes de galerías y lightbox se cargan de forma lazy.
  const heroServiceImages = oohServices.map((service) => service.image);
  useImagePreloader(heroServiceImages);

  const handleServiceClick = (service: ServiceCard) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedService(null);
    setLightboxOpen(false);
  };

  const galleryItems = selectedService 
    ? selectedService.images.map((src, idx) => ({ 
        src, 
        alt: `${selectedService.title} ${idx + 1}` 
      }))
    : [];

  // Funciones para abrir lightbox directamente (para Marketing Deportivo, Eventos y Rental)
  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  return (
    <PageContainer maxWidth="lg" useTopOffset>
      <SectionHeader title="Nuestros Servicios" align="left" />

      {/* OOH / Vía Pública */}
      <Paper 
        id="ooh"
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 3, 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
          mb: 4,
          scrollMarginTop: '80px'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
          OOH / Vía Pública
        </Typography>
        <Typography 
          color="text.secondary" 
          sx={{ 
            mb: 4,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8
          }}
        >
          Ofrecemos cobertura nacional en vía pública para garantizar visibilidad, recordación y alcance masivo.
        </Typography>

        <Grid container spacing={3}>
          {oohServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardActionArea
                  onClick={() => handleServiceClick(service)}
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch'
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 240,
                      overflow: 'hidden',
                      '&:hover .image-caption-overlay': {
                        opacity: 1,
                      },
                    }}
                  >
                    <OptimizedImage
                      src={service.image}
                      alt={service.imageAlt}
                      skeletonHeight={240}
                      sx={{ 
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)'
                        }
                      }}
                    />
                    <Box
                      className="image-caption-overlay"
                      sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '25%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        p: 2,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#fff',
                          fontWeight: 500,
                        }}
                      >
                        {service.imageAlt}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flex: 1, p: 2.5 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1.5,
                        fontSize: { xs: '1.125rem', md: '1.25rem' }
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 2,
                        fontSize: { xs: '0.875rem', md: '0.9375rem' },
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {service.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', mt: 'auto' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mr: 0.5 }}>
                        Ver más
                      </Typography>
                      <ArrowForwardIcon sx={{ fontSize: 18 }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box 
          sx={{ 
            mt: 4,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            variant="contained"
            href={buildWhatsAppUrl('Vía Pública')}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: '#25D366',
              color: '#fff',
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              '&:hover': {
                backgroundColor: '#1ebe5d',
                boxShadow: '0 10px 24px rgba(0,0,0,0.16)',
              },
            }}
            startIcon={<WhatsAppIcon />}
            aria-label="Escribinos por WhatsApp para más info de Vía Pública"
          >
            Escribinos por WhatsApp para más info de Vía Pública
          </Button>
        </Box>
      </Paper>

      {/* Marketing Deportivo */}
      <Paper 
        id="marketing-deportivo"
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 3, 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
          mb: 4,
          scrollMarginTop: '80px'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
          Marketing Deportivo
        </Typography>
        <Typography 
          color="text.secondary" 
          sx={{ 
            mb: 4,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8
          }}
        >
          Desarrollamos activaciones con presencia en clubes de alcance nacional, logrando acuerdos de sponsoring en instituciones de Primera División y B Nacional como River Plate, Newell's Old Boys, Unión, Colón, Defensa y Justicia, Quilmes, Chicago y Almagro.
        </Typography>
        <Typography 
          color="text.secondary" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8
          }}
        >
          Nuestra labor se centra en vincular estratégicamente a marcas comerciales, organizaciones e instituciones públicas con el ámbito deportivo, generando alianzas positivas y de largo plazo.
        </Typography>
        <Typography 
          color="text.secondary" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8
          }}
        >
          Conectamos empresas, ONGs y organismos de gobierno con clubes, deportistas, eventos, federaciones y estadios, fortaleciendo la presencia de marca y promoviendo resultados genuinos y sostenibles.
        </Typography>
        <Typography 
          color="text.secondary" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8
          }}
        >
          Somos agentes exclusivos del Club Atlético de Rafaela y trabajamos junto a equipos de la Liga Profesional, el Torneo Federal A y MM Competición, presente en el Nuevo Car Show Clase 2 con seis pilotos.
        </Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {images.services.marketingDeportivo.map((img, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 300,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  cursor: 'zoom-in',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  },
                  '&:hover .image-caption-overlay': {
                    opacity: 1,
                  }
                }}
                onClick={() => {
                  openLightbox(images.services.marketingDeportivo, idx);
                }}
              >
                <OptimizedImage
                  src={img}
                  alt={marketingDeportivoCaptions[idx] || `Marketing Deportivo ${idx + 1}`}
                  skeletonHeight={300}
                  sx={{ 
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  className="image-caption-overlay"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '25%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    p: 2,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#fff',
                      fontWeight: 500,
                    }}
                  >
                    {marketingDeportivoCaptions[idx] || `Marketing Deportivo ${idx + 1}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            alignItems: 'flex-start'
          }}
        >
          <Chip 
            label="Club Atlético de Rafaela" 
            variant="outlined" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: { xs: 28, sm: 32 },
            }} 
          />
          <Chip 
            label="Liga Profesional" 
            variant="outlined" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: { xs: 28, sm: 32 },
            }} 
          />
          <Chip 
            label="Torneo Federal A" 
            variant="outlined" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: { xs: 28, sm: 32 },
            }} 
          />
          <Chip 
            label="MM Competición" 
            variant="outlined" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: { xs: 28, sm: 32 },
            }} 
          />
        </Box>
        <Box 
          sx={{ 
            mt: 4,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            variant="contained"
            href={buildWhatsAppUrl('Marketing Deportivo')}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: '#25D366',
              color: '#fff',
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              '&:hover': {
                backgroundColor: '#1ebe5d',
                boxShadow: '0 10px 24px rgba(0,0,0,0.16)',
              },
            }}
            startIcon={<WhatsAppIcon />}
            aria-label="Escribinos por WhatsApp para más info de Marketing Deportivo"
          >
            Escribinos por WhatsApp para más info de Marketing Deportivo
          </Button>
        </Box>
      </Paper>

      {/* Eventos */}
      <Paper 
        id="eventos"
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 3, 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
          mb: 4,
          scrollMarginTop: '80px'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
          Eventos
        </Typography>
        <Typography 
          color="text.secondary" 
          sx={{ 
            mb: 4,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8
          }}
        >
          Comercialización de los tres eventos más importantes de la ciudad de Rafaela: la Expo Rural, el torneo Sueño Celeste y el Festival de Teatro.
        </Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {images.services.eventos.map((img, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 300,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  cursor: 'zoom-in',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  },
                  '&:hover .image-caption-overlay': {
                    opacity: 1,
                  }
                }}
                onClick={() => {
                  openLightbox(images.services.eventos, idx);
                }}
              >
                <OptimizedImage
                  src={img}
                  alt={eventosCaptions[idx] || `Eventos ${idx + 1}`}
                  skeletonHeight={300}
                  sx={{ 
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  className="image-caption-overlay"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '25%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    p: 2,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#fff',
                      fontWeight: 500,
                    }}
                  >
                    {eventosCaptions[idx] || `Eventos ${idx + 1}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            alignItems: 'flex-start'
          }}
        >
          <Chip 
            label="Expo Rural" 
            variant="outlined" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: { xs: 28, sm: 32 },
            }} 
          />
          <Chip 
            label="Torneo Sueño Celeste" 
            variant="outlined" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: { xs: 28, sm: 32 },
            }} 
          />
          <Chip 
            label="Festival de Teatro" 
            variant="outlined" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: { xs: 28, sm: 32 },
            }} 
          />
        </Box>
        <Box 
          sx={{ 
            mt: 4,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            variant="contained"
            href={buildWhatsAppUrl('Eventos')}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: '#25D366',
              color: '#fff',
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              '&:hover': {
                backgroundColor: '#1ebe5d',
                boxShadow: '0 10px 24px rgba(0,0,0,0.16)',
              },
            }}
            startIcon={<WhatsAppIcon />}
            aria-label="Escribinos por WhatsApp para más info de Eventos"
          >
            Escribinos por WhatsApp para más info de Eventos
          </Button>
        </Box>
      </Paper>

      {/* Rental */}
      <Paper 
        id="rental"
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 3, 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          scrollMarginTop: '80px'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
          Rental
        </Typography>
        <Typography 
          color="text.secondary" 
          sx={{ 
            mb: 4,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8
          }}
        >
          Ofrecemos alquiler de pantallas LED P3 Rental para eventos y publicidad, aptas tanto para interior como exterior y con óptima calidad de visualización en cualquier entorno.
        </Typography>
        <Typography 
          color="text.secondary" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8
          }}
        >
          Son ideales para conferencias, sets de DJs, eventos corporativos, presentaciones de productos, stands, festivales y celebraciones como cumpleaños y casamientos.
        </Typography>
        <Typography 
          color="text.secondary" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8
          }}
        >
          Contamos con distintas configuraciones de tamaño según las necesidades del cliente y el tipo de evento, con un total disponible de 24,6 m² de pantallas LED.
        </Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {images.services.rental.map((img, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 300,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  cursor: 'zoom-in',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  },
                  '&:hover .image-caption-overlay': {
                    opacity: 1,
                  }
                }}
                onClick={() => {
                  openLightbox(images.services.rental, idx);
                }}
              >
                <OptimizedImage
                  src={img}
                  alt={`Rental ${idx + 1}`}
                  skeletonHeight={300}
                  sx={{ 
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  className="image-caption-overlay"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '25%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    p: 2,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#fff',
                      fontWeight: 500,
                    }}
                  >
                    {`Rental ${idx + 1}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            alignItems: 'flex-start'
          }}
        >
          <Chip 
            label="Pantallas LED P3" 
            variant="outlined" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: { xs: 28, sm: 32 },
            }} 
          />
          <Chip 
            label="24,6 m² disponibles" 
            variant="outlined" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: { xs: 28, sm: 32 },
            }} 
          />
          <Chip 
            label="Interior y Exterior" 
            variant="outlined" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: { xs: 28, sm: 32 },
            }} 
          />
        </Box>
        <Box 
          sx={{ 
            mt: 4,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            variant="contained"
            href={buildWhatsAppUrl('Rental')}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: '#25D366',
              color: '#fff',
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              '&:hover': {
                backgroundColor: '#1ebe5d',
                boxShadow: '0 10px 24px rgba(0,0,0,0.16)',
              },
            }}
            startIcon={<WhatsAppIcon />}
            aria-label="Escribinos por WhatsApp para más info de Rental"
          >
            Escribinos por WhatsApp para más info de Rental
          </Button>
        </Box>
      </Paper>

      {/* Modal de Detalle del Servicio */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
            m: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <DialogContent 
          sx={{ 
            p: 0, 
            position: 'relative',
            overflow: 'auto',
            flex: 1
          }}
        >
          <IconButton
            aria-label="Cerrar"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex: 1,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedService && (
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  pr: 5
                }}
              >
                {selectedService.title}
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.8
                }}
              >
                {selectedService.fullDescription}
              </Typography>

              {selectedService.showLocations && selectedService.locations && selectedService.locations.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      fontSize: { xs: '1.25rem', md: '1.5rem' }
                    }}
                  >
                    Ubicaciones
                  </Typography>
                  <Grid container spacing={2}>
                    {selectedService.locations.map((location, idx) => (
                      <Grid item xs={12} md={6} key={idx}>
                        <Paper 
                          elevation={1}
                          sx={{ 
                            p: 2, 
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 1.5
                          }}
                        >
                          <LocationOnIcon color="primary" sx={{ mt: 0.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {location.address}
                              {(location.province || location.city) && ` – ${location.province || location.city}`}
                            </Typography>
                            {location.signType && (
                              <Typography variant="body2" color="text.secondary">
                                {location.signType}
                              </Typography>
                            )}
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {galleryItems.length > 0 && (
                <>
                  <Divider sx={{ my: 4 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 3,
                      fontSize: { xs: '1.25rem', md: '1.5rem' }
                    }}
                  >
                    Galería
                  </Typography>
                  <Grid container spacing={2}>
                    {galleryItems.map((img, idx) => (
                      <Grid item xs={12} sm={6} md={4} key={idx}>
                        <Box
                          sx={{
                            position: 'relative',
                            cursor: 'zoom-in',
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.02)'
                            }
                          }}
                          onClick={() => {
                            setLightboxIndex(idx);
                            setLightboxOpen(true);
                          }}
                        >
                          <OptimizedImage
                            src={img.src}
                            alt={img.alt}
                            skeletonHeight={260}
                            sx={{ height: 260, width: '100%', objectFit: 'cover' }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Lightbox para las imágenes */}
      <Lightbox
        open={lightboxOpen}
        src={
          lightboxImages.length > 0 
            ? lightboxImages[lightboxIndex] || ''
            : galleryItems[lightboxIndex]?.src || ''
        }
        alt={
          lightboxImages.length > 0
            ? `Imagen ${lightboxIndex + 1}`
            : galleryItems[lightboxIndex]?.alt
        }
        onClose={() => {
          setLightboxOpen(false);
          setLightboxImages([]);
        }}
        onPrev={
          (lightboxImages.length > 0 ? lightboxImages.length : galleryItems.length) > 1
            ? lightboxImages.length > 0
              ? handleLightboxPrev
              : () => setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
            : undefined
        }
        onNext={
          (lightboxImages.length > 0 ? lightboxImages.length : galleryItems.length) > 1
            ? lightboxImages.length > 0
              ? handleLightboxNext
              : () => setLightboxIndex((prev) => (prev + 1) % galleryItems.length)
            : undefined
        }
      />
    </PageContainer>
  );
};

export default Services;
