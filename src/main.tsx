import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Placeholder para el componente App (se creará en Sesión 5)
function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Riesgos C4C - Gestión de Riesgos
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            ✅ Sesión 1 completada: Fundamentos y Configuración
          </p>
          <p className="text-gray-500 mt-2">
            La infraestructura base está lista. Los componentes se agregarán en las siguientes sesiones.
          </p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
