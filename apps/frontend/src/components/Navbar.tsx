import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { images } from '../constants/images';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState<null | HTMLElement>(null);

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Sobre Nosotros', path: '/sobre-nosotros' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Campañas', path: '/trabajos' },
    { label: 'Novedades', path: '/novedades' },
    { label: 'Contacto', path: '/contacto' },
  ];

  const serviceSections = [
    { label: 'Vía Pública', hash: 'ooh' },
    { label: 'Marketing Deportivo', hash: 'marketing-deportivo' },
    { label: 'Eventos', hash: 'eventos' },
    { label: 'Rental', hash: 'rental' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    handleDrawerClose();
  };

  const handleServicesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleServicesMenuClose = () => {
    setServicesAnchorEl(null);
  };

  const handleServiceSectionClick = (hash: string) => {
    navigate(`/servicios#${hash}`);
    handleServicesMenuClose();
  };

  const isServicesMenuOpen = Boolean(servicesAnchorEl);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <React.Fragment key={item.path}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavClick(item.path)}
                selected={
                  item.path === '/servicios'
                    ? location.pathname === item.path && !location.hash
                    : location.pathname === item.path
                }
                sx={{
                  backgroundColor:
                    item.path === '/servicios'
                      ? location.pathname === item.path && !location.hash
                        ? 'rgba(25, 118, 210, 0.1)'
                        : 'transparent'
                      : location.pathname === item.path
                        ? 'rgba(25, 118, 210, 0.1)'
                        : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.05)',
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>

            {item.path === '/servicios' &&
              serviceSections.map((section) => (
                <ListItem key={section.hash} disablePadding>
                  <ListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor:
                        location.pathname === '/servicios' &&
                        location.hash === `#${section.hash}`
                          ? 'rgba(25, 118, 210, 0.06)'
                          : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.05)',
                      },
                    }}
                    selected={
                      location.pathname === '/servicios' &&
                      location.hash === `#${section.hash}`
                    }
                    onClick={() => handleNavClick(`/servicios#${section.hash}`)}
                  >
                    <ListItemText primary={section.label} />
                  </ListItemButton>
                </ListItem>
              ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img
              src={images.logo}
              alt="MD Publicidades"
              style={{
                height: isMobile ? '50px' : '80px',
                maxWidth: isMobile ? '150px' : '200px',
                objectFit: 'contain',
              }}
            />
          </Box>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="abrir menú de navegación"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) =>
                item.path === '/servicios' ? (
                  <Box
                    key={item.path}
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <Button
                      color="inherit"
                      component={Link}
                      to={item.path}
                      sx={{
                        backgroundColor:
                          location.pathname === item.path && !location.hash
                            ? 'rgba(255,255,255,0.1)'
                            : 'transparent',
                      }}
                    >
                      {item.label}
                    </Button>
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={handleServicesMenuOpen}
                      sx={{
                        ml: -0.5,
                        backgroundColor:
                          location.pathname === '/servicios' && location.hash
                            ? 'rgba(255,255,255,0.1)'
                            : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.15)',
                        },
                      }}
                      aria-label="Abrir menú de servicios"
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                    <Menu
                      anchorEl={servicesAnchorEl}
                      open={isServicesMenuOpen}
                      onClose={handleServicesMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      {serviceSections.map((section) => (
                        <MenuItem
                          key={section.hash}
                          selected={
                            location.pathname === '/servicios' &&
                            location.hash === `#${section.hash}`
                          }
                          onClick={() => handleServiceSectionClick(section.hash)}
                        >
                          {section.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    key={item.path}
                    color="inherit"
                    component={Link}
                    to={item.path}
                    sx={{
                      backgroundColor:
                        location.pathname === item.path
                          ? 'rgba(255,255,255,0.1)'
                          : 'transparent',
                    }}
                  >
                    {item.label}
                  </Button>
                )
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móviles
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;


