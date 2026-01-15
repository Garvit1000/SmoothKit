'use client';

import { highlightCode } from "@/lib/shiki";
import React, { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useSmoothScroll } from "@/lib/hooks/useSmoothScroll";
import { InstallationTabs } from "@/app/components/InstallationTabs";
import { cn } from "@/lib/utils";

export default function SmoothScrollPage() {
    const [basicCodeHtml, setBasicCodeHtml] = useState("");
    const [advancedCodeHtml, setAdvancedCodeHtml] = useState("");
    const [typesCodeHtml, setTypesCodeHtml] = useState("");
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

    // Live Demo Logic
    const scrollTo = useSmoothScroll({
        duration: 1000,
        offset: 80,
        easing: 'premium'
    });

    useEffect(() => {
        async function loadCode() {
            const basicHtml = await highlightCode(`import { useSmoothScroll } from '@/lib/hooks/useSmoothScroll';

export function ScrollButton() {
  const scrollTo = useSmoothScroll({
    duration: 1000,
    offset: 80,
    easing: 'premium'
  });

  return (
    <button onClick={() => scrollTo('#target')}>
      Scroll to Target
    </button>
  );
}`);
            setBasicCodeHtml(basicHtml);

            const advancedHtml = await highlightCode(`import { useSmoothScroll } from '@/lib/hooks/useSmoothScroll';

export function Navigation() {
  const scrollToSection = useSmoothScroll({
    duration: 1200,
    offset: 100,
    easing: 'spring'
  });

  
  const elementRef = useRef<HTMLDivElement>(null);
  
  const handleScrollToRef = () => {
    if (elementRef.current) {
      scrollToSection(elementRef.current);
    }
  };

  const handleScrollToId = () => {
    scrollToSection('#features');
  };

  return (
    <nav>
      <button onClick={handleScrollToId}>Features</button>
      <button onClick={handleScrollToRef}>Scroll to Ref</button>
    </nav>
  );
}`);
            setAdvancedCodeHtml(advancedHtml);
        }
        loadCode();
    }, []);

    return (
        <div className="max-w-3xl space-y-12">
            {/* Title Section */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Smooth Scroll</h1>
                <p className="text-lg text-white/60 leading-relaxed">
                    Programmatic smooth scrolling with advanced easing, offset control, and automatic reduced-motion support.
                </p>
            </div>

            {/* Component Preview */}
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
                        <div className="h-[350px] flex items-center justify-center relative bg-black/50 p-8">
                            <div className="text-center space-y-6">
                                <p className="text-white/40 text-sm max-w-sm mx-auto">
                                    Click the button below to experience buttery smooth scrolling to the bottom of this page.
                                </p>
                                <button
                                    onClick={() => scrollTo('#bottom')}
                                    className="px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2 mx-auto"
                                >
                                    Scroll to Bottom <ArrowDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[350px] overflow-auto custom-scrollbar bg-[#050505] p-4 text-sm font-mono">
                            <div dangerouslySetInnerHTML={{ __html: basicCodeHtml }} />
                        </div>
                    )}
                </div>
            </div>

            {/* Installation */}
            <div id="installation" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">Installation</h2>
                <InstallationTabs />
            </div>

            {/* Basic Usage */}
            <div id="usage" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">Basic Usage</h2>
                <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-lg overflow-hidden">
                    <div className="p-4 text-sm font-mono custom-scrollbar leading-relaxed" dangerouslySetInnerHTML={{ __html: basicCodeHtml }} />
                </div>
            </div>

            {/* Advanced Usage */}
            <div id="advanced" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">Advanced Usage</h2>
                <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-lg overflow-hidden">
                    <div className="p-4 text-sm font-mono custom-scrollbar leading-relaxed" dangerouslySetInnerHTML={{ __html: advancedCodeHtml }} />
                </div>
            </div>

            {/* API Reference */}
            <div id="api" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">API Reference</h2>

                {/* Options Table */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-white mb-3">Options</h3>
                        <div className="overflow-hidden border border-white/[0.08] rounded-xl bg-[#0a0a0a]">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead className="text-xs text-white/50 uppercase bg-white/[0.02] border-b border-white/[0.08]">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Property</th>
                                            <th className="px-6 py-4 font-medium">Type</th>
                                            <th className="px-6 py-4 font-medium">Default</th>
                                            <th className="px-6 py-4 font-medium">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.08]">
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    duration
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">number</td>
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40">
                                                    800
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Animation duration in milliseconds. Automatically set to 0 if user has reduced motion enabled.
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    offset
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">number</td>
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40">
                                                    0
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Offset in pixels from the top. Useful for fixed/sticky headers. Positive values scroll higher, negative values scroll lower.
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    easing
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-[#00ff88] text-xs">EasingType | EasingFunction</td>
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#ffffff05] text-white/40">
                                                    'premium'
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Easing function preset or custom function. See easing types below.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Easing Types */}
                    <div>
                        <h3 className="text-lg font-medium text-white mb-3">Easing Types</h3>
                        <div className="overflow-hidden border border-white/[0.08] rounded-xl bg-[#0a0a0a]">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead className="text-xs text-white/50 uppercase bg-white/[0.02] border-b border-white/[0.08]">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Value</th>
                                            <th className="px-6 py-4 font-medium">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.08]">
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    'linear'
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Constant speed throughout the animation
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    'ease-in'
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Slow start, fast end
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    'ease-out'
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Fast start, slow end
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    'ease-in-out'
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Slow start and end, fast middle
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    'spring'
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Spring physics with bounce effect
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    'smooth-spring'
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Gentler spring without overshoot
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    'premium'
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Premium signature cubic-bezier(0.16, 1, 0.3, 1) - buttery smooth
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    'bounce'
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Realistic bounce effect at the end
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <code className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#ffffff08] text-[#e0e0e0] border border-white/[0.06]">
                                                    {'(t) => number'}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 leading-relaxed">
                                                Custom easing function that takes progress (0-1) and returns eased value
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Return Value */}
                    <div>
                        <h3 className="text-lg font-medium text-white mb-3">Return Value</h3>
                        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-lg p-6">
                            <div className="space-y-3">
                                <div>
                                    <code className="text-[#00ff88] text-sm font-mono">
                                        {'(target: ScrollTarget) => Promise<void>'}
                                    </code>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Returns a function that accepts a scroll target and returns a Promise that resolves when the scroll animation completes.
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-white/50 text-xs font-semibold uppercase">Target Types:</p>
                                    <ul className="space-y-2 text-sm text-white/70">
                                        <li className="flex items-start gap-2">
                                            <code className="text-[#00ff88] text-xs">string</code>
                                            <span>- CSS selector (e.g., '#section', '.target')</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <code className="text-[#00ff88] text-xs">HTMLElement</code>
                                            <span>- Direct element reference from ref or querySelector</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <code className="text-[#00ff88] text-xs">null</code>
                                            <span>- No-op, promise resolves immediately</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="bottom" className="h-10" />
        </div>
    );
}
