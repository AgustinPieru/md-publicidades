import React from 'react';
import { Typography, Container, Box, Grid, CardMedia, Paper, Chip, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Lightbox from '../components/Lightbox';
import SectionHeader from '../components/SectionHeader';

interface GalleryItem {
  src: string;
  alt: string;
}

// No TabPanel: transformamos la página en secciones verticales descriptivas

const Services = () => {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxItems, setLightboxItems] = React.useState<GalleryItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  const oohGalleries: Record<string, GalleryItem[]> = {
    led: [
      { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop', alt: 'Pantallas LED 1' },
      { src: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1600&auto=format&fit=crop', alt: 'Pantallas LED 2' },
      { src: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?q=80&w=1600&auto=format&fit=crop', alt: 'Pantallas LED 3' },
    ],
    monocolumnas: [
      { src: 'https://images.unsplash.com/photo-1475714626808-17c92d9c43ee?q=80&w=1600&auto=format&fit=crop', alt: 'Monocolumnas 1' },
      { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop', alt: 'Monocolumnas 2' },
      { src: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=1600&auto=format&fit=crop', alt: 'Monocolumnas 3' },
    ],
    formatos: [
      { src: 'https://images.unsplash.com/photo-1502920917128-1aa500764ce7?q=80&w=1600&auto=format&fit=crop', alt: 'Grandes formatos 1' },
      { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop', alt: 'Grandes formatos 2' },
      { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop', alt: 'Grandes formatos 3' },
    ],
    ruteros: [
      { src: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1600&auto=format&fit=crop', alt: 'Ruteros 1' },
      { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop', alt: 'Ruteros 2' },
      { src: 'https://images.unsplash.com/photo-1520975922131-c2364f58f5a6?q=80&w=1600&auto=format&fit=crop', alt: 'Ruteros 3' },
    ],
  };

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
            <CardMedia component="img" image={img.src} alt={img.alt} sx={{ height: 260, width: '100%', objectFit: 'cover' }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{
        py: { xs: 2, md: 3 },
        mt: -4,
        flex: 1,
        overflow: 'auto'
      }}>
        <SectionHeader title="Nuestros Servicios" align="left" />

        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>OOH / Vía Pública</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Cobertura nacional en vía pública para visibilidad, recordación y alcance masivo.</Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            <Chip label="+350 ubicaciones" variant="outlined" />
            <Chip label="Cobertura nacional" variant="outlined" />
            <Chip label="Grandes formatos" variant="outlined" />
          </Stack>
          <List dense>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Pantallas LED en todas las provincias" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Monocolumnas: LED + cartel fijo" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Grandes formatos, medianeras, séxtuples e hipervallas (5000+)" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Ruteros: +250 ubicaciones e instalación a medida" /></ListItem>
          </List>
          {renderGallery([...oohGalleries.led.slice(0,2), ...oohGalleries.monocolumnas.slice(0,1)])}
        </Paper>

        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Marketing Deportivo</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Activaciones y patrocinios en clubes y eventos nacionales.</Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            <Chip label="Club Atlético de Rafaela" variant="outlined" />
            <Chip label="Liga Profesional" variant="outlined" />
            <Chip label="Federal A" variant="outlined" />
          </Stack>
          <List dense>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Gestión integral de espacios publicitarios en clubes" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Vínculos estratégicos entre marcas y clubes" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="MM Competición en el Nuevo Car Show Clase 2 (seis pilotos)" /></ListItem>
          </List>
          {renderGallery(oohGalleries.formatos)}
        </Paper>

        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Eventos</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Producción, cobertura y soporte visual para eventos.</Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            <Chip label="Expo Rural" variant="outlined" />
            <Chip label="Torneo Sueño Celeste" variant="outlined" />
            <Chip label="Festival de Teatro Rafaela" variant="outlined" />
          </Stack>
          <List dense>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Desarrollo end-to-end de acciones y presencia de marca" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Infraestructura de comunicación y pauta onsite" /></ListItem>
          </List>
          {renderGallery(oohGalleries.monocolumnas)}
        </Paper>

        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Rental</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Alquiler de pantallas LED para eventos y publicidad.</Typography>
          <List dense>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Equipos de alta luminosidad y rápida instalación" /></ListItem>
            <ListItem><ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon><ListItemText primary="Cobertura técnica y asistencia durante el evento" /></ListItem>
          </List>
          {renderGallery(oohGalleries.ruteros)}
        </Paper>
      </Box>
      <Lightbox
        open={lightboxOpen}
        src={lightboxItems[lightboxIndex]?.src || ''}
        alt={lightboxItems[lightboxIndex]?.alt}
        onClose={() => setLightboxOpen(false)}
        onPrev={lightboxItems.length > 1 ? () => setLightboxIndex((prev) => (prev - 1 + lightboxItems.length) % lightboxItems.length) : undefined}
        onNext={lightboxItems.length > 1 ? () => setLightboxIndex((prev) => (prev + 1) % lightboxItems.length) : undefined}
      />
    </Container>
  );
};

export default Services;


