import React, { useState, useMemo } from 'react';
import { 
    WrenchIcon, SearchIcon, RobotIcon, TerminalIcon, PenIcon, 
    ShieldIcon, PlayIcon, MusicIcon, VideoIcon, HammerIcon, 
    MicrophoneIcon, DatabaseIcon, EyeIcon, CloudIcon, BoxIcon,
    LayersIcon, ActivityIcon, LinkIcon
} from './Icons';
import { Tool } from '../types';

const Tools: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Tools Database
    const [tools, setTools] = useState<Tool[]>([
        // Communication
        { id: 'chat', name: 'Chat', description: 'Real-time conversational interface.', icon: RobotIcon, category: 'Communication', status: 'active', color: 'text-indigo-400' },
        { id: 'assistant', name: 'Assistant', description: 'General purpose helper.', icon: RobotIcon, category: 'Communication', status: 'active', color: 'text-blue-400' },
        { id: 'agent', name: 'Agent', description: 'Autonomous task performer.', icon: RobotIcon, category: 'Communication', status: 'idle', color: 'text-purple-400' },
        { id: 'speaker', name: 'Speaker', description: 'Text-to-speech synthesis.', icon: MusicIcon, category: 'Communication', status: 'idle', color: 'text-pink-400' },
        { id: 'listener', name: 'Listener', description: 'Voice recognition & STT.', icon: MicrophoneIcon, category: 'Communication', status: 'idle', color: 'text-red-400' },

        // Development
        { id: 'coder', name: 'Coder', description: 'Code generation & debugging.', icon: TerminalIcon, category: 'Development', status: 'active', color: 'text-green-400' },
        { id: 'builder', name: 'Builder', description: 'Project scaffolding engine.', icon: HammerIcon, category: 'Development', status: 'idle', color: 'text-yellow-400' },
        { id: 'implementor', name: 'Implementor', description: 'Feature integration.', icon: LayersIcon, category: 'Development', status: 'idle', color: 'text-orange-400' },
        { id: 'modifier', name: 'Modifier', description: 'Code refactoring tool.', icon: PenIcon, category: 'Development', status: 'idle', color: 'text-teal-400' },
        { id: 'installer', name: 'Installer', description: 'Package & dependency manager.', icon: BoxIcon, category: 'Development', status: 'idle', color: 'text-cyan-400' },

        // Creative
        { id: 'designer', name: 'Designer', description: 'UI/UX & graphic generation.', icon: PenIcon, category: 'Creative', status: 'idle', color: 'text-fuchsia-400' },
        { id: 'creator', name: 'Creator', description: 'Content strategy engine.', icon: PenIcon, category: 'Creative', status: 'idle', color: 'text-rose-400' },
        { id: 'writer', name: 'Writer', description: 'Copywriting & editing.', icon: PenIcon, category: 'Creative', status: 'idle', color: 'text-lime-400' },
        { id: 'generator', name: 'Generator', description: 'Asset & data synthesis.', icon: DatabaseIcon, category: 'Creative', status: 'active', color: 'text-violet-400' },
        { id: 'modeler', name: 'Modeler', description: '3D & structure modeling.', icon: BoxIcon, category: 'Creative', status: 'idle', color: 'text-amber-400' },

        // Management
        { id: 'planner', name: 'Planner', description: 'Task scheduling & roadmap.', icon: ActivityIcon, category: 'Management', status: 'idle', color: 'text-emerald-400' },
        { id: 'manager', name: 'Manager', description: 'Resource allocation.', icon: ActivityIcon, category: 'Management', status: 'active', color: 'text-blue-500' },
        { id: 'executor', name: 'Executor', description: 'Command execution runtime.', icon: TerminalIcon, category: 'Management', status: 'idle', color: 'text-red-500' },
        { id: 'operator', name: 'Operator', description: 'System operations controller.', icon: ActivityIcon, category: 'Management', status: 'idle', color: 'text-gray-400' },
        
        // Analysis
        { id: 'reviewer', name: 'Reviewer', description: 'Code & content auditing.', icon: EyeIcon, category: 'Analysis', status: 'idle', color: 'text-yellow-500' },
        { id: 'researcher', name: 'Researcher', description: 'Deep web information retrieval.', icon: SearchIcon, category: 'Analysis', status: 'active', color: 'text-cyan-500' },
        { id: 'searcher', name: 'Searcher', description: 'Semantic search engine.', icon: SearchIcon, category: 'Analysis', status: 'idle', color: 'text-sky-400' },
        { id: 'navigator', name: 'Navigator', description: 'Data structure traversal.', icon: LinkIcon, category: 'Analysis', status: 'idle', color: 'text-indigo-300' },
        { id: 'tracker', name: 'Tracker', description: 'Metric & KPI logging.', icon: ActivityIcon, category: 'Analysis', status: 'active', color: 'text-green-300' },

        // Media
        { id: 'viewer', name: 'Viewer', description: 'Universal file preview.', icon: EyeIcon, category: 'Media', status: 'idle', color: 'text-pink-300' },
        { id: 'editor', name: 'Editor', description: 'Media manipulation suite.', icon: PenIcon, category: 'Media', status: 'idle', color: 'text-purple-300' },
        { id: 'previewer', name: 'Previewer', description: 'Quick-look generator.', icon: EyeIcon, category: 'Media', status: 'idle', color: 'text-blue-300' },
        { id: 'opener', name: 'Opener', description: 'File handler resolution.', icon: BoxIcon, category: 'Media', status: 'idle', color: 'text-orange-300' },
        { id: 'player', name: 'Player', description: 'Playback engine.', icon: PlayIcon, category: 'Media', status: 'idle', color: 'text-red-300' },
        { id: 'media', name: 'Media', description: 'Asset library manager.', icon: VideoIcon, category: 'Media', status: 'idle', color: 'text-teal-300' },

        // System
        { id: 'launcher', name: 'Launcher', description: 'Process initialization.', icon: PlayIcon, category: 'System', status: 'idle', color: 'text-green-500' },
        { id: 'reader', name: 'Reader', description: 'I/O stream processor.', icon: DatabaseIcon, category: 'System', status: 'active', color: 'text-yellow-300' },
        { id: 'installer', name: 'Installer', description: 'System updater.', icon: CloudIcon, category: 'System', status: 'idle', color: 'text-blue-200' },
        
        // Security
        { id: 'guarder', name: 'Guarder', description: 'Firewall & access control.', icon: ShieldIcon, category: 'Security', status: 'active', color: 'text-red-500' },
        { id: 'security', name: 'Security', description: 'Threat detection system.', icon: ShieldIcon, category: 'Security', status: 'active', color: 'text-red-600' },
        { id: 'protector', name: 'Protector', description: 'Data encryption layer.', icon: ShieldIcon, category: 'Security', status: 'active', color: 'text-orange-600' },
        { id: 'monitorer', name: 'Monitorer', description: 'Real-time surveillance.', icon: ActivityIcon, category: 'Security', status: 'active', color: 'text-green-600' },
        { id: 'watcher', name: 'Watcher', description: 'Log file observer.', icon: EyeIcon, category: 'Security', status: 'idle', color: 'text-emerald-500' },
    ]);

    const categories = ['All', 'Communication', 'Development', 'Creative', 'Management', 'Analysis', 'Media', 'System', 'Security'];

    const filteredTools = useMemo(() => {
        return tools.filter(t => {
            const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
            const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery, tools]);

    const toggleTool = (id: string) => {
        setTools(prev => prev.map(t => {
            if (t.id === id) {
                const newStatus = t.status === 'active' ? 'idle' : 'active';
                return { ...t, status: newStatus };
            }
            return t;
        }));
    };

    return (
        <div className="h-full flex flex-col p-6 md:p-8 overflow-hidden bg-black/50 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                            <WrenchIcon className="w-8 h-8 text-indigo-400" />
                        </div>
                        Neural Tool Registry
                    </h1>
                    <p className="text-gray-400">Manage and deploy specialized AI micro-models for the SAR ecosystem.</p>
                </div>
                
                <div className="flex gap-3">
                     <div className="glass-panel px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3">
                        <div className="text-right">
                             <p className="text-sm font-bold text-white">{tools.length}</p>
                             <p className="text-[10px] text-gray-500 uppercase">Total Tools</p>
                         </div>
                     </div>
                     <div className="glass-panel px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3">
                        <div className="text-right">
                             <p className="text-sm font-bold text-green-400">{tools.filter(t => t.status === 'active').length}</p>
                             <p className="text-[10px] text-gray-500 uppercase">Active Models</p>
                         </div>
                     </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 shrink-0">
                {/* Search */}
                <div className="relative w-full md:w-64">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search models..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                    />
                </div>

                {/* Categories */}
                <div className="flex-1 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
                    <div className="flex gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`
                                    px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border
                                    ${activeCategory === cat 
                                        ? 'bg-white text-black border-white shadow-lg' 
                                        : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white'}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pb-10">
                    {filteredTools.map((tool) => (
                        <div 
                            key={tool.id}
                            className={`
                                relative glass-panel p-4 rounded-xl border transition-all duration-300 group hover:scale-[1.02]
                                ${tool.status === 'active' 
                                    ? 'border-indigo-500/30 bg-indigo-500/5' 
                                    : 'border-white/5 hover:border-white/10 hover:bg-white/5'}
                            `}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className={`p-2 rounded-lg bg-white/5 ${tool.color}`}>
                                    <tool.icon className="w-5 h-5" />
                                </div>
                                <span className={`
                                    px-2 py-0.5 rounded text-[10px] font-bold uppercase border
                                    ${tool.status === 'active' 
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                        : 'bg-gray-700/30 text-gray-500 border-gray-600/20'}
                                `}>
                                    {tool.status}
                                </span>
                            </div>

                            <h3 className="text-sm font-bold text-white mb-1">{tool.name}</h3>
                            <p className="text-[11px] text-gray-400 line-clamp-2 h-[2.5em] mb-4">{tool.description}</p>

                            <button
                                onClick={() => toggleTool(tool.id)}
                                className={`
                                    w-full py-2 rounded-lg text-xs font-bold transition-all
                                    ${tool.status === 'active'
                                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                        : 'bg-white/10 text-white hover:bg-white/20'}
                                `}
                            >
                                {tool.status === 'active' ? 'Stop Process' : 'Launch Model'}
                            </button>
                        </div>
                    ))}
                    
                    {filteredTools.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <SearchIcon className="w-6 h-6 text-gray-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">No models found</h3>
                            <p className="text-gray-400 text-sm">Try adjusting your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tools;
