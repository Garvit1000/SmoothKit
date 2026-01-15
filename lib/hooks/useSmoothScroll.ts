/**
 * SmoothKit - useSmoothScroll Hook
 * Enhanced smooth scrolling with offset, duration, and easing control
 */

'use client';

import { useCallback } from 'react';
import type { SmoothScrollOptions, ScrollTarget } from '../utils/types';
import { getEasingFunction } from '../utils/easing';
import { smoothScrollTo } from '../utils/raf';
import { getAnimationDuration } from '../utils/motion';

/**
 * Hook for smooth scrolling to elements or positions
 * @param options - Scroll configuration options
 * @returns Function to trigger scroll
 */
export function useSmoothScroll(options: SmoothScrollOptions = {}) {
    const {
        duration = 800,
        offset = 0,
        easing = 'premium' // Use premium signature easing for buttery smooth scrolling
    } = options;

    const scrollTo = useCallback(
        (target: ScrollTarget): Promise<void> => {
            return new Promise((resolve) => {
                if (!target) {
                    resolve();
                    return;
                }

                let element: HTMLElement | null = null;

                // Get element from selector or ref
                if (typeof target === 'string') {
                    element = document.querySelector(target);
                } else {
                    element = target;
                }

                if (!element) {
                    console.warn(`SmoothKit: Scroll target not found`);
                    resolve();
                    return;
                }

                // Calculate target position
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                // Get easing function
                const easingFn = getEasingFunction(easing);

                // Get duration (respects reduced motion)
                const animDuration = getAnimationDuration(duration);

                // Perform scroll
                if (animDuration === 0) {
                    // Instant scroll for reduced motion
                    window.scrollTo(0, offsetPosition);
                    resolve();
                } else {
                    smoothScrollTo(window, offsetPosition, animDuration, easingFn)
                        .then(resolve);
                }
            });
        },
        [duration, offset, easing]
    );

    return scrollTo;
}
