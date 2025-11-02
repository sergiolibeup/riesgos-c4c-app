/**
 * Tipos para Parties (ServiceRequestParty)
 */

import { ODataEntity } from './odata.types';

/**
 * Party - ServiceRequestParty
 */
export interface Party extends ODataEntity {
  ParentObjectID: string;
  PartyID: string;
  PartyUUID?: string;
  PartyName?: string;
  RoleCode: string;
  RoleCodeText?: string;
  Email?: string;
  Phone?: string;
  MainIndicator?: boolean;
}

/**
 * Roles de Party predefinidos
 */
export enum PartyRole {
  /** Solicitante */
  SOLICITANTE = '1001',
  /** Cliente */
  CLIENTE = 'Z018',
  /** Representante Legal */
  REPRESENTANTE_LEGAL = 'Z031',
  /** Beneficiario Final */
  BENEFICIARIO_FINAL = 'Z050',
}

/**
 * Configuración de roles
 */
export interface RoleConfig {
  code: string;
  text: string;
  required: boolean;
}

/**
 * Service Request con referencia a oportunidad
 */
export interface ServiceRequest extends ODataEntity {
  ID: string;
  ProcessingTypeCode?: string;
  ProcessingTypeCodeText?: string;
  Name?: string;
}

/**
 * Business Transaction Document Reference
 */
export interface BusinessTransactionDocumentReference extends ODataEntity {
  ParentObjectID: string;
  TypeCode: string;
  TypeCodeText?: string;
  RoleCode?: string;
  RoleCodeText?: string;
  ID: string;
  BusinessSystemID?: string;
  ServiceRequest?: ServiceRequest;
}

/**
 * Resultado de búsqueda de ZIDE
 */
export interface ZIDESearchResult {
  opportunity: {
    id: string;
    name?: string;
  };
  serviceRequest: ServiceRequest | null;
  found: boolean;
}
