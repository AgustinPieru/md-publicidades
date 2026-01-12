# MD Publicidades - Sitio Web Institucional

Sitio web institucional para MD Publicidades, empresa dedicada al marketing integral, vía pública, marketing deportivo, pantallas LED y eventos.

## 📚 Documentación

- **[Guía de Despliegue a Producción](./DESPLIEGUE_PRODUCCION.md)** - Cómo desplegar cambios a Lightsail
- **[Guía Completa de Despliegue](./DEPLOYMENT_GUIDE.md)** - Configuración inicial e infraestructura
- **[Comandos Disponibles](./COMMANDS.md)** - Referencia de todos los comandos npm
- **[Feature: PDFs de Servicios](./FEATURE_PDFs_SERVICIOS.md)** - Documentación de la funcionalidad de PDFs

## 🏗️ Arquitectura

### Stack Tecnológico
- **Frontend**: React + Vite + TypeScript + Material UI
- **Backend**: Node.js + Express + TypeScript + Prisma + JWT
- **Base de Datos**: PostgreSQL
- **Infraestructura**: AWS (S3, CloudFront, ECS Fargate, RDS)

### Estructura del Monorepo
```
md-publicidades/
├── apps/
│   ├── frontend/          # React + Vite + Material UI
│   └── backend/           # Node.js + Express + Prisma
├── infra/                 # AWS CDK Infrastructure
├── docker-compose.yml     # Entorno local
└── package.json          # Yarn Workspaces
```

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js >= 18.0.0
- npm >= 8.0.0
- Docker & Docker Compose

### Instalación
```bash
# Instalar dependencias
npm install

# Levantar base de datos local
docker-compose up postgres -d

# Configurar variables de entorno del backend
cp apps/backend/env.example apps/backend/.env

# Generar cliente Prisma
npm run db:generate --workspace=backend

# Ejecutar migraciones
npm run db:push --workspace=backend
```

### Scripts de Desarrollo
```bash
# Desarrollo completo (frontend + backend)
npm run dev

# Solo frontend
npm run dev:frontend

# Solo backend
npm run dev:backend

# Infraestructura
npm run dev:infra

# Todo (frontend + backend + infra)
npm run dev:all
```

### URLs de Desarrollo
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📁 Estructura de Páginas

### Páginas Públicas
- `/` - Home
- `/sobre-nosotros` - Sobre Nosotros / Trayectoria
- `/servicios` - Servicios
- `/novedades` - Lista de Novedades
- `/novedades/:id` - Detalle de Novedad
- `/contacto` - Contacto (WhatsApp)

### Panel Admin (Privado)
- `/admin/login` - Login Admin
- `/admin/novedades` - CRUD Novedades
- `/admin/novedades/nueva` - Crear Novedad
- `/admin/novedades/editar/:id` - Editar Novedad

## 🛠️ Scripts Disponibles

### Desarrollo
```bash
npm run dev                 # Frontend + Backend
npm run dev:frontend        # Solo frontend
npm run dev:backend         # Solo backend
npm run dev:infra           # Solo infraestructura
npm run dev:all             # Todo
```

### Build
```bash
npm run build               # Build completo
npm run build:frontend      # Build frontend
npm run build:backend       # Build backend
```

### Calidad de Código
```bash
npm run lint                # Lint completo
npm run lint:fix            # Fix linting issues
npm run format              # Format código
npm run type-check          # Verificar tipos TypeScript
```

### Despliegue
```bash
# Despliegue completo
npm run deploy:complete [dominio]     # Despliegue desde cero
npm run deploy:existing               # Desplegar en instancia existente

# Despliegue rápido
npm run deploy:frontend-only          # Solo frontend
npm run deploy:backend-only           # Solo backend
npm run deploy:all                    # Frontend + Backend
npm run deploy:status                 # Ver estado

# Despliegue específico
npm run deploy:frontend               # Frontend a CloudFront
```

### Base de Datos
```bash
# Desarrollo local
npm run db:generate --workspace=backend    # Generar cliente Prisma
npm run db:push --workspace=backend       # Push schema a DB
npm run db:migrate --workspace=backend    # Ejecutar migraciones
npm run db:studio --workspace=backend     # Abrir Prisma Studio

# Producción
npm run db:backup [archivo]               # Crear backup
npm run db:restore [archivo]              # Restaurar backup
npm run db:migrate                        # Ejecutar migraciones
npm run db:create-admin                   # Crear usuario admin
npm run db:status                         # Ver estado de la BD
```

### Usuarios Admin
```bash
npm run admin:create [email] [password]  # Crear usuario
npm run admin:list                        # Listar usuarios
npm run admin:delete [email]              # Eliminar usuario
```

### Configuración
```bash
npm run ssl:setup [dominio]               # Configurar SSL
npm run monitoring:setup                  # Configurar monitoreo
```

### Ayuda
```bash
npm run help:deploy                       # Ayuda de despliegue
npm run help:db                           # Ayuda de base de datos
npm run help:admin                        # Ayuda de usuarios admin
npm run help:all                          # Toda la ayuda
```

## 🐳 Docker

### Entorno Local Completo
```bash
# Levantar todo el stack
docker-compose up

# Solo base de datos
docker-compose up postgres -d

# Rebuild backend
docker-compose up --build backend
```

## ☁️ Infraestructura

### AWS (Opción 1 - Completa)
- **S3**: Hosting estático del frontend
- **CloudFront**: CDN para el frontend
- **ECS Fargate**: Backend en contenedor
- **RDS PostgreSQL**: Base de datos
- **Application Load Balancer**: Balanceador de carga

```bash
# Deploy infraestructura
npm run deploy --workspace=infra

# Destroy infraestructura
npm run destroy --workspace=infra
```

### AWS Lightsail (Opción 2 - Económica)
- **Instancia Lightsail**: Todo en una sola instancia
- **Nginx**: Proxy reverso y servidor web
- **PostgreSQL**: Base de datos local
- **PM2**: Gestión de procesos Node.js

```bash
# Despliegue completo en Lightsail
npm run deploy:complete

# Desplegar en instancia existente
npm run deploy:existing

# Ver estado de la aplicación
npm run deploy:status
```

**Costo**: $10/mes (vs $50-100/mes con AWS completa)

## 🔧 Configuración

### Variables de Entorno Backend
```env
DATABASE_URL="postgresql://username:password@localhost:5432/md_publicidades"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="development"
```

## 📝 Modelo de Datos

### Novedad
```prisma
model Novedad {
  id          Int      @id @default(autoincrement())
  titulo      String
  descripcion String
  imagenUrl   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Admin
```prisma
model Admin {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 📚 Documentación

- **[Guía de Despliegue](DEPLOYMENT_GUIDE.md)** - Guía completa paso a paso
- **[Comandos Disponibles](COMMANDS.md)** - Lista completa de comandos
- **[Scripts de Gestión](scripts/README.md)** - Documentación de scripts

## 🚀 Próximos Pasos

1. ✅ Estructura del monorepo
2. ✅ Implementar CRUD de novedades
3. ✅ Implementar autenticación admin
4. ✅ Diseño visual y UX
5. ✅ Deploy a AWS Lightsail
6. ⏳ CI/CD con GitHub Actions
7. ⏳ Monitoreo y alertas
8. ⏳ Backup automático
