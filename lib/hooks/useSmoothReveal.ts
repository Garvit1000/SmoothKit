import { useState, useEffect, useRef, RefObject } from 'react';

interface UseSmoothRevealOptions {
    /** Animation preset. Default: 'slide-up' */
    animation?: 'fade' | 'slide-up' | 'slide-left' | 'scale';
    /** Duration in ms. Default: 600 */
    duration?: number;
    /** Easing function. Default: 'cubic-bezier(0.2, 0, 0, 1)' */
    easing?: string;
    /** Intersection threshold (0-1). Default: 0.1 */
    threshold?: number;
    /** Root margin for intersection observer. Default: '0px' */
    rootMargin?: string;
    /** Trigger once or every time. Default: true (once) */
    triggerOnce?: boolean;
}

/**
 * Hook to trigger animations when an element enters the viewport.
 * Uses IntersectionObserver for performance.
 */
export function useSmoothReveal({
    animation = 'slide-up',
    duration = 600,
    easing = 'cubic-bezier(0.2, 0, 0, 1)',
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
}: UseSmoothRevealOptions = {}): RefObject<HTMLDivElement | null> {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Ensure initial state is hidden before observation starts (to avoid flash)
        // We set styles immediately in effect, but we can also set them on return if needed.
        // Actually, the styles below depend on `isVisible`. 
        // We just need to ensure the observer runs.

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (triggerOnce && element) {
                    observer.unobserve(element);
                }
            } else if (!triggerOnce) {
                setIsVisible(false);
            }
        }, { threshold, rootMargin });

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [threshold, rootMargin, triggerOnce]);

    // Apply styles imperatively or return them?
    // The current usage pattern in pages seems to be `ref={ref}` but NO `style={style}` passed back?
    // Let's check `SmoothRevealPage` usage: `<div ref={ref} ...>`
    // The previous implementation of `useSmoothReveal` must have applied styles directly to the ref or returned style?
    // In `SmoothRevealPage.tsx` passed in previous turn, it was: `const ref = useSmoothReveal(...)`. 
    // It did NOT destruct style. So the hook MUST apply styles directly to the element.

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let initialTransform = '';
        const targetTransform = 'translate(0, 0) scale(1)';
        const initialOpacity = '0';
        const targetOpacity = '1';

        switch (animation) {
            case 'slide-up':
                initialTransform = 'translateY(40px)';
                break;
            case 'slide-left':
                initialTransform = 'translateX(-40px)';
                break;
            case 'scale':
                initialTransform = 'scale(0.9)';
                break;
            case 'fade':
            default:
                initialTransform = 'none'; // effectively just opacity
                break;
        }

        element.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
        element.style.opacity = isVisible ? targetOpacity : initialOpacity;
        element.style.transform = isVisible ? targetTransform : initialTransform;
        element.style.willChange = 'opacity, transform';

    }, [isVisible, animation, duration, easing]);

    return ref;
}
