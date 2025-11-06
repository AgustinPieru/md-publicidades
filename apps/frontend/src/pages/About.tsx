import { Typography, Box, Grid, Stack } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import PageContainer from '../components/PageContainer';
import { images } from '../constants/images';

const About = () => {
  return (
    <PageContainer maxWidth="lg" useTopOffset compact reservePx={110}>
        <SectionHeader title="Sobre nosotros" subtitle="Somos la solución en comunicación OUT OF HOME." align="left" />

        <Grid container spacing={3} alignItems="center">
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
                minHeight: 200,
                aspectRatio: '16 / 9',
                backgroundImage: `url('${images.about}')`,
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
          sx={{ mt: { xs: 3, md: 4 } }}
        >
          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              p: 2,
              textAlign: 'center',
              backgroundColor: 'grey.100',
            }}
          >
            <Typography variant="h4" component="div" sx={{ fontWeight: 800 }}>
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
              p: 2,
              textAlign: 'center',
              backgroundColor: 'grey.100',
            }}
          >
            <Typography variant="h4" component="div" sx={{ fontWeight: 800 }}>
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
              p: 2,
              textAlign: 'center',
              backgroundColor: 'grey.100',
            }}
          >
            <Typography variant="h4" component="div" sx={{ fontWeight: 800 }}>
              +200
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              marcas acompañadas
            </Typography>
          </Box>
        </Stack>
    </PageContainer>
  );
};

export default About;


