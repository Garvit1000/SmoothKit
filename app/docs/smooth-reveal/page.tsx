'use client';

import { highlightCode } from "@/lib/shiki";
import React, { useEffect, useState } from "react";
import { Check, Copy, RefreshCw, MessageCircle, Heart, Share2 } from "lucide-react";
import { useSmoothReveal } from "@/lib/hooks/useSmoothReveal";
import { InstallationTabs } from "@/app/components/InstallationTabs";
import { cn } from "@/lib/utils";

export default function SmoothRevealPage() {
    const [codeHtml, setCodeHtml] = useState("");
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [demoKey, setDemoKey] = useState(0);

    const handleReplay = () => {
        setDemoKey(prev => prev + 1);
    };

    useEffect(() => {
        async function loadCode() {
            const html = await highlightCode(`import { useSmoothReveal } from 'smoothkit';

export function ChatMessage({ children, delay = 0 }) {
  const ref = useSmoothReveal({
    animation: 'slide-up',
    duration: 600,
    delay: delay // Stagger entrance
  });

  return (
    <div 
      ref={ref} 
      className="max-w-[80%] p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
    >
      {children}
    </div>
  );
}`);
            setCodeHtml(html);
        }
        loadCode();
    }, []);

    return (
        <div className="max-w-3xl space-y-8 md:space-y-12">
            {/* Title Section */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Smooth Reveal</h1>
                <p className="text-base md:text-lg text-white/60 leading-relaxed">
                    Animate elements as they enter the viewport. Supports fade, slide, and scale effects with zero layout shift.
                </p>
            </div>

            {/* Component Preview Tabs */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08]">
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={cn(
                                "px-4 py-2 border-b-2 transition-colors",
                                activeTab === 'preview' ? "border-[#00ff88] text-[#00ff88]" : "border-transparent text-white/60 hover:text-white"
                            )}
                        >
                            Preview
                        </button>
                        <button
                            onClick={() => setActiveTab('code')}
                            className={cn(
                                "px-4 py-2 border-b-2 transition-colors",
                                activeTab === 'code' ? "border-[#00ff88] text-[#00ff88]" : "border-transparent text-white/60 hover:text-white"
                            )}
                        >
                            Code
                        </button>
                    </div>
                    <button onClick={handleReplay} className="px-3 py-1.5 text-xs flex items-center gap-1.5 text-white/60 hover:text-white transition-colors mb-1 mr-1">
                        <RefreshCw className="w-3 h-3" /> Replay
                    </button>
                </div>

                <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#050505]">
                    {activeTab === 'preview' ? (
                        <div className="min-h-[350px] md:h-[450px] flex items-center justify-center relative bg-[url(https://grainy-gradients.vercel.app/noise.svg)]">
                            {/* Live Demo Wrapper for Centering */}
                            <div className="w-full max-w-sm">
                                <RevealFeedDemo key={demoKey} />
                            </div>
                        </div>
                    ) : (
                        <div className="min-h-[350px] md:h-[450px] overflow-auto custom-scrollbar bg-[#050505] p-3 md:p-4 text-xs md:text-sm font-mono">
                            <div dangerouslySetInnerHTML={{ __html: codeHtml }} />
                        </div>
                    )}
                </div>
            </div>

            {/* Installation */}
            <div id="installation" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">Installation</h2>
                <InstallationTabs />
            </div>

            {/* Usage */}
            <div id="usage" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">Usage</h2>
                <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-lg overflow-hidden relative group">
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-xs text-white/30 bg-black/50 px-2 py-1 rounded">typescript</div>
                    </div>
                    <div
                        className="p-4 text-sm font-mono custom-scrollbar leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: codeHtml }}
                    />
                </div>
            </div>

            {/* API Reference */}
            <div id="api" className="scroll-mt-20">
                <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6 tracking-tight">API Reference</h2>
                <div className="overflow-hidden border border-white/[0.08] rounded-xl bg-[#0a0a0a]">
                    <div className="overflow-x-auto -mx-4 md:mx-0">
                        <div className="inline-block min-w-full align-middle px-4 md:px-0">
                            <table className="w-full text-xs md:text-sm text-left border-collapse">
                                <thead className="text-[10px] md:text-xs text-white/50 uppercase bg-white/[0.02] border-b border-white/[0.08]">
                                    <tr>
                                        <th className="px-3 md:px-6 py-3 md:py-4 font-medium whitespace-nowrap">Property</th>
                                        <th className="px-3 md:px-6 py-3 md:py-4 font-medium whitespace-nowrap">Type</th>
                                        <th className="px-3 md:px-6 py-3 md:py-4 font-medium whitespace-nowrap">Default</th>
                                        <th className="px-3 md:px-6 py-3 md:py-4 font-medium">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.08]">
                                    <tr className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                                animation
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">string</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                'fade-up'
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Type of animation (fade-up, fade-in, scale, slide-left, etc).
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                                duration
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">number</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                600
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Animation duration in milliseconds.
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                                delay
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">number</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                0
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Delay before animation starts in ms.
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                                threshold
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">number</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                0.1
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Viewport intersection threshold (0-1).
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RevealFeedDemo() {
    return (
        <div className="space-y-4 w-full px-4 md:px-6">
            <ChatBubble delay={100} align="left">
                <p className="text-sm text-white/80">Hey! Have you tried the new update? </p>
            </ChatBubble>

            <ChatBubble delay={300} align="right" variant="primary">
                <p className="text-sm text-black font-medium">Yeah! The animations are incredibly smooth now.</p>
            </ChatBubble>

            <ChatBubble delay={500} align="left">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded bg-white/10" />
                    <div className="h-2 w-20 bg-white/10 rounded" />
                </div>
                <p className="text-sm text-white/80">It feels native. Minimal layout shifts too.</p>
            </ChatBubble>

            <ChatBubble delay={700} align="right" variant="primary">
                <Heart className="w-4 h-4 fill-black/20 text-black/40" />
            </ChatBubble>
        </div>
    );
}

function ChatBubble({ children, delay, align = 'left', variant = 'default' }: { children: React.ReactNode, delay: number, align?: 'left' | 'right', variant?: 'default' | 'primary' }) {
    const ref = useSmoothReveal({
        animation: align === 'left' ? 'slide-left' : 'slide-up',
        duration: 700,
        threshold: 0.1,
    });

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <div className={cn("flex w-full", align === 'right' ? "justify-end" : "justify-start")}>
            <div
                ref={ref}
                style={{ transitionDelay: `${delay}ms` }}
                className={cn(
                    "max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl shadow-lg border backdrop-blur-sm",
                    variant === 'primary'
                        ? "bg-[#00ff88] border-[#00ff88] text-[#000000] rounded-tr-sm"
                        : "bg-[#111] border-white/10 text-white rounded-tl-sm"
                )}
            >
                {children}
            </div>
        </div>
    );
}
