import React, { useState, useEffect, useCallback } from 'react';
import ToolLayout from '../components/ToolLayout';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  // ... (rest of the state remains the same)
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let chars = lowercaseChars;
    if (includeUppercase) chars += uppercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }
    setPassword(generatedPassword);
    setCopied(false);
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  // Initial generation
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Generador de Contraseñas"
      description="Crea claves seguras y aleatorias localmente en tu dispositivo. Tu seguridad es primero."
      tip="Usa una longitud de al menos 12 caracteres e incluye símbolos para mayor seguridad."
    >
      <div className="space-y-8">
        {/* Display Area */}
        <div className="relative">
          <div className="w-full bg-gray-50 text-dark text-center text-2xl md:text-3xl font-mono py-6 px-4 rounded-lg border border-gray-200 break-all min-h-[5rem] flex items-center justify-center">
            {password}
          </div>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            title="Copiar"
          >
            {copied ? '✅' : '📋'}
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-semibold text-gray-700">Longitud: {length}</label>
            </div>
            <input
              type="range"
              min="6"
              max="50"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
              <span className="text-gray-700">Mayúsculas (ABC)</span>
            </label>

            <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
              <span className="text-gray-700">Números (123)</span>
            </label>

            <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
              <span className="text-gray-700">Símbolos (!@#)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-md hover:opacity-90 transition-opacity text-lg"
          >
            🔄 Generar Nueva Clave
          </button>
        </div>

        <div className="mt-8 text-center bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
          <strong>Nota de privacidad:</strong> Esta contraseña se generó en tu navegador. Nunca viajó por internet ni se guardó en ningún servidor.
        </div>
      </div>
    </ToolLayout>
  );
};

export default PasswordGenerator;