import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PasswordGenerator from './pages/PasswordGenerator';
import MarginCalculator from './pages/MarginCalculator';
import WhatsAppLink from './pages/WhatsAppLink';
import DiscountCalculator from './pages/DiscountCalculator';
import ImageCompressor from './pages/ImageCompressor';
import ImageCropper from './pages/ImageCropper';
import Watermark from './pages/Watermark';
import SignatureGenerator from './pages/SignatureGenerator';
import QuoteGenerator from './pages/QuoteGenerator';
import PDFEditor from './pages/PDFEditor';
import PricingCalculator from './pages/PricingCalculator';
import BreakEvenCalculator from './pages/BreakEvenCalculator';

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
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow max-w-6xl mx-auto w-full p-4 mt-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tools/password" element={<PasswordGenerator />} />
            <Route path="/tools/margen" element={<MarginCalculator />} />
            <Route path="/tools/whatsapp" element={<WhatsAppLink />} />
            <Route path="/tools/descuentos" element={<DiscountCalculator />} />
            <Route path="/tools/comprimir" element={<ImageCompressor />} />
            <Route path="/tools/recortar" element={<ImageCropper />} />
            <Route path="/tools/marca-agua" element={<Watermark />} />
            <Route path="/tools/firma" element={<SignatureGenerator />} />
            <Route path="/tools/cotizador" element={<QuoteGenerator />} />
            <Route path="/tools/rellenador-pdf" element={<PDFEditor />} />
            <Route path="/tools/precio-venta" element={<PricingCalculator />} />
            <Route path="/tools/punto-equilibrio" element={<BreakEvenCalculator />} />
            {/* Placeholder routes for other tools - they will redirect to Home for now or show a "Coming Soon" if we built a specific page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;