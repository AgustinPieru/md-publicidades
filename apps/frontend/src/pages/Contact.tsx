import { Typography, Container, Box, Button } from '@mui/material';

const Contact = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+5491234567890'; // Reemplazar con el número real
    const message = 'Hola, me interesa conocer más sobre los servicios de MD Publicidades.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Contacto
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          ¿Tienes alguna consulta? ¡Contáctanos por WhatsApp!
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={handleWhatsAppClick}
          sx={{ mt: 3 }}
        >
          Contactar por WhatsApp
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;


