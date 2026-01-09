import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import ToolLayout from '../components/ToolLayout';
import FileUpload from '../components/FileUpload';

const ASPECT_RATIOS = [
    { label: 'Instagram Post (1:1)', value: 1 / 1 },
    { label: 'Instagram Portrait (4:5)', value: 4 / 5 },
    { label: 'Instagram Story (9:16)', value: 9 / 16 },
    { label: 'Facebook Cover (16:9)', value: 16 / 9 },
    { label: 'Custom / Free', value: undefined },
];

const ImageCropper: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState<number | undefined>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onFileChange = async (file: File) => {
        const imageDataUrl = await readFile(file);
        setImageSrc(imageDataUrl as string);
    };

    const readFile = (file: File) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result), false);
            reader.readAsDataURL(file);
        });
    };

    const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.src = url;
        });

    const getCroppedImg = async (
        imageSrc: string,
        pixelCrop: Area
    ): Promise<string> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return '';
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(URL.createObjectURL(blob));
                }
            }, 'image/jpeg');
        });
    };

    const handleDownload = async () => {
        if (imageSrc && croppedAreaPixels) {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            const link = document.createElement('a');
            link.href = croppedImage;
            link.download = 'recorte_suiteemprende.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <ToolLayout
            title="Recortar para Redes"
            description="Ajusta tus fotos a los formatos perfectos para Instagram, Facebook y más."
            tip="Usa el zoom y arrastra la imagen para encuadrar perfectamente el contenido importante."
        >
            <div className="space-y-6">
                {!imageSrc ? (
                    <FileUpload onFileSelect={onFileChange} label="Sube tu imagen para recortar" />
                ) : (
                    <div className="space-y-6">
                        {/* Aspect Ratio Selector */}
                        <div className="flex flex-wrap gap-2 justify-center">
                            {ASPECT_RATIOS.map((ratio) => (
                                <button
                                    key={ratio.label}
                                    onClick={() => setAspect(ratio.value)}
                                    className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${aspect === ratio.value
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }
                  `}
                                >
                                    {ratio.label}
                                </button>
                            ))}
                        </div>

                        {/* Cropper Area */}
                        <div className="relative h-[400px] w-full bg-gray-900 rounded-xl overflow-hidden shadow-inner">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspect}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>

                        {/* Zoom Control */}
                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <span className="text-sm font-semibold text-gray-600">Zoom</span>
                            <span className="text-xs text-gray-400">-</span>
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <span className="text-xs text-gray-400">+</span>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <button
                                onClick={() => setImageSrc(null)}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                🔄 Nueva Imagen
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-blue-500/30"
                            >
                                ✂️ Recortar y Descargar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ImageCropper;
