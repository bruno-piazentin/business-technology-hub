import { useState, type FormEvent } from 'react';
import { Icon } from './Icon';
import { aiCapabilities, aiInsights } from '../data/mock';

/**
 * Card do assistente de IA. Por enquanto é apenas visual:
 * a integração com um modelo de linguagem entra numa etapa futura.
 */
export function AiAssistantCard() {
  const [question, setQuestion] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQuestion('');
  };

  return (
    <section className="ai-card" aria-labelledby="ai-title">
      <svg className="ai-orbit" aria-hidden="true" width="220" height="220" viewBox="0 0 220 220">
        <g fill="none" stroke="#38BDF8">
          <circle cx="110" cy="110" r="40" />
          <circle cx="110" cy="110" r="70" />
          <circle cx="110" cy="110" r="100" />
        </g>
        <g fill="#38BDF8">
          <circle cx="150" cy="110" r="3" />
          <circle cx="61" cy="61" r="3" />
          <circle cx="110" cy="210" r="3" />
        </g>
      </svg>

      <div className="ai-head">
        <span className="ai-mark">
          <Icon name="sparkles" size={22} />
        </span>
        <div>
          <div className="ai-title">
            <h2 id="ai-title">Assistente Hub IA</h2>
            <span className="beta">BETA</span>
          </div>
          <span className="ai-sub">Analisou 286 demandas e 48 clientes hoje</span>
        </div>
      </div>

      <ul className="insights">
        {aiInsights.map((i) => (
          <li key={i.kind} className={`insight ai-tone-${i.tone}`}>
            <span className="insight-icon">
              <Icon name={i.icon} size={15} strokeWidth={2} />
            </span>
            <div className="insight-body">
              <span className="insight-kind">{i.kind}</span>
              <span className="insight-text">{i.text}</span>
              <a href="#" className="insight-cta">
                {i.cta} →
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="chips">
        {aiCapabilities.map((c) => (
          <button key={c} type="button" className="chip">
            {c}
          </button>
        ))}
      </div>

      <form className="ai-ask" onSubmit={onSubmit}>
        <label htmlFor="ai-question" className="sr-only">
          Pergunte ao assistente
        </label>
        <input
          id="ai-question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex.: Quais clientes de Indústria têm pendências?"
        />
        <button type="submit" className="ai-send" aria-label="Enviar pergunta">
          <Icon name="send" strokeWidth={2} />
        </button>
      </form>
    </section>
  );
}
