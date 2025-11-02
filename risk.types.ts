/**
 * Tipos para las entidades de Riesgo
 */

import { ODataEntity } from './odata.types';

/**
 * Riesgo Total - BO_RiesgoAsesoriamientoRoot
 */
export interface RiesgoTotal extends ODataEntity {
  IDOpp?: string;
  IDTicket?: string;
  puntajeAsesoramiento?: number;
  puntajeRiesgoCliente?: number;
  puntajeRiesgoAutomatico?: number;
  RiesgoTotalCualitativo?: string;
  RiesgoTotalCualitativoText?: string;
  z_JustificacionCambioRiesgo?: string;
  LastChangeDateTime?: string;
  RiesgoAutomaticoList?: RiesgoAutomaticoItem[];
  Comentario?: string;
}

/**
 * Item de la lista de Riesgo Automático
 */
export interface RiesgoAutomaticoItem {
  campo?: string;
  campoRiesgo?: string;
  FactorCorrectord?: number;
  puntajed?: number;
  Comentario?: string;
}

/**
 * Riesgo Cliente Root - BO_RiesgoCustomerRoot
 */
export interface RiesgoClienteRoot extends ODataEntity {
  IDOpp?: string;
  IDTicket?: string;
  puntajed?: number;
  RiesgoCualitativo?: string;
  RiesgoCualitativoText?: string;
  RiesgoAutomaticoList?: RiesgoClienteAutomaticoItem[];
  z_JustificacionCambioRiesgo?: string;
  LastChangeDateTime?: string;
  Comentario?: string;
}

/**
 * Item de Riesgo Cliente Automático
 */
export interface RiesgoClienteAutomaticoItem {
  campo?: string;
  valor?: string;
  FactorCorrectord?: number;
  puntajed?: number;
  Comentario?: string;
}

/**
 * Riesgo Cliente Detalle - BO_RiesgoCustomerRiesgosCliente
 */
export interface RiesgoClienteDetalle extends ODataEntity {
  ParentObjectID: string;
  campo?: string;
  valor?: string;
  valorRelacion?: string;
  ponderacion?: number;
  puntajed?: number;
  PuntajeRelaciond?: number;
  FactorCorrectord?: number;
  RiesgoResolucion?: string;
  RiesgoResolucionText?: string;
}

/**
 * Respuesta completa de Riesgo Cliente con detalle
 */
export interface RiesgoClienteCompleto {
  root: RiesgoClienteRoot;
  detalle: RiesgoClienteDetalle[];
}

/**
 * Riesgo KYM Root - BO_RiesgoCustomerKYMRoot
 */
export interface RiesgoKYMRoot extends ODataEntity {
  IDOpp?: string;
  IDTicket?: string;
  IDCustomer?: string;
  puntajed?: number;
  FactorCorrector?: string;
  FactorCorrectorText?: string;
  campo?: string;
  campoRiesgo?: string;
  FactorCorrectord?: number;
  Comentario?: string;
  Pendientes?: string;
  LastChangeDateTime?: string;
}

/**
 * Niveles de riesgo
 */
export enum NivelRiesgo {
  BAJO = 'BAJO',
  MEDIO = 'MEDIO',
  ALTO = 'ALTO',
  MUY_ALTO = 'MUY_ALTO',
}

/**
 * Mapeo de puntaje a nivel de riesgo
 */
export interface RiesgoLevel {
  nivel: NivelRiesgo;
  color: string;
  rangoMin: number;
  rangoMax: number;
}
