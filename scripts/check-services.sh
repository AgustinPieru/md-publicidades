#!/bin/bash

# Script para verificar el estado de los servicios
# MD Publicidades - Health Check

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Verificando estado de los servicios...${NC}"

# Verificar si los puertos están en uso
check_port() {
    local port=$1
    local service=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${GREEN}✅ Puerto $port ($service) está en uso${NC}"
        return 0
    else
        echo -e "${RED}❌ Puerto $port ($service) no está en uso${NC}"
        return 1
    fi
}

# Verificar servicios
echo -e "${YELLOW}📊 Verificando puertos...${NC}"
check_port 3000 "Frontend (Vite)"
check_port 3001 "Backend (Express)"
check_port 5432 "PostgreSQL"

echo ""

# Verificar si Docker está ejecutándose
if docker ps | grep -q "md-publicidades-postgres"; then
    echo -e "${GREEN}✅ PostgreSQL (Docker) está ejecutándose${NC}"
else
    echo -e "${RED}❌ PostgreSQL (Docker) no está ejecutándose${NC}"
    echo -e "${YELLOW}💡 Ejecuta: docker-compose up postgres -d${NC}"
fi

echo ""

# Verificar endpoints del backend
echo -e "${YELLOW}🌐 Verificando endpoints del backend...${NC}"

if curl -s http://localhost:3001/health > /dev/null; then
    echo -e "${GREEN}✅ Backend health check: OK${NC}"
    
    # Verificar endpoint de novedades
    if curl -s http://localhost:3001/api/novedades > /dev/null; then
        echo -e "${GREEN}✅ Endpoint /api/novedades: OK${NC}"
    else
        echo -e "${RED}❌ Endpoint /api/novedades: ERROR${NC}"
    fi
    
    # Verificar endpoint de auth
    if curl -s -X POST http://localhost:3001/api/auth/login -H "Content-Type: application/json" -d '{"email":"test","password":"test"}' > /dev/null; then
        echo -e "${GREEN}✅ Endpoint /api/auth/login: OK${NC}"
    else
        echo -e "${RED}❌ Endpoint /api/auth/login: ERROR${NC}"
    fi
else
    echo -e "${RED}❌ Backend no responde en http://localhost:3001${NC}"
fi

echo ""

# Verificar frontend
echo -e "${YELLOW}🌐 Verificando frontend...${NC}"

if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ Frontend está ejecutándose en http://localhost:3000${NC}"
else
    echo -e "${RED}❌ Frontend no responde en http://localhost:3000${NC}"
fi

echo ""

# Verificar base de datos
echo -e "${YELLOW}🗄️  Verificando base de datos...${NC}"

if docker exec md-publicidades-postgres psql -U postgres -d md_publicidades -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Conexión a PostgreSQL: OK${NC}"
    
    # Verificar si las tablas existen
    if docker exec md-publicidades-postgres psql -U postgres -d md_publicidades -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';" | grep -q "novedad"; then
        echo -e "${GREEN}✅ Tabla 'novedad' existe${NC}"
    else
        echo -e "${RED}❌ Tabla 'novedad' no existe${NC}"
        echo -e "${YELLOW}💡 Ejecuta: npm run db:push --workspace=backend${NC}"
    fi
    
    if docker exec md-publicidades-postgres psql -U postgres -d md_publicidades -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';" | grep -q "admin"; then
        echo -e "${GREEN}✅ Tabla 'admin' existe${NC}"
    else
        echo -e "${RED}❌ Tabla 'admin' no existe${NC}"
        echo -e "${YELLOW}💡 Ejecuta: npm run db:push --workspace=backend${NC}"
    fi
else
    echo -e "${RED}❌ No se puede conectar a PostgreSQL${NC}"
fi

echo ""

# Resumen y recomendaciones
echo -e "${BLUE}📋 Resumen y recomendaciones:${NC}"
echo ""

if check_port 3000 "Frontend" && check_port 3001 "Backend" && check_port 5432 "PostgreSQL"; then
    echo -e "${GREEN}🎉 Todos los servicios están ejecutándose correctamente${NC}"
    echo ""
    echo -e "${BLUE}🔗 URLs disponibles:${NC}"
    echo -e "   Frontend: http://localhost:3000"
    echo -e "   Backend: http://localhost:3001"
    echo -e "   Health Check: http://localhost:3001/health"
    echo ""
    echo -e "${BLUE}🔑 Para acceder al admin:${NC}"
    echo -e "   1. Ve a: http://localhost:3000/admin/login"
    echo -e "   2. Usa las credenciales del archivo .env"
    echo ""
    echo -e "${YELLOW}⚠️  Si no puedes navegar a /admin/novedades/nueva:${NC}"
    echo -e "   1. Verifica que estés autenticado como admin"
    echo -e "   2. Revisa la consola del navegador (F12)"
    echo -e "   3. Verifica que el token esté en localStorage"
else
    echo -e "${RED}❌ Algunos servicios no están ejecutándose${NC}"
    echo ""
    echo -e "${YELLOW}🚀 Para iniciar los servicios:${NC}"
    echo -e "   npm run dev"
    echo ""
    echo -e "${YELLOW}🐳 Para iniciar solo la base de datos:${NC}"
    echo -e "   docker-compose up postgres -d"
fi

