import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AGICountdown from '@/components/AGICountdown';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AGI Career Shield — Know Your Risk. Own Your Path.',
  description: 'AI will disrupt 300M jobs by 2030. Know your personal AGI risk score, see three viable alternative futures.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <div className="bg-mesh" />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '100vw', overflowX: 'hidden', position: 'relative', zIndex: 1 }}>
          {/* Nav */}
          <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <a href="/" style={{ display: 'flex', alignItems: 'gap: 10px', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', textDecoration: 'none', color: '#F0F0F5' }}>
                <span style={{ fontSize: 24, filter: 'drop-shadow(0 0 8px rgba(0,102,255,0.4))' }}>🛡️</span>
                <span className="gradient-text-animated">AGI Career Shield</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <a href="/dashboard" style={{ fontSize: 14, color: '#9898AA', textDecoration: 'none', transition: 'color 0.2s' }}>Dashboard</a>
                <a href="/analyze" style={{ fontSize: 14, fontWeight: 500, padding: '8px 20px', borderRadius: 8, background: '#0066FF', color: 'white', textDecoration: 'none', transition: 'all 0.2s' }}>Check My Score</a>
              </div>
            </div>
          </nav>

          {/* AGI Countdown Banner */}
          <div style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 49, background: 'rgba(255,0,40,0.06)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,0,40,0.1)' }}>
            <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', padding: '0 20px', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AGICountdown />
            </div>
          </div>

          {/* Content */}
          <main style={{ paddingTop: 96, flex: 1, width: '100%' }}>
            {children}
          </main>

          {/* Footer */}
          <footer style={{ textAlign: 'center', padding: '40px 20px', color: '#9898AA', fontSize: 13, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p>🛡️ AGI Career Shield — We're not here to scare you. We're here to arm you.</p>
            <p style={{ marginTop: 12, fontSize: 11, color: '#55556A' }}>© 2026 AGI Career Shield.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
