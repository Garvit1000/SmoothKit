'use client';

import { InstallationTabs } from "@/app/components/InstallationTabs";
import { Zap, Feather, ArrowRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IntroductionPage() {
    return (
        <div className="max-w-3xl space-y-8 md:space-y-12">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 md:mb-6">Introduction</h1>
                <p className="text-base md:text-xl text-white/60 leading-relaxed mb-6 md:mb-8">
                    SmoothKit is a collection of lightweight, copy-paste React hooks for silky smooth interactions.
                    Built for developers who care about the details but don’t want the overhead of heavy animation libraries.
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                    <a
                        href="/docs/smooth-image"
                        className="px-4 md:px-6 py-2.5 md:py-3 bg-[#00ff88] text-black text-sm md:text-base font-semibold rounded-lg hover:bg-[#00e57a] transition-all flex items-center gap-2"
                    >
                        Explore Components <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                        href="https://github.com/your-repo/smoothkit"
                        target="_blank"
                        className="px-4 md:px-6 py-2.5 md:py-3 bg-white/5 text-white text-sm md:text-base font-medium rounded-lg hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2"
                    >
                        <Github className="w-4 h-4" /> GitHub
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-4 md:p-6 bg-[#0a0a0a] border border-white/8 rounded-xl group hover:border-white/12 transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#00ff88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-[#00ff88]/10 rounded-lg flex items-center justify-center text-[#00ff88] mb-3 md:mb-4 relative z-10">
                        <Zap className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-white font-medium mb-2 text-base md:text-lg relative z-10">Zero Layout Shift</h3>
                    <p className="text-xs md:text-sm text-white/60 leading-relaxed relative z-10">
                        Hooks like <code className="text-[#00ff88]">useSmoothImageLoad</code> and <code className="text-[#00ff88]">useSmoothCollapse</code> are designed specifically to prevent layout thrashing and jarring jumps.
                    </p>
                </div>
                <div className="p-4 md:p-6 bg-[#0a0a0a] border border-white/8 rounded-xl group hover:border-white/12 transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#00ff88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-[#00ff88]/10 rounded-lg flex items-center justify-center text-[#00ff88] mb-3 md:mb-4 relative z-10">
                        <Feather className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-white font-medium mb-2 text-base md:text-lg relative z-10">Lightweight</h3>
                    <p className="text-xs md:text-sm text-white/60 leading-relaxed relative z-10">
                        Tiny footprint. Most hooks use native CSS transitions or lightweight RAF loops. No heavy bundles, no bloat.
                    </p>
                </div>
            </div>

            <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Installation</h2>
                <p className="text-white/60 max-w-2xl">
                    Functionality is modular. You can install the core package to get all hooks, or just copy-paste individual files to keep your project lean.
                </p>
                <div className="overflow-hidden rounded-xl border border-white/8">
                    <InstallationTabs />
                </div>
            </div>
        </div>
    );
}
