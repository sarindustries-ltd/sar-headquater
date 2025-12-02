import React from 'react';
import { 
  LogoIcon, 
  LayoutDashboardIcon, 
  WalletIcon, 
  ZapIcon, 
  GridIcon, 
  WrenchIcon, 
  FolderIcon, 
  LinkIcon, 
  BoxIcon, 
  SettingsIcon,
  ServerIcon,
  CoinsIcon
} from './Icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'wallet', label: 'My Wallet', icon: WalletIcon },
    { id: 'shyn', label: 'SHYN', icon: ZapIcon },
    { id: 'revenue', label: 'Revenue & API', icon: CoinsIcon },
    { id: 'apps', label: 'Apps', icon: GridIcon },
    { id: 'tools', label: 'Tools', icon: WrenchIcon },
    { id: 'files', label: 'File Manager', icon: FolderIcon },
    { id: 'connectors', label: 'Connectors', icon: LinkIcon },
    { id: 'kapi', label: 'Kapi Management', icon: ServerIcon },
    { id: 'utility', label: 'Utility', icon: BoxIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Overlay with smooth fade */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 card-glass lg:!bg-transparent lg:!border-r lg:!border-white/5 lg:!shadow-none
        transform transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1)
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-4 border-b border-white/5 bg-[#030304]/20">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-white/10">
            <LogoIcon className="w-5 h-5 text-white" />
          </div>
          <div>
              <h1 className="text-xl font-bold text-white tracking-wide leading-none">SAR</h1>
              <p className="text-[10px] text-gray-500 font-mono tracking-wider mt-1.5 uppercase">Dashboard v2.0</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? 'btn-ghost active' 
                    : 'btn-ghost'}
                `}
              >
                {/* Active Indicator Line */}
                {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                )}

                <item.icon 
                    className={`
                        w-5 h-5 transition-transform duration-300 relative z-10
                        ${isActive ? 'text-indigo-400' :