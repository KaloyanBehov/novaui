import { source } from '@/lib/source';
import { toAbsoluteUrl } from '@/lib/seo';

export const revalidate = false;

export async function GET() {
  const lines: string[] = [];
  lines.push('# Documentation');
  lines.push('');
  for (const page of source.getPages()) {
    const canonicalUrl = toAbsoluteUrl(page.url);
    const llmPath = page.slugs.length > 0 ? `/llms.mdx/docs/${page.slugs.join('/')}` : '/llms.mdx/docs';
    const llmUrl = toAbsoluteUrl(llmPath);
    lines.push(
      `- [${page.data.title}](${canonicalUrl}): ${page.data.description} | llm_markdown: ${llmUrl}`,
    );
  }
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
