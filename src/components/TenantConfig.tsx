/**
 * Componente de configuración de tenant y colecciones OData
 * Permite editar el host del tenant y la lista de colecciones a consultar
 */

import { useState, useEffect } from 'react';
import { COLLECTIONS } from '../config/collections';
import { useUIStore } from '../store/ui';
import { validateCollectionName } from '../lib/validation';

export function TenantConfig() {
  const { showSuccess, showError } = useUIStore();
  
  // Estado local de colecciones (inicialmente desde config)
  const [collections, setCollections] = useState<string[]>([]);
  const [newCollection, setNewCollection] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Cargar colecciones por defecto al montar
  useEffect(() => {
    const defaultCollections = Object.values(COLLECTIONS);
    setCollections(defaultCollections);
  }, []);

  /**
   * Añadir nueva colección
   */
  const handleAddCollection = () => {
    const trimmed = newCollection.trim();
    
    // Validar
    const validation = validateCollectionName(trimmed);
    if (!validation.isValid) {
      showError(validation.error || 'Nombre de colección inválido');
      return;
    }

    // Verificar duplicado
    if (collections.includes(trimmed)) {
      showError('Esta colección ya existe en la lista');
      return;
    }

    // Añadir
    setCollections([...collections, trimmed]);
    setNewCollection('');
    setIsAdding(false);
    showSuccess(`Colección "${trimmed}" añadida`);
  };

  /**
   * Remover colección
   */
  const handleRemoveCollection = (collection: string) => {
    setCollections(collections.filter(c => c !== collection));
    showSuccess(`Colección "${collection}" eliminada`);
  };

  /**
   * Restaurar valores por defecto
   */
  const handleReset = () => {
    const defaultCollections = Object.values(COLLECTIONS);
    setCollections(defaultCollections);
    showSuccess('Colecciones restauradas a valores por defecto');
  };

  /**
   * Detectar Enter para añadir
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCollection();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewCollection('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Configuración de Colecciones
        </h2>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Restaurar por defecto
        </button>
      </div>

      {/* Información */}
      <p className="text-sm text-gray-600 mb-4">
        Define las colecciones OData que se utilizarán para consultar datos de riesgo.
      </p>

      {/* Lista de colecciones */}
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Colecciones activas ({collections.length})
        </label>
        
        <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md">
          {collections.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No hay colecciones configuradas
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {collections.map((collection) => (
                <li 
                  key={collection}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 group"
                >
                  <span className="text-sm font-mono text-gray-800 flex-1">
                    {collection}
                  </span>
                  <button
                    onClick={() => handleRemoveCollection(collection)}
                    className="text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                    title="Eliminar colección"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Formulario para añadir */}
      {isAdding ? (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="NombreCollection"
            value={newCollection}
            onChange={(e) => setNewCollection(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <button
            onClick={handleAddCollection}
            disabled={!newCollection.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
          >
            Añadir
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewCollection('');
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
        >
          + Añadir colección personalizada
        </button>
      )}

      {/* Ayuda */}
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-xs text-gray-700">
          <strong>Colecciones por defecto:</strong>
        </p>
        <ul className="mt-2 text-xs text-gray-600 space-y-1 list-disc list-inside">
          <li>ServiceRequestBusinessTransactionDocumentReferenceCollection</li>
          <li>ServiceRequestPartyCollection</li>
          <li>BO_RiesgoAsesoriamientoRootCollection</li>
          <li>BO_RiesgoCustomerRootCollection</li>
          <li>BO_RiesgoCustomerKYMRootCollection</li>
        </ul>
      </div>
    </div>
  );
}
