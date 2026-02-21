const StatItem = ({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 text-center">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm border border-primary/5">
            {icon}
          </div>
        )}
        <div className="text-4xl md:text-5xl font-bold bg-linear-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent tracking-tighter mb-2 transition-all group-hover:scale-[1.05] duration-300">
          {value}
        </div>
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest opacity-80 group-hover:text-primary group-hover:opacity-100 transition-all">
          {label}
        </div>
      </div>
    </div>
  );
};

export default StatItem;
