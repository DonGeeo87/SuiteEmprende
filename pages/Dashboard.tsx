import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';
import SEO from '../components/SEO';

const tools: Tool[] = [
  { id: 'pdf', icon: '📝', title: 'Rellenar PDF', description: 'Completa formularios y postulaciones sin imprimir.', path: '/tools/rellenador-pdf', isReady: true },
  { id: 'quote', icon: '📄', title: 'Cotizador Express', description: 'Crea presupuestos formales en segundos.', path: '/tools/cotizador', isReady: true },
  { id: 'sign', icon: '✍️', title: 'Firma Digital', description: 'Dibuja tu firma y descárgala sin fondo.', path: '/tools/firma', isReady: true },
  { id: 'whatsapp', icon: '💬', title: 'Link WhatsApp', description: 'Genera enlaces directos y códigos QR.', path: '/tools/whatsapp', isReady: true },
  { id: 'margin', icon: '💰', title: 'Calculadora Margen', description: 'Calcula el precio de venta exacto para ganar dinero.', path: '/tools/margen', isReady: true },
  { id: 'discount', icon: '🏷️', title: 'Calculadora Ofertas', description: 'Define descuentos sin perder dinero.', path: '/tools/descuentos', isReady: true },
  { id: 'compress', icon: '🖼️', title: 'Comprimir Fotos', description: 'Reduce el peso de tus imágenes para la web.', path: '/tools/comprimir', isReady: true },
  { id: 'watermark', icon: '💧', title: 'Marca de Agua', description: 'Protege las fotos de tus productos.', path: '/tools/marca-agua', isReady: true },
  { id: 'crop', icon: '✂️', title: 'Recortar para Redes', description: 'Ajusta tus fotos a formato Historia o Post.', path: '/tools/recortar', isReady: true },
  { id: 'pass', icon: '🔐', title: 'Generar Claves', description: 'Crea contraseñas seguras y aleatorias.', path: '/tools/password', isReady: true },
  { id: 'pricing', icon: '🏭', title: 'Precio de Venta', description: 'Calcula precios para fabricantes y revendedores.', path: '/tools/precio-venta', isReady: true },
  { id: 'breakeven', icon: '📊', title: 'Punto de Equilibrio', description: 'Descubre cuánto necesitas vender para no perder.', path: '/tools/punto-equilibrio', isReady: true },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <SEO
        title="Inicio"
        description="Suite de herramientas digitales gratuitas para emprendedores: firma digital, calculadora de márgenes, compresor de imágenes y más."
        url="/"
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark mb-4">Todo lo que necesitas para vender más</h1>
        <p className="text-xl text-gray-500">Herramientas simples que funcionan en tu navegador. Privacidad total.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.isReady ? tool.path : '#'}
            className={`
              bg-white p-8 rounded-xl flex flex-col items-center text-center transition-all duration-200 border border-transparent
              ${tool.isReady
                ? 'hover:-translate-y-1 hover:shadow-lg hover:border-primary cursor-pointer'
                : 'opacity-60 cursor-not-allowed hover:border-gray-300 relative'
              }
            `}
          >
            {!tool.isReady && (
              <span className="absolute top-2 right-2 bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded">
                Pronto
              </span>
            )}
            <div className="text-5xl mb-4">{tool.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-dark">{tool.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;