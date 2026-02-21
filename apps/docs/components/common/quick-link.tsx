import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const QuickLink = ({ href, label, tag }: { href: string; label: string; tag: string }) => {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-border bg-background/40 backdrop-blur-sm hover:bg-muted/50 hover:border-primary/40 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-md transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {tag}
        </span>
        <span className="font-semibold text-sm tracking-tight">{label}</span>
      </div>
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  )
}

export default QuickLink
