import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/config';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = siteConfig.title;

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '88px',
          background: '#FBF5EC',
          color: '#2D2A26',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 32,
            fontFamily: 'monospace',
            fontSize: 20,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#756E66',
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: 999, background: '#7E9560' }} />
          notes from the layer below the model
        </div>
        <h1
          style={{
            fontSize: 110,
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.025em',
            fontWeight: 500,
          }}
        >
          {siteConfig.name.toLowerCase()}.
        </h1>
        <p
          style={{
            marginTop: 28,
            fontSize: 32,
            color: '#4A453F',
            fontStyle: 'italic',
            maxWidth: 900,
          }}
        >
          {siteConfig.description}
        </p>
      </div>
    ),
    { ...size },
  );
}
