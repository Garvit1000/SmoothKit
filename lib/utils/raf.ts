/**
 * SmoothKit - RequestAnimationFrame Utilities
 * Optimized animation loop helpers
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook for using requestAnimationFrame with automatic cleanup
 * @param callback - Function to call on each frame
 * @param isRunning - Whether the animation should be running
 */
export function useAnimationFrame(
    callback: (deltaTime: number) => void,
    isRunning: boolean = true
): void {
    const requestRef = useRef<number>(0);
    const previousTimeRef = useRef<number>(0);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    const animate = useCallback((time: number) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            callbackRef.current(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);
            return () => {
                if (requestRef.current) {
                    cancelAnimationFrame(requestRef.current);
                }
            };
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        }
    }, [isRunning, animate]);
}

/**
 * Smooth scroll using requestAnimationFrame
 * @param element - Element to scroll
 * @param targetPosition - Target scroll position
 * @param duration - Duration in milliseconds
 * @param easingFn - Easing function
 */
export function smoothScrollTo(
    element: HTMLElement | Window,
    targetPosition: number,
    duration: number,
    easingFn: (t: number) => number
): Promise<void> {
    return new Promise((resolve) => {
        const startPosition =
            element === window
                ? window.pageYOffset
                : (element as HTMLElement).scrollTop;

        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        function scroll(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easingFn(progress);
            const position = startPosition + distance * eased;

            if (element === window) {
                window.scrollTo(0, position);
            } else {
                (element as HTMLElement).scrollTop = position;
            }

            if (progress < 1) {
                requestAnimationFrame(scroll);
            } else {
                resolve();
            }
        }

        requestAnimationFrame(scroll);
    });
}

/**
 * Animate a value change using requestAnimationFrame
 * @param from - Starting value
 * @param to - Target value
 * @param duration - Duration in milliseconds
 * @param easingFn - Easing function
 * @param onUpdate - Callback with current value
 */
export function animateValue(
    from: number,
    to: number,
    duration: number,
    easingFn: (t: number) => number,
    onUpdate: (value: number) => void
): Promise<void> {
    return new Promise((resolve) => {
        const startTime = performance.now();
        const distance = to - from;

        function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easingFn(progress);
            const value = from + distance * eased;

            onUpdate(value);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }

        requestAnimationFrame(animate);
    });
}
