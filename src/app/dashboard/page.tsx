'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Shield, TrendingUp, Clock, BarChart3, Users } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('lastAnalysis');
    setHasHistory(!!stored);
  }, []);

  return (
    <section style={{ width: '100%', padding: '80px 20px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Your <span className="gradient-text-animated">AGI Dashboard</span></h1>
          <p style={{ color: '#9898AA', fontSize: 16 }}>Track your risk, monitor trends, and manage your Odyssey Plans.</p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: Shield, label: 'Current Risk', value: hasHistory ? 'Check your last score' : 'Not assessed', sub: 'Take the assessment', color: '#3B8FFF' },
            { icon: TrendingUp, label: 'Assessments', value: hasHistory ? '1' : '0', sub: 'Total taken', color: '#00FF88' },
            { icon: Clock, label: 'Last Check', value: hasHistory ? 'Recently' : 'Never', sub: 'Check weekly', color: '#FFCC00' },
            { icon: BarChart3, label: 'Risk Trend', value: '—', sub: 'Assess again to track', color: '#8B5CF6' },
          ].map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: 24 }}>
              <stat.icon style={{ width: 24, height: 24, color: stat.color, marginBottom: 12 }} />
              <p style={{ fontSize: 12, color: '#9898AA', marginBottom: 4 }}>{stat.label}</p>
              <p style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-geist-mono)' }}>{stat.value}</p>
              <p style={{ fontSize: 11, color: '#55556A', marginTop: 4 }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
          <button onClick={() => router.push('/analyze')} className="glass-card" style={{ padding: 32, cursor: 'pointer', textAlign: 'left', width: '100%', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Shield style={{ width: 24, height: 24, color: '#3B8FFF' }} />
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>Take Assessment</h3>
            </div>
            <p style={{ fontSize: 14, color: '#9898AA' }}>Check your AGI risk score and get your 3 Odyssey Plans.</p>
          </button>

          <div className="glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Users style={{ width: 24, height: 24, color: '#8B5CF6' }} />
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>Join a Cohort</h3>
            </div>
            <p style={{ fontSize: 14, color: '#9898AA' }}>Connect with others on the same transition path. Coming soon.</p>
          </div>
        </div>

        {/* Last Assessment */}
        {hasHistory && (
          <div className="glass-card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Your Last Assessment</h3>
            <button
              onClick={() => router.push('/results')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.15)', borderRadius: 12, padding: 20, cursor: 'pointer', color: 'inherit' }}
            >
              <div>
                <p style={{ fontSize: 16, fontWeight: 600 }}>View Results</p>
                <p style={{ fontSize: 13, color: '#9898AA' }}>See your risk score and Odyssey Plans</p>
              </div>
              <ArrowRight style={{ width: 20, height: 20, color: '#3B8FFF' }} />
            </button>
          </div>
        )}

        {/* Upgrade CTA */}
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ color: '#9898AA', fontSize: 14, marginBottom: 8 }}>🔒 Continuous monitoring, skill tracking, and cohort access</p>
          <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Upgrade to Pro — $19.99/mo</p>
          <button style={{ opacity: 0.5, cursor: 'not-allowed', padding: '12px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #0066FF, #3B8FFF)', color: 'white', fontWeight: 600, fontSize: 16 }}>
            Coming Soon
          </button>
        </div>
      </div>
    </section>
  );
}
