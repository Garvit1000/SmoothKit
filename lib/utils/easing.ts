/**
 * SmoothKit - Easing Functions
 * Emil Kowalski-inspired spring physics and optimized bezier curves
 * For buttery smooth 60fps animations
 */

import type { EasingFunction } from './types';

/**
 * Linear easing - no acceleration
 */
export const linear: EasingFunction = (t: number) => t;

/**
 * Spring physics easing - Natural bounce with damping
 * Inspired by Emil Kowalski's signature smooth animations
 * Perfect for UI elements that need organic feel
 */
export const spring: EasingFunction = (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
        ? 0
        : t === 1
            ? 1
            : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

/**
 * Smooth spring - Gentler spring without overshoot
 * Great for reveals and fades
 */
export const smoothSpring: EasingFunction = (t: number) => {
    return t * (2 - t) * (1 + Math.sin((t - 0.5) * Math.PI) * 0.1);
};

/**
 * Premium signature ease - Optimized cubic-bezier(0.16, 1, 0.3, 1)
 * Ultra-smooth deceleration, feels natural and premium
 */
export const premiumEase: EasingFunction = (t: number) => {
    // Approximation of cubic-bezier(0.16, 1, 0.3, 1)
    const c1 = 0.16;
    const c2 = 1.0;
    const c3 = 0.3;
    const c4 = 1.0;

    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    return 3 * mt2 * t * c2 + 3 * mt * t2 * c4 + t3;
};

/**
 * Ease in - accelerating from zero velocity
 * Enhanced with better curve
 */
export const easeIn: EasingFunction = (t: number) => {
    return t * t * t; // Cubic for smoother acceleration
};

/**
 * Ease out - Fast start, slow end
 * Uses premium optimized curve
 */
export const easeOut: EasingFunction = (t: number) => {
    return premiumEase(t);
};

/**
 * Ease in-out - acceleration until halfway, then deceleration
 * Optimized bezier for buttery smooth transitions
 */
export const easeInOut: EasingFunction = (t: number) => {
    // cubic-bezier(0.65, 0, 0.35, 1) approximation
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Ease in cubic - strong acceleration
 */
export const easeInCubic: EasingFunction = (t: number) => t * t * t;

/**
 * Ease out cubic - strong deceleration
 */
export const easeOutCubic: EasingFunction = (t: number) => {
    const t1 = t - 1;
    return t1 * t1 * t1 + 1;
};

/**
 * Ease in-out cubic - Smooth S-curve
 */
export const easeInOutCubic: EasingFunction = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Ease out exponential - very smooth deceleration
 */
export const easeOutExpo: EasingFunction = (t: number) =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

/**
 * Ease in exponential
 */
export const easeInExpo: EasingFunction = (t: number) =>
    t === 0 ? 0 : Math.pow(2, 10 * (t - 1));

/**
 * Ease in-out exponential
 */
export const easeInOutExpo: EasingFunction = (t: number) => {
    if (t === 0 || t === 1) return t;

    if (t < 0.5) {
        return Math.pow(2, 20 * t - 10) / 2;
    }

    return (2 - Math.pow(2, -20 * t + 10)) / 2;
};

/**
 * Bounce easing - Realistic bounce effect
 */
export const bounce: EasingFunction = (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
        return n1 * t * t;
    } else if (t < 2 / d1) {
        return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
        return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
};

/**
 * Get easing function by name or return custom function
 */
export function getEasingFunction(
    easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring' | 'smooth-spring' | 'premium' | 'bounce' | EasingFunction
): EasingFunction {
    if (typeof easing === 'function') {
        return easing;
    }

    switch (easing) {
        case 'linear':
            return linear;
        case 'ease-in':
            return easeIn;
        case 'ease-out':
            return easeOut;
        case 'ease-in-out':
            return easeInOut;
        case 'spring':
            return spring;
        case 'smooth-spring':
            return smoothSpring;
        case 'premium':
            return premiumEase;
        case 'bounce':
            return bounce;
        default:
            return premiumEase; // Default to premium signature ease
    }
}
