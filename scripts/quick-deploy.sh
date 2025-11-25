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
API_URL_DEFAULT="/api"

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
    # Asegurar que el directorio dist existe
    mkdir -p dist
    # Generar timestamp para evitar caché
    TIMESTAMP=$(date +%s)
    # Generar config.js con formato correcto
    echo "window.API_BASE_URL = '${API_URL_TO_USE}';" > dist/config.js
    # Verificar que se creó correctamente
    if [ ! -f dist/config.js ]; then
        echo -e "${RED}❌ Error: No se pudo crear config.js${NC}"
        exit 1
    fi
    echo -e "${GREEN}   ✓ config.js generado: $(cat dist/config.js)${NC}"
    
    # Modificar index.html para agregar timestamp al config.js y evitar caché
    echo -e "${YELLOW}   Actualizando index.html con timestamp...${NC}"
    if [ -f dist/index.html ]; then
        # Reemplazar la línea del config.js para agregar timestamp
        sed -i.bak "s|src=\"/config.js\"|src=\"/config.js?v=${TIMESTAMP}\"|g" dist/index.html
        rm -f dist/index.html.bak
        echo -e "${GREEN}   ✓ index.html actualizado con timestamp${NC}"
    else
        echo -e "${YELLOW}   ⚠️  index.html no encontrado en dist, continuando...${NC}"
    fi
    
    # Crear ZIP (asegurarse de incluir config.js)
    echo -e "${YELLOW}   Creando archivo ZIP...${NC}"
    cd dist
    # Limpiar ZIP anterior si existe
    rm -f ../../../frontend-complete.zip
    zip -r ../../../frontend-complete.zip . -x "*.map"
    # Verificar que config.js está en el ZIP
    if ! unzip -l ../../../frontend-complete.zip | grep -q "config.js"; then
        echo -e "${RED}❌ Error: config.js no está en el ZIP${NC}"
        exit 1
    fi
    echo -e "${GREEN}   ✓ ZIP creado con config.js incluido${NC}"
    cd ../../..
    
    # Transferir archivo
    echo -e "${YELLOW}   Transfiriendo archivo...${NC}"
    scp -i $SSH_KEY frontend-complete.zip $USER@$INSTANCE_IP:~/
    
    # Desplegar en la instancia
    echo -e "${YELLOW}   Desplegando en la instancia...${NC}"
    ssh -i $SSH_KEY $USER@$INSTANCE_IP << 'DEPLOYEOF'
# Detectar DocumentRoot de Apache (Bitnami o estándar)
if [ -d /opt/bitnami/apache/htdocs ]; then
    # Bitnami
    DEPLOY_DIR="/opt/bitnami/apache/htdocs"
    echo "📁 Detectado Bitnami, desplegando en: $DEPLOY_DIR"
elif [ -d /var/www/html ]; then
    # Debian/Ubuntu estándar
    DEPLOY_DIR="/var/www/html"
    echo "📁 Detectado Apache estándar, desplegando en: $DEPLOY_DIR"
else
    # Fallback al directorio del usuario
    DEPLOY_DIR="~/md-publicidades-frontend"
    echo "📁 Usando directorio de usuario: $DEPLOY_DIR"
fi

# También mantener copia en el directorio del usuario para referencia
BACKUP_DIR=~/md-publicidades-frontend
mkdir -p $BACKUP_DIR

# Descomprimir en directorio temporal primero
TEMP_DIR=$(mktemp -d)
cd $TEMP_DIR
unzip -o ~/frontend-complete.zip

# Verificar que config.js existe
if [ ! -f config.js ]; then
    echo "❌ Error: config.js no encontrado después del despliegue"
    exit 1
fi
echo "✅ config.js verificado:"
cat config.js

