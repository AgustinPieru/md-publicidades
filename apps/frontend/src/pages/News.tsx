import { Typography, Container, Box, Grid, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNovedades } from '../hooks/useNovedades';
import SectionHeader from '../components/SectionHeader';

const News = () => {
  const { novedades, loading, error } = useNovedades();

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{
        py: { xs: 2, md: 3 },
        mt: -4,
        flex: 1,
        overflow: 'auto'
      }}>
        <SectionHeader title="Novedades" subtitle="Las últimas noticias y novedades de MD Publicidades" align="left" />
        
        {novedades.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            No hay novedades disponibles en este momento.
          </Typography>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {novedades.map((novedad) => (
              <Grid item xs={12} sm={6} md={4} key={novedad.id}>
                <Card 
                  component={Link} 
                  to={`/novedades/${novedad.id}`}
                  sx={{ 
                    textDecoration: 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={novedad.imagenUrl}
                    alt={novedad.titulo}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {novedad.titulo}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {novedad.descripcion}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                      {new Date(novedad.createdAt).toLocaleDateString('es-ES')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default News;
