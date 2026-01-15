'use client';

import * as React from "react"
import Link from "next/link";
import { SmileIcon } from '@/app/components/Smile';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const sidebarNav = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs" },
        ],
    },
    {
        title: "Components",
        items: [
            { title: "Smooth Image", href: "/docs/smooth-image" },
            { title: "Smooth Hover", href: "/docs/smooth-hover" },
            { title: "Smooth Stagger", href: "/docs/smooth-stagger" },
            { title: "Smooth Collapse", href: "/docs/smooth-collapse" },
            { title: "Smooth Reveal", href: "/docs/smooth-reveal" },
            { title: "Smooth Scroll", href: "/docs/smooth-scroll" },
            { title: "Smooth Counter", href: "/docs/smooth-counter" },
            { title: "Smooth Transition", href: "/docs/smooth-transition" },
            { title: "Smooth Typing Effect", href: "/docs/typing-effect" },
        ],
    },
];

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00ff88]/20 selection:text-[#00ff88]">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-[#050505]/80 backdrop-blur-md">
                <div className="mx-auto w-full max-w-[1400px] px-6 h-14 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <SmileIcon size={24} className="text-[#00ff88]" />
                        <span className="text-sm font-semibold tracking-tight text-white">SmoothKit</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-white/40 font-mono">v1.0.0</span>
                    </div>
                </div>
            </header>

            <div className="mx-auto w-full max-w-[1400px] px-6 pt-14">
                <div className="flex">
                    {/* Sidebar */}
                    <aside className="w-64 fixed top-14 left-0 h-[calc(100vh-3.5rem)] border-r border-white/[0.08] overflow-y-auto hidden md:block pl-6 py-8 bg-[#050505] z-30">
                        {sidebarNav.map((section, i) => (
                            <div key={i} className="mb-8">
                                <h4 className="text-sm font-semibold text-white mb-4 tracking-tight">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "block text-[13px] transition-colors hover:text-white leading-snug",
                                                    pathname === item.href ? "text-[#00ff88] font-medium" : "text-white/60"
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 md:pl-72 py-10 pr-6 lg:border-r lg:border-white/[0.08] min-h-[calc(100vh-3.5rem)]">
                        {/* Breadcrumbs Placeholder (Static for now, but style matches) */}
                        <div className="mb-6 flex items-center gap-2 text-xs text-white/40">
                            <span>Docs</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white">Components</span>
                        </div>

                        {children}
                    </main>

                    {/* Right Sidebar (Table of Contents) */}
                    <aside className="hidden lg:block w-64 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-10 pl-6">
                        <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">On This Page</h4>
                        <ul className="space-y-3 text-xs text-white/50">
                            <li><a href="#installation" className="hover:text-white transition-colors">Installation</a></li>
                            <li><a href="#usage" className="hover:text-white transition-colors">Usage</a></li>
                            <li><a href="#props" className="hover:text-white transition-colors">Props</a></li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    );
}
