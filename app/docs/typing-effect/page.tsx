'use client';

import { highlightCode } from "@/lib/shiki";
import React, { useEffect, useState, useRef } from "react";
import { Copy, RefreshCw, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useTypingEffect } from "@/lib/hooks/useTypingEffect";
import { InstallationTabs } from "@/app/components/InstallationTabs";
import { cn } from "@/lib/utils";

function TypingDemo({ demoKey }: { demoKey: number }) {
    return (
        <div className="flex items-center justify-center min-h-50 w-full">
            <TypingContent key={demoKey} />
        </div>
    );
}

function TypingContent() {
    // Memoize the configuration
    const options = React.useMemo(() => ({
        text: ['Crafting buttery smooth interfaces.', 'Animations that feel natural.', '60fps performance.'],
        speed: 40,
        pauseDuration: 1500,
        loop: false,
        cursor: true
    }), []);

    const { text, cursorOpacity } = useTypingEffect(options);

    return (
        <div className="text-center px-4">
            <div className="font-serif text-2xl md:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                {text.replace('|', '')}
                <span
                    className="inline-block w-0.5 h-6 md:h-8 bg-[#00ff88] ml-1 align-middle"
                    style={{ opacity: cursorOpacity }}
                />
            </div>
        </div>
    );
}



export default function TypingEffectPage() {
    const [codeHtml, setCodeHtml] = useState("");
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

    const [demoKey, setDemoKey] = useState(0);

    const handleReplay = () => {
        setDemoKey(prev => prev + 1);
    };

    useEffect(() => {
        // ... hook loadCode ...
        async function loadCode() {
            const html = await highlightCode(`import { useTypingEffect } from 'smoothkit';

export function HeroTyping() {
  const { text, cursorOpacity } = useTypingEffect({
    text: ['Crafting buttery smooth interfaces.', 'Animations that feel natural.'],
    speed: 40,
    loop: true
  });

  return (
    <h1 className="text-4xl font-serif text-white">
      {text.replace('|', '')}
      <span style={{ opacity: cursorOpacity }}>|</span>
    </h1>
  );
}`);
            setCodeHtml(html);
        }
        loadCode();
    }, []);

    return (
        <div className="max-w-3xl space-y-8 md:space-y-12">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Typing Effect</h1>
                <p className="text-base md:text-lg text-white/60 leading-relaxed">
                    A realistic typing effect with customizable speed, looping, and cursor blinking.
                </p>
            </div>

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
                        <div className="min-h-75 md:h-87.5 flex items-center justify-center relative bg-black/50 overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/3 via-transparent to-transparent" />
                            <TypingDemo demoKey={demoKey} />
                        </div>
                    ) : (
                        <div className="min-h-75 md:h-87.5 overflow-auto custom-scrollbar bg-[#050505] p-3 md:p-4 text-xs md:text-sm font-mono">
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
                                                text
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">string | string[]</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                -
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Text or array of strings to type.
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/2 transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/6 font-mono">
                                                speed
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">number</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                50
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Typing speed in milliseconds per char.
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/2 transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/6 font-mono">
                                                loop
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">boolean</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                false
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Whether to loop through the strings infinitely.
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/2 transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/6 font-mono">
                                                cursor
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 font-mono text-[#00ff88] text-[10px] md:text-xs whitespace-nowrap">boolean</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40 font-mono">
                                                true
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-white/70 leading-relaxed">
                                            Whether to show the blinking cursor.
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
