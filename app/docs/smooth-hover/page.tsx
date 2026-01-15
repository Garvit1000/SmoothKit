'use client';

import { highlightCode } from "@/lib/shiki";
import React, { useEffect, useState } from "react";
import { Check, Copy, RefreshCw, FileText, ArrowUpRight } from "lucide-react";
import { useSmoothHover } from "@/lib/hooks/useSmoothHover";
import { InstallationTabs } from "@/app/components/InstallationTabs";
import { cn } from "@/lib/utils";

export default function SmoothHoverPage() {
    const [codeHtml, setCodeHtml] = useState("");
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

    // Live Demo Logic
    const [demoKey, setDemoKey] = useState(0);

    const handleReplay = () => {
        setDemoKey(p => p + 1);
    };

    useEffect(() => {
        async function loadCode() {
            const html = await highlightCode(`import { useSmoothHover } from 'smoothkit';

export function MinimalCard() {
  const { ref, style, bind } = useSmoothHover({
    scale: 1.02,
    translateY: -5,
    shadow: '0 20px 40px -12px rgba(0,0,0,0.5)'
  });

  return (
    <div 
      ref={ref}
      style={style}
      {...bind}
      className="p-6 bg-white rounded-xl w-64 cursor-pointer"
    >
      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white mb-4">
        <ArrowUpRight className="w-5 h-5" />
      </div>
      
      <h3 className="text-black font-semibold text-lg">Clean Design</h3>
      <p className="text-gray-500 text-sm mt-2">
        A minimalist approach to hover effects.
      </p>
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
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Smooth Hover</h1>
                <p className="text-lg text-white/60 leading-relaxed">
                    Create a premium "magnetic" feel for cards and buttons. Smoothly lifts elements with scale, translation, and shadow.
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
                        <div className="h-[400px] flex items-center justify-center relative bg-[#111]">
                            {/* Live Card Demo Component - Background Removed */}
                            <HoverDemo key={demoKey} />
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
                                            scale
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">number</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            1.05
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        Scale factor applied to the element on hover.
                                    </td>
                                </tr>
                                <tr className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                            translateY
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">number</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            -5
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        Vertical translation in pixels applied on hover.
                                    </td>
                                </tr>
                                <tr className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                            shadow
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">string</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            medium
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        Box-shadow string or preset applied on hover.
                                    </td>
                                </tr>
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
                                        Transition duration in milliseconds.
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

function HoverDemo() {
    const { ref: cardRef, style, bind } = useSmoothHover({
        scale: 1.02,
        translateY: -5,
        shadow: '0 20px 40px -12px rgba(0,0,0,0.5)'
    });

    return (
        <div
            ref={cardRef}
            style={style}
            {...bind}
            className="p-8 bg-white rounded-xl w-64 cursor-pointer"
        >
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white mb-6">
                <ArrowUpRight className="w-6 h-6" />
            </div>

            <h3 className="text-black font-bold text-xl mb-2">Minimalist</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
                Less is more. A clean, high-contrast card that pops.
            </p>
        </div>
    );
}
