import { Typography, Container, Box, Grid, Card, CardContent } from '@mui/material';

const Services = () => {
  const services = [
    {
      title: 'Marketing Integral',
      description: 'Soluciones completas de marketing para tu empresa'
    },
    {
      title: 'Vía Pública',
      description: 'Publicidad en espacios públicos estratégicos'
    },
    {
      title: 'Marketing Deportivo',
      description: 'Patrocinios y publicidad en eventos deportivos'
    },
    {
      title: 'Pantallas LED',
      description: 'Tecnología LED para máxima visibilidad'
    },
    {
      title: 'Eventos',
      description: 'Organización y producción de eventos corporativos'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Nuestros Servicios
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Services;


