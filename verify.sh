#!/bin/bash
# 🔍 Script de Verificación - Sesión 1

echo "🔍 Verificando Proyecto Riesgos C4C - Sesión 1"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contadores
passed=0
failed=0

# Función de verificación
check() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((passed++))
    else
        echo -e "${RED}✗${NC} $2"
        ((failed++))
    fi
}

# 1. Verificar archivos de configuración
echo "📦 Verificando archivos de configuración..."
[ -f "package.json" ]; check $? "package.json existe"
[ -f "vite.config.ts" ]; check $? "vite.config.ts existe"
[ -f "tsconfig.json" ]; check $? "tsconfig.json existe"
[ -f "tailwind.config.js" ]; check $? "tailwind.config.js existe"
echo ""

# 2. Verificar estructura src/
echo "📂 Verificando estructura src/..."
[ -d "src/types" ]; check $? "src/types/ existe"
[ -d "src/config" ]; check $? "src/config/ existe"
[ -d "src/lib" ]; check $? "src/lib/ existe"
[ -d "src/store" ]; check $? "src/store/ existe"
echo ""

# 3. Verificar tipos
echo "🎯 Verificando tipos TypeScript..."
[ -f "src/types/odata.types.ts" ]; check $? "odata.types.ts existe"
[ -f "src/types/risk.types.ts" ]; check $? "risk.types.ts existe"
[ -f "src/types/party.types.ts" ]; check $? "party.types.ts existe"
[ -f "src/types/customer.types.ts" ]; check $? "customer.types.ts existe"
echo ""

# 4. Verificar configuración
echo "⚙️  Verificando archivos de config..."
[ -f "src/config/collections.ts" ]; check $? "collections.ts existe"
[ -f "src/config/roles.ts" ]; check $? "roles.ts existe"
[ -f "src/config/constants.ts" ]; check $? "constants.ts existe"
echo ""

# 5. Verificar helpers
echo "🛠️  Verificando helpers..."
[ -f "src/lib/odata.ts" ]; check $? "odata.ts existe"
echo ""

# 6. Verificar stores
echo "🗄️  Verificando stores..."
[ -f "src/store/auth.ts" ]; check $? "auth.ts existe"
[ -f "src/store/ui.ts" ]; check $? "ui.ts existe"
echo ""

# 7. Verificar archivos base
echo "🎨 Verificando archivos base..."
[ -f "src/main.tsx" ]; check $? "main.tsx existe"
[ -f "src/index.css" ]; check $? "index.css existe"
[ -f "index.html" ]; check $? "index.html existe"
echo ""

# 8. Verificar documentación
echo "📚 Verificando documentación..."
[ -f "README.md" ]; check $? "README.md existe"
[ -f "CHECKPOINT_SESION_1.md" ]; check $? "CHECKPOINT_SESION_1.md existe"
echo ""

# 9. Verificar node_modules
echo "📦 Verificando instalación..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules existe (dependencias instaladas)"
    ((passed++))
else
    echo -e "${YELLOW}⚠${NC} node_modules no existe (ejecutar: npm install)"
fi
echo ""

# Resumen
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMEN:"
echo -e "   ${GREEN}Pasadas:${NC} $passed"
if [ $failed -gt 0 ]; then
    echo -e "   ${RED}Fallidas:${NC} $failed"
fi
echo ""

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}✅ Sesión 1 verificada correctamente${NC}"
    echo ""
    echo "Siguiente paso:"
    echo "1. npm install (si no lo has hecho)"
    echo "2. npm run dev"
    echo "3. Abrir http://localhost:3000"
    exit 0
else
    echo -e "${RED}❌ Hay archivos faltantes${NC}"
    echo ""
    echo "Revisa los archivos marcados con ✗"
    exit 1
fi
