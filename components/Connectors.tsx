import React, { useState, useMemo } from 'react';
import { 
    SearchIcon, FilterIcon, LinkIcon, CheckCircleIcon, CloudIcon, 
    GlobeIcon 
} from './Icons';
import { Connector } from '../types';

const Connectors: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Initial Data
    const [connectors, setConnectors] = useState<Connector[]>([
        // Dev & Cloud
        { id: 'github', name: 'GitHub', category: 'Dev & Cloud', description: 'Code hosting & version control.', iconSlug: 'github', color: '#181717', connected: true },
        { id: 'vercel', name: 'Vercel', category: 'Dev & Cloud', description: 'Develop. Preview. Ship.', iconSlug: 'vercel', color: '#000000', connected: true },
        { id: 'firebase', name: 'Firebase', category: 'Dev & Cloud', description: 'App development platform.', iconSlug: 'firebase', color: '#DD2C00', connected: false },
        { id: 'render', name: 'Render', category: 'Dev & Cloud', description: 'Cloud application hosting.', iconSlug: 'render', color: '#46E3B7', connected: false },
        { id: 'supabase', name: 'Supabase', category: 'Dev & Cloud', description: 'Open source Firebase alternative.', iconSlug: 'supabase', color: '#3ECF8E', connected: false },
        { id: 'digitalocean', name: 'DigitalOcean', category: 'Dev & Cloud', description: 'Cloud computing services.', iconSlug: 'digitalocean', color: '#0080FF', connected: false },
        { id: 'alibabacloud', name: 'Alibaba Cloud', category: 'Dev & Cloud', description: 'Cloud computing & data services.', iconSlug: 'alibabacloud', color: '#FF6A00', connected: false },

        // Google Ecosystem
        { id: 'gmail', name: 'Gmail', category: 'Google', description: 'Secure enterprise email.', iconSlug: 'gmail', color: '#EA4335', connected: true },
        { id: 'gdrive', name: 'Google Drive', category: 'Google', description: 'File storage and synchronization.', iconSlug: 'googledrive', color: '#4285F4', connected: true },
        { id: 'gdocs', name: 'Google Docs', category: 'Google', description: 'Online document editing.', iconSlug: 'googledocs', color: '#4285F4', connected: false },
        { id: 'gsheets', name: 'Google Sheets', category: 'Google', description: 'Spreadsheets for business.', iconSlug: 'googlesheets', color: '#34A853', connected: false },
        { id: 'gtasks', name: 'Google Tasks', category: 'Google', description: 'Task management service.', iconSlug: 'googletasks', color: '#4285F4', connected: false },
        { id: 'gslides', name: 'Google Slides', category: 'Google', description: 'Presentation program.', iconSlug: 'googleslides', color: '#FBBC04', connected: false },
        { id: 'gcal', name: 'Google Calendar', category: 'Google', description: 'Time management & scheduling.', iconSlug: 'googlecalendar', color: '#4285F4', connected: true },
        { id: 'gmeet', name: 'Google Meet', category: 'Google', description: 'Video conferencing.', iconSlug: 'googlemeet', color: '#00897B', connected: false },
        { id: 'gchat', name: 'Google Chat', category: 'Google', description: 'Team communication.', iconSlug: 'googlechat', color: '#00AC47', connected: false },
        { id: 'gphotos', name: 'Google Photos', category: 'Google', description: 'Photo sharing and storage.', iconSlug: 'googlephotos', color: '#D93025', connected: false },
        { id: 'gkeep', name: 'Google Keep', category: 'Google', description: 'Note-taking service.', iconSlug: 'googlekeep', color: '#FFBB00', connected: false },
        { id: 'gcontacts', name: 'Google Contacts', category: 'Google', description: 'Contact management.', iconSlug: 'googlecontacts', color: '#1A73E8', connected: true },
        { id: 'gchrome', name: 'Google Chrome', category: 'Google', description: 'Web browser integration.', iconSlug: 'googlechrome', color: '#4285F4', connected: true },
        { id: 'gsearch', name: 'Google Search', category: 'Google', description: 'Search engine integration.', iconSlug: 'google', color: '#4285F4', connected: true },
        { id: 'gwallet', name: 'Google Wallet', category: 'Google', description: 'Digital wallet platform.', iconSlug: 'googlewallet', color: '#4285F4', connected: false },
        { id: 'gtranslate', name: 'Google Translate', category: 'Google', description: 'Multilingual neural translation.', iconSlug: 'googletranslate', color: '#4285F4', connected: false },
        { id: 'gone', name: 'Google One', category: 'Google', description: 'Subscription service.', iconSlug: 'googleone', color: '#1F1F1F', connected: false },
        { id: 'youtube', name: 'YouTube', category: 'Google', description: 'Video sharing platform.', iconSlug: 'youtube', color: '#FF0000', connected: false },

        // AI & ML
        { id: 'gemini', name: 'Google Gemini', category: 'AI & ML', description: 'Multimodal AI model.', iconSlug: 'googlegemini', color: '#4E86F8', connected: true },
        { id: 'aistudio', name: 'Google AI Studio', category: 'AI & ML', description: 'Prototyping generative AI.', iconSlug: 'google', color: '#4285F4', connected: true },
        { id: 'vertex', name: 'Google Vertex AI', category: 'AI & ML', description: 'Machine learning platform.', iconSlug: 'googlecloud', color: '#4285F4', connected: false },
        { id: 'openai', name: 'OpenAI', category: 'AI & ML', description: 'GPT-4 and DALL-E models.', iconSlug: 'openai', color: '#412991', connected: true },
        { id: 'deepseek', name: 'DeepSeek', category: 'AI & ML', description: 'Advanced LLM integration.', iconSlug: 'deepseek', color: '#1A1A1A', connected: false },
        { id: 'claude', name: 'Claude (Anthropic)', category: 'AI & ML', description: 'Constitutional AI assistant.', iconSlug: 'anthropic', color: '#D09E83', connected: false },
        { id: 'huggingface', name: 'Hugging Face', category: 'AI & ML', description: 'AI community & models.', iconSlug: 'huggingface', color: '#FFD21E', connected: false },

        // Social
        { id: 'facebook', name: 'Facebook', category: 'Social', description: 'Social networking service.', iconSlug: 'facebook', color: '#1877F2', connected: false },
        { id: 'messenger', name: 'Messenger', category: 'Social', description: 'Instant messaging app.', iconSlug: 'messenger', color: '#00B2FF', connected: false },
        { id: 'instagram', name: 'Instagram', category: 'Social', description: 'Photo & video sharing.', iconSlug: 'instagram', color: '#E4405F', connected: false },
        { id: 'snapchat', name: 'Snapchat', category: 'Social', description: 'Multimedia messaging.', iconSlug: 'snapchat', color: '#FFFC00', connected: false },
        { id: 'tiktok', name: 'TikTok', category: 'Social', description: 'Short-form video.', iconSlug: 'tiktok', color: '#000000', connected: false },
        { id: 'whatsapp', name: 'WhatsApp', category: 'Social', description: 'Encrypted messaging.', iconSlug: 'whatsapp', color: '#25D366', connected: false },
        { id: 'telegram', name: 'Telegram', category: 'Social', description: 'Cloud-based instant messaging.', iconSlug: 'telegram', color: '#26A5E4', connected: true },
        { id: 'linkedin', name: 'LinkedIn', category: 'Social', description: 'Professional networking.', iconSlug: 'linkedin', color: '#0A66C2', connected: true },

        // Design
        { id: 'figma', name: 'Figma', category: 'Design', description: 'Collaborative interface design.', iconSlug: 'figma', color: '#F24E1E', connected: true },
        { id: 'envato', name: 'Envato', category: 'Design', description: 'Creative assets & templates.', iconSlug: 'envato', color: '#81B441', connected: false },
        { id: 'canva', name: 'Canva', category: 'Design', description: 'Graphic design platform.', iconSlug: 'canva', color: '#00C4CC', connected: false },
        { id: 'pinterest', name: 'Pinterest', category: 'Design', description: 'Visual discovery engine.', iconSlug: 'pinterest', color: '#BD081C', connected: false },
        { id: 'dribbble', name: 'Dribbble', category: 'Design', description: 'Design community.', iconSlug: 'dribbble', color: '#EA4C89', connected: false },
    ]);

    const categories = ['All', 'Dev & Cloud', 'Google', 'Social', 'AI & ML', 'Design'];

    const filteredConnectors = useMemo(() => {
        return connectors.filter(c => {
            const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
            const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery, connectors]);

    const toggleConnection = (id: string) => {
        setConnectors(prev => prev.map(c => 
            c.id === id ? { ...c, connected: !c.connected } : c
        ));
    };

    return (
        <div className="h-full flex flex-col p-6 md:p-8 overflow-hidden bg-black/50 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                            <LinkIcon className="w-8 h-8 text-indigo-400" />
                        </div>
                        Connectors
                    </h1>
                    <p className="text-gray-400">Manage OAuth Integrations and API Gateways for the SAR Ecosystem.</p>
                </div>
                
                <div className="flex gap-4">
                     <div className="glass-panel px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3">
                         <div className="flex -space-x-2">
                            {connectors.filter(c => c.connected).slice(0,4).map(c => (
                                <img 
                                    key={c.id}
                                    src={`https://cdn.simpleicons.org/${c.iconSlug}/ffffff`} 
                                    alt={c.name}
                                    className="w-6 h-6 rounded-full bg-gray-800 p-1 border border-black"
                                    onError={(e) => {
                                        // Silent failure for small icons in header
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            ))}
                         </div>
                         <div className="text-right">
                             <p className="text-sm font-bold text-white">{connectors.filter(c => c.connected).length}</p>
                             <p className="text-[10px] text-gray-500 uppercase">Active Links</p>
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
                        placeholder="Search apps..." 
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
                    {filteredConnectors.map((connector) => (
                        <div 
                            key={connector.id}
                            className={`
                                relative glass-panel p-5 rounded-2xl border transition-all duration-300 group
                                ${connector.connected 
                                    ? 'border-indigo-500/30 bg-indigo-500/5' 
                                    : 'border-white/5 hover:border-white/10 hover:bg-white/5'}
                            `}
                        >
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`
                                        w-10 h-10 rounded-xl flex items-center justify-center p-2
                                        ${connector.connected ? 'bg-white shadow-lg' : 'bg-gray-800'}
                                    `}>
                                        <img 
                                            src={`https://cdn.simpleicons.org/${connector.iconSlug}/${connector.connected ? connector.color.replace('#', '') : '9ca3af'}`} 
                                            alt={connector.name}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                // Fallback if simpleicons slug fails
                                                const img = e.target as HTMLImageElement;
                                                img.style.display = 'none';
                                                const parent = img.parentElement;
                                                if (parent) {
                                                    parent.classList.add('bg-gray-700');
                                                    parent.innerText = connector.name[0];
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">{connector.name}</h3>
                                        <p className="text-[10px] text-gray-500 uppercase">{connector.category}</p>
                                    </div>
                                </div>
                                {connector.connected && (
                                    <div className="text-green-500">
                                        <CheckCircleIcon className="w-4 h-4" />
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-xs text-gray-400 mb-6 line-clamp-2 min-h-[2.5em]">
                                {connector.description}
                            </p>

                            {/* Footer / Action */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className={`text-[10px] font-medium ${connector.connected ? 'text-green-400' : 'text-gray-600'}`}>
                                    {connector.connected ? 'AUTHORIZED' : 'NOT CONNECTED'}
                                </span>
                                
                                <button
                                    onClick={() => toggleConnection(connector.id)}
                                    className={`
                                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-black
                                        ${connector.connected ? 'bg-indigo-600' : 'bg-gray-700'}
                                    `}
                                >
                                    <span
                                        className={`
                                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                            ${connector.connected ? 'translate-x-6' : 'translate-x-1'}
                                        `}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {filteredConnectors.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <SearchIcon className="w-6 h-6 text-gray-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">No apps found</h3>
                            <p className="text-gray-400 text-sm">Try adjusting your search or category filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Connectors;