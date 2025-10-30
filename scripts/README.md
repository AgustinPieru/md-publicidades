# 🛠️ Scripts de Gestión - MD Publicidades

Esta carpeta contiene todos los scripts necesarios para gestionar el despliegue y mantenimiento de la aplicación MD Publicidades en AWS Lightsail.

## 📁 Archivos Disponibles

### Scripts de Despliegue

| Script | Descripción | Uso |
|--------|-------------|-----|
| `deploy-to-lightsail-complete.sh` | Despliegue completo desde cero | `./deploy-to-lightsail-complete.sh [dominio]` |
| `deploy-to-existing-lightsail.sh` | Desplegar en instancia existente | `./deploy-to-existing-lightsail.sh` |
| `quick-deploy.sh` | Despliegue rápido de componentes | `./quick-deploy.sh [frontend\|backend\|all]` |

### Scripts de Gestión

| Script | Descripción | Uso |
|--------|-------------|-----|
| `database-manager.sh` | Gestión de base de datos | `./database-manager.sh [backup\|restore\|migrate]` |
| `create-admin-user.js` | Gestión de usuarios admin | `node create-admin-user.js [create\|list\|delete]` |
| `setup-ssl-domain.sh` | Configurar SSL y dominio | `./setup-ssl-domain.sh tu-dominio.com` |
| `setup-monitoring.sh` | Configurar monitoreo | `./setup-monitoring.sh` |

### Scripts de Frontend

| Script | Descripción | Uso |
|--------|-------------|-----|
| `deploy-frontend.sh` | Desplegar frontend a CloudFront | `./deploy-frontend.sh` |

## 🚀 Uso Rápido

### Despliegue Inicial

```bash
# Desplegar aplicación completa
./deploy-to-lightsail-complete.sh

# O en instancia existente
./deploy-to-existing-lightsail.sh
```

### Despliegues Diarios

```bash
# Desplegar solo frontend
./quick-deploy.sh frontend

# Desplegar solo backend
./quick-deploy.sh backend

# Desplegar todo
./quick-deploy.sh all

# Verificar estado
./quick-deploy.sh status
```

### Gestión de Base de Datos

```bash
# Crear backup
./database-manager.sh backup mi_backup.sql

# Restaurar backup
./database-manager.sh restore mi_backup.sql

# Ejecutar migraciones
./database-manager.sh migrate

# Crear usuario admin
./database-manager.sh create-admin

# Ver estado de la BD
./database-manager.sh status
```

### Gestión de Usuarios Admin

```bash
# Crear usuario admin
node create-admin-user.js create admin@ejemplo.com password123

# Listar usuarios admin
node create-admin-user.js list

# Eliminar usuario admin
node create-admin-user.js delete admin@ejemplo.com
```

## ⚙️ Configuración

### Variables de Configuración

Antes de usar los scripts, asegúrate de configurar estas variables en cada script:

```bash
# En quick-deploy.sh y database-manager.sh
INSTANCE_IP="TU_IP_DE_LIGHTSAIL"
SSH_KEY="~/.ssh/id_ed25519"  # O la clave que uses
USER="bitnami"  # O el usuario de tu instancia
```

### Requisitos Previos

1. **AWS CLI configurado**
2. **Clave SSH configurada**
3. **Node.js instalado localmente**
4. **Acceso SSH a la instancia**

## 🔧 Solución de Problemas

### Error de Conexión SSH

```bash
# Verificar que la clave SSH existe
ls -la ~/.ssh/id_ed25519

# Verificar permisos
chmod 600 ~/.ssh/id_ed25519

# Probar conexión
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP
```

### Error de Permisos

```bash
# Hacer scripts ejecutables
chmod +x scripts/*.sh

# Verificar permisos
ls -la scripts/
```

### Error de Base de Datos

```bash
# Verificar estado de PostgreSQL
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP "sudo systemctl status postgresql"

# Verificar conexión
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP "psql -h localhost -U md_user -d md_publicidades"
```

## 📊 Monitoreo

### Ver Logs en Tiempo Real

```bash
# Logs del backend
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP "pm2 logs md-publicidades-backend --follow"

# Logs de Nginx
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP "sudo journalctl -u nginx -f"
```

### Ver Estado del Sistema

```bash
# Estado de PM2
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP "pm2 status"

# Estado de servicios
ssh -i ~/.ssh/id_ed25519 bitnami@TU_IP "sudo systemctl status nginx postgresql"
```

## 🔄 Flujo de Trabajo Recomendado

### Desarrollo Diario

1. **Hacer cambios en el código**
2. **Probar localmente**
3. **Desplegar con script rápido**:
   ```bash
   ./quick-deploy.sh all
   ```
4. **Verificar funcionamiento**:
   ```bash
   ./quick-deploy.sh status
   ```

### Despliegue de Nuevas Características

1. **Actualizar base de datos**:
   ```bash
   ./database-manager.sh migrate
   ```
2. **Desplegar backend**:
   ```bash
   ./quick-deploy.sh backend
   ```
3. **Desplegar frontend**:
   ```bash
   ./quick-deploy.sh frontend
   ```

### Mantenimiento

1. **Crear backup semanal**:
   ```bash
   ./database-manager.sh backup backup_semanal_$(date +%Y%m%d).sql
   ```
2. **Verificar estado del sistema**:
   ```bash
   ./quick-deploy.sh status
   ./database-manager.sh status
   ```

## 📝 Notas Importantes

- **Siempre hacer backup** antes de cambios importantes
- **Probar en desarrollo** antes de desplegar a producción
- **Verificar logs** después de cada despliegue
- **Mantener actualizada** la documentación

---

*Documentación de scripts - MD Publicidades*
*Última actualización: Octubre 2024*
