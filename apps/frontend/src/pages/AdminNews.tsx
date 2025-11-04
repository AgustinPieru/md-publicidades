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
  DialogActions
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNovedades } from '../hooks/useNovedades';
import { Novedad } from '../types';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import PageContainer from '../components/PageContainer';

const AdminNews = () => {
  const navigate = useNavigate();
  const { logout, admin, isAuthenticated, loading: authLoading } = useAuth();
  const { novedades, loading, error, deleteNovedad } = useNovedades();
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    novedad: Novedad | null;
  }>({ open: false, novedad: null });

  useEffect(() => {
    console.log('🔍 AdminNews - authLoading:', authLoading, 'isAuthenticated:', isAuthenticated);
    if (!authLoading && !isAuthenticated) {
      console.log('❌ AdminNews - Redirigiendo a login');
      navigate('/admin/login');
    } else if (!authLoading && isAuthenticated) {
      console.log('✅ AdminNews - Usuario autenticado, mostrando lista');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleDelete = async () => {
    if (deleteDialog.novedad) {
      const success = await deleteNovedad(deleteDialog.novedad.id);
      if (success) {
        setDeleteDialog({ open: false, novedad: null });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Administrar Novedades
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Bienvenido, {admin?.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/novedades/nueva')}
            >
              Nueva Novedad
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

        {novedades.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay novedades creadas
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/novedades/nueva')}
              sx={{ mt: 2 }}
            >
              Crear Primera Novedad
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {novedades.map((novedad) => (
              <Grid item xs={12} sm={6} md={4} key={novedad.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                  <CardActions>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/admin/novedades/editar/${novedad.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setDeleteDialog({ open: true, novedad })}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Dialog de confirmación de eliminación */}
        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, novedad: null })}
        >
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que quieres eliminar la novedad "{deleteDialog.novedad?.titulo}"?
              Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, novedad: null })}>
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

export default AdminNews;
