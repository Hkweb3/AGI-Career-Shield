'use client';

import { useInView } from '@/lib/useInView';

const testimonials = [
  { quote: "I scored 81% as a copywriter. Plan B suggested community experience design. I hosted my first event with 8 people. Best month of my life.", name: 'Sarah K.', from: 'copywriter → Quality Economy' },
  { quote: "My team of 12 accountants all scored 70%+. We transitioned to AI Compliance together. Our firm kept all of us.", name: 'James T.', from: 'Accounting Manager' },
  { quote: "The entry-level navigator showed me that 51% of companies aren't hiring juniors. It gave me a path that bypasses the ladder entirely.", name: 'Alex R.', from: 'Recent Graduate' },
];

export default function SocialProof() {
  const [ref, isVisible] = useInView({ threshold: 0.15 });
  return (
    <section ref={ref} style={{ width: '100%', padding: '96px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 48, animation: isVisible ? 'fadeInUp 0.6s ease 0.1s both' : 'none' }}>
          Real People. Real Scores. <span className="gradient-text-animated">Real Plans.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, animation: isVisible ? `scaleIn 0.6s ease ${0.2 + i * 0.12}s both` : 'none' }}>
              <p style={{ fontSize: 14, color: '#d4d4d4', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</p>
              <p style={{ fontSize: 12, color: '#9898AA' }}>{t.from}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
