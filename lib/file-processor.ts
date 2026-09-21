// File processor untuk extract text dari berbagai format

export interface ProcessedFile {
  text: string;
  fileName: string;
  fileType: string;
  wordCount: number;
}

export class FileProcessor {
  async processFile(file: File): Promise<ProcessedFile> {
    const fileType = file.type;
    const fileName = file.name;
    let text = '';

    try {
      if (fileType === 'application/pdf') {
        text = await this.processPDF(file);
      } else if (
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileType === 'application/msword'
      ) {
        text = await this.processDOCX(file);
      } else if (
        fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        fileType === 'application/vnd.ms-powerpoint' ||
        fileName.endsWith('.pptx') ||
        fileName.endsWith('.ppt')
      ) {
        text = await this.processPPTX(file);
      } else if (fileType.startsWith('text/')) {
        text = await this.processText(file);
      } else if (fileType.startsWith('image/')) {
        text = await this.processImage(file);
      } else {
        throw new Error(`Unsupported file type: ${fileType}`);
      }

      const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;

      return {
        text,
        fileName,
        fileType,
        wordCount,
      };
    } catch (error: any) {
      throw new Error(`Failed to process file: ${error.message}`);
    }
  }

  private async processPDF(file: File): Promise<string> {
    // We'll send to backend API for PDF processing
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/extract-text', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If JSON parsing fails, use status text
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.text) {
      throw new Error('No text extracted from PDF file');
    }

    return data.text;
  }

  private async processDOCX(file: File): Promise<string> {
    // We'll send to backend API for DOCX processing
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/extract-text', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If JSON parsing fails, use status text
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.text) {
      throw new Error('No text extracted from DOCX file');
    }

    return data.text;
  }

  private async processPPTX(file: File): Promise<string> {
    // We'll send to backend API for PPTX processing
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/extract-text', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If JSON parsing fails, use status text
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.text) {
      throw new Error('No text extracted from PPTX file');
    }

    return data.text;
  }

  private async processText(file: File): Promise<string> {
    return await file.text();
  }

  private async processImage(file: File): Promise<string> {
    // We'll use Tesseract.js for OCR in the browser
    const { createWorker } = await import('tesseract.js');
    
    const worker = await createWorker('ind'); // Indonesian language
    const { data } = await worker.recognize(file);
    await worker.terminate();
    
    return data.text;
  }

  getSupportedFormats(): string[] {
    return [
      '.pdf',
      '.doc',
      '.docx',
      '.ppt',
      '.pptx',
      '.txt',
      '.md',
      '.jpg',
      '.jpeg',
      '.png',
      '.webp',
    ];
  }

  getAcceptString(): string {
    return 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/*,image/*';
  }
}
