import { AnimateIn } from '@/components/animate-in';
import { Heart, ListMusic, Play, Repeat, SkipBack, SkipForward, Terminal } from 'lucide-react';
import Link from 'next/link';

const CodePreview = () => {
  return (
    <section className="relative px-6 py-28 md:py-40 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-transparent opacity-40" />
      <div className="absolute bottom-1/4 right-0 -z-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] opacity-40 animate-pulse-slow" />
      <div className="absolute top-1/4 left-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] opacity-30 animate-pulse-slow [animation-delay:2s]" />

      <div className="max-w-6xl mx-auto">
        <AnimateIn className="text-center mb-16 md:mb-24 relative z-10">
          <span className="inline-block text-sm font-semibold text-primary mb-4 uppercase tracking-[0.2em]">
            Developer Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
            Beautifully designed, <br className="hidden sm:block" />
            <span className="text-primary italic font-semibold">yours to customize.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            We provide the semantic structure and polished styles. You just drop them into your
            project and customize them with Tailwind CSS.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Left: Component Preview */}
          <AnimateIn delay={100} className="w-full h-full">
            <div className="relative h-full min-h-[400px] rounded-3xl border border-border/50 bg-card/20 overflow-hidden flex items-center justify-center p-8 lg:p-12 hover:border-primary/30 transition-colors backdrop-blur-sm">
              {/* Subtle grid background inside preview */}
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[20px_20px]" />

              {/* Mock Music Player Card */}
              <div className="w-full max-w-sm rounded-[32px] border border-border/80 bg-background p-4 shadow-2xl flex flex-col gap-6 relative group overflow-hidden">
                {/* Glow behind card */}
                <div className="absolute -inset-1 bg-primary/20 rounded-[34px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                {/* Album Art Container */}
                <div className="w-full aspect-square rounded-[24px] bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                  {/* Decorative Elements inside Album Art */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-black/20 rounded-full blur-xl" />

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="h-6 w-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Track Info */}
                <div className="px-2 flex justify-between items-start">
                  <div className="flex flex-col">
                    <h3 className="font-bold text-xl text-foreground tracking-tight">
                      Cosmic Lullaby
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mt-0.5">NovaUI Audio</p>
                  </div>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors group/heart">
                    <Heart className="w-5 h-5 text-muted-foreground group-hover/heart:text-foreground group-hover/heart:fill-foreground transition-all duration-300" />
                  </button>
                </div>

                {/* Scrubber */}
                <div className="px-2 space-y-2">
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-foreground rounded-full relative"></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground font-semibold tracking-wider">
                    <span>1:24</span>
                    <span>3:42</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="px-2 flex items-center justify-between pb-2">
                  <button className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 active:scale-95">
                    <Repeat className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-6">
                    <button className="text-foreground hover:opacity-80 transition-opacity hover:scale-105 active:scale-95">
                      <SkipBack className="w-8 h-8 fill-current" />
                    </button>
                    <button className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center text-background hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-foreground/20 hover:shadow-foreground/30">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                    <button className="text-foreground hover:opacity-80 transition-opacity hover:scale-105 active:scale-95">
                      <SkipForward className="w-8 h-8 fill-current" />
                    </button>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 active:scale-95">
                    <ListMusic className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: Code Editor */}
          <AnimateIn delay={200} className="w-full h-full">
            <div className="relative group h-full">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/10 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="h-full relative rounded-[1.5rem] border border-border/50 bg-[#0d0d0d] shadow-2xl overflow-hidden group-hover:border-primary/30 transition-colors duration-500 flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border/30 bg-[#141414]">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="h-4 w-px bg-border/50 mx-2" />
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-semibold tracking-wider">
                      music-player.tsx
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    React Native
                  </div>
                </div>
                <div className="p-6 md:p-8 overflow-x-auto flex-1 custom-scrollbar">
                  <pre className="text-sm font-mono leading-[1.6] tracking-tight">
                    <span className="text-pink-400">import</span>
                    {' { '}
                    <span className="text-blue-300 font-semibold">View</span>,{' '}
                    <span className="text-blue-300 font-semibold">Text</span>
                    {' } '}
                    <span className="text-pink-400">from</span>{' '}
                    <span className="text-emerald-400">&apos;react-native&apos;</span>
                    {'\n'}
                    <span className="text-pink-400">import</span>
                    {' { '}
                    <span className="text-blue-300 font-semibold">Button</span>,{' '}
                    <span className="text-blue-300 font-semibold">Card</span>,{' '}
                    <span className="text-blue-300 font-semibold">Slider</span>
                    {' } '}
                    <span className="text-pink-400">from</span>{' '}
                    <span className="text-emerald-400">&apos;@/components/ui&apos;</span>
                    {'\n\n'}
                    <span className="text-pink-400">export default function</span>{' '}
                    <span className="text-yellow-200 font-semibold italic">MusicPlayerCard</span>
                    {'() {\n'}
                    {'  '}
                    <span className="text-pink-400">return</span>
                    {' (\n'}
                    {'    '}
                    <span className="text-blue-300 font-semibold">{'<Card '}</span>
                    <span className="text-orange-300">className</span>
                    <span className="text-emerald-400">=&quot;p-4 gap-6 rounded-3xl&quot;</span>
                    <span className="text-blue-300 font-semibold">{'>'}</span>
                    {'\n'}
                    {'      '}
                    <span className="text-blue-300 font-semibold">{'<Image '}</span>
                    <span className="text-orange-300">source</span>
                    <span className="text-emerald-400">={'{...}'}</span>
                    <span className="text-orange-300"> className</span>
                    <span className="text-emerald-400">
                      =&quot;w-full aspect-square rounded-2xl&quot;
                    </span>
                    <span className="text-blue-300 font-semibold">{' />'}</span>
                    {'\n\n'}
                    {'      '}
                    <span className="text-blue-300 font-semibold">{'<View '}</span>
                    <span className="text-orange-300">className</span>
                    <span className="text-emerald-400">
                      =&quot;flex-row justify-between pt-2&quot;
                    </span>
                    <span className="text-blue-300 font-semibold">{'>'}</span>
                    {'\n'}
                    {'        '}
                    <span className="text-blue-300 font-semibold">{'<View>'}</span>
                    {'\n'}
                    {'          '}
                    <span className="text-blue-300 font-semibold">{'<Text '}</span>
                    <span className="text-orange-300">className</span>
                    <span className="text-emerald-400">
                      =&quot;font-bold text-xl text-foreground&quot;
                    </span>
                    <span className="text-blue-300 font-semibold">{'>'}</span>
                    {'\n'}
                    {'            Cosmic Lullaby\n'}
                    {'          '}
                    <span className="text-blue-300 font-semibold">{'</Text>'}</span>
                    {'\n'}
                    {'          '}
                    <span className="text-blue-300 font-semibold">{'<Text '}</span>
                    <span className="text-orange-300">className</span>
                    <span className="text-emerald-400">
                      =&quot;font-medium text-muted-foreground&quot;
                    </span>
                    <span className="text-blue-300 font-semibold">{'>'}</span>
                    {'\n'}
                    {'            NovaUI Audio\n'}
                    {'          '}
                    <span className="text-blue-300 font-semibold">{'</Text>'}</span>
                    {'\n'}
                    {'        '}
                    <span className="text-blue-300 font-semibold">{'</View>'}</span>
                    {'\n'}
                    {'        '}
                    <span className="text-blue-300 font-semibold">{'<Button '}</span>
                    <span className="text-orange-300">variant</span>
                    <span className="text-emerald-400">=&quot;ghost&quot;</span>
                    <span className="text-orange-300"> size</span>
                    <span className="text-emerald-400">=&quot;icon&quot;</span>
                    <span className="text-blue-300 font-semibold">{'>'}</span>
                    {'\n'}
                    {'          '}
                    <span className="text-blue-300 font-semibold">{'<Icon '}</span>
                    <span className="text-orange-300">name</span>
                    <span className="text-emerald-400">=&quot;heart&quot;</span>
                    <span className="text-blue-300 font-semibold">{' />'}</span>
                    {'\n'}
                    {'        '}
                    <span className="text-blue-300 font-semibold">{'</Button>'}</span>
                    {'\n'}
                    {'      '}
                    <span className="text-blue-300 font-semibold">{'</View>'}</span>
                    {'\n\n'}
                    {'      '}
                    <span className="text-blue-300 font-semibold">{'<Slider '}</span>
                    <span className="text-orange-300">value</span>
                    <span className="text-emerald-400">={'{32}'}</span>
                    <span className="text-orange-300"> max</span>
                    <span className="text-emerald-400">={'{100}'}</span>
                    <span className="text-blue-300 font-semibold">{' />'}</span>
                    {'\n\n'}
                    {'      '}
                    <span className="text-blue-300 font-semibold">{'<View '}</span>
                    <span className="text-orange-300">className</span>
                    <span className="text-emerald-400">
                      =&quot;flex-row justify-between items-center&quot;
                    </span>
                    <span className="text-blue-300 font-semibold">{'>'}</span>
                    {'\n'}
                    {'        '}
                    <span className="text-blue-300 font-semibold">{'<Button '}</span>
                    <span className="text-orange-300">variant</span>
                    <span className="text-emerald-400">=&quot;ghost&quot;</span>
                    <span className="text-orange-300"> icon</span>
                    <span className="text-emerald-400">=&quot;repeat&quot;</span>
                    <span className="text-blue-300 font-semibold">{' />'}</span>
                    {'\n'}
                    {'        '}
                    <span className="text-blue-300 font-semibold">{'<View '}</span>
                    <span className="text-orange-300">className</span>
                    <span className="text-emerald-400">
                      =&quot;flex-row gap-6 items-center&quot;
                    </span>
                    <span className="text-blue-300 font-semibold">{'>'}</span>
                    {'\n'}
                    {'          '}
                    <span className="text-blue-300 font-semibold">{'<Button '}</span>
                    <span className="text-orange-300">variant</span>
                    <span className="text-emerald-400">=&quot;ghost&quot;</span>
                    <span className="text-orange-300"> icon</span>
                    <span className="text-emerald-400">=&quot;skip-back&quot;</span>
                    <span className="text-blue-300 font-semibold">{' />'}</span>
                    {'\n'}
                    {'          '}
                    <span className="text-blue-300 font-semibold">{'<Button '}</span>
                    <span className="text-orange-300">size</span>
                    <span className="text-emerald-400">=&quot;icon&quot;</span>
                    <span className="text-orange-300"> className</span>
                    <span className="text-emerald-400">
                      =&quot;w-16 h-16 rounded-full bg-foreground&quot;
                    </span>
                    <span className="text-blue-300 font-semibold">{'>'}</span>
                    {'\n'}
                    {'            '}
                    <span className="text-blue-300 font-semibold">{'<Icon '}</span>
                    <span className="text-orange-300">name</span>
                    <span className="text-emerald-400">=&quot;play&quot;</span>
                    <span className="text-orange-300"> className</span>
                    <span className="text-emerald-400">
                      =&quot;text-background fill-background&quot;
                    </span>
                    <span className="text-blue-300 font-semibold">{' />'}</span>
                    {'\n'}
                    {'          '}
                    <span className="text-blue-300 font-semibold">{'</Button>'}</span>
                    {'\n'}
                    {'          '}
                    <span className="text-blue-300 font-semibold">{'<Button '}</span>
                    <span className="text-orange-300">variant</span>
                    <span className="text-emerald-400">=&quot;ghost&quot;</span>
                    <span className="text-orange-300"> icon</span>
                    <span className="text-emerald-400">=&quot;skip-forward&quot;</span>
                    <span className="text-blue-300 font-semibold">{' />'}</span>
                    {'\n'}
                    {'        '}
                    <span className="text-blue-300 font-semibold">{'</View>'}</span>
                    {'\n'}
                    {'        '}
                    <span className="text-blue-300 font-semibold">{'<Button '}</span>
                    <span className="text-orange-300">variant</span>
                    <span className="text-emerald-400">=&quot;ghost&quot;</span>
                    <span className="text-orange-300"> icon</span>
                    <span className="text-emerald-400">=&quot;list-music&quot;</span>
                    <span className="text-blue-300 font-semibold">{' />'}</span>
                    {'\n'}
                    {'      '}
                    <span className="text-blue-300 font-semibold">{'</View>'}</span>
                    {'\n'}
                    {'    '}
                    <span className="text-blue-300 font-semibold">{'</Card>'}</span>
                    {'\n'}
                    {'  );\n'}
                    {'}'}
                  </pre>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>

        <div className="mt-16 text-center z-20 relative">
          <Link
            href="/docs/components/button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-foreground hover:bg-primary px-6 py-3 rounded-full transition-all border border-primary/20"
          >
            Explore all components →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CodePreview;
