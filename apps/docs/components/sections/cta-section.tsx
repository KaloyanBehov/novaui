import { ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';
import { AnimateIn } from '../animate-in';

const CtaSection = () => {
  return (
    <section className="relative px-6 py-32 md:py-48 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_50%,transparent_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />

      <AnimateIn className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
          Ready to ship <span className="text-primary italic font-semibold">faster</span>?
        </h2>

        <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          Join thousands of developers building high-performance, accessible, and beautiful
          cross-platform apps with NovaUI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/docs/getting-started"
            className="group relative h-14 px-8 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 text-base overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="https://github.com/KaloyanBehov/novaui"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-14 px-8 rounded-xl border border-border bg-background/50 backdrop-blur-md hover:bg-muted/80 hover:border-border font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] text-base shadow-sm w-full sm:w-auto"
          >
            <Github className="w-5 h-5" />
            Star on GitHub
          </Link>
        </div>

        {/* Floating labels */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium text-muted-foreground/80">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary/40" /> iOS
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary/40" /> Android
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary/40" /> Web
          </span>
        </div>
      </AnimateIn>
    </section>
  );
};

export default CtaSection;
