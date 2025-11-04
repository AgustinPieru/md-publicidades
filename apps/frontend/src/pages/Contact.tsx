import { Typography, Box, Button } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import PageContainer from '../components/PageContainer';

const Contact = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+5491234567890'; // Reemplazar con el número real
    const message = 'Hola, me interesa conocer más sobre los servicios de MD Publicidades.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <PageContainer maxWidth="lg" useTopOffset>
      <Box sx={{ textAlign: 'center' }}>
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
    </PageContainer>
  );
};

export default Contact;


