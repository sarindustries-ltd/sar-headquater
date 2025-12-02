import React, { useState, useEffect } from 'react';
import { 
    BrainIcon, ServerIcon, CheckCircleIcon, ShieldCheckIcon, CpuIcon,
    WalletIcon, LogoIcon, FingerprintIcon, ActivityIcon
} from './Icons';
import ProfileCard from './ProfileCard';

// --- Types ---

interface FeatureModule {
    id: string;
    title: string;
    subtitle: string;
    icon: React.FC<{ className?: string }>;
    delay: number;
}

interface OnboardingProps {
    onComplete: () => void;
}

type OnboardingStage = 'BOOT' | 'IDENTITY' | 'SYSTEM';

// --- Constants ---

const FEATURES: FeatureModule[] = [
    {
        id: 'neural',
        title: 'Neural Core',
        subtitle: 'SHYN + JARVIS AI',
        icon: BrainIcon,
        delay: 500
    },
    {
        id: 'finance',
        title: 'Financial Grid',
        subtitle: 'Real-time Wealth',
        icon: WalletIcon,
        delay: 1000
    },
    {
        id: 'infra',
        title: 'Kapi Cloud',
        subtitle: 'Global Nodes',
        icon: ServerIcon,
        delay: 1500
    },
    {
        id: 'security',
        title: 'Security Vault',
        subtitle: 'Bio-Encrypted',
        icon: ShieldCheckIcon,
        delay: 2000
    }
];

// --- Sub-Components ---

const LoadingBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="h-1 w-64 bg-white/10 rounded-full overflow-hidden relative">
        <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ width: `${progress}%` }}
        />
    </div>
);

const FeatureCard: React.FC<{ 
    feature: FeatureModule; 
    isActive: boolean; 
    isComplete: boolean;
}> = ({ feature, isActive, isComplete }) => {
    return (
        <div 
            className={`
                relative overflow-hidden rounded-3xl border p-6 flex flex-col items-center justify-center text-center transition-all duration-700
                ${isActive 
                    ? 'bg-white/5 border-white/10 opacity-100 translate-y-0 shadow-2xl shadow-indigo-500/10' 
                    : 'bg-black/20 border-white/5 opacity-0 translate-y-10'}
            `}
        >
            {/* Active Glow */}
            {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
            )}

            <div className={`
                p-4 rounded-2xl mb-4 transition-all duration-500
                ${isComplete ? 'bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-white/5 text-indigo-400'}
            `}>
                {isComplete ? <CheckCircleIcon className="w-8 h-8" /> : <feature.icon className="w-8 h-8" />}
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{feature.subtitle}</p>
            
            {/* Loading Indicator for Card */}
            {!isComplete && isActive && (
                <div className="mt-4 flex gap-1">
                    <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce animation-delay-200"></span>
                    <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce animation-delay-400"></span>
                </div>
            )}
        </div>
    );
};

