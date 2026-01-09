import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';

type CalculatorMode = 'manufacturer' | 'reseller';

const PricingCalculator: React.FC = () => {
    const [mode, setMode] = useState<CalculatorMode>('manufacturer');

    // Manufacturer inputs
    const [productionCost, setProductionCost] = useState('');
    const [operatingCosts, setOperatingCosts] = useState('');
    const [desiredMargin, setDesiredMargin] = useState('30');

    // Reseller inputs
    const [purchasePrice, setPurchasePrice] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [resellerMargin, setResellerMargin] = useState('40');

    const calculateManufacturerPrice = () => {
        const cost = parseFloat(productionCost) || 0;
        const operating = parseFloat(operatingCosts) || 0;
        const margin = parseFloat(desiredMargin) || 0;

        const totalCost = cost + operating;
        const salePrice = totalCost / (1 - margin / 100);
        const profit = salePrice - totalCost;

        return { totalCost, salePrice, profit, margin };
    };

    const calculateResellerPrice = () => {
        const purchase = parseFloat(purchasePrice) || 0;
        const shipping = parseFloat(shippingCost) || 0;
        const margin = parseFloat(resellerMargin) || 0;

        const totalCost = purchase + shipping;
        const salePrice = totalCost / (1 - margin / 100);
        const profit = salePrice - totalCost;

        return { totalCost, salePrice, profit, margin };
    };

    const manufacturerResults = calculateManufacturerPrice();
    const resellerResults = calculateResellerPrice();
    const results = mode === 'manufacturer' ? manufacturerResults : resellerResults;

    return (
        <ToolLayout
            title="Calculadora de Precio de Venta"
            description="Calcula el precio ideal para fabricantes y revendedores considerando costos y márgenes."
            tip="Un margen saludable para fabricantes es 25-40%, y para revendedores 30-50%."
        >
            <div className="space-y-6">
                {/* Mode Selector */}
                <div className="flex gap-3 bg-gray-100 p-2 rounded-xl">
                    <button
                        onClick={() => setMode('manufacturer')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${mode === 'manufacturer'
                                ? 'bg-white text-primary shadow-md'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        🏭 Soy Fabricante
                    </button>
                    <button
                        onClick={() => setMode('reseller')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${mode === 'reseller'
                                ? 'bg-white text-primary shadow-md'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        🛍️ Soy Revendedor
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column - Inputs */}
                    <div className="space-y-4">
                        {mode === 'manufacturer' ? (
                            <>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                    <h3 className="font-bold text-blue-900 mb-2">📚 Mini Lección: Fabricantes</h3>
                                    <p className="text-sm text-blue-800">
                                        Como fabricante, debes cubrir el <strong>costo de producción</strong> (materiales, mano de obra)
                                        y los <strong>gastos operativos</strong> (arriendo, luz, sueldos). Tu margen debe permitirte
                                        reinvertir y crecer. Fórmula: <code className="bg-blue-100 px-1 rounded">Precio = Costos / (1 - Margen%/100)</code>
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Costo de Producción (por unidad)
                                    </label>
                                    <input
                                        type="number"
                                        value={productionCost}
                                        onChange={(e) => setProductionCost(e.target.value)}
                                        placeholder="5000"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Materiales + mano de obra directa</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Gastos Operativos (por unidad)
                                    </label>
                                    <input
                                        type="number"
                                        value={operatingCosts}
                                        onChange={(e) => setOperatingCosts(e.target.value)}
                                        placeholder="2000"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Arriendo, servicios, marketing (prorrateado)</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Margen de Ganancia Deseado (%)
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min="10"
                                            max="70"
                                            step="5"
                                            value={desiredMargin}
                                            onChange={(e) => setDesiredMargin(e.target.value)}
                                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <span className="text-2xl font-bold text-primary w-16 text-right">{desiredMargin}%</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Bajo (10%)</span>
                                        <span>Óptimo (30-40%)</span>
                                        <span>Alto (70%)</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                                    <h3 className="font-bold text-purple-900 mb-2">📚 Mini Lección: Revendedores</h3>
                                    <p className="text-sm text-purple-800">
                                        Como revendedor, compras productos terminados y los vendes con un margen.
                                        Debes cubrir el <strong>precio de compra</strong> y los <strong>costos de envío/importación</strong>.
                                        Tu margen debe cubrir tus gastos operativos y generar utilidad.
                                        Márgenes típicos: 30-50% según el rubro.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Precio de Compra (por unidad)
                                    </label>
                                    <input
                                        type="number"
                                        value={purchasePrice}
                                        onChange={(e) => setPurchasePrice(e.target.value)}
                                        placeholder="10000"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Lo que pagas al proveedor/mayorista</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Costo de Envío/Importación (por unidad)
                                    </label>
                                    <input
                                        type="number"
                                        value={shippingCost}
                                        onChange={(e) => setShippingCost(e.target.value)}
                                        placeholder="1500"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Envío, aduanas, almacenamiento (prorrateado)</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Margen de Ganancia Deseado (%)
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min="15"
                                            max="80"
                                            step="5"
                                            value={resellerMargin}
                                            onChange={(e) => setResellerMargin(e.target.value)}
                                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <span className="text-2xl font-bold text-primary w-16 text-right">{resellerMargin}%</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Bajo (15%)</span>
                                        <span>Óptimo (40-50%)</span>
                                        <span>Alto (80%)</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Column - Results */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-sm font-semibold opacity-90 mb-2">💰 Precio de Venta Sugerido</h3>
                            <div className="text-4xl font-bold mb-1">
                                ${results.salePrice.toLocaleString('es-CL', { maximumFractionDigits: 0 })}
                            </div>
                            <p className="text-sm opacity-75">por unidad</p>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-xl p-5 space-y-3">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="text-sm text-gray-600">Costo Total</span>
                                <span className="text-lg font-bold text-gray-900">
                                    ${results.totalCost.toLocaleString('es-CL', { maximumFractionDigits: 0 })}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="text-sm text-gray-600">Ganancia por Unidad</span>
                                <span className="text-lg font-bold text-green-600">
                                    +${results.profit.toLocaleString('es-CL', { maximumFractionDigits: 0 })}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Margen de Ganancia</span>
                                <span className="text-lg font-bold text-primary">{results.margin.toFixed(1)}%</span>
                            </div>
                        </div>

                        {/* Projection */}
                        <div className="bg-gray-50 rounded-xl p-5">
                            <h4 className="font-semibold text-gray-900 mb-3">📊 Proyección de Ventas</h4>
                            <div className="space-y-2 text-sm">
                                {[10, 50, 100].map(qty => (
                                    <div key={qty} className="flex justify-between">
                                        <span className="text-gray-600">{qty} unidades:</span>
                                        <div className="text-right">
                                            <span className="font-bold text-gray-900">
                                                ${(results.salePrice * qty).toLocaleString('es-CL', { maximumFractionDigits: 0 })}
                                            </span>
                                            <span className="text-green-600 ml-2 text-xs">
                                                (+${(results.profit * qty).toLocaleString('es-CL', { maximumFractionDigits: 0 })} ganancia)
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Warning */}
                        {results.margin < 20 && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                <p className="text-sm text-yellow-800">
                                    ⚠️ <strong>Margen bajo:</strong> Con menos del 20% de margen, podrías tener dificultades
                                    para cubrir imprevistos o crecer. Considera aumentar tu precio o reducir costos.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default PricingCalculator;
