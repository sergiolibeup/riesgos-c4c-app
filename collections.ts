/**
 * Nombres de las colecciones OData de SAP C4C
 */

export const COLLECTIONS = {
  // Service Request
  SERVICE_REQUEST_DOC_REFERENCE: 'ServiceRequestBusinessTransactionDocumentReferenceCollection',
  SERVICE_REQUEST_PARTY: 'ServiceRequestPartyCollection',
  SERVICE_REQUEST: 'ServiceRequestCollection',

  // Riesgos
  RIESGO_ASESORAMIENTO_ROOT: 'BO_RiesgoAsesoriamientoRootCollection',
  RIESGO_CUSTOMER_ROOT: 'BO_RiesgoCustomerRootCollection',
  RIESGO_CUSTOMER_DETALLE: 'BO_RiesgoCustomerRiesgosClienteCollection',
  RIESGO_CUSTOMER_KYM_ROOT: 'BO_RiesgoCustomerKYMRootCollection',

  // Clientes
  INDIVIDUAL_CUSTOMER: 'IndividualCustomerCollection',
  CORPORATE_ACCOUNT: 'CorporateAccountCollection',
  CORPORATE_ACCOUNT_ADDRESS: 'CorporateAccountAddressCollection',
  
  // Dow Jones y Situación
  DOW_JONES_ACCOUNT: 'BODowJonesAccountRootCollection',
  CLIENT_SITUATION: 'BODowJonesAccountClientSituation',
  
  // Oportunidades
  OPPORTUNITY: 'OpportunityCollection',
} as const;

/**
 * Lista de colecciones por defecto (editable por el usuario)
 */
export const DEFAULT_COLLECTIONS = [
  COLLECTIONS.SERVICE_REQUEST_DOC_REFERENCE,
  COLLECTIONS.SERVICE_REQUEST_PARTY,
  COLLECTIONS.RIESGO_ASESORAMIENTO_ROOT,
  COLLECTIONS.RIESGO_CUSTOMER_ROOT,
  COLLECTIONS.RIESGO_CUSTOMER_DETALLE,
  COLLECTIONS.RIESGO_CUSTOMER_KYM_ROOT,
];

/**
 * Tipo de colección
 */
export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];
