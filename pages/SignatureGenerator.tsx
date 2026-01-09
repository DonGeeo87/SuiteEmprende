import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import ToolLayout from '../components/ToolLayout';

const SignatureGenerator: React.FC = () => {
    const [penColor, setPenColor] = useState('black');
    const [penWidth, setPenWidth] = useState(2);
    const [backgroundColor, setBackgroundColor] = useState('rgba(0,0,0,0)'); // Transparent
    const sigCanvas = useRef<SignatureCanvas>(null);

    const clear = () => {
        sigCanvas.current?.clear();
    };

    const download = () => {
        if (sigCanvas.current) {
            const canvas = sigCanvas.current.getCanvas();
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    const date = new Date().toISOString().split('T')[0];
                    link.download = `firma-${date}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }
            }, 'image/png');
        }
    };

    const colors = [
        { name: 'Negro', value: 'black' },
        { name: 'Azul', value: 'blue' },
        { name: 'Rojo', value: 'red' },
        { name: 'Verde', value: 'green' },
    ];

    return (
        <ToolLayout
            title="Firma Digital"
            description="Dibuja tu firma y descárgala en formato PNG con fondo transparente para usar en tus documentos."
            tip="Usa un trazo medio (2-3px) para que se vea bien en documentos impresos."
        >
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Controls */}
                    <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit space-y-6">
                        <h3 className="font-bold text-lg text-dark">Configuración</h3>

                        {/* Color Picker */}
                        <div>
                            <label className="block text-sm font-semibold mb-3">Color del trazo</label>
                            <div className="flex gap-3">
                                {colors.map((c) => (
                                    <button
                                        key={c.value}
                                        onClick={() => setPenColor(c.value)}
                                        className={`
                      w-8 h-8 rounded-full border-2 transition-transform hover:scale-110
                      ${penColor === c.value ? 'border-gray-900 scale-110' : 'border-transparent'}
                    `}
                                        style={{ backgroundColor: c.value }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Width Slider */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Grosor</label>
                                <span className="text-xs text-gray-500">{penWidth}px</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="0.5"
                                value={penWidth}
                                onChange={(e) => setPenWidth(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-gray-200 space-y-3">
                            <button
                                onClick={clear}
                                className="w-full py-2 px-4 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
                            >
                                🗑️ Borrar Todo
                            </button>
                            <button
                                onClick={download}
                                className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
                            >
                                ⬇️ Descargar Firma
                            </button>
                        </div>
                    </div>

                    {/* Canvas Area */}
                    <div className="w-full md:w-2/3 bg-white border-2 border-dashed border-gray-300 rounded-xl overflow-hidden relative shadow-inner">
                        <div className="absolute top-2 left-2 px-2 py-1 bg-gray-100/80 rounded text-xs text-gray-500 pointer-events-none">
                            Área de dibujo
                        </div>
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor={penColor}
                            minWidth={penWidth * 0.5}
                            maxWidth={penWidth * 1.5}
                            dotSize={penWidth}
                            backgroundColor={backgroundColor}
                            canvasProps={{
                                className: 'w-full h-[400px] cursor-crosshair',
                            }}
                        />
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default SignatureGenerator;
