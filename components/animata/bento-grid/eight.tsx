"use client";

import { Brain, Zap, Lock, Globe2, Activity, Wind, Database, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import TargetCursor from "@/components/TargetCursor";

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div 
            ref={cardRef}
            className={cn(
                "cursor-target relative w-full h-full rounded-[2rem] p-6 pb-6 overflow-hidden group transition-all duration-500",
                !isHovering ? "border border-white/10 bg-white/[0.02]" : "border border-transparent",
                !isHovering && "grayscale saturate-[0.2] brightness-[0.8]",
                className
            )}
        >
            <div 
                className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.2), transparent 40%)`,
                    maskImage: 'linear-gradient(transparent, transparent), linear-gradient(white, white)',
                    maskClip: 'padding-box, border-box',
                    maskComposite: 'exclude',
                    padding: '2px',
                }}
            />
            <div className={cn(
                "relative z-10 transition-all duration-500 h-full",
                !isHovering && "opacity-70"
            )}>
                {children}
            </div>
        </div>
    );
}

// Card 1: Emotional Nuance (2x2)
function EmotionalNuance() {
    const bars = Array.from({ length: 24 }, (_, i) => ({
        delay: i * 0.15 // Staggered delay for wave effect
    }));

    return (
        <BentoCard className="bg-indigo-500/20">
            <div className="flex flex-col h-full">
                <div className="inline-flex items-center mb-4 justify-center w-14 h-14 rounded-2xl bg-indigo-500">
                    <Brain className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-4xl font-black tracking-tighter text-white mb-3">
                    Emotional<br />Nuance
                </h3>
                <p className="text-indigo-100 text-sm mb-4">
                    Capture breath, tone, and empathy. The AI doesn't just speak; it feels the weight of every word.
                </p>

                {/* Audio Visualizer */}
                <div className="mt-auto flex items-end justify-stretch gap-1 h-32 -mx-6 -mb-6 px-6 pb-6">
                    {bars.map((bar, i) => (
                        <div
                            key={i}
                            className="w-full bg-indigo-500 rounded-t-lg animate-wave"
                            style={{
                                animationDelay: `${bar.delay}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes wave {
                    0%, 100% { height: 30%; }
                    50% { height: 70%; }
                }
                .animate-wave {
                    animation: wave 4s ease-in-out infinite;
                }
            `}</style>
        </BentoCard>
    );
}

// Card 2: Zero-Lag Synapse (2x1)
function ZeroLagSynapse() {
    return (
        <BentoCard className="bg-yellow-500/20">
            <div className="relative flex items-center justify-between h-full">
                {/* Animated synapse lines */}
                <div className="absolute inset-0 overflow-hidden opacity-30">
                    <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-synapse-x" />
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-synapse-x" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-synapse-x" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-400 mb-4">
                        <Zap className="w-6 h-6 text-yellow-950" />
                    </div>
                    <div className="text-6xl font-black tracking-tighter text-white mb-2">80MS</div>
                    <h3 className="text-2xl font-black tracking-tight text-white mb-2">Zero-Lag Synapse</h3>
                    <p className="text-yellow-100 text-sm max-w-md">
                        Real-time responses that match human thought patterns instantly.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes synapse-x {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-synapse-x {
                    animation: synapse-x 3s linear infinite;
                }
            `}</style>
        </BentoCard>
    );
}

