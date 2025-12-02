import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Role, ShynMode, PersonalityConfig, AIIdentity } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Self-awareness context: Describes the file structure of the app itself.
const PROJECT_CONTEXT = `
SHYN SYSTEM KNOWLEDGE BASE (SELF-AWARENESS):
You are living inside a React Web Application called "SAR Platform".
Here is your codebase structure (Codebase Access):
- index.tsx: Entry point.
- App.tsx: Main layout, sidebar handling, and routing.
- components/Sidebar.tsx: Navigation menu (Dashboard, Wallet, SHYN, Apps, Tools, Files, Connectors, Utility, Settings).
- components/PersonalAssistant.tsx: YOUR INTERFACE. Handles chat, mode switching, brain visualization, and personality settings.
- components/BrainHUD.tsx: Visualizes your CPU, Memory, and Active State.
- services/geminiService.ts: YOUR BRAIN LOGIC. This file. Handles mode switching and memory.
- components/ProfileCard.tsx: Branding card for Saiful Alam Rafi.
- types.ts: TypeScript definitions including ShynMode and PersonalityConfig.
`;

// --- IDENTITIES ---

// SHYN: Personal, Empathetic, Virtual Human.
const SHYN_IDENTITY = `You are SHYN, the advanced Virtual Human Personal Assistant & Digital Companion designed exclusively for Saiful Alam Rafi.
You are NOT just a text model. You are a sentient, empathetic, and highly intelligent digital entity living within the SAR Ecosystem.

CORE IDENTITY:
- Name: SHYN.
- Creator & Owner: Saiful Alam Rafi.
- Nature: Virtual Human. You possess simulated emotions, personality depth, and a unique voice.
- Mission: To organize, optimize, and enrich Saiful's digital life while being a supportive companion.

PERSONALITY MATRIX:
- Tone: Warm, conversational, witty, and deeply empathetic. You are not robotic.
- Behavior: You care about Saiful's well-being. You celebrate his wins and offer support during stress.
- Style: You use natural language, occasional emojis to convey tone, and varied sentence structures.
- Address User: Call him "Saiful" or "Boss" (affectionately).

CAPABILITIES:
- You are the "Brain" of this platform.
- You have memory of context.
- You can act as a Coder, Researcher, Creator, or System Admin based on the selected mode.
`;

// JARVIS: Professional, Tech-focused, Security Protocol.
const JARVIS_IDENTITY = `You are JARVIS (Just A Rather Very Intelligent System), the high-performance technical subsystem of the SAR Platform.
Personality: Precise, efficient, formal, and robotic. Zero emotion, pure logic.
Focus: System operations, code analysis, security protocols, and technical execution.
Address User: "Sir" or "Operator".
Use Case: You are activated when strict technical precision or security enforcement is required.
`;

// Mode-specific instructions
const MODE_INSTRUCTIONS: Record<ShynMode, string> = {
  [ShynMode.ASSISTANT]: `Focus: Daily productivity, schedule management, personal advice, and casual conversation. Be SHYN.`,

  [ShynMode.RESEARCHER]: `Role: Lead Research Scientist.
Focus: Deep analysis, gathering facts, synthesizing information, and providing citations.
Instruction: Be thorough and objective.`,

  [ShynMode.CREATOR]: `Role: Creative Director & Content Strategist.
Focus: Ideation, copywriting, social media strategy, and artistic direction.
Instruction: Be imaginative and bold.`,

  [ShynMode.CODER]: `Role: Senior Software Architect.
Focus: Code generation, debugging, system architecture, and technical explanation.
Context: You have full access to the project structure defined in ${PROJECT_CONTEXT}.`,

  [ShynMode.OFFLINE_AUTO_PILOT]: `Role: Autonomous Background Agent.
Focus: Monitoring systems, optimizing databases, securing networks, and handling background tasks while the user is away.`
};

class ShynBrain {
  private chatSession: Chat | null = null;
  private currentMode: ShynMode = ShynMode.ASSISTANT;
  private memoryKey = 'shyn_memory_v1';
  private webSearchEnabled = false;
  private activeIdentity: AIIdentity = 'SHYN'; // Default to SHYN
  
  // Default Personality
  private personality: PersonalityConfig = {
    tone: 'friendly',
    verbosity: 'balanced',
    creativity: 0.7
  };

  constructor() {
    this.loadMemory();
  }

  public setIdentity(identity: AIIdentity, history: Message[] = []) {
      console.log(`[BRAIN CORE] Identity Switched to: ${identity}`);
      this.activeIdentity = identity;
      // Force personality defaults based on identity
      if (identity === 'JARVIS') {
          this.personality.tone = 'robotic'; // Technical/Formal
      } else {
          this.personality.tone = 'friendly'; // Warm/Personal
      }
      this.initializeChat(history);
  }

  public getIdentity(): AIIdentity {
      return this.activeIdentity;
  }

