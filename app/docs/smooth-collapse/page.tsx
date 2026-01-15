'use client';

import { highlightCode } from "@/lib/shiki";
import React, { useEffect, useState } from "react";
import { Check, Copy, ChevronDown } from "lucide-react";
import { useSmoothCollapse } from "@/lib/hooks/useSmoothCollapse";
import { InstallationTabs } from "@/app/components/InstallationTabs";
import { cn } from "@/lib/utils";

export default function SmoothCollapsePage() {
    const [codeHtml, setCodeHtml] = useState("");
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

    useEffect(() => {
        async function loadCode() {
            const html = await highlightCode(`import { useSmoothCollapse } from 'smoothkit';
import { ChevronDown } from 'lucide-react';

export function AccordionItem() {
  const { isOpen, toggle, ref, style } = useSmoothCollapse();

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-[#111]">
      <button 
        onClick={toggle}
        className="w-full flex items-center justify-between p-4 text-left font-medium text-white hover:bg-white/5 transition-colors"
      >
        <span>What makes this smooth?</span>
        <ChevronDown 
          className={\`w-5 h-5 transition-transform duration-300 \${isOpen ? 'rotate-180' : ''}\`} 
        />
      </button>
      
      <div ref={ref} style={style}>
        <div className="p-4 pt-0 text-white/60 text-sm leading-relaxed border-t border-white/5">
          This content expands and collapses with a natural spring-like ease. 
          Unlike standard CSS transitions on height: auto, this hook handles 
          the layout calculations for you automatically.
        </div>
      </div>
    </div>
  );
}`);
            setCodeHtml(html);
        }
        loadCode();
    }, []);

    return (
        <div className="max-w-3xl space-y-12">
            {/* Title Section */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Smooth Collapse</h1>
                <p className="text-lg text-white/60 leading-relaxed">
                    The missing piece for generic height animations. Animate to and from "height: auto" effortlessly.
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
                </div>

                <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#0a0a0a]">
                    {activeTab === 'preview' ? (
                        <div className="h-[400px] flex items-center justify-center relative bg-black/50 p-8">
                            {/* Live Accordion Demo */}
                            <CollapseDemo />
                        </div>
                    ) : (
                        <div className="h-[400px] overflow-auto custom-scrollbar bg-[#050505] p-4 text-sm font-mono">
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
                                            easing
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">string</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            'ease'
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        CSS easing function.
                                    </td>
                                </tr>
                                <tr className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                            initialOpen
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">boolean</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            false
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        Whether the content starts expanded.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CollapseDemo() {
    const { isOpen, toggle, ref, style } = useSmoothCollapse({
        duration: 400
    });

    return (
        <div className="w-full max-w-md">
            <div className="border border-white/[0.08] rounded-lg overflow-hidden bg-[#111]">
                <button
                    onClick={toggle}
                    className="w-full flex items-center justify-between p-4 text-left font-medium text-white hover:bg-white/5 transition-colors"
                >
                    <span>Why use SmoothKit?</span>
                    <ChevronDown
                        className={`w-5 h-5 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                <div ref={ref} style={style}>
                    <div className="p-4 pt-0 text-white/60 text-sm leading-relaxed border-t border-white/[0.08]">
                        SmoothKit solves the complex problem of animating height to "auto" in CSS.
                        Normally, browsers cannot transition between "0" and "auto".
                        This hook calculates the exact pixel height needed, performs the transition,
                        and then resets to auto for responsiveness.
                    </div>
                </div>
            </div>
        </div>
    );
}
