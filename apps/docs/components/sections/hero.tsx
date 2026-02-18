import { ArrowRight, Github, Layout, Palette, Smartphone, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { AnimateIn } from '../animate-in';

const Hero = () => {
  return (
    <section className="relative px-6 pt-28 pb-20 md:pt-40 md:pb-32 text-center overflow-hidden">
      {/* Background Elements */}

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-transparent" />

      {/* Animated Blobs */}
      <div className="absolute top-0 left-1/4 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] opacity-30 animate-pulse-slow [animation-delay:2s]" />

      {/* Floating Decorative Icons */}
      <div className="absolute top-20 left-[10%] -z-10 animate-float opacity-20 hidden lg:block">
        <Smartphone className="w-12 h-12 text-primary" />
      </div>
      <div className="absolute top-40 right-[15%] -z-10 animate-float [animation-delay:1.5s] opacity-20 hidden lg:block">
        <Layout className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute bottom-40 left-[15%] -z-10 animate-float [animation-delay:3s] opacity-20 hidden lg:block">
        <Zap className="w-10 h-10 text-primary" />
      </div>
      <div className="absolute bottom-20 right-[10%] -z-10 animate-float [animation-delay:4.5s] opacity-20 hidden lg:block">
        <Palette className="w-14 h-14 text-primary" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Announcement Badge */}
        <AnimateIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm mb-8 group hover:border-primary/40 transition-all cursor-default hover:bg-primary/10 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-foreground/80">50+ components available</span>
            <Sparkles className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </AnimateIn>

        {/* Headline */}
        <AnimateIn delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-8">
            <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Beautiful UI Components
            </span>
            <br />
            <span className="relative">
              <span className="bg-linear-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                for React Native
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full blur-[1px]" />
            </span>
          </h1>
        </AnimateIn>

        {/* Subheadline */}
        <AnimateIn delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed px-4 font-normal">
            An open-source component library inspired by{' '}
            <span className="text-foreground font-medium">shadcn/ui</span>. Built with{' '}
            <span className="text-primary font-medium">NativeWind</span> for true cross-platform
            development.
          </p>
        </AnimateIn>

        {/* CTA Buttons */}
        <AnimateIn delay={300}>
          <div className="flex flex-col sm:row gap-5 justify-center items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6">
              <Link
                href="/docs"
                className="group relative h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="https://github.com/KaloyanBehov/novaui"
                target="_blank"
                rel="noopener noreferrer"
                className="group h-14 px-10 rounded-2xl border border-border bg-background/50 backdrop-blur-md hover:bg-muted hover:border-primary/40 font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.03] active:scale-[0.97] shadow-sm"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </Link>
            </div>
          </div>
        </AnimateIn>

        {/* Trust Indicators */}
        <AnimateIn delay={400}>
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2.5 group">
              <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
              <span className="group-hover:text-foreground transition-colors font-medium">
                MIT Licensed
              </span>
            </div>
            <div className="flex items-center gap-2.5 group">
              <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary/70 transition-colors" />
              <span className="group-hover:text-foreground transition-colors font-medium">
                TypeScript First
              </span>
            </div>
            <div className="flex items-center gap-2.5 group">
              <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors" />
              <span className="group-hover:text-foreground transition-colors font-medium">
                iOS, Android & Web
              </span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};

export default Hero;
