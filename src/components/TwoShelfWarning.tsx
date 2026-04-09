'use client';

import { AlertCircle, TrendingUp, Wallet, Coins } from 'lucide-react';
import { useInView } from '@/lib/useInView';

export default function TwoShelfWarning() {
  const [ref, isVisible] = useInView({ threshold: 0.15 });
  return (
    <section ref={ref} style={{ width: '100%', padding: '96px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 48, animation: isVisible ? 'fadeInUp 0.6s ease 0.1s both' : 'none' }}>
          The Economy Is Splitting In Two. <span style={{ color: '#FFCC00' }}>Which Shelf?</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 48 }}>
          <div style={{ background: 'rgba(255,0,68,0.03)', border: '1px solid rgba(255,0,68,0.12)', borderRadius: 20, padding: 32, animation: isVisible ? 'fadeInUp 0.6s ease 0.2s both' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><AlertCircle style={{ width: 22, height: 22, color: '#FF0044' }} /><h3 style={{ fontSize: 16, fontWeight: 700, color: '#FF0044' }}>LOWER SHELF</h3></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: '#9898AA' }}>
              <li style={{ display: 'flex', gap: 8 }}><span style={{ color: '#FF0044' }}>→</span> Survival on UBI + algorithmic basics</li>
              <li style={{ display: 'flex', gap: 8 }}><span style={{ color: '#FF0044' }}>→</span> No ambition. No risk-taking.</li>
              <li style={{ display: 'flex', gap: 8 }}><span style={{ color: '#FF0044' }}>→</span> Wages capped at cost of compute</li>
            </ul>
          </div>
          <div style={{ background: 'rgba(0,255,136,0.03)', border: '1px solid rgba(0,255,136,0.12)', borderRadius: 20, padding: 32, animation: isVisible ? 'fadeInUp 0.6s ease 0.3s both' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><TrendingUp style={{ width: 22, height: 22, color: '#00FF88' }} /><h3 style={{ fontSize: 16, fontWeight: 700, color: '#00FF88' }}>UPPER SHELF</h3></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: '#9898AA' }}>
              <li style={{ display: 'flex', gap: 8 }}><span style={{ color: '#00FF88' }}>→</span> Capital ownership + data dividends</li>
              <li style={{ display: 'flex', gap: 8 }}><span style={{ color: '#00FF88' }}>→</span> Ambition preserved. Access to real economy.</li>
              <li style={{ display: 'flex', gap: 8 }}><span style={{ color: '#00FF88' }}>→</span> Skills the upper shelf values</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', animation: isVisible ? 'fadeInUp 0.6s ease 0.5s both' : 'none' }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 24 }}>The gap between shelves is the defining inequality of the post-AGI era.</p>
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
            <p style={{ fontSize: 13, color: '#9898AA', marginBottom: 16 }}>Our Financial Resilience Module:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ icon: Wallet, text: '9-12 month emergency buffer' }, { icon: Coins, text: 'Capital income diversification' }, { icon: TrendingUp, text: 'Data dividend eligibility' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><item.icon style={{ width: 16, height: 16, color: '#3B8FFF' }} /><span>{item.text}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
