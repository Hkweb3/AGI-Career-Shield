'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Briefcase, Building2, Star, X } from 'lucide-react';
import { AnalyzeResponse } from '@/types';
import { COMMON_ROLES } from '@/lib/constants';

function getRoleFromURL(): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('role') || '';
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  padding: '14px 16px',
  color: '#F0F0F5',
  fontSize: 15,
  outline: 'none',
  transition: 'all 0.3s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 8,
  color: '#d4d4d4',
};

export default function AnalyzePage() {
  const router = useRouter();
  const [role, setRole] = useState(getRoleFromURL);
  const [industry, setIndustry] = useState('');
  const [yearsExp, setYearsExp] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState<'audit' | 'plans'>('audit');
  const [roleSuggestions, setRoleSuggestions] = useState<typeof COMMON_ROLES>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (role.length >= 2) {
      const f = COMMON_ROLES.filter(r => r.title.toLowerCase().includes(role.toLowerCase())).slice(0, 8);
      setRoleSuggestions(f);
      setShowSuggestions(f.length > 0);
    } else {
      setRoleSuggestions([]);
      setShowSuggestions(false);
    }
  }, [role]);

  const addSkill = useCallback(() => {
    const s = skillInput.trim();
    if (s && !skills.includes(s) && skills.length < 15) {
      setSkills([...skills, s]);
      setSkillInput('');
    }
  }, [skillInput, skills]);

  const removeSkill = useCallback((s: string) => {
    setSkills(skills.filter(x => x !== s));
  }, [skills]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || skills.length < 3) return;

    setLoading(true);
    setLoadingPhase('audit');

    try {
      await new Promise(r => setTimeout(r, 800));
      setLoadingPhase('plans');
      await new Promise(r => setTimeout(r, 600));

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: role.trim(), industry: industry.trim() || 'General', years_experience: parseInt(yearsExp) || 3, skills, email: email.trim() || undefined }),
      });

      if (!res.ok) throw new Error('Analysis failed');
      const data: AnalyzeResponse = await res.json();
      sessionStorage.setItem('lastAnalysis', JSON.stringify(data));
      router.push('/results');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'rgba(0,102,255,0.5)';
    e.currentTarget.style.boxShadow = '0 0 20px rgba(0,102,255,0.1)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <section style={{ width: '100%', padding: '80px 20px', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em' }}>
            The <span className="gradient-text-animated">Brutal Skills Audit</span>
          </h1>
          <p style={{ color: '#9898AA', fontSize: 16, lineHeight: 1.6 }}>
            Tell us about your role. We&apos;ll show you exactly what AI can do — and what&apos;s still yours.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Role */}
          <div style={{ position: 'relative' }}>
            <label style={labelStyle}><Briefcase style={{ width: 16, height: 16, display: 'inline', verticalAlign: 'middle', marginRight: 6, color: '#3B8FFF' }} /> Your Role *</label>
            <input type="text" value={role} onChange={e => setRole(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}
              placeholder="e.g. Financial Analyst, Software Engineer..." style={inputStyle} required />
            {showSuggestions && roleSuggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, maxHeight: 240, overflowY: 'auto', zIndex: 20 }}>
                {roleSuggestions.map(r => (
                  <button key={r.soc_code} type="button" onMouseDown={() => { setRole(r.title); setIndustry(r.industry); setShowSuggestions(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#F0F0F5', fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{r.title}</span><span style={{ color: '#55556A', fontSize: 12 }}>{r.industry}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Industry */}
          <div>
            <label style={labelStyle}><Building2 style={{ width: 16, height: 16, display: 'inline', verticalAlign: 'middle', marginRight: 6, color: '#3B8FFF' }} /> Industry</label>
            <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}
              placeholder="e.g. Banking, Technology, Healthcare..." style={inputStyle} />
          </div>

          {/* Years */}
          <div>
            <label style={labelStyle}>Years of Experience</label>
            <input type="number" value={yearsExp} onChange={e => setYearsExp(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}
              placeholder="e.g. 5" min="0" max="50" style={inputStyle} />
          </div>

          {/* Skills */}
          <div>
            <label style={labelStyle}><Star style={{ width: 16, height: 16, display: 'inline', verticalAlign: 'middle', marginRight: 6, color: '#3B8FFF' }} /> Your Skills * (at least 3)</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                onFocus={handleFocus} onBlur={handleBlur}
                placeholder="Type a skill and press Enter..." style={{ ...inputStyle, flex: 1 }} />
              <button type="button" onClick={addSkill} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '0 20px', color: '#F0F0F5', cursor: 'pointer', transition: 'all 0.2s' }}>Add</button>
            </div>
            {skills.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {skills.map(s => (
                  <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)', color: '#93C5FD', fontSize: 13, padding: '6px 12px', borderRadius: 8 }}>
                    {s}
                    <button type="button" onClick={() => removeSkill(s)} style={{ background: 'none', border: 'none', color: '#60A5FA', cursor: 'pointer', padding: 0, display: 'flex' }}><X style={{ width: 14, height: 14 }} /></button>
                  </span>
                ))}
              </div>
            )}
            {skills.length > 0 && skills.length < 3 && (
              <p style={{ fontSize: 12, color: '#9898AA', marginTop: 8 }}>Add {3 - skills.length} more to continue</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email (optional — receive full report)</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}
              placeholder="you@example.com" style={inputStyle} />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading || skills.length < 3}
            style={{
              width: '100%',
              fontWeight: 600,
              padding: loading ? '32px 24px 28px' : '16px 24px',
              borderRadius: 12,
              border: 'none',
              cursor: loading || skills.length < 3 ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              background: loading ? 'rgba(255,255,255,0.02)' : 'linear-gradient(135deg, #0066FF, #3B8FFF)',
              color: 'white',
              boxShadow: loading ? 'none' : '0 0 20px rgba(0,102,255,0.3), 0 4px 12px rgba(0,0,0,0.3)',
              opacity: skills.length < 3 ? 0.4 : 1,
              transition: 'all 0.3s',
            }}>
            {loading ? (
              <>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B8FFF', animation: 'dotPulse 1.4s ease-in-out infinite' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B8FFF', animation: 'dotPulse 1.4s ease-in-out 0.2s infinite' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B8FFF', animation: 'dotPulse 1.4s ease-in-out 0.4s infinite' }} />
                </div>
                <span style={{ fontSize: 14, color: '#9898AA' }}>
                  {loadingPhase === 'audit' ? 'Running Brutal Skills Audit...' : 'Generating Odyssey Plans...'}
                </span>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16 }}>
                Get My AGI Risk Score <ArrowRight style={{ width: 20, height: 20 }} />
              </div>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
