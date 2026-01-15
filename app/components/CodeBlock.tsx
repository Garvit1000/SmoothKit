'use client';

import React from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                className="absolute top-2.5 right-2.5 px-2 py-1 text-[11px] font-medium text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-all opacity-0 group-hover:opacity-100 border border-white/10"
            >
                {copied ? '✓' : 'Copy'}
            </button>
            <pre className="bg-white/3 text-gray-100 p-4 rounded-lg overflow-x-auto border border-white/10">
                <code className={`language-${language} text-[13px] leading-relaxed font-mono`}>{code}</code>
            </pre>
        </div>
    );
}
