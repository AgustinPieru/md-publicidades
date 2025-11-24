export interface Novedad {
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  esRSE: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trabajo {
  id: number;
  titulo: string;
  descripcion: string;
  imagenPrincipalUrl: string;
  createdAt: Date;
  updatedAt: Date;
  imagenes: TrabajoImagen[];
}

export interface TrabajoImagen {
  id: number;
  url: string;
  orden?: number | null;
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

export interface CreateTrabajoRequest {
  titulo: string;
  descripcion: string;
  imagenPrincipalUrl: string;
  imagenes?: {
    url: string;
    orden?: number | null;
  }[];
}

export interface UpdateTrabajoRequest {
  titulo?: string;
  descripcion?: string;
  imagenPrincipalUrl?: string;
  imagenes?: {
    id?: number;
    url: string;
    orden?: number | null;
  }[];
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

export interface AuthPayload {
  adminId: number;
  email: string;
}


