const FeatureCard = ({
  icon,
  title,
  description,
  gradient,
  iconColor,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient?: string
  iconColor?: string
}) => {
  return (
    <div className="group h-full p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden flex flex-col items-start">
      {/* Dynamic Background Glow */}
      <div
        className={`absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />
      
      {/* Subtle gradient on hover */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient || 'from-primary/5 via-transparent to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10 w-full">
        <div
          className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${iconColor || 'text-primary'} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm border border-primary/5`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-primary/50 to-primary rounded-full transition-all duration-500 group-hover:w-1/3" />
    </div>
  )
}

export default FeatureCard
