'use client';

import { useState } from 'react';
import { useSmoothTransition } from '@/lib/hooks/useSmoothTransition';
import { Demo } from '@/app/components/Demo';
import { ChevronDown } from 'lucide-react';

export function TransitionDemo({ codeHtml }: { codeHtml: string }) {
    const [key, setKey] = useState(0);

    return (
        <Demo
            title="Auto Transition"
            description="Seamless height and width transitions that adjust to content."
            codeHtml={codeHtml}
            onReplay={() => setKey(k => k + 1)}
        >
            <div className="space-y-4 w-full max-w-sm mx-auto" key={key}>
                <AccordionItem title="How does auto-height work?">
                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                        SmoothKit uses a ResizeObserver to calculate height before animating.
                    </p>
                    <div className="h-16 bg-[#00ff88]/10 rounded border border-[#00ff88]/10 flex items-center justify-center">
                        <span className="text-xs text-[#00ff88]">Dynamic Content</span>
                    </div>
                </AccordionItem>

                <AccordionItem title="Is it GPU accelerated?">
                    <p className="text-sm text-white/60 leading-relaxed">
                        Yes! We force GPU layer promotion using <code>translate3d</code>.
                    </p>
                </AccordionItem>
            </div>
        </Demo>
    );
}

function AccordionItem({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [ref, bind] = useSmoothTransition({ duration: 400 });

    return (
        <div className="border border-white/8 rounded-xl overflow-hidden bg-white/2 hover:border-[#00ff88]/30 transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white/2 transition-colors"
            >
                <span className="text-sm font-medium text-white/80">{title}</span>
                <ChevronDown
                    className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00ff88]' : ''}`}
                />
            </button>
            <div ref={ref} {...bind}>
                {isOpen && (
                    <div className="px-4 py-4 border-t border-white/5">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
