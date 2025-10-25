import { Typography, Box, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          MD Publicidades
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Marketing integral, vía pública, marketing deportivo, pantallas LED y eventos
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contacto"
            sx={{ mr: 2 }}
          >
            Contactanos
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/servicios"
          >
            Nuestros Servicios
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;


