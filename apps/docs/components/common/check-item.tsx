const CheckItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm border border-primary/5">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5} className="w-3 h-3 group-hover:scale-110 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <span className="text-foreground/90 font-medium group-hover:text-foreground transition-colors">{text}</span>
    </div>
  )
}

export default CheckItem
