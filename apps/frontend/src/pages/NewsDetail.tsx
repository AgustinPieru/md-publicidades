import { Typography, Container, Box, Card, CardMedia, CircularProgress, Alert, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Novedad } from '../types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [novedad, setNovedad] = useState<Novedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <Container maxWidth="lg">
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !novedad) {
    return (
      <Container maxWidth="lg">
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
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/novedades')}
          sx={{ mb: 3 }}
        >
          Volver a Novedades
        </Button>
        
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={novedad.imagenUrl}
            alt={novedad.titulo}
            sx={{ objectFit: 'cover' }}
          />
          <Box sx={{ p: 3 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {novedad.titulo}
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {novedad.descripcion}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Publicado el {new Date(novedad.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default NewsDetail;
