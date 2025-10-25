import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Novedad, CreateNovedadRequest, UpdateNovedadRequest, LoginRequest, LoginResponse } from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3001/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  // Novedades endpoints
  async getNovedades(): Promise<Novedad[]> {
    const response: AxiosResponse<Novedad[]> = await this.api.get('/novedades');
    return response.data;
  }

  async getNovedadById(id: number): Promise<Novedad> {
    const response: AxiosResponse<Novedad> = await this.api.get(`/novedades/${id}`);
    return response.data;
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
    
    const response = await this.api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteImage(filename: string): Promise<void> {
    await this.api.delete(`/upload/image/${filename}`);
  }
}

export const apiService = new ApiService();
