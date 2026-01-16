'use client';

import * as React from "react"
import Link from "next/link";
import { SmileIcon } from '@/app/components/Smile';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, X } from "lucide-react";

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
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    // Close mobile menu when route changes
    React.useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    React.useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00ff88]/20 selection:text-[#00ff88]">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 border-b border-white/8 bg-[#050505]/80 backdrop-blur-md">
                <div className="mx-auto w-full max-w-350 px-4 md:px-6 h-14 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <SmileIcon size={24} className="text-[#00ff88]" />
                        <span className="text-sm font-semibold tracking-tight text-white">SmoothKit</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-white/40 font-mono">v1.0.0</span>
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <aside
                className={cn(
                    "fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#050505] border-r border-white/8 overflow-y-auto z-40 md:hidden transition-transform duration-300 ease-in-out",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="px-4 py-8">
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
                </div>
            </aside>

            <div className="mx-auto w-full max-w-350 px-4 md:px-6 pt-14">
                <div className="flex flex-col md:flex-row">
                    {/* Desktop Sidebar */}
                    <aside className="w-full md:w-64 md:fixed md:top-14 md:left-0 md:h-[calc(100vh-3.5rem)] md:border-r border-white/8 overflow-y-auto hidden md:block md:pl-6 py-8 bg-[#050505] md:z-30">
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
                    <main className="flex-1 w-full md:pl-72 py-6 md:py-10 lg:border-r lg:border-white/8 min-h-[calc(100vh-3.5rem)]">
                        {/* Breadcrumbs */}
                        <div className="mb-4 md:mb-6 flex items-center gap-2 text-xs text-white/40 px-1">
                            <span>Docs</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white truncate">Components</span>
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
