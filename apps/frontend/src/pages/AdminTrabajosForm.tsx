import {
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTrabajos } from '../hooks/useTrabajos';
import { apiService } from '../services/api';
import { CreateTrabajoRequest, UpdateTrabajoRequest, TrabajoImagen, Trabajo } from '../types';
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import PageContainer from '../components/PageContainer';
import SectionHeader from '../components/SectionHeader';

const AdminTrabajosForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { createTrabajo, updateTrabajo } = useTrabajos();

  const isEditing = Boolean(id);
  const [formData, setFormData] = useState<CreateTrabajoRequest>({
    titulo: '',
    descripcion: '',
    imagenPrincipalUrl: '',
    imagenes: [],
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [uploadingPrincipal, setUploadingPrincipal] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [principalPreviewUrl, setPrincipalPreviewUrl] = useState<string | null>(null);
  const [gallery, setGallery] = useState<TrabajoImagen[]>([]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    const loadTrabajoData = async () => {
      if (isEditing && id) {
        try {
          setLoadingData(true);
          const trabajo: Trabajo = await apiService.getTrabajoById(parseInt(id));
          setFormData({
            titulo: trabajo.titulo,
            descripcion: trabajo.descripcion,
            imagenPrincipalUrl: trabajo.imagenPrincipalUrl,
            imagenes: trabajo.imagenes?.map((img) => ({
              url: img.url,
              orden: img.orden ?? undefined,
              id: img.id,
            })),
          });
          setPrincipalPreviewUrl(trabajo.imagenPrincipalUrl);
          setGallery(trabajo.imagenes || []);
        } catch (err) {
          setError('Error al cargar los datos del trabajo');
          console.error('Error loading trabajo:', err);
        } finally {
          setLoadingData(false);
        }
      }
    };

    void loadTrabajoData();
  }, [isEditing, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrincipalSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploadingPrincipal(true);

    try {
      const result = await apiService.uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        imagenPrincipalUrl: result.imageUrl,
      }));
      setPrincipalPreviewUrl(result.imageUrl);
    } catch (err: any) {
      console.error('Upload principal error:', err);
      let errorMessage = 'Error al subir la imagen principal';
      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setUploadingPrincipal(false);
    }
  };

  const handleGallerySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setUploadingGallery(true);

    const uploaded: TrabajoImagen[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await apiService.uploadImage(file);
        uploaded.push({
          id: Date.now() + i,
          url: result.imageUrl,
          orden: gallery.length + i,
        });
      }

      const newGallery = [...gallery, ...uploaded];
      setGallery(newGallery);
      setFormData((prev) => ({
        ...prev,
        imagenes: newGallery.map((img, index) => ({
          id: img.id,
          url: img.url,
          orden: index,
        })),
      }));
    } catch (err: any) {
      console.error('Upload gallery error:', err);
      let errorMessage = 'Error al subir imágenes de la galería';
      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = (idToRemove: number) => {
    const filtered = gallery.filter((img) => img.id !== idToRemove);
    setGallery(filtered);
    setFormData((prev) => ({
      ...prev,
      imagenes: filtered.map((img, index) => ({
        id: img.id,
        url: img.url,
        orden: index,
      })),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.imagenPrincipalUrl || formData.imagenPrincipalUrl.trim() === '') {
        setError('Debes seleccionar y subir una imagen principal');
        setLoading(false);
        return;
      }

      let success = false;

      if (isEditing) {
        const updateData: UpdateTrabajoRequest = {
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          imagenPrincipalUrl: formData.imagenPrincipalUrl,
          imagenes: formData.imagenes,
        };
        success = await updateTrabajo(parseInt(id!), updateData);
      } else {
        success = await createTrabajo(formData);
      }

      if (success) {
        navigate('/admin/trabajos');
      } else {
        setError('Error al guardar el trabajo');
      }
    } catch (err) {
      setError('Error al guardar el trabajo');
      console.error('Form error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <PageContainer maxWidth="md" compact reservePx={110}>
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (loadingData) {
    return (
      <PageContainer maxWidth="md" compact reservePx={110}>
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="md" compact reservePx={110}>
      <Box>
        <SectionHeader
          title={isEditing ? 'Editar Trabajo' : 'Nuevo Trabajo'}
          align="left"
        />

        <Card>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Título"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa el título del trabajo"
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    Imagen Principal *
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    Selecciona la imagen principal que se mostrará en la tarjeta de listado.
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<ImageIcon />}
                      component="label"
                      disabled={uploadingPrincipal}
                      size="small"
                    >
                      Seleccionar imagen
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handlePrincipalSelect}
                      />
                    </Button>
                  </Box>

                  {principalPreviewUrl && (
                    <Box
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.default',
                        overflow: 'hidden',
                        mt: 1,
                      }}
                    >
                      <Box
                        component="img"
                        src={principalPreviewUrl}
                        alt="Vista previa principal"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    placeholder="Describe el trabajo realizado..."
                    helperText="Puedes usar saltos de línea para formatear el texto"
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    Álbum de fotos (opcional)
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    Sube varias imágenes para mostrar un álbum de este trabajo.
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<AddPhotoAlternateIcon />}
                      component="label"
                      disabled={uploadingGallery}
                      size="small"
                    >
                      Agregar imágenes
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        multiple
                        onChange={handleGallerySelect}
                      />
                    </Button>
                  </Box>

                  {gallery.length > 0 && (
                    <List dense>
                      {gallery.map((img, index) => (
                        <ListItem
                          key={img.id}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="eliminar"
                              onClick={() => handleRemoveGalleryImage(img.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <DragHandleIcon
                            fontSize="small"
                            sx={{ mr: 1, color: 'text.disabled' }}
                          />
                          <Box
                            component="img"
                            src={img.url}
                            alt={`Imagen ${index + 1}`}
                            sx={{
                              width: 40,
                              height: 40,
                              objectFit: 'cover',
                              borderRadius: 1,
                              mr: 1.5,
                            }}
                          />
                          <ListItemText
                            primary={`Imagen ${index + 1}`}
                            secondary={img.url}
                            primaryTypographyProps={{ noWrap: true }}
                            secondaryTypographyProps={{ noWrap: true }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/admin/trabajos')}
                      disabled={loading}
                      size="small"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                      disabled={loading || !formData.imagenPrincipalUrl}
                      size="small"
                    >
                      {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </PageContainer>
  );
};

export default AdminTrabajosForm;


