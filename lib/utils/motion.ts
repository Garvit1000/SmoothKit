/**
 * SmoothKit - Motion Utilities
 * Handles prefers-reduced-motion for accessibility
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Check if user prefers reduced motion (sync)
 */
export function shouldReduceMotion(): boolean {
    if (typeof window === 'undefined') return false;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
}

/**
 * React hook to detect prefers-reduced-motion
 * Updates when user changes system settings
 */
export function usePrefersReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        shouldReduceMotion()
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            setPrefersReducedMotion(event.matches);
        };

        // Initial check
        handleChange(mediaQuery);

        // Listen for changes
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return prefersReducedMotion;
}

/**
 * Get animation duration based on reduced motion preference
 * Returns 0 if reduced motion is preferred, otherwise returns the provided duration
 */
export function getAnimationDuration(duration: number): number {
    return shouldReduceMotion() ? 0 : duration;
}
