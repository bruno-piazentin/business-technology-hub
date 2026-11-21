import { useState } from 'react';
import { Icon } from './Icon';
import { navItems, segments } from '../data/mock';

export function Sidebar() {
  const [active, setActive] = useState(navItems[0].label);

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Icon name="logo" size={22} strokeWidth={2} />
        </div>
        <div>
          <div className="brand-name">Business &amp; Tech Hub</div>
          <div className="brand-tag">Central de comando</div>
        </div>
      </div>

      <nav className="nav" aria-label="Navegação principal">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`nav-item${active === item.label ? ' active' : ''}`}
            aria-current={active === item.label ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              setActive(item.label);
            }}
          >
            <Icon name={item.icon} />
            <span className="grow">{item.label}</span>
            {item.badge !== undefined && <span className="nav-badge">{item.badge}</span>}
          </a>
        ))}
      </nav>

      <div className="nav">
        <div className="side-section-head">
          <span className="side-label">Segmentos de mercado</span>
          <button type="button" className="icon-btn-dark" aria-label="Adicionar segmento">
            <Icon name="plus" size={14} strokeWidth={2} />
          </button>
        </div>
        {segments.map((s) => (
          <a key={s.id} href="#" className="nav-item segment-item">
            <span className="swatch" style={{ background: s.color }} />
            <span className="grow">{s.name}</span>
            <small>{s.clients} clientes</small>
          </a>
        ))}
      </div>

      <div className="usage">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--side-muted)' }}>Uso do workspace</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>62%</span>
        </div>
        <div className="usage-bar">
          <div style={{ width: '62%' }} />
        </div>
        <span style={{ color: 'var(--side-muted)' }}>Plano Consultor · 1 de 5 usuários</span>
      </div>
    </aside>
  );
}
