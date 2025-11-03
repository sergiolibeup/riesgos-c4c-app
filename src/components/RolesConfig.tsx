/**
 * Componente de configuración de roles
 * Permite editar la lista de roles (códigos) a filtrar en parties
 */

import { useState, useEffect } from 'react';
import { DEFAULT_ROLES } from '../config/roles';
import { useUIStore } from '../store/ui';
import { validateRoleCode } from '../lib/validation';

export function RolesConfig() {
  const { showSuccess, showError } = useUIStore();
  
  // Estado local de roles
  const [roles, setRoles] = useState<string[]>([]);
  const [newRole, setNewRole] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Cargar roles por defecto al montar
  useEffect(() => {
    setRoles([...DEFAULT_ROLES]);
  }, []);

  /**
   * Añadir nuevo rol
   */
  const handleAddRole = () => {
    const trimmed = newRole.trim().toUpperCase();
    
    // Validar
    const validation = validateRoleCode(trimmed);
    if (!validation.isValid) {
      showError(validation.error || 'Código de rol inválido');
      return;
    }

    // Verificar duplicado
    if (roles.includes(trimmed)) {
      showError('Este rol ya existe en la lista');
      return;
    }

    // Añadir
    setRoles([...roles, trimmed]);
    setNewRole('');
    setIsAdding(false);
    showSuccess(`Rol "${trimmed}" añadido`);
  };

  /**
   * Remover rol
   */
  const handleRemoveRole = (role: string) => {
    setRoles(roles.filter(r => r !== role));
    showSuccess(`Rol "${role}" eliminado`);
  };

  /**
   * Restaurar valores por defecto
   */
  const handleReset = () => {
    setRoles([...DEFAULT_ROLES]);
    showSuccess('Roles restaurados a valores por defecto');
  };

  /**
   * Detectar Enter para añadir
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddRole();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewRole('');
    }
  };

  /**
   * Exportar roles actuales (para uso en queries)
   */
  const handleExport = () => {
    const rolesString = roles.map(r => `'${r}'`).join(', ');
    navigator.clipboard.writeText(rolesString);
    showSuccess('Roles copiados al portapapeles');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Configuración de Roles
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="text-sm text-gray-600 hover:text-gray-800 font-medium"
            title="Copiar roles al portapapeles"
          >
            📋 Copiar
          </button>
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Restaurar por defecto
          </button>
        </div>
      </div>

      {/* Información */}
      <p className="text-sm text-gray-600 mb-4">
        Define los códigos de rol que se utilizarán para filtrar parties relacionados con el riesgo.
      </p>

      {/* Chips de roles */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Roles activos ({roles.length})
        </label>
        
        <div className="flex flex-wrap gap-2 p-4 border border-gray-200 rounded-md bg-gray-50 min-h-[80px]">
          {roles.length === 0 ? (
            <div className="w-full text-center text-gray-500 text-sm py-4">
              No hay roles configurados
            </div>
          ) : (
            roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium group hover:bg-blue-200 transition-colors"
              >
                <span className="font-mono">{role}</span>
                <button
                  onClick={() => handleRemoveRole(role)}
                  className="text-blue-600 hover:text-blue-900 focus:outline-none"
                  title="Eliminar rol"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Formulario para añadir */}
      {isAdding ? (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Z018"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value.toUpperCase())}
            onKeyDown={handleKeyPress}
            autoFocus
            maxLength={10}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
          />
          <button
            onClick={handleAddRole}
            disabled={!newRole.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
          >
            Añadir
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewRole('');
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
          + Añadir rol
        </button>
      )}

      {/* Ayuda */}
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-xs text-gray-700 mb-2">
          <strong>Roles por defecto:</strong>
        </p>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_ROLES.map(role => (
            <span 
              key={role}
              className="inline-block px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono text-gray-700"
            >
              {role}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-600">
          Los códigos de rol son alfanuméricos y distinguen mayúsculas/minúsculas.
          Ejemplos: <code className="font-mono bg-white px-1">1001</code>, <code className="font-mono bg-white px-1">Z018</code>, <code className="font-mono bg-white px-1">Z031</code>
        </p>
      </div>
    </div>
  );
}
