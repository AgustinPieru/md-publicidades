export interface Novedad {
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  esRSE: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNovedadRequest {
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  esRSE?: boolean;
}

export interface UpdateNovedadRequest {
  titulo?: string;
  descripcion?: string;
  imagenUrl?: string;
  esRSE?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: {
    id: number;
    email: string;
  };
}

export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}


