import { 
  Typography, 
  Container, 
  Box, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Alert,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNovedades } from '../hooks/useNovedades';
import { apiService } from '../services/api';
import { CreateNovedadRequest, UpdateNovedadRequest, Novedad } from '../types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminNewsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { createNovedad, updateNovedad } = useNovedades();
  
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState<CreateNovedadRequest>({
    titulo: '',
    descripcion: '',
    imagenUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔍 AdminNewsForm - authLoading:', authLoading, 'isAuthenticated:', isAuthenticated);
    if (!authLoading && !isAuthenticated) {
      console.log('❌ AdminNewsForm - Redirigiendo a login');
      navigate('/admin/login');
    } else if (!authLoading && isAuthenticated) {
      console.log('✅ AdminNewsForm - Usuario autenticado, mostrando formulario');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Cargar datos de la novedad si estamos editando
  useEffect(() => {
    const loadNovedadData = async () => {
      if (isEditing && id) {
        try {
          setLoadingData(true);
          const novedad = await apiService.getNovedadById(parseInt(id));
          setFormData({
            titulo: novedad.titulo,
            descripcion: novedad.descripcion,
            imagenUrl: novedad.imagenUrl,
          });
        } catch (err) {
          setError('Error al cargar los datos de la novedad');
          console.error('Error loading novedad:', err);
        } finally {
          setLoadingData(false);
        }
      }
    };

    loadNovedadData();
  }, [isEditing, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      // Subir automáticamente al seleccionar
      void uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    setUploadingImage(true);
    setError(null);

    try {
      const result = await apiService.uploadImage(file);
      setFormData(prev => ({
        ...prev,
        imagenUrl: `http://localhost:3001${result.imageUrl}`,
      }));
      setUploadedFilename(result.filename);
      setSelectedFile(null);
    } catch (err) {
      setError('Error al subir la imagen');
      console.error('Upload error:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile);
    }
  };

  const handleRemoveImage = async () => {
    try {
      if (uploadedFilename) {
        await apiService.deleteImage(uploadedFilename);
      }
    } catch (e) {
      console.error('Error deleting uploaded image:', e);
    } finally {
      setFormData(prev => ({
        ...prev,
        imagenUrl: '',
      }));
      setSelectedFile(null);
      setUploadedFilename(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('📝 AdminNewsForm - formData:', formData);
      
      // Validar que haya una imagen (carga local obligatoria)
      if (!formData.imagenUrl || formData.imagenUrl.trim() === '') {
        setError('Debes seleccionar y subir una imagen');
        setLoading(false);
        return;
      }
      
      let success = false;
      
      if (isEditing) {
        const updateData: UpdateNovedadRequest = {
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          imagenUrl: formData.imagenUrl,
        };
        console.log('📝 AdminNewsForm - updateData:', updateData);
        success = await updateNovedad(parseInt(id!), updateData);
      } else {
        console.log('📝 AdminNewsForm - createData:', formData);
        success = await createNovedad(formData);
      }

      if (success) {
        navigate('/admin/novedades');
      } else {
        setError('Error al guardar la novedad');
      }
    } catch (err) {
      setError('Error al guardar la novedad');
      console.error('Form error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (loadingData) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin/novedades')}
            sx={{ mr: 2 }}
          >
            Volver
          </Button>
          <Typography variant="h3" component="h1">
            {isEditing ? 'Editar Novedad' : 'Nueva Novedad'}
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Título"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa el título de la novedad"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Imagen de la Novedad *
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Selecciona un archivo de imagen desde tu computadora. La imagen es obligatoria.
                  </Typography>
                  
                  {/* Opción 1: Cargar archivo */}
                  <Box sx={{ mb: 2 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="file-input">Seleccionar archivo</InputLabel>
                      <OutlinedInput
                        id="file-input"
                        type="file"
                        inputProps={{ accept: 'image/*' }}
                        onChange={handleFileSelect}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleUpload}
                              disabled={!selectedFile || uploadingImage}
                              edge="end"
                            >
                              {uploadingImage ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    {selectedFile && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Archivo seleccionado: {selectedFile.name}
                      </Typography>
                    )}
                  </Box>

                   {/* Botón para remover imagen */}
                   {formData.imagenUrl && (
                     <Button
                       variant="outlined"
                       color="error"
                       startIcon={<DeleteIcon />}
                       onClick={handleRemoveImage}
                       size="small"
                     >
                       Remover imagen
                     </Button>
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
                    rows={6}
                    placeholder="Describe el contenido de la novedad..."
                    helperText="Puedes usar saltos de línea para formatear el texto"
                  />
                </Grid>

                {formData.imagenUrl && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Vista previa de la imagen:
                    </Typography>
                    <Box
                      component="img"
                      src={formData.imagenUrl}
                      alt="Vista previa"
                      sx={{
                        maxWidth: '100%',
                        maxHeight: 300,
                        objectFit: 'cover',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/admin/novedades')}
                      disabled={loading}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                      disabled={loading || !formData.imagenUrl}
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
    </Container>
  );
};

export default AdminNewsForm;
