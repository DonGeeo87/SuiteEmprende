import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ToolLayout from '../components/ToolLayout';

interface QuoteItem {
    id: string;
    description: string;
    quantity: number;
    price: number;
}

const QuoteGenerator: React.FC = () => {
    const [businessName, setBusinessName] = useState('');
    const [clientName, setClientName] = useState('');
    const [items, setItems] = useState<QuoteItem[]>([
        { id: '1', description: '', quantity: 1, price: 0 }
    ]);
    const [taxRate, setTaxRate] = useState(19); // 19% IVA default for Chile

    // Calculations
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = Math.round(subtotal * (taxRate / 100));
    const total = subtotal + tax;

    const addItem = () => {
        setItems([
            ...items,
            { id: Date.now().toString(), description: '', quantity: 1, price: 0 }
        ]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItem = (id: string, field: keyof QuoteItem, value: string | number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text('Cotización', 14, 22);

        doc.setFontSize(10);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);

        // Business & Client Info
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('De:', 14, 45);
        doc.text('Para:', 100, 45);

        doc.setFont('helvetica', 'normal');
        doc.text(businessName || 'Tu Negocio', 14, 52);
        doc.text(clientName || 'Cliente', 100, 52);

        // Table
        const tableBody = items.map(item => [
            item.description || 'Item',
            item.quantity,
            formatCurrency(item.price),
            formatCurrency(item.quantity * item.price)
        ]);

        autoTable(doc, {
            startY: 65,
            head: [['Descripción', 'Cant.', 'Precio Unit.', 'Total']],
            body: tableBody,
            theme: 'striped',
            headStyles: { fillColor: [99, 102, 241] }, // Primary color
        });

        // Totals
        const finalY = (doc as any).lastAutoTable.finalY + 10;

        doc.setFont('helvetica', 'bold');
        doc.text(`Subtotal: ${formatCurrency(subtotal)}`, 140, finalY);
        doc.text(`IVA (${taxRate}%): ${formatCurrency(tax)}`, 140, finalY + 7);

        doc.setFontSize(14);
        doc.setTextColor(99, 102, 241);
        doc.text(`Total a Pagar: ${formatCurrency(total)}`, 140, finalY + 16);

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text('Generado gratis con SuiteEmprende.com', 14, 285);

        doc.save(`cotizacion_${clientName.replace(/\s+/g, '_') || 'cliente'}.pdf`);
    };

    return (
        <ToolLayout
            title="Cotizador Express"
            description="Crea presupuestos profesionales en PDF en segundos."
            tip="Mantén las descripciones breves y claras para que tu cliente entienda rápidamente."
        >
            <div className="space-y-8">
                {/* Info Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Nombre de tu Negocio</label>
                        <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="Ej: Servicios Digitales SPA"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Nombre del Cliente</label>
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="Ej: Juan Pérez"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                </div>

                {/* Items Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-gray-100 border-b text-left text-sm font-semibold text-gray-600">
                            <tr>
                                <th className="p-4 w-1/2">Descripción</th>
                                <th className="p-4 w-24">Cant.</th>
                                <th className="p-4 w-32">Precio</th>
                                <th className="p-4 w-32 text-right">Total</th>
                                <th className="p-4 w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 group">
                                    <td className="p-3">
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                            placeholder="Descripción del producto/servicio"
                                            className="w-full bg-transparent p-2 border border-transparent hover:border-gray-200 focus:border-primary rounded focus:outline-none"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                            className="w-full bg-transparent p-2 border border-transparent hover:border-gray-200 focus:border-primary rounded focus:outline-none text-center"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <input
                                            type="number"
                                            min="0"
                                            value={item.price}
                                            onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                                            className="w-full bg-transparent p-2 border border-transparent hover:border-gray-200 focus:border-primary rounded focus:outline-none"
                                        />
                                    </td>
                                    <td className="p-3 text-right font-medium text-gray-700">
                                        {formatCurrency(item.quantity * item.price)}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all font-bold text-xl"
                                            title="Eliminar item"
                                        >
                                            ×
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <button
                            onClick={addItem}
                            className="text-primary hover:text-primary-dark font-semibold text-sm flex items-center gap-1"
                        >
                            + Agregar Item
                        </button>
                    </div>
                </div>

                {/* Totals & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="w-full md:w-1/3">
                        <label className="block text-sm font-semibold mb-2">Impuesto / IVA (%)</label>
                        <input
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                            className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>

                    <div className="w-full md:w-1/3 space-y-4">
                        <div className="space-y-2 text-right">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal:</span>
                                <span>{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Impuesto ({taxRate}%):</span>
                                <span>{formatCurrency(tax)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-primary pt-2 border-t border-gray-200">
                                <span>Total:</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <button
                            onClick={generatePDF}
                            className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:opacity-90 shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            📄 Descargar Cotización PDF
                        </button>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default QuoteGenerator;
