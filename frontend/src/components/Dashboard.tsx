'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Greeting } from './Greeting';
import { ApiStatus } from './ApiStatus';
import { SegmentTabs, type SegmentFilter } from './SegmentTabs';
import { KpiGrid } from './KpiGrid';
import { ServiceCycle } from './ServiceCycle';
import { DemandTrendChart, FunnelChart, SegmentDonut } from './charts';
import { OpportunitiesTable } from './OpportunitiesTable';
import { AiAssistantCard } from './AiAssistantCard';
import { SolutionResearch } from './SolutionResearch';
import { RecentActivity } from './RecentActivity';
import { UpcomingTasks } from './UpcomingTasks';

export function Dashboard() {
  const [segment, setSegment] = useState<SegmentFilter>('todos');

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header />
        <div className="content">
          <Greeting />
          <ApiStatus />
          <SegmentTabs value={segment} onChange={setSegment} />
          <KpiGrid />
          <ServiceCycle />
          <div className="grid-2-1">
            <DemandTrendChart />
            <SegmentDonut />
          </div>
          <div className="grid-2-1">
            <OpportunitiesTable segment={segment} />
            <AiAssistantCard />
          </div>
          <div className="grid-1-1">
            <FunnelChart />
            <SolutionResearch />
          </div>
          <div className="grid-1-1">
            <RecentActivity />
            <UpcomingTasks />
          </div>
        </div>
      </main>
    </div>
  );
}
