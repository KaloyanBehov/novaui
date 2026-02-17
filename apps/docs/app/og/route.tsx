import { ImageResponse } from 'next/og';
import { seoConfig } from '@/lib/seo';

export const alt = 'NovaUI - React Native UI Components';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #09090b 0%, #1f2937 45%, #111827 100%)',
          color: '#fafafa',
          padding: '56px',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '28px',
            fontWeight: 700,
            color: '#c4b5fd',
          }}
        >
          <span>NOVAUI</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.05 }}>
            React Native
            <br />
            UI Components
          </div>
          <div style={{ fontSize: 30, color: '#d4d4d8' }}>
            Built with NativeWind. Inspired by shadcn/ui.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 24,
            color: '#a1a1aa',
          }}
        >
          <span>{seoConfig.domain.replace('https://', '')}</span>
          <span>50+ components</span>
        </div>
      </div>
    ),
    size,
  );
}
