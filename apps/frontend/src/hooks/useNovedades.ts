import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Novedad, CreateNovedadRequest, UpdateNovedadRequest } from '../types';

export const useNovedades = () => {
  const [novedades, setNovedades] = useState<Novedad[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNovedades = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getNovedades();
      setNovedades(data);
    } catch (err) {
      setError('Error al cargar las novedades');
      console.error('Error fetching novedades:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNovedad = async (data: CreateNovedadRequest): Promise<boolean> => {
    try {
      console.log('📝 useNovedades - Datos a enviar:', data);
      const newNovedad = await apiService.createNovedad(data);
      setNovedades(prev => [newNovedad, ...prev]);
      return true;
    } catch (err) {
      setError('Error al crear la novedad');
      console.error('Error creating novedad:', err);
      return false;
    }
  };

  const updateNovedad = async (id: number, data: UpdateNovedadRequest): Promise<boolean> => {
    try {
      const updatedNovedad = await apiService.updateNovedad(id, data);
      setNovedades(prev => 
        prev.map(novedad => 
          novedad.id === id ? updatedNovedad : novedad
        )
      );
      return true;
    } catch (err) {
      setError('Error al actualizar la novedad');
      console.error('Error updating novedad:', err);
      return false;
    }
  };

  const deleteNovedad = async (id: number): Promise<boolean> => {
    try {
      await apiService.deleteNovedad(id);
      setNovedades(prev => prev.filter(novedad => novedad.id !== id));
      return true;
    } catch (err) {
      setError('Error al eliminar la novedad');
      console.error('Error deleting novedad:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchNovedades();
  }, []);

  return {
    novedades,
    loading,
    error,
    fetchNovedades,
    createNovedad,
    updateNovedad,
    deleteNovedad,
  };
};


