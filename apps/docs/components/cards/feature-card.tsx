import React from 'react';

const FeatureCard = ({
  icon,
  title,
  description,
  children,
  className = '',
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`group relative rounded-3xl border border-border/50 bg-card/20 overflow-hidden transition-all duration-500 hover:border-border hover:bg-card/40 hover:shadow-2xl hover:shadow-primary/5 flex flex-col ${className}`}
    >
      {/* Dynamic Background Glow */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="p-8 flex flex-col h-full relative z-10">
        <div className="w-10 h-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center text-foreground mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          {icon}
        </div>

        {children && <div className="mt-2 mb-8 flex-1 w-full">{children}</div>}

        <div className={children ? 'mt-auto' : 'flex-1 flex flex-col justify-end'}>
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-normal">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
