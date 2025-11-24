import { Typography, Box, Grid, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTrabajos } from '../hooks/useTrabajos';
import SectionHeader from '../components/SectionHeader';
import PageContainer from '../components/PageContainer';

const Trabajos = () => {
  const { trabajos, loading, error } = useTrabajos();

  if (loading) {
    return (
      <PageContainer maxWidth="lg" useTopOffset>
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer maxWidth="lg" useTopOffset>
        <Box sx={{ py: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="lg" useTopOffset>
      <SectionHeader
        title="Trabajos"
        subtitle="Casos y proyectos realizados por MD Publicidades"
        align="left"
      />

      {trabajos.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No hay trabajos cargados en este momento.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {trabajos.map((trabajo) => (
            <Grid item xs={12} sm={6} md={4} key={trabajo.id}>
              <Card
                component={Link}
                to={`/trabajos/${trabajo.id}`}
                sx={{
                  textDecoration: 'none',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={trabajo.imagenPrincipalUrl}
                  alt={trabajo.titulo}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {trabajo.titulo}
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
                    {trabajo.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  );
};

export default Trabajos;


