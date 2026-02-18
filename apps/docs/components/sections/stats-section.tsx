import { AnimateIn } from '@/components/animate-in'
import StatItem from '@/components/common/stat-item'
import { BookOpen, Code2, Layers, Zap } from 'lucide-react'

const StatsSection = () => {
  return (
    <section className="relative px-6 py-24 md:py-32 overflow-hidden border-y border-border/40">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] opacity-30" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] opacity-30" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          <AnimateIn delay={0}>
            <StatItem value="50+" label="Components" icon={<Layers className="w-5 h-5" />} />
          </AnimateIn>
          <AnimateIn delay={75}>
            <StatItem value="100%" label="TypeScript" icon={<Code2 className="w-5 h-5" />} />
          </AnimateIn>
          <AnimateIn delay={150}>
            <StatItem value="MIT" label="Open Source" icon={<BookOpen className="w-5 h-5" />} />
          </AnimateIn>
          <AnimateIn delay={225}>
            <StatItem value="3" label="Platforms" icon={<Zap className="w-5 h-5" />} />
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
