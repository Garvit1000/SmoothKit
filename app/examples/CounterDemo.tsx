'use client';

import { useState } from 'react';
import { useSmoothCounterWithRef } from '@/lib/hooks/useSmoothCounter';
import { Demo } from '@/app/components/Demo';

export function CounterDemo({ codeHtml }: { codeHtml: string }) {
    const [key, setKey] = useState(0);

    return (
        <Demo
            title="Smart Counter"
            description="Animate numerical values with precision and spring physics."
            codeHtml={codeHtml}
            onReplay={() => setKey(k => k + 1)}
        >
            <div className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto" key={key}>
                <CounterItem
                    label="Total Revenue"
                    config={{ from: 0, to: 25420.50, duration: 2000, decimals: 2 }}
                    prefix="$"
                />
                <CounterItem
                    label="Active Users"
                    config={{ from: 0, to: 8432, duration: 2500, decimals: 0 }}
                />
            </div>
        </Demo>
    );
}

function CounterItem({ label, config, prefix = '', suffix = '', formatter }: any) {
    const { count, ref } = useSmoothCounterWithRef({
        ...config,
        trigger: 'visible'
    });

    return (
        <div ref={ref} className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-xl text-center hover:border-[#00ff88]/20 transition-colors">
            <div className="text-3xl font-serif text-white mb-1 tabular-nums">
                {prefix}{formatter ? formatter(count) : count.toFixed(config.decimals)}{suffix}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-[#00ff88]">{label}</div>
        </div>
    );
}
