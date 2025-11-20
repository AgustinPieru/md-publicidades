import { Typography, Box, Button, Container, Stack, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { images } from '../constants/images';
import SectionHeader from '../components/SectionHeader';
import ClientCarousel from '../components/ClientCarousel';
import OptimizedImage from '../components/OptimizedImage';

const Home = () => {
  // Precargar la imagen de portada
  const { allLoaded } = useImagePreloader([images.cover]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    if (allLoaded) {
      setBackgroundImage(images.cover);
    }
  }, [allLoaded]);

  return (
    <Container maxWidth={false} sx={{ px: { xs: 0, sm: 3 } }}>
      <Box
        sx={{
          position: 'relative',
          mx: { xs: 0, sm: 'calc(50% - 50vw)' },
          width: { xs: '100%', sm: '100vw' },
          color: 'common.white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: {
            xs: 'calc(100vh - 56px + 1px)',
            sm: 'calc(100vh - 64px + 1px)',
          },
          overflow: 'hidden',
          backgroundImage: backgroundImage ? `url('${backgroundImage}')` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: backgroundImage ? 'transparent' : 'grey.900',
          transition: 'background-image 0.3s ease-in-out',
          mt: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.55) 100%)',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'left',
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 4, sm: 6 },
            borderRadius: { xs: 0, sm: 3 },
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(0,0,0,0.35)',
            border: { xs: 'none', sm: '1px solid rgba(255,255,255,0.18)' },
            boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
            maxWidth: { xs: '100%', sm: 1000 },
            width: { xs: '100%', sm: 'auto' },
            mx: { xs: 0, sm: 'auto' },
          }}
        >
          <Typography
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.9rem', sm: '2.6rem', md: '3.4rem' },
              textTransform: 'uppercase',
            }}
          >
            DONDE ESTAN TUS CLIENTES, AHÍ ESTAMOS
          </Typography>
          <Typography
            sx={{
              opacity: 0.95,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              maxWidth: { xs: '100%', sm: 900 },
              mx: { xs: 0, sm: 'auto' },
            }}
          >
            Llevamos más de dos décadas posicionándonos en la industria, extendiendo nuestra influencia por todo el país. Nos dedicamos a forjar vínculos duraderos entre marcas y su público, generando conexiones valiosas y significativas
          </Typography>

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} justifyContent="flex-start" sx={{ mt: { xs: 3, sm: 4 } }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/contacto"
            >
              Contactanos
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/servicios"
              color="inherit"
              sx={{
                color: 'common.white',
                borderColor: 'rgba(255,255,255,0.6)',
                '&:hover': { borderColor: 'common.white', backgroundColor: 'rgba(255,255,255,0.08)' },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Nuestros Servicios
            </Button>
          </Stack>
        </Box>

        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
            <path d="M0,64L60,53.3C120,43,240,21,360,21.3C480,21,600,43,720,64C840,85,960,107,1080,101.3C1200,96,1320,64,1380,48L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" fill="#ffffff" />
          </svg>
        </Box>
      </Box>

      {/* Sección Nuestros Servicios */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <SectionHeader 
          title="Nuestros Servicios" 
          subtitle="Hoy, M&D Publicidades ofrece soluciones integrales en cuatro áreas principales"
          align="center"
        />
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={Link}
              to="/servicios#ooh"
              sx={{
                height: '100%',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
                  <OptimizedImage
                    src={images.services.viaPublica.led[0]}
                    alt="Vía Pública – OOH"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    skeletonHeight={200}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    Vía Pública – OOH
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cobertura nacional en vía pública para visibilidad, recordación y alcance masivo.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={Link}
              to="/servicios#eventos"
              sx={{
                height: '100%',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Box sx={{ position: 'relative', width: '100%', height: 200, backgroundColor: 'grey.200' }}>
                  <OptimizedImage
                    src={images.services.eventos?.[0]}
                    alt="Eventos"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    skeletonHeight={200}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    Eventos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Producción, cobertura y soporte visual para eventos de gran escala.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={Link}
              to="/servicios#marketing-deportivo"
              sx={{
                height: '100%',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Box sx={{ position: 'relative', width: '100%', height: 200, backgroundColor: 'grey.200' }}>
                  <OptimizedImage
                    src={images.services.marketingDeportivo?.[0]}
                    alt="Marketing Deportivo"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    skeletonHeight={200}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    Marketing Deportivo
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Activaciones y patrocinios en clubes y eventos nacionales.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={Link}
              to="/servicios#rental"
              sx={{
                height: '100%',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Box sx={{ position: 'relative', width: '100%', height: 200, backgroundColor: 'grey.200' }}>
                  <OptimizedImage
                    src={images.services.rental?.[0]}
                    alt="Rental"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    skeletonHeight={200}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    Rental
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Alquiler de pantallas LED para eventos y publicidad.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Sección Nuestros Clientes */}
      <Box sx={{ backgroundColor: 'grey.50', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <SectionHeader 
            title="Nuestros Clientes" 
            align="center"
          />
          <ClientCarousel logos={[...images.clients]} />
        </Container>
      </Box>
    </Container>
  );
};

export default Home;


