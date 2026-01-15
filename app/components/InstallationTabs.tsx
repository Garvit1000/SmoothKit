'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

const commands: Record<PackageManager, string> = {
    npm: 'npm install smoothkit',
    pnpm: 'pnpm add smoothkit',
    yarn: 'yarn add smoothkit',
    bun: 'bun add smoothkit',
};

export function InstallationTabs() {
    const [manager, setManager] = useState<PackageManager>('npm');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(commands[manager]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-lg overflow-hidden">
            <div className="flex items-center border-b border-white/[0.08]">
                {(['npm', 'pnpm', 'yarn', 'bun'] as PackageManager[]).map((pm) => (
                    <button
                        key={pm}
                        onClick={() => setManager(pm)}
                        className={cn(
                            "px-4 py-2.5 text-xs font-medium transition-colors relative",
                            manager === pm ? "text-white bg-white/5" : "text-white/40 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {pm}
                        {manager === pm && (
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#00ff88]" />
                        )}
                    </button>
                ))}
            </div>

            <div className="p-4 flex items-center justify-between group relative">
                <code className="text-sm font-mono text-white/80">
                    {commands[manager]}
                </code>
                <button
                    onClick={handleCopy}
                    className="p-2 text-white/40 hover:text-white transition-colors bg-white/5 rounded-md opacity-0 group-hover:opacity-100"
                    aria-label="Copy command"
                >
                    {copied ? <Check className="w-4 h-4 text-[#00ff88]" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}
