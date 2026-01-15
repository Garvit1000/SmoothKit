import { useState, useEffect, useCallback, CSSProperties } from 'react';

interface UseSmoothStaggerOptions {
    /** Delay between each item in ms. Default: 80 */
    delay?: number;
    /** Duration of each item animation in ms. Default: 600 */
    duration?: number;
    /** Stagger start offset delay in ms. Default: 100 */
    initialDelay?: number;
    /** Animation type preset. Default: 'slide-up' */
    animation?: 'fade' | 'slide-up' | 'slide-down' | 'scale';
}

interface UseSmoothStaggerReturn {
    /** Function to get style for index i */
    getStyle: (index: number) => CSSProperties;
    /** Function to reset/replay animation */
    replay: () => void;
}

/**
 * Hook to orchestrate staggered list animations.
 * Simplifies coordinating entrance animations for lists and grids.
 */
export function useSmoothStagger({
    delay = 80,
    duration = 600,
    initialDelay = 100,
    animation = 'slide-up'
}: UseSmoothStaggerOptions = {}): UseSmoothStaggerReturn {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Small timeout to ensure DOM is ready and transition triggers
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, [mounted]);

    const replay = useCallback(() => {
        setMounted(false);
        // State change triggers re-effect
    }, []);

    const getStyle = useCallback((index: number): CSSProperties => {
        const totalDelay = initialDelay + (index * delay);

        let initialTransform = 'translateY(20px)';
        let targetTransform = 'translateY(0)';

        switch (animation) {
            case 'slide-down':
                initialTransform = 'translateY(-20px)';
                break;
            case 'scale':
                initialTransform = 'scale(0.9)';
                targetTransform = 'scale(1)';
                break;
            case 'fade':
                initialTransform = 'none';
                targetTransform = 'none';
                break;
        }

        return {
            opacity: mounted ? 1 : 0,
            transform: mounted ? targetTransform : initialTransform,
            transition: `opacity ${duration}ms ease-out ${totalDelay}ms, transform ${duration}ms cubic-bezier(0.2, 0, 0, 1) ${totalDelay}ms`,
            willChange: 'opacity, transform'
        };
    }, [mounted, delay, duration, initialDelay, animation]);

    return { getStyle, replay };
}
