import { Icon } from './Icon';
import { kpis } from '../data/mock';

function sparkPoints(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return values
    .map((v, i) => `${(i / (values.length - 1)) * 96 + 2},${28 - ((v - min) / range) * 24}`)
    .join(' ');
}

export function KpiGrid() {
  return (
    <section className="grid-kpis" aria-label="Indicadores">
      {kpis.map((k) => (
        <div key={k.label} className="card kpi">
          <div className="kpi-top">
            <span className="kpi-label">{k.label}</span>
            <span className="kpi-icon" style={{ background: k.tint, color: k.ink }}>
              <Icon name={k.icon} />
            </span>
          </div>
          <div className="kpi-mid">
            <span className="kpi-value">{k.value}</span>
            <svg aria-hidden="true" width="84" height="28" viewBox="0 0 100 30" fill="none">
              <polyline points={sparkPoints(k.spark)} stroke={k.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="kpi-foot">
            <b className={`tone-${k.tone}`}>{k.delta}</b>
            <span>{k.sub}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
