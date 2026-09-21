'use client';

import { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { FileProcessor } from '@/lib/file-processor';

interface FileUploaderProps {
  onTextExtracted: (text: string, fileName: string) => void;
}

export default function FileUploader({ onTextExtracted }: FileUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileProcessor = new FileProcessor();

  const handleFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await fileProcessor.processFile(file);
      onTextExtracted(result.text, result.fileName);
    } catch (err: any) {
      setError(err.message || 'Gagal memproses file');
      console.error('File processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          accept={fileProcessor.getAcceptString()}
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center justify-center text-center">
          {isProcessing ? (
            <>
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-lg font-medium text-gray-700">
                Memproses file...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Mohon tunggu sebentar
              </p>
            </>
          ) : (
            <>
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Upload Materi Belajar
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Drag & drop atau klik untuk memilih file
              </p>
              <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-400">
                {fileProcessor.getSupportedFormats().map((format) => (
                  <span
                    key={format}
                    className="bg-gray-100 px-2 py-1 rounded"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
