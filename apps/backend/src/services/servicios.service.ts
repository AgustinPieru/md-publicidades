import { PrismaClient, Servicio } from '@prisma/client';

export interface UpdateServicioRequest {
  nombre?: string;
  pdfUrl?: string;
  descripcion?: string;
}

export class ServiciosService {
  constructor(private prisma: PrismaClient) {}

  async getAllServicios(): Promise<Servicio[]> {
    return this.prisma.servicio.findMany({
      orderBy: { tipo: 'asc' },
    });
  }

  async getServicioByTipo(tipo: string): Promise<Servicio | null> {
    return this.prisma.servicio.findUnique({
      where: { tipo },
    });
  }

  async updateServicio(tipo: string, data: UpdateServicioRequest): Promise<Servicio> {
    // Intentar actualizar si existe, sino crear
    return this.prisma.servicio.upsert({
      where: { tipo },
      update: data,
      create: {
        tipo,
        nombre: data.nombre || tipo,
        pdfUrl: data.pdfUrl,
        descripcion: data.descripcion,
      },
    });
  }

  async deletePdf(tipo: string): Promise<Servicio> {
    return this.prisma.servicio.update({
      where: { tipo },
      data: { pdfUrl: null },
    });
  }
}
