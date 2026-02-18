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
      title: 'NovaUI',
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
