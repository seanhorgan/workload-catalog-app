import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { workloads } from '../data/workloads';
import { ArrowLeft, Copy, Github, ExternalLink } from 'lucide-react';

export function WorkloadDetail() {
  const { id } = useParams<{ id: string }>();
  const workload = workloads.find(w => w.id === id);

  if (!workload) {
    return <Navigate to="/" replace />;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

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
          <button
            onClick={handleCopyLink}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-3 text-sm font-medium text-zinc-300 border border-zinc-800 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <Copy className="h-4 w-4" />
            <span className="hidden sm:inline">Copy Link</span>
          </button>
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

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-4">Use Case Narrative</h2>
            <div className="prose prose-invert max-w-none text-zinc-300">
              <p className="leading-relaxed">{workload.narrative}</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-4">Key Models & Datasets</h2>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
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
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-white mb-4">Configuration Variables</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-1">
            <dl className="divide-y divide-zinc-800/60">
              {Object.entries(workload.variables).map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return (
                  <div key={key} className="flex justify-between py-3 px-4 text-sm gap-4">
                    <dt className="font-medium text-zinc-400 truncate">{label}</dt>
                    <dd className="text-right text-zinc-100 break-words max-w-[60%]">{value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
          
          <div className="mt-8 rounded-xl bg-zinc-900/80 p-5 border border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">System Impact</h3>
            <p className="text-sm text-zinc-400">
              This workload relies heavily on <strong className="text-zinc-200 font-medium">{workload.variables.serverOptimizations.toLowerCase()}</strong> to maintain optimal latency and scale efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
