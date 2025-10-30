# 🚀 Comandos de MD Publicidades

Esta guía contiene todos los comandos disponibles para gestionar la aplicación MD Publicidades.

## 📋 Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev                    # Iniciar frontend y backend en desarrollo
npm run dev:frontend          # Solo frontend en desarrollo
npm run dev:backend           # Solo backend en desarrollo
npm run dev:all               # Frontend, backend e infraestructura

# Construcción
npm run build                 # Construir frontend y backend
npm run build:frontend        # Solo frontend
npm run build:backend         # Solo backend

# Calidad de código
npm run lint                  # Verificar linting
npm run lint:fix              # Corregir problemas de linting
npm run format                # Formatear código
npm run type-check            # Verificar tipos TypeScript
```

## 🚀 Comandos de Despliegue

### Despliegue Completo

```bash
# Despliegue desde cero (nueva instancia)
npm run deploy:complete [dominio]

# Desplegar en instancia existente
npm run deploy:existing
```

### Despliegue Rápido

```bash
# Desplegar solo frontend
npm run deploy:frontend-only

# Desplegar solo backend
npm run deploy:backend-only

# Desplegar todo (frontend + backend)
npm run deploy:all

# Ver estado de la aplicación
npm run deploy:status
```

### Despliegue Específico

```bash
# Desplegar frontend a CloudFront
npm run deploy:frontend
```

## 🗄️ Comandos de Base de Datos

```bash
# Crear backup
npm run db:backup [archivo.sql]

# Restaurar backup
npm run db:restore [archivo.sql]

# Ejecutar migraciones
npm run db:migrate

# Crear usuario administrador
npm run db:create-admin

# Ver estado de la base de datos
npm run db:status
```

## 👤 Comandos de Usuarios Admin

```bash
# Crear usuario administrador
npm run admin:create [email] [password]

# Listar usuarios administradores
npm run admin:list

# Eliminar usuario administrador
npm run admin:delete [email]
```

## 🔧 Comandos de Configuración

```bash
# Configurar SSL y dominio
npm run ssl:setup [dominio.com]

# Configurar monitoreo
npm run monitoring:setup
```

## 📖 Comandos de Ayuda

```bash
# Ver ayuda de despliegue
npm run help:deploy

# Ver ayuda de base de datos
npm run help:db

# Ver ayuda de usuarios admin
npm run help:admin

# Ver toda la ayuda
npm run help:all
```

## 🔄 Flujos de Trabajo Comunes

### Desarrollo Diario

```bash
# 1. Hacer cambios en el código
# 2. Probar localmente
npm run dev

# 3. Desplegar cambios
npm run deploy:all

# 4. Verificar estado
npm run deploy:status
```

### Nueva Característica

```bash
# 1. Actualizar base de datos
npm run db:migrate

# 2. Desplegar backend
npm run deploy:backend-only

# 3. Desplegar frontend
npm run deploy:frontend-only

# 4. Verificar funcionamiento
npm run deploy:status
```

### Mantenimiento

```bash
# 1. Crear backup
npm run db:backup backup_$(date +%Y%m%d).sql

# 2. Verificar estado
npm run db:status
npm run deploy:status

# 3. Crear usuario admin si es necesario
npm run db:create-admin
```

### Configuración Inicial

```bash
# 1. Desplegar aplicación completa
npm run deploy:complete

# 2. Configurar SSL (cuando tengas dominio)
npm run ssl:setup tu-dominio.com

# 3. Configurar monitoreo
npm run monitoring:setup

# 4. Crear usuario administrador
npm run db:create-admin
```

## ⚙️ Configuración de Scripts

### Variables de Configuración

Antes de usar los scripts, asegúrate de configurar estas variables en los archivos correspondientes:

```bash
# En scripts/quick-deploy.sh y scripts/database-manager.sh
INSTANCE_IP="TU_IP_DE_LIGHTSAIL"
SSH_KEY="~/.ssh/id_ed25519"
USER="bitnami"
```

### Requisitos Previos

1. **AWS CLI configurado**
2. **Clave SSH configurada**
3. **Node.js instalado**
4. **Acceso SSH a la instancia**

## 🔧 Solución de Problemas

### Error de Permisos

```bash
# Hacer scripts ejecutables
chmod +x scripts/*.sh

# Verificar permisos
ls -la scripts/
```

### Error de Conexión

```bash
# Verificar conexión SSH
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP

# Verificar estado de la aplicación
npm run deploy:status
```

### Error de Base de Datos

```bash
# Verificar estado de la BD
npm run db:status

# Ver logs del backend
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP "pm2 logs md-publicidades-backend"
```

## 📊 Monitoreo

### Ver Logs en Tiempo Real

```bash
# Conectar a la instancia
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP

# Ver logs del backend
pm2 logs md-publicidades-backend --follow

# Ver logs de Nginx
sudo journalctl -u nginx -f
```

### Ver Estado del Sistema

```bash
# Estado de PM2
pm2 status

# Estado de servicios
sudo systemctl status nginx postgresql
```

---

*Comandos de MD Publicidades - Última actualización: Octubre 2024*
