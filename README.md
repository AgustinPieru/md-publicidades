# MD Publicidades - Sitio Web Institucional

Sitio web institucional para MD Publicidades, empresa dedicada al marketing integral, vía pública, marketing deportivo, pantallas LED y eventos.

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

```bash
# Desarrollo
npm run dev                 # Frontend + Backend
npm run dev:frontend        # Solo frontend
npm run dev:backend         # Solo backend
npm run dev:infra           # Solo infraestructura
npm run dev:all             # Todo

# Build
npm run build               # Build completo
npm run build:frontend      # Build frontend
npm run build:backend       # Build backend

# Linting
npm run lint                # Lint completo
npm run lint:fix            # Fix linting issues
npm run format              # Format código

# Base de datos
npm run db:generate --workspace=backend    # Generar cliente Prisma
npm run db:push --workspace=backend       # Push schema a DB
npm run db:migrate --workspace=backend    # Ejecutar migraciones
npm run db:studio --workspace=backend     # Abrir Prisma Studio
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

## ☁️ Infraestructura AWS

### Componentes
- **S3**: Hosting estático del frontend
- **CloudFront**: CDN para el frontend
- **ECS Fargate**: Backend en contenedor
- **RDS PostgreSQL**: Base de datos
- **Application Load Balancer**: Balanceador de carga

### Deploy
```bash
# Deploy infraestructura
npm run deploy --workspace=infra

# Destroy infraestructura
npm run destroy --workspace=infra
```

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

## 🚀 Próximos Pasos

1. ✅ Estructura del monorepo
2. ⏳ Implementar CRUD de novedades
3. ⏳ Implementar autenticación admin
4. ⏳ Diseño visual y UX
5. ⏳ Deploy a AWS
6. ⏳ CI/CD con GitHub Actions
