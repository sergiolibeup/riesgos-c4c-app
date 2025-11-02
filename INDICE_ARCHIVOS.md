# 📑 ÍNDICE DE ARCHIVOS - Sesión 1

## 📊 Estadísticas
- **Total archivos**: 26 archivos
- **Líneas TypeScript**: ~1,192 líneas
- **Tiempo estimado**: 40 minutos
- **Estado**: ✅ Completada

---

## 📁 Estructura Completa

### 📄 Raíz del Proyecto
```
├── 📘 README.md                    # Documentación principal del proyecto
├── 📋 CHECKPOINT_SESION_1.md       # Lista de verificación del checkpoint
├── 📊 RESUMEN_SESION_1.md          # Resumen ejecutivo de la sesión
├── 🚀 INICIO_RAPIDO.md             # Guía rápida de inicio
├── 📑 INDICE_ARCHIVOS.md           # Este archivo
│
├── 🌐 index.html                   # HTML principal
├── 📦 package.json                 # Dependencias y scripts npm
├── ⚙️ vite.config.ts               # Configuración de Vite
├── 📝 tsconfig.json                # Configuración TypeScript principal
├── 📝 tsconfig.node.json           # Configuración TypeScript para Node
├── 🎨 tailwind.config.js           # Configuración Tailwind CSS
├── 🔧 postcss.config.js            # Configuración PostCSS
├── 🚫 .gitignore                   # Archivos ignorados por Git
└── 🔐 .env.example                 # Variables de entorno ejemplo
```

### 📂 src/ - Código Fuente

#### 🎯 src/types/ - Definiciones TypeScript (35+ interfaces)
```
├── odata.types.ts          # 300+ líneas
│   ├── ODataResponse<T>
│   ├── ODataSingleResponse<T>
│   ├── ODataEntity
│   ├── ODataQueryOptions
│   ├── FilterCondition
│   ├── ExpandRelation
│   └── ODataConfig
│
├── risk.types.ts           # 150+ líneas
│   ├── RiesgoTotal
│   ├── RiesgoClienteRoot
│   ├── RiesgoClienteDetalle
│   ├── RiesgoKYMRoot
│   └── NivelRiesgo (enum)
│
├── party.types.ts          # 100+ líneas
│   ├── Party
│   ├── ServiceRequest
│   ├── BusinessTransactionDocumentReference
│   ├── ZIDESearchResult
│   └── PartyRole (enum)
│
└── customer.types.ts       # 150+ líneas
    ├── IndividualCustomer
    ├── CorporateAccount
    ├── DowJonesAccount
    ├── IndividualValues
    ├── CorporateValues
    └── FieldMapping
```

#### ⚙️ src/config/ - Configuración (70+ constantes)
```
├── collections.ts          # 50+ líneas
│   ├── COLLECTIONS (15 colecciones)
│   └── DEFAULT_COLLECTIONS
│
├── roles.ts                # 50+ líneas
│   ├── DEFAULT_ROLE_CODES
│   ├── ROLE_CONFIGURATIONS
│   └── Helper functions (3)
│
└── constants.ts            # 130+ líneas
    ├── DEFAULT_TENANT
    ├── ODATA_BASE_PATH
    ├── ODATA_HEADERS
    ├── DOCUMENT_TYPE_CODES
    ├── PROCESSING_TYPE_CODES
    ├── PAGINATION
    ├── TIMEOUTS
    ├── MESSAGES
    └── RISK_LEVELS
```

#### 🛠️ src/lib/ - Helpers y Utilidades
```
└── odata.ts                # 260+ líneas
    ├── buildBase()         # Construir URL base
    ├── odataFetch()        # Fetch con auth
    ├── buildFilter()       # Construir $filter
    ├── buildSelect()       # Construir $select
    ├── buildExpand()       # Construir $expand
    ├── buildMultiValueFilter()
    ├── testConnection()    # Test de conexión
    └── Helpers internos (3)
```

