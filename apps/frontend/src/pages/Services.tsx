import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Grid, Paper, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Lightbox from '../components/Lightbox';
import SectionHeader from '../components/SectionHeader';
import PageContainer from '../components/PageContainer';
import OptimizedImage from '../components/OptimizedImage';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { images } from '../constants/images';

interface GalleryItem {
  src: string;
  alt: string;
}

// No TabPanel: transformamos la página en secciones verticales descriptivas

const Services = () => {
  const location = useLocation();
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxItems, setLightboxItems] = React.useState<GalleryItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  // Scroll automático a la sección cuando hay un hash en la URL
  useEffect(() => {
    const scrollToSection = () => {
      if (location.hash) {
        const elementId = location.hash.substring(1); // Remover el #
        const element = document.getElementById(elementId);
        
        if (element) {
          const offset = 80; // Offset para el header
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

    // Intentar scroll inmediatamente
    if (!scrollToSection()) {
      // Si no se encuentra el elemento, esperar un poco más (puede estar renderizándose)
      const timeout = setTimeout(() => {
        scrollToSection();
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [location.hash, location.pathname]);

  const oohGalleries: Record<string, GalleryItem[]> = {
    led: images.services.led.map((src, idx) => ({ src, alt: `Pantallas LED ${idx + 1}` })),
    monocolumnas: images.services.monocolumnas.map((src, idx) => ({ src, alt: `Monocolumnas ${idx + 1}` })),
    ruteros: images.services.ruteros.map((src, idx) => ({ src, alt: `Ruteros ${idx + 1}` })),
  };

  // Precargar todas las imágenes de servicios
  const allServiceImages = [
    ...images.services.led,
    ...images.services.monocolumnas,
    ...images.services.ruteros,
  ];
  const { allLoaded } = useImagePreloader(allServiceImages);

  const renderGallery = (items: GalleryItem[]) => (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {items.map((img, idx) => (
        <Grid item xs={12} sm={6} md={6} key={idx}>
          <Box
            sx={{
              position: 'relative',
              cursor: 'zoom-in',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 10px 24px rgba(0,0,0,0.12)'
            }}
            onClick={() => {
              setLightboxItems(items);
              setLightboxIndex(idx);
              setLightboxOpen(true);
            }}
          >
            <OptimizedImage
              src={img.src}
              alt={img.alt}
              skeletonHeight={260}
              sx={{ height: 260, width: '100%' }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <PageContainer maxWidth="lg" useTopOffset>
        <SectionHeader title="Nuestros Servicios" align="left" />

        <Paper 
          id="ooh"
          sx={{ 
            p: { xs: 2, md: 3 }, 
            borderRadius: 3, 
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
            mb: 3,
            scrollMarginTop: '80px' // Espacio para el scroll
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>OOH / Vía Pública</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Cobertura nacional en vía pública para visibilidad, recordación y alcance masivo.</Typography>
          <Box 
            sx={{ 
              mb: 2, 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: { xs: 0.5, sm: 1 },
              alignItems: 'flex-start'
            }}
          >
            <Chip 
              label="+350 ubicaciones" 
              variant="outlined" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                height: { xs: 24, sm: 32 },
                '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } }
              }} 
            />
            <Chip 
              label="Cobertura nacional" 
              variant="outlined" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                height: { xs: 24, sm: 32 },
                '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } }
              }} 
            />
            <Chip 
              label="Grandes formatos" 
              variant="outlined" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                height: { xs: 24, sm: 32 },
                '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } }
              }} 
            />
          </Box>
          <List dense>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Pantallas LED en todas las provincias" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Monocolumnas: LED + cartel fijo" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Grandes formatos, medianeras, séxtuples e hipervallas (5000+)" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Ruteros: +250 ubicaciones e instalación a medida" /></ListItem>
          </List>
          {renderGallery([...oohGalleries.led, ...oohGalleries.monocolumnas, ...oohGalleries.ruteros])}
        </Paper>

        <Paper 
          id="marketing-deportivo"
          sx={{ 
            p: { xs: 2, md: 3 }, 
            borderRadius: 3, 
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
            mb: 3,
            scrollMarginTop: '80px'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Marketing Deportivo</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Activaciones y patrocinios en clubes y eventos nacionales.</Typography>
          <Box 
            sx={{ 
              mb: 2, 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: { xs: 0.5, sm: 1 },
              alignItems: 'flex-start'
            }}
          >
            <Chip 
              label="Club Atlético de Rafaela" 
              variant="outlined" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                height: { xs: 24, sm: 32 },
                '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } }
              }} 
            />
            <Chip 
              label="Liga Profesional" 
              variant="outlined" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                height: { xs: 24, sm: 32 },
                '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } }
              }} 
            />
            <Chip 
              label="Federal A" 
              variant="outlined" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                height: { xs: 24, sm: 32 },
                '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } }
              }} 
            />
          </Box>
          <List dense>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Gestión integral de espacios publicitarios en clubes" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Vínculos estratégicos entre marcas y clubes" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="MM Competición en el Nuevo Car Show Clase 2 (seis pilotos)" /></ListItem>
          </List>
        </Paper>

        <Paper 
          id="eventos"
          sx={{ 
            p: { xs: 2, md: 3 }, 
            borderRadius: 3, 
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
            mb: 3,
            scrollMarginTop: '80px'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Eventos</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Producción, cobertura y soporte visual para eventos.</Typography>
          <Box 
            sx={{ 
              mb: 2, 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: { xs: 0.5, sm: 1 },
              alignItems: 'flex-start'
            }}
          >
            <Chip 
              label="Expo Rural" 
              variant="outlined" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                height: { xs: 24, sm: 32 },
                '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } }
              }} 
            />
            <Chip 
              label="Torneo Sueño Celeste" 
              variant="outlined" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                height: { xs: 24, sm: 32 },
                '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } }
              }} 
            />
            <Chip 
              label="Festival de Teatro Rafaela" 
              variant="outlined" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                height: { xs: 24, sm: 32 },
                '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } }
              }} 
            />
          </Box>
          <List dense>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Desarrollo end-to-end de acciones y presencia de marca" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Infraestructura de comunicación y pauta onsite" /></ListItem>
          </List>
        </Paper>

        <Paper 
          id="rental"
          sx={{ 
            p: { xs: 2, md: 3 }, 
            borderRadius: 3, 
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            scrollMarginTop: '80px'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Rental</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Alquiler de pantallas LED para eventos y publicidad.</Typography>
          <List dense>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Equipos de alta luminosidad y rápida instalación" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Cobertura técnica y asistencia durante el evento" /></ListItem>
          </List>
        </Paper>
      <Lightbox
        open={lightboxOpen}
        src={lightboxItems[lightboxIndex]?.src || ''}
        alt={lightboxItems[lightboxIndex]?.alt}
        onClose={() => setLightboxOpen(false)}
        onPrev={lightboxItems.length > 1 ? () => setLightboxIndex((prev) => (prev - 1 + lightboxItems.length) % lightboxItems.length) : undefined}
        onNext={lightboxItems.length > 1 ? () => setLightboxIndex((prev) => (prev + 1) % lightboxItems.length) : undefined}
      />
    </PageContainer>
  );
};

export default Services;


