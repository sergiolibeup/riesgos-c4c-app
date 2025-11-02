/**
 * Tipos para entidades de clientes (Individual y Corporate)
 */

import { ODataEntity } from './odata.types';

/**
 * Tipo de cliente
 */
export type CustomerType = 'individual' | 'corporate';

/**
 * Cliente Individual (Persona Física)
 */
export interface IndividualCustomer extends ODataEntity {
  CustomerID?: string;
  FirstName?: string;
  LastName?: string;
  BirthDate?: string;
  BirthName?: string;
  GenderCode?: string;
  GenderCodeText?: string;
  MaritalStatusCode?: string;
  MaritalStatusCodeText?: string;
  NationalityCountryCode?: string;
  NationalityCountryCodeText?: string;
  
  // Campos custom de riesgo
  z_PaisDeResidencia_KUT?: string;
  z_PaisDeResidencia_KUTText?: string;
  z_TipoRepresentacion_KUT?: string;
  z_TipoRepresentacion_KUTText?: string;
  z_ActividadProfesional_Riesgo_KUT?: string;
  z_ActividadProfesional_Riesgo_KUTText?: string;
  z_ClienteRecurrente_KUT?: string;
  z_ClienteRecurrente_KUTText?: string;
}

/**
 * Dow Jones Account (PEP y otros checks)
 */
export interface DowJonesAccount extends ODataEntity {
  AccountID?: string;
  Pep?: string;
  PepText?: string;
  FamilyRelated?: string;
  FamilyRelatedText?: string;
  AdverseMedia?: string;
  AdverseMediaText?: string;
}

/**
 * Client Situation
 */
export interface ClientSituation extends ODataEntity {
  AccountID?: string;
  ClientSituation?: string;
  ClientSituationText?: string;
}

/**
 * Valores fuente para Individual
 */
export interface IndividualValues {
  paisResidencia?: string;
  paisResidenciaText?: string;
  pep?: string;
  pepText?: string;
  familyRelated?: string;
  familyRelatedText?: string;
  clientSituation?: string;
  clientSituationText?: string;
  pendiente?: string; // Placeholder
  birthDate?: string;
  edad?: number;
  tipoRepresentacion?: string;
  tipoRepresentacionText?: string;
  actividadProfesional?: string;
  actividadProfesionalText?: string;
  clienteRecurrente?: string;
  clienteRecurrenteText?: string;
}

/**
 * Corporate Account (Persona Jurídica)
 */
export interface CorporateAccount extends ODataEntity {
  AccountID?: string;
  Name?: string;
  RoleCode?: string;
  CountryCode?: string;
  CountryCodeText?: string;
  
  // Campos custom de riesgo
  z_NaturalezaFormalEntidad_KUT?: string;
  z_NaturalezaFormalEntidad_KUTText?: string;
  Z_FechaConstitucion_KUT?: string;
  z_ClienteRecurrente_KUT?: string;
  z_ClienteRecurrente_KUTText?: string;
  z_ActividadEmpresarial_Riesgo_KUT?: string;
  z_ActividadEmpresarial_Riesgo_KUTText?: string;
}

/**
 * Corporate Account Address (para obtener país con MainIndicator)
 */
export interface CorporateAccountAddress extends ODataEntity {
  ParentObjectID: string;
  MainIndicator?: boolean;
  CountryCode?: string;
  CountryCodeText?: string;
  CityName?: string;
  StreetName?: string;
  PostalCode?: string;
}

/**
 * Valores fuente para Corporate
 */
export interface CorporateValues {
  pais?: string;
  paisText?: string;
  naturalezaFormal?: string;
  naturalezaFormalText?: string;
  fechaConstitucion?: string;
  antiguedad?: number;
  clienteRecurrente?: string;
  clienteRecurrenteText?: string;
  actividadEmpresarial?: string;
  actividadEmpresarialText?: string;
}

/**
 * Configuración de campo para mapeo
 */
export interface FieldMapping {
  label: string;
  collection: string;
  field: string;
  fieldText?: string;
  order: number;
  required?: boolean;
  calculated?: boolean;
}
