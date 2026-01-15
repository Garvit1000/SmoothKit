'use client';

import { useState, useRef } from 'react';
import { useSmoothReveal } from '@/lib/hooks/useSmoothReveal';
import { Demo } from '@/app/components/Demo';

export function RevealDemo({ codeHtml }: { codeHtml: string }) {
    const [key, setKey] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleReplay = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
        }
        setTimeout(() => setKey(k => k + 1), 50);
    };

    return (
        <Demo
            title="Viewport Reveal"
            description="Trigger smooth entrance animations when elements enter the viewport."
            codeHtml={codeHtml}
            onReplay={handleReplay}
        >
            <div className="space-y-4">
                <div className="text-center mb-4">
                    <span className="text-xs text-white/30 animate-pulse">↓ Scroll down to trigger reveals</span>
                </div>

                <div
                    ref={containerRef}
                    className="h-[320px] overflow-y-auto border border-white/[0.08] rounded-xl bg-[#000000] p-6 space-y-12 custom-scrollbar scroll-smooth"
                >
                    <div className="h-20 flex items-center justify-center border border-dashed border-white/10 rounded-lg">
                        <span className="text-xs text-white/20">Scroll Spacer</span>
                    </div>

                    <RevealItem animation="fade" label="Fade In" key={`fade-${key}`} />
                    <RevealItem animation="slide-up" label="Slide Up" key={`slide-${key}`} />
                    <RevealItem animation="scale" label="Scale In" key={`scale-${key}`} />

                    <div className="h-20 flex items-center justify-center border border-dashed border-white/10 rounded-lg">
                        <span className="text-xs text-white/20">End</span>
                    </div>
                </div>
            </div>
        </Demo>
    );
}

function RevealItem({ animation, label }: { animation: any, label: string }) {
    const ref = useSmoothReveal({ animation, duration: 800 });

    return (
        <div ref={ref} className="p-6 bg-[#00ff88]/[0.05] border border-[#00ff88]/20 rounded-lg shadow-[0_0_30px_-10px_rgba(0,255,136,0.05)]">
            <div className="text-[#00ff88] font-medium mb-1">{label}</div>
            <div className="text-xs text-white/40">Animation: {animation}</div>
        </div>
    );
}
