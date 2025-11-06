import { Typography, Box, Grid, Stack, Card, CardContent, Link as MuiLink } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import PageContainer from '../components/PageContainer';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import { contactData } from '../constants/contact';

const Contact = () => {
  return (
    <PageContainer maxWidth="lg" useTopOffset>
      <SectionHeader 
        title="Contacto" 
        subtitle="¿Tienes alguna consulta? ¡Contáctanos!" 
        align="left" 
      />
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Información de contacto */}
        <Grid item xs={12} md={8}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Información de Contacto
              </Typography>
              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <LocationOnIcon sx={{ fontSize: 28, color: 'primary.main', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Dirección
                    </Typography>
                    <Typography variant="body1">
                      {contactData.address}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EmailIcon sx={{ fontSize: 28, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Email
                    </Typography>
                    <MuiLink
                      href={`mailto:${contactData.email}`}
                      color="primary"
                      underline="hover"
                      sx={{ fontSize: '1rem' }}
                    >
                      {contactData.email}
                    </MuiLink>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIcon sx={{ fontSize: 28, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Teléfono
                    </Typography>
                    <MuiLink
                      href={`tel:${contactData.phone}`}
                      color="primary"
                      underline="hover"
                      sx={{ fontSize: '1rem' }}
                    >
                      {contactData.phone}
                    </MuiLink>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <MessageIcon sx={{ fontSize: 28, color: 'success.main' }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                      WhatsApp
                    </Typography>
                    <MuiLink
                      href={`https://wa.me/${contactData.whatsapp.replace(/\s+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="success"
                      underline="hover"
                      sx={{ fontSize: '1rem' }}
                    >
                      {contactData.whatsapp}
                    </MuiLink>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Contact;


