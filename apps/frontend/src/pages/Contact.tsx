import { Typography, Box, Grid, Stack, Card, CardContent, Link as MuiLink } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import PageContainer from '../components/PageContainer';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FaWhatsapp } from 'react-icons/fa';
import { contactData } from '../constants/contact';

const Contact = () => {
  return (
    <PageContainer maxWidth="lg" useTopOffset>
      <SectionHeader 
        title="Contacto" 
        subtitle="¿Tienes alguna consulta? ¡Contáctanos!" 
        align="left" 
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Grid container spacing={3} sx={{ maxWidth: { xs: '100%', sm: '600px', md: '700px' } }}>
          {/* Información de contacto */}
          <Grid item xs={12}>
            <Card 
              elevation={4} 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(250,250,252,1) 100%)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                }
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 4,
                    textAlign: 'left',
                    color: 'primary.main',
                    fontSize: { xs: '1.5rem', sm: '1.75rem' }
                  }}
                >
                  Información de Contacto
                </Typography>
                <Stack spacing={3}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 2.5,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(0,0,0,0.02)',
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.04)',
                      }
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: 32, color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.75, fontWeight: 600 }}>
                        Dirección
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        {contactData.address}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2.5,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(0,0,0,0.02)',
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.04)',
                      }
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 32, color: 'primary.main', flexShrink: 0 }} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.75, fontWeight: 600 }}>
                        Email
                      </Typography>
                      <MuiLink
                        href={`mailto:${contactData.email}`}
                        color="primary"
                        underline="hover"
                        sx={{ 
                          fontSize: '1rem',
                          fontWeight: 500,
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          display: 'block',
                          '&:hover': {
                            textDecoration: 'underline',
                          }
                        }}
                      >
                        {contactData.email}
                      </MuiLink>
                    </Box>
                  </Box>
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2.5,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(0,0,0,0.02)',
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.04)',
                      }
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 32, color: 'primary.main', flexShrink: 0 }} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.75, fontWeight: 600 }}>
                        Teléfono
                      </Typography>
                      <MuiLink
                        href={`tel:${contactData.phone}`}
                        color="primary"
                        underline="hover"
                        sx={{ 
                          fontSize: '1rem',
                          fontWeight: 500,
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          display: 'block',
                          '&:hover': {
                            textDecoration: 'underline',
                          }
                        }}
                      >
                        {contactData.phone}
                      </MuiLink>
                    </Box>
                  </Box>
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2.5,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(0,0,0,0.02)',
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.04)',
                      }
                    }}
                  >
                    <Box sx={{ flexShrink: 0 }}>
                      <FaWhatsapp style={{ fontSize: 32, color: 'primary.main' }} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.75, fontWeight: 600 }}>
                        WhatsApp
                      </Typography>
                      <MuiLink
                        href={`https://wa.me/${contactData.whatsapp.replace(/\s+/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="success"
                        underline="hover"
                        sx={{ 
                          fontSize: '1rem',
                          fontWeight: 600,
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          display: 'block',
                          '&:hover': {
                            textDecoration: 'underline',
                          }
                        }}
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
      </Box>
    </PageContainer>
  );
};

export default Contact;


