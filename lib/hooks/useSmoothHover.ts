import { useRef, useState, useCallback, RefObject } from 'react';

interface UseSmoothHoverOptions {
    /** Scale factor on hover. Default: 1.05 */
    scale?: number;
    /** Y-axis translation in px. Default: -4 */
    translateY?: number;
    /** Box shadow string. Default: '0 10px 30px -10px rgba(0,0,0,0.3)' */
    shadow?: string;
    /** Duration of the transition in ms. Default: 300 */
    duration?: number;
    /** Easing function string. Default: 'cubic-bezier(0.4, 0, 0.2, 1)' */
    easing?: string;
}

interface UseSmoothHoverReturn<T> {
    /** Ref to attach to the hoverable element */
    ref: RefObject<T | null>;
    /** Boolean indicating if is currently hovered */
    isHovered: boolean;
    /** CSS properties to apply to the element */
    style: React.CSSProperties;
    /** Bind object for mouse events (optional, can simpler use CSS ref) */
    bind: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };
}

/**
 * Hook to apply smooth, magnetic-like hover effects with scale, lift, and shadow.
 * Alternative to complex CSS transitions for premium interactive feel.
 */
export function useSmoothHover<T extends HTMLElement = HTMLDivElement>(
    {
        scale = 1.05,
        translateY = -4,
        shadow = '0 10px 30px -10px rgba(0,0,0,0.3)',
        duration = 300,
        easing = 'cubic-bezier(0.4, 0, 0.2, 1)'
    }: UseSmoothHoverOptions = {}
): UseSmoothHoverReturn<T> {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef<T>(null);

    const onMouseEnter = useCallback(() => setIsHovered(true), []);
    const onMouseLeave = useCallback(() => setIsHovered(false), []);

    const style: React.CSSProperties = {
        transform: isHovered
            ? `scale(${scale}) translateY(${translateY}px)`
            : 'scale(1) translateY(0)',
        boxShadow: isHovered ? shadow : 'none',
        transition: `transform ${duration}ms ${easing}, box-shadow ${duration}ms ${easing}`,
        willChange: 'transform, box-shadow',
        cursor: 'pointer'
    };

    return {
        ref,
        isHovered,
        style,
        bind: { onMouseEnter, onMouseLeave }
    };
}
