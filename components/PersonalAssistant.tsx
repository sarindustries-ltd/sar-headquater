import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import BrainHUD from './BrainHUD';
import { Message, Role, ShynMode, PersonalityConfig, Tone, Verbosity, AIIdentity } from '../types';
import { brain } from '../services/geminiService';
import { 
    BrainIcon, WrenchIcon, GridIcon, ZapIcon, WifiOffIcon, SlidersIcon,
    SparklesIcon, LightbulbIcon, CommandIcon, MicrophoneIcon, Volume2Icon, GlobeIcon,
    LockIcon, XIcon, CheckCircleIcon
} from './Icons';

interface PersonalAssistantProps {
    isCompact?: boolean;
    onContextUpdate?: (status: 'idle' | 'thinking' | 'url', data?: { text?: string; url?: string }) => void;
}

const PersonalAssistant: React.FC<PersonalAssistantProps> = ({ isCompact = false, onContextUpdate }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMode, setCurrentMode] = useState<ShynMode>(ShynMode.ASSISTANT);
  const [activeIdentity, setActiveIdentity] = useState<AIIdentity>('SHYN');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // UI Features
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isWebSearchActive, setIsWebSearchActive] = useState(false);
  
  // PIN Pad Logic (Retained for JARVIS/Admin lock if needed)
  const [showPinPad, setShowPinPad] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Personality State with Local Storage Persistence
  const [showPersonalitySettings, setShowPersonalitySettings] = useState(false);
  
  // Initialize personality from localStorage or defaults
  const [personality, setPersonality] = useState<PersonalityConfig>(() => {
      try {
          const saved = localStorage.getItem('shyn_personality_config');
          return saved ? JSON.parse(saved) : {
              tone: 'friendly',
              verbosity: 'balanced',
              creativity: 0.7
          };
      } catch (e) {
          console.error("Failed to load personality settings", e);
          return { tone: 'friendly', verbosity: 'balanced', creativity: 0.7 };
      }
  });

  // Save personality to local storage whenever it changes
  useEffect(() => {
      localStorage.setItem('shyn_personality_config', JSON.stringify(personality));
  }, [personality]);

  // Offline simulation logs
  const [offlineLogs, setOfflineLogs] = useState<string[]>([]);

  // Initialize chat on mount
  useEffect(() => {
    // 1. Set Identity Defaults first
    brain.setIdentity('SHYN'); 
    setActiveIdentity('SHYN');

    // 2. Apply User Saved Personality (Overrides identity defaults if they differ)
    brain.setPersonality(personality);

    // 3. Load existing memory if available
    const savedMemory = localStorage.getItem('shyn_memory_v1');
    if (savedMemory) {
        try {
             const parsed = JSON.parse(savedMemory);
             if (parsed && Array.isArray(parsed) && parsed.length > 0) {
                 const hydrated = parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
                 setMessages(hydrated);
                 return;
             }
        } catch(e) { console.error("Memory load error", e); }
    }

    setMessages([
      {
        id: 'welcome',
        role: Role.MODEL,
        text: "Hello Saiful! SHYN is online and ready. How can I make your day easier?",
        timestamp: new Date(),
      }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleModeChange = (mode: ShynMode) => {
    setCurrentMode(mode);
    brain.setMode(mode);
    setMessages(prev => [
      ...prev, 
      {
        id: Date.now().toString(),
        role: Role.MODEL,
        text: `**MODE SWITCH: ${mode.toUpperCase()}**\n\nReconfiguring protocols... Context loaded.`,
        timestamp: new Date()
      }
    ]);

    if (mode === ShynMode.OFFLINE_AUTO_PILOT) {
       startOfflineSimulation();
    }
  };
  
  const handlePersonalityChange = (key: keyof PersonalityConfig, value: any) => {
      const newConfig = { ...personality, [key]: value };
      setPersonality(newConfig);
      // Immediately update brain service
      brain.setPersonality(newConfig);
  };
  
  const handleWebSearchToggle = () => {
      const newState = !isWebSearchActive;
      setIsWebSearchActive(newState);
      brain.setWebSearch(newState, messages);
  };

  const startOfflineSimulation = () => {
    setOfflineLogs([]);
    const interval = setInterval(() => {
        const logs = brain.generateOfflineLogs();
        setOfflineLogs(prev => [...prev, ...logs].slice(-8)); 
    }, 3000);
    return () => clearInterval(interval);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, offlineLogs]);

  // --- PIN PAD HANDLERS ---
  const handleBrainClick = () => {
      // Toggle Identity with PIN logic if switching to Restricted mode (JARVIS) or unlocking SHYN
      if (activeIdentity === 'SHYN') {
          // Switch to JARVIS (Admin/Technical) - maybe protect this? or just switch.
          // For now, let's treat JARVIS as the "Safe Mode" / "Admin Mode"
          setActiveIdentity('JARVIS');
          brain.setIdentity('JARVIS', messages);
          setMessages(prev => [...prev, {
              id: Date.now().toString(),
              role: Role.MODEL,
              text: "**ADMIN OVERRIDE.**\n\nJARVIS Interface Initialized. Secure protocols active.",
              timestamp: new Date()
          }]);
      } else {
          // Switch back to SHYN
          setActiveIdentity('SHYN');
          brain.setIdentity('SHYN', messages);
          // Re-apply personality
          brain.setPersonality(personality);
          setMessages(prev => [...prev, {
              id: Date.now().toString(),
              role: Role.MODEL,
              text: "**PERSONALITY RESTORED.**\n\nI'm back, Saiful.",
              timestamp: new Date()
          }]);
      }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Update Header
    if (onContextUpdate) {
        onContextUpdate('thinking', { text: activeIdentity === 'SHYN' ? 'SHYN is thinking...' : 'Jarvis is processing...' });
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text,
      timestamp: new Date(),
    };
    
    const aiMsgId = (Date.now() + 1).toString();
    const aiMsgPlaceholder: Message = {
      id: aiMsgId,
      role: Role.MODEL,
      text: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages(prev => {
        const newHistory = [...prev, userMsg, aiMsgPlaceholder];
        brain.saveMemory([...prev, userMsg]);
        return newHistory;
    });
    
    setIsTyping(true);

    try {
        let fullText = '';
        await brain.sendMessage(text, (chunk, sources) => {
            fullText += chunk;
            
            // If sources found, update header
            if (sources && sources.length > 0 && onContextUpdate) {
                onContextUpdate('url', { text: sources[0].title || 'Web Result', url: sources[0].uri });
            }

            setMessages(prev => prev.map(msg => 
                msg.id === aiMsgId 
                ? { ...msg, text: fullText, sources: sources || msg.sources } 
                : msg
            ));
        });
        
        setMessages(prev => {
            const finalHistory = prev.map(msg => 
                msg.id === aiMsgId 
                ? { ...msg, isStreaming: false, text: fullText } 
                : msg
            );
            brain.saveMemory(finalHistory);
            return finalHistory;
        });

        // Reset header after a delay if no URL was found
        if (onContextUpdate && !fullText.includes("http")) { // Simple heuristic, ideally we check sources
             setTimeout(() => onContextUpdate('idle'), 5000);
        }

    } catch (error) {
        setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId 
            ? { ...msg, text: msg.text + "\n\n[System Error: Neural Link Unstable]", isStreaming: false } 
            : msg
        ));
        if (onContextUpdate) onContextUpdate('idle');
    } finally {
        setIsTyping(false);
    }
  };

  const getModeStyles = (mode: ShynMode, isActive: boolean) => {
    if (!isActive) return 'bg-white/5 text-gray-500 border-transparent hover:bg-white/10 hover:text-gray-300';
    
    // JARVIS Styles
    if (activeIdentity === 'JARVIS') {
         return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]';
    }

    // SHYN Mode Styles
    switch (mode) {
      case ShynMode.ASSISTANT:
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]';
      case ShynMode.RESEARCHER:
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
      case ShynMode.CREATOR:
        return 'bg-pink-500/10 text-pink-300 border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.2)]';
      case ShynMode.CODER:
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
      case ShynMode.OFFLINE_AUTO_PILOT:
        return 'bg-orange-500/10 text-orange-300 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]';
      default:
        return 'bg-gray-500/10 text-gray-300 border-gray-500/30';
    }
  };

  const getSuggestions = () => {
      // Identity-based prompts
      if (activeIdentity === 'JARVIS') {
          return [
              { icon: WrenchIcon, label: "System Status" },
              { icon: CommandIcon, label: "Deploy Code" },
              { icon: GridIcon, label: "Analyze Data" }
          ];
      }

      switch(currentMode) {
          case ShynMode.ASSISTANT:
              return [
                  { icon: CommandIcon, label: "Draft summary" },
                  { icon: ZapIcon, label: "Schedule tasks" },
                  { icon: LightbulbIcon, label: "Prioritize" }
              ];
          case ShynMode.RESEARCHER:
              return [
                  { icon: GlobeIcon, label: "Market trends" },
                  { icon: LightbulbIcon, label: "Explain quantum" },
                  { icon: CommandIcon, label: "Find citations" }
              ];
          case ShynMode.CODER:
              return [
                  { icon: WrenchIcon, label: "Refactor code" },
                  { icon: CommandIcon, label: "Generate API" },
                  { icon: LightbulbIcon, label: "Debug error" }
              ];
          case ShynMode.CREATOR:
              return [
                  { icon: SparklesIcon, label: "Viral tweet" },
                  { icon: LightbulbIcon, label: "Blog topics" },
                  { icon: CommandIcon, label: "Brand copy" }
              ];
          default: return [];
      }
  };

  const renderWelcomeHero = () => {
      const isJarvis = activeIdentity === 'JARVIS';
      return (
        <div className={`flex-1 flex flex-col items-center justify-center text-center animate-fade-in-up ${isCompact ? 'p-4' : 'p-8'}`}>
            <div className="relative mb-6 group">
                <div className={`absolute inset-0 blur-[40px] rounded-full transition-all duration-1000 ${isJarvis ? 'bg-cyan-500/20 group-hover:bg-cyan-500/30' : 'bg-indigo-500/20 group-hover:bg-indigo-500/30'}`}></div>
                <button 
                    onClick={handleBrainClick}
                    className={`${isCompact ? 'w-20 h-20' : 'w-32 h-32'} rounded-3xl bg-gradient-to-br border flex items-center justify-center relative z-10 shadow-2xl transition-colors duration-500 cursor-pointer ${isJarvis ? 'from-cyan-900/80 to-black border-cyan-500/30 shadow-cyan-500/20' : 'from-indigo-900/80 to-black border-indigo-500/30 shadow-indigo-500/20'}`}
                >
                    <BrainIcon className={`${isCompact ? 'w-10 h-10' : 'w-16 h-16'} group-hover:scale-110 transition-transform duration-500 ${isJarvis ? 'text-cyan-400' : 'text-indigo-400'}`} />
                </button>
            </div>
            
            <h2 className={`${isCompact ? 'text-xl' : 'text-3xl'} font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-2`}>
                {isJarvis ? 'JARVIS ONLINE' : 'SHYN Active'}
            </h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed text-sm">
                {isJarvis ? 'Advanced Technical Interface Ready.' : 'Virtual Human Companion initialized. How can I help you today, Saiful?'}
            </p>

            <div className="flex flex-wrap justify-center gap-2 max-w-xl">
                {getSuggestions().map((s, i) => (
                    <button 
                        key={i}
                        onClick={() => handleSendMessage(s.label)}
                        className={`
                            flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium transition-all group
                            ${isJarvis ? 'hover:border-cyan-500/30' : 'hover:border-indigo-500/30'}
                        `}
                    >
                        <s.icon className={`w-3.5 h-3.5 transition-colors ${isJarvis ? 'text-cyan-400 group-hover:text-white' : 'text-indigo-400 group-hover:text-white'}`} />
                        <span className="text-gray-300 group-hover:text-white transition-colors">{s.label}</span>
                    </button>
                ))}
            </div>
        </div>
      );
  };

  const renderMainContent = () => {
    if (currentMode === ShynMode.OFFLINE_AUTO_PILOT) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="z-10 w-full max-w-2xl card-glass border-green-500/20 rounded-2xl p-8 shadow-[0_0_50px_rgba(34,197,94,0.05)]">
                    <div className="flex items-center gap-4 mb-6 border-b border-green-500/10 pb-4">
                        <div className="w-12 h-12 rounded-full bg-green-900/20 flex items-center justify-center border border-green-500/30">
                            <WifiOffIcon className="w-6 h-6 text-green-400 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-green-400">AUTO-PILOT ACTIVE</h2>
                            <p className="text-xs text-green-600 font-mono uppercase">SHYN is handling digital tasks</p>
                        </div>
                    </div>

                    <div className="space-y-3 font-mono text-sm h-48 overflow-hidden relative">
                        {offlineLogs.length === 0 && <p className="text-green-800 animate-pulse">Initializing background agents...</p>}
                        {offlineLogs.map((log, i) => (
                            <div key={i} className="flex gap-3 text-green-300/80 animate-fade-in-up">
                                <span className="text-green-700">[{new Date().toLocaleTimeString()}]</span>
                                <span>{log}</span>
                            </div>
                        ))}
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0a0a0c] to-transparent pointer-events-none"></div>
                    </div>

                    <button 
                        onClick={() => handleModeChange(ShynMode.ASSISTANT)}
                        className="w-full mt-6 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl transition-all uppercase font-bold text-xs tracking-widest hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                    >
                        Disengage Auto-Pilot
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={`flex-1 overflow-y-auto ${isCompact ? 'px-4 py-4' : 'px-4 py-6 md:px-8'} custom-scrollbar scroll-smooth flex flex-col`}>
                {messages.length <= 1 ? renderWelcomeHero() : (
                    <div className="max-w-4xl mx-auto w-full space-y-2 flex-1">
                        {messages.map(msg => (
                            <MessageBubble key={msg.id} message={msg} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            
            <div className="flex-shrink-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-4 relative">
                 {/* Personality Customization Panel - Collapsible */}
                 <div 
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 w-full mb-4 card-glass rounded-2xl z-20 collapsible ${isCompact ? 'max-w-[95%] p-4' : 'max-w-2xl p-6'} ${showPersonalitySettings ? 'open' : ''}`}
                 >
                     {/* Content wrapper for height calculation */}
                     <div>
                         <div className="flex justify-between items-center mb-6">
                             <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                 <SlidersIcon className="w-4 h-4 text-indigo-400" />
                                 Neural Configuration
                             </h3>
                             <button onClick={() => setShowPersonalitySettings(false)} className="text-gray-400 hover:text-white">✕</button>
                         </div>
                         
                         <div className="space-y-6">
                             {/* Tone */}
                             <div>
                                 <label className="text-xs text-gray-500 font-mono uppercase mb-2 block">Voice Tone</label>
                                 <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
                                     {(['formal', 'friendly', 'humorous', 'robotic'] as Tone[]).map(t => (
                                         <button
                                            key={t}
                                            onClick={() => handlePersonalityChange('tone', t)}
                                            className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all ${personality.tone === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                         >
                                             {t}
                                         </button>
                                     ))}
                                 </div>
                             </div>

                             {/* Verbosity */}
                             <div>
                                 <label className="text-xs text-gray-500 font-mono uppercase mb-2 block">Response Verbosity</label>
                                 <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
                                     {(['concise', 'balanced', 'verbose'] as Verbosity[]).map(v => (
                                         <button
                                            key={v}
                                            onClick={() => handlePersonalityChange('verbosity', v)}
                                            className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all ${personality.verbosity === v ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                         >
                                             {v}
                                         </button>
                                     ))}
                                 </div>
                             </div>

                             {/* Creativity */}
                             <div>
                                 <div className="flex justify-between mb-2">
                                    <label className="text-xs text-gray-500 font-mono uppercase">Creativity (Temp)</label>
                                    <span className="text-xs text-indigo-400 font-bold">{Math.round(personality.creativity * 100)}%</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                     <span className="text-[10px] text-gray-600 font-medium">Strict</span>
                                     <input 
                                        type="range" 
                                        min="0.1" 
                                        max="1.0" 
                                        step="0.1"
                                        value={personality.creativity}
                                        onChange={(e) => handlePersonalityChange('creativity', parseFloat(e.target.value))}
                                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                     />
                                     <span className="text-[10px] text-gray-600 font-medium">Creative</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                
                {/* Input Controls Bar */}
                <div className="max-w-4xl mx-auto px-4 flex justify-between items-end mb-2">
                    <div className="flex gap-2">
                        <button 
                             onClick={() => setShowPersonalitySettings(!showPersonalitySettings)}
                             className={`p-2 rounded-xl border transition-all ${showPersonalitySettings ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                             title="Neural Config"
                        >
                             <SlidersIcon className="w-4 h-4" />
                        </button>
                        <button 
                             onClick={handleWebSearchToggle}
                             className={`p-2 rounded-xl border transition-all ${isWebSearchActive ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                             title={isWebSearchActive ? "Web Search Active" : "Enable Web Search"}
                        >
                             <GlobeIcon className="w-4 h-4" />
                        </button>
                    </div>

                    <button 
                         onClick={() => setIsVoiceActive(!isVoiceActive)}
                         className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${isVoiceActive ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'}`}
                    >
                         {isVoiceActive ? (
                            <>
                                <div className="flex gap-0.5 items-center h-3">
                                    <div className="w-0.5 bg-green-400 h-full animate-[pulse_0.5s_ease-in-out_infinite]"></div>
                                    <div className="w-0.5 bg-green-400 h-2/3 animate-[pulse_0.5s_ease-in-out_infinite_0.1s]"></div>
                                    <div className="w-0.5 bg-green-400 h-full animate-[pulse_0.5s_ease-in-out_infinite_0.2s]"></div>
                                    <div className="w-0.5 bg-green-400 h-1/2 animate-[pulse_0.5s_ease-in-out_infinite_0.3s]"></div>
                                </div>
                                {!isCompact && <span className="text-xs font-bold uppercase">Listening</span>}
                            </>
                         ) : (
                             <>
                                <MicrophoneIcon className="w-3.5 h-3.5" />
                                {!isCompact && <span className="text-xs font-bold uppercase">Voice Mode</span>}
                             </>
                         )}
                    </button>
                </div>

                <div className="max-w-4xl mx-auto w-full">
                    <ChatInput onSend={handleSendMessage} disabled={isTyping} />
                </div>
            </div>
        </>
    );
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      
      {/* Brain Status HUD */}
      <BrainHUD 
        mode={currentMode} 
        identity={activeIdentity}
        isTyping={isTyping} 
        isCompact={isCompact} 
        onBrainClick={handleBrainClick}
      />

      {/* Mode Selector Bar */}
      <div className={`border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md flex items-center overflow-x-auto custom-scrollbar gap-2 shrink-0 z-10 ${isCompact ? 'h-12 px-3' : 'h-14 px-6'}`}>
         {!isCompact && <span className="text-[10px] text-gray-500 font-mono uppercase mr-2 hidden md:block tracking-wider">Modules:</span>}
         
         {[
             { id: ShynMode.ASSISTANT, label: 'Assistant', icon: BrainIcon },
             { id: ShynMode.RESEARCHER, label: 'Researcher', icon: GridIcon },
             { id: ShynMode.CREATOR, label: 'Creator', icon: ZapIcon },
             { id: ShynMode.CODER, label: 'Coder', icon: WrenchIcon },
             { id: ShynMode.OFFLINE_AUTO_PILOT, label: 'Offline/Auto', icon: WifiOffIcon },
         ].map(m => (
             <button
                key={m.id}
                onClick={() => handleModeChange(m.id as ShynMode)}
                className={`
                    flex items-center gap-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap border relative overflow-hidden
                    ${isCompact ? 'px-3 py-1.5' : 'px-4 py-1.5'}
                    ${getModeStyles(m.id as ShynMode, currentMode === m.id)}
                `}
             >
                <m.icon className="w-3.5 h-3.5 relative z-10" />
                {!isCompact && <span className="relative z-10">{m.label}</span>}
             </button>
         ))}
      </div>

      {renderMainContent()}
    </div>
  );
};

export default PersonalAssistant;