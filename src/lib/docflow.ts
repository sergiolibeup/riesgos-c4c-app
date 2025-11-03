/**
 * Helpers para el flujo de documentos (DocFlow)
 * Encuentra relaciones entre Oportunidades y Service Requests
 */

import { odataFetch, buildFilter, buildSelect, buildExpand } from './odata';
import type { ODataResponse } from '../types/odata.types';

/**
 * Estructura de Service Request retornado
 */
export interface ServiceRequestResult {
  ObjectID: string;
  ID: string;
  ProcessingTypeCode: string;
  Name?: string;
}

/**
 * Estructura de la referencia de documento
 */
interface DocumentReference {
  ServiceRequest: ServiceRequestResult;
}

/**
 * Encuentra el Service Request de tipo ZIDE asociado a una oportunidad
 * 
 * Lógica:
 * 1. Busca en ServiceRequestBusinessTransactionDocumentReferenceCollection
 * 2. Filtra por ID de oportunidad y TypeCode = '72'
 * 3. Expande ServiceRequest para obtener detalles
 * 4. Busca el que tenga ProcessingTypeCode = 'ZIDE'
 * 
 * @param tenant - Tenant C4C (ej: 'my362429')
 * @param username - Usuario C4C
 * @param password - Contraseña C4C
 * @param opportunityId - ID de la oportunidad
 * @returns Service Request ZIDE o null si no existe
 */
export async function findZIDEByOpportunity(
  tenant: string,
  username: string,
  password: string,
  opportunityId: string
): Promise<ServiceRequestResult | null> {
  try {
    // Construir filtro: ID eq '{OPP_ID}' and TypeCode eq '72'
    const filter = buildFilter([
      { field: 'ID', operator: 'eq', value: opportunityId },
      { field: 'TypeCode', operator: 'eq', value: '72' }
    ]);

    // Seleccionar campos del ServiceRequest expandido
    const expand = buildExpand([
      {
        name: 'ServiceRequest',
        select: ['ObjectID', 'ID', 'ProcessingTypeCode', 'Name']
      }
    ]);

    // Construir path completo
    const path = `ServiceRequestBusinessTransactionDocumentReferenceCollection?$filter=${filter}&$expand=${expand}`;

    // Ejecutar query
    const response = await odataFetch<ODataResponse<DocumentReference>>(
      tenant,
      username,
      password,
      path
    );

    // Verificar si hay resultados
    if (!response.d?.results || response.d.results.length === 0) {
      console.log(`No se encontraron referencias de documento para oportunidad ${opportunityId}`);
      return null;
    }

    // Buscar el Service Request con ProcessingTypeCode = 'ZIDE'
    for (const docRef of response.d.results) {
      if (docRef.ServiceRequest && docRef.ServiceRequest.ProcessingTypeCode === 'ZIDE') {
        console.log('Service Request ZIDE encontrado:', docRef.ServiceRequest);
        return docRef.ServiceRequest;
      }
    }

    // No se encontró ningún SR de tipo ZIDE
    console.log(`Se encontraron ${response.d.results.length} referencias, pero ninguna es de tipo ZIDE`);
    return null;

  } catch (error) {
    console.error('Error al buscar Service Request ZIDE:', error);
    throw new Error(
      `No se pudo buscar el Service Request para la oportunidad ${opportunityId}: ${
        error instanceof Error ? error.message : 'Error desconocido'
      }`
    );
  }
}

/**
 * Verifica si una oportunidad tiene un Service Request ZIDE asociado
 * 
 * @param tenant - Tenant C4C
 * @param username - Usuario C4C
 * @param password - Contraseña C4C
 * @param opportunityId - ID de la oportunidad
 * @returns true si existe un SR ZIDE, false si no
 */
export async function hasZIDEServiceRequest(
  tenant: string,
  username: string,
  password: string,
  opportunityId: string
): Promise<boolean> {
  try {
    const sr = await findZIDEByOpportunity(tenant, username, password, opportunityId);
    return sr !== null;
  } catch (error) {
    console.error('Error al verificar Service Request ZIDE:', error);
    return false;
  }
}

/**
 * Obtiene información resumida de una oportunidad
 * (Placeholder para futura implementación si se necesita)
 * 
 * @param tenant - Tenant C4C
 * @param username - Usuario C4C
 * @param password - Contraseña C4C
 * @param opportunityId - ID de la oportunidad
 * @returns Información básica de la oportunidad
 */
export async function getOpportunityInfo(
  tenant: string,
  username: string,
  password: string,
  opportunityId: string
): Promise<{ id: string; name: string } | null> {
  try {
    // Query simple a OpportunityCollection
    const filter = buildFilter([
      { field: 'ID', operator: 'eq', value: opportunityId }
    ]);

    const select = buildSelect(['ID', 'Name', 'ObjectID']);
    const path = `OpportunityCollection?$filter=${filter}&$select=${select}&$top=1`;

    const response = await odataFetch<ODataResponse<{ ID: string; Name: string; ObjectID: string }>>(
      tenant,
      username,
      password,
      path
    );

    if (!response.d?.results || response.d.results.length === 0) {
      return null;
    }

    const opp = response.d.results[0];
    return {
      id: opp.ID,
      name: opp.Name || `Oportunidad ${opp.ID}`
    };

  } catch (error) {
    console.error('Error al obtener información de oportunidad:', error);
    return {
      id: opportunityId,
      name: `Oportunidad ${opportunityId}`
    };
  }
}
