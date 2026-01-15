import { useState, useEffect, useRef, RefObject, useCallback } from 'react';

interface UseSmoothImageLoadOptions {
    /** Duration of the fade-in animation in ms */
    fadeInDuration?: number;
    /** Whether to start with a blur effect that transitions to sharp */
    blur?: boolean;
    /** Amount of blur in px. Default: 10 */
    blurAmount?: number;
}

interface UseSmoothImageLoadReturn {
    /** Ref to attach to the img element */
    ref: RefObject<HTMLImageElement | null>;
    /** Boolean indicating if the image has fully loaded */
    isLoaded: boolean;
    /** CSS styling object to apply to the img element */
    style: React.CSSProperties;
    /** Function to replay the loading animation (useful for demos) */
    replay: () => void;
}

/**
 * Hook to handle smooth image loading with fade-in and optional blur effects.
 * Eliminates layout shift and provides a premium loading experience.
 */
export function useSmoothImageLoad(
    { fadeInDuration = 600, blur = true, blurAmount = 10 }: UseSmoothImageLoadOptions = {}
): UseSmoothImageLoadReturn {
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef<HTMLImageElement>(null);
    const [key, setKey] = useState(0); // Used to trigger replay

    useEffect(() => {
        const img = ref.current;
        if (!img) return;

        // Reset state when key changes
        setIsLoaded(false);

        // If image is already cached/loaded, handle it
        if (img.complete && img.naturalHeight !== 0) {
            // Small timeout to ensure transition plays if we want it to always animate
            // or set immediately. For "smooth load", usually we want to see it even if cached?
            // Let's set it after a tick to allow the 'opacity: 0' to apply first.
            const t = setTimeout(() => setIsLoaded(true), 50);
            return () => clearTimeout(t);
        }

        const handleLoad = () => setIsLoaded(true);
        const handleError = () => setIsLoaded(true); // Show it (or alt) on error

        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);

        return () => {
            img.removeEventListener('load', handleLoad);
            img.removeEventListener('error', handleError);
        };
    }, [key]);

    const replay = useCallback(() => {
        setIsLoaded(false);
        setKey(k => k + 1);
    }, []);

    const style: React.CSSProperties = {
        opacity: isLoaded ? 1 : 0,
        filter: blur ? (isLoaded ? 'blur(0px)' : `blur(${blurAmount}px)`) : 'none',
        transition: `opacity ${fadeInDuration}ms ease-out, filter ${fadeInDuration}ms ease-out`,
        willChange: 'opacity, filter',
    };

    return { ref, isLoaded, style, replay };
}