#### 🗄️ src/store/ - Estado Global (Zustand)
```
├── auth.ts                 # 100+ líneas
│   ├── AuthState
│   │   ├── tenant
│   │   ├── username
│   │   ├── password
│   │   └── isAuthenticated
│   └── AuthActions (6 métodos)
│       ├── setCredentials()
│       ├── setTenant()
│       ├── setUsername()
│       ├── setPassword()
│       ├── clearCredentials()
│       └── hasCredentials()
│
└── ui.ts                   # 120+ líneas
    ├── UIState
    │   ├── loading
    │   ├── loadingMessage
    │   ├── error
    │   └── toasts[]
    └── UIActions (9 métodos)
        ├── setLoading()
        ├── setError()
        ├── clearError()
        ├── addToast()
        ├── removeToast()
        ├── clearToasts()
        ├── showSuccess()
        ├── showError()
        ├── showWarning()
        └── showInfo()
```

#### 🎨 src/ - Archivos Base
```
├── main.tsx                # Entry point React
├── index.css               # Estilos Tailwind + custom
└── (componentes/)          # Pendiente Sesión 2-4
└── (pages/)                # Pendiente Sesión 5
```

---

## 🔍 Detalles por Archivo

### 📦 package.json
**Dependencias principales:**
- react: 18.3.1
- react-dom: 18.3.1
- zustand: 4.5.2
- @tanstack/react-table: 8.13.2
- xlsx: 0.18.5

**DevDependencies:**
- typescript: 5.4.5
- vite: 5.2.10
- tailwindcss: 3.4.3

**Scripts:**
- `dev` - Desarrollo
- `build` - Producción
- `preview` - Preview build

### 🎯 src/types/odata.types.ts
**Interfaces (10):**
1. ODataResponse<T>
2. ODataSingleResponse<T>
3. ODataEntity
4. ODataMetadata
5. ODataQueryOptions
6. FilterCondition
7. ExpandRelation
8. ODataConfig
9. ODataError

**Uso:** Base para todas las peticiones OData

### 🎯 src/types/risk.types.ts
**Interfaces (8):**
1. RiesgoTotal
2. RiesgoAutomaticoItem
3. RiesgoClienteRoot
4. RiesgoClienteAutomaticoItem
5. RiesgoClienteDetalle
6. RiesgoClienteCompleto
7. RiesgoKYMRoot
8. RiesgoLevel

**Enums (1):**
- NivelRiesgo (BAJO, MEDIO, ALTO, MUY_ALTO)

**Uso:** Tipos para las 3 colecciones de riesgo

### 🎯 src/types/party.types.ts
**Interfaces (6):**
1. Party
2. ServiceRequest
3. BusinessTransactionDocumentReference
4. ZIDESearchResult
5. RoleConfig

**Enums (1):**
- PartyRole (1001, Z018, Z031, Z050)

**Uso:** Tipos para parties y service requests

### 🎯 src/types/customer.types.ts
**Interfaces (11):**
1. IndividualCustomer
2. DowJonesAccount
3. ClientSituation
4. IndividualValues
5. CorporateAccount
6. CorporateAccountAddress
7. CorporateValues
8. FieldMapping

**Types (1):**
- CustomerType ('individual' | 'corporate')

**Uso:** Tipos para clientes y valores fuente

### ⚙️ src/config/collections.ts
**Constantes:**
- COLLECTIONS (objeto con 15 colecciones)
- DEFAULT_COLLECTIONS (array de 6)

**Type:**
- CollectionName

**Uso:** Nombres de todas las colecciones OData

### ⚙️ src/config/roles.ts
**Constantes:**
- DEFAULT_ROLE_CODES (array de 4)
- ROLE_CONFIGURATIONS (objeto con 4 roles)

**Funciones (3):**
- getRoleConfig()
- getRoleText()
- isValidRole()

**Uso:** Configuración y helpers de roles

### ⚙️ src/config/constants.ts
**Constantes (40+):**
- DEFAULT_TENANT
- ODATA_BASE_PATH
- TENANT_DOMAIN_SUFFIX
- ODATA_HEADERS
- DOCUMENT_TYPE_CODES
- PROCESSING_TYPE_CODES
- DEFAULT_TIMEZONE
- DATE_FORMAT
- PAGINATION
- TIMEOUTS
- MESSAGES (10 mensajes)
- RISK_LEVELS (4 niveles)

**Uso:** Constantes globales de la aplicación

### 🛠️ src/lib/odata.ts
**Funciones públicas (7):**
1. buildBase(tenant) → string
2. odataFetch<T>(...) → Promise<T>
3. buildFilter(conditions, operator?) → string
4. buildSelect(fields) → string
5. buildExpand(relations) → string
6. buildMultiValueFilter(field, values) → string
7. testConnection(...) → Promise<boolean>

