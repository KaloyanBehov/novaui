import { AnimateIn } from '@/components/animate-in';
import { Download, Layers, Users } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className="relative px-6 py-20 overflow-hidden border-y border-border/40 bg-muted/10">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          <AnimateIn delay={100} className="flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-background rounded-2xl shadow-sm border border-border/50 mb-4 inline-flex">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground mb-1">50+</div>
            <div className="text-sm font-medium text-muted-foreground">Components</div>
          </AnimateIn>

          <AnimateIn delay={200} className="flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-background rounded-2xl shadow-sm border border-border/50 mb-4 inline-flex">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground mb-1">5k+</div>
            <div className="text-sm font-medium text-muted-foreground">Developers</div>
          </AnimateIn>

          <AnimateIn delay={300} className="flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-background rounded-2xl shadow-sm border border-border/50 mb-4 inline-flex">
              <Download className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground mb-1">10k+</div>
            <div className="text-sm font-medium text-muted-foreground">Downloads</div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
