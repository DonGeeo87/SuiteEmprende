import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import ToolLayout from '../components/ToolLayout';
import FileUpload from '../components/FileUpload';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker for react-pdf (Standard Public Path)
pdfjs.GlobalWorkerOptions.workerSrc = '/SuiteEmprende/pdf.worker.min.mjs';

interface Annotation {
    id: string;
    type: 'text';
    x: number;
    y: number;
    content: string;
    page: number;
}

const PDFEditor: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [scale, setScale] = useState(1);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    // Drag State
    const [dragState, setDragState] = useState<{
        id: string;
        startX: number;
        startY: number;
        initialAnnX: number;
        initialAnnY: number;
    } | null>(null);

    const onFileLoad = (file: File) => {
        setFile(file);
        setAnnotations([]);
    };

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const addTextAnnotation = (pageIndex: number, x: number = 50, y: number = 50) => {
        const newAnnotation: Annotation = {
            id: Date.now().toString(),
            type: 'text',
            x,
            y,
            content: 'Texto aquí',
            page: pageIndex + 1,
        };
        setAnnotations(prev => [...prev, newAnnotation]);
    };

    const handlePageClick = (e: React.MouseEvent, pageIndex: number) => {
        // Si estamos editando o borrando, no agregar nuevo
        if ((e.target as HTMLElement).closest('input') || (e.target as HTMLElement).closest('button')) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;

        // Ajustar para centrar un poco el texto respecto al click
        // (Restamos un estimado de la mitad del input height y width para mejor UX)
        addTextAnnotation(pageIndex, x - 20, y - 10);
    };

    const startDrag = (e: React.MouseEvent, ann: Annotation) => {
        e.stopPropagation();
        e.preventDefault();
        setDragState({
            id: ann.id,
            startX: e.clientX,
            startY: e.clientY,
            initialAnnX: ann.x,
            initialAnnY: ann.y
        });
    };

    useEffect(() => {
        if (!dragState) return;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = (e.clientX - dragState.startX) / scale;
            const deltaY = (e.clientY - dragState.startY) / scale;

            const newX = dragState.initialAnnX + deltaX;
            const newY = dragState.initialAnnY + deltaY;

            setAnnotations(prev => prev.map(ann =>
                ann.id === dragState.id ? { ...ann, x: newX, y: newY } : ann
            ));
        };

        const handleMouseUp = () => {
            setDragState(null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragState, scale]);

    const updateAnnotationContent = (id: string, content: string) => {
        setAnnotations(annotations.map(ann =>
            ann.id === id ? { ...ann, content } : ann
        ));
    };

    const removeAnnotation = (id: string) => {
        setAnnotations(annotations.filter(ann => ann.id !== id));
    };

    const downloadPDF = async () => {
        if (!file) return;
        setIsProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const pages = pdfDoc.getPages();

            annotations.forEach((ann) => {
                if (ann.page <= pages.length) {
                    const page = pages[ann.page - 1];
                    const { height } = page.getSize();

                    // Convert screen coordinates to PDF coordinates
                    // Note: PDF coordinates start from bottom-left, but web is top-left
                    // We need to account for scale factor used in display
                    // This is a simplified approximation

                    page.drawText(ann.content, {
                        x: ann.x,
                        y: height - ann.y - 12, // specific offset for text baseline
                        size: 12,
                        font: helveticaFont,
                        color: rgb(0, 0, 0),
                    });
                }
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `editado_${file.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error saving PDF:', error);
            alert('Hubo un error al guardar el PDF.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <ToolLayout
            title="Rellenar PDF"
            description="Completa formularios o agrega notas a tus documentos PDF directamente en el navegador."
            tip="Haz clic en cualquier parte de la hoja para escribir texto. Arrastra desde el icono de mover para reubicarlo."
        >
            <div className="space-y-6">
                {!file ? (
                    <FileUpload onFileSelect={onFileLoad} accept="application/pdf" label="Sube tu archivo PDF" />
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-4 justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200 sticky top-0 z-10 shadow-sm">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setFile(null)}
                                    className="text-sm text-gray-600 hover:text-dark underline"
                                >
                                    Cambiar archivo
                                </button>
                                <div className="text-sm font-semibold">
                                    {numPages} página(s)
                                </div>
                            </div>

                            <div className="flex gap-2 items-center bg-white rounded-lg border border-gray-300 p-1">
                                <button
                                    onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded font-bold text-gray-600"
                                >
                                    -
                                </button>
                                <span className="text-sm w-12 text-center font-mono">{Math.round(scale * 100)}%</span>
                                <button
                                    onClick={() => setScale(s => Math.min(2, s + 0.1))}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded font-bold text-gray-600"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={downloadPDF}
                                disabled={isProcessing}
                                className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 shadow-md transition-all flex items-center gap-2"
                            >
                                {isProcessing ? 'Procesando...' : '⬇️ Descargar PDF'}
                            </button>
                        </div>

                        <div className="bg-gray-200 p-8 rounded-xl overflow-auto flex justify-center min-h-[500px]">
                            <div className="relative">
                                <Document
                                    file={file}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    onLoadError={(error) => console.error('Error loading PDF:', error)}
                                    loading={<div className="text-gray-500 font-medium">Cargando documento...</div>}
                                    error={<div className="text-red-500 bg-white p-4 rounded shadow">Error al cargar el PDF. Intenta con otro archivo.</div>}
                                >
                                    {Array.from(new Array(numPages), (el, index) => (
                                        <div
                                            key={`page_${index + 1}`}
                                            className="mb-8 relative group shadow-lg transition-transform"
                                        >
                                            {/* Page Wrapper con Click Listener */}
                                            <div
                                                className="cursor-text relative"
                                                onClick={(e) => handlePageClick(e, index)}
                                            >
                                                <Page
                                                    pageNumber={index + 1}
                                                    scale={scale}
                                                    renderAnnotationLayer={false}
                                                    renderTextLayer={false}
                                                    className="bg-white"
                                                />
                                            </div>

                                            {/* Botón flotante opcional (User Feedback: "no solo desde un boton", mantenemos por accesibilidad) */}
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                <span className="bg-black/75 text-white text-xs px-2 py-1 rounded shadow backdrop-blur-sm">
                                                    Click para escribir
                                                </span>
                                            </div>

                                            {/* Annotations Layer */}
                                            {annotations
                                                .filter(ann => ann.page === index + 1)
                                                .map(ann => (
                                                    <div
                                                        key={ann.id}
                                                        className="absolute flex items-center gap-1 group/item"
                                                        style={{
                                                            left: ann.x * scale,
                                                            top: ann.y * scale,
                                                            transform: 'translate(0, -50%)',
                                                            zIndex: dragState?.id === ann.id ? 50 : 10
                                                        }}
                                                    >
                                                        {/* Drag Handle */}
                                                        <div
                                                            onMouseDown={(e) => startDrag(e, ann)}
                                                            className="w-6 h-6 bg-primary text-white rounded flex items-center justify-center cursor-move shadow-md opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-primary-dark"
                                                            title="Mover texto"
                                                        >
                                                            <code className="text-[10px] leading-none">✥</code>
                                                        </div>

                                                        {/* Input */}
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                value={ann.content}
                                                                onChange={(e) => updateAnnotationContent(ann.id, e.target.value)}
                                                                className="bg-white/90 border border-primary/30 hover:border-primary text-dark px-3 py-1 rounded text-base focus:outline-none focus:ring-2 focus:ring-primary shadow-sm min-w-[150px]"
                                                                autoFocus
                                                            />
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeAnnotation(ann.id);
                                                                }}
                                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover/item:opacity-100 transition-opacity shadow-sm hover:scale-110"
                                                                title="Eliminar"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))}
                                </Document>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default PDFEditor;
