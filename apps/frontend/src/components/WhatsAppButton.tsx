import { Box, Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { contactData } from '../constants/contact';

const WhatsAppButton = () => {
  // Formatear el número de WhatsApp (eliminar espacios, guiones y otros caracteres, mantener solo números)
  const whatsappNumber = contactData.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 20, sm: 30 },
        right: { xs: 20, sm: 30 },
        zIndex: 1000,
      }}
    >
      <Fab
        color="success"
        aria-label="Contactar por WhatsApp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          backgroundColor: '#25D366',
          color: 'white',
          width: { xs: 56, sm: 64 },
          height: { xs: 56, sm: 64 },
          '&:hover': {
            backgroundColor: '#20BA5A',
            transform: 'scale(1.05)',
            boxShadow: '0 6px 24px rgba(37, 211, 102, 0.5)',
          },
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
        }}
      >
        <WhatsAppIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
      </Fab>
    </Box>
  );
};

export default WhatsAppButton;

