/**
 * Tipos para las entidades de Riesgo (BO_Riesgo*)
 */

import type { ODataEntity, AuditFields } from './odata.types';

/**
 * Riesgo Total (Asesoramiento)
 * Colección: BO_RiesgoAsesoriamientoRootCollection
 */
export interface RiesgoTotal extends ODataEntity, AuditFields {
  // Identificadores
  IDOpp?: string;
  IDTicket?: string;
  
  // Puntajes principales
  z_PuntajeAsesoramiento_KUT?: number;
  z_PuntajeRiesgoCliente_KUT?: number;
  z_PuntajeRiesgoAutomatico_KUT?: number;
  
  // Campos adicionales que puedan existir
  z_NivelRiesgo_KUT?: string;
  z_Observaciones_KUT?: string;
  
  // Metadata
  LastChangeDateTime?: string;
}

/**
 * Riesgo Cliente (Root)
 * Colección: BO_RiesgoCustomerRootCollection
 */
export interface RiesgoCliente extends ODataEntity, AuditFields {
  // Identificadores
  IDOpp?: string;
  IDTicket?: string;
  
  // Puntaje
  z_PuntajeRiesgo_KUT?: number;
  
  // Campos adicionales
  z_TipoCliente_KUT?: string;
  z_Observaciones_KUT?: string;
  
  // Metadata
  LastChangeDateTime?: string;
  
  // Detalle (se carga desde BO_RiesgoCustomerRiesgosClienteCollection)
  detalle?: RiesgoClienteDetalle[];
}

/**
 * Detalle de Riesgo Cliente
 * Colección: BO_RiesgoCustomerRiesgosClienteCollection
 */
export interface RiesgoClienteDetalle extends ODataEntity {
  ParentObjectID?: string;
  
  // Campos del detalle
  z_Campo_KUT?: string;
  z_Valor_KUT?: string;
  z_Puntaje_KUT?: number;
  z_Peso_KUT?: number;
  z_Descripcion_KUT?: string;
}

/**
 * Riesgo KYM (Know Your Customer)
 * Colección: BO_RiesgoCustomerKYMRootCollection
 */
export interface RiesgoKYM extends ODataEntity, AuditFields {
  // Identificadores
  IDOpp?: string;
  IDTicket?: string;
  IDCustomer?: string;
  
  // Campos KYM
  z_campo_KUT?: string;
  z_campoRiesgo_KUT?: string;
  z_FactorCorrectord_KUT?: number;
  z_puntajed_KUT?: number;
  z_Comentario_KUT?: string;
  
  // Campos adicionales
  z_TipoAnalisis_KUT?: string;
  z_ResultadoAnalisis_KUT?: string;
  
  // Metadata
  LastChangeDateTime?: string;
}

/**
 * Resumen de todos los riesgos para export
 */
export interface RiesgosSummary {
  riesgoTotal: RiesgoTotal | null;
  riesgoCliente: RiesgoCliente | null;
  riesgoKYM: RiesgoKYM | null;
  
  // Metadata
  fetchedAt: Date;
  opportunityId: string;
  serviceRequestId: string;
}

/**
 * Estado de carga de riesgos
 */
export interface RiesgosLoadingState {
  loadingTotal: boolean;
  loadingCliente: boolean;
  loadingKYM: boolean;
  
  errorTotal?: string;
  errorCliente?: string;
  errorKYM?: string;
}
