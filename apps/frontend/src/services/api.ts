import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Novedad, CreateNovedadRequest, UpdateNovedadRequest, LoginRequest, LoginResponse } from '../types';

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

  // Upload endpoints
  async uploadImage(file: File): Promise<{ imageUrl: string; filename: string }> {
    const formData = new FormData();
    formData.append('image', file);
    
    // Forzamos multipart para evitar el default 'application/json' del instance
    const response = await this.api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const { imageUrl, filename } = response.data as { imageUrl: string; filename: string };
    return { imageUrl: this.toAbsoluteUrl(imageUrl), filename };
  }

  async deleteImage(filename: string): Promise<void> {
    await this.api.delete(`/upload/image/${filename}`);
  }
}

export const apiService = new ApiService();
