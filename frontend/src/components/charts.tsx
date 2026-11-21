import { useState } from 'react';
import { demandTrend, funnel, segments } from '../data/mock';

/* Escalas compartilhadas: área de plotagem de y=20 (topo) a y=190 (base), eixo de 0 a 40. */
const TOP = 20;
const BASE = 190;
const MAX = 40;
const yOf = (v: number) => BASE - (v / MAX) * (BASE - TOP);
const ticks = [0, 10, 20, 30, 40];

function Grid({ x1, x2 }: { x1: number; x2: number }) {
  return (
    <>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x1} x2={x2} y1={yOf(t)} y2={yOf(t)} stroke={t === 0 ? '#CBD5E1' : '#E3E8F0'} />
          <text x={x1 - 10} y={yOf(t) + 4} fontSize="11" fill="#5B6B82" textAnchor="end">
            {t}
          </text>
        </g>
      ))}
    </>
  );
}

/* ---------------- Evolução das demandas ---------------- */
export function DemandTrendChart() {
  const [range, setRange] = useState<'30d' | '90d' | '12m'>('12m');
  const { months, received, resolved } = demandTrend;
  const x0 = 40;
  const x1 = 620;
  const xOf = (i: number) => x0 + (i * (x1 - x0)) / (months.length - 1);
  const line = (vals: number[]) => vals.map((v, i) => `${xOf(i)},${yOf(v)}`).join(' ');
  const last = months.length - 1;
  const totalReceived = received.reduce((a, b) => a + b, 0);
  const totalResolved = resolved.reduce((a, b) => a + b, 0);

  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">Evolução das demandas</h2>
          <span className="card-sub">Recebidas × resolvidas · últimos 12 meses</span>
        </div>
        <div className="segmented" role="group" aria-label="Período">
          {(['30d', '90d', '12m'] as const).map((r) => (
            <button key={r} type="button" aria-pressed={range === r} onClick={() => setRange(r)}>
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="stats">
        <div className="stat">
          <strong>{totalReceived}</strong>
          <span>
            <span className="swatch" style={{ width: 10, height: 3, background: 'var(--blue)' }} />
            Recebidas · <b className="tone-positive">+18%</b>
          </span>
        </div>
        <div className="stat">
          <strong>{totalResolved}</strong>
          <span>
            <span className="swatch" style={{ width: 10, height: 3, background: 'var(--navy)' }} />
            Resolvidas · {Math.round((totalResolved / totalReceived) * 100)}% de taxa
          </span>
        </div>
        <div className="stat">
          <strong>3,2 dias</strong>
          <span>Tempo médio até diagnóstico</span>
        </div>
      </div>
      <svg
        className="chart"
        viewBox="0 0 640 214"
        role="img"
        aria-label={`Demandas recebidas subiram de ${received[0]} para ${received[last]} por mês; resolvidas de ${resolved[0]} para ${resolved[last]}`}
      >
        <Grid x1={x0} x2={x1} />
        {months.map((m, i) => (
          <text key={m} x={xOf(i)} y="208" fontSize="11" fill="#5B6B82" textAnchor="middle">
            {m}
          </text>
        ))}
        <polygon points={`${line(received)} ${x1},${BASE} ${x0},${BASE}`} fill="#2563EB" fillOpacity="0.08" />
        <polyline points={line(resolved)} fill="none" stroke="#0B1F3A" strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={line(received)} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1={xOf(last)} x2={xOf(last)} y1={yOf(received[last])} y2={BASE} stroke="#94A3B8" strokeDasharray="3 3" />
        <circle cx={xOf(last)} cy={yOf(received[last])} r="5" fill="#fff" stroke="#2563EB" strokeWidth="2.5" />
        <circle cx={xOf(last)} cy={yOf(resolved[last])} r="4.5" fill="#fff" stroke="#0B1F3A" strokeWidth="2.5" />
        <rect x="514" y="8" width="96" height="28" rx="7" fill="#0B1F3A" />
        <text x="562" y="26" fontSize="11" fontWeight="600" fill="#fff" textAnchor="middle">
          {months[last]} · {received[last]} / {resolved[last]}
        </text>
      </svg>
    </section>
  );
}

/* ---------------- Distribuição por segmento ---------------- */
export function SegmentDonut() {
  const total = segments.reduce((sum, s) => sum + s.demands, 0);
  const r = 60;
  const c = 2 * Math.PI * r;
  const gap = 2;
  let offset = 0;

  return (
    <section className="card">
      <div>
        <h2 className="card-title">Demandas por segmento</h2>
        <span className="card-sub">Últimos 90 dias</span>
      </div>
      <div className="donut-wrap">
        <svg
          width="190"
          height="190"
          viewBox="0 0 160 160"
          role="img"
          aria-label={segments.map((s) => `${s.short} ${Math.round((s.demands / total) * 100)}%`).join(', ')}
        >
          <g transform="rotate(-90 80 80)" fill="none" strokeWidth="20">
            {segments.map((s) => {
              const len = (s.demands / total) * c;
              const el = (
                <circle key={s.id} cx="80" cy="80" r={r} stroke={s.color} strokeDasharray={`${Math.max(len - gap, 0)} ${c}`} strokeDashoffset={-offset} />
              );
              offset += len;
              return el;
            })}
          </g>
          <text x="80" y="78" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="26" fontWeight="600" fill="#0B1F3A">
            {total}
          </text>
          <text x="80" y="96" textAnchor="middle" fontSize="10" fill="#5B6B82">
            demandas
          </text>
        </svg>
      </div>
      <ul className="share-list">
        {segments.map((s) => (
          <li key={s.id}>
            <span className="swatch" style={{ background: s.color }} />
            <span className="name">{s.short}</span>
            <span className="n">{s.demands} dem.</span>
            <span className="pct">{Math.round((s.demands / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Demandas → Propostas → Projetos ---------------- */
export function FunnelChart() {
  const series = [
    { key: 'demands', label: 'Demandas', color: '#93C5FD', values: funnel.demands },
    { key: 'proposals', label: 'Propostas', color: '#2563EB', values: funnel.proposals },
    { key: 'projects', label: 'Projetos', color: '#0B1F3A', values: funnel.projects },
  ];
  const groupX = (i: number) => 50 + i * 80;
  const barW = 18;
  const step = 22;
  const conversion = Math.round(
    (funnel.projects.reduce((a, b) => a + b, 0) / funnel.demands.reduce((a, b) => a + b, 0)) * 100,
  );
  const last = funnel.months.length - 1;

  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">Demandas → Propostas → Projetos</h2>
          <span className="card-sub">Conversão mensal · {funnel.months[0]} a {funnel.months[last]}</span>
        </div>
        <div className="stat" style={{ alignItems: 'flex-end' }}>
          <strong style={{ fontSize: 22 }}>{conversion}%</strong>
          <span>demanda → projeto</span>
        </div>
      </div>
      <div className="legend">
        {series.map((s) => (
          <span key={s.key}>
            <span className="swatch" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
      <svg
        className="chart"
        viewBox="0 0 540 214"
        role="img"
        aria-label={`Em ${funnel.months[last]}: ${funnel.demands[last]} demandas, ${funnel.proposals[last]} propostas e ${funnel.projects[last]} projetos`}
      >
        <Grid x1={40} x2={530} />
        {series.map((s, si) => (
          <g key={s.key} fill={s.color}>
            {s.values.map((v, i) => (
              <rect key={i} x={groupX(i) + si * step} y={yOf(v)} width={barW} height={BASE - yOf(v)} rx="3" />
            ))}
          </g>
        ))}
        {series.map((s, si) => (
          <text key={s.key} x={groupX(last) + si * step + barW / 2} y={yOf(s.values[last]) - 6} fontSize="10" fontWeight="600" fill="#0B1F3A" textAnchor="middle">
            {s.values[last]}
          </text>
        ))}
        {funnel.months.map((m, i) => (
          <text key={m} x={groupX(i) + step + barW / 2 - 2} y="208" fontSize="11" fill="#5B6B82" textAnchor="middle">
            {m}
          </text>
        ))}
      </svg>
    </section>
  );
}
