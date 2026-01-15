'use client';

import { useState } from 'react';
import { useTypingEffect } from '@/lib/hooks/useTypingEffect';
import { Demo } from '@/app/components/Demo';

export function TypingDemo({ codeHtml }: { codeHtml: string }) {
    const [key, setKey] = useState(0);

    return (
        <Demo
            title="Typing Effect"
            description="Realistic typing animation with cursor blinking and sequence support."
            codeHtml={codeHtml}
            onReplay={() => setKey(k => k + 1)}
        >
            <div className="space-y-6 w-full max-w-sm mx-auto" key={key}>
                <TypingItem
                    label="Single Text"
                    config={{ text: 'Buttery smooth interactions.', speed: 40, cursor: true }}
                />
                <TypingItem
                    label="Looped Sequence"
                    config={{
                        text: ['Build faster.', 'Ship better.', 'Scale easier.'],
                        speed: 50,
                        delay: 1000,
                        cursor: true,
                        loop: true,
                        pauseDuration: 1500
                    }}
                />
            </div>
        </Demo>
    );
}

function TypingItem({ label, config }: { label: string, config: any }) {
    const { text } = useTypingEffect(config);

    return (
        <div className="group">
            <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{label}</div>
            <div className="h-14 flex items-center px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl group-hover:border-[#00ff88]/20 transition-colors">
                <span className="font-mono text-sm text-[#00ff88]">{text}</span>
            </div>
        </div>
    );
}
