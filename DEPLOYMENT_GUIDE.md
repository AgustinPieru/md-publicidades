# 🚀 Guía de Despliegue - MD Publicidades

Esta guía documenta el proceso completo para desplegar la aplicación MD Publicidades en AWS Lightsail, incluyendo configuración de instancia, despliegue de componentes y gestión de la aplicación.

## 📋 Tabla de Contenidos

1. [Configuración Inicial de Lightsail](#configuración-inicial-de-lightsail)
2. [Preparación de la Instancia](#preparación-de-la-instancia)
3. [Despliegue de la Aplicación](#despliegue-de-la-aplicación)
4. [Gestión de Despliegues](#gestión-de-despliegues)
5. [Gestión de Base de Datos](#gestión-de-base-de-datos)
6. [Comandos Útiles](#comandos-útiles)
7. [Solución de Problemas](#solución-de-problemas)

---

## 🔧 Configuración Inicial de Lightsail

### 1. Crear Instancia Lightsail

```bash
# Crear instancia (usar Ubuntu 22.04)
aws lightsail create-instances \
  --instance-names mi-app-backend \
  --availability-zone us-east-1a \
  --blueprint-id ubuntu_22_04 \
  --bundle-id micro_2_0
```

### 2. Configurar Firewall

En la consola de Lightsail:
1. Ir a la instancia → pestaña "Networking"
2. Agregar reglas:
   - **Puerto 22** (SSH) - Any IPv4
   - **Puerto 80** (HTTP) - Any IPv4  
   - **Puerto 443** (HTTPS) - Any IPv4
   - **Puerto 8080** (App) - Any IPv4

### 3. Obtener Clave SSH

1. En la consola de Lightsail → instancia → "Connect using SSH"
2. Descargar la clave SSH
3. Mover a `~/.ssh/` y configurar permisos:

```bash
mv ~/Downloads/LightsailDefaultKey-us-east-1.pem ~/.ssh/
chmod 600 ~/.ssh/LightsailDefaultKey-us-east-1.pem
```

### 4. Configurar Acceso SSH Personal

```bash
# Conectar a la instancia
ssh -i ~/.ssh/LightsailDefaultKey-us-east-1.pem bitnami@TU_IP

# En la consola web de Lightsail, ejecutar:
mkdir -p ~/.ssh
echo "TU_CLAVE_PUBLICA_AQUI" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

## 🛠️ Preparación de la Instancia

### 1. Actualizar Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Instalar Node.js 18

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Instalar PM2

```bash
sudo npm install -g pm2
```

### 4. Instalar PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
```

### 5. Instalar Nginx

```bash
sudo apt install -y nginx
```

### 6. Instalar Certbot (para SSL)

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 7. Configurar PostgreSQL

```bash
# Crear base de datos y usuario
sudo -u postgres psql -c "CREATE DATABASE md_publicidades;"
sudo -u postgres psql -c "CREATE USER md_user WITH PASSWORD 'TuPasswordSeguro2024!';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE md_publicidades TO md_user;"

# Configurar permisos del esquema
sudo -u postgres psql -d md_publicidades -c "
GRANT ALL PRIVILEGES ON SCHEMA public TO md_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO md_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO md_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO md_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO md_user;
"
```

### 8. Configurar Firewall Local

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 8080
sudo ufw --force enable
```

---

## 🚀 Despliegue de la Aplicación

### 1. Preparar Archivos

```bash
# Desde el directorio del proyecto
cd /ruta/a/md-publicidades

# Crear ZIP del backend
cd apps/backend
zip -r ../../backend-complete.zip . -x "node_modules/*" "dist/*" "*.log" "uploads/*"
cd ../..

# Crear ZIP del frontend
cd apps/frontend
npm run build
cd dist
zip -r ../../../frontend-complete.zip .
cd ../../..
```

### 2. Transferir Archivos

```bash
# Transferir archivos a la instancia
scp -i ~/.ssh/id_ed25519 backend-complete.zip bitnami@TU_IP:~/
scp -i ~/.ssh/id_ed25519 frontend-complete.zip bitnami@TU_IP:~/
```

### 3. Configurar Backend

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP << 'EOF'
# Crear directorios
mkdir -p ~/md-publicidades-backend
mkdir -p ~/md-publicidades-backend/uploads
mkdir -p ~/md-publicidades-frontend

# Extraer backend
cd ~/md-publicidades-backend
unzip ~/backend-complete.zip

# Crear archivo .env
cat > .env << 'ENVEOF'
DATABASE_URL="postgresql://md_user:TuPasswordSeguro2024!@localhost:5432/md_publicidades"
JWT_SECRET="tu-jwt-secret-super-seguro-2024"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="production"
CORS_ORIGIN="http://localhost"
ENVEOF

# Instalar dependencias
npm install --production

# Instalar TypeScript para compilación
npm install typescript @types/node --save-dev

# Generar cliente Prisma
npx prisma generate

# Compilar TypeScript
npm run build

# Crear tablas en la base de datos
sudo -u postgres psql -d md_publicidades -c "
CREATE TABLE IF NOT EXISTS \"Novedad\" (
    \"id\" SERIAL PRIMARY KEY,
    \"titulo\" TEXT NOT NULL,
    \"descripcion\" TEXT NOT NULL,
    \"imagenUrl\" TEXT NOT NULL,
    \"createdAt\" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \"updatedAt\" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS \"Admin\" (
    \"id\" SERIAL PRIMARY KEY,
    \"email\" TEXT NOT NULL UNIQUE,
    \"password\" TEXT NOT NULL,
    \"createdAt\" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \"updatedAt\" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
"

# Dar permisos a las tablas
sudo -u postgres psql -d md_publicidades -c "
GRANT ALL PRIVILEGES ON TABLE \"Novedad\" TO md_user;
GRANT ALL PRIVILEGES ON TABLE \"Admin\" TO md_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO md_user;
"

# Iniciar con PM2
pm2 start dist/index.js --name md-publicidades-backend
pm2 save
pm2 startup
EOF
```

### 4. Configurar Frontend

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP << 'EOF'
# Extraer frontend
cd ~/md-publicidades-frontend
unzip ~/frontend-complete.zip

# Crear archivo de configuración
cat > config.js << 'CONFIGEOF'
window.API_BASE_URL = 'http://localhost:3001/api';
CONFIGEOF
EOF
```

### 5. Configurar Nginx

```bash
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP << 'EOF'
# Detener Apache si está corriendo
sudo systemctl stop apache2 2>/dev/null || true
sudo systemctl disable apache2 2>/dev/null || true

# Crear configuración de Nginx
sudo tee /etc/nginx/sites-available/md-publicidades << 'NGINXEOF'
server {
    listen 8080;
    server_name _;
    
    # Servir archivos estáticos del frontend
    location / {
        root /home/bitnami/md-publicidades-frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy para API del backend
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Proxy para uploads
    location /uploads/ {
        proxy_pass http://localhost:3001/uploads/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINXEOF

# Habilitar el sitio
sudo ln -sf /etc/nginx/sites-available/md-publicidades /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Probar configuración
sudo nginx -t

# Iniciar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
EOF
```

---

## 🔄 Gestión de Despliegues

### Despliegue de Frontend

```bash
# 1. Compilar frontend
cd apps/frontend
npm run build

# 2. Crear ZIP
cd dist
zip -r ../../../frontend-complete.zip .
cd ../../..

# 3. Transferir a la instancia
scp -i ~/.ssh/id_ed25519 frontend-complete.zip bitnami@TU_IP:~/

# 4. Desplegar en la instancia
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP << 'EOF'
cd ~/md-publicidades-frontend
rm -rf *
unzip ~/frontend-complete.zip
sudo systemctl reload nginx
echo "✅ Frontend desplegado"
EOF
```

### Despliegue de Backend

```bash
# 1. Crear ZIP del backend
cd apps/backend
zip -r ../../backend-complete.zip . -x "node_modules/*" "dist/*" "*.log" "uploads/*"
cd ../..

# 2. Transferir a la instancia
scp -i ~/.ssh/id_ed25519 backend-complete.zip bitnami@TU_IP:~/

# 3. Desplegar en la instancia
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP << 'EOF'
cd ~/md-publicidades-backend
pm2 stop md-publicidades-backend
unzip -o ~/backend-complete.zip
npm install --production
npx prisma generate
npm run build
pm2 start md-publicidades-backend
echo "✅ Backend desplegado"
EOF
```

### Despliegue Completo

```bash
# Usar el script automatizado
./scripts/deploy-to-existing-lightsail.sh
```

---

## 🗄️ Gestión de Base de Datos

### Modificaciones en Base de Datos

```bash
# 1. Conectar a la base de datos
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP
sudo -u postgres psql -d md_publicidades

# 2. Ejecutar comandos SQL
# Ejemplo: Agregar nueva columna
ALTER TABLE "Novedad" ADD COLUMN "categoria" TEXT;

# 3. Actualizar permisos
GRANT ALL PRIVILEGES ON TABLE "Novedad" TO md_user;
```

### Insertar Usuarios Admin

```bash
# 1. Conectar a la base de datos
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP
sudo -u postgres psql -d md_publicidades

# 2. Insertar usuario admin (password debe estar hasheado)
INSERT INTO "Admin" (email, password) VALUES 
('admin@mdpublicidades.com', '$2a$10$hashedpasswordhere');

# 3. Verificar inserción
SELECT * FROM "Admin";
```

### Script para Crear Usuario Admin

```bash
# Crear script de creación de admin
cat > create-admin.js << 'EOF'
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  const email = 'admin@mdpublicidades.com';
  const password = 'admin123'; // Cambiar por una contraseña segura
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    
    console.log('✅ Admin creado:', admin);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
EOF

# Ejecutar en la instancia
scp -i ~/.ssh/id_ed25519 create-admin.js bitnami@TU_IP:~/md-publicidades-backend/
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP "cd ~/md-publicidades-backend && node create-admin.js"
```

### Backup de Base de Datos

```bash
# Crear backup
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP << 'EOF'
pg_dump -h localhost -U md_user -d md_publicidades > ~/backup_$(date +%Y%m%d_%H%M%S).sql
echo "✅ Backup creado"
EOF

# Restaurar backup
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP << 'EOF'
psql -h localhost -U md_user -d md_publicidades < ~/backup_20241030_120000.sql
echo "✅ Backup restaurado"
EOF
```

---

## 🛠️ Comandos Útiles

### Gestión de la Aplicación

```bash
# Conectar a la instancia
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP

# Ver estado de PM2
pm2 status

# Ver logs del backend
pm2 logs md-publicidades-backend

# Reiniciar backend
pm2 restart md-publicidades-backend

# Ver logs en tiempo real
pm2 logs md-publicidades-backend --follow

# Ver estado de Nginx
sudo systemctl status nginx

# Reiniciar Nginx
sudo systemctl restart nginx

# Probar configuración de Nginx
sudo nginx -t
```

### Monitoreo del Sistema

```bash
# Ver uso de CPU y memoria
htop

# Ver uso de disco
df -h

# Ver conexiones de red
netstat -tlnp

# Ver logs del sistema
sudo journalctl -f
```

### Gestión de Base de Datos

```bash
# Conectar a PostgreSQL
sudo -u postgres psql -d md_publicidades

# Ver tablas
\dt

# Ver estructura de tabla
\d "Novedad"

# Salir de PostgreSQL
\q
```

---

## 🔧 Solución de Problemas

### Problema: Puerto 80 en uso

```bash
# Encontrar proceso que usa puerto 80
sudo netstat -tlnp | grep :80

# Detener proceso
sudo kill -9 PID_DEL_PROCESO

# O usar puerto alternativo
sudo sed -i 's/listen 80;/listen 8080;/' /etc/nginx/sites-available/md-publicidades
```

### Problema: Permisos de base de datos

```bash
# Dar permisos completos
sudo -u postgres psql -d md_publicidades -c "
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO md_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO md_user;
"
```

### Problema: Backend no inicia

```bash
# Ver logs de error
pm2 logs md-publicidades-backend --err

# Reinstalar dependencias
cd ~/md-publicidades-backend
rm -rf node_modules
npm install --production
npm run build
pm2 restart md-publicidades-backend
```

### Problema: Frontend no carga

```bash
# Verificar que Nginx esté sirviendo archivos
sudo nginx -t
sudo systemctl status nginx

# Verificar permisos de archivos
ls -la /home/bitnami/md-publicidades-frontend/
```

---

## 📊 Arquitectura Final

```
┌─────────────────────────────────────┐
│     AWS Lightsail Instance          │
│  ┌─────────────────────────────────┐ │
│  │        Nginx (Puerto 8080)      │ │
│  │   (Proxy + Archivos Estáticos)  │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────┐ ┌─────────────────┐ │
│  │  Frontend   │ │    Backend      │ │
│  │  (React)    │ │  (Node.js)      │ │
│  │  Archivos   │ │  API + PM2      │ │
│  │  Estáticos  │ │  Puerto 3001    │ │
│  └─────────────┘ └─────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │        PostgreSQL               │ │
│  │      (Base de Datos)            │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 💰 Costos

- **Instancia Lightsail Micro**: $10/mes
- **Total**: $10/mes (sin costos adicionales)

---

## 📝 Notas Importantes

1. **Seguridad**: Cambiar todas las contraseñas por defecto
2. **Backups**: Configurar backups automáticos de la base de datos
3. **SSL**: Configurar certificados SSL para producción
4. **Dominio**: Configurar dominio personalizado
5. **Monitoreo**: Implementar monitoreo y alertas

---

*Documento creado: Octubre 2024*
*Última actualización: Octubre 2024*
