import { NextResponse } from 'next/server';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { GoogleGenerativeAI, GenerativeModel, Part } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const generativeModel: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Using Gemini 1.5 Flash

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

    // Combine context with the user's latest message
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Format messages for Google Generative AI
    // Gemini 1.5 Flash has a context window, so we pass the system prompt as part of the user's message
    // and potentially previous messages from the chat history.
    const chatMessages: { role: 'user' | 'model'; parts: Part[] }[] = [];

    // Add system context as a user message
    chatMessages.push({
      role: 'user',
      parts: [{ text: `You are a helpful AI assistant answering questions about Ben Orozco. Use ONLY the following context to answer the questions. If the answer is not in the context, clearly state that you don't have information about it.

      # Context about Ben Orozco:
      ${contextContent}` }],
    });

    // Add the actual conversation history, ensuring roles alternate
    messages.forEach((msg: any) => { // Cast to any for now to simplify, refine types later
      chatMessages.push({
        role: msg.role === 'user' ? 'user' : 'model', // Adjust 'system' role if present in messages
        parts: [{ text: msg.content }],
      });
    });

    // Send messages to Gemini
    const result = await generativeModel.generateContentStream({
      contents: chatMessages,
      generationConfig: {
        maxOutputTokens: 500, // Matches previous max_tokens for safety
      }
    });

    // Convert the response stream to a Vercel AI SDK compatible stream
    const stream = GoogleGenerativeAIStream(result);

    // Return the stream
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error("Chat API error:", error);
    return new NextResponse(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
