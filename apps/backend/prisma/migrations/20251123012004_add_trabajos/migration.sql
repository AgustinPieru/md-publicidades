-- CreateTable
CREATE TABLE "Trabajo" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagenPrincipalUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trabajo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrabajoImagen" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "orden" INTEGER,
    "trabajoId" INTEGER NOT NULL,

    CONSTRAINT "TrabajoImagen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrabajoImagen" ADD CONSTRAINT "TrabajoImagen_trabajoId_fkey" FOREIGN KEY ("trabajoId") REFERENCES "Trabajo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
