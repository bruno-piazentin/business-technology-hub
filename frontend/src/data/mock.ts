/**
 * Dados fictícios usados apenas para demonstrar o funcionamento visual do dashboard.
 * Substituir por chamadas à API quando o backend existir.
 */
import type { IconName } from '../components/Icon';

export type SegmentId = 'supermercados' | 'comercio' | 'servicos' | 'industria' | 'outros';

export interface Segment {
  id: SegmentId;
  name: string;
  short: string;
  color: string;
  ink: string;
  tint: string;
  clients: number;
  demands: number;
}

export const segments: Segment[] = [
  { id: 'supermercados', name: 'Supermercados', short: 'Supermercados', color: '#1D4ED8', ink: '#1D4ED8', tint: '#E8F0FE', clients: 14, demands: 33 },
  { id: 'comercio', name: 'Comércio', short: 'Comércio', color: '#38BDF8', ink: '#0369A1', tint: '#E0F2FE', clients: 12, demands: 21 },
  { id: 'servicos', name: 'Serviços', short: 'Serviços', color: '#F59E0B', ink: '#B45309', tint: '#FEF3C7', clients: 10, demands: 16 },
  { id: 'industria', name: 'Indústria', short: 'Indústria', color: '#0F766E', ink: '#0F766E', tint: '#CCFBF1', clients: 8, demands: 12 },
  { id: 'outros', name: 'Outros segmentos', short: 'Outros', color: '#94A3B8', ink: '#475569', tint: '#F1F5F9', clients: 4, demands: 5 },
];

export const segmentById = Object.fromEntries(segments.map((s) => [s.id, s])) as Record<SegmentId, Segment>;

export interface NavItem {
  label: string;
  icon: IconName;
  badge?: number;
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'Clientes e CRM', icon: 'users', badge: 48 },
  { label: 'Demandas e Oportunidades', icon: 'bulb', badge: 23 },
  { label: 'Pesquisa de Soluções', icon: 'search' },
  { label: 'Fornecedores e Parceiros', icon: 'building' },
  { label: 'Orçamentos e Propostas', icon: 'file', badge: 9 },
  { label: 'Projetos e Desenvolvimento', icon: 'code' },
  { label: 'Suporte e Chamados', icon: 'headset', badge: 12 },
  { label: 'Tarefas e Acompanhamento', icon: 'check' },
  { label: 'Inteligência Artificial', icon: 'sparkles' },
];

export const quickActions: { label: string; icon: IconName; primary?: boolean }[] = [
  { label: 'Nova demanda', icon: 'bulb', primary: true },
  { label: 'Novo cliente', icon: 'userPlus' },
  { label: 'Nova proposta', icon: 'file' },
  { label: 'Novo projeto', icon: 'code' },
  { label: 'Abrir chamado', icon: 'headset' },
];

export interface Kpi {
  label: string;
  value: string;
  delta: string;
  sub: string;
  tone: 'positive' | 'warning' | 'neutral' | 'critical';
  icon: IconName;
  tint: string;
  ink: string;
  spark: number[];
}

export const kpis: Kpi[] = [
  { label: 'Clientes ativos', value: '48', delta: '+4', sub: 'novos este mês', tone: 'positive', icon: 'users', tint: '#E8F0FE', ink: '#1D4ED8', spark: [6, 8, 7, 12, 14, 18, 22] },
  { label: 'Demandas em aberto', value: '23', delta: '6', sub: 'aguardando diagnóstico', tone: 'warning', icon: 'bulb', tint: '#F3E8FF', ink: '#7C3AED', spark: [10, 14, 12, 18, 16, 21, 20] },
  { label: 'Propostas pendentes', value: '9', delta: 'R$ 186,4 mil', sub: 'em negociação', tone: 'neutral', icon: 'file', tint: '#FEF3C7', ink: '#B45309', spark: [12, 10, 16, 14, 20, 18, 22] },
  { label: 'Projetos em andamento', value: '7', delta: '86%', sub: 'dentro do prazo', tone: 'positive', icon: 'code', tint: '#DCFCE7', ink: '#15803D', spark: [8, 8, 12, 12, 16, 16, 20] },
  { label: 'Chamados abertos', value: '12', delta: '3 críticos', sub: '· SLA médio 4h', tone: 'critical', icon: 'headset', tint: '#FEE2E2', ink: '#B91C1C', spark: [20, 16, 18, 12, 14, 10, 12] },
];

export type Phase = 'descoberta' | 'solucao' | 'comercial' | 'entrega';

export const phases: Record<Phase, { label: string; color: string }> = {
  descoberta: { label: 'Descoberta', color: '#7C3AED' },
  solucao: { label: 'Solução', color: '#0284C7' },
  comercial: { label: 'Comercial', color: '#D97706' },
  entrega: { label: 'Entrega e pós-venda', color: '#15803D' },
};

