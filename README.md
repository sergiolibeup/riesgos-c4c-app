# Riesgos C4C - Aplicación de Gestión de Riesgos

Aplicación web para la gestión de riesgos integrada con SAP Cloud for Customer (C4C).

## 📋 Estado del Proyecto

### ✅ Sesión 1 Completada: Fundamentos y Configuración

La infraestructura base está implementada:

- ✅ Configuración del proyecto (package.json, vite, typescript, tailwind)
- ✅ Tipos TypeScript (odata, risk, party, customer)
- ✅ Configuración (collections, roles, constants)
- ✅ Helper OData completo
- ✅ Stores Zustand (auth, ui)

### 🔄 Pendiente (Sesiones 2-5)

- ⏳ Sesión 2: Componentes de Conexión y Búsqueda
- ⏳ Sesión 3: Componentes de Riesgo y Parties
- ⏳ Sesión 4: Valores Fuente y Cálculos
- ⏳ Sesión 5: Integración Final y Deployment

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 🏗️ Estructura del Proyecto

```
riesgos-c4c-app/
├── src/
│   ├── types/              # Definiciones TypeScript
│   │   ├── odata.types.ts
│   │   ├── risk.types.ts
│   │   ├── party.types.ts
│   │   └── customer.types.ts
│   ├── config/             # Configuración
│   │   ├── collections.ts
│   │   ├── roles.ts
│   │   └── constants.ts
│   ├── lib/                # Helpers y utilidades
│   │   └── odata.ts
│   ├── store/              # Zustand stores
│   │   ├── auth.ts
│   │   └── ui.ts
│   ├── components/         # (Sesión 2-4)
│   ├── pages/              # (Sesión 5)
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🔧 Configuración de C4C

### Tenant por defecto
- Tenant: `my362429`
- Base URL: `https://my362429.crm.ondemand.com/sap/c4c/odata/v1/c4codataapi/`

### Autenticación
- Tipo: Basic Authentication
- Las credenciales se configuran en la aplicación (no persistidas por seguridad)

### Colecciones OData utilizadas
- `ServiceRequestBusinessTransactionDocumentReferenceCollection`
- `ServiceRequestPartyCollection`
- `BO_RiesgoAsesoriamientoRootCollection`
- `BO_RiesgoCustomerRootCollection`
- `BO_RiesgoCustomerRiesgosClienteCollection`
- `BO_RiesgoCustomerKYMRootCollection`

### Roles configurados
- `1001` - Solicitante
- `Z018` - Cliente
- `Z031` - Representante Legal
- `Z050` - Beneficiario Final

## 📚 Tecnologías

- **React 18** - Framework UI
- **TypeScript 5** - Tipado estático
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Estilos
- **Zustand 4** - State management
- **TanStack Table 8** - Tablas de datos
- **XLSX** - Exportación Excel

## 🔐 Seguridad

- Las credenciales NO se persisten en localStorage
- Solo el tenant se guarda localmente
- Basic Auth con HTTPS obligatorio en producción
- Timeout de 30s en peticiones API

## 📝 Notas

- El proyecto está dividido en 5 sesiones para evitar pérdida de contexto
- Cada sesión tiene un alcance específico y un checkpoint
- La Sesión 1 NO incluye componentes React ni páginas
- Los componentes se implementarán en las sesiones 2-5

## 🐛 Checkpoint Sesión 1

Para verificar que la sesión 1 está correcta:

```bash
# 1. Instalar dependencias
npm install

# 2. Verificar que no hay errores de TypeScript
npm run build

# 3. Iniciar desarrollo (debe arrancar sin errores)
npm run dev

# 4. Verificar en consola del navegador que los stores funcionan:
# > import { useAuthStore } from './src/store/auth'
# > useAuthStore.getState()
```

### ✅ Criterios de éxito:
- [ ] Proyecto arranca con `npm run dev`
- [ ] No hay errores de TypeScript
- [ ] Store de auth funciona en consola del navegador
- [ ] Página muestra mensaje de "Sesión 1 completada"

## 📞 Soporte

Este proyecto es parte de un desarrollo incremental en 5 sesiones.
Consultar `PLAN_IMPLEMENTACION.md` para el plan completo.

---

**Última actualización**: Sesión 1 - Fundamentos y Configuración
