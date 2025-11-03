/**
 * Zustand Store - Gestión de datos de negocio
 * Maneja oportunidad seleccionada, Service Request y Parties
 */

import { create } from 'zustand';
import type { Party } from '../types/party.types';

/**
 * Información de oportunidad seleccionada
 */
export interface OpportunityInfo {
  id: string;
  name: string;
}

/**
 * Información del Service Request ZIDE
 */
export interface ServiceRequestInfo {
  ObjectID: string;
  ID: string;
  ProcessingTypeCode?: string;
  Name?: string;
}

/**
 * Estado del store de datos
 */
interface DataState {
  // Datos principales
  selectedOpportunity: OpportunityInfo | null;
  serviceRequest: ServiceRequestInfo | null;
  parties: Party[];

  // Métodos para actualizar oportunidad
  setOpportunity: (opportunity: OpportunityInfo | null) => void;
  
  // Métodos para actualizar service request
  setServiceRequest: (serviceRequest: ServiceRequestInfo | null) => void;
  
  // Métodos para actualizar parties
  setParties: (parties: Party[]) => void;
  addParty: (party: Party) => void;
  removeParty: (partyId: string) => void;
  
  // Método para limpiar todos los datos
  clearData: () => void;
  
  // Método para limpiar solo parties
  clearParties: () => void;

  // Estado de carga
  isLoadingOpportunity: boolean;
  isLoadingServiceRequest: boolean;
  isLoadingParties: boolean;
  
  setLoadingOpportunity: (loading: boolean) => void;
  setLoadingServiceRequest: (loading: boolean) => void;
  setLoadingParties: (loading: boolean) => void;
}

/**
 * Store principal de datos
 */
export const useDataStore = create<DataState>((set) => ({
  // Estado inicial
  selectedOpportunity: null,
  serviceRequest: null,
  parties: [],
  
  isLoadingOpportunity: false,
  isLoadingServiceRequest: false,
  isLoadingParties: false,

  // Actualizar oportunidad seleccionada
  setOpportunity: (opportunity) => {
    set({ 
      selectedOpportunity: opportunity,
      // Al cambiar oportunidad, limpiar SR y parties relacionados
      serviceRequest: null,
      parties: []
    });
  },

  // Actualizar service request
  setServiceRequest: (serviceRequest) => {
    set({ 
      serviceRequest,
      // Al cambiar SR, limpiar parties previos
      parties: []
    });
  },

  // Actualizar lista completa de parties
  setParties: (parties) => {
    set({ parties });
  },

  // Añadir un party individual
  addParty: (party) => {
    set((state) => ({
      parties: [...state.parties, party]
    }));
  },

  // Remover un party por ID
  removeParty: (partyId) => {
    set((state) => ({
      parties: state.parties.filter(p => p.PartyID !== partyId)
    }));
  },

  // Limpiar todos los datos
  clearData: () => {
    set({
      selectedOpportunity: null,
      serviceRequest: null,
      parties: [],
      isLoadingOpportunity: false,
      isLoadingServiceRequest: false,
      isLoadingParties: false
    });
  },

  // Limpiar solo parties
  clearParties: () => {
    set({ parties: [] });
  },

  // Estados de carga
  setLoadingOpportunity: (loading) => {
    set({ isLoadingOpportunity: loading });
  },

  setLoadingServiceRequest: (loading) => {
    set({ isLoadingServiceRequest: loading });
  },

  setLoadingParties: (loading) => {
    set({ isLoadingParties: loading });
  }
}));

/**
 * Selector para obtener si hay datos cargados
 */
export const useHasData = () => {
  const { selectedOpportunity, serviceRequest, parties } = useDataStore();
  return {
    hasOpportunity: selectedOpportunity !== null,
    hasServiceRequest: serviceRequest !== null,
    hasParties: parties.length > 0
  };
};

/**
 * Selector para obtener información completa del contexto actual
 */
export const useCurrentContext = () => {
  const { selectedOpportunity, serviceRequest, parties } = useDataStore();
  return {
    opportunity: selectedOpportunity,
    serviceRequest,
    parties,
    hasCompleteContext: 
      selectedOpportunity !== null && 
      serviceRequest !== null && 
      parties.length > 0
  };
};
