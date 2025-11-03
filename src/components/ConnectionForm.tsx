/**
 * Formulario de conexión a C4C
 * Permite configurar tenant, usuario y contraseña
 * Incluye prueba de conexión
 */

import { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { useUIStore } from '../store/ui';
import { validateCredentials } from '../lib/validation';
import { testConnection } from '../lib/odata';

export function ConnectionForm() {
  const { tenant, username, password, setCredentials, hasCredentials } = useAuthStore();
  const { showSuccess, showError } = useUIStore();
  
  // Estado local del formulario
  const [localTenant, setLocalTenant] = useState(tenant);
  const [localUsername, setLocalUsername] = useState(username);
  const [localPassword, setLocalPassword] = useState(password);
  const [isTesting, setIsTesting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Maneja el test de conexión
   */
  const handleTestConnection = async () => {
    // Validar credenciales antes de probar
    const validation = validateCredentials(localTenant, localUsername, localPassword);
    
    if (!validation.isValid) {
      showError(validation.error || 'Credenciales inválidas');
      return;
    }

    setIsTesting(true);

    try {
      // Probar conexión
      const isValid = await testConnection(localTenant, localUsername, localPassword);
      
      if (isValid) {
        // Guardar credenciales en el store
        setCredentials(localTenant, localUsername, localPassword);
        showSuccess('Conexión exitosa a C4C');
      } else {
        showError('No se pudo conectar. Verifica las credenciales.');
      }
    } catch (error) {
      console.error('Error al probar conexión:', error);
      showError(
        error instanceof Error 
          ? error.message 
          : 'Error al probar la conexión'
      );
    } finally {
      setIsTesting(false);
    }
  };

  /**
   * Maneja el guardado de credenciales sin probar
   */
  const handleSave = () => {
    const validation = validateCredentials(localTenant, localUsername, localPassword);
    
    if (!validation.isValid) {
      showError(validation.error || 'Credenciales inválidas');
      return;
    }

    setCredentials(localTenant, localUsername, localPassword);
    showSuccess('Credenciales guardadas');
  };

  /**
   * Detecta Enter para probar conexión
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTesting) {
      handleTestConnection();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Conexión a SAP C4C
        </h2>
        {hasCredentials() && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ✓ Conectado
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Tenant */}
        <div>
          <label 
            htmlFor="tenant" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tenant
          </label>
          <input
            id="tenant"
            type="text"
            placeholder="my362429"
            value={localTenant}
            onChange={(e) => setLocalTenant(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTesting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500">
            Ejemplo: my362429
          </p>
        </div>

        {/* Usuario */}
        <div>
          <label 
            htmlFor="username" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Usuario
          </label>
          <input
            id="username"
            type="text"
            placeholder="usuario@empresa.com"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTesting}
            autoComplete="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={localPassword}
              onChange={(e) => setLocalPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTesting}
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {isTesting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Probando...
              </span>
            ) : (
              'Probar Conexión'
            )}
          </button>

          <button
            onClick={handleSave}
            disabled={isTesting}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed font-medium transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Información */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-800">
          <strong>Nota:</strong> Las credenciales se almacenan solo en esta sesión del navegador.
          Usa "Probar Conexión" para validar el acceso a la API de C4C.
        </p>
      </div>
    </div>
  );
}
