import React, { useEffect, useState } from 'react';
import { BrainStats, ShynMode, AIIdentity } from '../types';
import { BrainIcon, WifiOffIcon, ActivityIcon, CpuIcon, DatabaseIcon, ServerIcon, LockIcon } from './Icons';

interface BrainHUDProps {
  mode: ShynMode;
  identity?: AIIdentity;
  isTyping: boolean;
  isCompact?: boolean;
  onBrainClick?: () => void;
}

const BrainHUD: React.FC<BrainHUDProps> = ({ mode, identity = 'JARVIS', isTyping, isCompact = false, onBrainClick }) => {
  const [stats, setStats] = useState<BrainStats>({
    memoryUsage: 45,
    cpuLoad: 12,
    networkLatency: 24,
    activeAgents: 1
  });

  const isShyn = identity === 'SHYN';

  // Simulate stats fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        memoryUsage: Math.min(95, Math.max(30, prev.memoryUsage + (Math.random() * 10 - 5) + (isTyping ? 5 : -2))),
        cpuLoad: Math.min(100, Math.max(5, prev.cpuLoad + (Math.random() * 20 - 10) + (isTyping ? 20 : -10))),
        networkLatency: Math.floor(20 + Math.random() * 10),
        activeAgents: mode === ShynMode.OFFLINE_AUTO_PILOT ? 5 : 1
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isTyping, mode]);

  const getModeColor = () => {
    if (mode === ShynMode.OFFLINE_AUTO_PILOT) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    if (!isShyn) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'; // JARVIS is Cyan
    
    // SHYN Colors by Mode
    switch (mode) {
      case ShynMode.RESEARCHER: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case ShynMode.CODER: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case ShynMode.CREATOR: return 'text-pink-400 bg-pink-500/10 border-pink-500/20';
      default: return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    }
  };

  const getBarColor = (val: number, isCpu = false) => {
      if (val > 85) return 'bg-red-500';
      if (!isShyn) return 'bg-cyan-500'; // JARVIS bars
      if (isCpu) return 'bg-indigo-500';
      return 'bg-purple-500';
  };

  const renderSegmentedBar = (percentage: number, colorClass: string) => {
      const segments = 10;
      const filled = Math.round((percentage / 100) * segments);
      
      return (
          <div className="flex gap-0.5 h-1.5 w-full max-w-[60px]">
              {Array.from({ length: segments }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-[1px] ${i < filled ? colorClass : 'bg-white/10'}`}
                  />
              ))}
          </div>
      );
  };

  return (
    <div className={`w-full card-glass border-b border-white/5 z-20 sticky top-0 backdrop-blur-xl ${isCompact ? 'px-4 py-3' : 'px-6 py-4'}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Identity & Mode */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={onBrainClick}
            className={`
            rounded-xl flex items-center justify-center border transition-all duration-300 relative overflow-hidden shrink-0 cursor-pointer hover:scale-105 active:scale-95 group
            ${getModeColor()}
            ${isCompact ? 'w-10 h-10' : 'w-12 h-12'}
          `}>
             {/* Waveform Visualization when typing */}
             {isTyping && (
                 <div className="absolute inset-0 flex items-center justify-center gap-0.5 opacity-50">
                    <div className="w-0.5 bg-current h-3 animate-[pulse_0.4s_ease-in-out_infinite]"></div>
                    <div className="w-0.5 bg-current h-6 animate-[pulse_0.4s_ease-in-out_infinite_0.1s]"></div>
                    <div className="w-0.5 bg-current h-4 animate-[pulse_0.4s_ease-in-out_infinite_0.2s]"></div>
                    <div className="w-0.5 bg-current h-2 animate-[pulse_0.4s_ease-in-out_infinite_0.3s]"></div>
                 </div>
             )}

             {mode === ShynMode.OFFLINE_AUTO_PILOT ? (
                <WifiOffIcon className={`${isCompact ? 'w-5 h-5' : 'w-6 h-6'} relative z-10`} />
             ) : (
                <BrainIcon className={`${isCompact ? 'w-5 h-5' : 'w-6 h-6'} relative z-10 ${isTyping ? 'opacity-0' : 'opacity-100'} transition-opacity`} />
             )}

             {/* Lock Overlay for JARVIS (to hint secret) */}
             {!isShyn && (
                 <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                     <LockIcon className="w-2.5 h-2.5" />
                 </div>
             )}
          </button>
          
          <div className="flex-1 min-w-[120px]">
            <div className="flex items-center justify-between mb-1">
                 <h3 className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase flex items-center gap-2">
                    {identity} CORE
                    <span className={`w-1.5 h-1.5 rounded-full ${isTyping ? (isShyn ? 'bg-indigo-400' : 'bg-cyan-400') + ' animate-ping' : 'bg-green-500'}`}></span>
                </h3>
            </div>
            <div className={`text-sm font-bold text-white font-mono tracking-wide uppercase truncate`}>
                {isTyping ? 'ANALYZING INPUT...' : mode.replace(/_/g, ' ')}
            </div>
             {/* Mini visualizer line */}
             <div className="h-0.5 w-full bg-white/10 mt-1.5 overflow-hidden relative">
                 <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${isShyn ? 'via-indigo-500' : 'via-cyan-500'} to-transparent w-1/2 animate-[shimmer_2s_infinite_linear] ${isTyping ? 'opacity-100' : 'opacity-0'}`}></div>
             </div>
          </div>
        </div>

        {/* Right: Telemetry Grid */}
        {!isCompact && (
            <div className="grid grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden w-full md:w-auto">
            
            {/* CPU */}
            <div className="bg-[#0a0a0c] px-4 py-2 flex flex-col items-center justify-center min-w-[90px]">
                <div className="flex items-center gap-1.5 mb-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <CpuIcon className="w-3 h-3" /> CPU
                </div>
                {renderSegmentedBar(stats.cpuLoad, getBarColor(stats.cpuLoad, true))}
                <span className="text-[10px] font-mono font-bold text-gray-300 mt-1">{Math.round(stats.cpuLoad)}%</span>
            </div>

            {/* RAM */}
            <div className="bg-[#0a0a0c] px-4 py-2 flex flex-col items-center justify-center min-w-[90px]">
                <div className="flex items-center gap-1.5 mb-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <DatabaseIcon className="w-3 h-3" /> MEM
                </div>
                {renderSegmentedBar(stats.memoryUsage, getBarColor(stats.memoryUsage, false))}
                 <span className="text-[10px] font-mono font-bold text-gray-300 mt-1">{Math.round(stats.memoryUsage)}%</span>
            </div>

            {/* NET */}
            <div className="bg-[#0a0a0c] px-4 py-2 flex flex-col items-center justify-center min-w-[90px]">
                <div className="flex items-center gap-1.5 mb-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <ActivityIcon className="w-3 h-3" /> PING
                </div>
                <div className="flex items-center gap-1 h-1.5">
                     <span className={`w-1.5 h-1.5 rounded-full ${stats.networkLatency < 50 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                     <span className={`w-1.5 h-1.5 rounded-full ${stats.networkLatency < 50 ? 'bg-green-500' : 'bg-white/10'}`}></span>
                     <span className={`w-1.5 h-1.5 rounded-full bg-white/10`}></span>
                </div>
                <span className="text-[10px] font-mono font-bold text-gray-300 mt-1">{stats.networkLatency}ms</span>
            </div>

            {/* AGENTS */}
            <div className="bg-[#0a0a0c] px-4 py-2 flex flex-col items-center justify-center min-w-[90px]">
                <div className="flex items-center gap-1.5 mb-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <ServerIcon className="w-3 h-3" /> AGENTS
                </div>
                <div className="font-mono text-lg font-bold text-white leading-none">
                    0{stats.activeAgents}
                </div>
                <span className="text-[9px] text-green-500 font-bold mt-0.5">ACTIVE</span>
            </div>

            </div>
        )}
      </div>
    </div>
  );
};

export default BrainHUD;