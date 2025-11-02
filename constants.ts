/**
 * Constantes generales de la aplicación
 */

/**
 * Configuración del tenant por defecto
 */
export const DEFAULT_TENANT = 'my362429';

/**
 * Base URL de la API de C4C
 */
export const ODATA_BASE_PATH = '/sap/c4c/odata/v1/c4codataapi/';

/**
 * Protocolo y sufijo del dominio
 */
export const TENANT_DOMAIN_SUFFIX = '.crm.ondemand.com';

/**
 * Headers por defecto para peticiones OData
 */
export const ODATA_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

/**
 * Códigos de tipo de documento
 */
export const DOCUMENT_TYPE_CODES = {
  OPPORTUNITY: '72',
  SERVICE_REQUEST: '35',
  QUOTE: '11',
  SALES_ORDER: '1',
} as const;

/**
 * Códigos de procesamiento
 */
export const PROCESSING_TYPE_CODES = {
  ZIDE: 'ZIDE',
} as const;

/**
 * Zona horaria por defecto
 */
export const DEFAULT_TIMEZONE = 'Europe/Madrid';

/**
 * Formato de fecha para mostrar
 */
export const DATE_FORMAT = 'es-ES';

/**
 * Límites de paginación
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 50,
  MAX_PAGE_SIZE: 1000,
} as const;

/**
 * Timeouts (en milisegundos)
 */
export const TIMEOUTS = {
  API_REQUEST: 30000, // 30 segundos
  CONNECTION_TEST: 10000, // 10 segundos
} as const;

/**
 * Mensajes de la aplicación
 */
export const MESSAGES = {
  LOADING: 'Cargando...',
  ERROR_GENERIC: 'Ha ocurrido un error',
  ERROR_CONNECTION: 'Error de conexión',
  ERROR_AUTH: 'Error de autenticación',
  ERROR_NOT_FOUND: 'No se encontraron resultados',
  SUCCESS_CONNECTION: 'Conexión exitosa',
  SUCCESS_SAVE: 'Guardado correctamente',
} as const;

/**
 * Niveles de riesgo y colores
 */
export const RISK_LEVELS = {
  BAJO: {
    label: 'Bajo',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-300',
  },
  MEDIO: {
    label: 'Medio',
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-300',
  },
  ALTO: {
    label: 'Alto',
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-300',
  },
  MUY_ALTO: {
    label: 'Muy Alto',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-300',
  },
} as const;
