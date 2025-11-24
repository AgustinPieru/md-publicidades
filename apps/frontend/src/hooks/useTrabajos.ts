import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Trabajo, CreateTrabajoRequest, UpdateTrabajoRequest } from '../types';

export const useTrabajos = () => {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrabajos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getTrabajos();
      setTrabajos(data);
    } catch (err) {
      setError('Error al cargar los trabajos');
      console.error('Error fetching trabajos:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTrabajo = async (data: CreateTrabajoRequest): Promise<boolean> => {
    try {
      const newTrabajo = await apiService.createTrabajo(data);
      setTrabajos((prev) => [newTrabajo, ...prev]);
      return true;
    } catch (err) {
      setError('Error al crear el trabajo');
      console.error('Error creating trabajo:', err);
      return false;
    }
  };

  const updateTrabajo = async (id: number, data: UpdateTrabajoRequest): Promise<boolean> => {
    try {
      const updatedTrabajo = await apiService.updateTrabajo(id, data);
      setTrabajos((prev) =>
        prev.map((trabajo) => (trabajo.id === id ? updatedTrabajo : trabajo))
      );
      return true;
    } catch (err) {
      setError('Error al actualizar el trabajo');
      console.error('Error updating trabajo:', err);
      return false;
    }
  };

  const deleteTrabajo = async (id: number): Promise<boolean> => {
    try {
      await apiService.deleteTrabajo(id);
      setTrabajos((prev) => prev.filter((trabajo) => trabajo.id !== id));
      return true;
    } catch (err) {
      setError('Error al eliminar el trabajo');
      console.error('Error deleting trabajo:', err);
      return false;
    }
  };

  useEffect(() => {
    void fetchTrabajos();
  }, []);

  return {
    trabajos,
    loading,
    error,
    fetchTrabajos,
    createTrabajo,
    updateTrabajo,
    deleteTrabajo,
  };
}