// --- Main Component ---

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [stage, setStage] = useState<OnboardingStage>('BOOT');
    const [bootProgress, setBootProgress] = useState(0);
    const [featureStep, setFeatureStep] = useState(0);
    const [scanComplete, setScanComplete] = useState(false);

    // Stage 1: Boot Sequence (Graphical)
    useEffect(() => {
        const interval = setInterval(() => {
            setBootProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setStage('IDENTITY'), 500);
                    return 100;
                }
                return prev + 2; // Speed of boot
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    // Stage 2: Identity Verification
    useEffect(() => {
        if (stage !== 'IDENTITY') return;

        const scanTimer = setTimeout(() => {
            setScanComplete(true);
            setTimeout(() => setStage('SYSTEM'), 2000);
        }, 3000); // Scan duration

        return () => clearTimeout(scanTimer);
    }, [stage]);

    // Stage 3: System Features
    useEffect(() => {
        if (stage !== 'SYSTEM') return;

        const timeouts: ReturnType<typeof setTimeout>[] = [];

        FEATURES.forEach((feature, index) => {
            const timeout = setTimeout(() => {
                setFeatureStep(index + 1);
            }, feature.delay);
            timeouts.push(timeout);
        });

        const finishTimeout = setTimeout(() => {
            setFeatureStep(FEATURES.length + 1);
        }, FEATURES[FEATURES.length - 1].delay + 1000);
        timeouts.push(finishTimeout);

        return () => timeouts.forEach(clearTimeout);
    }, [stage]);

    // --- Renderers ---

    const renderBoot = () => (
        <div className="flex flex-col items-center justify-center h-full w-full animate-fade-in-up">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-indigo-500 blur-[60px] opacity-20 rounded-full animate-pulse"></div>
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 border border-white/10 relative z-10">
                    <LogoIcon className="w-12 h-12 text-white animate-[pulse_3s_ease-in-out_infinite]" />
                </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">SAR DIGITAL WORLD</h1>
            <p className="text-sm text-gray-500 font-mono uppercase tracking-widest mb-8">Initializing Ecosystem...</p>
            
            <LoadingBar progress={bootProgress} />
            
            <div className="mt-4 h-6">
                <p className="text-[10px] text-gray-600 font-mono">
                    {bootProgress < 30 ? 'LOADING KERNEL...' : 
                     bootProgress < 60 ? 'CONNECTING TO SATELLITE...' : 
                     bootProgress < 90 ? 'DECRYPTING SECURE VAULT...' : 
                     'READY'}
                </p>
            </div>
        </div>
    );

    const renderIdentity = () => (
        <div className="flex flex-col items-center animate-fade-in-up w-full max-w-sm relative z-20">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                    <FingerprintIcon className={`w-4 h-4 ${scanComplete ? 'text-green-400' : 'text-indigo-400 animate-pulse'}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
                        {scanComplete ? 'Identity Verified' : 'Biometric Scan Required'}
                    </span>
                </div>
            </div>
            
            <div className="relative w-full">
                {/* Profile Card Container */}
                <div className={`transition-all duration-700 ${scanComplete ? 'scale-100 blur-0 brightness-100' : 'scale-95 blur-[1px] brightness-75'}`}>
                    <ProfileCard />
                </div>

                {/* Scanner Overlay */}
                {!scanComplete && (
                    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-[24px]">
                        <div className="w-full h-[2px] bg-indigo-400 shadow-[0_0_20px_rgba(99,102,241,1)] absolute animate-scan top-0"></div>
                        <div className="absolute inset-0 bg-indigo-500/10 animate-pulse rounded-[24px]"></div>
                        
                        {/* High-tech corners */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-indigo-400/50 rounded-tl-lg"></div>
                        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-indigo-400/50 rounded-tr-lg"></div>
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-indigo-400/50 rounded-bl-lg"></div>
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-indigo-400/50 rounded-br-lg"></div>
                    </div>
                )}

                {/* Success Flash */}
                {scanComplete && (
                    <div className="absolute inset-0 z-40 flex items-center justify-center animate-fade-in pointer-events-none">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                            <CheckCircleIcon className="w-10 h-10 text-white" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderSystem = () => (
        <div className="w-full max-w-6xl flex flex-col h-full animate-fade-in-up px-4">
            <div className="text-center mb-10 shrink-0">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-lg">
                    <LogoIcon className="w-8 h-8 text-indigo-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                    Welcome to Headquarters
                </h1>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                    Your digital ecosystem has been successfully loaded and optimized for performance.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 min-h-[250px] mb-12">
                {FEATURES.map((feature, idx) => (
                    <FeatureCard 
                        key={feature.id}
                        feature={feature}
                        isActive={featureStep > idx}
                        isComplete={featureStep > idx + 1}
                    />
                ))}
            </div>

            <div className="text-center h-20 flex items-center justify-center">
                {featureStep > FEATURES.length ? (
                    <button 
                        onClick={onComplete}
                        className="group relative px-12 py-4 bg-white text-black font-bold text-sm rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Enter Dashboard <CpuIcon className="w-4 h-4" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full -translate-x-full group-hover:animate-[shimmer_0.6s_once]"></div>
                    </button>
                ) : (
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-mono uppercase tracking-widest">
                        <ActivityIcon className="w-3 h-3 animate-spin" />
                        Configuring Modules...
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[60] bg-[#030304] flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
            
            {/* Animated Glows matching Brand Colors */}
            <div className={`absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/20 blur-[120px] rounded-full transition-all duration-1000 ${stage === 'IDENTITY' ? 'opacity-100 scale-110' : 'opacity-50 scale-100'}`}></div>
            <div className={`absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 blur-[120px] rounded-full transition-all duration-1000 ${stage === 'IDENTITY' ? 'opacity-100 scale-110' : 'opacity-50 scale-100'}`}></div>
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                {stage === 'BOOT' && renderBoot()}
                {stage === 'IDENTITY' && renderIdentity()}
                {stage === 'SYSTEM' && renderSystem()}
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 flex items-center gap-2 opacity-30">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">
                    System Secure • v2.0.4
                </span>
            </div>
        </div>
    );
};

export default Onboarding;