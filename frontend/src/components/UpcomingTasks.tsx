import { useState } from 'react';
import { Icon } from './Icon';
import { taskKinds, upcomingTasks } from '../data/mock';

export function UpcomingTasks() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const today = upcomingTasks.filter((t) => t.today).length;

  return (
    <section className="card">
      <div className="card-head" style={{ alignItems: 'center' }}>
        <div>
          <h2 className="card-title">Próximas tarefas e compromissos</h2>
          <span className="card-sub">
            {today} hoje · {upcomingTasks.length - today} nesta semana
          </span>
        </div>
        <button type="button" className="btn btn-sm">
          <Icon name="plus" size={15} strokeWidth={2} />
          Tarefa
        </button>
      </div>
      <ul className="tasks">
        {upcomingTasks.map((t) => {
          const kind = taskKinds[t.kind];
          return (
            <li key={t.id} className={`task${done[t.id] ? ' done' : ''}`}>
              <input
                type="checkbox"
                id={t.id}
                checked={!!done[t.id]}
                onChange={(e) => setDone((d) => ({ ...d, [t.id]: e.target.checked }))}
              />
              <div className="task-when">
                <small className={t.today ? 'today' : undefined}>{t.day}</small>
                <strong>{t.time}</strong>
              </div>
              <label htmlFor={t.id}>
                <span className="task-title">{t.title}</span>
                <span className="task-who">{t.who}</span>
              </label>
              <span className="tag" style={{ background: kind.bg, color: kind.fg }}>
                {kind.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
