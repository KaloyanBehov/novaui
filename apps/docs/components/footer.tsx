import Link from 'next/link'
const Footer = () => {
  return (
    <footer className="px-6 py-12 border-t border-border bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">N</span>
              </div>
              NovaUI
            </div>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} NovaUI. MIT License.</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link
              href="/docs/components/button"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Components
            </Link>
            <Link
              href="https://github.com/KaloyanBehov/novaui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link href="/llms.txt" className="text-muted-foreground hover:text-foreground transition-colors">
              llms.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
