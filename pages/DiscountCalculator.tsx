import React, { useState, useEffect } from 'react';
import ToolLayout from '../components/ToolLayout';

const DiscountCalculator: React.FC = () => {
    const [originalPrice, setOriginalPrice] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);

    // Calculated values
    const [finalPrice, setFinalPrice] = useState<number>(0);
    const [savings, setSavings] = useState<number>(0);
    const [margin, setMargin] = useState<number>(0);
    const [marginPercentage, setMarginPercentage] = useState<number>(0);
    const [isLoss, setIsLoss] = useState<boolean>(false);

    useEffect(() => {
        const price = parseFloat(originalPrice) || 0;
        const productCost = parseFloat(cost) || 0;
        const discountAmount = (price * discount) / 100;
        const final = price - discountAmount;
        const profit = final - productCost;
        const profitPercent = final > 0 ? (profit / final) * 100 : 0;

        setFinalPrice(final);
        setSavings(discountAmount);
        setMargin(profit);
        setMarginPercentage(profitPercent);
        setIsLoss(profit < 0);
    }, [originalPrice, cost, discount]);

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const formatPercent = (value: number): string => {
        return `${value.toFixed(1)}%`;
    };

    return (
        <ToolLayout
            title="Calculadora de Ofertas"
            description="Define descuentos inteligentes sin perder dinero. Calcula el precio final y tu margen de ganancia."
            tip="Siempre verifica que tu margen de ganancia sea positivo después del descuento. Un buen margen mínimo es 20-30%."
        >
            <div className="space-y-6">
                {/* Original Price Input */}
                <div>
                    <label htmlFor="originalPrice" className="block text-sm font-semibold text-dark mb-2">
                        Precio Original
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                            id="originalPrice"
                            type="number"
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(e.target.value)}
                            placeholder="10000"
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Cost Input */}
                <div>
                    <label htmlFor="cost" className="block text-sm font-semibold text-dark mb-2">
                        Costo del Producto
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                            id="cost"
                            type="number"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            placeholder="5000"
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                        Lo que te cuesta producir o comprar el producto
                    </p>
                </div>

                {/* Discount Slider */}
                <div>
                    <label htmlFor="discount" className="block text-sm font-semibold text-dark mb-2">
                        Descuento: <span className="text-primary">{discount}%</span>
                    </label>
                    <input
                        id="discount"
                        type="range"
                        min="0"
                        max="100"
                        value={discount}
                        onChange={(e) => setDiscount(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* Results */}
                {originalPrice && cost && (
                    <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-dark mb-4">Resultados</h3>

                        {/* Warning if loss */}
                        {isLoss && (
                            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                                <p className="text-red-800 font-semibold">
                                    ⚠️ ¡Cuidado! Con este descuento estás perdiendo dinero
                                </p>
                                <p className="text-sm text-red-700 mt-1">
                                    Reduce el descuento o aumenta el precio original
                                </p>
                            </div>
                        )}

                        {/* Success if good margin */}
                        {!isLoss && marginPercentage >= 20 && (
                            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                                <p className="text-green-800 font-semibold">
                                    ✓ Excelente margen de ganancia
                                </p>
                            </div>
                        )}

                        {/* Warning if low margin */}
                        {!isLoss && marginPercentage < 20 && marginPercentage > 0 && (
                            <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                                <p className="text-yellow-800 font-semibold">
                                    ⚡ Margen bajo - considera reducir el descuento
                                </p>
                            </div>
                        )}

                        {/* Results Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Final Price */}
                            <div className="p-4 bg-gradient-to-br from-primary to-purple-600 rounded-lg text-white">
                                <p className="text-sm opacity-90 mb-1">Precio Final</p>
                                <p className="text-3xl font-bold">{formatCurrency(finalPrice)}</p>
                            </div>

                            {/* Savings */}
                            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                                <p className="text-sm opacity-90 mb-1">Ahorro del Cliente</p>
                                <p className="text-3xl font-bold">{formatCurrency(savings)}</p>
                            </div>

                            {/* Margin */}
                            <div className={`p-4 rounded-lg text-white ${isLoss
                                    ? 'bg-gradient-to-br from-red-500 to-red-600'
                                    : 'bg-gradient-to-br from-green-500 to-green-600'
                                }`}>
                                <p className="text-sm opacity-90 mb-1">Tu Ganancia</p>
                                <p className="text-3xl font-bold">{formatCurrency(margin)}</p>
                            </div>

                            {/* Margin Percentage */}
                            <div className={`p-4 rounded-lg text-white ${isLoss
                                    ? 'bg-gradient-to-br from-red-500 to-red-600'
                                    : marginPercentage >= 20
                                        ? 'bg-gradient-to-br from-green-500 to-green-600'
                                        : 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                                }`}>
                                <p className="text-sm opacity-90 mb-1">Margen de Ganancia</p>
                                <p className="text-3xl font-bold">{formatPercent(marginPercentage)}</p>
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-dark mb-3">Desglose</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Precio original:</span>
                                    <span className="font-semibold">{formatCurrency(parseFloat(originalPrice))}</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span>Descuento ({discount}%):</span>
                                    <span className="font-semibold">- {formatCurrency(savings)}</span>
                                </div>
                                <div className="flex justify-between border-t border-gray-300 pt-2">
                                    <span className="text-gray-600">Precio final:</span>
                                    <span className="font-semibold">{formatCurrency(finalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-orange-600">
                                    <span>Costo del producto:</span>
                                    <span className="font-semibold">- {formatCurrency(parseFloat(cost))}</span>
                                </div>
                                <div className={`flex justify-between border-t border-gray-300 pt-2 font-bold ${isLoss ? 'text-red-600' : 'text-green-600'
                                    }`}>
                                    <span>Tu ganancia:</span>
                                    <span>{formatCurrency(margin)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {(!originalPrice || !cost) && (
                    <div className="text-center py-12 text-gray-400">
                        <div className="text-6xl mb-4">🏷️</div>
                        <p>Ingresa el precio original y el costo para calcular tu descuento</p>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default DiscountCalculator;
