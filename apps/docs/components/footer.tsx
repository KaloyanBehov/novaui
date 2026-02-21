import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-2.5 font-semibold text-lg">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-primary-foreground text-sm font-bold">N</span>
              </div>
              <span className="tracking-tight">NovaUI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Beautiful, native-feeling UI components for React Native and Expo. Built with
              NativeWind, open-source and ready to copy-paste.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-12 sm:gap-16 lg:gap-24 text-sm">
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-foreground">Resources</span>
              <Link
                href="/docs/getting-started"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/docs/components/button"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Components
              </Link>
              <Link
                href="/llms.txt"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                llms.txt
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-foreground">Community</span>
              <Link
                href="https://github.com/KaloyanBehov/novaui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Discord
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NovaUI. MIT License.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/KaloyanBehov/novaui"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="w-4 h-4" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
