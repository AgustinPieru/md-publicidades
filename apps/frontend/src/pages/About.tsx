import { Typography, Container, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sobre Nosotros
        </Typography>
        <Typography variant="body1" paragraph>
          MD Publicidades es una empresa especializada en marketing integral, 
          ofreciendo soluciones completas en vía pública, marketing deportivo, 
          pantallas LED y organización de eventos.
        </Typography>
        <Typography variant="body1" paragraph>
          Con años de experiencia en el sector, nos hemos consolidado como 
          referentes en la industria, brindando servicios de calidad y 
          resultados efectivos para nuestros clientes.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;


