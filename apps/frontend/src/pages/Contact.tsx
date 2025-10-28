import { Typography, Container, Box, Button } from '@mui/material';
import SectionHeader from '../components/SectionHeader';

const Contact = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+5491234567890'; // Reemplazar con el número real
    const message = 'Hola, me interesa conocer más sobre los servicios de MD Publicidades.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{
        py: { xs: 2, md: 3 },
        mt: -4,
        textAlign: 'center',
        flex: 1,
        overflow: 'auto'
      }}>
        <SectionHeader title="Contacto" subtitle="¿Tienes alguna consulta? ¡Contáctanos por WhatsApp!" align="left" />
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


