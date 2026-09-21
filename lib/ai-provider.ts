// AI Provider abstraction layer
// Support multiple AI providers: OpenAI, Groq, Gemini

interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  content: string;
  provider: string;
  model: string;
}

export class AIProvider {
  private provider: string;
  private apiKey: string;

  constructor() {
    this.provider = process.env.AI_PROVIDER || 'groq';
    
    // Get API key based on provider
    switch (this.provider) {
      case 'openai':
        this.apiKey = process.env.OPENAI_API_KEY || '';
        break;
      case 'groq':
        this.apiKey = process.env.GROQ_API_KEY || '';
        break;
      case 'gemini':
        this.apiKey = process.env.GEMINI_API_KEY || '';
        break;
      case 'openrouter':
        this.apiKey = process.env.OPENROUTER_API_KEY || '';
        break;
      default:
        throw new Error(`Unknown AI provider: ${this.provider}`);
    }

    if (!this.apiKey) {
      throw new Error(`API key not found for provider: ${this.provider}`);
    }
  }

  async generateCompletion(messages: AIMessage[], temperature = 0.7): Promise<AIResponse> {
    switch (this.provider) {
      case 'openai':
        return this.generateOpenAI(messages, temperature);
      case 'groq':
        return this.generateGroq(messages, temperature);
      case 'gemini':
        return this.generateGemini(messages, temperature);
      case 'openrouter':
        return this.generateOpenRouter(messages, temperature);
      default:
        throw new Error(`Unknown provider: ${this.provider}`);
    }
  }

  private async generateOpenAI(messages: AIMessage[], temperature: number): Promise<AIResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'gpt-3.5-turbo',
        messages,
        temperature,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      provider: 'openai',
      model: data.model,
    };
  }

  private async generateGroq(messages: AIMessage[], temperature: number): Promise<AIResponse> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'openai/gpt-oss-20b',
        messages,
        temperature,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Groq API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      provider: 'groq',
      model: data.model,
    };
  }

  private async generateGemini(messages: AIMessage[], temperature: number): Promise<AIResponse> {
    // Convert messages to Gemini format
    const contents = messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    // Add system message as first user message if exists
    const systemMessage = messages.find(m => m.role === 'system');
    if (systemMessage) {
      contents.unshift({
        role: 'user',
        parts: [{ text: systemMessage.content }],
      });
    }

    const model = process.env.AI_MODEL || 'gemini-pro';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.candidates[0].content.parts[0].text,
      provider: 'gemini',
      model,
    };
  }

  private async generateOpenRouter(messages: AIMessage[], temperature: number): Promise<AIResponse> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'http://localhost:3001',
        'X-Title': 'Tools Belajar Dika',
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'google/gemini-flash-1.5',
        messages,
        temperature,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenRouter API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      provider: 'openrouter',
      model: data.model,
    };
  }

  getProviderInfo() {
    return {
      provider: this.provider,
      hasApiKey: !!this.apiKey,
    };
  }
}
