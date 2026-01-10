import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from './SEO';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  tip?: string;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ title, description, children, tip }) => {
  const location = useLocation();

  return (
    <div className="max-w-4xl mx-auto">
      <SEO
        title={title}
        description={description}
        url={location.pathname}
      />
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-primary transition-colors">
          ⚡ Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-dark font-medium">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3">{title}</h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        {children}
      </div>

      {/* Tip */}
      {tip && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">💡 Tip:</span> {tip}
          </p>
        </div>
      )}
    </div>
  );
};

export default ToolLayout;
