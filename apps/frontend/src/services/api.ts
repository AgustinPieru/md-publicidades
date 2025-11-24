import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  Novedad,
  CreateNovedadRequest,
  UpdateNovedadRequest,
  LoginRequest,
  LoginResponse,
  Trabajo,
  CreateTrabajoRequest,
  UpdateTrabajoRequest,
} from '../types';

class ApiService {
  private api: AxiosInstance;
  private filesOrigin: string;

  constructor() {
    // Soporte para despliegue en AWS (window.API_BASE_URL) y entorno local
    const runtimeBaseUrl = (window as any).API_BASE_URL as string | undefined;
    const baseURL =
      runtimeBaseUrl ||
      import.meta.env.VITE_API_URL ||
      'http://localhost:3001/api';

    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Calcular el origin para archivos (sirve para construir URLs absolutas
    // como http://host:puerto/uploads/archivo.ext)
    // Si baseURL es relativo (/api), usar window.location.origin directamente
    if (baseURL.startsWith('/')) {
      // URL relativa, usar el origin actual
      this.filesOrigin = window.location.origin;
    } else {
      // URL absoluta, extraer el origin
      try {
        const parsed = new URL(baseURL);
        this.filesOrigin = parsed.origin;
      } catch {
        this.filesOrigin = window.location.origin;
      }
    }

    // Interceptor para agregar token a las requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // No sobrescribir Content-Type si es FormData (multer lo necesita)
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      }
      return config;
    });

    // Interceptor para manejar errores de respuesta
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }
    );
  }

  private toAbsoluteUrl(possibleRelativeUrl: string): string {
    if (!possibleRelativeUrl) return possibleRelativeUrl;
    if (/^https?:\/\//i.test(possibleRelativeUrl)) return possibleRelativeUrl;
    if (possibleRelativeUrl.startsWith('/')) {
      return `${this.filesOrigin}${possibleRelativeUrl}`;
    }
    return `${this.filesOrigin}/${possibleRelativeUrl}`;
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  // Novedades endpoints
  async getNovedades(): Promise<Novedad[]> {
    const response: AxiosResponse<Novedad[]> = await this.api.get('/novedades');
    return response.data.map((n) => ({
      ...n,
      imagenUrl: this.toAbsoluteUrl(n.imagenUrl),
    }));
  }

  async getNovedadesRSE(limit: number = 4): Promise<Novedad[]> {
    const response: AxiosResponse<Novedad[]> = await this.api.get(`/novedades/rse?limit=${limit}`);
    return response.data.map((n) => ({
      ...n,
      imagenUrl: this.toAbsoluteUrl(n.imagenUrl),
    }));
  }

  async getNovedadById(id: number): Promise<Novedad> {
    const response: AxiosResponse<Novedad> = await this.api.get(`/novedades/${id}`);
    return {
      ...response.data,
      imagenUrl: this.toAbsoluteUrl(response.data.imagenUrl),
    };
  }

  async createNovedad(data: CreateNovedadRequest): Promise<Novedad> {
    const response: AxiosResponse<Novedad> = await this.api.post('/novedades', data);
    return response.data;
  }

  async updateNovedad(id: number, data: UpdateNovedadRequest): Promise<Novedad> {
    const response: AxiosResponse<Novedad> = await this.api.put(`/novedades/${id}`, data);
    return response.data;
  }

  async deleteNovedad(id: number): Promise<void> {
    await this.api.delete(`/novedades/${id}`);
  }

  // Trabajos endpoints
  async getTrabajos(): Promise<Trabajo[]> {
    const response: AxiosResponse<Trabajo[]> = await this.api.get('/trabajos');
    return response.data.map((t) => ({
      ...t,
      imagenPrincipalUrl: this.toAbsoluteUrl(t.imagenPrincipalUrl),
      imagenes: t.imagenes?.map((img) => ({
        ...img,
        url: this.toAbsoluteUrl(img.url),
      })) ?? [],
    }));
  }

  async getTrabajoById(id: number): Promise<Trabajo> {
    const response: AxiosResponse<Trabajo> = await this.api.get(`/trabajos/${id}`);
    return {
      ...response.data,
      imagenPrincipalUrl: this.toAbsoluteUrl(response.data.imagenPrincipalUrl),
      imagenes:
        response.data.imagenes?.map((img) => ({
          ...img,
          url: this.toAbsoluteUrl(img.url),
        })) ?? [],
    };
  }

  async createTrabajo(data: CreateTrabajoRequest): Promise<Trabajo> {
    const response: AxiosResponse<Trabajo> = await this.api.post('/trabajos', data);
    return response.data;
  }

  async updateTrabajo(id: number, data: UpdateTrabajoRequest): Promise<Trabajo> {
    const response: AxiosResponse<Trabajo> = await this.api.put(`/trabajos/${id}`, data);
    return response.data;
  }

  async deleteTrabajo(id: number): Promise<void> {
    await this.api.delete(`/trabajos/${id}`);
  }

  // Upload endpoints
  async uploadImage(file: File): Promise<{ imageUrl: string; filename: string }> {
    const formData = new FormData();
    formData.append('image', file);
    
    // Verificar que el token existe antes de hacer la petición
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ No hay token en localStorage');
      throw new Error('No estás autenticado. Por favor, inicia sesión nuevamente');
    }
    console.log('✅ Token encontrado en localStorage:', token.substring(0, 20) + '...');
    
    try {
      // No especificamos Content-Type, axios lo detectará automáticamente para FormData
      // y establecerá el boundary correcto
      const response = await this.api.post('/upload/image', formData);
      const { imageUrl, filename } = response.data as { imageUrl: string; filename: string };
      return { imageUrl: this.toAbsoluteUrl(imageUrl), filename };
    } catch (error: any) {
      console.error('Error en uploadImage:', error);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      // Re-lanzar el error para que el componente pueda manejarlo
      throw error;
    }
  }

  async deleteImage(filename: string): Promise<void> {
    await this.api.delete(`/upload/image/${filename}`);
  }
}

export const apiService = new ApiService();
