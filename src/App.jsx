import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy loading pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Architecture = lazy(() => import('./pages/Architecture'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Asset = lazy(() => import('./pages/Asset'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Monetization = lazy(() => import('./pages/Monetization'));
const Pilot = lazy(() => import('./pages/Pilot'));

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0B]">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen bg-[#0B0B0B]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rail-orange"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/asset/:id" element={<Asset />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/monetization" element={<Monetization />} />
            <Route path="/pilot" element={<Pilot />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
