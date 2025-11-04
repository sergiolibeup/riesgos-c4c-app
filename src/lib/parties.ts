import { odataFetch, buildFilter } from './odata';
import type { Party } from '../types/party.types';

/**
 * Obtiene las parties asociadas a un Service Request filtradas por roles
 * @param tenant - Tenant de C4C
 * @param user - Usuario
 * @param password - Contraseña
 * @param parentObjId - ObjectID del Service Request
 * @param roleCodes - Array de códigos de roles a filtrar (ej: ["1001", "Z018"])
 * @returns Array de parties deduplicadas por PartyID
 */
export async function getRiskParties(
  tenant: string,
  user: string,
  password: string,
  parentObjId: string,
  roleCodes: string[]
): Promise<Party[]> {
  try {
    // Construir filtro dinámico de roles
    const roleFilters = roleCodes.map(code => `RoleCode eq '${code}'`).join(' or ');
    const filterConditions = [
      `ParentObjectID eq '${parentObjId}'`,
      `(${roleFilters})`
    ];

    const filter = buildFilter(filterConditions);
    const select = '$select=PartyID,PartyUUID,PartyName,RoleCode,RoleCodeText,Email,Phone';
    
    const path = `ServiceRequestPartyCollection?${filter}&${select}`;
    
    const response = await odataFetch<Party>(tenant, user, password, path);

    if (!response.d?.results) {
      return [];
    }

    // Deduplicar por PartyID
    const partiesMap = new Map<string, Party>();
    
    response.d.results.forEach(party => {
      if (party.PartyID && !partiesMap.has(party.PartyID)) {
        partiesMap.set(party.PartyID, party);
      }
    });

    return Array.from(partiesMap.values());
  } catch (error) {
    console.error('Error fetching risk parties:', error);
    throw new Error(`No se pudieron obtener las parties: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}
