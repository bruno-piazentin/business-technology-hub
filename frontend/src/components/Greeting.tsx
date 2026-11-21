import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { quickActions } from '../data/mock';

function formatToday(date: Date) {
  const text = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function greetingFor(hour: number) {
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function Greeting() {
  // Data e saudação calculadas no navegador, para refletir o horário local de quem acessa.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  return (
    <div className="greeting-row">
      <div className="greeting">
        <span className="date">{now ? formatToday(now) : ' '}</span>
        <h1>{now ? greetingFor(now.getHours()) : 'Olá'}, Rafael</h1>
        <span>4 demandas aguardando diagnóstico e 2 propostas vencem esta semana.</span>
      </div>
      <div className="actions">
        {quickActions.map((a) => (
          <button key={a.label} type="button" className={`btn${a.primary ? ' btn-primary' : ''}`}>
            <Icon name={a.icon} size={17} strokeWidth={2} />
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
