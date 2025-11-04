/**
 * Tipos para Parties (ServiceRequestParty)
 */

import type { ODataEntity, AuditFields } from './odata.types';

/**
 * Party asociado a un Service Request
 */
export interface Party extends ODataEntity, AuditFields {
  PartyID: string;
  PartyUUID?: string;
  PartyName?: string;
  RoleCode?: string;
  RoleCodeText?: string;
  ParentObjectID?: string;
  
  // Información de contacto
  Email?: string;
  Phone?: string;
  Mobile?: string;
  Fax?: string;
  
  // Información adicional
  FormattedName?: string;
  RoleCategoryCode?: string;
  RoleCategoryCodeText?: string;
  MainIndicator?: boolean;
  
  // Dirección
  AddressName?: string;
  AddressFormattedName?: string;
  CityName?: string;
  CountryCode?: string;
  CountryCodeText?: string;
  PostalCode?: string;
  StreetName?: string;
  
  // Metadata de navegación
  ServiceRequest?: any;
}

/**
 * Rol de un Party
 */
export interface PartyRole {
  RoleCode: string;
  RoleCodeText?: string;
  RoleCategoryCode?: string;
  RoleCategoryCodeText?: string;
}

/**
 * Filtros para buscar parties
 */
export interface PartyFilters {
  ParentObjectID?: string;
  RoleCodes?: string[];
  PartyID?: string;
  PartyName?: string;
  MainIndicator?: boolean;
}
