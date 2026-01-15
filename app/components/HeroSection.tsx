'use client';

import { useTypingEffect } from '@/lib/hooks/useTypingEffect';
import { ArrowRight, Copy, Terminal, Check } from 'lucide-react';
import { useState } from 'react';

export function HeroSection() {
    const { text: heroText } = useTypingEffect({
        text: 'Crafting buttery smooth interfaces.',
        speed: 40,
        cursor: false,
        delay: 200,
    });

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('npm install smoothkit');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative px-6 pt-32 pb-20 overflow-hidden">
            <div className="mx-auto max-w-5xl text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-full mb-8 cursor-default hover:border-[#00ff88]/30 transition-colors">
                    <div className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00ff88]"></span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-medium text-white/70">v1.0 Available</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 leading-[1.1] tracking-tight text-white">
                    Animations that feel <br />
                    <span className="italic text-white/40">natural</span> & <span className="text-[#00ff88]">smooth</span>.
                </h1>

                <p className="text-base md:text-lg text-white/50 mb-10 max-w-lg mx-auto leading-relaxed font-light">
                    A carefully crafted collection of React hooks for interactions
                    that demand perfection. 60fps, GPU accelerated, and accessible.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="group flex items-center bg-white/[0.02] border border-white/[0.08] rounded pl-4 pr-2 py-1.5 hover:border-white/[0.15] transition-colors">
                        <span className="text-white/30 mr-3 select-none">$</span>
                        <code className="font-mono text-sm text-white/90 mr-4">
                            npm install smoothkit
                        </code>
                        <button
                            onClick={handleCopy}
                            className="p-1.5 hover:bg-white/10 rounded text-white/40 hover:text-white transition-colors"
                        >
                            {copied ? <Check className="w-3 h-3 text-[#00ff88]" /> : <Copy className="w-3 h-3" />}
                        </button>
                    </div>

                    <a
                        href="/docs"
                        className="px-6 py-2.5 bg-[#00ff88] hover:bg-[#00e57a] text-[#000000] rounded font-semibold text-sm transition-all flex items-center gap-2"
                    >
                        Explore Components <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
