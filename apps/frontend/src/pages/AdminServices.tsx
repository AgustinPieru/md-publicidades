import { 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Servicio } from '../types';
import { apiService } from '../services/api';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PageContainer from '../components/PageContainer';
import SectionHeader from '../components/SectionHeader';

const AdminServices = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, loading: authLoading } = useAuth();
  const [section, setSection] = useState<'novedades' | 'campañas' | 'servicios'>('servicios');
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadDialog, setUploadDialog] = useState<{
    open: boolean;
    servicio: Servicio | null;
  }>({ open: false, servicio: null });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      loadServicios();
    }
  }, [isAuthenticated]);

  const loadServicios = async () => {
    try {
      setLoading(true);
      const data = await apiService.getServicios();
      setServicios(data);
      setError(null);
    } catch (err: any) {
      console.error('Error loading servicios:', err);
      setError(err.response?.data?.message || 'Error al cargar los servicios');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPdf = async () => {
    if (!uploadedFile || !uploadDialog.servicio) return;

    try {
      setUploading(true);
      setError(null);

      // Subir el PDF
      const { pdfUrl } = await apiService.uploadPdf(uploadedFile);

      // Actualizar el servicio con la URL del PDF
      await apiService.updateServicio(uploadDialog.servicio.tipo, {
        pdfUrl: pdfUrl,
      });

      // Recargar servicios
      await loadServicios();

      // Cerrar diálogo
      setUploadDialog({ open: false, servicio: null });
      setUploadedFile(null);
    } catch (err: any) {
      console.error('Error uploading PDF:', err);
      setError(err.response?.data?.message || 'Error al subir el PDF');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePdf = async (servicio: Servicio) => {
    if (!confirm(`¿Estás seguro que deseas eliminar el PDF de ${servicio.nombre}?`)) {
      return;
    }

    try {
      setError(null);
      await apiService.deletePdfFromServicio(servicio.tipo);
      await loadServicios();
    } catch (err: any) {
      console.error('Error deleting PDF:', err);
      setError(err.response?.data?.message || 'Error al eliminar el PDF');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleSectionChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSection: 'novedades' | 'campañas' | 'servicios' | null
  ) => {
    if (!newSection) return;
    setSection(newSection);
    if (newSection === 'novedades') {
      navigate('/admin/novedades');
    } else if (newSection === 'campañas') {
      navigate('/admin/trabajos');
    }
  };

  const getServicioDisplayName = (tipo: string): string => {
    const names: { [key: string]: string } = {
      'monocolumnas': 'Monocolumnas',
      'pantallas-led': 'Pantallas LED',
      'ruteros': 'Ruteros',
      'medianeras': 'Medianeras',
      'grandes-formatos': 'Grandes Formatos / Hipervallas',
      'sextuples': 'Séxtuples',
      'marketing-deportivo': 'Marketing Deportivo',
      'eventos': 'Eventos',
      'rental': 'Rental',
    };
    return names[tipo] || tipo;
  };

  if (authLoading || loading) {
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
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <SectionHeader title="Administrar Servicios" align="left" />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <ToggleButtonGroup
            value={section}
            exclusive
            onChange={handleSectionChange}
            aria-label="sección"
            fullWidth
            sx={{ display: 'flex', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
          >
            <ToggleButton value="novedades" aria-label="novedades">
              Novedades / RSE
            </ToggleButton>
            <ToggleButton value="campañas" aria-label="campañas">
              Campañas
            </ToggleButton>
            <ToggleButton value="servicios" aria-label="servicios">
              Servicios (PDFs)
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Gestiona los PDFs informativos de cada servicio. Los clientes podrán descargarlos desde la página de Servicios.
        </Typography>

        <Grid container spacing={3}>
          {servicios.map((servicio) => (
            <Grid item xs={12} sm={6} md={4} key={servicio.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {getServicioDisplayName(servicio.tipo)}
                  </Typography>
                  
                  {servicio.pdfUrl ? (
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        icon={<PictureAsPdfIcon />}
                        label="PDF disponible"
                        color="success"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'nowrap' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<DownloadIcon sx={{ fontSize: '1rem' }} />}
                          href={servicio.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ 
                            minWidth: 'auto', 
                            flex: '1 1 0',
                            px: 1,
                            py: 0.5,
                            fontSize: '0.75rem'
                          }}
                        >
                          Ver PDF
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon sx={{ fontSize: '1rem' }} />}
                          onClick={() => handleDeletePdf(servicio)}
                          sx={{ 
                            minWidth: 'auto', 
                            flex: '1 1 0',
                            px: 1,
                            py: 0.5,
                            fontSize: '0.75rem'
                          }}
                        >
                          Eliminar
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<UploadFileIcon sx={{ fontSize: '1rem' }} />}
                          onClick={() => setUploadDialog({ open: true, servicio })}
                          sx={{ 
                            minWidth: 'auto', 
                            flex: '1 1 0',
                            px: 1,
                            py: 0.5,
                            fontSize: '0.75rem'
                          }}
                        >
                          Reemplazar
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label="Sin PDF"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        startIcon={<UploadFileIcon />}
                        onClick={() => setUploadDialog({ open: true, servicio })}
                      >
                        Subir PDF
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Dialog para subir PDF */}
      <Dialog
        open={uploadDialog.open}
        onClose={() => {
          setUploadDialog({ open: false, servicio: null });
          setUploadedFile(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {uploadDialog.servicio?.pdfUrl ? 'Reemplazar' : 'Subir'} PDF - {uploadDialog.servicio && getServicioDisplayName(uploadDialog.servicio.tipo)}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="pdf-upload"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setUploadedFile(e.target.files[0]);
                }
              }}
            />
            <label htmlFor="pdf-upload">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                startIcon={<UploadFileIcon />}
              >
                Seleccionar PDF
              </Button>
            </label>
            {uploadedFile && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Archivo seleccionado: {uploadedFile.name}
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setUploadDialog({ open: false, servicio: null });
              setUploadedFile(null);
            }}
            disabled={uploading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleUploadPdf}
            variant="contained"
            disabled={!uploadedFile || uploading}
          >
            {uploading ? <CircularProgress size={24} /> : 'Subir'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default AdminServices;
