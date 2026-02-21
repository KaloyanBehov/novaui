import { Blocks, Code2, Copy, Moon, Paintbrush, ShieldCheck } from 'lucide-react';
import { AnimateIn } from '../animate-in';
import FeatureCard from '../cards/feature-card';

const FeaturesGrid = () => {
  return (
    <section className="relative px-6 py-28 md:py-36 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] opacity-20" />
      
      <div className="max-w-6xl mx-auto relative">
        <AnimateIn className="text-center mb-20">
          <span className="inline-block text-sm font-semibold text-primary mb-4 uppercase tracking-[0.2em]">
            Why NovaUI?
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
            Everything you need to <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent underline decoration-primary/20 underline-offset-8 font-bold">ship faster</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed">
            Production-ready components that you own. No runtime dependencies, no vendor lock-in.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimateIn delay={0}>
            <FeatureCard
              icon={<Blocks className="w-6 h-6" />}
              title="50+ Components"
              description="Buttons, Cards, Dialogs, Forms, Navigation, Data Display — a complete design system for your next app."
              iconColor="text-primary"
            />
          </AnimateIn>
          <AnimateIn delay={100}>
            <FeatureCard
              icon={<Paintbrush className="w-6 h-6" />}
              title="NativeWind Powered"
              description="Tailwind CSS classes that work seamlessly on React Native and Web. Write once, look great everywhere."
              iconColor="text-primary"
            />
          </AnimateIn>
          <AnimateIn delay={200}>
            <FeatureCard
              icon={<Code2 className="w-6 h-6" />}
              title="TypeScript First"
              description="Built with TypeScript from the ground up. Enjoy full autocomplete and type safety in every component."
              iconColor="text-primary"
            />
          </AnimateIn>
          <AnimateIn delay={300}>
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6" />}
              title="Accessible"
              description="WAI-ARIA patterns, screen reader support, and proper accessibility roles in every single component."
              iconColor="text-primary"
            />
          </AnimateIn>
          <AnimateIn delay={400}>
            <FeatureCard
              icon={<Copy className="w-6 h-6" />}
              title="Copy & Customize"
              description="Components live directly in your codebase. You own them, you style them, you extend them."
              iconColor="text-primary"
            />
          </AnimateIn>
          <AnimateIn delay={500}>
            <FeatureCard
              icon={<Moon className="w-6 h-6" />}
              title="Dark Mode Ready"
              description="Native light and dark themes with smooth transitions and automatic system-level detection."
              iconColor="text-primary"
            />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
