import React, { useState, useRef, useEffect } from 'react';
import ToolLayout from '../components/ToolLayout';
import FileUpload from '../components/FileUpload';

const POSITIONS = [
    'top-left', 'top-center', 'top-right',
    'center-left', 'center', 'center-right',
    'bottom-left', 'bottom-center', 'bottom-right'
];

const Watermark: React.FC = () => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [watermarkText, setWatermarkText] = useState('Mi Marca');
    const [fontSize, setFontSize] = useState(48);
    const [opacity, setOpacity] = useState(0.5);
    const [color, setColor] = useState('#ffffff');
    const [position, setPosition] = useState('center');

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileSelect = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Set canvas dimensions to match image
            canvas.width = image.width;
            canvas.height = image.height;

            // Draw original image
            ctx.drawImage(image, 0, 0);

            // Configure watermark text
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.font = `bold ${fontSize}px sans-serif`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            // Calculate position
            let x = canvas.width / 2;
            let y = canvas.height / 2;
            const padding = 40;

            if (position.includes('left')) {
                x = padding;
                ctx.textAlign = 'left';
            } else if (position.includes('right')) {
                x = canvas.width - padding;
                ctx.textAlign = 'right';
            }

            if (position.includes('top')) {
                y = padding + fontSize / 2;
            } else if (position.includes('bottom')) {
                y = canvas.height - padding - fontSize / 2;
            }

            // Draw text
            ctx.fillText(watermarkText, x, y);
        }
    }, [image, watermarkText, fontSize, opacity, color, position]);

    const downloadImage = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'watermarked_image.png';
            link.href = canvasRef.current.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <ToolLayout
            title="Marca de Agua"
            description="Protege tus fotos agregando tu nombre o marca de forma fácil y rápida."
            tip="Usa un color claro (blanco) con opacidad media para marcas elegantes que no distraigan."
        >
            <div className="space-y-8">
                {!image ? (
                    <FileUpload onFileSelect={handleFileSelect} label="Sube la foto para proteger" />
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Controls Panel */}
                        <div className="w-full lg:w-1/3 space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
                            <h3 className="font-bold text-lg text-dark">Configuración</h3>

                            {/* Text Input */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Texto de la marca</label>
                                <input
                                    type="text"
                                    value={watermarkText}
                                    onChange={(e) => setWatermarkText(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            {/* Color & Font Size */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Color</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="w-10 h-10 p-1 rounded cursor-pointer border bg-white"
                                        />
                                        <span className="text-xs text-gray-500 uppercase">{color}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Tamaño</label>
                                    <input
                                        type="number"
                                        value={fontSize}
                                        onChange={(e) => setFontSize(Number(e.target.value))}
                                        min="10"
                                        max="500"
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Opacity Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-semibold">Opacidad</label>
                                    <span className="text-xs text-gray-500">{Math.round(opacity * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={opacity}
                                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            {/* Position Grid */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Posición</label>
                                <div className="grid grid-cols-3 gap-2 w-32 mx-auto">
                                    {POSITIONS.map((pos) => (
                                        <button
                                            key={pos}
                                            onClick={() => setPosition(pos)}
                                            className={`
                        w-8 h-8 rounded border transition-colors
                        ${position === pos
                                                    ? 'bg-primary border-primary text-white'
                                                    : 'bg-white border-gray-300 hover:bg-gray-100'
                                                }
                      `}
                                            title={pos}
                                        >
                                            •
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-gray-200 space-y-3">
                                <button
                                    onClick={downloadImage}
                                    className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 shadow-lg shadow-blue-500/30 transition-all"
                                >
                                    ⬇️ Descargar Imagen
                                </button>
                                <button
                                    onClick={() => setImage(null)}
                                    className="w-full py-2 text-gray-500 hover:text-dark text-sm underline"
                                >
                                    Cambiar imagen
                                </button>
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="w-full lg:w-2/3 bg-gray-100 rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-4 min-h-[400px]">
                            <canvas
                                ref={canvasRef}
                                className="max-w-full max-h-[70vh] object-contain shadow-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default Watermark;
