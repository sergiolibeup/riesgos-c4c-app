# 🌳 ESTRUCTURA DEL PROYECTO

```
riesgos-c4c-app/
│
├── 📚 Documentación (5 archivos)
│   ├── 📘 README.md                    [4.1 KB] Documentación completa
│   ├── ✅ CHECKPOINT_SESION_1.md       [4.0 KB] Verificación sesión
│   ├── 📊 RESUMEN_SESION_1.md          [6.8 KB] Resumen ejecutivo
│   ├── 🚀 INICIO_RAPIDO.md             [2.5 KB] Guía rápida
│   └── 📑 INDICE_ARCHIVOS.md           [8.0 KB] Índice completo
│
├── ⚙️ Configuración Base (9 archivos)
│   ├── 📦 package.json                 [798 B]  NPM dependencies
│   ├── 🔧 vite.config.ts               [380 B]  Vite config
│   ├── 📝 tsconfig.json                [696 B]  TypeScript main
│   ├── 📝 tsconfig.node.json           [213 B]  TypeScript node
│   ├── 🎨 tailwind.config.js           [501 B]  Tailwind CSS
│   ├── 🔄 postcss.config.js            [80 B]   PostCSS
│   ├── 🌐 index.html                   [382 B]  HTML principal
│   ├── 🚫 .gitignore                   [400 B]  Git ignore
│   └── 🔐 .env.example                 [250 B]  Variables ejemplo
│
└── 📂 src/ (Código Fuente)
    │
    ├── 🎨 Archivos Base (2 archivos)
    │   ├── main.tsx                    [600 B]  Entry point
    │   └── index.css                   [1.2 KB] Estilos base
    │
    ├── 🎯 types/ (Tipos TypeScript - 4 archivos, ~700 líneas)
    │   ├── odata.types.ts              [~300 líneas] 10 interfaces OData
    │   ├── risk.types.ts               [~150 líneas] 8 interfaces Riesgo
    │   ├── party.types.ts              [~100 líneas] 6 interfaces Party
    │   └── customer.types.ts           [~150 líneas] 11 interfaces Cliente
    │
    ├── ⚙️ config/ (Configuración - 3 archivos, ~230 líneas)
    │   ├── collections.ts              [~50 líneas] 15 colecciones OData
    │   ├── roles.ts                    [~50 líneas] 4 roles + helpers
    │   └── constants.ts                [~130 líneas] 40+ constantes
    │
    ├── 🛠️ lib/ (Helpers - 1 archivo, ~260 líneas)
    │   └── odata.ts                    [~260 líneas] 8 funciones OData
    │
    └── 🗄️ store/ (Estado Zustand - 2 archivos, ~220 líneas)
        ├── auth.ts                     [~100 líneas] Store autenticación
        └── ui.ts                       [~120 líneas] Store UI


📊 RESUMEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total archivos:     27
Archivos código:    12 (.ts/.tsx/.css)
Configuración:      9
Documentación:      5
HTML:               1

Líneas TypeScript:  ~1,192 líneas
Líneas CSS:         ~50 líneas
Total líneas:       ~1,242 líneas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


🎯 DISTRIBUCIÓN POR CATEGORÍA:

Types (4 archivos)
├── OData:      300 líneas  ████████████████
├── Risk:       150 líneas  ████████
├── Party:      100 líneas  █████
└── Customer:   150 líneas  ████████
                ──────────
                700 líneas

Config (3 archivos)
├── Collections: 50 líneas  ███
├── Roles:       50 líneas  ███
└── Constants:  130 líneas  ███████
                ──────────
                230 líneas

Lib (1 archivo)
└── OData:      260 líneas  ██████████████

Store (2 archivos)
├── Auth:       100 líneas  █████
└── UI:         120 líneas  ██████
                ──────────
                220 líneas


📦 DEPENDENCIAS INSTALADAS:

Runtime:
  ├── react@18.3.1
  ├── react-dom@18.3.1
  ├── zustand@4.5.2
  ├── @tanstack/react-table@8.13.2
  └── xlsx@0.18.5

Development:
  ├── typescript@5.4.5
  ├── vite@5.2.10
  ├── tailwindcss@3.4.3
  ├── @types/react@18.3.1
  └── @vitejs/plugin-react@4.2.1


🔑 ARCHIVOS CLAVE:

1️⃣  src/lib/odata.ts
    → Core del acceso OData
    → 8 funciones principales
    → Manejo de errores y timeouts

2️⃣  src/types/odata.types.ts
    → Base de todos los tipos
    → 10 interfaces fundamentales

3️⃣  src/store/auth.ts
    → Gestión de credenciales
    → Persistencia parcial

4️⃣  src/store/ui.ts
    → Estado de UI
    → Sistema de toasts

5️⃣  src/config/constants.ts
    → 40+ constantes configurables
    → URLs, mensajes, colores


🚀 COMANDOS DISPONIBLES:

npm install     → Instalar dependencias
npm run dev     → Desarrollo (port 3000)
npm run build   → Build producción
npm run preview → Preview build


✅ SIGUIENTE SESIÓN:

Sesión 2 creará:
├── components/
│   ├── ConnectionForm.tsx
│   ├── TenantConfig.tsx
│   ├── RolesConfig.tsx
│   └── OpportunityPicker.tsx
├── lib/
│   ├── docflow.ts
│   └── validation.ts
└── store/
    └── data.ts

Estimado: ~500 líneas adicionales
```

---

**Estado Actual**: Sesión 1 ✅ COMPLETADA  
**Progreso**: 20% del proyecto total (1/5 sesiones)  
**Listo para**: Sesión 2 - Conexión y Búsqueda
