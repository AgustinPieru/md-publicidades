# Sistema de Gestión de PDFs para Servicios

## Descripción

Se ha implementado un sistema completo para cargar, gestionar y descargar PDFs informativos de los servicios ofrecidos por MD Publicidades.

## Cambios Realizados

### Backend

#### 1. Base de Datos
- **Modelo `Servicio`** en Prisma Schema con los siguientes campos:
  - `id`: ID único
  - `tipo`: Tipo de servicio (único)
  - `nombre`: Nombre del servicio
  - `pdfUrl`: URL del PDF (opcional)
  - `descripcion`: Descripción (opcional)
  - `createdAt` y `updatedAt`: Timestamps

#### 2. API Endpoints
- **GET `/api/servicios`**: Obtener todos los servicios
- **GET `/api/servicios/:tipo`**: Obtener un servicio específico
- **PUT `/api/servicios/:tipo`**: Actualizar un servicio (requiere auth)
- **DELETE `/api/servicios/:tipo/pdf`**: Eliminar el PDF de un servicio (requiere auth)
- **POST `/api/upload/pdf`**: Subir un archivo PDF (requiere auth)
- **DELETE `/api/upload/pdf/:filename`**: Eliminar un archivo PDF (requiere auth)

#### 3. Servicios Implementados
- `ServiciosService`: Gestión de servicios en la base de datos
- Controladores para manejo de requests
- Rutas protegidas con autenticación

#### 4. Upload de PDFs
- Se extendió el sistema de uploads para soportar PDFs
- Límite de tamaño: 10MB
- Validación de tipo de archivo (solo PDFs)

### Frontend

#### 1. Página de Administración
- **Ruta**: `/admin/servicios`
- Permite subir, reemplazar y eliminar PDFs para cada servicio
- Navegación integrada con Novedades y Campañas
- Lista de todos los servicios con estado del PDF

#### 2. Página de Servicios (Cliente)
- **OOH / Vía Pública**: Botón de descarga de PDF en el modal de cada servicio (Monocolumnas, Pantallas LED, Ruteros, Medianeras, Grandes Formatos, Séxtuples)
- **Marketing Deportivo**: Botón de descarga en la card principal
- **Eventos**: Botón de descarga en la card principal
- **Rental**: Botón de descarga en la card principal

#### 3. Hook Personalizado
- `useServicios`: Hook para gestionar el estado de los servicios

#### 4. API Service
- Métodos para interactuar con los endpoints de servicios
- Gestión de URLs absolutas para PDFs

## Servicios Disponibles

Los siguientes servicios pueden tener PDFs asociados:

1. **OOH / Vía Pública**
   - Monocolumnas
   - Pantallas LED
   - Ruteros
   - Medianeras
   - Grandes Formatos / Hipervallas
   - Séxtuples

2. **Marketing Deportivo**
3. **Eventos**
4. **Rental**

## Uso

### Subir un PDF (Administrador)

1. Iniciar sesión en `/admin/login`
2. Navegar a la pestaña "Servicios"
3. Seleccionar el servicio deseado
4. Hacer clic en "Subir PDF" o "Reemplazar"
5. Seleccionar el archivo PDF
6. Confirmar la subida

### Descargar un PDF (Cliente)

#### OOH / Vía Pública
1. Ir a `/servicios`
2. Hacer clic en el servicio deseado (ej: Monocolumnas)
3. En el modal, hacer clic en "Descargar información en PDF"

#### Marketing Deportivo / Eventos / Rental
1. Ir a `/servicios`
2. Desplazarse a la sección correspondiente
3. Hacer clic en "Descargar información en PDF"

## Inicialización de Datos

Para inicializar los registros de servicios en la base de datos:

```bash
cd apps/backend
npx ts-node ../scripts/seed-servicios.ts
```

## Migración de Base de Datos

```bash
cd apps/backend
npx prisma migrate deploy
npx prisma generate
```

## Archivos Creados/Modificados

### Backend
- `apps/backend/src/services/servicios.service.ts` (nuevo)
- `apps/backend/src/controllers/servicios.controller.ts` (nuevo)
- `apps/backend/src/routes/servicios.routes.ts` (nuevo)
- `apps/backend/src/controllers/upload.controller.ts` (modificado)
- `apps/backend/src/routes/upload.routes.ts` (modificado)
- `apps/backend/src/index.ts` (modificado)
- `apps/backend/prisma/migrations/20260110204735_add_servicios_model/migration.sql` (nuevo)

### Frontend
- `apps/frontend/src/pages/AdminServices.tsx` (nuevo)
- `apps/frontend/src/pages/Services.tsx` (modificado)
- `apps/frontend/src/pages/AdminNews.tsx` (modificado)
- `apps/frontend/src/pages/AdminTrabajos.tsx` (modificado)
- `apps/frontend/src/hooks/useServicios.ts` (nuevo)
- `apps/frontend/src/services/api.ts` (modificado)
- `apps/frontend/src/types/index.ts` (modificado)
- `apps/frontend/src/App.tsx` (modificado)

### Scripts
- `scripts/seed-servicios.ts` (nuevo)

## Buenas Prácticas Implementadas

1. **Separación de Responsabilidades**: Servicios, controladores y rutas separados
2. **Validación de Datos**: Validación en backend con express-validator
3. **Autenticación**: Todos los endpoints de gestión requieren autenticación
4. **Tipos TypeScript**: Tipos completos para frontend y backend
5. **Gestión de Errores**: Manejo apropiado de errores en frontend y backend
6. **UX**: Feedback visual al usuario (loading, success, error)
7. **Reutilización**: Hook personalizado para gestión de servicios
8. **Almacenamiento**: PDFs almacenados en el mismo sistema que las imágenes

## Notas Técnicas

- Los PDFs se almacenan en `apps/backend/uploads/` con un prefijo `pdf-` y timestamp único
- Las URLs de PDFs se sirven desde `/uploads/:filename`
- El límite de tamaño para PDFs es de 10MB
- Solo se permiten archivos con mimetype `application/pdf`
- Los servicios se identifican por su campo `tipo` (único)
