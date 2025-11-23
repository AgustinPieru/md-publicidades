import { Typography, Box, Grid, Stack, Card, CardContent, Divider, CardMedia, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import PageContainer from '../components/PageContainer';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { images } from '../constants/images';
import OptimizedImage from '../components/OptimizedImage';
import AnimatedCounter from '../components/AnimatedCounter';
import { useNovedadesRSE } from '../hooks/useNovedades';

const About = () => {
  // Precargar las imágenes del equipo y del fundador
  const teamImages = Object.values(images.team);
  useImagePreloader([images.founder, ...teamImages]);
  
  // Precargar la imagen de about por separado para mostrarla tan pronto como esté lista
  const { loadedImages: aboutLoadedImages } = useImagePreloader([images.about]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  // Obtener novedades RSE
  const { novedadesRSE, loading: loadingRSE } = useNovedadesRSE(4);

  useEffect(() => {
    // Mostrar la imagen de about tan pronto como se cargue, sin esperar a las demás
    if (aboutLoadedImages.has(images.about)) {
      setBackgroundImage(images.about);
    }
  }, [aboutLoadedImages]);

  // Datos del equipo
  const teamMembers = [
    { 
      name: 'Marcelo Monton', 
      area: 'Socio fundador y gerencia general', 
      image: images.team.marcelo,
      description: 'Fundador de M&D Publicidades con más de 20 años de experiencia en comunicación y publicidad. Lidera la estrategia general de la empresa y el desarrollo de nuevas oportunidades de negocio.'
    },
    { 
      name: 'Marina Volpato', 
      area: 'Comercial', 
      image: images.team.marina,
      description: 'Especialista en relaciones comerciales y desarrollo de clientes. Gestiona las estrategias de ventas y mantiene un contacto cercano con nuestros socios publicitarios.'
    },
    { 
      name: 'Angelina Lamagni', 
      area: 'Contenidos', 
      image: images.team.angelina,
      description: 'Responsable de la creación y gestión de contenidos creativos. Desarrolla campañas publicitarias innovadoras que conectan las marcas con sus audiencias objetivo.'
    },
    { 
      name: 'Paula Pisani', 
      area: 'Medios', 
      image: images.team.paula,
      description: 'Experta en planificación y compra de medios. Coordina la distribución estratégica de publicidad en nuestra red nacional de dispositivos y pantallas.'
    },
    { 
      name: 'Carolina Peralta', 
      area: 'Administración', 
      image: images.team.carolina,
      description: 'Gestiona los aspectos administrativos y financieros de la empresa, asegurando procesos eficientes y una operación organizada.'
    },
    { 
      name: 'Liliana Tschieder', 
      area: 'Logística', 
      image: images.team.liliana,
      description: 'Coordina la logística operativa y la distribución de materiales publicitarios, garantizando que cada campaña se ejecute con precisión y puntualidad.'
    },
    { 
      name: 'Gastón Tschieder', 
      area: 'Gestión y Soporte Operativo', 
      image: images.team.gaston,
      description: 'Proporciona soporte técnico y operativo, asegurando el correcto funcionamiento de nuestros sistemas y dispositivos publicitarios en todo el país.'
    },
  ];

  return (
    <PageContainer maxWidth="lg" useTopOffset compact reservePx={110}>
        {/* Sección: Sobre nosotros */}
        <Box sx={{ pb: 0 }}>
          <SectionHeader title="Sobre nosotros" subtitle="20 años de pasión, crecimiento y compromiso con la comunicación." align="left" />

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                Con 20 años de experiencia, impulsamos campañas publicitarias provinciales y nacionales para que las marcas ganen visibilidad y conexión con sus audiencias.
              </Typography>
              <Typography variant="body1" paragraph>
                Ofrecemos una solución integral para publicitar en todo el país desde una sola agencia, con procesos simples y una gestión profesional apoyada en una amplia red de dispositivos que garantiza alcance e impacto.
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
                  backgroundImage: backgroundImage ? `url('${backgroundImage}')` : 'none',
                  backgroundColor: backgroundImage ? 'transparent' : 'grey.200',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'background-image 0.3s ease-in-out',
                }}
              />
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: { xs: 8, md: 10 } }}
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
              <AnimatedCounter end={20} />
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
              <AnimatedCounter end={2000} />
              <Typography variant="subtitle1" color="text.secondary">
                 dispositivos en todo el país
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
              <AnimatedCounter end={50} />
              <Typography variant="subtitle1" color="text.secondary">
                eventos comercializados
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
              <AnimatedCounter end={200} />
              <Typography variant="subtitle1" color="text.secondary">
                marcas confiaron en nosotros
              </Typography>
            </Box>
          </Stack>
        </Box>
        {/* Sección del Fundador */}
        <Box sx={{ my: { xs: 3, md: 4 }, backgroundColor: 'grey.50', borderRadius: 3, px: { xs: 3, md: 4 }, mx: { xs: -2, md: -3 } }}>
          <SectionHeader 
            title="Nuestra Historia" 
            subtitle="El comienzo de un proyecto que siempre crece." 
            align="left" 
          />
          
          <Grid container spacing={4} alignItems="center" sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  aspectRatio: '3 / 4',
                  maxWidth: { xs: '100%', md: 350 },
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                <OptimizedImage
                  src={images.founder}
                  alt="Fundador de M&D Publicidades"
                  skeletonHeight="100%"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                Hoy, nuestra historia es el resultado de visión emprendedora, trabajo constante y una evolución continua que nos impulsa a seguir creciendo junto a cada marca que confía en nosotros.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                M&D Publicidades nació en 2005 en Rafaela, Santa Fe, a partir de una idea simple que marcó el comienzo de un proyecto que no dejó de crecer. Ese año, junto a Damián, inicié la venta de almanaques publicitarios tras un encuentro casual con Miguel, serigrafista y cuñado de Damián. Aquellos primeros pasos dieron lugar a la venta de fixtures del Mundial FIFA 2006 y, posteriormente, a los mapas publicitarios distribuidos en comercios locales.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                Con el tiempo desarrollé La Red Comercial Rafaela, un espacio que integraba comunicación en radios, gráfica, acciones promocionales y beneficios para comercios de la ciudad. Luego de un período de trabajo conjunto con Damián en otros rubros, cada uno siguió su propio camino y continué solo, enfocado en lo que siempre fue mi pasión: comunicar.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                En 2011 instalé los primeros carteles fijos de vía pública en Rafaela. Dos años después incorporé la primera pantalla LED de la ciudad, y en 2015 ya contamos con un circuito de cuatro pantallas, al que se sumó la expansión hacia Sunchales y Santa Fe Capital. En 2018 avanzamos hacia una cobertura nacional con el desarrollo de cartelería rutera y distintos formatos de publicidad exterior en varios puntos del país.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                Paralelamente, desde 2012 incursioné en el marketing deportivo, acompañando a Atlético de Rafaela y conectando marcas con clubes de Primera División y B Nacional, entre ellos River Plate, Newell's Old Boys, Unión, Colón, Defensa y Justicia, Quilmes, Chicago y Almagro. Durante la pandemia llegó un desafío decisivo: la Sociedad Rural de Rafaela me convocó para comercializar su evento online. A solo 25 días de la fecha, se habilitó su realización presencial y asumí la organización completa. Fue un éxito que abrió una nueva etapa.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                Desde entonces, llevamos cinco años consecutivos a cargo de la comercialización y comunicación de este evento emblemático, que reúne más de 35.000 visitantes y 250 stands.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Separador visual */}
        <Divider 
          sx={{ 
            my: 0,
            borderWidth: 1,
            borderColor: 'divider',
          }} 
        />

        {/* Sección del Equipo */}
        <Box sx={{ py: 0 }}>
          <SectionHeader 
            title="Equipo" 
            subtitle="Brindamos un servicio totalmente personalizado, con una atención cercana y comprometida. Contamos con un equipo especializado en cada área de la empresa para garantizar soluciones eficientes." 
            align="left" 
          />
          
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {teamMembers.map((member, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                      '& .member-overlay': {
                        opacity: 1,
                        visibility: 'visible',
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio: '1',
                      overflow: 'hidden',
                      backgroundColor: 'grey.200',
                      position: 'relative',
                    }}
                  >
                    <OptimizedImage
                      src={member.image}
                      alt={`${member.name} - ${member.area}`}
                      skeletonHeight="100%"
                      sx={{
                        borderRadius: '8px 8px 0 0',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 2 }}>
                    <Typography 
                      variant="subtitle2" 
                      component="div" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 0.5,
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      {member.area}
                    </Typography>
                  </CardContent>
                  
                  {/* Overlay con descripción al hacer hover */}
                  <Box
                    className="member-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.85)',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 2,
                      borderRadius: 2,
                      opacity: 0,
                      visibility: 'hidden',
                      transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
                      zIndex: 10,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      component="div"
                      sx={{ 
                        fontWeight: 600,
                        mb: 1.5,
                        textAlign: 'center',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        textAlign: 'center',
                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.95)',
                      }}
                    >
                      {member.description}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Separador visual */}
        <Divider 
          sx={{ 
            my: 0,
            borderWidth: 1,
            borderColor: 'divider',
          }} 
        />

        {/* Sección RSE */}
        <Box sx={{ py: 0 }}>
          <SectionHeader 
            title="RSE (Responsabilidad Social Empresaria)" 
            subtitle="Nuestro compromiso con la comunidad y el desarrollo sostenible." 
            align="left" 
          />
          
          {loadingRSE ? (
            <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : novedadesRSE.length === 0 ? (
            <Typography variant="body1" align="center" sx={{ mt: 4 }}>
              No hay novedades RSE disponibles en este momento.
            </Typography>
          ) : (
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {novedadesRSE.map((novedad) => (
                <Grid item xs={12} sm={6} md={3} key={novedad.id}>
                  <Card 
                    component={Link} 
                    to={`/novedades/${novedad.id}`}
                    sx={{ 
                      textDecoration: 'none',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={novedad.imagenUrl}
                      alt={novedad.titulo}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {novedad.titulo}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {novedad.descripcion}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        {new Date(novedad.createdAt).toLocaleDateString('es-ES')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
    </PageContainer>
  );
};

export default About;


