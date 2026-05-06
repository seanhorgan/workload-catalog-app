import React from 'react';
import { workloads } from '../data/workloads';

export function WorkloadSummaryTable() {
  // Helper to clean up mean/max text
  const cleanValue = (val: string) => val.replace(/\s*\(.*?\)/g, '');

  return (
    <div className="mt-16">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-50 mb-2">
          Configuration Summary
        </h2>
        <p className="text-zinc-400 text-sm">
          A direct comparison of the configuration variables across all catalog items.
        </p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900">
        <table className="w-full text-xs text-left text-zinc-400 table-fixed">
          <thead className="text-xs bg-zinc-800 text-zinc-300">
            <tr>
              <th scope="col" className="px-4 py-2 font-medium w-32 bg-zinc-850">Variable</th>
              {workloads.map((w) => (
                <th key={w.id} scope="col" className="px-4 py-2 font-medium" title={w.title}>
                  {w.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-800">
              <td className="px-4 py-2 font-medium text-zinc-300 bg-zinc-850">Sys Prompt</td>
              {workloads.map((w) => <td key={w.id} className="px-4 py-2">{w.variables.systemPrompt}</td>)}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="px-4 py-2 font-medium text-zinc-300 bg-zinc-850">ISL (Typical, Max)</td>
              {workloads.map((w) => <td key={w.id} className="px-4 py-2">{cleanValue(w.variables.isl)}</td>)}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="px-4 py-2 font-medium text-zinc-300 bg-zinc-850">ISL New/Turn</td>
              {workloads.map((w) => <td key={w.id} className="px-4 py-2">{w.variables.islNewPerTurn}</td>)}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="px-4 py-2 font-medium text-zinc-300 bg-zinc-850">Input Distribution</td>
              {workloads.map((w) => <td key={w.id} className="px-4 py-2">{w.variables.distribution}</td>)}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="px-4 py-2 font-medium text-zinc-300 bg-zinc-850">OSL (Typical, Max)</td>
              {workloads.map((w) => <td key={w.id} className="px-4 py-2">{cleanValue(w.variables.osl)}</td>)}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="px-4 py-2 font-medium text-zinc-300 bg-zinc-850">Multi-Turn</td>
              {workloads.map((w) => <td key={w.id} className="px-4 py-2">{w.variables.multiTurn}</td>)}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="px-4 py-2 font-medium text-zinc-300 bg-zinc-850">Turns</td>
              {workloads.map((w) => <td key={w.id} className="px-4 py-2">{w.variables.turnsMean}</td>)}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="px-4 py-2 font-medium text-zinc-300 bg-zinc-850">Time/Turn</td>
              {workloads.map((w) => <td key={w.id} className="px-4 py-2">{w.variables.timeBetweenTurns}</td>)}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="px-4 py-2 font-medium text-zinc-300 bg-zinc-850">Temp</td>
              {workloads.map((w) => <td key={w.id} className="px-4 py-2">{w.variables.modelTemperature}</td>)}
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium text-zinc-300 bg-zinc-850">Optimizations</td>
              {workloads.map((w) => (
                <td key={w.id} className="px-4 py-2 text-zinc-400 text-xs" title={w.variables.serverOptimizations}>
                  <div className="line-clamp-2">{w.variables.serverOptimizations}</div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
