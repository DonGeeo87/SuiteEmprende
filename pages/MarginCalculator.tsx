import React, { useState, useEffect } from 'react';
import ToolLayout from '../components/ToolLayout';

const MarginCalculator: React.FC = () => {
  const [cost, setCost] = useState<number | ''>('');
  const [margin, setMargin] = useState<number | ''>('');
  const [revenue, setRevenue] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);

  useEffect(() => {
    const costVal = Number(cost);
    const marginVal = Number(margin);

    if (costVal > 0 && marginVal > 0 && marginVal < 100) {
      // Formula: Revenue = Cost / (1 - Margin%)
      const calculatedRevenue = costVal / (1 - (marginVal / 100));
      const calculatedProfit = calculatedRevenue - costVal;

      setRevenue(calculatedRevenue);
      setProfit(calculatedProfit);
    } else {
      setRevenue(0);
      setProfit(0);
    }
  }, [cost, margin]);

  return (
    <ToolLayout
      title="Calculadora de Margen"
      description="Calcula el precio de venta real basado en el margen de ganancia que deseas obtener."
      tip="El margen se calcula sobre el precio de venta final. Si quieres ganar un 30% del precio total, esta es tu herramienta."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Costo del Producto ($)
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(parseFloat(e.target.value) || '')}
              placeholder="Ej: 100"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Margen de Ganancia Deseado (%)
            </label>
            <input
              type="number"
              value={margin}
              onChange={(e) => setMargin(parseFloat(e.target.value) || '')}
              placeholder="Ej: 30"
              max="99"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg"
            />
            <p className="text-xs text-gray-400 mt-2">
              Nota: El margen es cuánto te queda del precio de venta final.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-dark text-white p-8 rounded-xl shadow-lg flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-6 opacity-90">Resultados</h2>

          <div className="mb-8">
            <p className="text-sm uppercase tracking-wider opacity-60 mb-1">Precio de Venta</p>
            <div className="text-5xl font-bold text-primary">
              ${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-700">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm uppercase tracking-wider opacity-60 mb-1">Ganancia Neta</p>
                <div className="text-3xl font-bold text-green-400">
                  +${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h3 className="font-bold text-dark mb-2">¿Por qué usar esta fórmula?</h3>
        <p className="text-sm text-gray-600">
          Muchos emprendedores cometen el error de simplemente sumar un porcentaje al costo (Markup).
          Sin embargo, el <strong>Margen</strong> se calcula sobre el precio final. Si quieres que de cada $100 que vendes, te queden $30 libres, debes usar esta calculadora, no una suma simple.
        </p>
      </div>
    </ToolLayout>
  );
};

export default MarginCalculator;