**Funciones privadas (2):**
- buildAuthHeaders()
- buildQueryString()

**Características:**
- Timeout configurable
- Error handling completo
- Type-safe
- Soporte Basic Auth

**Uso:** Core del acceso a OData

### 🗄️ src/store/auth.ts
**Estado (4 propiedades):**
- tenant: string
- username: string
- password: string
- isAuthenticated: boolean

**Métodos (6):**
- setCredentials()
- setTenant()
- setUsername()
- setPassword()
- clearCredentials()
- hasCredentials()

**Características:**
- Persistencia parcial (solo tenant)
- Validación automática de isAuthenticated
- Selectores útiles (2)

**Uso:** Gestión de credenciales

### 🗄️ src/store/ui.ts
**Estado (4 propiedades):**
- loading: boolean
- loadingMessage: string
- error: string | null
- toasts: Toast[]

**Métodos (9):**
- setLoading()
- setError()
- clearError()
- addToast()
- removeToast()
- clearToasts()
- showSuccess()
- showError()
- showWarning()
- showInfo()

**Tipos (2):**
- ToastType
- Toast interface

**Características:**
- Auto-dismiss de toasts
- IDs únicos
- Duraciones configurables

**Uso:** Gestión de UI y notificaciones

---

## 🔗 Relaciones Entre Archivos

```
main.tsx
  └── index.css (Tailwind)

Componentes (Sesión 2-4) usarán:
  ├── types/
  │   ├── odata.types.ts
  │   ├── risk.types.ts
  │   ├── party.types.ts
  │   └── customer.types.ts
  ├── config/
  │   ├── collections.ts
  │   ├── roles.ts
  │   └── constants.ts
  ├── lib/
  │   └── odata.ts
  └── store/
      ├── auth.ts
      └── ui.ts
```

---

## 📈 Métricas de Código

```
Archivo                     Líneas  Complejidad
────────────────────────────────────────────────
odata.types.ts               ~300   Baja (types)
risk.types.ts                ~150   Baja (types)
party.types.ts               ~100   Baja (types)
customer.types.ts            ~150   Baja (types)
collections.ts                ~50   Baja (config)
roles.ts                      ~50   Baja (config)
constants.ts                 ~130   Baja (config)
odata.ts                     ~260   Media (lógica)
auth.ts                      ~100   Media (store)
ui.ts                        ~120   Media (store)
────────────────────────────────────────────────
TOTAL TypeScript:          ~1,192
```

---

## 🎯 Archivos Clave por Funcionalidad

### Para hacer peticiones OData:
1. `src/lib/odata.ts` - Funciones principales
2. `src/types/odata.types.ts` - Tipos
3. `src/config/collections.ts` - Nombres
4. `src/store/auth.ts` - Credenciales

### Para trabajar con riesgos:
1. `src/types/risk.types.ts` - Tipos
2. `src/config/constants.ts` - RISK_LEVELS

### Para trabajar con parties:
1. `src/types/party.types.ts` - Tipos
2. `src/config/roles.ts` - Roles configurados

### Para mostrar notificaciones:
1. `src/store/ui.ts` - Store de UI
2. `useUIStore` - Hook de acceso

---

## 🔄 Próximos Archivos (Sesión 2)

Pendientes de crear:
```
src/components/
  ├── ConnectionForm.tsx
  ├── TenantConfig.tsx
  ├── RolesConfig.tsx
  └── OpportunityPicker.tsx

src/lib/
  ├── docflow.ts
  └── validation.ts

src/store/
  └── data.ts
```

---

## 📚 Referencias Rápidas

**Leer primero:**
1. INICIO_RAPIDO.md
2. README.md
3. CHECKPOINT_SESION_1.md

**Para desarrollo:**
1. src/types/ - Ver interfaces
2. src/lib/odata.ts - Ver funciones
3. src/config/ - Ver constantes

**Para debugging:**
1. src/store/ui.ts - Logs y errors
2. src/store/auth.ts - Credenciales

---

**Generado**: 02 Nov 2025  
**Sesión**: 1 de 5  
**Estado**: ✅ Completada
