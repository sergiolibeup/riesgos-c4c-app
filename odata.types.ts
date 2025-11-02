/**
 * Tipos base para trabajar con OData de SAP C4C
 */

/**
 * Respuesta estándar de OData
 */
export interface ODataResponse<T> {
  d: {
    results: T[];
  };
}

/**
 * Respuesta de OData para una sola entidad
 */
export interface ODataSingleResponse<T> {
  d: T;
}

/**
 * Entidad base de OData con campos comunes
 */
export interface ODataEntity {
  ObjectID: string;
  ETag?: string;
  UUID?: string;
}

/**
 * Metadatos de paginación
 */
export interface ODataMetadata {
  __count?: string;
  __next?: string;
}

/**
 * Opciones para queries OData
 */
export interface ODataQueryOptions {
  $filter?: string;
  $select?: string;
  $expand?: string;
  $orderby?: string;
  $top?: number;
  $skip?: number;
  $count?: boolean;
}

/**
 * Condición de filtro
 */
export interface FilterCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le' | 'contains' | 'startswith' | 'endswith';
  value: string | number | boolean;
}

/**
 * Relación para expandir
 */
export interface ExpandRelation {
  name: string;
  select?: string[];
}

/**
 * Parámetros de configuración OData
 */
export interface ODataConfig {
  tenant: string;
  username: string;
  password: string;
  baseUrl?: string;
}

/**
 * Error de OData
 */
export interface ODataError {
  error: {
    code: string;
    message: {
      lang: string;
      value: string;
    };
  };
}
