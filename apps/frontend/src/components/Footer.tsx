import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        pt: 3,
        pb: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}{' '}
          MD Publicidades. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;


