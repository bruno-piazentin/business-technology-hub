import { Icon } from './Icon';
import { recentActivity } from '../data/mock';

export function RecentActivity() {
  return (
    <section className="card">
      <div className="card-head" style={{ alignItems: 'center' }}>
        <h2 className="card-title">Atividades recentes</h2>
        <a href="#" className="card-link">
          Histórico →
        </a>
      </div>
      <ol className="activity">
        {recentActivity.map((a) => (
          <li key={a.title}>
            <span className="activity-icon" style={{ background: a.tint, color: a.ink }}>
              <Icon name={a.icon} size={16} />
            </span>
            <div className="activity-body">
              <span>
                <b>{a.title}</b> {a.detail}
              </span>
              <small>{a.meta}</small>
            </div>
            <time>{a.time}</time>
          </li>
        ))}
      </ol>
    </section>
  );
}
