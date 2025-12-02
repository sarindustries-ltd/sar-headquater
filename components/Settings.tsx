import React, { useState } from 'react';
import { 
    UserIcon, LockIcon, UsersIcon, SettingsIcon, BellIcon, ShieldIcon,
    CameraIcon, MapPinIcon, GlobeIcon, SmartphoneIcon, LogOutIcon,
    CheckCircleIcon, AlertTriangleIcon, ActivityIcon, PlusIcon, TrashIcon,
    ToggleLeftIcon, ToggleRightIcon, ShieldCheckIcon, PaintBucketIcon,
    CreditCardIcon, HistoryIcon, LinkIcon, UploadCloudIcon, DownloadIcon, HardDriveIcon
} from './Icons';
import { TeamMember } from '../types';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'billing' | 'security' | 'team' | 'system' | 'notifications' | 'audit' | 'api'>('profile');
    
    // --- Mock States ---
    
    const [profile, setProfile] = useState({
        name: 'Alex Morgan',
        email: 'alex.morgan@sar-platform.com',
        bio: 'Senior System Administrator managing the SAR Ecosystem infrastructure.',
        location: 'Dhaka, Bangladesh',
        website: 'sar-platform.com'
    });

    const [team, setTeam] = useState<TeamMember[]>([
        { id: '1', name: 'Sarah Connor', email: 'sarah@example.com', role: 'Editor', status: 'Active' },
        { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Viewer', status: 'Invited' },
    ]);

    const [systemConfig, setSystemConfig] = useState({
        maintenanceMode: false,
        debugLogging: true,
        publicRegistration: false,
        apiRateLimit: 5000,
        brandName: 'SAR Platform',
        dataRetention: '60',
        smtpServer: 'smtp.sar-internal.net'
    });

    const [notifications, setNotifications] = useState({
        emailSecurity: true,
        emailMarketing: false,
        pushSystem: true,
        pushMentions: true
    });

    const [appearance, setAppearance] = useState({
        theme: 'midnight',
        accentColor: 'indigo',
        density: 'comfortable',
        reducedMotion: false
    });

    const [webhooks, setWebhooks] = useState([
        { id: '1', url: 'https://api.example.com/hooks/users', events: ['user.created'], status: 'Active' },
        { id: '2', url: 'https://slack.com/webhook/xyz', events: ['alert.critical'], status: 'Active' }
    ]);

    // --- Handlers ---

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const toggleSystemConfig = (key: keyof typeof systemConfig) => {
        setSystemConfig(prev => ({ ...prev, [key]: !prev[key] }));
    };
    
    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleAppearance = (key: keyof typeof appearance, value: any) => {
        setAppearance(prev => ({ ...prev, [key]: value }));
    };

    const renderToggle = (isOn: boolean, onClick: () => void) => (
        <button onClick={onClick} className={`transition-colors ${isOn ? 'text-indigo-400' : 'text-gray-600'}`}>
            {isOn ? <ToggleRightIcon className="w-10 h-10" /> : <ToggleLeftIcon className="w-10 h-10" />}
        </button>
    );

    // --- Render Functions ---

    const renderProfileTab = () => (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden border-2 border-white/10 group-hover:border-indigo-500 transition-colors">
                        <img src="https://picsum.photos/200" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <CameraIcon className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">SUPER ADMIN</span>
                        <span className="text-gray-500 text-sm">Member since 2023</span>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={profile.name} 
                        onChange={handleProfileChange}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={profile.email} 
                        onChange={handleProfileChange}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Bio</label>
                    <textarea 
                        name="bio" 
                        value={profile.bio} 
                        onChange={handleProfileChange}
                        rows={3}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
                    <div className="relative">
                        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            name="location" 
                            value={profile.location} 
                            onChange={handleProfileChange}
                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Website</label>
                    <div className="relative">
                        <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            name="website" 
                            value={profile.website} 
                            onChange={handleProfileChange}
                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
                <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-500/20">
                    Save Changes
                </button>
            </div>
        </div>
    );

    const renderAppearanceTab = () => (
        <div className="space-y-8 animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-4">Interface Customization</h3>
            
            {/* Themes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Midnight', 'Cosmic', 'Nebula'].map(theme => (
                    <button 
                        key={theme}
                        onClick={() => toggleAppearance('theme', theme.toLowerCase())}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${appearance.theme === theme.toLowerCase() ? 'bg-indigo-500/10 border-indigo-500' : 'bg-black/20 border-white/5 hover:bg-white/5'}`}
                    >
                        <div className={`w-full h-24 rounded-lg bg-gradient-to-br ${
                            theme === 'Midnight' ? 'from-gray-900 to-black' : 
                            theme === 'Cosmic' ? 'from-purple-900 to-black' : 
                            'from-blue-900 to-black'
                        }`}></div>
                        <span className={`font-bold ${appearance.theme === theme.toLowerCase() ? 'text-white' : 'text-gray-400'}`}>{theme}</span>
                    </button>
                ))}
            </div>

            {/* Accent Color */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <h4 className="font-bold text-white mb-4">Accent Color</h4>
                <div className="flex gap-4">
                    {['indigo', 'emerald', 'rose', 'amber', 'cyan'].map(color => (
                        <button 
                            key={color}
                            onClick={() => toggleAppearance('accentColor', color)}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                                appearance.accentColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                            }`}
                            style={{ backgroundColor: `var(--color-${color}-500, ${color === 'indigo' ? '#6366f1' : color === 'emerald' ? '#10b981' : color === 'rose' ? '#f43f5e' : color === 'amber' ? '#f59e0b' : '#06b6d4'})` }}
                        >
                            {appearance.accentColor === color && <CheckCircleIcon className="w-5 h-5 text-white" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Other Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl border border-white/5 flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-white">Reduced Motion</h4>
                        <p className="text-xs text-gray-400">Minimize animations for accessibility.</p>
                    </div>
                    {renderToggle(appearance.reducedMotion, () => toggleAppearance('reducedMotion', !appearance.reducedMotion))}
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/5 flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-white">Compact Density</h4>
                        <p className="text-xs text-gray-400">Show more content on screen.</p>
                    </div>
                    {renderToggle(appearance.density === 'compact', () => toggleAppearance('density', appearance.density === 'compact' ? 'comfortable' : 'compact'))}
                </div>
            </div>
        </div>
    );

    const renderBillingTab = () => (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Plan & Billing</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg">Upgrade Plan</button>
            </div>

            {/* Current Plan */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                    <CreditCardIcon className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                    <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase mb-4">Current Plan</div>
                    <h2 className="text-4xl font-black text-white mb-2">Enterprise Tier</h2>
                    <p className="text-gray-400 mb-8 max-w-md">Unlimited access to all neural tools, dedicated GPU resources, and priority 24/7 support.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-gray-300">Seat Usage</span>
                                <span className="text-white font-bold">12 / 20</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[60%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-gray-300">Storage</span>
                                <span className="text-white font-bold">1.4TB / 5TB</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-[28%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-gray-300">API Calls</span>
                                <span className="text-white font-bold">8.4M / ∞</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[15%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <h4 className="font-bold text-white mb-4">Payment Method</h4>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                            {/* Visa Logo Placeholder */}
                            <div className="text-blue-800 font-black italic text-sm">VISA</div>
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Visa ending in 4242</p>
                            <p className="text-gray-400 text-xs">Expires 12/2028</p>
                        </div>
                    </div>
                    <button className="text-sm text-gray-400 hover:text-white font-medium">Update</button>
                </div>
            </div>

            {/* Invoices */}
            <div>
                <h4 className="font-bold text-white mb-4">Invoice History</h4>
                <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-black/20 text-xs text-gray-500 uppercase">
                            <tr>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[1,2,3].map(i => (
                                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-gray-300">Oct 01, 2023</td>
                                    <td className="p-4 text-white font-bold">$499.00</td>
                                    <td className="p-4"><span className="text-green-400 text-xs px-2 py-1 bg-green-500/10 rounded">Paid</span></td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                            <DownloadIcon className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderSecurityTab = () => (
        <div className="space-y-8 animate-fade-in-up">
            {/* 2FA */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                        <ShieldCheckIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Two-Factor Authentication</h3>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">ENABLED</span>
                    <button className="text-gray-400 hover:text-white px-3 py-1 text-sm font-medium">Configure</button>
                </div>
            </div>

            {/* Password */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Confirm Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg text-sm border border-white/10">Update Password</button>
                </div>
            </div>

            {/* Sessions */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Active Sessions</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                <ActivityIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">MacBook Pro 16" - Chrome</p>
                                <p className="text-gray-400 text-xs">Dhaka, Bangladesh • Active Now</p>
                            </div>
                        </div>
                        <span className="text-green-400 text-xs font-bold">CURRENT DEVICE</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                <SmartphoneIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">iPhone 14 Pro - App</p>
                                <p className="text-gray-400 text-xs">Dhaka, Bangladesh • 2 hours ago</p>
                            </div>
                        </div>
                        <button className="text-red-400 hover:text-red-300 text-xs font-bold">Revoke</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTeamTab = () => (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-white">Team Management (IAM)</h3>
                    <p className="text-gray-400 text-sm">Manage user access and roles for the SAR ecosystem.</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg">
                    <PlusIcon className="w-4 h-4" />
                    Invite Member
                </button>
            </div>

            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="text-xs text-gray-500 bg-black/20 uppercase tracking-wider">
                        <tr>
                            <th className="p-4 font-medium">User</th>
                            <th className="p-4 font-medium">Role</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-white/5 bg-indigo-500/5">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">AM</div>
                                    <div>
                                        <div className="font-bold text-white">{profile.name}</div>
                                        <div className="text-xs text-gray-400">{profile.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4"><span className="text-indigo-300 font-bold">Owner</span></td>
                            <td className="p-4"><span className="text-green-400 text-xs px-2 py-1 bg-green-500/10 rounded border border-green-500/20">Active</span></td>
                            <td className="p-4 text-right"></td>
                        </tr>
                        {team.map(user => (
                            <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">{user.name.charAt(0)}</div>
                                        <div>
                                            <div className="font-bold text-white">{user.name}</div>
                                            <div className="text-xs text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <select className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none">
                                        <option selected={user.role === 'Admin'}>Admin</option>
                                        <option selected={user.role === 'Editor'}>Editor</option>
                                        <option selected={user.role === 'Viewer'}>Viewer</option>
                                    </select>
                                </td>
                                <td className="p-4">
                                     <span className={`text-xs px-2 py-1 rounded border ${user.status === 'Active' ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-400 hover:text-red-400 p-2"><TrashIcon className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderSystemTab = () => (
         <div className="space-y-8 animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-4">System Configuration</h3>
            
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
                <h4 className="font-bold text-white border-b border-white/5 pb-2">Platform Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Brand Name (White Label)</label>
                        <input 
                            type="text" 
                            value={systemConfig.brandName}
                            onChange={(e) => setSystemConfig({...systemConfig, brandName: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Data Retention (Days)</label>
                        <select 
                            value={systemConfig.dataRetention}
                            onChange={(e) => setSystemConfig({...systemConfig, dataRetention: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                        >
                            <option value="30">30 Days</option>
                            <option value="60">60 Days</option>
                            <option value="90">90 Days</option>
                            <option value="365">1 Year</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <AlertTriangleIcon className="w-5 h-5 text-red-500" />
                            <span className="font-bold text-white">Maintenance Mode</span>
                        </div>
                        {renderToggle(systemConfig.maintenanceMode, () => toggleSystemConfig('maintenanceMode'))}
                    </div>
                    <p className="text-xs text-gray-400">Put the entire platform into read-only mode for updates. Shows a banner to all users.</p>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <ActivityIcon className="w-5 h-5 text-blue-500" />
                            <span className="font-bold text-white">Debug Logging</span>
                        </div>
                        {renderToggle(systemConfig.debugLogging, () => toggleSystemConfig('debugLogging'))}
                    </div>
                    <p className="text-xs text-gray-400">Enable verbose logging for system events and API requests.</p>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <UsersIcon className="w-5 h-5 text-green-500" />
                            <span className="font-bold text-white">Public Registration</span>
                        </div>
                        {renderToggle(systemConfig.publicRegistration, () => toggleSystemConfig('publicRegistration'))}
                    </div>
                    <p className="text-xs text-gray-400">Allow new users to sign up without an invitation.</p>
                </div>

                 <div className="glass-panel p-6 rounded-2xl border border-white/5">
                    <div className="mb-4">
                        <span className="font-bold text-white block mb-1">API Rate Limit</span>
                        <span className="text-xs text-gray-400 block mb-4">Global request limit per hour per IP.</span>
                        <div className="flex items-center gap-4">
                            <input 
                                type="range" 
                                min="1000" 
                                max="10000" 
                                step="500" 
                                value={systemConfig.apiRateLimit}
                                onChange={(e) => setSystemConfig(prev => ({...prev, apiRateLimit: parseInt(e.target.value)}))}
                                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                            />
                            <span className="font-mono text-indigo-400 font-bold">{systemConfig.apiRateLimit}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-panel p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
                <h4 className="font-bold text-red-500 mb-4 flex items-center gap-2">
                    <AlertTriangleIcon className="w-5 h-5" />
                    Danger Zone
                </h4>
                <div className="flex items-center justify-between">
                    <div>
                        <h5 className="text-white font-medium text-sm">Delete Workspace</h5>
                        <p className="text-xs text-gray-400">Permanently remove this workspace and all data.</p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors">
                        Delete Workspace
                    </button>
                </div>
            </div>
         </div>
    );

    const renderNotificationsTab = () => (
         <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-4">Notification Preferences</h3>
            <div className="glass-panel rounded-2xl border border-white/5 divide-y divide-white/5">
                {[
                    { id: 'emailSecurity', label: 'Security Alerts', desc: 'Login attempts, password changes, and unusual activity.', type: 'Email' },
                    { id: 'pushSystem', label: 'System Updates', desc: 'Maintenance schedules and feature rollouts.', type: 'Push' },
                    { id: 'pushMentions', label: 'Team Mentions', desc: 'When someone tags you in a comment or task.', type: 'Push' },
                    { id: 'emailMarketing', label: 'Marketing & Tips', desc: 'Product news and usage tips.', type: 'Email' },
                ].map((item: any) => (
                    <div key={item.id} className="p-6 flex items-center justify-between">
                         <div>
                             <h4 className="font-bold text-white text-sm mb-1">{item.label}</h4>
                             <p className="text-xs text-gray-400">{item.desc}</p>
                         </div>
                         <div className="flex items-center gap-4">
                             <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{item.type}</span>
                             {renderToggle(notifications[item.id as keyof typeof notifications], () => toggleNotification(item.id))}
                         </div>
                    </div>
                ))}
            </div>
         </div>
    );

    const renderAuditTab = () => (
        <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-4">System Audit Logs</h3>
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/20 text-xs text-gray-500 uppercase">
                        <tr>
                            <th className="p-4 font-medium">Action</th>
                            <th className="p-4 font-medium">Performed By</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">IP Address</th>
                            <th className="p-4 font-medium text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {[
                            { action: 'Settings Updated', user: 'Alex Morgan', date: '2 mins ago', ip: '192.168.1.1', status: 'Success' },
                            { action: 'User Invite Sent', user: 'Alex Morgan', date: '1 hour ago', ip: '192.168.1.1', status: 'Success' },
                            { action: 'Failed Login', user: 'Unknown', date: '3 hours ago', ip: '45.32.12.9', status: 'Failed' },
                            { action: 'API Key Revoked', user: 'Sarah Connor', date: 'Yesterday', ip: '10.0.0.5', status: 'Success' },
                        ].map((log, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="p-4 text-white font-medium">{log.action}</td>
                                <td className="p-4 text-gray-300">{log.user}</td>
                                <td className="p-4 text-gray-400">{log.date}</td>
                                <td className="p-4 text-gray-500 font-mono text-xs">{log.ip}</td>
                                <td className="p-4 text-right">
                                    <span className={`text-xs px-2 py-1 rounded border ${
                                        log.status === 'Success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderApiTab = () => (
        <div className="space-y-8 animate-fade-in-up">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Webhooks & API</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" /> Add Endpoint
                </button>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <h4 className="font-bold text-white mb-4">Client Secrets</h4>
                <div className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-white/10">
                    <code className="text-xs text-indigo-300 font-mono flex-1">sar_live_8392849284928394...</code>
                    <button className="text-xs font-bold text-gray-400 hover:text-white">Regenerate</button>
                    <button className="text-xs font-bold text-gray-400 hover:text-white">Copy</button>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white">Active Webhooks</h4>
                {webhooks.map(hook => (
                    <div key={hook.id} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-sm text-gray-300">{hook.url}</span>
                                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20">Active</span>
                            </div>
                            <div className="flex gap-2">
                                {hook.events.map(ev => (
                                    <span key={ev} className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded">{ev}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2">
                             <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">Test</button>
                             <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400"><TrashIcon className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col md:flex-row bg-black/50 overflow-hidden animate-fade-in-up">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-black/20 border-r border-white/5 p-6 flex flex-col shrink-0">
                <h1 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                    <SettingsIcon className="w-6 h-6 text-indigo-500" />
                    Settings
                </h1>
                
                <nav className="space-y-1 flex-1 overflow-y-auto custom-scrollbar">
                    {[
                        { id: 'profile', label: 'My Profile', icon: UserIcon },
                        { id: 'appearance', label: 'Appearance', icon: PaintBucketIcon },
                        { id: 'billing', label: 'Billing & Plans', icon: CreditCardIcon },
                        { id: 'security', label: 'Security', icon: LockIcon },
                        { id: 'team', label: 'Team & Access', icon: UsersIcon },
                        { id: 'system', label: 'System Config', icon: ShieldIcon },
                        { id: 'api', label: 'API & Webhooks', icon: LinkIcon },
                        { id: 'notifications', label: 'Notifications', icon: BellIcon },
                        { id: 'audit', label: 'Audit Logs', icon: HistoryIcon },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-white/5 mt-auto">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOutIcon className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                <div className="max-w-4xl mx-auto">
                    {activeTab === 'profile' && renderProfileTab()}
                    {activeTab === 'appearance' && renderAppearanceTab()}
                    {activeTab === 'billing' && renderBillingTab()}
                    {activeTab === 'security' && renderSecurityTab()}
                    {activeTab === 'team' && renderTeamTab()}
                    {activeTab === 'system' && renderSystemTab()}
                    {activeTab === 'notifications' && renderNotificationsTab()}
                    {activeTab === 'audit' && renderAuditTab()}
                    {activeTab === 'api' && renderApiTab()}
                </div>
            </div>
        </div>
    );
};

export default Settings;