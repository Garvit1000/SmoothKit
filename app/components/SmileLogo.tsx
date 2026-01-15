'use client';

import React from 'react';

export function SmileLogo({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-[#00ff88] blur-md opacity-20 rounded-full" />

            {/* Icon */}
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#00ff88] relative z-10 w-full h-full"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        </div>
    );
}
