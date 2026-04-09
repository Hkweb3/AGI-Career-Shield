'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, TrendingUp, Users } from 'lucide-react';
import { useAnimatedNumber } from '@/lib/useInView';

const INITIAL_TEXT = 'Your Job Has an Expiration Date.';

export default function Hero() {
  const router = useRouter();
  const [role, setRole] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= INITIAL_TEXT.length) {
        setDisplayedText(INITIAL_TEXT.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const weeklyChecks = useAnimatedNumber(47293, 2500, statsVisible);
  const totalUsers = useAnimatedNumber(12847, 2000, statsVisible);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role.trim()) router.push(`/analyze?role=${encodeURIComponent(role.trim())}`);
  };

  return (
    <section style={{ minHeight: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', width: '100%' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,102,255,0.08), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', padding: '0 20px', textAlign: 'center' }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)', borderRadius: 999, padding: '8px 20px', marginBottom: 40, animation: 'fadeInUp 0.6s ease forwards' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 8px rgba(0,255,136,0.5)', animation: 'dotPulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 14, color: 'rgba(180,210,255,0.9)' }}>{weeklyChecks.toLocaleString()} checks this week — up 23%</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 72px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24, animation: 'fadeInUp 0.8s ease 0.3s forwards', opacity: 0 }}>
          <span className="gradient-text-animated">{displayedText}</span>
          {showCursor && <span style={{ color: '#3B8FFF', animation: 'dotPulse 1s step-end infinite' }}>|</span>}
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 18, color: '#9898AA', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', marginBottom: 40, lineHeight: 1.7, animation: 'fadeInUp 0.8s ease 0.8s forwards', opacity: 0 }}>
          <strong style={{ color: '#F0F0F5' }}>AGI — AI that can do ANY job a human can</strong> — is expected by 2027-2028.
          In 2025, AI was cited in 55,000 layoffs. Worker anxiety jumped from 28% to 40% in 18 months.
          This isn&apos;t a distant threat.
        </p>

        {/* Input */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', marginBottom: 32, animation: 'fadeInUp 0.8s ease 1.1s forwards', opacity: 0 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter your job title..."
              style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 20px', color: '#F0F0F5', fontSize: 18, outline: 'none', transition: 'all 0.3s' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,102,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,102,255,0.15)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, whiteSpace: 'nowrap' }}>
              Check <ArrowRight style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </form>

        <p style={{ fontSize: 14, color: '#55556A', marginBottom: 40, animation: 'fadeInUp 0.8s ease 1.3s forwards', opacity: 0 }}>
          or <a href="/analyze" style={{ color: '#3B8FFF', textDecoration: 'underline', textUnderlineOffset: 2 }}>take the full assessment →</a>
        </p>

        {/* Stats */}
        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto', animation: 'fadeInUp 0.8s ease 1.5s forwards', opacity: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: '#3B8FFF', marginBottom: 4 }}>
              <TrendingUp style={{ width: 16, height: 16 }} />
              <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-geist-mono)' }}>{weeklyChecks.toLocaleString()}</span>
            </div>
            <p style={{ fontSize: 12, color: '#9898AA' }}>checks this week</p>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#FFCC00', marginBottom: 4, fontFamily: 'var(--font-geist-mono)' }}>51%</div>
            <p style={{ fontSize: 12, color: '#9898AA' }}>cutting entry-level</p>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: '#3B8FFF', marginBottom: 4 }}>
              <Users style={{ width: 16, height: 16 }} />
              <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-geist-mono)' }}>{(totalUsers / 1000).toFixed(1)}K</span>
            </div>
            <p style={{ fontSize: 12, color: '#9898AA' }}>people who know</p>
          </div>
        </div>
      </div>
    </section>
  );
}
