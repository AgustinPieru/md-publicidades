import { useState, useEffect } from 'react';
import { Servicio } from '../types';
import { apiService } from '../services/api';

export const useServicios = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    loadServicios();
  }, []);

  const getServicioByTipo = (tipo: string): Servicio | undefined => {
    return servicios.find(s => s.tipo === tipo);
  };

  return {
    servicios,
    loading,
    error,
    getServicioByTipo,
    refetch: loadServicios,
  };
};
