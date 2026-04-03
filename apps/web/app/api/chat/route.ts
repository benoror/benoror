import { NextResponse } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Initialize OpenAI client (replace with your actual API key and model)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your OpenAI API key is set in environment variables
});

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
    const systemPrompt = `You are a helpful AI assistant answering questions about Ben Orozco. Use ONLY the following context to answer the questions. If the answer is not in the context, clearly state that you don't have information about it.

    # Context about Ben Orozco:
    ${contextContent}

    # User's Question:
    ${lastUserMessage}`;

    // For now, let's just return a placeholder to ensure the setup is correct.
    // We will integrate the LLM streaming later.
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo', // Or your preferred model
    //   stream: true,
    //   messages: [{ role: 'system', content: systemPrompt }],
    // });
    // const stream = OpenAIStream(response);
    // return new StreamingTextResponse(stream);

    return NextResponse.json({
        message: "API endpoint is working! LLM integration is pending.",
        debug_prompt: systemPrompt // For debugging, remove in production
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return new NextResponse(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
