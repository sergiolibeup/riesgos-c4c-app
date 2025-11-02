# 🧭 GUÍA DE NAVEGACIÓN - Sesión 1

## 📍 Estás aquí: Sesión 1 COMPLETADA ✅

```
[●━━━━━━━━━━] 20%

✅ Sesión 1: Fundamentos         (COMPLETADA)
⏳ Sesión 2: Conexión y Búsqueda (Pendiente)
⏳ Sesión 3: Riesgo y Parties    (Pendiente)
⏳ Sesión 4: Valores Fuente       (Pendiente)
⏳ Sesión 5: Integración Final   (Pendiente)
```

---

## 🎯 ¿QUÉ HACER AHORA?

### 👉 Si es tu PRIMERA VEZ:
**Empieza aquí**: [`INICIO_RAPIDO.md`](./INICIO_RAPIDO.md)
- Instalación en 3 pasos
- Verificación básica
- Scripts disponibles

### 👉 Si quieres VER TODO:
**Lee esto**: [`ESTRUCTURA.md`](./ESTRUCTURA.md)
- Árbol visual del proyecto
- Distribución de archivos
- Métricas de código

### 👉 Si buscas un ARCHIVO específico:
**Usa esto**: [`INDICE_ARCHIVOS.md`](./INDICE_ARCHIVOS.md)
- Índice completo de 29 archivos
- Descripción de cada uno
- Relaciones entre archivos

### 👉 Si quieres VERIFICAR:
**Sigue esto**: [`CHECKPOINT_SESION_1.md`](./CHECKPOINT_SESION_1.md)
- Lista de verificación completa
- Criterios de éxito
- Comandos de prueba

### 👉 Si quieres el RESUMEN:
**Lee esto**: [`RESUMEN_SESION_1.md`](./RESUMEN_SESION_1.md)
- Resumen ejecutivo
- Estadísticas
- Próximos pasos

### 👉 Si quieres la DOCUMENTACIÓN COMPLETA:
**Lee esto**: [`README.md`](./README.md)
- Documentación principal
- Guía de instalación
- Arquitectura del proyecto

---

## 📂 NAVEGACIÓN RÁPIDA POR CÓDIGO

### Quiero ver los TIPOS:
```
src/types/
├── odata.types.ts      ← Tipos base OData
├── risk.types.ts       ← Tipos de riesgo
├── party.types.ts      ← Tipos de parties
└── customer.types.ts   ← Tipos de clientes
```

### Quiero ver la CONFIGURACIÓN:
```
src/config/
├── collections.ts      ← 15 colecciones OData
├── roles.ts            ← 4 roles + helpers
└── constants.ts        ← 40+ constantes
```

### Quiero ver los HELPERS:
```
src/lib/
└── odata.ts            ← 8 funciones OData
```

### Quiero ver los STORES:
```
src/store/
├── auth.ts             ← Gestión de credenciales
└── ui.ts               ← Estado de UI + toasts
```

---

## 🚀 COMANDOS RÁPIDOS

```bash
# Verificar instalación
./verify.sh

# Instalar
npm install

# Desarrollar
npm run dev

# Build
npm run build
```

---

## 🔍 BUSCAR INFORMACIÓN

### "¿Cómo funciona el filtro OData?"
→ [`src/lib/odata.ts`](./src/lib/odata.ts) - Función `buildFilter()`
→ [`src/types/odata.types.ts`](./src/types/odata.types.ts) - Interface `FilterCondition`

### "¿Qué colecciones hay disponibles?"
→ [`src/config/collections.ts`](./src/config/collections.ts) - Constante `COLLECTIONS`

### "¿Qué roles existen?"
→ [`src/config/roles.ts`](./src/config/roles.ts) - Constante `ROLE_CONFIGURATIONS`

### "¿Cómo se guardan las credenciales?"
→ [`src/store/auth.ts`](./src/store/auth.ts) - Store de autenticación

### "¿Cómo muestro un toast?"
→ [`src/store/ui.ts`](./src/store/ui.ts) - Métodos `showSuccess()`, `showError()`, etc.

### "¿Cuál es el tenant por defecto?"
→ [`src/config/constants.ts`](./src/config/constants.ts) - Constante `DEFAULT_TENANT`

---

## 📚 DOCUMENTACIÓN POR ROL

### 🧑‍💻 Si eres DESARROLLADOR:
**Orden recomendado:**
1. [`INICIO_RAPIDO.md`](./INICIO_RAPIDO.md) - Setup básico
2. [`ESTRUCTURA.md`](./ESTRUCTURA.md) - Ver organización
3. [`src/types/`](./src/types/) - Entender tipos
4. [`src/lib/odata.ts`](./src/lib/odata.ts) - Ver funciones
5. [`README.md`](./README.md) - Documentación completa

### 👨‍💼 Si eres PROJECT MANAGER:
**Orden recomendado:**
1. [`RESUMEN_SESION_1.md`](./RESUMEN_SESION_1.md) - Resumen ejecutivo
2. [`CHECKPOINT_SESION_1.md`](./CHECKPOINT_SESION_1.md) - Estado
3. [`ESTRUCTURA.md`](./ESTRUCTURA.md) - Métricas

