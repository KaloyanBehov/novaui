import { ArrowRight, Github, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { AnimateIn } from '../animate-in';

const CtaSection = () => {
  return (
    <section className="relative px-6 py-32 md:py-48 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[140px] opacity-40 animate-pulse-slow" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <AnimateIn className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-widest mb-8 animate-bounce-slow">
          <Sparkles className="w-4 h-4" />
          Ready to ship?
        </div>

        <h2 className="text-4xl md:text-6xl font-semibold mb-8 tracking-tighter italic">
          Build your next app <br className="hidden md:block" />
          with{' '}
          <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent font-bold">
            NovaUI
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-2xl mx-auto font-normal leading-relaxed">
          Join developers building high-performance, accessible, and beautiful cross-platform apps
          with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/docs"
            className="group relative h-16 px-12 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.05] active:scale-[0.95] shadow-2xl shadow-primary/40 text-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            Start Building Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <Link
            href="https://github.com/KaloyanBehov/novaui"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-16 px-12 rounded-2xl border-2 border-border bg-background/50 backdrop-blur-md hover:bg-muted hover:border-primary/40 font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.05] active:scale-[0.95] text-lg shadow-sm"
          >
            <Github className="w-6 h-6" />
            Star on GitHub
          </Link>
        </div>

        {/* Floating elements/labels */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 text-sm font-semibold text-muted-foreground/60">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" /> iOS Support
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" /> Android Support
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" /> Web Support
          </span>
        </div>
      </AnimateIn>
    </section>
  );
};

export default CtaSection;
