import { segments, type SegmentId } from '../data/mock';

export type SegmentFilter = SegmentId | 'todos';

interface Props {
  value: SegmentFilter;
  onChange: (value: SegmentFilter) => void;
}

export function SegmentTabs({ value, onChange }: Props) {
  const total = segments.reduce((sum, s) => sum + s.demands, 0);
  const tabs = [
    { id: 'todos' as const, name: 'Todos', color: 'var(--navy)', count: total },
    ...segments.map((s) => ({ id: s.id, name: s.short, color: s.color, count: s.demands })),
  ];

  return (
    <div className="tabs" role="tablist" aria-label="Filtrar por segmento">
      {tabs.map((t) => {
        const selected = value === t.id;
        return (
          <button key={t.id} type="button" role="tab" aria-selected={selected} className="tab" onClick={() => onChange(t.id)}>
            <span className="swatch" style={{ width: 8, height: 8, background: selected ? '#fff' : t.color }} />
            {t.name}
            <span className="count">{t.count}</span>
          </button>
        );
      })}
    </div>
  );
}
