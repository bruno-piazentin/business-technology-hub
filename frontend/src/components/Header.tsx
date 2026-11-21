import { Icon } from './Icon';

export function Header() {
  return (
    <header className="header">
      <div className="search">
        <label htmlFor="global-search" className="sr-only">
          Pesquisa global
        </label>
        <Icon name="search" strokeWidth={2} />
        <input id="global-search" type="search" placeholder="Buscar clientes, demandas, propostas, fornecedores…" />
        <span className="kbd">Ctrl K</span>
      </div>

      <button type="button" className="btn-outline">
        <span className="swatch" style={{ background: 'var(--blue)', borderRadius: '50%', width: 8, height: 8 }} />
        Todos os segmentos
        <Icon name="chevronDown" size={16} strokeWidth={2} />
      </button>

      <div className="header-right">
        <button type="button" className="icon-btn" aria-label="Notificações (5 novas)">
          <Icon name="bell" size={20} />
          <span className="badge-dot">5</span>
        </button>
        <button type="button" className="icon-btn" aria-label="Configurações">
          <Icon name="settings" size={20} />
        </button>
        <button type="button" className="user-btn">
          <span className="avatar">RM</span>
          <span>
            <span className="user-name">Rafael Moura</span>
            <span className="user-role">Consultor de TI · Admin</span>
          </span>
        </button>
      </div>
    </header>
  );
}
