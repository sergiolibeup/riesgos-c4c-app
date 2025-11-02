/**
 * Funciones helper para trabajar con OData de SAP C4C
 */

import {
  ODataQueryOptions,
  FilterCondition,
  ExpandRelation,
  ODataError,
} from '@/types/odata.types';
import {
  ODATA_BASE_PATH,
  TENANT_DOMAIN_SUFFIX,
  ODATA_HEADERS,
  TIMEOUTS,
} from '@/config/constants';

/**
 * Construir la URL base de OData para un tenant
 * @param tenant - Código del tenant (ej: 'my362429')
 * @returns URL base completa
 */
export function buildBase(tenant: string): string {
  return `https://${tenant}${TENANT_DOMAIN_SUFFIX}${ODATA_BASE_PATH}`;
}

/**
 * Construir headers con autenticación básica
 * @param username - Usuario
 * @param password - Contraseña
 * @returns Headers con autenticación
 */
function buildAuthHeaders(username: string, password: string): HeadersInit {
  const credentials = btoa(`${username}:${password}`);
  return {
    ...ODATA_HEADERS,
    'Authorization': `Basic ${credentials}`,
  };
}

/**
 * Realizar petición OData con autenticación
 * @param tenant - Código del tenant
 * @param username - Usuario
 * @param password - Contraseña
 * @param path - Ruta del endpoint (ej: 'OpportunityCollection')
 * @param options - Opciones de query OData
 * @returns Promise con la respuesta
 */
export async function odataFetch<T = any>(
  tenant: string,
  username: string,
  password: string,
  path: string,
  options?: ODataQueryOptions
): Promise<T> {
  const baseUrl = buildBase(tenant);
  const queryString = buildQueryString(options);
  const url = `${baseUrl}${path}${queryString}`;

  const headers = buildAuthHeaders(username, password);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.API_REQUEST);

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData: ODataError = await response.json().catch(() => ({
        error: {
          code: response.status.toString(),
          message: {
            lang: 'es',
            value: response.statusText,
          },
        },
      }));

      throw new Error(
        errorData.error?.message?.value || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('La petición ha excedido el tiempo de espera');
      }
      throw error;
    }
    throw new Error('Error desconocido al realizar la petición OData');
  }
}

/**
 * Construir query string de opciones OData
 * @param options - Opciones de query
 * @returns Query string (ej: '?$filter=...&$select=...')
 */
function buildQueryString(options?: ODataQueryOptions): string {
  if (!options) return '';

  const params = new URLSearchParams();

  if (options.$filter) params.append('$filter', options.$filter);
  if (options.$select) params.append('$select', options.$select);
  if (options.$expand) params.append('$expand', options.$expand);
  if (options.$orderby) params.append('$orderby', options.$orderby);
  if (options.$top !== undefined) params.append('$top', options.$top.toString());
  if (options.$skip !== undefined) params.append('$skip', options.$skip.toString());
  if (options.$count) params.append('$count', 'true');

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Construir cláusula $filter de OData
 * @param conditions - Array de condiciones o condiciones combinadas con AND/OR
 * @param operator - Operador lógico ('and' o 'or')
 * @returns Cláusula $filter
 */
export function buildFilter(
  conditions: FilterCondition[],
  operator: 'and' | 'or' = 'and'
): string {
  if (conditions.length === 0) return '';

  const filters = conditions.map((condition) => {
    const { field, operator: op, value } = condition;

    // Formatear valor según tipo
    let formattedValue: string;
    if (typeof value === 'string') {
      formattedValue = `'${value}'`;
    } else if (typeof value === 'boolean') {
      formattedValue = value.toString();
    } else {
      formattedValue = value.toString();
    }

    // Operadores que requieren sintaxis especial
    if (op === 'contains' || op === 'startswith' || op === 'endswith') {
      return `${op}(${field},${formattedValue})`;
    }

    return `${field} ${op} ${formattedValue}`;
  });

  return filters.join(` ${operator} `);
}

/**
 * Construir cláusula $select de OData
 * @param fields - Array de campos a seleccionar
 * @returns Cláusula $select
 */
export function buildSelect(fields: string[]): string {
  if (fields.length === 0) return '';
  return fields.join(',');
}

/**
 * Construir cláusula $expand de OData
 * @param relations - Array de relaciones a expandir
 * @returns Cláusula $expand
 */
export function buildExpand(relations: (string | ExpandRelation)[]): string {
  if (relations.length === 0) return '';

  return relations
    .map((relation) => {
      if (typeof relation === 'string') {
        return relation;
      }

      // Si tiene select, agregar la subcláusula
      if (relation.select && relation.select.length > 0) {
        return `${relation.name}($select=${relation.select.join(',')})`;
      }

      return relation.name;
    })
    .join(',');
}

/**
 * Construir filtro para múltiples valores de un campo (OR)
 * @param field - Nombre del campo
 * @param values - Array de valores
 * @returns Cláusula de filtro
 */
export function buildMultiValueFilter(field: string, values: string[]): string {
  if (values.length === 0) return '';
  
  const conditions = values.map((value) => `${field} eq '${value}'`);
  return `(${conditions.join(' or ')})`;
}

/**
 * Test de conexión a OData
 * @param tenant - Código del tenant
 * @param username - Usuario
 * @param password - Contraseña
 * @returns Promise<boolean> - true si la conexión es exitosa
 */
export async function testConnection(
  tenant: string,
  username: string,
  password: string
): Promise<boolean> {
  try {
    // Intentar obtener metadata del servicio
    const baseUrl = buildBase(tenant);
    const headers = buildAuthHeaders(username, password);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.CONNECTION_TEST);

    const response = await fetch(`${baseUrl}$metadata`, {
      method: 'GET',
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return response.ok;
  } catch (error) {
    console.error('Error al probar conexión:', error);
    return false;
  }
}
