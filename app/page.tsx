// Server Component

import {
  Zap,
  Accessibility,
  FileCode,
  Github,
  Cpu,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { SmileIcon } from '@/app/components/Smile';
import { ScrollDemo } from './examples/ScrollDemo';
import { RevealDemo } from './examples/RevealDemo';
import { TypingDemo } from './examples/TypingDemo';
import { CounterDemo } from './examples/CounterDemo';
import { TransitionDemo } from './examples/TransitionDemo';
import { Footer } from './components/Footer';
import { highlightCode } from '@/lib/shiki';

const SCROLL_CODE = `import { useSmoothScroll } from 'smoothkit';

const scrollTo = useSmoothScroll({
  duration: 1000,
  offset: 80,
  easing: 'premium'
});`;

const REVEAL_CODE = `import { useSmoothReveal } from 'smoothkit';

const ref = useSmoothReveal({
  animation: 'slide-up',
  duration: 600,
  threshold: 0.2
});`;

const TYPING_CODE = `import { useTypingEffect } from 'smoothkit';

const { text } = useTypingEffect({
  text: ['Hello', 'Welcome'],
  speed: 60,
  cursor: true,
  loop: true
});`;

const COUNTER_CODE = `import { useSmoothCounterWithRef } from 'smoothkit';

const { count, ref } = useSmoothCounterWithRef({
  from: 0,
  to: 1000,
  duration: 2000,
  trigger: 'visible'
});`;

const TRANSITION_CODE = `import { useSmoothTransition } from 'smoothkit';

const [ref, bind] = useSmoothTransition({
  duration: 300
});`;

export default async function Home() {
  const [
    scrollHtml,
    revealHtml,
    typingHtml,
    counterHtml,
    transitionHtml
  ] = await Promise.all([
    highlightCode(SCROLL_CODE),
    highlightCode(REVEAL_CODE),
    highlightCode(TYPING_CODE),
    highlightCode(COUNTER_CODE),
    highlightCode(TRANSITION_CODE)
  ]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00ff88]/20 selection:text-[#00ff88]">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SmileIcon size={24} className="text-[#00ff88]" />
            <span className="text-sm font-semibold tracking-tight text-white">SmoothKit</span>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-xs font-medium text-white/60 hover:text-white transition-colors">Features</a>
              <a href="#demos" className="text-xs font-medium text-white/60 hover:text-white transition-colors">Components</a>
              <a href="https://github.com" className="text-xs font-medium text-white/60 hover:text-white transition-colors">GitHub</a>
            </nav>
            <a
              href="/docs"
              className="px-3 py-1.5 bg-[#00ff88] hover:bg-[#00e57a] text-[#000000] rounded text-xs font-medium transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <HeroSection />

      {/* Stats - Minimal */}
      <section className="border-y border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex justify-between items-center py-8">
            <StatItem value="<10kb" label="Gzipped" />
            <div className="h-8 w-px bg-white/[0.08]" />
            <StatItem value="60fps" label="Animation" />
            <div className="h-8 w-px bg-white/[0.08]" />
            <StatItem value="100%" label="Type Safe" />
            <div className="h-8 w-px bg-white/[0.08]" />
            <StatItem value="MIT" label="License" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-medium mb-3">Designed for performance</h2>
            <p className="text-white/50 text-sm max-w-lg">
              Every hook is built with performance in mind. No unnecessary re-renders, no layout thrashing, just smooth animations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08] rounded-lg overflow-hidden">
            <FeatureCard
              icon={<Zap className="w-4 h-4" />}
              title="Lightning Fast"
              description="Optimized for 60fps performance using RequestAnimationFrame."
            />
            <FeatureCard
              icon={<Accessibility className="w-4 h-4" />}
              title="Accessible"
              description="Respects prefers-reduced-motion automatically."
            />
            <FeatureCard
              icon={<FileCode className="w-4 h-4" />}
              title="Type Safe"
              description="Written in TypeScript with strict mode enabled."
            />
            <FeatureCard
              icon={<Cpu className="w-4 h-4" />}
              title="Hardware Accelerated"
              description="Forces GPU layer creation for smooth transitions."
            />
            <FeatureCard
              icon={<Layers className="w-4 h-4" />}
              title="Tree Shakeable"
              description="Modular architecture. Import only what you need."
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-4 h-4" />}
              title="Production Ready"
              description="Zero dependencies. Extensively tested."
            />
          </div>
        </div>
      </section>

      {/* Demos */}
      <section id="demos" className="px-6 py-24 border-t border-white/[0.08]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-medium mb-3">Interactive Components</h2>
          </div>

          <div className="space-y-32">
            <ScrollDemo codeHtml={scrollHtml} />
            <RevealDemo codeHtml={revealHtml} />
            <TypingDemo codeHtml={typingHtml} />
            <CounterDemo codeHtml={counterHtml} />
            <TransitionDemo codeHtml={transitionHtml} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="text-center px-4">
      <div className="text-xl font-serif mb-0.5 text-white">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-[#00ff88] font-medium">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-8 bg-[#050505] hover:bg-[#0a0a0a] transition-colors">
      <div className="text-[#00ff88] mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <h3 className="text-sm font-medium mb-2 text-white/90">{title}</h3>
      <p className="text-xs text-white/50 leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
}
