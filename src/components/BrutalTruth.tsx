'use client';

import { AlertTriangle, TrendingDown, Brain, Shield } from 'lucide-react';
import { useInView, useAnimatedNumber } from '@/lib/useInView';

const stats = [
  { icon: AlertTriangle, value: 55000, label: 'layoffs cited AI as factor', color: '#FF0044' },
  { icon: TrendingDown, value: 51, label: 'cutting entry-level hiring', color: '#FFCC00', suffix: '%' },
  { icon: Brain, value: 2028, label: 'AGI arrival (Metaculus)', color: '#8B5CF6', suffix: '-33' },
  { icon: Shield, value: 10, label: 'white-collar could shrink to', color: '#FFCC00', suffix: '%' },
];

function StatCard({ stat, delay, isVisible }: { stat: typeof stats[0]; delay: number; isVisible: boolean }) {
  const val = useAnimatedNumber(stat.value, 2000, isVisible);
  const display = stat.value > 100 ? `${Math.floor(val / 1000)}K${stat.suffix || ''}` : `${val}${stat.suffix || ''}`;
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px 16px', textAlign: 'center', animation: isVisible ? `scaleIn 0.6s ease ${delay}s both` : 'none', transition: 'all 0.3s' }}>
      <stat.icon style={{ width: 24, height: 24, margin: '0 auto 12px', color: stat.color }} />
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-geist-mono)', color: stat.color, marginBottom: 8 }}>{display}</div>
      <p style={{ fontSize: 12, color: '#9898AA' }}>{stat.label}</p>
    </div>
  );
}

export default function BrutalTruth() {
  const [ref, isVisible] = useInView({ threshold: 0.15 });
  return (
    <section ref={ref} style={{ width: '100%', padding: '96px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
      <div style={{ maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, animation: isVisible ? 'fadeInUp 0.6s ease 0.1s both' : 'none' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>The Data Doesn&apos;t Lie.</h2>
          <p style={{ color: '#9898AA', maxWidth: 500, margin: '0 auto' }}>Current measurements of a transition already underway.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {stats.map((s, i) => <StatCard key={s.label} stat={s} delay={i * 0.12} isVisible={isVisible} />)}
        </div>
        <p style={{ textAlign: 'center', marginTop: 40, fontSize: 14, color: '#9898AA', animation: isVisible ? 'fadeInUp 0.6s ease 0.7s both' : 'none' }}>
          Compute doubles every 6 months. Efficiency grows 2.5x per year. <span style={{ color: '#F0F0F5', fontWeight: 500 }}>Your timeline is shorter than you think.</span>
        </p>
      </div>
    </section>
  );
}
