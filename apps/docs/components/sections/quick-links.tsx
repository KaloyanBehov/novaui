import { AnimateIn } from '@/components/animate-in';
import QuickLink from '@/components/common/quick-link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const QuickLinks = () => {
  return (
    <section className="px-6 pb-28 md:pb-36">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-linear-to-br from-card/80 to-card/40 p-10 md:p-14 backdrop-blur-xl shadow-2xl">
            {/* Background decorative blobs */}
            <div className="absolute -right-20 -bottom-20 -z-10 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute -left-20 -top-20 -z-10 w-80 h-80 bg-primary/5 rounded-full blur-[80px]" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-14 relative z-10">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Documentation
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight italic">Popular Resources</h2>
                <p className="text-lg text-muted-foreground font-normal leading-relaxed">
                  Everything you need to build polished cross-platform applications 
                  with React Native and NativeWind.
                </p>
              </div>
              <Link
                href="/docs"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all hover:scale-105 shadow-lg shadow-primary/20"
              >
                Explore Full Documentation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 relative z-10">
              <QuickLink href="/docs/getting-started" label="Getting Started" tag="Setup" />
              <QuickLink href="/docs/components/button" label="Button" tag="Component" />
              <QuickLink href="/docs/components/dialog" label="Dialog" tag="Component" />
              <QuickLink href="/docs/components/input" label="Input" tag="Component" />
              <QuickLink href="/docs/components/select" label="Select" tag="Component" />
              <QuickLink
                href="/docs/components/navigation-menu"
                label="Navigation Menu"
                tag="Component"
              />
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};

export default QuickLinks;
