import { solutionPaths, solutionResearch } from '../data/mock';

export function SolutionResearch() {
  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h2 className="card-title">Pesquisa de soluções em andamento</h2>
          <span className="card-sub">Mercado, parceiros ou desenvolvimento próprio</span>
        </div>
        <a href="#" className="card-link">
          Abrir radar →
        </a>
      </div>
      <ul className="research">
        {solutionResearch.map((r) => (
          <li key={r.need}>
            <div className="info">
              <span className="need">{r.need}</span>
              <span className="meta">
                {r.client} · {r.evaluated}
              </span>
            </div>
            <div className="tags">
              {r.tags.map((t) => (
                <span key={t} className="tag" style={{ background: solutionPaths[t].bg, color: solutionPaths[t].fg }}>
                  {solutionPaths[t].label}
                </span>
              ))}
            </div>
            <div className="rec">
              <strong>{r.recommendation}</strong>
              <span>Aderência {r.fit}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
