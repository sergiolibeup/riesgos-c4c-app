import { useEffect, useState } from 'react';
import { getRiesgoTotal, getRiesgoCliente, getRiesgoKYM } from '../lib/risk';
import type { RiesgoTotal, RiesgoCliente, RiesgoKYM } from '../types/risk.types';
import RiesgoTotalCard from './RiesgoTotalCard';
import RiesgoClienteCard from './RiesgoClienteCard';
import RiesgoKYMCard from './RiesgoKYMCard';

interface RiskCardsProps {
  tenant: string;
  user: string;
  password: string;
  oppId: string;
  srId: string;
  partyId?: string; // Opcional para RiesgoKYM
}

export default function RiskCards({ tenant, user, password, oppId, srId, partyId }: RiskCardsProps) {
  // Estados para Riesgo Total
  const [riesgoTotal, setRiesgoTotal] = useState<RiesgoTotal | null>(null);
  const [loadingTotal, setLoadingTotal] = useState(false);
  const [errorTotal, setErrorTotal] = useState<string | undefined>();

  // Estados para Riesgo Cliente
  const [riesgoCliente, setRiesgoCliente] = useState<RiesgoCliente | null>(null);
  const [loadingCliente, setLoadingCliente] = useState(false);
  const [errorCliente, setErrorCliente] = useState<string | undefined>();

  // Estados para Riesgo KYM
  const [riesgoKYM, setRiesgoKYM] = useState<RiesgoKYM | null>(null);
  const [loadingKYM, setLoadingKYM] = useState(false);
  const [errorKYM, setErrorKYM] = useState<string | undefined>();

  // Cargar Riesgo Total
  useEffect(() => {
    if (!tenant || !user || !password || !oppId || !srId) return;

    const fetchRiesgoTotal = async () => {
      setLoadingTotal(true);
      setErrorTotal(undefined);
      try {
        const data = await getRiesgoTotal(tenant, user, password, oppId, srId);
        setRiesgoTotal(data);
      } catch (err) {
        setErrorTotal(err instanceof Error ? err.message : 'Error al obtener riesgo total');
        console.error('Error fetching riesgo total:', err);
      } finally {
        setLoadingTotal(false);
      }
    };

    fetchRiesgoTotal();
  }, [tenant, user, password, oppId, srId]);

  // Cargar Riesgo Cliente
  useEffect(() => {
    if (!tenant || !user || !password || !oppId || !srId) return;

    const fetchRiesgoCliente = async () => {
      setLoadingCliente(true);
      setErrorCliente(undefined);
      try {
        const data = await getRiesgoCliente(tenant, user, password, oppId, srId);
        setRiesgoCliente(data);
      } catch (err) {
        setErrorCliente(err instanceof Error ? err.message : 'Error al obtener riesgo cliente');
        console.error('Error fetching riesgo cliente:', err);
      } finally {
        setLoadingCliente(false);
      }
    };

    fetchRiesgoCliente();
  }, [tenant, user, password, oppId, srId]);

  // Cargar Riesgo KYM
  useEffect(() => {
    if (!tenant || !user || !password || !oppId || !srId) return;

    const fetchRiesgoKYM = async () => {
      setLoadingKYM(true);
      setErrorKYM(undefined);
      try {
        const data = await getRiesgoKYM(tenant, user, password, oppId, srId, partyId);
        setRiesgoKYM(data);
      } catch (err) {
        setErrorKYM(err instanceof Error ? err.message : 'Error al obtener riesgo KYM');
        console.error('Error fetching riesgo KYM:', err);
      } finally {
        setLoadingKYM(false);
      }
    };

    fetchRiesgoKYM();
  }, [tenant, user, password, oppId, srId, partyId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RiesgoTotalCard
        riesgo={riesgoTotal}
        isLoading={loadingTotal}
        error={errorTotal}
      />
      <RiesgoClienteCard
        riesgo={riesgoCliente}
        isLoading={loadingCliente}
        error={errorCliente}
      />
      <RiesgoKYMCard
        riesgo={riesgoKYM}
        isLoading={loadingKYM}
        error={errorKYM}
      />
    </div>
  );
}
