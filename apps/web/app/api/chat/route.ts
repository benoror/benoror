import { NextResponse } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai'; // Using OpenAIStream for parsing Vercel AI Gateway's OpenAI-compatible stream
import fs from 'fs';
import path from 'path';

// Path to your chatbot data
const CHATBOT_DATA_PATH = path.join(process.cwd(), 'packages', 'data', 'chatbot');

// Helper function to load markdown content
const loadMarkdownContent = (filename: string) => {
  try {
    return fs.readFileSync(path.join(CHATBOT_DATA_PATH, filename), 'utf-8');
  } catch (error) {
    console.error(`Failed to load markdown file ${filename}:`, error);
    return '';
  }
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Load public_profile.json
    const publicProfilePath = path.join(CHATBOT_DATA_PATH, 'public_profile.json');
    const publicProfileRaw = fs.readFileSync(publicProfilePath, 'utf-8');
    const publicProfile = JSON.parse(publicProfileRaw);

    // Prepare context from static markdown files
    let contextContent = '';
    contextContent += loadMarkdownContent(publicProfile.general_summary_file) + '\n\n';

    // Add content from specific context files based on the list
    for (const fileMeta of publicProfile.context_files_list) {
      if (fileMeta.file !== publicProfile.general_summary_file) { // Avoid double-loading general summary
        contextContent += `## ${fileMeta.title}\n`;
        contextContent += loadMarkdownContent(fileMeta.file) + '\n\n';
      }
    }

    // Construct the full messages array for the LLM
    // The Vercel AI Gateway expects an OpenAI-compatible message format
    const llmMessages = [
      { role: 'system', content: `You are a helpful AI assistant answering questions about Ben Orozco. Use ONLY the following context to answer the questions. If the answer is not in the context, clearly state that you don't have information about it.

      # Context about Ben Orozco:
      ${contextContent}` },
      // Add previous user/assistant messages from the conversation history
      ...messages.filter((msg: any) => msg.role === 'user' || msg.role === 'assistant')
    ];

    // --- Vercel AI Gateway Integration ---
    const VERCEL_AI_GATEWAY_URL = 'https://gateway.ai.vercel.com/v1/chat/completions';
    // IMPORTANT: Set VERCEL_AI_GATEWAY_API_KEY as an environment variable in Vercel
    const VERCEL_AI_GATEWAY_API_KEY = process.env.VERCEL_AI_GATEWAY_API_KEY; 
    // Or you can use a specific provider API key if the Gateway is configured for BYOK and you're targeting a specific provider
    // e.g., process.env.GOOGLE_API_KEY or process.env.OPENAI_API_KEY

    if (!VERCEL_AI_GATEWAY_API_KEY && !process.env.GOOGLE_API_KEY && !process.env.OPENAI_API_KEY) {
      throw new Error("Missing AI Gateway or Provider API Key. Please set VERCEL_AI_GATEWAY_API_KEY, GOOGLE_API_KEY, or OPENAI_API_KEY environment variable.");
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Prioritize VERCEL_AI_GATEWAY_API_KEY
    if (VERCEL_AI_GATEWAY_API_KEY) {
      headers['X-Vercel-AI-Gateway-Api-Key'] = VERCEL_AI_GATEWAY_API_KEY;
    } else if (process.env.GOOGLE_API_KEY) {
      // If using BYOK with Google, you might need to specify it differently
      // or rely on Gateway configuration. For direct API key, it's typically 'Authorization: Bearer'
      // For Vercel AI Gateway, it might pass through the GOOGLE_API_KEY.
      // We'll rely on Vercel's proxying to handle this.
      headers['X-Vercel-AI-Gateway-Api-Key'] = process.env.GOOGLE_API_KEY; // This might be wrong, depends on Vercel's BYOK implementation
      // It's safer to use a dedicated VERCEL_AI_GATEWAY_API_KEY for the unified endpoint.
    } else if (process.env.OPENAI_API_KEY) {
      headers['Authorization'] = `Bearer ${process.env.OPENAI_API_KEY}`;
    }


    const response = await fetch(VERCEL_AI_GATEWAY_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        model: 'gemini-1.5-flash', // Specify the model to use
        messages: llmMessages,
        stream: true,
        max_tokens: 500, // Keep max_tokens as requested
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Vercel AI Gateway error:", response.status, errorData);
      throw new Error(`Vercel AI Gateway Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    // Convert the response stream to a Vercel AI SDK compatible stream
    // Vercel AI Gateway often returns an OpenAI-compatible stream format even for other providers
    const stream = OpenAIStream(response);

    // Return the stream
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error("Chat API error:", error);
    return new NextResponse(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
