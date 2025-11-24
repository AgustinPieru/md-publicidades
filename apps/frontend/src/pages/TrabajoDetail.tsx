import {
  Typography,
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Alert,
  Button,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Trabajo } from '../types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import PageContainer from '../components/PageContainer';

const TrabajoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trabajo, setTrabajo] = useState<Trabajo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/trabajos');
    }
  };

  useEffect(() => {
    const fetchTrabajo = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await apiService.getTrabajoById(parseInt(id));
        setTrabajo(data);
      } catch (err) {
        setError('Error al cargar el trabajo');
        console.error('Error fetching trabajo:', err);
      } finally {
        setLoading(false);
      }
    };

    void fetchTrabajo();
  }, [id]);

  const openLightbox = (imageUrl: string) => {
    if (!trabajo) return;

    const allImages = [
      trabajo.imagenPrincipalUrl,
      ...(trabajo.imagenes ?? []).map((img) => img.url),
    ];
    const index = allImages.indexOf(imageUrl);

    setLightboxIndex(index === -1 ? 0 : index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (!lightboxOpen || !trabajo) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const allImages = [
        trabajo.imagenPrincipalUrl,
        ...(trabajo.imagenes ?? []).map((img) => img.url),
      ];

      if (!allImages.length || lightboxIndex === null) return;

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setLightboxIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % allImages.length;
        });
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setLightboxIndex((prev) => {
          if (prev === null) return 0;
          return (prev - 1 + allImages.length) % allImages.length;
        });
      } else if (event.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, trabajo, lightboxIndex]);

  if (loading) {
    return (
      <PageContainer maxWidth="sm" useTopOffset={false}>
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (error || !trabajo) {
    return (
      <PageContainer maxWidth="sm" useTopOffset={false}>
        <Box sx={{ py: 4 }}>
          <Alert severity="error">{error || 'Trabajo no encontrado'}</Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mt: 2 }}
          >
            Volver a Trabajos
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="md" compact useTopOffset={false}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            mb: 1.5,
            alignSelf: 'flex-start',
            ml: { xs: -1, sm: -1.5 },
          }}
        >
          Volver a Trabajos
        </Button>

        <Card
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              bgcolor: 'background.default',
              flexShrink: 0,
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="img"
              image={trabajo.imagenPrincipalUrl}
              alt={trabajo.titulo}
              loading="lazy"
              onClick={() => openLightbox(trabajo.imagenPrincipalUrl)}
              sx={{
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: { xs: '25vh', sm: '30vh', md: '35vh', lg: '40vh' },
                objectFit: 'cover',
                cursor: 'zoom-in',
              }}
            />
            <IconButton
              aria-label="Ampliar imagen"
              onClick={() => openLightbox(trabajo.imagenPrincipalUrl)}
              sx={{
                position: 'absolute',
                top: { xs: 8, sm: 12 },
                right: { xs: 8, sm: 12 },
                bgcolor: 'rgba(0,0,0,0.45)',
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
              }}
              size="small"
            >
              <OpenInFullIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              p: { xs: 1.5, sm: 2, md: 2.5 },
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                mb: 1,
              }}
            >
              {trabajo.titulo}
            </Typography>
            <Typography
              variant="body2"
              paragraph
              sx={{
                whiteSpace: 'pre-line',
                mb: 2,
                fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.875rem' },
                lineHeight: 1.5,
              }}
            >
              {trabajo.descripcion}
            </Typography>

            {trabajo.imagenes && trabajo.imagenes.length > 0 && (
              <>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1.5, fontWeight: 600 }}
                >
                  Álbum de fotos
                </Typography>
                <ImageList cols={3} gap={8} rowHeight={140}>
                  {trabajo.imagenes.map((img) => (
                    <ImageListItem key={img.id} sx={{ cursor: 'zoom-in' }}>
                      <img
                        src={img.url}
                        loading="lazy"
                        alt={trabajo.titulo}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                        onClick={() => openLightbox(img.url)}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </>
            )}
          </Box>
        </Card>

        <Dialog
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          fullScreen
          PaperProps={{ sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}
        >
          <IconButton
            aria-label="Cerrar"
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'fixed', top: 12, right: 12, color: '#fff', zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}>
            {(() => {
              if (!trabajo || lightboxIndex === null) return null;
              const allImages = [
                trabajo.imagenPrincipalUrl,
                ...(trabajo.imagenes ?? []).map((img) => img.url),
              ];
              const currentImage = allImages[lightboxIndex];
              if (!currentImage) return null;

              return (
              <Box
                component="img"
                src={currentImage}
                alt={trabajo.titulo}
                sx={{ maxWidth: '100%', maxHeight: '100vh', objectFit: 'contain' }}
              />
              );
            })()}
          </DialogContent>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default TrabajoDetail;


