import { NextRequest, NextResponse } from 'next/server';
import * as pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';
import JSZip from 'jszip';

// Extract text from PPTX file
async function extractPPTXText(buffer: Buffer): Promise<string> {
  try {
    const zip = await JSZip.loadAsync(buffer);
    let allText = '';
    let slideNumber = 0;

    // PPTX structure: ppt/slides/slide1.xml, slide2.xml, etc.
    const slideFiles = Object.keys(zip.files)
      .filter(filename => filename.startsWith('ppt/slides/slide') && filename.endsWith('.xml'))
      .sort();

    console.log(`Found ${slideFiles.length} slides in PPTX`);

    for (const filename of slideFiles) {
      slideNumber++;
      const file = zip.files[filename];
      
      if (!file) {
        console.warn(`Slide file not found: ${filename}`);
        continue;
      }
      
      const content = await file.async('text');
      
      // Extract text from XML (remove all XML tags)
      const textContent = content
        .replace(/<a:t>/g, '\n') // New line for each text element
        .replace(/<[^>]*>/g, '') // Remove all XML tags
        .replace(/\n+/g, '\n') // Remove multiple newlines
        .trim();

      if (textContent) {
        allText += `\n--- Slide ${slideNumber} ---\n${textContent}\n`;
      }
    }

    if (!allText || allText.trim().length === 0) {
      throw new Error('No text content found in PPTX file. The file might be empty or contain only images.');
    }

    console.log(`Extracted ${allText.length} characters from PPTX`);
    return allText;
  } catch (error: any) {
    console.error('PPTX parsing error:', error);
    console.error('Error details:', error.message, error.stack);
    throw new Error(`Failed to parse PPTX: ${error.message}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('Processing file:', file?.name, file?.type);

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = '';

    // Process based on file type
    if (file.type === 'application/pdf') {
      console.log('Processing PDF...');
      const data = await (pdfParse as any)(buffer);
      text = data.text;
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword'
    ) {
      console.log('Processing DOCX...');
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      file.type === 'application/vnd.ms-powerpoint' ||
      file.name.endsWith('.pptx') ||
      file.name.endsWith('.ppt')
    ) {
      console.log('Processing PPTX...');
      // TEMPORARY: Return error for PPTX while we debug
      return NextResponse.json(
        { error: 'PPTX support is temporarily disabled. Please use PDF, DOCX, or TXT files.' },
        { status: 400 }
      );
      // text = await extractPPTXText(buffer);
    } else if (file.type.startsWith('text/')) {
      console.log('Processing TEXT...');
      text = buffer.toString('utf-8');
    } else {
      console.error('Unsupported file type:', file.type);
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}` },
        { status: 400 }
      );
    }

    // Clean up text
    text = text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newline
      .trim();

    if (!text || text.length === 0) {
      return NextResponse.json(
        { error: 'No text extracted from file' },
        { status: 400 }
      );
    }

    console.log('Text extracted successfully. Length:', text.length);

    return NextResponse.json({
      text,
      fileName: file.name,
      fileType: file.type,
      size: file.size,
    });
  } catch (error: any) {
    console.error('Error extracting text:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: error.message || 'Failed to extract text from file' },
      { status: 500 }
    );
  }
}
