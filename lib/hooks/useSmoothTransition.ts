/**
 * SmoothKit - useSmoothTransition Hook
 * Optimized smooth state transitions with GPU acceleration
 * No layout thrashing - batched reads and writes
 */

'use client';

import { useRef, useEffect } from 'react';
import type { SmoothTransitionOptions } from '../utils/types';
import { usePrefersReducedMotion } from '../utils/motion';

/**
 * Hook for smooth height/width transitions
 * Optimized to prevent layout thrashing with batched DOM reads/writes
 * @param options - Transition configuration options
 * @returns Ref and bind props
 */
export function useSmoothTransition<T extends HTMLElement = HTMLDivElement>(
    options: SmoothTransitionOptions = {}
) {
    const {
        duration = 300,
        property = 'height',
        easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
    } = options;

    const elementRef = useRef<T>(null);
    const prevSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
    const isAnimatingRef = useRef(false);
    const prefersReducedMotion = usePrefersReducedMotion();
    const rafRef = useRef<number | undefined>(undefined);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Initialize previous size
        prevSizeRef.current = {
            width: element.offsetWidth,
            height: element.offsetHeight
        };

        const handleChange = () => {
            if (prefersReducedMotion) return;

            // If we are currently animating, ignore this mutation
            if (isAnimatingRef.current) return;

            const el = elementRef.current;
            if (!el) return;

            const newHeight = el.offsetHeight;
            const newWidth = el.offsetWidth;
            const oldHeight = prevSizeRef.current.height;
            const oldWidth = prevSizeRef.current.width;

            const heightChanged = (property === 'height' || property === 'both') && newHeight !== oldHeight;
            const widthChanged = (property === 'width' || property === 'both') && newWidth !== oldWidth;

            if (!heightChanged && !widthChanged) return;

            // Start Animation
            isAnimatingRef.current = true;

            // Update known size for next time
            prevSizeRef.current = { width: newWidth, height: newHeight };

            // 1. FLIP First: Snap to old size immediately
            el.style.transition = 'none';
            if (property === 'height' || property === 'both') el.style.height = `${oldHeight}px`;
            if (property === 'width' || property === 'both') el.style.width = `${oldWidth}px`;

            // Force reflow
            void el.offsetHeight;

            // 2. FLIP Last: Animate to new size
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                el.style.transition = `${property === 'both' ? 'all' : property} ${duration}ms ${easing}`;
                el.style.willChange = property === 'both' ? 'height, width' : property;

                if (property === 'height' || property === 'both') el.style.height = `${newHeight}px`;
                if (property === 'width' || property === 'both') el.style.width = `${newWidth}px`;

                // 3. Cleanup
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    el.style.transition = '';
                    el.style.height = 'auto';
                    el.style.width = 'auto';
                    el.style.willChange = 'auto';
                    isAnimatingRef.current = false;

                    // Sync one last time
                    if (elementRef.current) {
                        prevSizeRef.current = {
                            width: elementRef.current.offsetWidth,
                            height: elementRef.current.offsetHeight
                        };
                    }
                }, duration);
            });
        };

        const observer = new MutationObserver(handleChange);
        observer.observe(element, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
        });

        // Handle resize silently
        const handleResize = () => {
            if (isAnimatingRef.current) return;
            prevSizeRef.current = {
                width: element.offsetWidth,
                height: element.offsetHeight
            };
        };
        window.addEventListener('resize', handleResize);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [duration, property, easing, prefersReducedMotion]);

    const bind = {
        style: {
            overflow: 'hidden',
        } as React.CSSProperties,
    };

    return [elementRef, bind] as const;
}
