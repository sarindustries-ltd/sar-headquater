import React, { useState } from 'react';
import { ServerIcon, ActivityIcon, CpuIcon, DatabaseIcon, WrenchIcon, ZapIcon, RefreshCwIcon } from './Icons';
import { KapiNode } from '../types';

const KapiManagement: React.FC = () => {
  const [nodes, setNodes] = useState<KapiNode[]>([
    { id: 'kp-01', name: 'Kapi Core Alpha', region: 'US-East', status: 'online', load: 45, uptime: '99.99%' },
    { id: 'kp-02', name: 'Kapi Vector DB', region: 'EU-West', status: 'online', load: 78, uptime: '99.95%' },
    { id: 'kp-03', name: 'Kapi Stream', region: 'Asia-South', status: 'degraded', load: 92, uptime: '98.50%' },
    { id: 'kp-04', name: 'Kapi Auth Guard', region: 'US-West', status: 'online', load: 23, uptime: '100.00%' },
  ]);

  const handleRebootNode = (id: string) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'rebooting', load: 0 } : n));
    
    // Simulate reboot process
    setTimeout(() => {
        setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'online', load: Math.floor(Math.random() * 15) + 5 } : n));
    }, 4000);
  };

  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
               <ServerIcon className="w-8 h-8 text-indigo-400" />
            </div>
            Kapi Management
          </h1>
          <p className="text-gray-400">Control center for distributed Kapi neural nodes and API gateways.</p>
        </div>
        <div className="flex gap-3">
            <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                System Operational
            </div>
            <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors shadow-lg shadow-indigo-500/20">
                Deploy New Node
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Active Nodes', value: `${nodes.filter(n => n.status === 'online').length}/${nodes.length}`, icon: ServerIcon, color: 'text-blue-400', subtext: '1 Maintenance' },
          { label: 'Global Latency', value: '24ms', icon: ActivityIcon, color: 'text-green-400', subtext: '-3ms vs avg' },
          { label: 'Total Throughput', value: '4.2TB', icon: DatabaseIcon, color: 'text-purple-400', subtext: 'Last 24h' },
          { label: 'CPU Efficiency', value: '89%', icon: CpuIcon, color: 'text-orange-400', subtext: 'Optimized' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-4">
               <div className={`p-2 rounded-lg bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                   <stat.icon className="w-5 h-5" />
               </div>
               <span className="text-xs text-gray-500 font-mono">LIVE</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-[10px] text-gray-600 mt-2">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Nodes List */}
          <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                  <h3 className="font-bold text-white">Active Kapi Clusters</h3>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">View All</button>
              </div>
              <div className="p-2">
                  <table className="w-full text-left border-collapse">
                      <thead>
                          <tr className="text-xs text-gray-500 border-b border-white/5">
                              <th className="p-4 font-normal">Node Name</th>
                              <th className="p-4 font-normal">Region</th>
                              <th className="p-4 font-normal">Status</th>
                              <th className="p-4 font-normal">Load</th>
                              <th className="p-4 font-normal">Uptime</th>
                              <th className="p-4 font-normal text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {nodes.map(node => (
                              <tr key={node.id} className="hover:bg-white/5 transition-colors text-sm group">
                                  <td className="p-4">
                                      <div className="font-medium text-white">{node.name}</div>
                                      <div className="text-[10px] text-gray-500 font-mono">{node.id}</div>
                                  </td>
                                  <td className="p-4 text-gray-400">{node.region}</td>
                                  <td className="p-4">
                                      <span className={`
                                        inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border
                                        ${node.status === 'online' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                                          node.status === 'degraded' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                                          node.status === 'rebooting' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                          'bg-red-500/10 text-red-400 border-red-500/20'}
                                      `}>
                                          <span className={`w-1.5 h-1.5 rounded-full ${
                                              node.status === 'online' ? 'bg-green-500' : 
                                              node.status === 'degraded' ? 'bg-yellow-500' : 
                                              node.status === 'rebooting' ? 'bg-orange-500 animate-ping' :
                                              'bg-red-500'
                                          }`}></span>
                                          {node.status.toUpperCase()}
                                      </span>
                                  </td>
                                  <td className="p-4 text-gray-300">
                                      <div className="flex items-center gap-2">
                                          <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                              <div className={`h-full rounded-full transition-all duration-500 ${node.load > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{width: `${node.load}%`}}></div>
                                          </div>
                                          <span className="text-xs font-mono">{node.load}%</span>
                                      </div>
                                  </td>
                                  <td className="p-4 text-gray-400 font-mono">{node.uptime}</td>
                                  <td className="p-4 text-right flex items-center justify-end gap-2">
                                      <button 
                                        onClick={() => handleRebootNode(node.id)}
                                        disabled={node.status === 'rebooting'}
                                        className={`p-2 rounded-lg transition-colors ${node.status === 'rebooting' ? 'text-orange-400 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                        title="Reboot Node"
                                      >
                                          <RefreshCwIcon className={`w-4 h-4 ${node.status === 'rebooting' ? 'animate-spin' : ''}`} />
                                      </button>
                                      <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                          <WrenchIcon className="w-4 h-4" />
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <h3 className="font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                      <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 flex items-center justify-between group transition-all">
                          <span className="text-sm text-gray-300 group-hover:text-white">Restart All Nodes</span>
                          <ZapIcon className="w-4 h-4 text-gray-500 group-hover:text-yellow-400" />
                      </button>
                      <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 flex items-center justify-between group transition-all">
                          <span className="text-sm text-gray-300 group-hover:text-white">Flush DNS Cache</span>
                          <ActivityIcon className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                      </button>
                      <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 flex items-center justify-between group transition-all">
                          <span className="text-sm text-gray-300 group-hover:text-white">Export Audit Logs</span>
                          <DatabaseIcon className="w-4 h-4 text-gray-500 group-hover:text-green-400" />
                      </button>
                  </div>
              </div>

              {/* Maintenance Schedule */}
              <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                      <WrenchIcon className="w-24 h-24 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2 relative z-10">Maintenance</h3>
                  <p className="text-sm text-gray-400 mb-4 relative z-10">Scheduled maintenance for Node K-09 in 2 hours.</p>
                  <div className="flex items-center gap-2 text-xs text-yellow-500 font-mono relative z-10">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                      SCHEDULED: 03:00 UTC
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};

export default KapiManagement;