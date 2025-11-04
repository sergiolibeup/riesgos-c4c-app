/**
 * Tipos base para respuestas OData de SAP C4C
 */

/**
 * Estructura de respuesta OData estándar
 */
export interface ODataResponse<T> {
  d: {
    results: T[];
    __count?: string;
    __next?: string;
  };
}

/**
 * Entidad base OData con campos comunes
 */
export interface ODataEntity {
  ObjectID?: string;
  UUID?: string;
  ETag?: string;
  __metadata?: {
    uri: string;
    type: string;
    etag?: string;
  };
}

/**
 * Campos comunes de auditoría
 */
export interface AuditFields {
  CreatedOn?: string;
  CreatedBy?: string;
  CreatedByIdentityUUID?: string;
  ChangedOn?: string;
  ChangedBy?: string;
  ChangedByIdentityUUID?: string;
  LastChangeDateTime?: string;
}

/**
 * Respuesta de una query OData individual (sin array)
 */
export interface ODataSingleResponse<T> {
  d: T;
}

/**
 * Metadata de navegación OData
 */
export interface ODataNavigationProperty {
  __deferred?: {
    uri: string;
  };
}

/**
 * Parámetros de query OData
 */
export interface ODataQueryParams {
  $filter?: string;
  $select?: string;
  $expand?: string;
  $orderby?: string;
  $top?: number;
  $skip?: number;
  $inlinecount?: 'allpages' | 'none';
  $format?: 'json' | 'atom';
}

/**
 * Error OData estructurado
 */
export interface ODataError {
  error: {
    code: string;
    message: {
      lang: string;
      value: string;
    };
    innererror?: {
      errordetails?: Array<{
        code: string;
        message: string;
        propertyref: string;
        severity: string;
      }>;
    };
  };
}
