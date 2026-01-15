'use client';

import React from 'react';
import { RotateCcw, Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface DemoProps {
    title: string;
    description: string;
    codeHtml: string;
    children: React.ReactNode;
    onReplay?: () => void;
}

export function Demo({ title, description, codeHtml, children, onReplay }: DemoProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group scroll-mt-32 relative z-10" id={title.toLowerCase().replace(/\s+/g, '-')}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-white/[0.08] pb-6">
                <div>
                    <h3 className="text-xl font-serif font-medium mb-2 text-white">{title}</h3>
                    <p className="text-white/50 text-xs max-w-lg leading-relaxed">{description}</p>
                </div>
                {onReplay && (
                    <button
                        onClick={onReplay}
                        className="flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium text-[#00ff88] bg-[#00ff88]/[0.05] border border-[#00ff88]/20 rounded hover:bg-[#00ff88]/10 transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" />
                        Replay
                    </button>
                )}
            </div>

            <div className="grid lg:grid-cols-2 border border-white/[0.08] rounded-lg overflow-hidden bg-[#0a0a0a]">
                {/* Live Demo */}
                <div className="relative border-b lg:border-b-0 lg:border-r border-white/[0.08] p-8 flex flex-col justify-center min-h-[400px] bg-black overflow-hidden">
                    {/* Visible Noise Texture for Demo Side - Opacity boosted to 0.12 */}
                    <div className="absolute inset-0 opacity-[0.12] pointer-events-none z-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                        }}
                    />

                    <div className="w-full max-w-md mx-auto relative z-10">
                        {children}
                    </div>
                </div>

                {/* Code */}
                <div className="bg-[#050505] flex flex-col min-h-[400px] relative group/code text-white">
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity">
                        <button
                            onClick={handleCopy}
                            className="p-1.5 text-white/30 hover:text-white transition-colors bg-white/5 rounded"
                        >
                            {copied ? <Check className="w-3.5 h-3.5 text-[#00ff88]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                    </div>
                    <div
                        className="flex-1 overflow-auto p-6 text-[11px] font-mono leading-relaxed custom-scrollbar opacity-90"
                        dangerouslySetInnerHTML={{ __html: codeHtml }}
                        style={{ backgroundColor: 'transparent' }}
                    />
                </div>
            </div>
        </div>
    );
}
