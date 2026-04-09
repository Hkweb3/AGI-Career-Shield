'use client';

import { Heart, Sparkles, Users } from 'lucide-react';
import { useInView } from '@/lib/useInView';

const items = [
  { icon: Heart, text: 'A meal cooked by someone who cares' },
  { icon: Sparkles, text: 'Furniture made by hand, with a story' },
  { icon: Users, text: 'A teacher who understands their child' },
  { icon: Heart, text: 'Art made by a human who felt something' },
  { icon: Users, text: 'A community built by someone who was there' },
];

export default function QualityEconomy() {
  const [ref, isVisible] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} style={{ width: '100%', padding: '96px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 650, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 48, animation: isVisible ? 'fadeInUp 0.6s ease 0.1s both' : 'none' }}>
          AGI Makes Everything Cheap. <span className="gradient-text-animated">Here&apos;s What Becomes Expensive.</span>
        </h2>
        <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '48px 40px', animation: isVisible ? 'scaleIn 0.6s ease 0.2s both' : 'none' }}>
          <p style={{ color: '#9898AA', textAlign: 'center', marginBottom: 32, lineHeight: 1.7 }}>When AI drives the cost of everything to zero, people start craving what AI CANNOT create:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, animation: isVisible ? `slideInLeft 0.5s ease ${0.3 + i * 0.08}s both` : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.15)', flexShrink: 0 }}><item.icon style={{ width: 18, height: 18, color: '#3B8FFF' }} /></div>
                <p style={{ fontSize: 17, color: '#F0F0F5' }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 32, textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>This is the <span className="gradient-text-animated">Quality Economy</span>.</p>
            <p style={{ fontSize: 14, color: '#9898AA' }}>We&apos;ll show you how to position yourself inside it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
