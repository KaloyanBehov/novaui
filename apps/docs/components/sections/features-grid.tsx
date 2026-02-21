import { Blocks, Code2, Copy, Moon, Paintbrush, Smartphone } from 'lucide-react';
import { AnimateIn } from '../animate-in';
import FeatureCard from '../cards/feature-card';

const FeaturesGrid = () => {
  return (
    <section className="relative px-6 py-28 md:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <AnimateIn className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter">
            Everything you need to <span className="text-primary italic font-semibold">ship</span>.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            Detailed, accessible, and beautifully designed components that you can just copy and
            paste into your React Native applications.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-6">
          <AnimateIn delay={0} className="md:col-span-6 lg:col-span-4 rounded-3xl">
            <FeatureCard
              icon={<Blocks className="w-5 h-5" />}
              title="50+ Carefully Crafted Components"
              description="From simple buttons to complex navigation menus. Our comprehensive library gives you the building blocks to create stunning cross-platform applications."
              className="h-full"
            >
              <div className="bg-background/50 border border-border/50 rounded-2xl p-6 mt-4 opacity-80 backdrop-blur-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <div className="h-10 px-6 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium shadow-md shadow-primary/20">
                      Subscribe
                    </div>
                    <div className="h-10 px-6 rounded-xl bg-muted border border-border flex items-center justify-center text-sm font-medium">
                      Cancel
                    </div>
                    <div className="h-10 w-10 rounded-full bg-muted border border-border flex items-center justify-center">
                      <Moon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="h-2 w-3/4 rounded-full bg-muted mt-2" />
                  <div className="h-2 w-1/2 rounded-full bg-muted" />
                </div>
              </div>
            </FeatureCard>
          </AnimateIn>

          <AnimateIn delay={100} className="md:col-span-3 lg:col-span-2 rounded-3xl">
            <FeatureCard
              icon={<Paintbrush className="w-5 h-5" />}
              title="NativeWind Powered"
              description="Use the Tailwind CSS utility classes you already know and love, directly in React Native."
              className="h-full"
            >
              <div className="mt-4 p-4 rounded-xl border border-border/50 bg-background/50 font-mono text-xs text-muted-foreground opacity-90 overflow-hidden whitespace-nowrap">
                <span className="text-primary">className</span>=&quot;...
                <br />
                <span className="text-emerald-500">flex items-center</span>
                <br />
                <span className="text-blue-500">justify-between</span>
                <br />
                <span className="text-purple-500">p-4 rounded-xl</span>
                <br />
                <span className="text-orange-500">bg-background</span>&quot;
              </div>
            </FeatureCard>
          </AnimateIn>

          <AnimateIn delay={200} className="md:col-span-3 lg:col-span-2 rounded-3xl">
            <FeatureCard
              icon={<Code2 className="w-5 h-5" />}
              title="Strictly TypeScript"
              description="Built with TypeScript from the ground up for superior DX, autocomplete, and reliability."
              className="h-full"
            />
          </AnimateIn>

          <AnimateIn delay={300} className="md:col-span-3 lg:col-span-2 rounded-3xl">
            <FeatureCard
              icon={<Copy className="w-5 h-5" />}
              title="Copy, Paste, Ship"
              description="No npm install necessary. Just copy the code, paste it into your app, and customize it to your heart's content."
              className="h-full"
            />
          </AnimateIn>

          <AnimateIn delay={400} className="md:col-span-3 lg:col-span-2 rounded-3xl">
            <FeatureCard
              icon={<Smartphone className="w-5 h-5" />}
              title="Truly Cross-Platform"
              description="Every component is tested to look and feel great on iOS, Android, and Web out of the box."
              className="h-full"
            />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
