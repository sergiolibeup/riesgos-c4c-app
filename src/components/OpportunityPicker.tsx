/**
 * Componente para buscar y seleccionar oportunidades
 * Encuentra el Service Request ZIDE asociado automáticamente
 */

import { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { useDataStore } from '../store/data';
import { useUIStore } from '../store/ui';
import { validateOpportunityId } from '../lib/validation';
import { findZIDEByOpportunity, getOpportunityInfo } from '../lib/docflow';

export function OpportunityPicker() {
  const { tenant, username, password, hasCredentials } = useAuthStore();
  const { 
    selectedOpportunity, 
    serviceRequest,
    setOpportunity, 
    setServiceRequest,
    isLoadingOpportunity,
    isLoadingServiceRequest,
    setLoadingOpportunity,
    setLoadingServiceRequest
  } = useDataStore();
  const { showSuccess, showError, showWarning } = useUIStore();
  
  // Estado local
  const [opportunityId, setOpportunityId] = useState('');

  /**
   * Buscar oportunidad y su Service Request ZIDE
   */
  const handleSearch = async () => {
    // Validar credenciales
    if (!hasCredentials()) {
      showError('Primero debes configurar la conexión a C4C');
      return;
    }

    // Validar ID de oportunidad
    const validation = validateOpportunityId(opportunityId);
    if (!validation.isValid) {
      showError(validation.error || 'ID de oportunidad inválido');
      return;
    }

    const trimmedId = opportunityId.trim();

    try {
      // Paso 1: Obtener información de la oportunidad
      setLoadingOpportunity(true);
      
      const oppInfo = await getOpportunityInfo(tenant, username, password, trimmedId);
      
      if (!oppInfo) {
        showWarning(`No se encontró la oportunidad ${trimmedId}`);
        setOpportunity({ id: trimmedId, name: `Oportunidad ${trimmedId}` });
      } else {
        setOpportunity(oppInfo);
        showSuccess(`Oportunidad "${oppInfo.name}" cargada`);
      }

      // Paso 2: Buscar Service Request ZIDE asociado
      setLoadingServiceRequest(true);
      
      const zideSR = await findZIDEByOpportunity(tenant, username, password, trimmedId);
      
      if (!zideSR) {
        showWarning(
          `La oportunidad ${trimmedId} no tiene un Service Request de tipo ZIDE asociado. ` +
          'No se podrán cargar datos de riesgo.'
        );
        setServiceRequest(null);
      } else {
        setServiceRequest({
          ObjectID: zideSR.ObjectID,
          ID: zideSR.ID,
          ProcessingTypeCode: zideSR.ProcessingTypeCode,
          Name: zideSR.Name
        });
        showSuccess(`Service Request ZIDE "${zideSR.ID}" encontrado`);
      }

    } catch (error) {
      console.error('Error al buscar oportunidad:', error);
      showError(
        error instanceof Error 
          ? error.message 
          : 'Error al buscar la oportunidad'
      );
      setOpportunity(null);
      setServiceRequest(null);
    } finally {
      setLoadingOpportunity(false);
      setLoadingServiceRequest(false);
    }
  };

  /**
   * Limpiar selección
   */
  const handleClear = () => {
    setOpportunityId('');
    setOpportunity(null);
    setServiceRequest(null);
    showSuccess('Selección limpiada');
  };

  /**
   * Detectar Enter para buscar
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoadingOpportunity && !isLoadingServiceRequest) {
      handleSearch();
    }
  };

  const isLoading = isLoadingOpportunity || isLoadingServiceRequest;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Buscar Oportunidad
      </h2>

      {/* Formulario de búsqueda */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <label 
              htmlFor="opportunity-id" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ID de Oportunidad
            </label>
            <input
              id="opportunity-id"
              type="text"
              placeholder="Ingresa el ID de la oportunidad"
              value={opportunityId}
              onChange={(e) => setOpportunityId(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || !hasCredentials()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleSearch}
              disabled={isLoading || !hasCredentials() || !opportunityId.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Buscando...
                </span>
              ) : (
                '🔍 Buscar'
              )}
            </button>

            {(selectedOpportunity || opportunityId) && (
              <button
                onClick={handleClear}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Resultado de la búsqueda */}
        {selectedOpportunity && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                  Oportunidad Seleccionada
                </h3>
                <p className="text-sm text-blue-800">
                  <strong>ID:</strong> {selectedOpportunity.id}
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Nombre:</strong> {selectedOpportunity.name}
                </p>
                
                {serviceRequest && (
                  <div className="mt-2 pt-2 border-t border-blue-300">
                    <p className="text-xs font-semibold text-blue-900 mb-1">
                      Service Request ZIDE
                    </p>
                    <p className="text-xs text-blue-700">
                      <strong>ID:</strong> {serviceRequest.ID}
                    </p>
                    <p className="text-xs text-blue-700">
                      <strong>ObjectID:</strong> {serviceRequest.ObjectID}
                    </p>
                  </div>
                )}
              </div>
              
              <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Activa
              </span>
            </div>
          </div>
        )}

        {/* Advertencia si no hay SR ZIDE */}
        {selectedOpportunity && !serviceRequest && !isLoading && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Sin Service Request ZIDE
                </h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Esta oportunidad no tiene un Service Request de tipo ZIDE asociado.
                  No se podrán cargar datos de parties ni riesgos.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje si no hay credenciales */}
        {!hasCredentials() && (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-sm text-gray-600">
              ⚠️ Configura primero la conexión a C4C en la sección superior.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
