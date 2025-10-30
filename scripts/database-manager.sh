#!/bin/bash

# Script para gestión de base de datos - MD Publicidades
# Uso: ./database-manager.sh [backup|restore|migrate|create-admin]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
INSTANCE_IP="107.21.186.16"
SSH_KEY="~/.ssh/id_ed25519"
USER="bitnami"
DB_NAME="md_publicidades"
DB_USER="md_user"

# Función para mostrar ayuda
show_help() {
    echo -e "${BLUE}🗄️  Gestión de Base de Datos - MD Publicidades${NC}"
    echo ""
    echo "Uso: $0 [backup|restore|migrate|create-admin|status]"
    echo ""
    echo "Comandos:"
    echo "  backup [archivo]     - Crear backup de la base de datos"
    echo "  restore [archivo]    - Restaurar backup de la base de datos"
    echo "  migrate              - Ejecutar migraciones de Prisma"
    echo "  create-admin         - Crear usuario administrador"
    echo "  status               - Ver estado de la base de datos"
    echo ""
    echo "Ejemplos:"
    echo "  $0 backup backup_20241030.sql"
    echo "  $0 restore backup_20241030.sql"
    echo "  $0 migrate"
    echo "  $0 create-admin"
    echo "  $0 status"
}

# Función para crear backup
backup_database() {
    local backup_file=${1:-"backup_$(date +%Y%m%d_%H%M%S).sql"}
    
    echo -e "${YELLOW}💾 Creando backup de la base de datos...${NC}"
    
    ssh -i $SSH_KEY $USER@$INSTANCE_IP << EOF
pg_dump -h localhost -U $DB_USER -d $DB_NAME > ~/$backup_file
echo "✅ Backup creado: $backup_file"
ls -lh ~/$backup_file
EOF
    
    echo -e "${GREEN}✅ Backup completado: $backup_file${NC}"
}

# Función para restaurar backup
restore_database() {
    local backup_file=$1
    
    if [ -z "$backup_file" ]; then
        echo -e "${RED}❌ Debes especificar el archivo de backup${NC}"
        echo "Uso: $0 restore [archivo]"
        exit 1
    fi
    
    echo -e "${YELLOW}🔄 Restaurando backup de la base de datos...${NC}"
    
    ssh -i $SSH_KEY $USER@$INSTANCE_IP << EOF
if [ ! -f ~/$backup_file ]; then
    echo "❌ Archivo de backup no encontrado: $backup_file"
    exit 1
fi

# Detener la aplicación
pm2 stop md-publicidades-backend

# Restaurar backup
psql -h localhost -U $DB_USER -d $DB_NAME < ~/$backup_file

# Reiniciar la aplicación
pm2 start md-publicidades-backend

echo "✅ Backup restaurado: $backup_file"
EOF
    
    echo -e "${GREEN}✅ Restauración completada${NC}"
}

# Función para ejecutar migraciones
migrate_database() {
    echo -e "${YELLOW}🔄 Ejecutando migraciones de la base de datos...${NC}"
    
    ssh -i $SSH_KEY $USER@$INSTANCE_IP << 'EOF'
cd ~/md-publicidades-backend

# Detener la aplicación
pm2 stop md-publicidades-backend

# Ejecutar migraciones
npx prisma db push

# Reiniciar la aplicación
pm2 start md-publicidades-backend

echo "✅ Migraciones ejecutadas"
EOF
    
    echo -e "${GREEN}✅ Migraciones completadas${NC}"
}

# Función para crear usuario administrador
create_admin() {
    echo -e "${YELLOW}👤 Creando usuario administrador...${NC}"
    
    # Solicitar datos del usuario
    read -p "Email del administrador: " admin_email
    read -s -p "Contraseña del administrador: " admin_password
    echo ""
    
    # Crear archivo temporal con el script
    cat > /tmp/create-admin.js << EOF
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('$admin_password', 10);
    
    const admin = await prisma.admin.create({
      data: {
        email: '$admin_email',
        password: hashedPassword,
      },
    });
    
    console.log('✅ Usuario administrador creado:');
    console.log('   Email:', admin.email);
    console.log('   ID:', admin.id);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
}

createAdmin();
EOF
    
    # Transferir y ejecutar script
    scp -i $SSH_KEY /tmp/create-admin.js $USER@$INSTANCE_IP:~/md-publicidades-backend/
    
    ssh -i $SSH_KEY $USER@$INSTANCE_IP << 'EOF'
cd ~/md-publicidades-backend
node create-admin.js
rm create-admin.js
EOF
    
    # Limpiar archivo temporal
    rm /tmp/create-admin.js
    
    echo -e "${GREEN}✅ Usuario administrador creado${NC}"
}

# Función para ver estado de la base de datos
check_database_status() {
    echo -e "${BLUE}📊 Verificando estado de la base de datos...${NC}"
    
    ssh -i $SSH_KEY $USER@$INSTANCE_IP << 'EOF'
echo "=== Conexión a la base de datos ==="
psql -h localhost -U md_user -d md_publicidades -c "SELECT version();"

echo ""
echo "=== Tablas existentes ==="
psql -h localhost -U md_user -d md_publicidades -c "\dt"

echo ""
echo "=== Usuarios administradores ==="
psql -h localhost -U md_user -d md_publicidades -c "SELECT id, email, \"createdAt\" FROM \"Admin\";"

echo ""
echo "=== Conteo de novedades ==="
psql -h localhost -U md_user -d md_publicidades -c "SELECT COUNT(*) as total_novedades FROM \"Novedad\";"
EOF
    
    echo -e "${GREEN}✅ Verificación completada${NC}"
}

# Función principal
main() {
    case "$1" in
        "backup")
            backup_database "$2"
            ;;
        "restore")
            restore_database "$2"
            ;;
        "migrate")
            migrate_database
            ;;
        "create-admin")
            create_admin
            ;;
        "status")
            check_database_status
            ;;
        *)
            show_help
            exit 1
            ;;
    esac
}

# Verificar que se proporcionó un comando
if [ $# -eq 0 ]; then
    show_help
    exit 1
fi

# Ejecutar función principal
main "$1"
