'use client';

import { highlightCode } from "@/lib/shiki";
import React, { useEffect, useState } from "react";
import { Check, Copy, RefreshCw, Layers } from "lucide-react";
import { useSmoothStagger } from "@/lib/hooks/useSmoothStagger";
import { InstallationTabs } from "@/app/components/InstallationTabs";
import { cn } from "@/lib/utils";

const DEMO_ITEMS = ["Animation", "Performance", "Accessibility", "Experience", "Design"];

export default function SmoothStaggerPage() {
    const [codeHtml, setCodeHtml] = useState("");
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [demoKey, setDemoKey] = useState(0);

    const handleReplay = () => {
        setDemoKey(prev => prev + 1);
    };

    useEffect(() => {
        async function loadCode() {
            const html = await highlightCode(`import { useSmoothStagger } from 'smoothkit';

export function StaggerList() {
  const { getStyle, replay } = useSmoothStagger({
    delay: 80, // ms between items
    initialDelay: 100
  });

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div 
          key={item} 
          style={getStyle(i)}
          className="p-4 bg-white/5 rounded-lg text-white border border-white/10"
        >
          {item}
        </div>
      ))}
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
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Smooth Stagger</h1>
                <p className="text-base md:text-lg text-white/60 leading-relaxed">
                    Orchestrate beautiful list entrance animations. Coordinating delays manually is tedious—this hook makes it effortless.
                </p>
            </div>

            {/* Component Preview Tabs */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/8">
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

                <div className="border border-white/8 rounded-xl overflow-hidden bg-[#0a0a0a]">
                    {activeTab === 'preview' ? (
                        <div className="min-h-75 md:min-h-100 flex items-center justify-center relative bg-black/50 p-4 md:p-8">
                            {/* Live List Sub-component */}
                            <StaggerDemo key={demoKey} />
                        </div>
                    ) : (
                        <div className="min-h-75 md:h-100 overflow-auto custom-scrollbar bg-[#050505] p-3 md:p-4 text-xs md:text-sm font-mono">
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
                <div className="bg-[#0a0a0a] border border-white/8 rounded-lg overflow-hidden relative group">
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
                <div className="overflow-hidden border border-white/8 rounded-xl bg-[#0a0a0a]">
                    <div className="overflow-x-auto -mx-4 md:mx-0">
                        <div className="inline-block min-w-full align-middle px-4 md:px-0">
                            <table className="w-full text-xs md:text-sm text-left border-collapse">
                                <thead className="text-[10px] md:text-xs text-white/50 uppercase bg-white/2 border-b border-white/8">
                                    <tr>
                                        <th className="px-3 md:px-6 py-3 md:py-4 font-medium whitespace-nowrap">Property</th>
                                        <th className="px-3 md:px-6 py-3 md:py-4 font-medium whitespace-nowrap">Type</th>
                                        <th className="px-3 md:px-6 py-3 md:py-4 font-medium whitespace-nowrap">Default</th>
                                        <th className="px-3 md:px-6 py-3 md:py-4 font-medium">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/8">
                                    <tr className="group hover:bg-white/2 transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/6 font-mono">
                                                delay
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">number</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                50
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Delay between each item's entrance in ms.
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/2 transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/6 font-mono">
                                                initialDelay
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">number</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                0
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Initial delay before the first item starts.
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/2 transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/6 font-mono">
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
                                            Animation type for items (fade-up, scale, etc).
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

function StaggerDemo() {
    const { getStyle } = useSmoothStagger({
        delay: 80,
        initialDelay: 100
    });

    return (
        <div className="w-full max-w-sm space-y-3 px-4">
            {DEMO_ITEMS.map((item, i) => (
                <div
                    key={i}
                    style={getStyle(i)}
                    className="p-3 md:p-4 bg-[#111] backdrop-blur-sm rounded-lg text-white border border-white/8 flex items-center gap-2 md:gap-3 shadow-lg group hover:bg-[#1a1a1a] transition-colors"
                >
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/5 flex items-center justify-center text-[#00ff88] group-hover:scale-110 transition-transform">
                        <Layers className="w-3 h-3" />
                    </div>
                    <span className="font-medium text-xs md:text-sm text-white/90">{item}</span>
                </div>
            ))}
        </div>
    );
}
