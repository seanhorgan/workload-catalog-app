import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { workloads } from '../data/workloads';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';

export function WorkloadDetail() {
  const { id } = useParams<{ id: string }>();
  const workload = workloads.find(w => w.id === id);

  if (!workload) {
    return <Navigate to="/" replace />;
  }



  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Catalog
      </Link>

      <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white mb-2">
            {workload.title}
          </h1>
          <p className="text-zinc-400 text-lg">
            {workload.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">

          <a
            href={workload.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">Source</span>
          </a>
        </div>
      </div>

      <div className="space-y-12">
        {/* Use Case Narrative */}
        <section>
          <h2 className="font-display text-xl font-semibold text-white mb-4">Use Case Narrative</h2>
          <div className="prose prose-invert max-w-none text-zinc-300">
            <p className="leading-relaxed">{workload.narrative}</p>
          </div>
        </section>

        {/* Configuration Variables */}
        <section>
          <h2 className="font-display text-xl font-semibold text-white mb-4">Configuration Variables</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                'systemPrompt',
                'isl',
                'islNewPerTurn',
                'distribution',
                'multiTurn',
                'turnsMean',
                'timeBetweenTurns',
                'osl',
                'modelTemperature'
              ].map((key) => {
                const value = workload.variables[key as keyof typeof workload.variables];
                const label = key === 'distribution' ? 'Input Distribution' : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                
                // Extract parenthetical suffix if present
                const match = value.match(/\((.*?)\)/);
                const suffix = match ? `(${match[1]})` : '';
                const cleanVal = value.replace(/\s*\(.*?\)/g, '');

                return (
                  <div key={key} className="space-y-1">
                    <dt className="text-xs font-medium text-zinc-400 tracking-wider flex items-center gap-1">
                      <span className="uppercase">{label}</span>
                      {suffix && <span className="text-zinc-500 lowercase">{suffix}</span>}
                    </dt>
                    <dd className="text-sm text-zinc-100 font-medium break-words">{cleanVal}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>



        {/* Bottom grid for Models and System Impact */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Key Models & Datasets */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-4">Key Models & Datasets</h2>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden h-full">
              <dl className="divide-y divide-zinc-800">
                <div className="flex flex-col py-3 px-4 sm:flex-row gap-2">
                  <dt className="w-1/3 text-sm font-medium text-zinc-400">Top Models</dt>
                  <dd className="w-2/3 text-sm text-zinc-200">{workload.models}</dd>
                </div>
                <div className="flex flex-col py-3 px-4 sm:flex-row gap-2">
                  <dt className="w-1/3 text-sm font-medium text-zinc-400">Reference Dataset</dt>
                  <dd className="w-2/3 text-sm text-zinc-200">
                    <a href={workload.dataset} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline underline-offset-4">
                      Dataset Link <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* System Impact */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-4">System Impact</h2>
            <div className="rounded-xl bg-zinc-900/80 p-6 border border-zinc-800">
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                This workload relies heavily on the following optimizations to maintain optimal latency and scale efficiently:
              </p>
              <div className="text-sm text-zinc-100 font-medium break-words">
                {workload.variables.serverOptimizations}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
