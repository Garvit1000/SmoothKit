/**
 * SmoothKit - Shared TypeScript types and interfaces
 * Enhanced with Emil Kowalski-inspired easing options
 */

export type EasingFunction = (t: number) => number;

export type EasingType =
    | 'linear'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | 'spring'           // Spring physics with bounce
    | 'smooth-spring'    // Gentler spring without overshoot
    | 'premium'          // Premium signature cubic-bezier(0.16, 1, 0.3, 1)
    | 'bounce';         // Realistic bounce effect

export type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale';

export type ScrollTarget = string | HTMLElement | null;

export interface SmoothScrollOptions {
    duration?: number;
    offset?: number;
    easing?: EasingType | EasingFunction;
}

export interface SmoothRevealOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    animation?: AnimationType;
    duration?: number;
    delay?: number;
}

export interface TypingEffectOptions {
    text: string | string[];
    speed?: number;
    delay?: number;
    cursor?: boolean;
    loop?: boolean;
    pauseDuration?: number;
    onComplete?: () => void;
}

export interface SmoothCounterOptions {
    from: number;
    to: number;
    duration?: number;
    decimals?: number;
    easing?: EasingType | EasingFunction;
    trigger?: 'mount' | 'visible';
    format?: (value: number) => string;
}

export interface SmoothTransitionOptions {
    duration?: number;
    property?: 'height' | 'width' | 'both';
    easing?: string;
}
