'use client';

import { useCallback, useEffect, useState } from 'react';

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '');

type Check = { state: 'loading' | 'ok' | 'error'; detail: string };

async function getJson(path: string) {
  const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message ?? `HTTP ${res.status}`);
  return body;
}

/** Faixa que comprova o fluxo frontend → API C# → PostgreSQL (Supabase). */
export function ApiStatus() {
  const [api, setApi] = useState<Check>({ state: 'loading', detail: 'Verificando…' });
  const [db, setDb] = useState<Check>({ state: 'loading', detail: 'Verificando…' });

  const run = useCallback(async () => {
    setApi({ state: 'loading', detail: 'Verificando…' });
    setDb({ state: 'loading', detail: 'Verificando…' });
    if (!API_URL) {
      const msg = 'NEXT_PUBLIC_API_URL não definida';
      setApi({ state: 'error', detail: msg });
      setDb({ state: 'error', detail: msg });
      return;
    }
    try {
      const h = await getJson('/api/health');
      setApi({ state: 'ok', detail: `${h.runtime} · ${h.environment}` });
    } catch (e) {
      setApi({ state: 'error', detail: e instanceof Error ? e.message : 'Sem resposta' });
    }
    try {
      const d = await getJson('/api/db-check');
      setDb({ state: 'ok', detail: `${d.database} · ${d.latencyMs} ms · ${d.pings} pings registrados` });
    } catch (e) {
      setDb({ state: 'error', detail: e instanceof Error ? e.message : 'Sem resposta' });
    }
  }, []);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <section className="card infra" aria-label="Status da infraestrutura">
      <span className="infra-title">Infraestrutura</span>
      <StatusItem label="Frontend (Next.js)" check={{ state: 'ok', detail: 'online' }} />
      <StatusItem label="API C# (ASP.NET Core)" check={api} />
      <StatusItem label="Banco (Supabase PostgreSQL)" check={db} />
      <button type="button" className="btn btn-sm" onClick={run}>
        Testar novamente
      </button>
    </section>
  );
}

function StatusItem({ label, check }: { label: string; check: Check }) {
  return (
    <div className="infra-item">
      <span className={`infra-dot infra-${check.state}`} aria-hidden="true" />
      <div>
        <strong>{label}</strong>
        <span>{check.state === 'loading' ? 'Verificando…' : check.detail}</span>
      </div>
    </div>
  );
}