export const serviceCycle: { label: string; count: number; phase: Phase; note: string }[] = [
  { label: 'Necessidade recebida', count: 6, phase: 'descoberta', note: '2 novas hoje' },
  { label: 'Cadastro e diagnóstico', count: 5, phase: 'descoberta', note: 'méd. 3,2 dias' },
  { label: 'Pesquisa de soluções', count: 4, phase: 'solucao', note: '11 opções mapeadas' },
  { label: 'Fornecedores e parceiros', count: 3, phase: 'solucao', note: '5 em avaliação' },
  { label: 'Desenvolvimento próprio?', count: 2, phase: 'solucao', note: 'build vs. buy' },
  { label: 'Proposta elaborada', count: 4, phase: 'comercial', note: 'R$ 98,2 mil' },
  { label: 'Negociação e aprovação', count: 3, phase: 'comercial', note: 'R$ 88,2 mil' },
  { label: 'Desenvolvimento ou implantação', count: 7, phase: 'entrega', note: '86% no prazo' },
  { label: 'Pós-venda', count: 5, phase: 'entrega', note: 'NPS 72' },
  { label: 'Suporte e manutenção', count: 12, phase: 'entrega', note: '3 críticos' },
];

export const demandTrend = {
  months: ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
  received: [14, 18, 16, 22, 19, 25, 24, 28, 26, 31, 29, 34],
  resolved: [10, 13, 15, 17, 18, 20, 22, 21, 25, 26, 27, 30],
};

export const funnel = {
  months: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
  demands: [24, 28, 26, 31, 29, 34],
  proposals: [11, 13, 12, 15, 16, 18],
  projects: [5, 6, 6, 7, 8, 9],
};

export type SolutionPath = 'mercado' | 'parceiro' | 'proprio' | 'hibrido';

export const solutionPaths: Record<SolutionPath, { label: string; icon: IconName; bg: string; fg: string }> = {
  mercado: { label: 'Mercado', icon: 'shop', bg: '#FEF3C7', fg: '#92400E' },
  parceiro: { label: 'Parceiro', icon: 'building', bg: '#E0F2FE', fg: '#075985' },
  proprio: { label: 'Próprio', icon: 'code', bg: '#EDE9FE', fg: '#5B21B6' },
  hibrido: { label: 'Híbrido', icon: 'layers', bg: '#DCFCE7', fg: '#166534' },
};

export interface Opportunity {
  initials: string;
  client: string;
  segment: SegmentId;
  need: string;
  path: SolutionPath;
  pathLabel: string;
  stage: string;
  value: string;
  probability: number;
}

export const opportunities: Opportunity[] = [
  { initials: 'BP', client: 'Rede Bom Preço', segment: 'supermercados', need: 'Integração PDV × ERP com conciliação de estoque', path: 'hibrido', pathLabel: 'Parceiro + integração', stage: 'Proposta enviada', value: 'R$ 64.000', probability: 70 },
  { initials: 'CC', client: 'Casa & Conforto Móveis', segment: 'comercio', need: 'E-commerce integrado ao ERP', path: 'parceiro', pathLabel: 'Plataforma parceira', stage: 'Negociação', value: 'R$ 39.900', probability: 80 },
  { initials: 'VF', client: 'Metalúrgica Vale Forte', segment: 'industria', need: 'Apontamento de produção via tablet', path: 'proprio', pathLabel: 'Desenvolvimento próprio', stage: 'Diagnóstico', value: 'R$ 48.500', probability: 45 },
  { initials: 'IS', client: 'Clínica Integra Saúde', segment: 'servicos', need: 'Agenda online e prontuário eletrônico', path: 'mercado', pathLabel: 'Solução de mercado', stage: 'Pesquisa de soluções', value: 'R$ 22.800', probability: 35 },
  { initials: 'NE', client: 'Supermercado Nova Era', segment: 'supermercados', need: 'BI de margem por categoria e loja', path: 'proprio', pathLabel: 'Desenvolvimento próprio', stage: 'Build vs. buy', value: 'R$ 18.600', probability: 55 },
];

export const aiInsights: { kind: string; icon: IconName; tone: 'info' | 'warning' | 'success'; text: string; cta: string }[] = [
  { kind: 'Demanda recorrente', icon: 'repeat', tone: 'info', text: '3 supermercados relataram ruptura de estoque em novembro. Um pacote padrão de reposição pode atender os três.', cta: 'Criar oportunidade' },
  { kind: 'Pendência', icon: 'clock', tone: 'warning', text: 'Proposta PR-0139 (Nova Era) está sem retorno há 9 dias. Vale um follow-up antes de sexta.', cta: 'Agendar follow-up' },
  { kind: 'Oportunidade', icon: 'trend', tone: 'success', text: '4 clientes de Comércio usam ERP sem loja virtual integrada. Potencial estimado de R$ 140 mil.', cta: 'Ver clientes' },
];

