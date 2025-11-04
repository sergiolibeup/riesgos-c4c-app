import type { RiesgoCliente } from '../types/risk.types';

interface RiesgoClienteCardProps {
  riesgo: RiesgoCliente | null;
  isLoading: boolean;
  error?: string;
}

export default function RiesgoClienteCard({ riesgo, isLoading, error }: RiesgoClienteCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Riesgo Cliente
        </h3>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!riesgo) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Riesgo Cliente
        </h3>
        <p className="text-sm text-gray-500 text-center py-4">
          No hay datos de riesgo cliente disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Riesgo Cliente
      </h3>

      <div className="space-y-3">
        {/* Campos del Root */}
        <div className="grid grid-cols-2 gap-4">
          {riesgo.IDOpp && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">ID Oportunidad</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">{riesgo.IDOpp}</p>
            </div>
          )}
          {riesgo.IDTicket && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">ID Ticket</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">{riesgo.IDTicket}</p>
            </div>
          )}
        </div>

        {/* Campos adicionales del root si existen */}
        {riesgo.z_PuntajeRiesgo_KUT !== undefined && (
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-xs font-medium text-gray-500 uppercase">
              Puntaje de Riesgo
            </p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {riesgo.z_PuntajeRiesgo_KUT.toFixed(2)}
            </p>
          </div>
        )}

        {/* Detalle de riesgos */}
        {riesgo.detalle && riesgo.detalle.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-700 uppercase mb-3">
              Detalle de Riesgos ({riesgo.detalle.length})
            </p>
            <div className="bg-gray-50 rounded-md p-3 max-h-64 overflow-y-auto">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-2 text-left font-medium text-gray-600">Campo</th>
                    <th className="px-2 py-2 text-left font-medium text-gray-600">Valor</th>
                    <th className="px-2 py-2 text-right font-medium text-gray-600">Puntaje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {riesgo.detalle.map((item: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-2 py-2 text-gray-700">
                        {item.z_Campo_KUT || '-'}
                      </td>
                      <td className="px-2 py-2 text-gray-900">
                        {item.z_Valor_KUT || '-'}
                      </td>
                      <td className="px-2 py-2 text-right font-semibold text-gray-900">
                        {item.z_Puntaje_KUT !== undefined ? item.z_Puntaje_KUT.toFixed(2) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Información de última actualización */}
        {riesgo.LastChangeDateTime && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Última actualización:{' '}
              <span className="font-medium">
                {new Date(riesgo.LastChangeDateTime).toLocaleString('es-ES')}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
