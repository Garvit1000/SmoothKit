'use client';

import { highlightCode } from "@/lib/shiki";
import React, { useEffect, useState, useRef } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useSmoothCounter } from "@/lib/hooks/useSmoothCounter";
import { InstallationTabs } from "@/app/components/InstallationTabs";
import { cn } from "@/lib/utils";

function CounterDemo() {
    return (
        <div className="w-full flex justify-center items-center">
            <CounterDisplay />
        </div>
    );
}

function CounterDisplay() {
    const count = useSmoothCounter({
        from: 0,
        to: 10000,
        duration: 2500,
        decimals: 0,
    });

    return (
        <div className="text-center space-y-4 px-4">
            <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                {count.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-white/40 font-mono">
                Active Users
            </div>
        </div>
    );
}

export default function SmoothCounterPage() {
    const [codeHtml, setCodeHtml] = useState("");
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

    const [demoKey, setDemoKey] = useState(0);

    const handleReplay = () => {
        setDemoKey(prev => prev + 1);
    };

    useEffect(() => {
        // ...
        async function loadCode() {
            const html = await highlightCode(`import { useSmoothCounter } from 'smoothkit';

export function Counter() {
  const count = useSmoothCounter({
    from: 0,
    to: 10000,
    duration: 2500
  });

  return (
    <div className="text-4xl font-bold">
      {count.toLocaleString()}
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
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Smooth Counter</h1>
                <p className="text-base md:text-lg text-white/60 leading-relaxed">
                    Animate numerical values with easing and precision. Perfect for dashboards and stats.
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

                <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#0a0a0a]">
                    {activeTab === 'preview' ? (
                        <div className="min-h-[300px] md:h-[350px] flex items-center justify-center relative bg-black/50 overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent" />
                            <CounterDemo key={demoKey} />
                        </div>
                    ) : (
                        <div className="min-h-[300px] md:h-[350px] overflow-auto custom-scrollbar bg-[#050505] p-3 md:p-4 text-xs md:text-sm font-mono">
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
                                                from
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">number</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                0
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Starting value of the counter.
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                                to
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">number</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                100
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Target value to animate to.
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
                                                1000
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Animation duration in milliseconds.
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                                decimals
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">number</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                0
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Number of decimal places to show.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-10" />
        </div>
    );
}
