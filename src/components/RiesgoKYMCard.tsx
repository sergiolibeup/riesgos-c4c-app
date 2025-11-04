import type { RiesgoKYM } from '../types/risk.types';

interface RiesgoKYMCardProps {
  riesgo: RiesgoKYM | null;
  isLoading: boolean;
  error?: string;
}

export default function RiesgoKYMCard({ riesgo, isLoading, error }: RiesgoKYMCardProps) {
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
          Riesgo KYM (Know Your Customer)
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
          Riesgo KYM (Know Your Customer)
        </h3>
        <p className="text-sm text-gray-500 text-center py-4">
          No hay datos de riesgo KYM disponibles
        </p>
      </div>
    );
  }

  // Extraer campos para la tabla
  const tableData = [
    {
      campo: riesgo.z_campo_KUT || '-',
      campoRiesgo: riesgo.z_campoRiesgo_KUT || '-',
      factorCorrector: riesgo.z_FactorCorrectord_KUT,
      puntaje: riesgo.z_puntajed_KUT,
      comentario: riesgo.z_Comentario_KUT || '-',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Riesgo KYM (Know Your Customer)
      </h3>

      {/* Información general */}
      <div className="mb-4 grid grid-cols-2 gap-4">
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
        {riesgo.IDCustomer && (
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">ID Customer</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{riesgo.IDCustomer}</p>
          </div>
        )}
      </div>

      {/* Tabla de datos KYM */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-600 uppercase text-xs">
                Campo
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-600 uppercase text-xs">
                Campo Riesgo
              </th>
              <th className="px-3 py-2 text-right font-medium text-gray-600 uppercase text-xs">
                Factor Corrector
              </th>
              <th className="px-3 py-2 text-right font-medium text-gray-600 uppercase text-xs">
                Puntaje
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-600 uppercase text-xs">
                Comentario
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-3 text-gray-900">
                  {row.campo}
                </td>
                <td className="px-3 py-3 text-gray-900">
                  {row.campoRiesgo}
                </td>
                <td className="px-3 py-3 text-right font-semibold text-gray-900">
                  {row.factorCorrector !== undefined && row.factorCorrector !== null
                    ? row.factorCorrector.toFixed(2)
                    : '-'}
                </td>
                <td className="px-3 py-3 text-right font-bold text-blue-600">
                  {row.puntaje !== undefined && row.puntaje !== null
                    ? row.puntaje.toFixed(2)
                    : '-'}
                </td>
                <td className="px-3 py-3 text-gray-700 text-xs max-w-xs truncate">
                  {row.comentario}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
}
