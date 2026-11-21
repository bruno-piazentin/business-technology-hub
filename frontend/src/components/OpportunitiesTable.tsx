import { Icon } from './Icon';
import { opportunities, segmentById, solutionPaths } from '../data/mock';
import type { SegmentFilter } from './SegmentTabs';

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 1, notation: 'compact' });
const parseValue = (v: string) => Number(v.replace(/[^\d]/g, ''));

export function OpportunitiesTable({ segment }: { segment: SegmentFilter }) {
  const rows = segment === 'todos' ? opportunities : opportunities.filter((o) => o.segment === segment);
  const open = rows.reduce((sum, o) => sum + parseValue(o.value), 0);
  const weighted = rows.reduce((sum, o) => sum + parseValue(o.value) * (o.probability / 100), 0);

  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">Oportunidades de negócio identificadas</h2>
          <span className="card-sub">
            Pipeline ponderado <b style={{ color: 'var(--navy)' }}>{brl.format(weighted)}</b> de {brl.format(open)} em aberto
          </span>
        </div>
        <a href="#" className="card-link">
          Ver pipeline completo →
        </a>
      </div>
      <div className="table-scroll">
        <table className="table">
          <thead>
            <tr>
              <th>Cliente · necessidade</th>
              <th>Caminho da solução</th>
              <th>Etapa</th>
              <th style={{ textAlign: 'right' }}>Valor est.</th>
              <th style={{ width: 120 }}>Probabilidade</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} style={{ color: 'var(--muted)', textAlign: 'center', padding: 24 }}>
                  Nenhuma oportunidade neste segmento ainda.
                </td>
              </tr>
            )}
            {rows.map((o) => {
              const seg = segmentById[o.segment];
              const path = solutionPaths[o.path];
              return (
                <tr key={o.client + o.need}>
                  <td>
                    <div className="client-cell">
                      <span className="client-avatar" style={{ background: seg.tint, color: seg.ink }}>
                        {o.initials}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <span className="client-name">{o.client}</span>{' '}
                        <span className="client-seg" style={{ color: seg.ink }}>
                          · {seg.short}
                        </span>
                        <span className="client-need">{o.need}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="pill" style={{ background: path.bg, color: path.fg }}>
                      <Icon name={path.icon} size={13} strokeWidth={2} />
                      {o.pathLabel}
                    </span>
                  </td>
                  <td>{o.stage}</td>
                  <td className="num">{o.value}</td>
                  <td>
                    <div className="prob">
                      <div className="track">
                        <div style={{ width: `${o.probability}%` }} />
                      </div>
                      <span>{o.probability}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