// Card 3: Ghost Privacy (1x1)
function GhostPrivacy() {
    return (
        <BentoCard className="bg-slate-800/30">
            <div className="relative flex flex-col h-full">
                {/* Spinning dashed ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-32 border-4 border-dashed border-slate-600 rounded-full animate-spin-slow" />
                </div>
                
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700 mb-4">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter text-white mb-1">
                        Ghost<br />Privacy
                    </h3>
                    <p className="text-slate-300 text-xs">
                        End-to-end encryption.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
            `}</style>
        </BentoCard>
    );
}

// Card 4: 92 Dialects (1x1)
function Dialects() {
    return (
        <BentoCard className="bg-indigo-600">
            <div className="relative flex flex-col h-full pb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-4">
                    <Globe2 className="w-6 h-6 text-white" />
                </div>
                
                <div className="text-5xl font-black tracking-tighter text-white mb-2">92</div>
                <h3 className="text-xl font-black tracking-tight text-white/90 mb-2">Dialects</h3>
                
                {/* Language tags */}
                <div className="mt-auto -mx-6 -mb-6 px-6 pb-6 pt-4 flex flex-wrap gap-2">
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        English
                    </div>
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        Spanish
                    </div>
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        French
                    </div>
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        Japanese
                    </div>
                </div>
            </div>
        </BentoCard>
    );
}

// Card 5: Tone Mirroring (1x1)
function ToneMirroring() {
    return (
        <BentoCard className="bg-gradient-to-br from-orange-500/20 to-pink-500/20">
            <div className="flex flex-col h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 mb-4">
                    <Activity className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-2xl font-black tracking-tighter text-white mb-1">
                    Tone<br />Mirroring
                </h3>
                <p className="text-orange-100 text-xs mt-auto">
                    Adapts to sentiment.
                </p>
            </div>
        </BentoCard>
    );
}

// Card 6: Natural Breathing (1x1)
function NaturalBreathing() {
    return (
        <BentoCard className="bg-cyan-500/20">
            <div className="relative flex flex-col h-full">
                {/* Pulsating glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-cyan-400/30 rounded-full blur-2xl animate-breath-scale" />
                
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500 mb-4">
                        <Wind className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter text-white mb-1">
                        Natural<br />Breathing
                    </h3>
                    <p className="text-cyan-100 text-xs">
                        Dynamic inhalation cues.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes breath-scale {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
                    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.6; }
                }
                .animate-breath-scale {
                    animation: breath-scale 4s ease-in-out infinite;
                }
            `}</style>
        </BentoCard>
    );
}

// Card 7: Deep Context Memory (2x1)
function DeepContextMemory() {
    const memoryBars = [45, 70, 55, 85, 60, 75, 50, 80];

    return (
        <BentoCard className="bg-purple-600/20">
            <div className="flex items-center justify-between h-full">
                <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 mb-4">
                        <Database className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-white mb-1">
                        Deep Context Memory
                    </h3>
                    <p className="text-purple-100 text-sm max-w-sm">
                        Remembers personal nuances and conversation history for years, not just minutes.
                    </p>
                </div>

                {/* Mini metadata bars */}
                <div className="flex items-end gap-1.5 h-16">
                    {memoryBars.map((height, i) => (
                        <div key={i} className="relative group">
                            <div
                                className="w-3 bg-purple-500 rounded-t transition-all duration-300 hover:bg-purple-600"
                                style={{ height: `${height}%` }}
                            />
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[9px] font-mono text-purple-200">{height}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BentoCard>
    );
}


export default function Eight() {
    return (
        <div className="w-full">
            <TargetCursor 
                spinDuration={2}
                hideDefaultCursor={true}
                parallaxOn={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 auto-rows-fr">
                <div className="md:col-span-2 md:row-span-2">
                    <EmotionalNuance />
                </div>
                <div className="md:col-span-2 md:row-span-1">
                    <ZeroLagSynapse />
                </div>
                <div className="md:col-span-1 md:row-span-1">
                    <GhostPrivacy />
                </div>
                <div className="md:col-span-1 md:row-span-1">
                    <Dialects />
                </div>
                <div className="md:col-span-1 md:row-span-1">
                    <ToneMirroring />
                </div>
                <div className="md:col-span-1 md:row-span-1">
                    <NaturalBreathing />
                </div>
                <div className="md:col-span-2 md:row-span-1">
                    <DeepContextMemory />
                </div>
            </div>
        </div>
    );
}