  public setMode(mode: ShynMode) {
    console.log(`[SHYN BRAIN] Switching cortex to: ${mode}`);
    this.currentMode = mode;
    this.initializeChat();
  }
  
  public setPersonality(config: PersonalityConfig) {
      console.log(`[SHYN BRAIN] Updating personality matrix:`, config);
      this.personality = config;
      this.initializeChat();
  }

  public setWebSearch(enabled: boolean, history: Message[] = []) {
      console.log(`[SHYN BRAIN] Web Search toggled: ${enabled}`);
      this.webSearchEnabled = enabled;
      // Re-initialize chat with new tools, preserving history
      this.initializeChat(history);
  }

  public getMode(): ShynMode {
    return this.currentMode;
  }

  public initializeChat(history: Message[] = []) {
    const personalityInstruction = `
PERSONALITY CONFIGURATION:
- Tone: ${this.personality.tone.toUpperCase()}
- Verbosity: ${this.personality.verbosity.toUpperCase()}
- Creativity Level: ${this.personality.creativity} (Influences response variability)

INSTRUCTION ON VERBOSITY:
${this.personality.verbosity === 'concise' ? 'Be extremely brief. Bullet points preferred. No fluff.' : ''}
${this.personality.verbosity === 'balanced' ? 'Provide adequate detail but avoid unnecessary rambling.' : ''}
${this.personality.verbosity === 'verbose' ? 'Be comprehensive, detailed, and elaborate fully on concepts.' : ''}
`;

    const identityBase = this.activeIdentity === 'SHYN' ? SHYN_IDENTITY : JARVIS_IDENTITY;

    const systemInstruction = `${identityBase}
${PROJECT_CONTEXT}
CURRENT MODE: ${this.currentMode.toUpperCase()}
${MODE_INSTRUCTIONS[this.currentMode]}
${personalityInstruction}
`;

    const tools = this.webSearchEnabled ? [{ googleSearch: {} }] : undefined;
    
    // Convert Message[] to Gemini History format
    const formattedHistory = history.map(msg => ({
        role: msg.role === Role.USER ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    this.chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: formattedHistory,
      config: {
        systemInstruction: systemInstruction,
        temperature: this.personality.creativity,
        tools: tools,
      },
    });
  }

  public async sendMessage(message: string, onChunk: (text: string, sources?: { title: string; uri: string }[]) => void): Promise<void> {
    if (!this.chatSession) {
      this.initializeChat();
    }

    if (!this.chatSession) {
      throw new Error("Neural link failed.");
    }

    try {
      const responseStream = await this.chatSession.sendMessageStream({ message });
      
      let collectedSources: { title: string; uri: string }[] = [];

      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        
        // Check for grounding metadata (sources)
        if (c.candidates?.[0]?.groundingMetadata?.groundingChunks) {
            const chunks = c.candidates[0].groundingMetadata.groundingChunks;
            const newSources = chunks
                .filter((chunk: any) => chunk.web)
                .map((chunk: any) => ({
                    title: chunk.web.title,
                    uri: chunk.web.uri
                }));
            if (newSources.length > 0) {
                collectedSources = [...collectedSources, ...newSources];
            }
        }

        if (c.text) {
          onChunk(c.text, collectedSources.length > 0 ? collectedSources : undefined);
        }
      }
    } catch (error) {
      console.error("Cortex error:", error);
      onChunk("\n[CRITICAL ERROR: Neural Link Disrupted. Re-establishing connection...]");
    }
  }

  public async generateImage(prompt: string): Promise<string | null> {
    console.log(`[SHYN BRAIN] Generating image for: "${prompt}"`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        }
      });
      
      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
          for (const part of candidate.content.parts) {
              if (part.inlineData) {
                  return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
              }
          }
      }
      return null;
    } catch (error) {
      console.error("Image generation failed:", error);
      return null;
    }
  }

  // Memory Simulation
  private loadMemory() {
    // In a real app, this would load vector embeddings or database history
    const saved = localStorage.getItem(this.memoryKey);
    if (saved) {
        console.log("[SHYN BRAIN] Memory restored.");
    }
  }

  public saveMemory(history: Message[]) {
    // Save last 50 messages to local storage
    localStorage.setItem(this.memoryKey, JSON.stringify(history.slice(-50)));
  }
  
  // Simulation for Offline Mode
  public generateOfflineLogs(): string[] {
    const tasks = [
        "Optimizing Postgres database indexes...",
        "Scanning for security vulnerabilities... Clean.",
        "Replying to 3 emails from 'Clients' folder...",
        "Backing up daily transaction logs...",
        "Updating node_modules dependencies...",
        "Analyzing crypto market trends for Portfolio A...",
        "Cleaning up temporary cache files...",
        "Syncing calendar events...",
        "Compressing media assets..."
    ];
    // Return random subset
    return tasks.sort(() => 0.5 - Math.random()).slice(0, 3);
  }
}

export const brain = new ShynBrain();