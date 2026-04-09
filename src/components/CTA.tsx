'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { useInView } from '@/lib/useInView';

export default function CTA() {
  const router = useRouter();
  const [ref, isVisible] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} style={{ width: '100%', padding: '112px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,102,255,0.06), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 650, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', animation: isVisible ? 'fadeInUp 0.8s ease 0.1s both' : 'none' }}>
        <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 24 }}>
          Every Week You Wait, <span className="gradient-text-animated">Your Score Goes Up.</span>
        </h2>
        <p style={{ color: '#9898AA', fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
          Automation happens task by task, month by month. People who check early have a 3x higher success rate.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 32, fontSize: 14, color: '#9898AA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock style={{ width: 16, height: 16, color: '#3B8FFF' }} /> Weak AGI by 2028 — <strong style={{ color: '#F0F0F5' }}>2.5 years</strong></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock style={{ width: 16, height: 16, color: '#3B8FFF' }} /> Avg transition: <strong style={{ color: '#F0F0F5' }}>4-8 months</strong></div>
        </div>
        <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 32 }}>You still have time. But not much.</p>
        <button onClick={() => router.push('/analyze')} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 18 }}>
          CHECK MY SCORE — IT&apos;S FREE <ArrowRight style={{ width: 22, height: 22 }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 24, fontSize: 14, color: '#9898AA' }}>
          <Users style={{ width: 16, height: 16 }} />
          <span>12,847 people who already know their score</span>
        </div>
      </div>
    </section>
  );
}
