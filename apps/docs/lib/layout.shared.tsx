import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Component, Rocket } from 'lucide-react';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'KaloyanBehov',
  repo: 'novaui',
  branch: 'main',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2.5 font-semibold text-base">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/20">
            <span className="text-primary-foreground text-xs font-bold">N</span>
          </div>
          <span className="tracking-tight">NovaUI</span>
        </div>
      ),
    },
    links: [
      {
        text: 'Getting Started',
        url: '/docs/getting-started',
        icon: <Rocket />,
      },
      {
        text: 'Components',
        url: '/docs/components/button',
        icon: <Component />,
        active: 'nested-url',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
