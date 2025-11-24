import { PrismaClient, Trabajo } from '@prisma/client';
import { CreateTrabajoRequest, UpdateTrabajoRequest } from '../types';

export class TrabajosService {
  constructor(private prisma: PrismaClient) {}

  async getAllTrabajos(): Promise<Trabajo[]> {
    return this.prisma.trabajo.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        imagenes: {
          orderBy: { orden: 'asc' },
        },
      },
    });
  }

  async getTrabajoById(id: number): Promise<Trabajo | null> {
    return this.prisma.trabajo.findUnique({
      where: { id },
      include: {
        imagenes: {
          orderBy: { orden: 'asc' },
        },
      },
    });
  }

  async createTrabajo(data: CreateTrabajoRequest): Promise<Trabajo> {
    const { imagenes, ...rest } = data;

    return this.prisma.trabajo.create({
      data: {
        ...rest,
        imagenes: imagenes && imagenes.length > 0
          ? {
              create: imagenes.map((img, index) => ({
                url: img.url,
                orden: img.orden ?? index,
              })),
            }
          : undefined,
      },
      include: {
        imagenes: {
          orderBy: { orden: 'asc' },
        },
      },
    });
  }

  async updateTrabajo(id: number, data: UpdateTrabajoRequest): Promise<Trabajo | null> {
    const { imagenes, ...rest } = data;

    try {
      return await this.prisma.$transaction(async (tx) => {
        // Actualizar campos básicos
        const updatedTrabajo = await tx.trabajo.update({
          where: { id },
          data: rest,
        });

        // Si vienen imágenes, sincronizar tabla hija
        if (imagenes) {
          // Borrar todas las imágenes actuales y recrearlas
          await tx.trabajoImagen.deleteMany({
            where: { trabajoId: id },
          });

          if (imagenes.length > 0) {
            await tx.trabajoImagen.createMany({
              data: imagenes.map((img, index) => ({
                trabajoId: id,
                url: img.url,
                orden: img.orden ?? index,
              })),
            });
          }
        }

        return tx.trabajo.findUnique({
          where: { id },
          include: {
            imagenes: {
              orderBy: { orden: 'asc' },
            },
          },
        }) as Promise<Trabajo | null>;
      });
    } catch (error) {
      return null;
    }
  }

  async deleteTrabajo(id: number): Promise<boolean> {
    try {
      await this.prisma.trabajo.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }
}


