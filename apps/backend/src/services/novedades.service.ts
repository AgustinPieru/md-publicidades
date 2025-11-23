import { PrismaClient, Novedad } from '@prisma/client';
import { CreateNovedadRequest, UpdateNovedadRequest } from '../types';

export class NovedadesService {
  constructor(private prisma: PrismaClient) {}

  async getAllNovedades(): Promise<Novedad[]> {
    return this.prisma.novedad.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getNovedadesRSE(limit: number = 4): Promise<Novedad[]> {
    return this.prisma.novedad.findMany({
      where: { esRSE: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getNovedadById(id: number): Promise<Novedad | null> {
    return this.prisma.novedad.findUnique({
      where: { id },
    });
  }

  async createNovedad(data: CreateNovedadRequest): Promise<Novedad> {
    return this.prisma.novedad.create({
      data,
    });
  }

  async updateNovedad(id: number, data: UpdateNovedadRequest): Promise<Novedad | null> {
    try {
      return await this.prisma.novedad.update({
        where: { id },
        data,
      });
    } catch (error) {
      return null;
    }
  }

  async deleteNovedad(id: number): Promise<boolean> {
    try {
      await this.prisma.novedad.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}


