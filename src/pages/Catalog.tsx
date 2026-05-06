import React from 'react';
import { workloads } from '../data/workloads';
import { WorkloadCard } from '../components/WorkloadCard';
import { Github, Database } from 'lucide-react';
import { WorkloadSummaryTable } from '../components/WorkloadSummaryTable';

export function Catalog() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-zinc-50 mb-4">
            Workload Catalog
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            This is catalog of benchmarking workloads that represent real-world inference use cases. Extending beyond standard single-turn prompts, it models the distinct system constraints of agentic workflows—where models generate commands, pause for external tool execution, and inject results into subsequent prompts. By simulating these causal dependencies and inter-request wait times, users can evaluate KV cache retention, prefix-aware routing, and memory fragmentation under realistic agent-driven load.
          </p>
        </div>
        <a 
          href="https://github.com/kubernetes-sigs/inference-perf/tree/main/workload-catalog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          <Github className="h-4 w-4" />
          View on GitHub
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workloads.map((workload) => (
          <WorkloadCard key={workload.id} workload={workload} />
        ))}
      </div>

      <WorkloadSummaryTable />
    </div>
  );
}
