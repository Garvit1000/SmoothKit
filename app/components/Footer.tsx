'use client';

import { Github, Twitter, ArrowUpRight } from "lucide-react";
import { SmileIcon } from "@/app/components/Smile";

export function Footer() {
    return (
        <footer className="border-t border-white/[0.08] bg-[#000000] pt-20 pb-10">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-20">
                    <div className="col-span-2 md:col-span-4 pr-8">
                        <div className="flex items-center gap-2 mb-6">
                            <SmileIcon size={24} className="text-[#00ff88]" />
                            <span className="text-sm font-bold text-white tracking-tight">SmoothKit</span>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed max-w-xs mb-6">
                            Buttery smooth React animations that feel natural.
                            Built for perfectionists who care about every pixel and every frame.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest text-[#00ff88] font-medium">v1.0.0 Stable</span>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 md:col-start-7">
                        <h4 className="text-xs font-medium text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-xs text-white/50">
                            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#demos" className="hover:text-white transition-colors">Components</a></li>
                            <li><a href="/docs" className="hover:text-white transition-colors">Installation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-xs font-medium text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-xs text-white/50">
                            <li><a href="https://github.com" className="hover:text-white transition-colors">GitHub</a></li>
                            <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-2">
                        <h4 className="text-xs font-medium text-white mb-6">Social</h4>
                        <ul className="space-y-4 text-xs text-white/50">
                            <li>
                                <a href="#" className="hover:text-white transition-colors flex items-center gap-1 group">
                                    Twitter <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#00ff88]" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors flex items-center gap-1 group">
                                    Discord <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#00ff88]" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-[10px] text-white/30">
                        © {new Date().getFullYear()} SmoothKit. MIT License.
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-white/30 hover:text-white transition-colors">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="#" className="text-white/30 hover:text-white transition-colors">
                            <Twitter className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
