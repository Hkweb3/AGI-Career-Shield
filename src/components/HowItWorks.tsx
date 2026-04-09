'use client';

import { Search, Target, Map, FlaskConical, Users } from 'lucide-react';
import { useInView } from '@/lib/useInView';

const steps = [
  { icon: Search, num: '01', title: 'Brutal Skills Audit', desc: 'We break your job into tasks. Score each against what AI can do now.' },
  { icon: Target, num: '02', title: 'Your AGI Risk Score (0-100)', desc: 'Plus your exact percentile. "Top 23% most at-risk."' },
  { icon: Map, num: '03', title: 'Three Odyssey Plans', desc: 'Three entirely different lives: Pivot, Quality Economy, Human Identity.' },
  { icon: FlaskConical, num: '04', title: 'Prototype Experiments', desc: 'Low-risk, 1-4 week tests for each path.' },
  { icon: Users, num: '05', title: 'Radical Collaboration Cohorts', desc: 'Join 5-10 people on the exact same path.' },
];

export default function HowItWorks() {
  const [ref, isVisible] = useInView({ threshold: 0.1 });
  return (
    <section ref={ref} style={{ width: '100%', padding: '96px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 56, animation: isVisible ? 'fadeInUp 0.6s ease 0.1s both' : 'none' }}>
          60 Seconds. Three Futures. <span className="gradient-text-animated">Your Move.</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', animation: isVisible ? `fadeInUp 0.6s ease ${0.15 + i * 0.1}s both` : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#3B8FFF', background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)', flexShrink: 0 }}>{step.num}</div>
              <div style={{ paddingTop: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <step.icon style={{ width: 18, height: 18, color: '#3B8FFF' }} />
                  <h3 style={{ fontSize: 18, fontWeight: 600 }}>{step.title}</h3>
                </div>
                <p style={{ fontSize: 14, color: '#9898AA', paddingLeft: 26 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
