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
    console.log('Extract text API called');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('File received:', file?.name, file?.type, file?.size);

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // For now, only support plain text to test
    if (file.type.startsWith('text/')) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const text = buffer.toString('utf-8');
      
      console.log('Text file processed successfully. Length:', text.length);
      
      return NextResponse.json({
        text,
        fileName: file.name,
        fileType: file.type,
        size: file.size,
      });
    }

    // All other types return "not supported yet" temporarily
    return NextResponse.json(
      { error: `File type ${file.type} is temporarily disabled for debugging. Please use .txt files for now.` },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Error in extract-text API:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
