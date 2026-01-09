import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import FileUpload from '../components/FileUpload';
import imageCompression from 'browser-image-compression';

const ImageCompressor: React.FC = () => {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [originalPreview, setOriginalPreview] = useState<string>('');
    const [compressedPreview, setCompressedPreview] = useState<string>('');
    const [isCompressing, setIsCompressing] = useState(false);
    const [quality, setQuality] = useState(0.8);

    const handleFileSelect = async (file: File) => {
        setOriginalFile(file);
        const objectUrl = URL.createObjectURL(file);
        setOriginalPreview(objectUrl);
        setCompressedFile(null);
        setCompressedPreview('');

        // Auto compress on load
        await compressImage(file, quality);
    };

    const compressImage = async (file: File, qualityValue: number) => {
        setIsCompressing(true);
        try {
            const options = {
                maxSizeMB: 1, // Default, but quality controls mostly
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: qualityValue
            };

            const compressedBlob = await imageCompression(file, options);
            const compressed = new File([compressedBlob], file.name, { type: file.type });

            setCompressedFile(compressed);
            const compressedUrl = URL.createObjectURL(compressed);
            setCompressedPreview(compressedUrl);
        } catch (error) {
            console.error('Error compressing image:', error);
        } finally {
            setIsCompressing(false);
        }
    };

    const handleQualityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuality = parseFloat(e.target.value);
        setQuality(newQuality);
        if (originalFile) {
            await compressImage(originalFile, newQuality);
        }
    };

    const formatSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const calculateSavings = () => {
        if (!originalFile || !compressedFile) return 0;
        const savings = ((originalFile.size - compressedFile.size) / originalFile.size) * 100;
        return savings.toFixed(1);
    };

    const downloadImage = () => {
        if (compressedFile) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(compressedFile);
            link.download = `compressed_${originalFile?.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <ToolLayout
            title="Comprimir Fotos"
            description="Reduce el peso de tus imágenes sin perder calidad visible. Ideal para tu web o redes sociales."
            tip="Las imágenes de menos de 1MB cargan mucho más rápido en tu sitio web."
        >
            <div className="space-y-8">
                {!originalFile ? (
                    <FileUpload onFileSelect={handleFileSelect} label="Sube tu imagen (JPG, PNG, WEBP)" />
                ) : (
                    <div className="space-y-6">
                        {/* Controls */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <label className="font-semibold text-dark">Calidad de Compresión</label>
                                <span className="text-primary font-bold">{Math.round(quality * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                value={quality}
                                onChange={handleQualityChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>Máxima Compresión</span>
                                <span>Mejor Calidad</span>
                            </div>
                        </div>

                        {/* Comparison Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Original */}
                            <div className="border border-gray-200 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">ORIGINAL</span>
                                    <span className="text-sm text-gray-500">{originalFile && formatSize(originalFile.size)}</span>
                                </div>
                                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                    <img src={originalPreview} alt="Original" className="max-w-full max-h-full object-contain" />
                                </div>
                            </div>

                            {/* Compressed */}
                            <div className="border border-primary rounded-xl p-4 bg-blue-50/30 relative">
                                {isCompressing && (
                                    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center backdrop-blur-sm rounded-xl">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                                    </div>
                                )}
                                <div className="flex justify-between items-center mb-3">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">OPTIMIZADA</span>
                                    <div className="text-right">
                                        <span className="block text-sm font-bold text-green-600">
                                            {compressedFile && formatSize(compressedFile.size)}
                                        </span>
                                        {compressedFile && (
                                            <span className="text-xs text-green-600 block">
                                                -{calculateSavings()}% peso
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                    {compressedPreview ? (
                                        <img src={compressedPreview} alt="Compressed" className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <div className="text-gray-400">Procesando...</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => {
                                    setOriginalFile(null);
                                    setCompressedFile(null);
                                }}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                🔄 Subir otra foto
                            </button>
                            <button
                                onClick={downloadImage}
                                disabled={!compressedFile || isCompressing}
                                className={`
                  flex-1 px-6 py-3 bg-primary text-white font-bold rounded-lg transition-all transform
                  ${(!compressedFile || isCompressing)
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:opacity-90 hover:scale-105 shadow-lg shadow-blue-500/30'
                                    }
                `}
                            >
                                ⬇️ Descargar Optimizada
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ImageCompressor;
