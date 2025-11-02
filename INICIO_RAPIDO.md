# 🚀 INICIO RÁPIDO - Sesión 1

## ⚡ 3 Pasos para Comenzar

### 1️⃣ Instalar
```bash
npm install
```

### 2️⃣ Desarrollar
```bash
npm run dev
```
→ Abre http://localhost:3000

### 3️⃣ Verificar
Debes ver: **"✅ Sesión 1 completada: Fundamentos y Configuración"**

---

## 📦 ¿Qué hay en este proyecto?

```
✅ Tipos TypeScript completos (OData, Risk, Party, Customer)
✅ Helper OData con 8 funciones
✅ Stores Zustand (auth + ui)
✅ Configuración completa (collections, roles, constants)
```

---

## 🧪 Prueba los Helpers (opcional)

Abre la consola del navegador (F12) y prueba:

```javascript
// Importar helpers (en el código fuente)
import { buildBase, buildFilter, buildSelect, buildExpand } from './src/lib/odata';

// Test 1: URL base
console.log(buildBase('my362429'));
// → https://my362429.crm.ondemand.com/sap/c4c/odata/v1/c4codataapi/

// Test 2: Filtro
console.log(buildFilter([
  { field: 'ID', operator: 'eq', value: '12345' }
]));
// → ID eq '12345'
```

---

## 📚 Scripts Disponibles

```bash
npm run dev      # Desarrollo (puerto 3000)
npm run build    # Build producción
npm run preview  # Preview del build
npm run lint     # Linter (si configurado)
```

---

## ✅ Checklist

Antes de continuar a Sesión 2, verifica:

- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` arranca correctamente
- [ ] Página carga en http://localhost:3000
- [ ] No hay errores en consola
- [ ] Mensaje de "Sesión 1 completada" visible

---

## 🔄 ¿Qué Sigue?

**Sesión 2**: Componentes de Conexión y Búsqueda

1. NUEVA conversación con Claude
2. Subir archivos de Sesión 1
3. Usar prompt de Sesión 2
4. Generar: ConnectionForm, OpportunityPicker, docflow.ts

---

## 📖 Documentación Completa

- `README.md` - Documentación principal
- `CHECKPOINT_SESION_1.md` - Verificación detallada
- `RESUMEN_SESION_1.md` - Resumen ejecutivo

---

## 🐛 ¿Problemas?

### Error: "Cannot find module 'react'"
→ `npm install`

### Error en TypeScript
→ `npm run build` para ver detalles

### Puerto 3000 ocupado
→ Cambiar en `vite.config.ts`: `server: { port: 3001 }`

---

## 💡 Configuración OData

**Tenant por defecto**: `my362429`  
**Base URL**: Se construye automáticamente  
**Colecciones**: 15 colecciones pre-configuradas  
**Roles**: 4 roles por defecto

---

## 🎯 Estado

- ✅ Sesión 1: Fundamentos (COMPLETADA)
- ⏳ Sesión 2: Conexión y Búsqueda
- ⏳ Sesión 3: Riesgo y Parties
- ⏳ Sesión 4: Valores Fuente
- ⏳ Sesión 5: Integración Final

---

**¡Todo listo para empezar!** 🚀
