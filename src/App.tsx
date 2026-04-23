/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Catalog } from './pages/Catalog';
import { WorkloadDetail } from './pages/WorkloadDetail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 selection:bg-zinc-800">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/workloads/:id" element={<WorkloadDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
