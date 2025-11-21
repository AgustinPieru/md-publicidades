import { Typography, Box, Container, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { keyframes } from '@mui/system';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { images } from '../constants/images';
import SectionHeader from '../components/SectionHeader';
import ClientCarousel from '../components/ClientCarousel';
import OptimizedImage from '../components/OptimizedImage';

// Animaciones
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
              'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.65) 100%)',
            zIndex: 0,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'left',
            px: { xs: 3, sm: 5, md: 8 },
            py: { xs: 6, sm: 8, md: 10 },
            maxWidth: { xs: '100%', sm: 1100 },
            width: { xs: '100%', sm: 'auto' },
            mx: { xs: 0, sm: 'auto' },
            animation: `${fadeInUp} 0.8s ease-out`,
          }}
        >
          <Typography
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: { xs: '-0.02em', sm: '-0.03em', md: '-0.04em' },
              fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem', lg: '4.5rem' },
              textTransform: 'uppercase',
              mb: { xs: 2, sm: 3 },
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, transparent 100%)',
                borderRadius: '2px',
              },
            }}
          >
            DONDE ESTAN TUS CLIENTES
          </Typography>
          <Typography
            sx={{
              opacity: 0.98,
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
              lineHeight: 1.7,
              maxWidth: { xs: '100%', sm: 850 },
              fontWeight: 300,
              letterSpacing: '0.01em',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            Llevamos más de dos décadas posicionándonos en la industria, extendiendo nuestra influencia por todo el país. Nos dedicamos a forjar vínculos duraderos entre marcas y su público, generando conexiones valiosas y significativas
          </Typography>
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
          subtitle="En MD Publicidades ofrecemos soluciones integrales"
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
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease',
                borderRadius: 2,
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  '& .image-container': {
                    transform: 'scale(1.1)',
                  },
                  '& .image-overlay::after': {
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%)',
                  },
                },
              }}
            >
              <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Box 
                  className="image-overlay"
                  sx={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: 220,
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)',
                      zIndex: 1,
                      transition: 'background 0.3s ease',
                    },
                  }}
                >
                  <Box
                    className="image-container"
                    sx={{
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.5s ease',
                    }}
                  >
                    <OptimizedImage
                      src={images.services.viaPublica.led[0]}
                      alt="Vía Pública – OOH"
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                      }}
                      skeletonHeight={220}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1.15rem' }}>
                    Vía Pública – OOH
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Ofrecemos cobertura nacional en vía pública para garantizar la visibilidad, recordación y alcance masivo de tu marca.
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
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease',
                borderRadius: 2,
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  '& .image-container': {
                    transform: 'scale(1.1)',
                  },
                  '& .image-overlay::after': {
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%)',
                  },
                },
              }}
            >
              <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Box 
                  className="image-overlay"
                  sx={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: 220,
                    backgroundColor: 'grey.200',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)',
                      zIndex: 1,
                      transition: 'background 0.3s ease',
                    },
                  }}
                >
                  <Box
                    className="image-container"
                    sx={{
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.5s ease',
                    }}
                  >
                    <OptimizedImage
                      src={images.services.eventos?.[0]}
                      alt="Eventos"
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                      }}
                      skeletonHeight={220}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1.15rem' }}>
                    Eventos
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Brindamos un servicio integral de comercialización para eventos.
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
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease',
                borderRadius: 2,
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Box 
                  className="image-overlay"
                  sx={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: 220,
                    backgroundColor: 'grey.200',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)',
                      zIndex: 1,
                      transition: 'background 0.3s ease',
                    },
                  }}
                >
                  <Box
                    className="image-container"
                    sx={{
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.5s ease',
                    }}
                  >
                    <OptimizedImage
                      src={images.services.marketingDeportivo?.[0]}
                      alt="Marketing Deportivo"
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                      }}
                      skeletonHeight={220}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1.15rem' }}>
                    Marketing Deportivo
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Realizamos activaciones y gestionamos patrocinios en clubes nacionales.
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
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease',
                borderRadius: 2,
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Box 
                  className="image-overlay"
                  sx={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: 220,
                    backgroundColor: 'grey.200',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)',
                      zIndex: 1,
                      transition: 'background 0.3s ease',
                    },
                  }}
                >
                  <Box
                    className="image-container"
                    sx={{
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.5s ease',
                    }}
                  >
                    <OptimizedImage
                      src={images.services.rental?.[0]}
                      alt="Rental"
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                      }}
                      skeletonHeight={220}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1.15rem' }}>
                    Rental
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Alquilamos pantallas LED para interior y exterior.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: 'grey.50', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <SectionHeader 
            title="Nuestros Clientes" 
            align="center"
          />
          <ClientCarousel logos={[...images.clients]} />
        </Container>
      </Box>

      {/* Sección Somos Miembros */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <SectionHeader 
          title="Somos miembros" 
          align="center"
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: { xs: 3, sm: 4, md: 6 },
            mt: 4,
          }}
        >
          {images.members.map((logo, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: 100, sm: 120, md: 140 },
                height: { xs: 60, sm: 70, md: 80 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'grayscale(100%)',
                opacity: 0.8,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  filter: 'grayscale(0%)',
                  opacity: 1,
                },
              }}
            >
              <OptimizedImage
                src={logo}
                alt={`Miembro ${index + 1}`}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
                showSkeleton={true}
                skeletonHeight={80}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Container>
  );
};

export default Home;