### 🧪 Si eres TESTER:
**Orden recomendado:**
1. [`CHECKPOINT_SESION_1.md`](./CHECKPOINT_SESION_1.md) - Criterios de prueba
2. [`verify.sh`](./verify.sh) - Script de verificación
3. [`README.md`](./README.md) - Setup del entorno

### 📖 Si eres TÉCNICO de C4C:
**Orden recomendado:**
1. [`src/config/collections.ts`](./src/config/collections.ts) - Colecciones
2. [`src/lib/odata.ts`](./src/lib/odata.ts) - Cómo se accede a OData
3. [`src/types/`](./src/types/) - Estructura de datos

---

## 🎯 CASOS DE USO

### Caso: "Quiero añadir una nueva colección"
1. Editar [`src/config/collections.ts`](./src/config/collections.ts)
2. Añadir en `COLLECTIONS`
3. Actualizar `DEFAULT_COLLECTIONS` si es necesario

### Caso: "Quiero añadir un nuevo rol"
1. Editar [`src/config/roles.ts`](./src/config/roles.ts)
2. Añadir en `ROLE_CONFIGURATIONS`
3. Actualizar `DEFAULT_ROLE_CODES`

### Caso: "Quiero cambiar el tenant por defecto"
1. Editar [`src/config/constants.ts`](./src/config/constants.ts)
2. Cambiar `DEFAULT_TENANT`
3. O usar archivo `.env` (ver `.env.example`)

### Caso: "Quiero añadir más constantes"
1. Editar [`src/config/constants.ts`](./src/config/constants.ts)
2. Añadir en la sección correspondiente

### Caso: "Quiero entender un tipo"
1. Ir a [`src/types/`](./src/types/)
2. Buscar la interface
3. Ver la documentación JSDoc

---

## ⚡ ATAJOS

| Necesito...                  | Ve a...                          |
|------------------------------|----------------------------------|
| 🚀 Empezar rápido            | `INICIO_RAPIDO.md`               |
| 📊 Ver estadísticas          | `RESUMEN_SESION_1.md`            |
| 🌳 Ver estructura            | `ESTRUCTURA.md`                  |
| 📑 Buscar archivo            | `INDICE_ARCHIVOS.md`             |
| ✅ Verificar todo            | `CHECKPOINT_SESION_1.md`         |
| 📘 Documentación completa    | `README.md`                      |
| 🔍 Script de verificación    | `verify.sh`                      |
| 🎯 Tipos OData               | `src/types/odata.types.ts`       |
| ⚙️ Configuración             | `src/config/`                    |
| 🛠️ Funciones OData           | `src/lib/odata.ts`               |
| 🗄️ Stores                    | `src/store/`                     |

---

## 🔄 PRÓXIMOS PASOS

### ✅ Completar Sesión 1:
1. Descargar archivos
2. Ejecutar `npm install`
3. Ejecutar `npm run dev`
4. Verificar en http://localhost:3000
5. Hacer commit

### 🔜 Preparar Sesión 2:
1. **NUEVA conversación** con Claude
2. Subir archivos de Sesión 1
3. Subir `PLAN_IMPLEMENTACION.md`
4. Usar prompt de Sesión 2
5. Generar componentes de conexión

---

## 📞 AYUDA

### ❓ "No arranca el proyecto"
→ Ver [`CHECKPOINT_SESION_1.md`](./CHECKPOINT_SESION_1.md) sección "Troubleshooting"
→ Ejecutar `./verify.sh` para diagnóstico

### ❓ "No entiendo la estructura"
→ Ver [`ESTRUCTURA.md`](./ESTRUCTURA.md) - Árbol visual completo
→ Ver [`INDICE_ARCHIVOS.md`](./INDICE_ARCHIVOS.md) - Descripción de cada archivo

### ❓ "¿Qué hago después?"
→ Ver [`RESUMEN_SESION_1.md`](./RESUMEN_SESION_1.md) sección "Siguiente Paso"

### ❓ "No encuentro un archivo"
→ Usar [`INDICE_ARCHIVOS.md`](./INDICE_ARCHIVOS.md)
→ Ejecutar `./verify.sh`

---

## 🎓 APRENDE MÁS

### Sobre OData:
- Ver [`src/lib/odata.ts`](./src/lib/odata.ts) - Implementación completa
- Ver [`src/types/odata.types.ts`](./src/types/odata.types.ts) - Tipos

### Sobre Zustand:
- Ver [`src/store/auth.ts`](./src/store/auth.ts) - Ejemplo de store
- Ver [`src/store/ui.ts`](./src/store/ui.ts) - Ejemplo con middleware

### Sobre TypeScript:
- Ver [`src/types/`](./src/types/) - Ejemplos de interfaces
- Ver [`tsconfig.json`](./tsconfig.json) - Configuración

---

## 📊 ESTADO ACTUAL

```
✅ Completado: 29 archivos, ~1,200 líneas
⏳ Pendiente:  Sesiones 2-5

Progreso: [●━━━━━━━━━━] 20%
```

---

**Última actualización**: 02 Nov 2025  
**Sesión**: 1 de 5  
**Estado**: ✅ COMPLETADA
