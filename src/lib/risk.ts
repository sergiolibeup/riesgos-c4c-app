import { odataFetch, buildFilter } from './odata';
import type { RiesgoTotal, RiesgoCliente, RiesgoKYM } from '../types/risk.types';

/**
 * Obtiene el riesgo total más reciente (Asesoramiento)
 * @param tenant - Tenant de C4C
 * @param user - Usuario
 * @param password - Contraseña
 * @param oppId - ID de la Oportunidad
 * @param srId - ID del Service Request
 * @returns Objeto RiesgoTotal o null si no existe
 */
export async function getRiesgoTotal(
  tenant: string,
  user: string,
  password: string,
  oppId: string,
  srId: string
): Promise<RiesgoTotal | null> {
  try {
    const filterConditions = [
      `(IDOpp eq '${oppId}' or IDTicket eq '${srId}')`
    ];

    const filter = buildFilter(filterConditions);
    const orderby = '$orderby=LastChangeDateTime desc';
    const top = '$top=1';
    
    const path = `BO_RiesgoAsesoriamientoRootCollection?${filter}&${orderby}&${top}`;
    
    const response = await odataFetch<RiesgoTotal>(tenant, user, password, path);

    if (!response.d?.results || response.d.results.length === 0) {
      return null;
    }

    return response.d.results[0];
  } catch (error) {
    console.error('Error fetching riesgo total:', error);
    throw new Error(`No se pudo obtener el riesgo total: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}

/**
 * Obtiene el riesgo de cliente más reciente con su detalle
 * @param tenant - Tenant de C4C
 * @param user - Usuario
 * @param password - Contraseña
 * @param oppId - ID de la Oportunidad
 * @param srId - ID del Service Request
 * @returns Objeto RiesgoCliente con detalle o null si no existe
 */
export async function getRiesgoCliente(
  tenant: string,
  user: string,
  password: string,
  oppId: string,
  srId: string
): Promise<RiesgoCliente | null> {
  try {
    // Obtener el root más reciente
    const filterConditions = [
      `(IDOpp eq '${oppId}' or IDTicket eq '${srId}')`
    ];

    const filter = buildFilter(filterConditions);
    const orderby = '$orderby=LastChangeDateTime desc';
    const top = '$top=1';
    
    const pathRoot = `BO_RiesgoCustomerRootCollection?${filter}&${orderby}&${top}`;
    
    const responseRoot = await odataFetch<RiesgoCliente>(tenant, user, password, pathRoot);

    if (!responseRoot.d?.results || responseRoot.d.results.length === 0) {
      return null;
    }

    const root = responseRoot.d.results[0];

    // Obtener el detalle asociado
    if (root.ObjectID) {
      try {
        const filterDetalle = buildFilter([`ParentObjectID eq '${root.ObjectID}'`]);
        const pathDetalle = `BO_RiesgoCustomerRiesgosClienteCollection?${filterDetalle}`;
        
        const responseDetalle = await odataFetch<any>(tenant, user, password, pathDetalle);
        
        if (responseDetalle.d?.results) {
          root.detalle = responseDetalle.d.results;
        }
      } catch (detalleError) {
        console.warn('No se pudo obtener el detalle del riesgo cliente:', detalleError);
        root.detalle = [];
      }
    }

    return root;
  } catch (error) {
    console.error('Error fetching riesgo cliente:', error);
    throw new Error(`No se pudo obtener el riesgo de cliente: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}

/**
 * Obtiene el riesgo KYM (Know Your Customer) más reciente
 * @param tenant - Tenant de C4C
 * @param user - Usuario
 * @param password - Contraseña
 * @param oppId - ID de la Oportunidad
 * @param srId - ID del Service Request
 * @param partyId - (Opcional) ID del Party/Customer específico
 * @returns Objeto RiesgoKYM o null si no existe
 */
export async function getRiesgoKYM(
  tenant: string,
  user: string,
  password: string,
  oppId: string,
  srId: string,
  partyId?: string
): Promise<RiesgoKYM | null> {
  try {
    const filterConditions = [
      `(IDOpp eq '${oppId}' or IDTicket eq '${srId}')`
    ];

    // Si se proporciona partyId, agregarlo al filtro
    if (partyId) {
      filterConditions.push(`IDCustomer eq '${partyId}'`);
    }

    const filter = buildFilter(filterConditions);
    const orderby = '$orderby=LastChangeDateTime desc';
    const top = '$top=1';
    
    const path = `BO_RiesgoCustomerKYMRootCollection?${filter}&${orderby}&${top}`;
    
    const response = await odataFetch<RiesgoKYM>(tenant, user, password, path);

    if (!response.d?.results || response.d.results.length === 0) {
      return null;
    }

    return response.d.results[0];
  } catch (error) {
    console.error('Error fetching riesgo KYM:', error);
    throw new Error(`No se pudo obtener el riesgo KYM: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}
