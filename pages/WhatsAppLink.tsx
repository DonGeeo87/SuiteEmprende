import React, { useState, useEffect } from 'react';
import ToolLayout from '../components/ToolLayout';
import { QRCodeSVG } from 'qrcode.react';

const WhatsAppLink: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [link, setLink] = useState('');

    const templates = [
        {
            id: 'custom',
            name: '✍️ Mensaje personalizado',
            text: ''
        },
        {
            id: 'intro',
            name: '👋 Presentación de negocio',
            text: '¡Hola! Soy [Tu Nombre] de [Tu Negocio]. Ofrecemos [producto/servicio]. ¿Te gustaría conocer más?'
        },
        {
            id: 'catalog',
            name: '📋 Solicitar catálogo',
            text: 'Hola, me gustaría recibir su catálogo de productos y precios. ¡Gracias!'
        },
        {
            id: 'quote',
            name: '💰 Consulta de precio',
            text: 'Hola, quisiera consultar el precio de [producto/servicio]. ¿Podrías enviarme información?'
        },
        {
            id: 'order',
            name: '🛒 Hacer un pedido',
            text: 'Hola, me gustaría hacer un pedido de [producto]. ¿Cuál es el proceso?'
        },
        {
            id: 'appointment',
            name: '📅 Agendar cita',
            text: 'Hola, quisiera agendar una cita para [servicio]. ¿Qué disponibilidad tienen?'
        },
        {
            id: 'info',
            name: 'ℹ️ Más información',
            text: 'Hola, me gustaría obtener más información sobre sus productos/servicios.'
        },
        {
            id: 'promo',
            name: '🎁 Promociones actuales',
            text: '¡Hola! Vi que tienen promociones. ¿Podrían contarme más sobre las ofertas actuales?'
        },
    ];

    const handleTemplateSelect = (templateText: string) => {
        setMessage(templateText);
    };

    useEffect(() => {
        if (phoneNumber) {
            const cleanNumber = phoneNumber.replace(/\D/g, '');
            const encodedMessage = encodeURIComponent(message);
            setLink(`https://wa.me/${cleanNumber}${message ? `?text=${encodedMessage}` : ''}`);
        } else {
            setLink('');
        }
    }, [phoneNumber, message]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link);
        alert('¡Enlace copiado al portapapeles!');
    };

    return (
        <ToolLayout
            title="Link WhatsApp"
            description="Genera enlaces directos a WhatsApp y códigos QR para compartir fácilmente."
            tip="Usa los templates predefinidos para ahorrar tiempo o personaliza tu mensaje."
        >
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column - Form */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Número de WhatsApp
                            </label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="56912345678"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Incluye código de país (ej: 56 para Chile, 54 para Argentina)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Templates de mensajes
                            </label>
                            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-2">
                                {templates.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => handleTemplateSelect(template.text)}
                                        className={`text-left px-3 py-2 rounded-lg border transition-all text-sm ${message === template.text
                                                ? 'border-primary bg-primary/5 font-semibold'
                                                : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                                            }`}
                                    >
                                        {template.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Mensaje predefinido (opcional)
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Escribe tu mensaje aquí..."
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Este mensaje aparecerá automáticamente cuando alguien abra el enlace
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Results */}
                    <div className="space-y-4">
                        {link && (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Tu enlace generado
                                    </label>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 break-all text-sm font-mono text-gray-700">
                                        {link}
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex-1 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 shadow-md transition-all"
                                        >
                                            📋 Copiar enlace
                                        </button>
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:opacity-90 shadow-md transition-all text-center"
                                        >
                                            💬 Abrir en WhatsApp
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-center">
                                        Código QR
                                    </label>
                                    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 flex justify-center">
                                        <QRCodeSVG value={link} size={200} level="H" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        Escanea este código para abrir el chat directamente
                                    </p>
                                </div>
                            </>
                        )}

                        {!link && (
                            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400">
                                <div className="text-6xl mb-4">💬</div>
                                <p className="text-sm">
                                    Ingresa un número de WhatsApp para generar tu enlace y código QR
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default WhatsAppLink;
