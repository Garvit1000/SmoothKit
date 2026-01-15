# SmoothKit

Dead-simple React hooks for smooth animations. Bridge the gap between basic CSS transitions and full animation libraries for 80% of common use cases.

##  Features

-  **5 Polished Hooks**: Smooth scrolling, reveals, typing effects, counters, and transitions
-  **Lightweight**: < 10kb gzipped, tree-shakeable
-  **Accessible**: Respects `prefers-reduced-motion`
-  **TypeScript**: Full type safety with IntelliSense
-  **60fps**: Optimized with RequestAnimationFrame
-  **Zero Config**: Sensible defaults, all options optional

##  Quick Start

```bash
npm install smoothkit
```

##  Hooks

### useSmoothScroll

Enhanced smooth scrolling with offset, duration, and easing control.

```tsx
import { useSmoothScroll } from 'smoothkit';

function MyComponent() {
  const scrollTo = useSmoothScroll({
    duration: 1000,
    offset: 80,
    easing: 'ease-in-out'
  });

  return (
    <button onClick={() => scrollTo('#section')}>
      Scroll to Section
    </button>
  );
}
```

**Options:**
- `duration?: number` - Animation duration in ms (default: 800)
- `offset?: number` - Offset for fixed headers (default: 0)
- `easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | function` - Easing function

---

### useSmoothReveal

Fade/slide elements in when they enter viewport.

```tsx
import { useSmoothReveal } from 'smoothkit';

function MyComponent() {
  const ref = useSmoothReveal({
    animation: 'slide-up',
    duration: 600,
    threshold: 0.2
  });

  return <div ref={ref}>I reveal on scroll!</div>;
}
```

**Options:**
- `threshold?: number` - Intersection threshold (default: 0.2)
- `rootMargin?: string` - Root margin for observer (default: '0px')
- `triggerOnce?: boolean` - Only trigger once (default: true)
- `animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'`
- `duration?: number` - Animation duration in ms (default: 600)
- `delay?: number` - Delay before animation (default: 0)

---

### useTypingEffect

Realistic typing animation with cursor.

```tsx
import { useTypingEffect } from 'smoothkit';

function MyComponent() {
  const { text, isComplete } = useTypingEffect({
    text: ['Hello!', 'Welcome!', 'Enjoy!'],
    speed: 60,
    cursor: true,
    loop: true
  });

  return <p>{text}</p>;
}
```

**Options:**
- `text: string | string[]` - Text to type (single or array for sequences)
- `speed?: number` - Typing speed in ms per character (default: 50)
- `delay?: number` - Initial delay (default: 0)
- `cursor?: boolean` - Show blinking cursor (default: true)
- `loop?: boolean` - Loop animation (default: false)
- `pauseDuration?: number` - Pause between sequences (default: 1000)
- `onComplete?: () => void` - Callback when complete

---

### useSmoothCounter

Animate number counting up/down.

```tsx
import { useSmoothCounterWithRef } from 'smoothkit';

function MyComponent() {
  const { count, ref } = useSmoothCounterWithRef({
    from: 0,
    to: 1000,
    duration: 2000,
    trigger: 'visible'
  });

  return <div ref={ref}>{count}</div>;
}
```

**Options:**
- `from: number` - Starting value
- `to: number` - Target value
- `duration?: number` - Animation duration (default: 1000)
- `decimals?: number` - Decimal places (default: 0)
- `easing?: string | function` - Easing function (default: 'ease-out')
- `trigger?: 'mount' | 'visible'` - When to trigger (default: 'mount')
- `format?: (value: number) => string` - Custom formatting function

---

### useSmoothTransition

Smooth height/width transitions with automatic dimension calculation.

```tsx
import { useSmoothTransition } from 'smoothkit';

function MyComponent() {
  const [ref, bind] = useSmoothTransition({
    duration: 300
  });

  return (
    <div ref={ref} {...bind}>
      {dynamicContent}
    </div>
  );
}
```

**Options:**
- `duration?: number` - Transition duration (default: 300)
- `property?: 'height' | 'width' | 'both'` - What to transition (default: 'height')
- `easing?: string` - CSS easing function (default: 'ease-in-out')

---

##  Browser Support

Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

##  Accessibility

All animations automatically respect the `prefers-reduced-motion` media query. When users have this preference enabled, animations are disabled or reduced to instant transitions while maintaining full functionality.

##  Bundle Size

SmoothKit is designed to be lightweight and tree-shakeable:
- Total: ~8kb gzipped
- Each hook: ~1-2kb when imported individually

##  Tech Stack

- React 18+
- TypeScript (strict mode)
- Zero runtime dependencies
- Built with Next.js demo site

##  License

MIT © SmoothKit

---

Built with ❤️ for the React community
