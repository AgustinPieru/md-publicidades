import { Typography, Box, Card, CardMedia, CircularProgress, Alert, Button, Divider, IconButton, Dialog, DialogContent } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Novedad } from '../types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import PageContainer from '../components/PageContainer';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [novedad, setNovedad] = useState<Novedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchNovedad = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await apiService.getNovedadById(parseInt(id));
        setNovedad(data);
      } catch (err) {
        setError('Error al cargar la novedad');
        console.error('Error fetching novedad:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNovedad();
  }, [id]);

  if (loading) {
    return (
      <PageContainer maxWidth="sm" useTopOffset={false}>
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (error || !novedad) {
    return (
      <PageContainer maxWidth="sm" useTopOffset={false}>
        <Box sx={{ py: 4 }}>
          <Alert severity="error">{error || 'Novedad no encontrada'}</Alert>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/novedades')}
            sx={{ mt: 2 }}
          >
            Volver a Novedades
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="sm" compact useTopOffset={false}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/novedades')}
          sx={{ 
            mb: 1.5,
            alignSelf: 'flex-start',
            ml: { xs: -1, sm: -1.5 }
          }}
        >
          Volver a Novedades
        </Button>
        
        <Card 
          elevation={3} 
          sx={{ 
            borderRadius: 3, 
            overflow: 'hidden', 
            display: 'flex', 
            flexDirection: 'column'
          }}
        >
          <Box 
            sx={{ 
              position: 'relative', 
              bgcolor: 'background.default',
              flexShrink: 0,
              width: '100%',
              overflow: 'hidden'
            }}
          >
            <CardMedia
              component="img"
              image={novedad.imagenUrl}
              alt={novedad.titulo}
              loading="lazy"
              onClick={() => setLightboxOpen(true)}
              sx={{ 
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: { xs: '25vh', sm: '30vh', md: '35vh', lg: '40vh' },
                objectFit: 'cover',
                cursor: 'zoom-in'
              }}
            />
            <IconButton 
              aria-label="Ampliar imagen"
              onClick={() => setLightboxOpen(true)}
              sx={{
                position: 'absolute',
                top: { xs: 8, sm: 12 },
                right: { xs: 8, sm: 12 },
                bgcolor: 'rgba(0,0,0,0.45)',
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' }
              }}
              size="small"
            >
              <OpenInFullIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider />
          <Box 
            sx={{ 
              p: { xs: 1.5, sm: 2, md: 2.5 }
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                mb: 1
              }}
            >
              {novedad.titulo}
            </Typography>
            <Typography 
              variant="body2" 
              paragraph 
              sx={{ 
                whiteSpace: 'pre-line', 
                mb: 1,
                fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.875rem' },
                lineHeight: 1.5
              }}
            >
              {novedad.descripcion}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}
              >
                Publicado el {new Date(novedad.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Box>
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
            <Box 
              component="img"
              src={novedad.imagenUrl}
              alt={novedad.titulo}
              sx={{ maxWidth: '100%', maxHeight: '100vh', objectFit: 'contain' }}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default NewsDetail;
