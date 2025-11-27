import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTrabajos } from '../hooks/useTrabajos';
import { Trabajo } from '../types';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import PageContainer from '../components/PageContainer';
import SectionHeader from '../components/SectionHeader';

const AdminTrabajos = () => {
  const navigate = useNavigate();
  const { logout, admin, isAuthenticated, loading: authLoading } = useAuth();
  const { trabajos, loading, error, deleteTrabajo } = useTrabajos();
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    trabajo: Trabajo | null;
  }>({ open: false, trabajo: null });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleDelete = async () => {
    if (deleteDialog.trabajo) {
      const success = await deleteTrabajo(deleteDialog.trabajo.id);
      if (success) {
        setDeleteDialog({ open: false, trabajo: null });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const [section, setSection] = useState<'novedades' | 'trabajos'>('trabajos');

  const handleSectionChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSection: 'novedades' | 'trabajos' | null
  ) => {
    if (!newSection) return;
    setSection(newSection);
    if (newSection === 'novedades') {
      navigate('/admin/novedades');
    }
  };

  if (authLoading) {
    return (
      <PageContainer maxWidth="lg" useTopOffset>
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer maxWidth="lg" useTopOffset>
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="lg" useTopOffset>
      <Box>
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <SectionHeader
            title="Panel de Administración"
            subtitle={`Bienvenido, ${admin?.email || ''}`}
            align="left"
          />
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={section}
            onChange={handleSectionChange}
            size="small"
            sx={{ alignSelf: { xs: 'flex-start', md: 'flex-end' } }}
          >
            <ToggleButton value="novedades">Novedades</ToggleButton>
            <ToggleButton value="trabajos">Campañas</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            mb: 3,
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h5" component="h1">
            Administrar Campañas
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexShrink: 0,
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/trabajos/nuevo')}
            >
              Nuevo Trabajo
            </Button>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {trabajos.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay Campañas creados
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/trabajos/nuevo')}
              sx={{ mt: 2 }}
            >
              Crear Primer Campañas
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {trabajos.map((trabajo) => (
              <Grid item xs={12} sm={6} md={4} key={trabajo.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={trabajo.imagenPrincipalUrl}
                    alt={trabajo.titulo}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {trabajo.titulo}
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
                      {trabajo.descripcion}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/admin/trabajos/editar/${trabajo.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setDeleteDialog({ open: true, trabajo })}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, trabajo: null })}
        >
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que quieres eliminar el trabajo "
              {deleteDialog.trabajo?.titulo}"? Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, trabajo: null })}>
              Cancelar
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default AdminTrabajos;