export const aiCapabilities = ['Resumir semana', 'Demandas recorrentes', 'Sugerir soluções', 'Encontrar oportunidades', 'Listar pendências', 'Gerar relatório'];

export const solutionResearch: { need: string; client: string; evaluated: string; tags: SolutionPath[]; recommendation: string; fit: string }[] = [
  { need: 'Controle de validade de perecíveis', client: 'Rede Bom Preço', evaluated: '4 soluções avaliadas', tags: ['mercado', 'parceiro'], recommendation: 'Parceiro: ValidaTech', fit: '86%' },
  { need: 'Apontamento de produção', client: 'Metalúrgica Vale Forte', evaluated: '2 fornecedores + protótipo', tags: ['parceiro', 'proprio'], recommendation: 'Desenvolvimento próprio', fit: '78%' },
  { need: 'Agenda e prontuário eletrônico', client: 'Clínica Integra Saúde', evaluated: '5 SaaS comparados', tags: ['mercado'], recommendation: 'Em comparação', fit: '—' },
  { need: 'Emissão de NFS-e em lote', client: 'Prisma Contábil', evaluated: 'API de parceiro', tags: ['parceiro', 'proprio'], recommendation: 'Integração via API', fit: '91%' },
];

export const recentActivity: { title: string; detail: string; meta: string; time: string; icon: IconName; tint: string; ink: string }[] = [
  { title: 'Proposta PR-0142 enviada', detail: 'para Casa & Conforto Móveis', meta: 'Comércio · R$ 39.900', time: '09:42', icon: 'send', tint: '#FEF3C7', ink: '#B45309' },
  { title: 'Chamado CH-311 resolvido', detail: 'falha na integração fiscal', meta: 'Supermercado Nova Era · Supermercados', time: '09:10', icon: 'headset', tint: '#DCFCE7', ink: '#15803D' },
  { title: 'Nova demanda registrada', detail: 'apontamento de produção', meta: 'Metalúrgica Vale Forte · Indústria', time: 'Ontem', icon: 'bulb', tint: '#F3E8FF', ink: '#7C3AED' },
  { title: 'Fornecedor ValidaTech', detail: 'adicionado à avaliação', meta: 'Pesquisa: validade de perecíveis', time: 'Ontem', icon: 'building', tint: '#E0F2FE', ink: '#0369A1' },
  { title: 'Sprint 4 concluída', detail: 'no app de inventário', meta: 'Rede Bom Preço · Projeto PJ-018', time: '19/11', icon: 'code', tint: '#E8F0FE', ink: '#1D4ED8' },
];

export type TaskKind = 'reuniao' | 'alta' | 'demo' | 'follow' | 'contrato';

export const taskKinds: Record<TaskKind, { label: string; bg: string; fg: string }> = {
  reuniao: { label: 'Reunião', bg: '#E8F0FE', fg: '#1D4ED8' },
  alta: { label: 'Prioridade alta', bg: '#FEE2E2', fg: '#B91C1C' },
  demo: { label: 'Demonstração', bg: '#EDE9FE', fg: '#5B21B6' },
  follow: { label: 'Follow-up', bg: '#FEF3C7', fg: '#92400E' },
  contrato: { label: 'Contrato', bg: '#DCFCE7', fg: '#166534' },
};

export const upcomingTasks: { id: string; day: string; today?: boolean; time: string; title: string; who: string; kind: TaskKind }[] = [
  { id: 'tk1', day: 'HOJE', today: true, time: '14:00', title: 'Reunião de diagnóstico', who: 'Clínica Integra Saúde · Serviços', kind: 'reuniao' },
  { id: 'tk2', day: 'HOJE', today: true, time: '16:30', title: 'Revisar escopo da integração PDV × ERP', who: 'Rede Bom Preço · Supermercados', kind: 'alta' },
  { id: 'tk3', day: 'SEG 23', time: '10:00', title: 'Demo do protótipo de apontamento', who: 'Metalúrgica Vale Forte · Indústria', kind: 'demo' },
  { id: 'tk4', day: 'TER 24', time: '09:00', title: 'Follow-up da proposta PR-0139', who: 'Supermercado Nova Era · Supermercados', kind: 'follow' },
  { id: 'tk5', day: 'QUA 25', time: '15:00', title: 'Renovação do contrato de suporte', who: 'Prisma Contábil · Serviços', kind: 'contrato' },
];
