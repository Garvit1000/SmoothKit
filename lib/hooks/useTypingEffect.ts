/**
 * SmoothKit - useTypingEffect Hook
 * Realistic typing animation with smooth 60fps cursor blink
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import type { TypingEffectOptions } from '../utils/types';
import { usePrefersReducedMotion } from '../utils/motion';

/**
 * Hook for typing animation effect
 * @param options - Typing effect configuration
 * @returns Object with current text and completion status
 */
export function useTypingEffect(options: TypingEffectOptions) {
    const {
        text,
        speed = 50,
        delay = 0,
        cursor = true,
        loop = false,
        pauseDuration = 1000,
        onComplete,
    } = options;

    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [cursorOpacity, setCursorOpacity] = useState(1);
    const prefersReducedMotion = usePrefersReducedMotion();

    // Convert text to array if it's a string
    const textArray = Array.isArray(text) ? text : [text];
    const currentTextIndexRef = useRef(0);
    const currentCharIndexRef = useRef(0);
    const isTypingRef = useRef(true);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const cursorRafRef = useRef<number | undefined>(undefined);
    const cursorStartTimeRef = useRef<number>(0);

    useEffect(() => {
        // If reduced motion, show complete text immediately
        if (prefersReducedMotion) {
            setDisplayText(textArray[textArray.length - 1]);
            setIsComplete(true);
            setCursorOpacity(0);
            return;
        }

        const typeText = () => {
            const currentText = textArray[currentTextIndexRef.current];
            const currentChar = currentCharIndexRef.current;

            if (isTypingRef.current) {
                // Typing forward
                if (currentChar <= currentText.length) {
                    setDisplayText(currentText.substring(0, currentChar));
                    currentCharIndexRef.current++;

                    if (currentChar === currentText.length) {
                        // Finished typing current text
                        if (currentTextIndexRef.current === textArray.length - 1) {
                            // Last text in array
                            setIsComplete(true);
                            if (onComplete) onComplete();

                            if (loop) {
                                timeoutRef.current = setTimeout(() => {
                                    isTypingRef.current = false;
                                    typeText();
                                }, pauseDuration);
                            }
                            return;
                        } else {
                            // More texts to type, pause then move to next
                            timeoutRef.current = setTimeout(() => {
                                currentTextIndexRef.current++;
                                currentCharIndexRef.current = 0;
                                isTypingRef.current = false;
                                typeText();
                            }, pauseDuration);
                            return;
                        }
                    }
                }
            } else {
                // Deleting
                if (currentChar >= 0) {
                    setDisplayText(currentText.substring(0, currentChar));
                    currentCharIndexRef.current--;

                    if (currentChar === 0) {
                        // Finished deleting
                        if (currentTextIndexRef.current === 0) {
                            // Back to first text, start typing again
                            isTypingRef.current = true;
                            typeText();
                            return;
                        } else {
                            // More texts to delete
                            currentTextIndexRef.current--;
                            const prevText = textArray[currentTextIndexRef.current];
                            currentCharIndexRef.current = prevText.length;
                            typeText();
                            return;
                        }
                    }
                }
            }

            // Continue typing/deleting
            timeoutRef.current = setTimeout(typeText, speed);
        };

        // Start after initial delay
        timeoutRef.current = setTimeout(typeText, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [text, speed, delay, cursor, loop, pauseDuration, onComplete, prefersReducedMotion]);

    // Smooth 60fps cursor blink effect using RAF
    useEffect(() => {
        if (!cursor || prefersReducedMotion) return;

        const BLINK_DURATION = 1000; // 1 second per blink cycle (fade in + fade out)

        const animateCursor = (timestamp: number) => {
            if (!cursorStartTimeRef.current) {
                cursorStartTimeRef.current = timestamp;
            }

            const elapsed = timestamp - cursorStartTimeRef.current;
            const progress = (elapsed % BLINK_DURATION) / BLINK_DURATION;
            
            // Smooth sine wave for natural blink
            // 0 -> 1 -> 0 smoothly
            const opacity = (Math.sin(progress * Math.PI * 2 - Math.PI / 2) + 1) / 2;
            
            setCursorOpacity(opacity);

            cursorRafRef.current = requestAnimationFrame(animateCursor);
        };

        cursorRafRef.current = requestAnimationFrame(animateCursor);

        return () => {
            if (cursorRafRef.current !== undefined) {
                cancelAnimationFrame(cursorRafRef.current);
            }
        };
    }, [cursor, prefersReducedMotion]);

    // Return text with cursor indicator (as string, not JSX)
    // Consumers can apply the opacity styling themselves if needed
    const textWithCursor = cursor ? `${displayText}|` : displayText;

    return {
        text: textWithCursor,
        isComplete,
        cursorOpacity // Return opacity for custom cursor styling
    };
}
