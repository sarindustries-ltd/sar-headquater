import React, { useState } from 'react';
import { 
    CoinsIcon, KeyIcon, ReceiptIcon, SafeIcon, BarChartHorizontalIcon, 
    StoreIcon, PlusIcon, CheckCircleIcon, AlertTriangleIcon, SearchIcon,
    TerminalIcon, CreditCardIcon, CalculatorIcon, CloudIcon, PenIcon,
    TrashIcon, RefreshCwIcon, XIcon, CopyIcon
} from './Icons';
import { RevenueModel, ApiToken, POSTerminal, ThirdPartyApi } from '../types';

const RevenueSuite: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'models' | 'vault' | 'pos' | 'integrations'>('overview');

    // API Token State
    const [tokens, setTokens] = useState<ApiToken[]>([
        { id: 'tk_1', name: 'Production Server', prefix: 'sk_live_...', usage: 78, limit: '1M req/mo', created: 'Oct 12', status: 'Active' },
        { id: 'tk_2', name: 'Dev Environment', prefix: 'sk_test_...', usage: 12, limit: '100k req/mo', created: 'Nov 01', status: 'Active' },
        { id: 'tk_3', name: 'Legacy App', prefix: 'sk_live_...', usage: 0, limit: '500k req/mo', created: 'Sep 20', status: 'Revoked' },
    ]);
    const [isCreateTokenOpen, setIsCreateTokenOpen] = useState(false);
    const [newTokenName, setNewTokenName] = useState('');
    const [newTokenLimit, setNewTokenLimit] = useState('Unlimited');
    const [generatedToken, setGeneratedToken] = useState<string | null>(null);
    const [copiedToken, setCopiedToken] = useState(false);

    // POS State
    const [terminals, setTerminals] = useState<POSTerminal[]>([
        { id: 'POS-001', location: 'Dhaka HQ', status: 'Online', dailySales: 'BDT 124,500' },
        { id: 'POS-002', location: 'Chittagong Branch', status: 'Online', dailySales: 'BDT 88,200' },
        { id: 'POS-003', location: 'Sylhet Hub', status: 'Offline', dailySales: 'BDT 0' },
    ]);
    const [isAddTerminalOpen, setIsAddTerminalOpen] = useState(false);
    const [newTerminalLocation, setNewTerminalLocation] = useState('');
    const [editingTerminalId, setEditingTerminalId] = useState<string | null>(null);
    const [editLocation, setEditLocation] = useState('');

    // Mock Data
    const revenueModels: RevenueModel[] = [
        { id: '1', name: 'Pro Enterprise', type: 'Subscription', price: '$499/mo', status: 'Active', subscribers: 124 },
        { id: '2', name: 'API Pay-As-You-Go', type: 'Usage-based', price: '$0.002/req', status: 'Active', subscribers: 850 },
        { id: '3', name: 'Lifetime License', type: 'Fixed', price: '$2,500', status: 'Active', subscribers: 45 },
    ];

    const thirdPartyApis: ThirdPartyApi[] = [
        { id: '3rd_1', provider: 'OpenAI', model: 'GPT-4 Turbo', buyCost: 0.01, sellPrice: 0.03, unit: '1k tokens', monthlyUsage: 150000, status: 'Active', type: 'LLM' },
        { id: '3rd_2', provider: 'OpenAI', model: 'GPT-3.5 Turbo', buyCost: 0.001, sellPrice: 0.002, unit: '1k tokens', monthlyUsage: 850000, status: 'Active', type: 'LLM' },
        { id: '3rd_3', provider: 'Twilio', model: 'SMS Gateway', buyCost: 0.0075, sellPrice: 0.02, unit: 'msg', monthlyUsage: 25000, status: 'Active', type: 'SMS' },
        { id: '3rd_4', provider: 'AWS', model: 'S3 Standard', buyCost: 0.023, sellPrice: 0.05, unit: 'GB/mo', monthlyUsage: 4500, status: 'Active', type: 'Storage' },
        { id: '3rd_5', provider: 'Anthropic', model: 'Claude 3 Opus', buyCost: 0.015, sellPrice: 0.045, unit: '1k tokens', monthlyUsage: 0, status: 'Inactive', type: 'LLM' },
    ];

    const handleCreateToken = () => {
        if (!newTokenName) return;
        const prefix = 'sk_live_';
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const fullToken = `${prefix}${randomString}`;
        
        const newToken: ApiToken = {
            id: `tk_${Date.now()}`,
            name: newTokenName,
            prefix: `${prefix}...`,
            usage: 0,
            limit: newTokenLimit,
            created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
            status: 'Active'
        };

        setTokens([newToken, ...tokens]);
        setGeneratedToken(fullToken);
    };

    const handleCopyToken = () => {
        if (generatedToken) {
            navigator.clipboard.writeText(generatedToken);
            setCopiedToken(true);
            setTimeout(() => setCopiedToken(false), 2000);
        }
    };

    const closeCreateToken = () => {
        setIsCreateTokenOpen(false);
        setGeneratedToken(null);
        setNewTokenName('');
        setCopiedToken(false);
    }

    const revokeToken = (id: string) => {
        setTokens(prev => prev.map(t => t.id === id ? { ...t, status: 'Revoked', usage: 0 } : t));
    };
    
    const deleteToken = (id: string) => {
        setTokens(prev => prev.filter(t => t.id !== id));
    };

    const handleAddTerminal = () => {
        if (!newTerminalLocation.trim()) return;
        const newId = `POS-${String(terminals.length + 1).padStart(3, '0')}`;
        setTerminals([...terminals, {
            id: newId,
            location: newTerminalLocation,
            status: 'Offline',
            dailySales: 'BDT 0'
        }]);
        setNewTerminalLocation('');
        setIsAddTerminalOpen(false);
    };

    const handleDeleteTerminal = (id: string) => {
        setTerminals(prev => prev.filter(t => t.id !== id));
    };

    const handleRebootTerminal = (id: string) => {
        setTerminals(prev => prev.map(t => t.id === id ? { ...t, status: 'Rebooting' } : t));
        setTimeout(() => {
            setTerminals(prev => prev.map(t => t.id === id ? { ...t, status: 'Online' } : t));
        }, 3000);
    };

    const handleEditTerminal = (terminal: POSTerminal) => {
        setEditingTerminalId(terminal.id);
        setEditLocation(terminal.location);
    };

    const handleSaveEdit = () => {
        if (!editingTerminalId) return;
        setTerminals(prev => prev.map(t => t.id === editingTerminalId ? { ...t, location: editLocation } : t));
        setEditingTerminalId(null);
        setEditLocation('');
    };

    const renderOverview = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                        <CoinsIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">+12.4%</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Total Monthly Revenue</p>
                <h3 className="text-3xl font-bold text-white">$42,592.00</h3>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                        <SafeIcon className="w-6 h-6" />
                    </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">Token Vault Status</p>
                <h3 className="text-3xl font-bold text-white">8.4M / 10M</h3>
                <div className="w-full h-1.5 bg-gray-700 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-cyan-400 w-[84%]"></div>
                </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                        <ReceiptIcon className="w-6 h-6" />
                    </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">Active Subscriptions</p>
                <h3 className="text-3xl font-bold text-white">1,024</h3>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400">
                        <StoreIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold bg-red-500/20 text-red-400 px-2 py-1 rounded">1 Alert</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">POS Terminals</p>
                <h3 className="text-3xl font-bold text-white">
                    {terminals.filter(t => t.status === 'Online').length} / {terminals.length} Online
                </h3>
            </div>

             {/* Recent Activity Table */}
             <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-6 glass-panel rounded-2xl border border-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Recent Transactions</h3>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-gray-500 border-b border-white/5 uppercase tracking-wider">
                            <th className="py-3 font-medium">ID</th>
                            <th className="py-3 font-medium">Customer</th>
                            <th className="py-3 font-medium">Service</th>
                            <th className="py-3 font-medium">Amount</th>
                            <th className="py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {[1, 2, 3, 4].map((i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="py-3 text-gray-400 font-mono">#TRX-88{i}</td>
                                <td className="py-3 text-white font-medium">Global Corp Ltd.</td>
                                <td className="py-3 text-gray-300">API Usage (Tier 2)</td>
                                <td className="py-3 text-white">$249.00</td>
                                <td className="py-3">
                                    <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">Paid</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderModels = () => (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Revenue Models</h3>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all">
                    <PlusIcon className="w-4 h-4" />
                    Create Model
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {revenueModels.map(model => (
                    <div key={model.id} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${
                                model.type === 'Subscription' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                model.type === 'Usage-based' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                'bg-green-500/10 text-green-400 border-green-500/20'
                            }`}>
                                {model.type}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-1">{model.name}</h4>
                        <p className="text-3xl font-black text-gray-200 mb-6">{model.price}</p>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                            {model.subscribers} Active Subscribers
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10">Edit</button>
                            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10">Analytics</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderVault = () => (
        <div className="animate-fade-in-up space-y-8 relative">
             {/* Create Token Modal */}
             {isCreateTokenOpen && (
                <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-zoom-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <KeyIcon className="w-5 h-5 text-cyan-400" />
                                {generatedToken ? 'Token Generated' : 'Create API Token'}
                            </h3>
                            <button onClick={closeCreateToken} className="text-gray-500 hover:text-white"><XIcon className="w-5 h-5" /></button>
                        </div>

                        {!generatedToken ? (
                            <>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Token Name</label>
                                        <input 
                                            type="text" 
                                            value={newTokenName}
                                            onChange={(e) => setNewTokenName(e.target.value)}
                                            placeholder="e.g. Mobile App Production" 
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                            autoFocus
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Usage Limit</label>
                                        <select 
                                            value={newTokenLimit}
                                            onChange={(e) => setNewTokenLimit(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                        >
                                            <option>Unlimited</option>
                                            <option>1M req/mo</option>
                                            <option>500k req/mo</option>
                                            <option>100k req/mo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={closeCreateToken} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors">Cancel</button>
                                    <button onClick={handleCreateToken} disabled={!newTokenName} className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed">Generate Key</button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl break-all font-mono text-sm text-cyan-300 relative group">
                                    {generatedToken}
                                    <button 
                                        onClick={handleCopyToken}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-800 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
                                    >
                                        {copiedToken ? <CheckCircleIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-left mb-6">
                                    <AlertTriangleIcon className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-yellow-200">
                                        Please copy this key immediately. For security reasons, we cannot display it again once you leave this screen.
                                    </p>
                                </div>
                                <button onClick={closeCreateToken} className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors">Done</button>
                            </div>
                        )}
                    </div>
                </div>
             )}

            {/* Vault Viz */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-gradient-to-r from-cyan-900/10 to-blue-900/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/20">
                            <SafeIcon className="w-12 h-12 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Master API Vault</h3>
                            <p className="text-gray-400 max-w-md">Secure storage for tokenized assets and API usage quotas. Monitor global distribution limits.</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-1">Total Stock in Vault</p>
                        <p className="text-4xl font-black text-white">10,000,000</p>
                        <p className="text-xs text-gray-500 mt-2">Tokens</p>
                    </div>
                </div>
            </div>

            {/* Token List */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <KeyIcon className="w-5 h-5 text-gray-400" />
                        Active API Keys
                    </h3>
                    <button 
                        onClick={() => setIsCreateTokenOpen(true)}
                        className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-colors shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Generate Key
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-gray-500 bg-black/20 uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-medium">Name</th>
                                <th className="p-4 font-medium">Token Prefix</th>
                                <th className="p-4 font-medium">Usage</th>
                                <th className="p-4 font-medium">Limit</th>
                                <th className="p-4 font-medium">Created</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {tokens.map(token => (
                                <tr key={token.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                                    <td className="p-4">
                                        <span className="font-bold text-white">{token.name}</span>
                                    </td>
                                    <td className="p-4 font-mono text-gray-400 flex items-center gap-2">
                                        {token.prefix}••••••••
                                        <button 
                                            onClick={() => { navigator.clipboard.writeText(token.prefix) }}
                                            className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white transition-opacity"
                                            title="Copy Prefix"
                                        >
                                            <CopyIcon className="w-3 h-3" />
                                        </button>
                                    </td>
                                    <td className="p-4 min-w-[140px]">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-400">{token.usage}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full ${token.usage > 90 ? 'bg-red-500' : 'bg-cyan-500'}`} 
                                                    style={{width: `${token.usage}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-300 font-mono text-xs">{token.limit}</td>
                                    <td className="p-4 text-gray-400 text-xs">{token.created}</td>
                                    <td className="p-4">
                                        <span className={`text-xs px-2 py-1 rounded border ${token.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                            {token.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        {token.status === 'Active' ? (
                                            <button 
                                                onClick={() => revokeToken(token.id)}
                                                className="text-red-400 hover:text-red-300 text-xs font-bold hover:underline"
                                            >
                                                Revoke
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => deleteToken(token.id)}
                                                className="text-gray-500 hover:text-white p-1 rounded hover:bg-white/10"
                                                title="Delete Token"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderPOS = () => (
        <div className="animate-fade-in-up relative">
             {/* Add Terminal Overlay */}
             {isAddTerminalOpen && (
                <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-2xl p-4 animate-fade-in">
                    <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-zoom-in">
                        <h3 className="text-xl font-bold text-white mb-4">Add New Terminal</h3>
                        <div className="mb-4">
                            <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Location Name</label>
                            <input 
                                type="text" 
                                value={newTerminalLocation}
                                onChange={(e) => setNewTerminalLocation(e.target.value)}
                                placeholder="e.g. Dhanmondi Outlet 2" 
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setIsAddTerminalOpen(false)}
                                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAddTerminal}
                                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors shadow-lg shadow-indigo-500/20"
                            >
                                Register Terminal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {terminals.map(term => (
                    <div key={term.id} className="glass-panel p-6 rounded-2xl border border-white/5 relative group hover:bg-white/5 transition-all">
                        {/* Status Dot */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase ${
                                term.status === 'Online' ? 'text-green-500' : 
                                term.status === 'Rebooting' ? 'text-yellow-500 animate-pulse' : 
                                'text-red-500'
                            }`}>
                                {term.status}
                            </span>
                            <span className={`w-3 h-3 block rounded-full ${
                                term.status === 'Online' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 
                                term.status === 'Rebooting' ? 'bg-yellow-500 animate-ping' : 
                                'bg-red-500'
                            }`}></span>
                        </div>

                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-4 border border-white/10">
                            <CreditCardIcon className="w-6 h-6 text-gray-400" />
                        </div>

                        {/* Editable Location */}
                        {editingTerminalId === term.id ? (
                            <div className="mb-1 flex items-center gap-2">
                                <input 
                                    type="text" 
                                    value={editLocation}
                                    onChange={(e) => setEditLocation(e.target.value)}
                                    className="bg-black/40 border border-white/20 rounded px-2 py-1 text-sm text-white w-full"
                                    autoFocus
                                />
                                <button onClick={handleSaveEdit} className="p-1 text-green-400 hover:bg-white/10 rounded"><CheckCircleIcon className="w-4 h-4" /></button>
                                <button onClick={() => setEditingTerminalId(null)} className="p-1 text-red-400 hover:bg-white/10 rounded"><XIcon className="w-4 h-4" /></button>
                            </div>
                        ) : (
                            <div className="group/title flex items-center gap-2 mb-1">
                                <h4 className="text-lg font-bold text-white truncate">{term.location}</h4>
                                <button 
                                    onClick={() => handleEditTerminal(term)}
                                    className="opacity-0 group-hover/title:opacity-100 p-1 text-gray-500 hover:text-white transition-opacity"
                                >
                                    <PenIcon className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                        
                        <p className="text-xs text-gray-500 font-mono mb-6">ID: {term.id}</p>
                        
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center mb-4">
                            <span className="text-xs text-gray-400">Daily Sales</span>
                            <span className="text-sm font-bold text-white">{term.dailySales}</span>
                        </div>

                        <div className="flex gap-2 mb-3">
                            <button 
                                onClick={() => handleRebootTerminal(term.id)}
                                disabled={term.status === 'Rebooting'}
                                className="flex-1 py-2 rounded-lg bg-indigo-600/20 text-indigo-300 text-xs font-bold hover:bg-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <RefreshCwIcon className={`w-3 h-3 ${term.status === 'Rebooting' ? 'animate-spin' : ''}`} />
                                {term.status === 'Rebooting' ? 'Rebooting...' : 'Reboot'}
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-white/5 text-gray-400 text-xs font-bold hover:text-white">Logs</button>
                        </div>
                        
                        <button 
                            onClick={() => handleDeleteTerminal(term.id)}
                            className="w-full py-1.5 flex items-center justify-center gap-1 text-[10px] text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        >
                            <TrashIcon className="w-3 h-3" /> Remove Terminal
                        </button>
                    </div>
                ))}
                
                {/* Add New Terminal Card */}
                <div 
                    onClick={() => setIsAddTerminalOpen(true)}
                    className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-white/20 hover:text-gray-300 cursor-pointer transition-all min-h-[300px] group"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <PlusIcon className="w-8 h-8 opacity-50" />
                    </div>
                    <span className="font-bold text-sm">Register New Terminal</span>
                    <span className="text-xs text-gray-600 mt-2">Connect hardware device</span>
                </div>
            </div>
        </div>
    );

    const renderIntegrations = () => {
        const totalBuyCost = thirdPartyApis.reduce((acc, api) => acc + (api.buyCost * api.monthlyUsage), 0);
        const totalSellRev = thirdPartyApis.reduce((acc, api) => acc + (api.sellPrice * api.monthlyUsage), 0);
        const netProfit = totalSellRev - totalBuyCost;
        const activeCount = thirdPartyApis.filter(api => api.status === 'Active').length;

        return (
            <div className="animate-fade-in-up space-y-6">
                {/* 3rd Party Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CloudIcon className="w-16 h-16 text-white" />
                        </div>
                         <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Cost (Buy)</p>
                         <h3 className="text-3xl font-black text-white mb-2">${totalBuyCost.toFixed(2)}</h3>
                         <div className="flex items-center gap-2 text-xs text-red-400">
                             <span className="w-2 h-2 rounded-full bg-red-500"></span>
                             Monthly Expense
                         </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CoinsIcon className="w-16 h-16 text-white" />
                        </div>
                         <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Revenue (Sell)</p>
                         <h3 className="text-3xl font-black text-white mb-2">${totalSellRev.toFixed(2)}</h3>
                         <div className="flex items-center gap-2 text-xs text-green-400">
                             <span className="w-2 h-2 rounded-full bg-green-500"></span>
                             Monthly Gross
                         </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden bg-gradient-to-br from-indigo-900/20 to-blue-900/20">
                         <div className="absolute top-0 right-0 p-4 opacity-10">
                            <CalculatorIcon className="w-16 h-16 text-white" />
                        </div>
                         <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">Net Margin (Profit)</p>
                         <h3 className="text-3xl font-black text-white mb-2">+${netProfit.toFixed(2)}</h3>
                         <div className="flex items-center gap-2 text-xs text-indigo-300">
                             <span className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30">
                                 {((netProfit / totalSellRev) * 100).toFixed(1)}% Margin
                             </span>
                         </div>
                    </div>
                </div>

                {/* Integration Table */}
                <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                         <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <CloudIcon className="w-5 h-5 text-gray-400" />
                                Connected Providers
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{activeCount} Active Integrations</p>
                         </div>
                         <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-colors border border-white/10 flex items-center gap-2">
                            <PlusIcon className="w-4 h-4" />
                            Add Provider
                         </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs text-gray-500 bg-black/20 uppercase tracking-wider">
                                    <th className="p-4 font-medium">Provider / Model</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium text-right">Unit Cost (Buy)</th>
                                    <th className="p-4 font-medium text-right">Unit Price (Sell)</th>
                                    <th className="p-4 font-medium text-right">Margin</th>
                                    <th className="p-4 font-medium">Monthly Usage</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium text-right">Total Profit</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {thirdPartyApis.map(api => {
                                    const profit = (api.sellPrice - api.buyCost) * api.monthlyUsage;
                                    const marginPercent = ((api.sellPrice - api.buyCost) / api.sellPrice) * 100;
                                    
                                    return (
                                        <tr key={api.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                                            <td className="p-4">
                                                <div className="font-bold text-white">{api.provider}</div>
                                                <div className="text-xs text-gray-400 font-mono">{api.model}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 border border-white/10 text-gray-300">
                                                    {api.type}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right text-gray-400 font-mono">
                                                ${api.buyCost}/{api.unit}
                                            </td>
                                            <td className="p-4 text-right text-white font-mono font-bold">
                                                ${api.sellPrice}/{api.unit}
                                            </td>
                                            <td className="p-4 text-right">
                                                <span className="text-xs text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">
                                                    {marginPercent.toFixed(0)}%
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                 <div className="flex flex-col gap-1">
                                                     <span className="text-xs text-gray-300">{api.monthlyUsage.toLocaleString()} {api.unit}</span>
                                                     <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                                                         <div className="h-full bg-indigo-500" style={{width: `${Math.min((api.monthlyUsage / 1000000) * 100, 100)}%`}}></div>
                                                     </div>
                                                 </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`flex items-center gap-1.5 text-xs font-bold ${api.status === 'Active' ? 'text-green-400' : 'text-gray-500'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${api.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                                                    {api.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right font-mono font-bold text-indigo-300">
                                                {profit > 0 ? `+$${profit.toFixed(2)}` : '-'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col p-6 md:p-10 overflow-hidden bg-black/50 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                            <CoinsIcon className="w-8 h-8 text-amber-400" />
                        </div>
                        Revenue & API Suite
                    </h1>
                    <p className="text-gray-400">Financial engineering, API token vault, and POS operations center.</p>
                </div>
                
                <div className="flex bg-white/5 p-1 rounded-xl overflow-x-auto custom-scrollbar">
                    {(['overview', 'models', 'vault', 'pos', 'integrations'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap
                                ${activeTab === tab 
                                    ? 'bg-amber-500 text-black shadow-lg' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                            `}
                        >
                            {tab === 'integrations' ? '3rd Party' : tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'models' && renderModels()}
                {activeTab === 'vault' && renderVault()}
                {activeTab === 'pos' && renderPOS()}
                {activeTab === 'integrations' && renderIntegrations()}
            </div>
        </div>
    );
};

export default RevenueSuite;