# Copiar archivos al DocumentRoot (necesita sudo para Bitnami)
echo "📦 Copiando archivos al DocumentRoot..."
sudo rm -rf $DEPLOY_DIR/*
sudo cp -r * $DEPLOY_DIR/
sudo chown -R bitnami:bitnami $DEPLOY_DIR 2>/dev/null || sudo chown -R www-data:www-data $DEPLOY_DIR 2>/dev/null || true

# También copiar al directorio de backup
cp -r * $BACKUP_DIR/

# Limpiar directorio temporal
rm -rf $TEMP_DIR

echo "✅ Archivos copiados a $DEPLOY_DIR"

# Crear archivo .htaccess en el DocumentRoot para optimizar cacheo y compresión
echo "🔧 Creando .htaccess para optimizar cacheo y compresión..."
cat > /tmp/htaccess-content << 'HTACCESS'
# Habilitar compresión gzip para archivos de texto
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript
    AddOutputFilterByType DEFLATE application/javascript application/x-javascript application/json
    AddOutputFilterByType DEFLATE application/xml application/xhtml+xml
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# No cachear config.js e index.html para asegurar que siempre se cargue la versión más reciente
<FilesMatch "^(config\.js|index\.html)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "0"
</FilesMatch>

# Cachear imágenes, CSS y JS por 1 año para mejorar rendimiento
<FilesMatch "\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public"
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </IfModule>
</FilesMatch>

# Habilitar mod_rewrite para SPA (React Router)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
HTACCESS

# Copiar .htaccess al DocumentRoot
sudo cp /tmp/htaccess-content $DEPLOY_DIR/.htaccess
sudo chown bitnami:bitnami $DEPLOY_DIR/.htaccess 2>/dev/null || sudo chown www-data:www-data $DEPLOY_DIR/.htaccess 2>/dev/null || true
rm -f /tmp/htaccess-content
echo "✅ Archivo .htaccess creado en $DEPLOY_DIR"

# Recargar Apache para servir los nuevos archivos
echo "🔄 Recargando Apache..."
# Intentar diferentes métodos según el sistema
if [ -f /opt/bitnami/ctlscript.sh ]; then
    # Bitnami
    sudo /opt/bitnami/ctlscript.sh restart apache
    echo "✅ Apache reiniciado (Bitnami)"
elif systemctl is-active --quiet httpd 2>/dev/null; then
    sudo systemctl reload httpd
    echo "✅ Apache recargado (httpd)"
elif systemctl is-active --quiet apache2 2>/dev/null; then
    sudo systemctl reload apache2
    echo "✅ Apache recargado (apache2)"
else
    echo "⚠️  No se pudo recargar Apache automáticamente"
    echo "   Ejecuta manualmente: sudo /opt/bitnami/ctlscript.sh restart apache"
fi

# Verificar estado de Apache
echo "Estado de Apache:"
if [ -f /opt/bitnami/ctlscript.sh ]; then
    sudo /opt/bitnami/ctlscript.sh status apache | head -3
else
    sudo systemctl status httpd --no-pager -l 2>/dev/null | head -5 || sudo systemctl status apache2 --no-pager -l 2>/dev/null | head -5 || echo "No se pudo verificar el estado"
fi
echo "✅ Frontend desplegado"
DEPLOYEOF
    
    echo -e "${GREEN}✅ Frontend desplegado exitosamente${NC}"
    echo -e "${BLUE}💡 Nota: Si no ves los cambios, limpia la caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)${NC}"
}

# Función para desplegar backend
deploy_backend() {
    echo -e "${YELLOW}🔧 Desplegando backend...${NC}"
    
    # Crear ZIP del backend (sin node_modules, dist, logs, uploads NI .env)
    echo -e "${YELLOW}   Creando archivo ZIP...${NC}"
    cd apps/backend
    zip -r ../../backend-complete.zip . \
        -x "node_modules/*" "dist/*" "*.log" "uploads/*" ".env" ".env.*"
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
sudo systemctl status nginx --no-pager -l | head -10

echo ""
echo "=== Configuración de Nginx (puerto) ==="
sudo grep -n "listen" /etc/nginx/sites-available/md-publicidades || echo "No se encontró configuración"

echo ""
echo "=== Verificar config.js en el frontend ==="
if [ -f ~/md-publicidades-frontend/config.js ]; then
    echo "✅ config.js existe:"
    cat ~/md-publicidades-frontend/config.js
else
    echo "❌ config.js NO existe"
fi

echo ""
echo "=== Prueba de conectividad Backend ==="
curl -s http://localhost:3001/api/novedades | head -1 || echo "❌ Backend no responde"

echo ""
echo "=== Prueba de conectividad Frontend (puerto 80) ==="
curl -s -I http://localhost:80 | head -3 || echo "❌ Frontend no responde en puerto 80"

echo ""
echo "=== Prueba de conectividad Frontend (puerto 8080) ==="
curl -s -I http://localhost:8080 | head -3 || echo "❌ Frontend no responde en puerto 8080"
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
