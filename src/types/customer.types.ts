/**
 * Tipos para Clientes (IndividualCustomer y CorporateAccount)
 */

import type { ODataEntity, AuditFields } from './odata.types';

/**
 * Cliente Individual (Persona Física)
 * Colección: IndividualCustomerCollection
 */
export interface IndividualCustomer extends ODataEntity, AuditFields {
  CustomerID?: string;
  
  // Datos personales
  FirstName?: string;
  LastName?: string;
  MiddleName?: string;
  FormattedName?: string;
  AcademicTitleCode?: string;
  AcademicTitleCodeText?: string;
  
  // Fecha de nacimiento
  BirthDate?: string;
  
  // Género
  GenderCode?: string;
  GenderCodeText?: string;
  
  // Nacionalidad
  NationalityCountryCode?: string;
  NationalityCountryCodeText?: string;
  
  // Estado civil
  MaritalStatusCode?: string;
  MaritalStatusCodeText?: string;
  
  // Ocupación
  OccupationCode?: string;
  OccupationCodeText?: string;
  
  // Campos personalizados (KUT)
  z_NivelEstudios_KUT?: string;
  z_ActividadProfesional_KUT?: string;
  z_ClienteRecurrente_KUT?: string;
  z_ClienteRecurrente_KUTText?: string;
  z_ClientSituation_KUT?: string;
  z_ClientSituation_KUTText?: string;
  z_TipoRepresentacion_KUT?: string;
  z_TipoRepresentacion_KUTText?: string;
  
  // PEP y Dow Jones
  z_PEP_KUT?: boolean;
  z_FamilyRelated_KUT?: boolean;
  z_BODowJones_KUT?: string;
  z_BODowJones_KUTText?: string;
  
  // Status
  StatusCode?: string;
  StatusCodeText?: string;
  LifeCycleStatusCode?: string;
  LifeCycleStatusCodeText?: string;
  
  // Dirección y contacto (navegación)
  IndividualCustomerAddress?: any;
  IndividualCustomerCommon?: any;
}

/**
 * Cuenta Corporativa (Persona Jurídica)
 * Colección: CorporateAccountCollection
 */
export interface CorporateAccount extends ODataEntity, AuditFields {
  AccountID?: string;
  
  // Datos de la empresa
  Name?: string;
  FormattedName?: string;
  AdditionalName?: string;
  
  // Forma legal
  LegalFormCode?: string;
  LegalFormCodeText?: string;
  
  // Industria/Sector
  IndustryCode?: string;
  IndustryCodeText?: string;
  
  // País
  CountryCode?: string;
  CountryCodeText?: string;
  
  // Fecha de constitución
  z_FechaConstitucion_KUT?: string;
  
  // Campos personalizados (KUT)
  z_NaturalezaFormalEntidad_KUT?: string;
  z_NaturalezaFormalEntidad_KUTText?: string;
  z_ActividadEmpresarial_Riesgo_KUT?: string;
  z_ActividadEmpresarial_Riesgo_KUTText?: string;
  z_ClienteRecurrente_KUT?: string;
  z_ClienteRecurrente_KUTText?: string;
  
  // Status
  StatusCode?: string;
  StatusCodeText?: string;
  LifeCycleStatusCode?: string;
  LifeCycleStatusCodeText?: string;
  
  // Información financiera
  AnnualRevenue?: number;
  AnnualRevenueCurrencyCode?: string;
  NumberOfEmployees?: number;
  
  // Dirección (navegación)
  CorporateAccountAddress?: any;
  CorporateAccountCommon?: any;
}

/**
 * Dirección de Cliente Individual
 */
export interface IndividualCustomerAddress extends ODataEntity {
  ParentObjectID?: string;
  MainIndicator?: boolean;
  
  // Dirección
  CountryCode?: string;
  CountryCodeText?: string;
  RegionCode?: string;
  RegionCodeText?: string;
  CityName?: string;
  PostalCode?: string;
  StreetName?: string;
  StreetPostalCode?: string;
  HouseNumber?: string;
  
  // Tipo de dirección
  AddressUsageCode?: string;
  AddressUsageCodeText?: string;
}

/**
 * Dirección de Cuenta Corporativa
 */
export interface CorporateAccountAddress extends ODataEntity {
  ParentObjectID?: string;
  MainIndicator?: boolean;
  
  // Dirección
  CountryCode?: string;
  CountryCodeText?: string;
  RegionCode?: string;
  RegionCodeText?: string;
  CityName?: string;
  PostalCode?: string;
  StreetName?: string;
  HouseNumber?: string;
  
  // Tipo de dirección
  AddressUsageCode?: string;
  AddressUsageCodeText?: string;
}

/**
 * Tipo de cliente detectado
 */
export type CustomerType = 'individual' | 'corporate';

/**
 * Valores fuente extraídos de un cliente
 */
export interface CustomerSourceValues {
  type: CustomerType;
  
  // Valores comunes
  countryCode?: string;
  countryText?: string;
  
  // Para Individual
  birthDate?: string;
  age?: number;
  pep?: boolean;
  familyRelated?: boolean;
  bodowJones?: string;
  clientSituation?: string;
  tipoRepresentacion?: string;
  actividadProfesional?: string;
  clienteRecurrente?: string;
  
  // Para Corporate
  fechaConstitucion?: string;
  antiguedad?: number;
  naturalezaEntidad?: string;
  actividadEmpresarial?: string;
  
  // Raw data (para debugging)
  rawData?: IndividualCustomer | CorporateAccount;
}
