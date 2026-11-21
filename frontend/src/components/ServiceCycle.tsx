import { phases, serviceCycle } from '../data/mock';

export function ServiceCycle() {
  const total = serviceCycle.reduce((sum, s) => sum + s.count, 0);
  const max = Math.max(...serviceCycle.map((s) => s.count));

  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">Ciclo de atendimento</h2>
          <span className="card-sub">
            {total} demandas ativas da necessidade ao suporte · todas vinculadas a cliente e segmento
          </span>
        </div>
        <div className="legend">
          {Object.values(phases).map((p) => (
            <span key={p.label}>
              <span className="swatch" style={{ background: p.color }} />
              {p.label}
            </span>
          ))}
        </div>
      </div>
      <div className="cycle-scroll">
        <ol className="cycle">
          {serviceCycle.map((s, i) => {
            const color = phases[s.phase].color;
            return (
              <li key={s.label} className="stage" style={{ borderTopColor: color }}>
                <span className="stage-n" style={{ color }}>
                  ETAPA {i + 1}
                </span>
                <span className="stage-label">{s.label}</span>
                <span className="stage-count">{s.count}</span>
                <div className="track">
                  <div style={{ width: `${(s.count / max) * 100}%`, background: color }} />
                </div>
                <span className="stage-note">{s.note}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
