/**
 * SmoothKit - useSmoothCounter Hook
 * Animate number counting up/down
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import type { SmoothCounterOptions } from '../utils/types';
import { getEasingFunction } from '../utils/easing';
import { animateValue } from '../utils/raf';
import { getAnimationDuration, usePrefersReducedMotion } from '../utils/motion';

/**
 * Hook for smooth counter animation
 * @param options - Counter configuration options
 * @returns Current counter value
 */
export function useSmoothCounter(options: SmoothCounterOptions): number {
    const {
        from,
        to,
        duration = 1000,
        decimals = 0,
        easing = 'premium', // Use premium signature easing by default
        trigger = 'mount',
        format,
    } = options;

    const [count, setCount] = useState(from);
    const [hasTriggered, setHasTriggered] = useState(trigger === 'mount');
    const elementRef = useRef<HTMLElement | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    // Intersection observer for 'visible' trigger
    useEffect(() => {
        if (trigger !== 'visible' || hasTriggered) return;

        // For visible trigger, we need the element reference from the consumer
        // This is a limitation - we'll trigger on mount for now
        // In a real implementation, we'd return a ref for the consumer to use
        setHasTriggered(true);
    }, [trigger, hasTriggered]);

    // Animate counter
    useEffect(() => {
        if (!hasTriggered) return;

        const easingFn = getEasingFunction(easing);
        const animDuration = getAnimationDuration(duration);

        if (prefersReducedMotion || animDuration === 0) {
            setCount(to);
            return;
        }

        animateValue(from, to, animDuration, easingFn, (value) => {
            const rounded = Number(value.toFixed(decimals));
            setCount(rounded);
        });
    }, [from, to, duration, decimals, easing, hasTriggered, prefersReducedMotion]);

    // Apply custom formatting if provided
    if (format) {
        return Number(format(count));
    }

    return count;
}

/**
 * Hook variant that provides ref for visibility trigger
 */
export function useSmoothCounterWithRef<T extends HTMLElement = HTMLDivElement>(
    options: SmoothCounterOptions
) {
    const {
        from,
        to,
        duration = 1000,
        decimals = 0,
        easing = 'premium', // Use premium signature easing by default
        trigger = 'visible',
    } = options;

    const [count, setCount] = useState(from);
    const [hasTriggered, setHasTriggered] = useState(false);
    const elementRef = useRef<T>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    // Intersection observer for visibility trigger
    useEffect(() => {
        const element = elementRef.current;
        if (!element || trigger !== 'visible' || hasTriggered) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTriggered) {
                        setHasTriggered(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [trigger, hasTriggered]);

    // Animate counter
    useEffect(() => {
        if (!hasTriggered && trigger === 'visible') return;

        const easingFn = getEasingFunction(easing);
        const animDuration = getAnimationDuration(duration);

        if (prefersReducedMotion || animDuration === 0) {
            setCount(to);
            return;
        }

        animateValue(from, to, animDuration, easingFn, (value) => {
            const rounded = Number(value.toFixed(decimals));
            setCount(rounded);
        });
    }, [from, to, duration, decimals, easing, hasTriggered, trigger, prefersReducedMotion]);

    return { count, ref: elementRef };
}
