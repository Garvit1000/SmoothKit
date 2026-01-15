'use client';

// Re-export specific interactive demos wrapped with the new Demo component logic if needed
// Actually, the Page will render the Demo component and pass children.
// The examples need to export just their interactive contents now, or we adapt them.
// To save refactoring time, I will adapt the Page to pass children to Demo, 
// and the Examples (ScrollDemo etc) will just be the *interactive part*.
// NOTE: The previous refactor of ScrollDemo ALREADY wraps itself in <Demo>. 
// I need to change that. ScrollDemo should just be the visual part, and the Page handles the Demo wrapper + Code.
// Wait, the Replay state is inside ScrollDemo.
// So ScrollDemo needs to render <Demo> still.
// I will update ScrollDemo to take `codeHtml` as a prop.

import { useState, useRef } from 'react';
import { useSmoothScroll } from '@/lib/hooks/useSmoothScroll';
import { Demo } from '@/app/components/Demo';

export function ScrollDemo({ codeHtml }: { codeHtml: string }) {
    const [key, setKey] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollTo = useSmoothScroll({
        duration: 1200,
        offset: 20,
        easing: 'premium'
    });

    const handleReplay = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
        setKey(k => k + 1);
    };

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element && containerRef.current) {
            const container = containerRef.current;
            // Simple offset calculation for demo purposes
            // In a real scrolling container, we'd use the hook's returned function if it supported containers
            // But useSmoothScroll supports window/document scrolling mainly or specific logic
            // tailored for standard flow.
            // For this container demo, we manually scroll.
            container.scrollTo({
                top: element.offsetTop - container.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    };

    return (
        <Demo
            title="Smooth Scroll"
            description="Enhanced scroll behavior with custom easing and offset control."
            codeHtml={codeHtml}
            onReplay={handleReplay}
        >
            <div className="space-y-6" key={key}>
                <div className="flex gap-3 justify-center">
                    {[1, 2, 3].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleScrollTo(`scroll-section-${num}`)}
                            className="px-4 py-2 text-xs font-medium text-white/80 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-[#00ff88]/30 rounded-md transition-all active:scale-95"
                        >
                            Section {num}
                        </button>
                    ))}
                </div>

                <div
                    ref={containerRef}
                    className="relative h-[280px] overflow-y-auto border border-white/[0.08] rounded-xl bg-[#000000] p-6 space-y-48 custom-scrollbar scroll-smooth"
                >
                    <div id="scroll-section-1" className="p-6 bg-[#00ff88]/[0.05] border border-[#00ff88]/20 rounded-lg">
                        <span className="text-[#00ff88] font-medium block mb-1">Section 1</span>
                        <span className="text-xs text-white/40">Smooth acceleration start</span>
                    </div>

                    <div id="scroll-section-2" className="p-6 bg-[#00ff88]/[0.05] border border-[#00ff88]/20 rounded-lg">
                        <span className="text-[#00ff88] font-medium block mb-1">Section 2</span>
                        <span className="text-xs text-white/40">Mid-scroll momentum</span>
                    </div>

                    <div id="scroll-section-3" className="p-6 bg-[#00ff88]/[0.05] border border-[#00ff88]/20 rounded-lg">
                        <span className="text-[#00ff88] font-medium block mb-1">Section 3</span>
                        <span className="text-xs text-white/40">Soft deceleration landing</span>
                    </div>
                </div>
            </div>
        </Demo>
    );
}
