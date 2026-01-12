# 🚀 Guía de Despliegue a Producción

## Resumen Rápido

Para desplegar cambios a Lightsail:

```bash
# Desplegar todo (frontend + backend)
npm run deploy:all

# O desplegar individualmente
npm run deploy:frontend-only  # Solo frontend
npm run deploy:backend-only   # Solo backend
```

## ⚠️ Importante: Configuración del .env en Producción

El archivo `.env` **NO se incluye** en los despliegues automáticos. Esto es intencional para proteger las credenciales de producción.

### Primera vez: Configurar .env en el servidor

Si es la primera vez que despliegas o necesitas actualizar las credenciales:

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@107.21.186.16

cd ~/md-publicidades-backend

# Crear/editar el archivo .env
nano .env
```

Contenido del `.env` de producción:

```env
DATABASE_URL="postgresql://md_user:MdPublicidades2024!@localhost:5432/md_publicidades?schema=public"
JWT_SECRET="tu-jwt-secret-super-seguro-2024"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="production"
CORS_ORIGIN="http://localhost"
```

**Guardar**: `Ctrl + O`, `Enter`, `Ctrl + X`

## 📋 Checklist de Despliegue

### Antes de desplegar:

- [ ] Probar cambios localmente con `npm run dev`
- [ ] Verificar que no hay errores de lint
- [ ] Hacer commit de los cambios

### Durante el despliegue:

```bash
# 1. Desplegar cambios
npm run deploy:all

# 2. Verificar estado
npm run deploy:status
```

### Después del despliegue:

- [ ] Verificar que el backend responde: https://www.mdpublicidades.com.ar/api/novedades
- [ ] Verificar que el frontend carga correctamente
- [ ] Probar funcionalidades críticas (login, subir archivos, etc.)

## 🗄️ Cambios en Base de Datos

Si hay cambios en el esquema de Prisma (`schema.prisma`):

### Opción 1: Usar db push (Desarrollo rápido)

El script de despliegue ya ejecuta `npx prisma db push` automáticamente.

### Opción 2: Usar Migraciones (Recomendado para producción)

```bash
# En local, crear la migración
cd apps/backend
npx prisma migrate dev --name descripcion_del_cambio

# Desplegar el backend
npm run deploy:backend-only

# En el servidor, aplicar la migración
ssh -i ~/.ssh/id_ed25519 bitnami@107.21.186.16
cd ~/md-publicidades-backend
npx prisma migrate deploy
```

## 🌱 Inicializar Datos (Seeds)

### Crear servicios iniciales:

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@107.21.186.16

cd ~/md-publicidades-backend

# Ejecutar el seed de servicios
node seed-servicios-prod.js
```

### Crear usuario administrador:

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@107.21.186.16

cd ~/md-publicidades-backend

# Crear script para crear admin
cat > create-admin-prod.js << 'EOF'
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  const email = 'admin@mdpublicidades.com';
  const password = 'TU_CONTRASEÑA_AQUI'; // ⚠️ Cambiar por una contraseña segura
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    
    console.log('✅ Admin creado:', { id: admin.id, email: admin.email });
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
EOF

# Ejecutar
node create-admin-prod.js
```

## 🔍 Diagnóstico de Problemas

### Ver logs del backend:

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@107.21.186.16
pm2 logs md-publicidades-backend --lines 50
```

### Ver estado de servicios:

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@107.21.186.16
pm2 status
sudo systemctl status apache2  # o nginx según tu configuración
```

### Verificar base de datos:

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@107.21.186.16
PGPASSWORD="MdPublicidades2024!" psql -h localhost -U md_user -d md_publicidades

# Dentro de psql:
\dt                                           # Ver tablas
SELECT * FROM "Servicio";                     # Ver servicios
SELECT email FROM "Admin";                    # Ver admins
\q                                            # Salir
```

### Reiniciar servicios:

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@107.21.186.16

# Reiniciar backend
pm2 restart md-publicidades-backend

# Reiniciar Apache
sudo /opt/bitnami/ctlscript.sh restart apache
```

## 📦 Backup

### Crear backup de la base de datos:

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@107.21.186.16

# Crear backup
PGPASSWORD="MdPublicidades2024!" pg_dump -h localhost -U md_user -d md_publicidades > ~/backup_$(date +%Y%m%d_%H%M%S).sql

# Descargar el backup a tu máquina local
exit
scp -i ~/.ssh/id_ed25519 bitnami@107.21.186.16:~/backup_*.sql ./backups/
```

### Restaurar backup:

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@107.21.186.16

PGPASSWORD="MdPublicidades2024!" psql -h localhost -U md_user -d md_publicidades < ~/backup_20260110_123456.sql
```

## 🔐 Seguridad

### Credenciales importantes:

- **Base de datos**: Usuario `md_user`, contraseña en `.env` del servidor
- **SSH**: Clave privada en `~/.ssh/id_ed25519`
- **IP del servidor**: `107.21.186.16`

**⚠️ NUNCA commitear credenciales al repositorio**

## 📞 Contacto de Emergencia

Si algo falla críticamente:

1. Verificar logs: `pm2 logs md-publicidades-backend`
2. Reiniciar servicios: `pm2 restart md-publicidades-backend`
3. Revisar estado de la BD: `psql -U md_user -d md_publicidades`
4. Restaurar backup si es necesario

---

*Última actualización: Enero 2026*
