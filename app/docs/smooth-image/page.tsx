'use client';

import { highlightCode } from "@/lib/shiki";
import React, { useEffect, useState } from "react";
import { Check, Copy, RefreshCw, FileText } from "lucide-react";
import { useSmoothImageLoad } from "@/lib/hooks/useSmoothImageLoad";
import { InstallationTabs } from "@/app/components/InstallationTabs";
import { cn } from "@/lib/utils";

export default function SmoothImagePage() {
    const [codeHtml, setCodeHtml] = useState("");
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [demoKey, setDemoKey] = useState(0);

    const handleReplay = () => {
        setDemoKey(p => p + 1);
    };

    useEffect(() => {
        async function loadCode() {
            const html = await highlightCode(`import { useSmoothImageLoad } from 'smoothkit';

export function ImageComponent() {
  const { ref, isLoaded, style } = useSmoothImageLoad({
    fadeInDuration: 600,
    blur: true
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white/5">
      <img 
        ref={ref}
        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200"
        alt="Demo"
        style={style}
        className="w-full h-full object-cover"
      />
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
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Smooth Image Load</h1>
                <p className="text-lg text-white/60 leading-relaxed">
                    Eliminate layout shifts and jarring image pops. A hook that gracefully fades and sharpens images as they load.
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
                        <div className="h-[400px] flex items-center justify-center relative bg-[#111] p-8">
                            {/* Live Image Demo Wrapper */}
                            <ImageDemo key={demoKey} />
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
                                            fadeInDuration
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">number</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            600
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        Duration of the fade-in effect in ms.
                                    </td>
                                </tr>
                                <tr className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                            blur
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">boolean</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            false
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        Whether to apply a blur effect while loading.
                                    </td>
                                </tr>
                                <tr className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06] font-mono">
                                            blurAmount
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">number</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                            10
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 leading-relaxed">
                                        Amount of blur in pixels (if blur is true).
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

function ImageDemo() {
    const baseUrl = "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1600&auto=format&fit=crop";
    const thumbUrl = `${baseUrl}&w=20&blur=10`;

    // 1. Safe Client-Side Rendering
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="w-full max-w-lg aspect-video rounded-lg overflow-hidden relative shadow-2xl bg-[#111]">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${thumbUrl})`,
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)'
                }}
            />
            {mounted && <SmoothImageLoader baseUrl={baseUrl} />}
        </div>
    );
}

function SmoothImageLoader({ baseUrl }: { baseUrl: string }) {
    const [src] = useState(() => `${baseUrl}&t=${Date.now()}`);

    const { ref, style } = useSmoothImageLoad({
        fadeInDuration: 1200,
        blur: true,
        blurAmount: 20
    });

    return (
        <img
            ref={ref}
            src={src}
            alt="Smooth Load Demo"
            style={style}
            className="w-full h-full object-cover relative z-10"
        />
    );
}
