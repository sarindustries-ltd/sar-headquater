import React, { useState, useEffect, useRef } from 'react';
import { 
    PackageIcon, DownloadCloudIcon, TerminalSquareIcon, PuzzleIcon, 
    LayersIcon, PaletteIcon, BoxIcon, CheckCircleIcon, ZapIcon,
    SearchIcon, DatabaseIcon, ShieldIcon, AlertTriangleIcon, ServerIcon,
    GlobeIcon, CpuIcon, ActivityIcon, XIcon, PlayIcon
} from './Icons';
import { UtilityItem } from '../types';

const Utility: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Nodes');
    const [searchQuery, setSearchQuery] = useState('');
    
    // --- Advanced Installation Wizard State ---
    const [wizard, setWizard] = useState<{
        isOpen: boolean;
        item: UtilityItem | null;
        step: 'config' | 'deploying' | 'complete';
        logs: string[];
    }>({
        isOpen: false,
        item: null,
        step: 'config',
        logs: []
    });

    const [configValues, setConfigValues] = useState({
        region: 'us-east-1',
        resources: 'standard', // standard, high, gpu
        env: 'production'
    });

    // Simple Confirm Dialog (for non-Node items)
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean;
        itemId: string | null;
        itemName: string | null;
        actionType: 'install' | 'update' | null;
    }>({
        isOpen: false,
        itemId: null,
        itemName: null,
        actionType: null
    });

    const [items, setItems] = useState<UtilityItem[]>([
        // Pre-build Nodes (Advanced Microservices)
        { id: 'auth_service', name: 'Auth Service', version: 'v2.0', description: 'Complete JWT/OAuth2 authentication microservice.', category: 'Nodes', icon: ShieldIcon, color: 'text-yellow-500', status: 'available' },
        { id: 'payment_gw', name: 'Payment Gateway', version: 'v1.1', description: 'Stripe/PayPal wrapper service with webhooks.', category: 'Nodes', icon: ZapIcon, color: 'text-green-400', status: 'available' },
        { id: 'blockchain_node', name: 'Blockchain Validator', version: 'v0.9.8', description: 'Lightweight node for transaction validation (ETH/SOL).', category: 'Nodes', icon: BoxIcon, color: 'text-purple-400', status: 'available' },
        { id: 'edge_compute', name: 'Edge Compute Worker', version: 'v1.4', description: 'Serverless function runner for low-latency tasks.', category: 'Nodes', icon: ServerIcon, color: 'text-blue-400', status: 'available' },
        { id: 'vector_db', name: 'Vector DB Cluster', version: 'v2.2', description: 'High-performance embedding storage for AI RAG pipelines.', category: 'Nodes', icon: DatabaseIcon, color: 'text-orange-400', status: 'available' },
        { id: 'ai_serving', name: 'AI Model Serving', version: 'v3.0', description: 'GPU-optimized inference endpoint for GenAI models.', category: 'Nodes', icon: CpuIcon, color: 'text-pink-500', status: 'available' },
        { id: 'otp_provider', name: 'OTP Provider', version: 'v2.1', description: 'High-speed One-Time Password generation service.', category: 'Nodes', icon: ZapIcon, color: 'text-orange-400', status: 'installed' },
        { id: 'email_worker', name: 'Email Worker', version: 'v1.0', description: 'Queue-based email sending service (bullMQ).', category: 'Nodes', icon: ZapIcon, color: 'text-blue-400', status: 'installed' },

        // Backend Tools
        { id: 'nodejs', name: 'Node.js Runtime', version: 'v20.11.0', description: 'JavaScript runtime built on Chrome\'s V8 engine.', category: 'Backend', icon: TerminalSquareIcon, color: 'text-green-500', status: 'installed' },
        { id: 'python', name: 'Python', version: 'v3.12', description: 'Powerful high-level programming language.', category: 'Backend', icon: TerminalSquareIcon, color: 'text-yellow-300', status: 'available' },
        { id: 'docker', name: 'Docker Engine', version: 'v24.0.7', description: 'Containerization platform for developing applications.', category: 'Backend', icon: BoxIcon, color: 'text-blue-500', status: 'installed' },
        { id: 'postgres', name: 'PostgreSQL', version: 'v16.1', description: 'Advanced open source relational database.', category: 'Backend', icon: LayersIcon, color: 'text-indigo-400', status: 'available' },
        { id: 'redis', name: 'Redis', version: 'v7.2', description: 'In-memory data structure store, used as a database/cache.', category: 'Backend', icon: LayersIcon, color: 'text-red-500', status: 'available' },
        { id: 'nginx', name: 'Nginx', version: 'v1.25', description: 'Web server and reverse proxy.', category: 'Backend', icon: TerminalSquareIcon, color: 'text-green-400', status: 'update_available' },

        // UI Libraries
        { id: 'nextjs', name: 'Next.js', version: 'v14', description: 'The React Framework for the Web.', category: 'Frontend', icon: LayersIcon, color: 'text-white', status: 'available' },
        { id: 'tailwind', name: 'Tailwind CSS', version: 'v3.4.1', description: 'Utility-first CSS framework for rapid UI development.', category: 'Frontend', icon: PaletteIcon, color: 'text-cyan-400', status: 'installed' },
        
        // Resources
        { id: 'googlefonts', name: 'Google Fonts', description: 'Library of 1,600+ open source font families.', category: 'Resources', icon: PaletteIcon, color: 'text-yellow-400', status: 'installed' },
        { id: 'lucide', name: 'Lucide Icons', version: 'v0.344', description: 'Beautiful & consistent icon toolkit.', category: 'Resources', icon: PuzzleIcon, color: 'text-orange-400', status: 'installed' },
    ]);

    const categories = ['Nodes', 'Backend', 'Frontend', 'Resources'];

    const filteredItems = items.filter(item => 
        (activeTab === 'All' || item.category === activeTab) &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const initiateAction = (item: UtilityItem) => {
        if (item.category === 'Nodes' && item.status !== 'installed') {
            setWizard({
                isOpen: true,
                item: item,
                step: 'config',
                logs: []
            });
        } else {
            const actionType = item.status === 'update_available' ? 'update' : 'install';
            setConfirmDialog({
                isOpen: true,
                itemId: item.id,
                itemName: item.name,
                actionType: actionType
            });
        }
    };

    const handleSimpleConfirm = () => {
        if (confirmDialog.itemId) {
            setItems(prev => prev.map(item => {
                if (item.id === confirmDialog.itemId) {
                    return { ...item, status: 'installed' };
                }
                return item;
            }));
        }
        setConfirmDialog({ isOpen: false, itemId: null, itemName: null, actionType: null });
    };

    // --- Wizard Logic ---

    const startDeployment = () => {
        setWizard(prev => ({ ...prev, step: 'deploying', logs: ['> Initializing deployment sequence...'] }));
        
        const sequence = [
            `> Validating configuration: ${configValues.env.toUpperCase()}`,
            `> Region set to: ${configValues.region}`,
            `> Allocating resources: ${configValues.resources.toUpperCase()}_TIER`,
            '> Pulling container image...',
            '> Verifying checksums... OK',
            '> Injecting environment variables...',
            '> Configuring network policy...',
            '> Starting service worker...',
            '> Health check: PING...',
            '> Health check: PONG (24ms)',
            '> SERVICE DEPLOYED SUCCESSFULLY.'
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                setWizard(prev => ({ ...prev, logs: [...prev.logs, sequence[i]] }));
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setWizard(prev => ({ ...prev, step: 'complete' }));
                    if (wizard.item) {
                        setItems(prev => prev.map(item => 
                            item.id === wizard.item?.id ? { ...item, status: 'installed' } : item
                        ));
                    }
                }, 800);
            }
        }, 600);
    };

    const closeWizard = () => {
        setWizard({ isOpen: false, item: null, step: 'config', logs: [] });
    };

    const ConfigModal = () => {
        const item = wizard.item;
        if (!item) return null;

        const logProgress = Math.min((wizard.logs.length / 11) * 100, 100);

        return (
            <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-zoom-in flex flex-col max-h-[85vh]">
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-white/10 ${item.color}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                <p className="text-xs text-gray-400">Setup & Configuration</p>
                            </div>
                        </div>
                        {wizard.step === 'config' && (
                            <button onClick={closeWizard} className="text-gray-500 hover:text-white"><XIcon className="w-5 h-5" /></button>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                        {wizard.step === 'config' && (
                            <div className="space-y-6">
                                <p className="text-sm text-gray-300">
                                    Configure the initial parameters for your <strong>{item.name}</strong> deployment.
                                </p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Region</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['us-east-1', 'eu-west-1', 'ap-south-1', 'sa-east-1'].map(r => (
                                                <button 
                                                    key={r}
                                                    onClick={() => setConfigValues({...configValues, region: r})}
                                                    className={`px-3 py-2 rounded-lg text-xs font-mono border transition-all ${configValues.region === r ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                                >
                                                    {r}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Compute Resources</label>
                                        <div className="flex bg-white/5 p-1 rounded-xl">
                                            {['standard', 'high', 'gpu'].map(res => (
                                                <button
                                                    key={res}
                                                    onClick={() => setConfigValues({...configValues, resources: res})}
                                                    className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${configValues.resources === res ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                                >
                                                    {res}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Environment</label>
                                        <select 
                                            value={configValues.env}
                                            onChange={(e) => setConfigValues({...configValues, env: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
                                        >
                                            <option value="production">Production</option>
                                            <option value="staging">Staging</option>
                                            <option value="development">Development</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {wizard.step === 'deploying' && (
                            <div className="flex-1 flex flex-col justify-center">
                                {/* Visual Animation */}
                                <div className="flex flex-col items-center justify-center py-6 mb-4">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full animate-pulse"></div>
                                        {/* Spinning Outer Ring */}
                                        <div className="absolute inset-[-8px] border border-dashed border-indigo-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                        
                                        {/* Core Icon */}
                                        <div className="relative w-20 h-20 bg-[#0a0a0c] border border-indigo-500/50 rounded-2xl flex items-center justify-center z-10 shadow-lg">
                                             <item.icon className="w-10 h-10 text-indigo-400 animate-[pulse_2s_ease-in-out_infinite]" />
                                        </div>
                                        
                                        {/* Orbiting Satellite */}
                                        <div className="absolute inset-[-12px] animate-spin-slow">
                                             <div className="absolute -top-1.5 left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white]"></div>
                                        </div>
                                    </div>
                                    
                                    <h4 className="text-white font-bold animate-pulse text-lg mb-1">Provisioning Node...</h4>
                                    <p className="text-xs text-indigo-300 font-mono">{Math.round(logProgress)}% Complete</p>
                                    
                                    <div className="w-64 h-1.5 bg-gray-800 rounded-full mt-4 overflow-hidden relative shadow-inner">
                                         <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-500 transition-all duration-300 ease-out" style={{width: `${logProgress}%`}}></div>
                                    </div>
                                </div>

                                {/* Terminal Output */}
                                <div className="bg-black/60 rounded-xl border border-white/10 p-4 font-mono text-xs h-40 overflow-y-auto custom-scrollbar flex flex-col-reverse shadow-inner">
                                    {wizard.logs.length === 0 && <span className="text-gray-500 animate-pulse">Initializing...</span>}
                                    {[...wizard.logs].reverse().map((log, i) => (
                                        <div key={i} className="mb-1 animate-fade-in-up">
                                            <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                            <span className={log.includes('SUCCESS') ? 'text-green-400 font-bold' : 'text-green-500/80'}>{log}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {wizard.step === 'complete' && (
                            <div className="flex flex-col items-center justify-center py-10 animate-zoom-in flex-1">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full"></div>
                                    <div className="relative w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-900/20 rounded-full flex items-center justify-center border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                        <CheckCircleIcon className="w-12 h-12 text-green-400" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Deployment Successful</h3>
                                <p className="text-sm text-gray-400 mb-8 text-center max-w-xs">
                                    The <strong>{item.name}</strong> node is now active and handling requests in {configValues.region}.
                                </p>
                                
                                <div className="grid grid-cols-2 gap-4 w-full mb-6">
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold">Uptime</p>
                                        <p className="text-green-400 font-mono font-bold">100%</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold">Latency</p>
                                        <p className="text-indigo-400 font-mono font-bold">24ms</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/5 bg-white/5 flex justify-end gap-3">
                        {wizard.step === 'config' && (
                            <>
                                <button onClick={closeWizard} className="px-4 py-2 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors">Cancel</button>
                                <button 
                                    onClick={startDeployment}
                                    className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-transform active:scale-95"
                                >
                                    <PlayIcon className="w-4 h-4" />
                                    Deploy Node
                                </button>
                            </>
                        )}
                        {wizard.step === 'deploying' && (
                            <button disabled className="px-6 py-2 rounded-xl bg-white/5 text-gray-500 text-sm font-bold cursor-not-allowed flex items-center gap-2 w-full justify-center">
                                <ActivityIcon className="w-4 h-4 animate-spin" />
                                Installing Dependencies...
                            </button>
                        )}
                        {wizard.step === 'complete' && (
                            <button onClick={closeWizard} className="w-full px-6 py-3 rounded-xl bg-white text-black text-sm font-bold shadow-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors">
                                Return to Utility Hub
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col p-6 md:p-10 overflow-hidden bg-black/50 relative animate-fade-in-up">
            {/* Wizard Modal */}
            {wizard.isOpen && <ConfigModal />}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                            <BoxIcon className="w-8 h-8 text-indigo-400" />
                        </div>
                        System Utilities & Resources
                    </h1>
                    <p className="text-gray-400">Manage development dependencies, pre-built nodes, and system assets.</p>
                </div>

                <div className="flex gap-4">
                     <div className="glass-panel px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3">
                         <div className="p-2 bg-green-500/10 rounded-lg">
                             <PackageIcon className="w-5 h-5 text-green-400" />
                         </div>
                         <div className="text-right">
                             <p className="text-sm font-bold text-white">{items.filter(i => i.status === 'installed').length}</p>
                             <p className="text-[10px] text-gray-500 uppercase">Installed</p>
                         </div>
                     </div>
                     <div className="glass-panel px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3">
                         <div className="p-2 bg-yellow-500/10 rounded-lg">
                             <DownloadCloudIcon className="w-5 h-5 text-yellow-400" />
                         </div>
                         <div className="text-right">
                             <p className="text-sm font-bold text-white">{items.filter(i => i.status === 'update_available').length}</p>
                             <p className="text-[10px] text-gray-500 uppercase">Updates</p>
                         </div>
                     </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 shrink-0">
                <div className="relative w-full md:w-64">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search resources..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50"
                    />
                </div>

                <div className="flex-1 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
                    <div className="flex gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`
                                    px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border
                                    ${activeTab === cat 
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
                    {filteredItems.map(item => (
                        <div 
                            key={item.id}
                            className={`
                                group relative glass-panel p-5 rounded-2xl border transition-all duration-300 hover:bg-white/5
                                ${item.status === 'update_available' ? 'border-yellow-500/30' : 'border-white/5'}
                            `}
                        >
                            {item.status === 'update_available' && (
                                <div className="absolute top-3 right-3 w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                            )}

                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-white/5 ${item.color} shadow-inner`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                {item.status === 'installed' && (
                                    <div className="text-green-500 bg-green-500/10 p-1 rounded-full">
                                        <CheckCircleIcon className="w-4 h-4" />
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-white text-base">{item.name}</h3>
                                    {item.version && <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">{item.version}</span>}
                                </div>
                                <p className="text-xs text-gray-400 line-clamp-2 h-[2.5em]">{item.description}</p>
                            </div>

                            <button
                                onClick={() => initiateAction(item)}
                                disabled={item.status === 'installed'}
                                className={`
                                    w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2
                                    ${item.status === 'installed' 
                                        ? 'bg-white/5 text-gray-500 cursor-default' 
                                        : item.status === 'update_available'
                                            ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/20'
                                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'}
                                `}
                            >
                                {item.status === 'installed' ? (
                                    'Installed'
                                ) : item.status === 'update_available' ? (
                                    <>
                                        <DownloadCloudIcon className="w-3 h-3" />
                                        Update Now
                                    </>
                                ) : (
                                    <>
                                        {item.category === 'Nodes' ? <ActivityIcon className="w-3 h-3" /> : <PackageIcon className="w-3 h-3" />}
                                        {item.category === 'Nodes' ? 'Configure & Deploy' : 'Install'}
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Simple Confirmation Dialog (For non-Nodes) */}
            {confirmDialog.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-zoom-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                <AlertTriangleIcon className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Confirm Action</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Are you sure you want to <span className="text-white font-bold">{confirmDialog.actionType}</span> the resource <span className="text-indigo-400 font-bold">{confirmDialog.itemName}</span>?
                        </p>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSimpleConfirm}
                                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors shadow-lg shadow-indigo-500/20 text-sm"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Utility;