import { Box, Typography, Container, Grid, Stack, IconButton, Link as MuiLink, Divider, useTheme } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FaWhatsapp } from 'react-icons/fa';
import { contactData } from '../constants/contact';
import { images } from '../constants/images';

const Footer = () => {
  const theme = useTheme();
  const {
    companyName,
    slogan,
    address,
    email,
    phone,
    whatsapp,
    instagramUrl,
    facebookUrl,
    linkedinUrl,
  } = contactData;

  return (
    <Box
      component="footer"
      sx={{
        pb: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        px: 2,
        mt: 4,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 1. Identidad del sitio */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
              <img
                src={images.logoHorizontal}
                alt={companyName}
                style={{
                  height: '60px',
                  maxWidth: '250px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mb: 2,
                  alignSelf: 'flex-start',
                  lineHeight: 1.4,
                }}
              >
                {slogan}
              </Typography>
            </Box>
          </Grid>

          {/* 2. Información de contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
              Contacto
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: 20, mt: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.primary">
                  {address}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                <MuiLink
                  href={`mailto:${email}`}
                  color="inherit"
                  underline="hover"
                  sx={{ fontSize: '0.875rem' }}
                >
                  {email}
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                <MuiLink
                  href={`tel:${phone}`}
                  color="inherit"
                  underline="hover"
                  sx={{ fontSize: '0.875rem', mr: 1 }}
                >
                  {phone}
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaWhatsapp style={{ fontSize: 20, color: theme.palette.text.secondary }} />
                <MuiLink
                  href={`https://wa.me/${whatsapp.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="hover"
                  sx={{ fontSize: '0.875rem' }}
                >
                  WhatsApp: {whatsapp}
                </MuiLink>
              </Box>
            </Stack>
          </Grid>

          {/* 3. Redes sociales */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
              Síguenos
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                component="a"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* 4. Información legal */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {companyName} {new Date().getFullYear()}. Todos los derechos reservados.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Desarrollado por{' '}
              <MuiLink
                href="https://wa.me/3492419859"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="inherit"
              >
                Agustin Pieruccioni
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;


