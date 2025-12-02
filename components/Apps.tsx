import React from 'react';
import { 
    GridIcon, GlobeIcon, ServerIcon, UsersIcon, CodeIcon, 
    FolderIcon, LayoutDashboardIcon, MonitorIcon, ShoppingCartIcon, 
    BoxIcon, ShieldIcon
} from './Icons';

const Apps: React.FC = () => {
  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
               <GridIcon className="w-8 h-8 text-indigo-400" />
            </div>
            Enterprise Suite
          </h1>
          <p className="text-gray-400">Deploy and manage large-scale business applications within the SAR Ecosystem.</p>
        </div>
        <div className="flex gap-3">
             <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-gray-300 text-sm font-medium transition-all">
                Documentation
            </button>
            <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors shadow-lg shadow-indigo-500/20">
                New Deployment
            </button>
        </div>
      </div>

      {/* Hero Widget: SAR LEGACY */}
      <div className="w-full mb-12">
           <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-2xl group">
               {/* Background Decorative Glow */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full"></div>
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full"></div>
               
               <div className="relative z-10 flex flex-col lg:flex-row">
                   
                   {/* Left Panel: Info & Features */}
                   <div className="p-8 lg:p-10 flex-1 flex flex-col justify-between">
                       <div>
                           <div className="flex items-center gap-3 mb-4">
                               <div className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                                   Enterprise Edition
                               </div>
                               <div className="flex items-center gap-2 text-green-400 text-xs font-mono">
                                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                   SYSTEM OPERATIONAL
                               </div>
                           </div>
                           
                           <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 flex items-center gap-4">
                                SAR LEGACY
                                <span className="text-2xl text-gray-500 font-medium">v1.0.4</span>
                           </h2>
                           <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                               A comprehensive, full-stack digital commerce management ecosystem. 
                               Engineered for scalability, security, and seamless administration.
                           </p>
                           
                           {/* Core Features Grid */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {[
                                    { icon: MonitorIcon, label: "Admin Dashboard Panel", desc: "Responsive Full Access" },
                                    { icon: LayoutDashboardIcon, label: "Integrated Landing Page", desc: "Conversion Optimized" },
                                    { icon: UsersIcon, label: "Staff Management", desc: "Role-Based Access Control" },
                                    { icon: ShieldIcon, label: "User Dashboard", desc: "Client & Customer Portal" },
                                    { icon: GlobeIcon, label: "Custom Domain", desc: "DNS & SSL Management" },
                                    { icon: ServerIcon, label: "Custom Hosting", desc: "Dedicated Infrastructure" },
                                    { icon: CodeIcon, label: "Custom App Logic", desc: "React & Node.js Core" },
                                    { icon: FolderIcon, label: "File System", desc: "Advanced Folder Structure" },
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group/item">
                                        <div className="mt-1 p-2 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover/item:text-indigo-300 group-hover/item:bg-indigo-500/20 transition-colors">
                                            <feature.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-200">{feature.label}</h4>
                                            <p className="text-[11px] text-gray-500">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                           </div>
                       </div>

                       <div className="flex flex-wrap gap-4 mt-4">
                           <button className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-xl shadow-white/5">
                               <MonitorIcon className="w-5 h-5" />
                               Launch Console
                           </button>
                           <button className="px-8 py-4 rounded-2xl bg-black/40 text-white font-bold border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
                               <CodeIcon className="w-5 h-5" />
                               Source Code
                           </button>
                       </div>
                   </div>

                   {/* Right Panel: Visual Preview (Mockup) */}
                   <div className="lg:w-[45%] bg-black/40 border-l border-white/10 relative overflow-hidden flex flex-col">
                       {/* Mock Browser Header */}
                       <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-black/40">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="flex-1 bg-white/5 rounded-md h-6 mx-4 flex items-center px-3 text-[10px] text-gray-500 font-mono">
                                https://admin.sar-legacy.com/dashboard
                            </div>
                       </div>
                       
                       {/* Mock Dashboard UI */}
                       <div className="flex-1 p-6 relative">
                            {/* Abstract Dashboard Layout */}
                            <div className="w-full h-full border border-white/10 rounded-xl bg-gray-900/50 p-4 space-y-4 shadow-inner">
                                <div className="flex gap-4">
                                    <div className="w-1/4 h-32 rounded-lg bg-indigo-500/10 border border-indigo-500/20"></div>
                                    <div className="w-1/4 h-32 rounded-lg bg-purple-500/10 border border-purple-500/20"></div>
                                    <div className="w-1/4 h-32 rounded-lg bg-pink-500/10 border border-pink-500/20"></div>
                                    <div className="w-1/4 h-32 rounded-lg bg-blue-500/10 border border-blue-500/20"></div>
                                </div>
                                <div className="flex gap-4 h-64">
                                    <div className="w-2/3 h-full rounded-lg bg-white/5 border border-white/5"></div>
                                    <div className="w-1/3 h-full rounded-lg bg-white/5 border border-white/5 space-y-2 p-3">
                                        <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                                        <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                                        <div className="h-2 w-full bg-white/10 rounded"></div>
                                        <div className="h-2 w-5/6 bg-white/10 rounded"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats Overlay */}
                            <div className="absolute bottom-10 right-10 p-4 bg-black/80 backdrop-blur-xl border border-green-500/30 rounded-xl shadow-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                                        <ShoppingCartIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase">Total Revenue</p>
                                        <p className="text-lg font-bold text-white">$4.2M</p>
                                    </div>
                                </div>
                            </div>
                       </div>
                   </div>

               </div>
           </div>
      </div>

      {/* Other Apps Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {['SAR Mail', 'SAR Analytics', 'SAR Cloud'].map((app, i) => (
               <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group cursor-pointer opacity-60 hover:opacity-100">
                    <div className="w-12 h-12 rounded-xl bg-gray-800 mb-4 flex items-center justify-center border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                        <BoxIcon className="w-6 h-6 text-gray-500 group-hover:text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{app}</h3>
                    <p className="text-sm text-gray-500">Coming soon. Enterprise integration in progress.</p>
               </div>
           ))}
      </div>
    </div>
  );
};

export default Apps;
