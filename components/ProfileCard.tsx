import React from 'react';
import { VerifiedBadge, LogoIcon } from './Icons';

const ProfileCard: React.FC = () => {
  return (
    <div className="relative group w-full max-w-sm mx-auto">
        {/* Glow behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl flex flex-col">
            {/* Header / Banner Area */}
            <div className="h-1/2 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-black to-black z-10"></div>
                {/* Abstract decorative lines */}
                <div className="absolute inset-0 z-0 opacity-50">
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#4c1d95_100%)] animate-spin-slow opacity-30 blur-3xl"></div>
                    <div className="absolute top-10 left-10 w-full h-8 bg-purple-500/10 rotate-[-12deg] blur-xl"></div>
                    <div className="absolute top-20 left-20 w-full h-8 bg-indigo-500/10 rotate-[-12deg] blur-xl"></div>
                </div>
                
                {/* Small buttons overlay */}
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                    <button className="p-1.5 bg-black/40 backdrop-blur-md rounded-lg text-white hover:bg-white/10 border border-white/10">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </button>
                    <button className="p-1.5 bg-black/40 backdrop-blur-md rounded-lg text-white hover:bg-white/10 border border-white/10">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    </button>
                    <button className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-colors">
                        Follow
                    </button>
                </div>

                {/* Main Logo Box */}
                <div className="absolute bottom-[-24px] left-6 z-20">
                     <div className="w-20 h-20 bg-[#0A0A0A] rounded-2xl p-1 shadow-xl border border-white/10 flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-br from-indigo-900/40 to-black rounded-xl flex items-center justify-center border border-white/5">
                            <LogoIcon className="w-10 h-10 text-indigo-400" />
                        </div>
                     </div>
                </div>
            </div>

            {/* Info Content */}
            <div className="flex-1 bg-black p-6 pt-10">
                <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-white leading-tight">Saiful Alam Rafi</h2>
                    <VerifiedBadge className="w-5 h-5 text-blue-400 flex-shrink-0" />
                </div>
                <p className="text-gray-500 text-sm mb-4">@saifulalamrafi</p>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Innovating the future of digital ecosystems. Developer, visionary, and creator of the SAR platform.
                </p>

                <div className="flex gap-4 text-sm mb-6">
                    <div className="flex gap-1">
                        <span className="text-white font-bold">12.5k</span>
                        <span className="text-gray-500">Following</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="text-white font-bold">450k</span>
                        <span className="text-gray-500">Followers</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-1 text-gray-500 text-xs hover:text-indigo-400 cursor-pointer transition-colors">
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                     <span>saifulalamrafi.com</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfileCard;