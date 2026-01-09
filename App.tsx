import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PasswordGenerator from './pages/PasswordGenerator';
import MarginCalculator from './pages/MarginCalculator';

const Header: React.FC = () => {
  return (
    <header className="bg-white px-8 py-4 shadow-sm flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold text-primary no-underline flex items-center gap-2 hover:opacity-90 transition-opacity">
        ⚡ SuiteEmprende
        <span className="hidden md:inline text-sm font-normal text-gray-500 ml-4">
          Tu oficina digital: Sin registros, 100% gratis.
        </span>
      </Link>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="text-center p-8 text-gray-500 mt-12 text-sm">
      Hecho con <span className="text-primary">❤</span> para emprendedores. | Hospedado en GitHub Pages.
    </footer>
  );
};

// Component helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow max-w-6xl mx-auto w-full p-4 mt-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tools/passwords" element={<PasswordGenerator />} />
            <Route path="/tools/margen" element={<MarginCalculator />} />
            {/* Placeholder routes for other tools - they will redirect to Home for now or show a "Coming Soon" if we built a specific page */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;