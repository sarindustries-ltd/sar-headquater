import React, { useState, useEffect } from 'react';
import { 
    MenuIcon, LogoIcon, BrainIcon, XIcon, BellIcon, MailIcon, 
    ShareIcon, HomeIcon, GlobeIcon, CpuIcon, LinkIcon
} from './components/Icons';
import Sidebar from './components/Sidebar';
import ProfileCard from './components/ProfileCard';
import PersonalAssistant from './components/PersonalAssistant';
import KapiManagement from './components/KapiManagement';
import Wallet from './components/Wallet';
import Connectors from './components/Connectors';
import Tools from './components/Tools';
import Apps from './components/Apps';
import FileManager from './components/FileManager';
import Utility from './components/Utility';
import RevenueSuite from './components/RevenueSuite';
import Settings from './components/Settings';
import Onboarding from './components/Onboarding';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Default to 'shyn' to show the AI chat assistant immediately
  const [activeTab, setActiveTab] = useState('shyn'); 
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Dynamic Header State
  const [headerState, setHeaderState] = useState<{
      mode: 'default' | 'thinking' | 'url';
      text: string;
      url?: string;
  }>({
      mode: 'default',
      text: 'Search the web or ask SHYN...'
  });

  // Handle header updates from SHYN
  const handleHeaderUpdate = (status: 'idle' | 'thinking' | 'url', data?: { text?: string; url?: string }) => {
      if (status === 'thinking') {
          setHeaderState({ mode: 'thinking', text: data?.text || 'Jarvis is thinking...' });
      } else if (status === 'url' && data?.url) {
          setHeaderState({ mode: 'url', text: data.text || data.url, url: data.url });
      } else {
          // Idle / Default
          setHeaderState({ mode: 'default', text: 'Search the web or ask SHYN...' });
      }
  };

  // Check onboarding status on mount
  useEffect(() => {
      const hasCompletedOnboarding = localStorage.getItem('sar_onboarding_completed');
      if (!hasCompletedOnboarding) {
          setShowOnboarding(true);
      }
  }, []);

  const handleOnboardingComplete = () => {
      localStorage.setItem('sar_onboarding_completed', 'true');
      setShowOnboarding(false);
  };

  // Keyboard shortcut listener for CMD+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsChatOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderContent = () => {
    // Mapping the 'shyn' tab to the AI Assistant interface
    if (activeTab === 'shyn') {
      return <PersonalAssistant onContextUpdate={handleHeaderUpdate} />;
    } 

    if (activeTab === 'kapi') {
      return <KapiManagement />;
    }
    
    if (activeTab === 'wallet') {
      return <Wallet />;
    }

    if (activeTab === 'revenue') {
      return <RevenueSuite />;
    }

    if (activeTab === 'connectors') {
      return <Connectors />;
    }

    if (activeTab === 'tools') {
      return <Tools />;
    }

    if (activeTab === 'apps') {
      return <Apps />;
    }

    if (activeTab === 'files') {
      return <FileManager />;
    }

    if (activeTab === 'utility') {
      return <Utility />;
    }

    if (activeTab === 'settings') {
      return <Settings />;
    }
    
    // Dashboard View (Enhanced Showcase)
    if (activeTab === 'dashboard') {
        return (
            <div className="p-8 h-full overflow-y-auto flex flex-col items-center justify-center custom-scrollbar animate-fade-in-up">
                 <div className="text-center mb-12 relative z-10">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-md animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        System Operational
                     </div>
                     <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-4 tracking-tight max-w-4xl leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                         Welcome to Saiful Alam Rafi's Digital World. Headquarter.
                     </h1>
                     <p className="text-gray-400 max-w-lg mx-auto text-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Your SAR ecosystem is optimized. AI agents are active and monitoring your workflows.</p>
                     
                     <button 
                        onClick={() => setShowOnboarding(true)}
                        className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}
                     >
                        <CpuIcon className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                        <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">Re-Initialize Protocol Tour</span>
                        <div className="absolute inset-0 rounded-full ring-1 ring-white/10 group-hover:ring-indigo-500/20 transition-all"></div>
                     </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl relative z-10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                     {/* Stats Card 1 */}
                     <div className="card-glass p-6 rounded-3xl hover:border-indigo-500/30 transition-all duration-300 group hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Balance</p>
                                <h3 className="text-3xl font-bold text-white mt-2 tracking-tight">$124,592.00</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 font-bold text-xs border border-green-500/20 group-hover:scale-110 transition-transform">
                                ↗
                            </div>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full w-[75%] shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                        </div>
                        <p className="text-right text-[10px] text-gray-500 mt-2 font-mono">+12.5% vs last month</p>
                     </div>
                     
                      {/* Stats Card 2 */}
                     <div className="card-glass p-6 rounded-2xl hover:border-purple-500/30 transition-all duration-300 group hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Monthly Spend</p>
                                <h3 className="text-3xl font-bold text-white mt-2 tracking-tight">$4,230.50</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs border border-purple-500/20 group-hover:scale-110 transition-transform">
                                ↘
                            </div>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-purple-500 h-full w-[45%] shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                        </div>
                        <p className="text-right text-[10px] text-gray-500 mt-2 font-mono">+2.1% vs last month</p>
                     </div>
                     
                      {/* Identity Card */}
                      <div className="md:col-span-2 xl:col-span-1 flex justify-center">
                          <ProfileCard />
                      </div>
                 </div>
            </div>
        );
    }

    // Generic Placeholder
    return (
        <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
                    <LogoIcon className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2 capitalize">{activeTab.replace('-', ' ')}</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">This module is initializing...</p>
            </div>
        </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#030304] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-100 overflow-hidden">
      
      {/* Onboarding Overlay */}
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      {/* Enhanced Background */}
      <div className="bg-noise"></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white opacity-[0.15]" />
        
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-900/10 blur-[150px] rounded-full animate-blob mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-blue-900/5 blur-[120px] rounded-full animate-blob animation-delay-4000 mix-blend-screen" />
      </div>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={(tab) => {
            setActiveTab(tab);
            // If switching to full-page SHYN, close the floating chat to avoid duplicates
            if (tab === 'shyn') setIsChatOpen(false);
        }}
      />

      <main className="flex-1 flex flex-col relative z-10 w-full max-w-[100vw] overflow-hidden">
        
        {/* Global Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#030304]/60 backdrop-blur-xl z-20 shrink-0">
          <div className="flex items-center gap-4 w-48 shrink-0">
             {/* Mobile Menu Toggle */}
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <LogoIcon className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold tracking-wide">SAR</span>
              </div>
          </div>
          
          {/* Centered Dynamic Header: Search / Ask SHYN / URL */}
          <div className="hidden md:flex flex-1 justify-center px-6">
              {headerState.mode === 'url' ? (
                  /* URL Link Mode */
                  <a 
                    href={headerState.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-full transition-all duration-300 w-full max-w-md backdrop-blur-md shadow-lg shadow-indigo-500/10 cursor-pointer"
                  >
                      <div className="p-1 bg-indigo-500/20 rounded-full text-indigo-300 group-hover:scale-110 transition-transform">
                          <GlobeIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-indigo-200 truncate font-medium flex-1">{headerState.text}</span>
                      <LinkIcon className="w-3.5 h-3.5 text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
              ) : headerState.mode === 'thinking' ? (
                  /* Thinking Mode */
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-full w-full max-w-md backdrop-blur-md">
                      <div className="p-1 bg-white/10 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <span className="text-sm text-gray-300 animate-pulse">{headerState.text}</span>
                  </div>
              ) : (
                  /* Default / Search Mode */
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="group flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 rounded-full transition-all duration-300 w-full max-w-md backdrop-blur-md shadow-lg shadow-black/5"
                  >
                      <div className="p-1 bg-indigo-500/20 rounded-full text-indigo-300 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                          {activeTab === 'shyn' || isChatOpen ? <BrainIcon className="w-3.5 h-3.5" /> : <GlobeIcon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                          {activeTab === 'shyn' ? 'Ask Jarvis about SAR World...' : 'Search the web or ask SHYN...'}
                      </span>
                      <div className="ml-auto flex items-center gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] font-mono text-gray-400 border border-white/10 px-1.5 py-0.5 rounded bg-black/20">⌘ K</span>
                      </div>
                  </button>
              )}
          </div>
          
          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 w-48 justify-end shrink-0">
              <button 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 group relative"
                title="Gmail"
              >
                  <MailIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 group relative"
                title="Social Accounts"
              >
                  <ShareIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 group relative"
                title="Home Device"
              >
                  <HomeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              
              <div className="w-px h-6 bg-white/10 mx-2"></div>
              
              <button 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 group relative"
                title="Notifications"
              >
                  <BellIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#030304]"></span>
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75"></span>
              </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-hidden relative">
            {renderContent()}
        </div>

        {/* Global Footer */}
        <footer className="py-2.5 px-6 border-t border-white/5 bg-[#030304]/80 backdrop-blur-xl z-20 shrink-0 flex justify-between items-center hidden md:flex">
             <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">System Online</p>
             </div>
            <p className="text-[10px] text-gray-600 tracking-wider font-medium uppercase font-mono">
                Developed By SAIFUL ALAM RAFI
            </p>
        </footer>

        {/* Floating Chat Button (Hidden if full-page SHYN is active) */}
        {activeTab !== 'shyn' && (
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`
                    fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) hover:scale-110 active:scale-95 group border border-white/10
                    ${isChatOpen ? 'bg-white text-black rotate-90 scale-90' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/30'}
                `}
            >
                {isChatOpen ? <XIcon className="w-6 h-6" /> : <BrainIcon className="w-7 h-7" />}
            </button>
        )}

        {/* Responsive Floating Chatbox */}
        <div className={`
            fixed z-40 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl border border-white/10 overflow-hidden card-glass origin-bottom-right
            ${isChatOpen 
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}
            
            /* Mobile: Full Screen Overlay */
            inset-0 
            
            /* Desktop: Floating Widget */
            md:inset-auto md:bottom-24 md:right-6 md:w-[450px] md:h-[650px] md:rounded-2xl
        `}>
            {/* Mobile Header for Close */}
            <div className="md:hidden flex justify-between items-center p-4 border-b border-white/5 bg-black/40 backdrop-blur-md">
                <span className="font-bold text-white flex items-center gap-2">
                    <BrainIcon className="w-5 h-5 text-indigo-400" />
                    SHYN Copilot
                </span>
                <button 
                    onClick={() => setIsChatOpen(false)} 
                    className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10"
                >
                    <XIcon className="w-5 h-5" />
                </button>
            </div>
            
            {/* Chat Content */}
            <div className="h-full bg-black/40">
                {isChatOpen && <PersonalAssistant isCompact={true} onContextUpdate={handleHeaderUpdate} />}
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;