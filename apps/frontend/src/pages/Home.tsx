import { Typography, Box, Button, Container, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          position: 'relative',
          mx: 'calc(50% - 50vw)',
          width: '100vw',
          color: 'common.white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: {
            xs: 'calc(100vh - 56px + 1px)',
            sm: 'calc(100vh - 64px + 1px)',
          },
          overflow: 'hidden',
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
            px: { xs: 3, sm: 6 },
            py: { xs: 4, sm: 6 },
            borderRadius: 3,
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
            maxWidth: 1000,
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
            }}
          >
            Donde tus clientes están, ahí estamos
          </Typography>
          <Typography
            sx={{
              opacity: 0.95,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              maxWidth: 900,
              mx: 'auto',
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
    </Container>
  );
};

export default Home;


