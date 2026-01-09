import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';

const BreakEvenCalculator: React.FC = () => {
    const [fixedCosts, setFixedCosts] = useState('');
    const [variableCostPerUnit, setVariableCostPerUnit] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');

    const calculateBreakEven = () => {
        const fixed = parseFloat(fixedCosts) || 0;
        const variable = parseFloat(variableCostPerUnit) || 0;
        const price = parseFloat(pricePerUnit) || 0;

        if (price <= variable) {
            return {
                units: 0,
                revenue: 0,
                contributionMargin: 0,
                contributionMarginPercent: 0,
                isValid: false,
                message: 'El precio debe ser mayor al costo variable'
            };
        }

        const contributionMargin = price - variable;
        const contributionMarginPercent = (contributionMargin / price) * 100;
        const breakEvenUnits = Math.ceil(fixed / contributionMargin);
        const breakEvenRevenue = breakEvenUnits * price;

        return {
            units: breakEvenUnits,
            revenue: breakEvenRevenue,
            contributionMargin,
            contributionMarginPercent,
            isValid: true,
            message: ''
        };
    };

    const results = calculateBreakEven();

    return (
        <ToolLayout
            title="Calculadora de Punto de Equilibrio"
            description="Descubre cuánto necesitas vender para cubrir todos tus costos y empezar a ganar."
            tip="El punto de equilibrio es donde tus ingresos igualan tus costos totales. A partir de ahí, todo es ganancia."
        >
            <div className="space-y-6">
                {/* Educational Section */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-5 rounded-r-xl">
                    <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                        <span className="text-2xl">🎓</span>
                        <span>¿Qué es el Punto de Equilibrio?</span>
                    </h3>
                    <div className="space-y-2 text-sm text-indigo-800">
                        <p>
                            Es el número mínimo de ventas que necesitas para <strong>no perder ni ganar dinero</strong>.
                            A partir de ese punto, cada venta adicional es ganancia pura.
                        </p>
                        <div className="bg-white/50 p-3 rounded-lg mt-3">
                            <p className="font-semibold mb-2">📝 Conceptos clave:</p>
                            <ul className="space-y-1 ml-4">
                                <li><strong>• Costos Fijos:</strong> Gastos que pagas siempre (arriendo, sueldos, servicios)</li>
                                <li><strong>• Costos Variables:</strong> Gastos que dependen de cuánto produces (materiales, envíos)</li>
                                <li><strong>• Margen de Contribución:</strong> Lo que queda de cada venta para cubrir costos fijos</li>
                            </ul>
                        </div>
                        <p className="mt-3 bg-indigo-100 p-2 rounded font-mono text-xs">
                            Fórmula: Punto de Equilibrio = Costos Fijos / (Precio - Costo Variable)
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column - Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                💼 Costos Fijos Mensuales
                            </label>
                            <input
                                type="number"
                                value={fixedCosts}
                                onChange={(e) => setFixedCosts(e.target.value)}
                                placeholder="500000"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Arriendo + sueldos + servicios + seguros (todo lo que pagas aunque no vendas nada)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                📦 Costo Variable por Unidad
                            </label>
                            <input
                                type="number"
                                value={variableCostPerUnit}
                                onChange={(e) => setVariableCostPerUnit(e.target.value)}
                                placeholder="5000"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Materiales + envío + comisiones (lo que cuesta producir/comprar cada unidad)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                💰 Precio de Venta por Unidad
                            </label>
                            <input
                                type="number"
                                value={pricePerUnit}
                                onChange={(e) => setPricePerUnit(e.target.value)}
                                placeholder="15000"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                El precio al que vendes cada producto a tus clientes
                            </p>
                        </div>

                        {/* Example */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-xs font-semibold text-gray-700 mb-2">💡 Ejemplo práctico:</p>
                            <p className="text-xs text-gray-600">
                                Tienes un local de ropa. Pagas $500.000 mensuales de arriendo y servicios (fijos).
                                Cada polera te cuesta $5.000 (variable). La vendes a $15.000.
                                Necesitas vender <strong>50 poleras</strong> para cubrir tus gastos.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Results */}
                    <div className="space-y-4">
                        {results.isValid ? (
                            <>
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
                                    <h3 className="text-sm font-semibold opacity-90 mb-2">🎯 Punto de Equilibrio</h3>
                                    <div className="text-5xl font-bold mb-1">{results.units}</div>
                                    <p className="text-sm opacity-75">unidades por mes</p>
                                </div>

                                <div className="bg-white border-2 border-gray-200 rounded-xl p-5 space-y-3">
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                        <span className="text-sm text-gray-600">Ingresos necesarios</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            ${results.revenue.toLocaleString('es-CL', { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                        <span className="text-sm text-gray-600">Margen de contribución</span>
                                        <span className="text-lg font-bold text-primary">
                                            ${results.contributionMargin.toLocaleString('es-CL', { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">% de contribución</span>
                                        <span className="text-lg font-bold text-green-600">
                                            {results.contributionMarginPercent.toFixed(1)}%
                                        </span>
                                    </div>
                                </div>

                                {/* Interpretation */}
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">📊 ¿Qué significa esto?</h4>
                                    <p className="text-sm text-blue-800">
                                        Necesitas vender <strong>{results.units} unidades</strong> para no perder dinero.
                                        Cada unidad que vendas después de esa cantidad te dará{' '}
                                        <strong>${results.contributionMargin.toLocaleString('es-CL', { maximumFractionDigits: 0 })}</strong> de ganancia neta.
                                    </p>
                                </div>

                                {/* Projection */}
                                <div className="bg-gray-50 rounded-xl p-5">
                                    <h4 className="font-semibold text-gray-900 mb-3">🚀 Proyección de Ganancias</h4>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'En el punto de equilibrio', qty: results.units, color: 'text-gray-600' },
                                            { label: '+20% de ventas', qty: Math.ceil(results.units * 1.2), color: 'text-blue-600' },
                                            { label: '+50% de ventas', qty: Math.ceil(results.units * 1.5), color: 'text-green-600' },
                                            { label: 'Duplicando ventas', qty: results.units * 2, color: 'text-purple-600' }
                                        ].map((scenario) => {
                                            const profit = (scenario.qty - results.units) * results.contributionMargin;
                                            return (
                                                <div key={scenario.label} className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600">{scenario.label} ({scenario.qty} un.):</span>
                                                    <span className={`font-bold ${scenario.color}`}>
                                                        {profit > 0 ? `+$${profit.toLocaleString('es-CL', { maximumFractionDigits: 0 })}` : '$0'}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Tips */}
                                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                    <h4 className="font-semibold text-yellow-900 mb-2">💡 Consejos para mejorar</h4>
                                    <ul className="text-sm text-yellow-800 space-y-1">
                                        <li>• <strong>Reducir costos fijos:</strong> Negocia arriendos, optimiza servicios</li>
                                        <li>• <strong>Bajar costos variables:</strong> Compra al por mayor, mejora procesos</li>
                                        <li>• <strong>Subir precio:</strong> Agrega valor, diferénciate de la competencia</li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
                                <div className="text-6xl mb-4">⚠️</div>
                                <p className="text-red-800 font-semibold mb-2">Error en los datos</p>
                                <p className="text-sm text-red-600">
                                    {results.message || 'Verifica que todos los campos tengan valores válidos'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default BreakEvenCalculator;
