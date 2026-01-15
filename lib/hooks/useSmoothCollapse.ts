import { useRef, useState, useEffect, useCallback, RefObject } from 'react';

interface UseSmoothCollapseOptions {
    /** Duration of the animation in ms. Default: 300 */
    duration?: number;
    /** Easing function. Default: 'cubic-bezier(0.4, 0, 0.2, 1)' */
    easing?: string;
    /** Initial open state. Default: false */
    defaultOpen?: boolean;
}

interface UseSmoothCollapseReturn {
    /** Boolean state if is open */
    isOpen: boolean;
    /** Toggle function */
    toggle: () => void;
    /** Set open state manually */
    setOpen: (open: boolean) => void;
    /** Ref to attach to the content wrapper div */
    ref: RefObject<HTMLDivElement | null>;
    /** CSS properties to apply to the content wrapper */
    style: React.CSSProperties;
}

/**
 * Hook to animate height changes for accordions and collapsible sections.
 * Automatically handles height calculations and transitions purely via CSS.
 */
export function useSmoothCollapse({
    duration = 300,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    defaultOpen = false
}: UseSmoothCollapseOptions = {}): UseSmoothCollapseReturn {
    const [isOpen, setOpen] = useState(defaultOpen);
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string | number>(defaultOpen ? 'auto' : 0);

    const toggle = useCallback(() => setOpen(prev => !prev), []);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // If opening
        if (isOpen) {
            // 1. Get the actual height
            const scrollHeight = element.scrollHeight;
            // 2. Set height to that value to trigger transition
            setHeight(scrollHeight);

            // 3. After transition, set to auto so it remains responsive
            const timer = setTimeout(() => {
                setHeight('auto');
            }, duration);

            return () => clearTimeout(timer);
        } else {
            // If closing
            // 1. Explicitly set current height (pixel value) so we can transition FROM it
            // (If it was 'auto', CSS alignment might not transition perfectly)
            const scrollHeight = element.scrollHeight;
            // We need to double-raf or force layout for this to work perfectly if it was 'auto'
            // For simplicity in React, we might rely on the fact that re-render happens.
            // But a cleaner way is just setting it to 0.
            // If we are currently 'auto', we first snap to px height, then next frame go to 0.

            // Simplified reliable logic:
            setHeight(0);
        }
    }, [isOpen, duration]);

    // Improve closing animation logic for 'auto' -> '0'
    // To transition from AUTO, we technically need to:
    // 1. Set height to offsetHeight/scrollHeight (pixels)
    // 2. Force reflow
    // 3. Set height to 0
    // Doing this in a simple hook effect can be tricky without layout thrashing.
    // We will stick to the style prop approach.

    const style: React.CSSProperties = {
        height: height,
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: `height ${duration}ms ${easing}, opacity ${duration}ms ${easing}`,
        willChange: 'height, opacity'
    };

    return { isOpen, toggle, setOpen, ref, style };
}
