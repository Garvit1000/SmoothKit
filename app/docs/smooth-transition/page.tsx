'use client';

import { highlightCode } from "@/lib/shiki";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSmoothTransition } from "@/lib/hooks/useSmoothTransition";
import { InstallationTabs } from "@/app/components/InstallationTabs";
import { cn } from "@/lib/utils";

function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [ref, bind] = useSmoothTransition<HTMLDivElement>({ duration: 400 });

    return (
        <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-white/[0.02] hover:border-[#00ff88]/30 transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
                <span className="font-medium text-white">{title}</span>
                <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00ff88]' : ''}`} />
            </button>
            <div ref={ref} {...bind}>
                {isOpen && (
                    <div className="px-6 py-4 border-t border-white/[0.05]">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}

function TransitionDemo() {
    return (
        <div className="w-full max-w-md mx-auto space-y-3">
            <AccordionItem title="How does it work?" defaultOpen={true}>
                <p className="text-sm text-white/70 leading-relaxed mb-3">
                    This hook uses MutationObserver to detect content changes and smoothly animates height from 0 to auto.
                </p>
                <div className="h-20 bg-[#00ff88]/10 rounded border border-[#00ff88]/10 flex items-center justify-center">
                    <span className="text-xs text-[#00ff88]">Dynamic Content</span>
                </div>
            </AccordionItem>

            <AccordionItem title="Is it GPU accelerated?">
                <p className="text-sm text-white/70 leading-relaxed">
                    Yes! The hook uses <code className="px-1.5 py-0.5 bg-white/10 rounded text-[#00ff88] text-xs">willChange</code> and smooth cubic-bezier easing for 60fps animations.
                </p>
            </AccordionItem>

            <AccordionItem title="Does it prevent layout shift?">
                <p className="text-sm text-white/70 leading-relaxed">
                    Absolutely. Unlike max-height transitions, this animates the actual computed height without causing reflows.
                </p>
            </AccordionItem>
        </div>
    );
}

export default function SmoothTransitionPage() {
    const [codeHtml, setCodeHtml] = useState("");
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

    useEffect(() => {
        async function loadCode() {
            const html = await highlightCode(`import { useSmoothTransition } from 'smoothkit';

export function Accordion() {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, bind] = useSmoothTransition({
    property: 'height',
    duration: 400
  });

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      
      {isOpen && (
        <div ref={ref} {...bind}>
          <div className="p-4">
            Content goes here...
          </div>
        </div>
      )}
    </div>
  );
}`);
            setCodeHtml(html);
        }
        loadCode();
    }, []);

    return (
        <div className="max-w-3xl space-y-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Smooth Transition</h1>
                <p className="text-lg text-white/60 leading-relaxed">
                    Animate height and width to 'auto' automatically. Solves the classic CSS animation limitation.
                </p>
            </div>

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
                </div>

                <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#0a0a0a]">
                    {activeTab === 'preview' ? (
                        <div className="h-[450px] flex items-center justify-center relative bg-black/50 overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
                            <TransitionDemo />
                        </div>
                    ) : (
                        <div className="h-[450px] overflow-auto custom-scrollbar bg-[#050505] p-4 text-sm font-mono">
                            <div dangerouslySetInnerHTML={{ __html: codeHtml }} />
                        </div>
                    )}
                </div>
            </div>

            <div id="installation" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">Installation</h2>
                <InstallationTabs />
            </div>

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

            <div id="api" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">API Reference</h2>
                <div className="overflow-hidden border border-white/[0.08] rounded-xl bg-[#0a0a0a]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="text-xs text-white/50 uppercase bg-white/[0.02] border-b border-white/[0.08]">
                                <tr>
                                    <th className="px-6 py-4 font-medium w-1/4">Property</th>
                                    <th className="px-6 py-4 font-medium w-1/4">Type</th>
                                    <th className="px-6 py-4 font-medium w-1/4">Default</th>
                                    <th className="px-6 py-4 font-medium w-1/4">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.08]">
                                <tr className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                            duration
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">number</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            300
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        Transition duration in ms.
                                    </td>
                                </tr>
                                <tr className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                            property
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">string</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            'height'
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        Property to animate ('height', 'width', or 'both').
                                    </td>
                                </tr>
                                <tr className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                            easing
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">string</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            'cubic-bezier(0.16, 1, 0.3, 1)'
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        CSS easing function.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="h-10" />
        </div>
    );
}
