import React, { useRef, useState } from 'react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    accept = "image/*",
    label = "Sube tu imagen aquí"
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div
            className={`
        border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
        ${isDragging
                    ? 'border-primary bg-blue-50 scale-[1.02]'
                    : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                }
      `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept={accept}
                onChange={handleChange}
            />
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center text-3xl mb-4">
                    ☁️
                </div>
                <p className="text-lg font-semibold text-dark mb-1">{label}</p>
                <p className="text-sm text-gray-500">Arrastra tu archivo o haz clic para subirlo</p>
            </div>
        </div>
    );
};

export default FileUpload;
