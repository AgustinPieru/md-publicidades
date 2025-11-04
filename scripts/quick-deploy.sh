#!/bin/bash

# Script de despliegue rápido para MD Publicidades
# Uso: ./quick-deploy.sh [frontend|backend|all]

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
API_URL_DEFAULT="http://$INSTANCE_IP:3001/api"

# Función para mostrar ayuda
show_help() {
    echo -e "${BLUE}🚀 Despliegue Rápido - MD Publicidades${NC}"
    echo ""
    echo "Uso: $0 [frontend|backend|all]"
    echo ""
    echo "Comandos:"
    echo "  frontend  - Desplegar solo el frontend"
    echo "  backend   - Desplegar solo el backend"
    echo "  all       - Desplegar frontend y backend"
    echo ""
    echo "Ejemplos:"
    echo "  $0 frontend"
    echo "  $0 backend"
    echo "  $0 all"
}

# Función para desplegar frontend
deploy_frontend() {
    echo -e "${YELLOW}🎨 Desplegando frontend...${NC}"
    
    # Compilar frontend
    echo -e "${YELLOW}   Compilando frontend...${NC}"
    cd apps/frontend
    npm run build
    
    # Generar config.js en runtime con la URL del backend
    echo -e "${YELLOW}   Generando config.js...${NC}"
    API_URL_TO_USE="${FRONTEND_API_URL:-$API_URL_DEFAULT}"
    echo "window.API_BASE_URL = '${API_URL_TO_USE}';" > dist/config.js
    
    # Crear ZIP
    echo -e "${YELLOW}   Creando archivo ZIP...${NC}"
    cd dist
    zip -r ../../../frontend-complete.zip .
    cd ../../..
    
    # Transferir archivo
    echo -e "${YELLOW}   Transfiriendo archivo...${NC}"
    scp -i $SSH_KEY frontend-complete.zip $USER@$INSTANCE_IP:~/
    
    # Desplegar en la instancia
    echo -e "${YELLOW}   Desplegando en la instancia...${NC}"
    ssh -i $SSH_KEY $USER@$INSTANCE_IP << 'EOF'
cd ~/md-publicidades-frontend
rm -rf *
unzip ~/frontend-complete.zip
sudo systemctl reload nginx
echo "✅ Frontend desplegado"
EOF
    
    echo -e "${GREEN}✅ Frontend desplegado exitosamente${NC}"
}

# Función para desplegar backend
deploy_backend() {
    echo -e "${YELLOW}🔧 Desplegando backend...${NC}"
    
    # Crear ZIP del backend
    echo -e "${YELLOW}   Creando archivo ZIP...${NC}"
    cd apps/backend
    zip -r ../../backend-complete.zip . -x "node_modules/*" "dist/*" "*.log" "uploads/*"
    cd ../..
    
    # Transferir archivo
    echo -e "${YELLOW}   Transfiriendo archivo...${NC}"
    scp -i $SSH_KEY backend-complete.zip $USER@$INSTANCE_IP:~/
    
    # Desplegar en la instancia
    echo -e "${YELLOW}   Desplegando en la instancia...${NC}"
    ssh -i $SSH_KEY $USER@$INSTANCE_IP << 'EOF'
cd ~/md-publicidades-backend
pm2 stop md-publicidades-backend
unzip -o ~/backend-complete.zip
npm install --production
npx prisma db push
npx prisma generate
npm run build
pm2 start md-publicidades-backend
echo "✅ Backend desplegado"
EOF
    
    echo -e "${GREEN}✅ Backend desplegado exitosamente${NC}"
}

# Función para verificar estado
check_status() {
    echo -e "${BLUE}📊 Verificando estado de la aplicación...${NC}"
    
    ssh -i $SSH_KEY $USER@$INSTANCE_IP << 'EOF'
echo "=== Estado de PM2 ==="
pm2 status

echo ""
echo "=== Estado de Nginx ==="
sudo systemctl status nginx --no-pager -l

echo ""
echo "=== Prueba de conectividad ==="
curl -s http://localhost:3001/api/novedades | head -1
EOF
    
    echo -e "${GREEN}✅ Verificación completada${NC}"
}

# Función principal
main() {
    case "$1" in
        "frontend")
            deploy_frontend
            ;;
        "backend")
            deploy_backend
            ;;
        "all")
            deploy_backend
            deploy_frontend
            ;;
        "status")
            check_status
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
