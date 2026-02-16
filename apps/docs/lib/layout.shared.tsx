import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'novaui',
  repo: 'novaui',
  branch: 'main',
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'NovaUI',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  }
}
