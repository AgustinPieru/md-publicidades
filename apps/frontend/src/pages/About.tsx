import { Typography, Container, Box, Grid, Stack } from '@mui/material';
import SectionHeader from '../components/SectionHeader';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{
        py: { xs: 2, md: 3 },
        mt: -4,
        flex: 1,
        overflow: 'auto'
      }}>
        <SectionHeader title="Sobre nosotros" subtitle="Somos la solución en comunicación OUT OF HOME." align="left" />

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Con 20 años de experiencia, somos especialistas en la ejecución de campañas publicitarias de alcance provincial y nacional, trabajando junto a empresas privadas, entidades públicas y partidos políticos.
            </Typography>
            <Typography variant="body1" paragraph>
              A través de nuestra red nacional de pantallas LED y carteles fijos, influimos en la decisión de los consumidores y ayudamos a las marcas a ganar visibilidad, posicionamiento y recordación.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              role="img"
              aria-label="Equipo e imagen institucional de MD Publicidades"
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                minHeight: 260,
                aspectRatio: '4 / 3',
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?auto=format&fit=crop&w=1600&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
        </Grid>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: { xs: 4, md: 6 } }}
        >
          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              backgroundColor: 'grey.100',
            }}
          >
            <Typography variant="h3" component="div" sx={{ fontWeight: 800 }}>
              +20
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              años de experiencia
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              backgroundColor: 'grey.100',
            }}
          >
            <Typography variant="h3" component="div" sx={{ fontWeight: 800 }}>
              +500
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              pantallas LED en todo el país
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              backgroundColor: 'grey.100',
            }}
          >
            <Typography variant="h3" component="div" sx={{ fontWeight: 800 }}>
              +200
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              marcas acompañadas
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default About;


