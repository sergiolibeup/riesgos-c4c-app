import type { RiesgoTotal } from '../types/risk.types';

interface RiesgoTotalCardProps {
  riesgo: RiesgoTotal | null;
  isLoading: boolean;
  error?: string;
}

function getRiskLevel(score: number): { label: string; color: string } {
  if (score >= 8) return { label: 'MUY ALTO', color: 'bg-red-600' };
  if (score >= 6) return { label: 'ALTO', color: 'bg-orange-500' };
  if (score >= 4) return { label: 'MEDIO', color: 'bg-yellow-500' };
  if (score >= 2) return { label: 'BAJO', color: 'bg-green-500' };
  return { label: 'MUY BAJO', color: 'bg-green-600' };
}

export default function RiesgoTotalCard({ riesgo, isLoading, error }: RiesgoTotalCardProps) {
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
          Riesgo Total (Asesoramiento)
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
          Riesgo Total (Asesoramiento)
        </h3>
        <p className="text-sm text-gray-500 text-center py-4">
          No hay datos de riesgo total disponibles
        </p>
      </div>
    );
  }

  const puntajeAsesoramiento = riesgo.z_PuntajeAsesoramiento_KUT || 0;
  const puntajeCliente = riesgo.z_PuntajeRiesgoCliente_KUT || 0;
  const puntajeAutomatico = riesgo.z_PuntajeRiesgoAutomatico_KUT || 0;

  // Calcular nivel de riesgo basado en el puntaje de asesoramiento
  const riskLevel = getRiskLevel(puntajeAsesoramiento);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Riesgo Total (Asesoramiento)
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${riskLevel.color}`}>
          {riskLevel.label}
        </span>
      </div>

      <div className="space-y-4">
        {/* Puntaje Asesoramiento */}
        <div className="border-l-4 border-blue-500 pl-4">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Puntaje Asesoramiento
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {puntajeAsesoramiento.toFixed(2)}
          </p>
        </div>

        {/* Puntaje Riesgo Cliente */}
        <div className="border-l-4 border-green-500 pl-4">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Puntaje Riesgo Cliente
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {puntajeCliente.toFixed(2)}
          </p>
        </div>

        {/* Puntaje Automático */}
        <div className="border-l-4 border-purple-500 pl-4">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Puntaje Automático
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {puntajeAutomatico.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Información adicional */}
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
