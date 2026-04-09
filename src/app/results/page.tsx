'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield, ShieldAlert, ShieldCheck, ShieldX,
  ArrowRight, ChevronDown, ChevronUp,
  Share2, Check, Clock, TrendingUp, Users, Target,
} from 'lucide-react';
import { AnalyzeResponse, OdysseyPlan } from '@/types';
import { useInView, useAnimatedNumber } from '@/lib/useInView';

function getRiskColor(score: number): string {
  if (score >= 80) return '#FF0044';
  if (score >= 60) return '#FF6600';
  if (score >= 40) return '#FFCC00';
  return '#00FF88';
}

function getRiskLabel(score: number): string {
  if (score >= 80) return 'CRITICAL';
  if (score >= 60) return 'HIGH';
  if (score >= 40) return 'MODERATE';
  return 'LOW';
}

function RiskGauge({ score }: { score: number }) {
  const animatedScore = useAnimatedNumber(score, 2000, true);
  const color = getRiskColor(score);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  const Icon = score >= 80 ? ShieldX : score >= 60 ? ShieldAlert : score >= 40 ? ShieldCheck : Shield;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-6 h-6 mb-1" style={{ color }} />
          <span className="text-3xl font-bold font-mono" style={{ color }}>{animatedScore}</span>
          <span className="text-xs text-[#9898AA]">/ 100</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <span className="text-lg font-bold tracking-wider" style={{ color }}>{getRiskLabel(score)} RISK</span>
      </div>
    </div>
  );
}

function TaskBreakdownTable({ tasks }: { tasks: { task: string; ai_capability: number; time_spent_pct: number; risk: string }[] }) {
  const [open, setOpen] = useState(false);

  const riskColor = (r: string) => {
    if (r === 'CRITICAL') return '#FF0044';
    if (r === 'HIGH') return '#FF6600';
    if (r === 'MEDIUM') return '#FFCC00';
    return '#00FF88';
  };

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Target className="w-5 h-5" style={{ color: '#3B8FFF' }} />
          Task-Level Breakdown
        </h3>
        {open ? <ChevronUp className="w-5 h-5 text-[#9898AA]" /> : <ChevronDown className="w-5 h-5 text-[#9898AA]" />}
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div className="space-y-3">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.task}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-white/5 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full transition-all duration-700"
                        style={{
                          width: `${t.ai_capability}%`,
                          backgroundColor: riskColor(t.risk),
                          boxShadow: `0 0 8px ${riskColor(t.risk)}40`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-[#9898AA] w-16">{t.time_spent_pct}% of role</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold font-mono" style={{ color: riskColor(t.risk) }}>
                    {t.ai_capability}%
                  </div>
                  <span className="text-xs font-medium" style={{ color: riskColor(t.risk) }}>{t.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OdysseyPlanCard({ plan, index }: { plan: OdysseyPlan; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  const planGradients: Record<string, string> = {
    pivot: 'from-[#0066FF] to-[#3B8FFF]',
    quality_economy: 'from-[#8B5CF6] to-[#A78BFA]',
    human_identity: 'from-[#EC4899] to-[#F472B6]',
  };

  const planLabels: Record<string, string> = {
    pivot: 'The Pivot',
    quality_economy: 'The Quality Economy',
    human_identity: 'The Human Identity',
  };

  return (
    <div
      ref={ref}
      className="glass-card overflow-hidden"
      style={{ animation: isVisible ? `scaleIn 0.6s ease ${index * 0.15}s both` : 'none' }}
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${planGradients[plan.plan_type]} p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/70 uppercase tracking-wide">
              {planLabels[plan.plan_type]} — Plan #{plan.rank}
            </p>
            <h3 className="text-xl font-bold text-white">{plan.role}</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white font-mono">{plan.similarity_score}%</p>
            <p className="text-xs text-white/70">similarity</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[#9898AA] mb-1">Salary Range</p>
            <p className="text-sm font-semibold">
              ${plan.salary_potential.min.toLocaleString()} — ${plan.salary_potential.max.toLocaleString()}
            </p>
            <p className="text-xs" style={{ color: '#00FF88' }}>Median: ${plan.salary_potential.median.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-[#9898AA] mb-1">Transition Time</p>
            <p className="text-sm font-semibold flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {plan.transition_months} months
            </p>
            <p className="text-xs flex items-center gap-1" style={{ color: '#3B8FFF' }}>
              <TrendingUp className="w-3 h-3" />
              {plan.demand_growth_pct}% YoY
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-[#9898AA] mb-2">Skills You Need to Learn</p>
          <div className="flex flex-wrap gap-2">
            {plan.skills_gap.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-lg"
                style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', color: '#C4B5FD' }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-[#d4d4d4] italic leading-relaxed">
          &ldquo;{plan.why_this_matters}&rdquo;
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-sm transition-colors"
          style={{ color: '#3B8FFF' }}
        >
          <span className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Prototype Experiments ({plan.prototype_experiments.length})
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="space-y-3 pt-2">
            {plan.prototype_experiments.map((exp, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: 'rgba(0, 102, 255, 0.15)', color: '#3B8FFF' }}
                >
                  W{exp.week}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{exp.action}</p>
                  <p className="text-xs text-[#9898AA] mt-1">~{exp.hours} hours</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {plan.cohort_available && plan.cohort_spots_left && plan.cohort_spots_left > 0 && (
          <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(0, 102, 255, 0.04)', border: '1px solid rgba(0, 102, 255, 0.15)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: '#3B8FFF' }} />
                <div>
                  <p className="text-sm font-medium">{plan.cohort_name}</p>
                  <p className="text-xs text-[#9898AA]">{plan.cohort_spots_left} spots left</p>
                </div>
              </div>
              <button
                className="text-xs font-medium px-4 py-2 rounded-lg transition-colors"
                style={{ background: '#0066FF', color: 'white' }}
              >
                Join
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [ref, isVisible] = useInView({ threshold: 0.05 });

  useEffect(() => {
    const stored = sessionStorage.getItem('lastAnalysis');
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      router.push('/analyze');
    }
  }, [router]);

  if (!data) return null;

  // Tint background based on risk
  const riskTint = data.overall_risk_score >= 70 ? 'rgba(255,0,68,0.02)' :
    data.overall_risk_score >= 50 ? 'rgba(255,102,0,0.02)' :
      data.overall_risk_score >= 30 ? 'rgba(255,204,0,0.02)' : 'rgba(0,255,136,0.02)';

  const handleShare = async () => {
    const text = data.card_text;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };

  return (
    <section
      ref={ref}
      className="min-h-screen py-12 sm:py-20"
      style={{ background: riskTint }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Score Header */}
        <div className="text-center" style={{ animation: isVisible ? 'fadeInUp 0.6s ease 0.1s both' : 'none' }}>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-geist)' }}>Your AGI Risk Assessment</h1>
          <p className="text-[#9898AA] mb-8">{data.percentile}</p>
          <RiskGauge score={data.overall_risk_score} />

          {/* Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
            {[
              { label: 'Task Automation', value: data.breakdown.task_automation_score },
              { label: 'Market Demand', value: data.breakdown.market_demand_score },
              { label: 'Skill Redundancy', value: data.breakdown.skill_redundancy_score },
              { label: 'Timeline', value: data.breakdown.timeline_acceleration },
            ].map((item, i) => (
              <div
                key={item.label}
                className="glass-card p-4"
                style={{ animation: isVisible ? `scaleIn 0.5s ease ${0.3 + i * 0.1}s both` : 'none' }}
              >
                <p className="text-xs text-[#9898AA] mb-1">{item.label}</p>
                <p className="text-2xl font-bold font-mono" style={{ color: getRiskColor(item.value) }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottleneck/Accessory */}
        <div
          className="glass-card p-6"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease 0.5s both' : 'none' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: data.brutal_skills_audit.bottleneck_vs_accessory === 'bottleneck' ? '#FF0044' : '#FFCC00',
                boxShadow: `0 0 8px ${data.brutal_skills_audit.bottleneck_vs_accessory === 'bottleneck' ? '#FF0044' : '#FFCC00'}60`,
              }}
            />
            <span className="font-semibold uppercase text-sm tracking-wide">
              {data.brutal_skills_audit.bottleneck_vs_accessory === 'bottleneck' ? '⚡ BOTTLENECK ROLE' : '🤝 ACCESSORY ROLE'}
            </span>
          </div>
          <p className="text-sm text-[#9898AA]">{data.brutal_skills_audit.bottleneck_explanation}</p>
        </div>

        {/* Task Breakdown */}
        <div style={{ animation: isVisible ? 'fadeInUp 0.6s ease 0.6s both' : 'none' }}>
          <TaskBreakdownTable tasks={data.brutal_skills_audit.task_breakdown} />
        </div>

        {/* Entry-Level Vulnerability */}
        <div
          className="glass-card p-6"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease 0.7s both' : 'none' }}
        >
          <h3 className="text-lg font-semibold mb-2">Entry-Level Pipeline Vulnerability</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white/5 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-1000"
                style={{
                  width: `${data.brutal_skills_audit.entry_level_vulnerability}%`,
                  backgroundColor: '#FF6600',
                  boxShadow: '0 0 8px rgba(255,102,0,0.4)',
                }}
              />
            </div>
            <span className="text-lg font-bold font-mono text-[#FF6600]">
              {data.brutal_skills_audit.entry_level_vulnerability}%
            </span>
          </div>
          <p className="text-xs text-[#9898AA] mt-2">
            51% of companies are reducing entry-level hiring due to AI. Your role&apos;s entry vulnerability is {data.brutal_skills_audit.entry_level_vulnerability >= 70 ? 'VERY HIGH' : data.brutal_skills_audit.entry_level_vulnerability >= 50 ? 'HIGH' : 'MODERATE'}.
          </p>
        </div>

        {/* Dysfunctional Beliefs */}
        {data.dysfunctional_beliefs_identified.length > 0 && (
          <div
            className="glass-card p-6"
            style={{ animation: isVisible ? 'fadeInUp 0.6s ease 0.8s both' : 'none' }}
          >
            <h3 className="text-lg font-semibold mb-4">Beliefs Holding You Back</h3>
            <div className="space-y-3">
              {data.dysfunctional_beliefs_identified.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#FF0044] text-lg">✕</span>
                  <p className="text-sm text-[#9898AA] italic">&ldquo;{b}&rdquo;</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#9898AA] mt-4">
              Your Odyssey Plans below directly reframe each of these.
            </p>
          </div>
        )}

        {/* Odyssey Plans */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center" style={{ fontFamily: 'var(--font-geist)' }}>
            Your Three <span className="gradient-text-animated">Odyssey Plans</span>
          </h2>
          <p className="text-[#9898AA] text-center mb-8 text-sm">
            Three entirely different futures. Prototype each one before committing.
          </p>
          <div className="space-y-6">
            {data.odyssey_plans.map((plan, i) => (
              <OdysseyPlanCard key={plan.plan_type} plan={plan} index={i} />
            ))}
          </div>
        </div>

        {/* Financial Resilience */}
        <div
          className="glass-card p-6"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease 1.2s both' : 'none' }}
        >
          <h3 className="text-lg font-semibold mb-3">💰 Financial Resilience Check</h3>
          <p className="text-sm text-[#9898AA] mb-3">
            Recommended emergency buffer: <strong className="text-[#F0F0F5]">{data.financial_resilience.recommended_buffer}</strong>
          </p>
          {data.financial_resilience.two_shelf_warning && (
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,204,0,0.04)', border: '1px solid rgba(255,204,0,0.15)' }}
            >
              <p className="text-sm" style={{ color: '#FFE066' }}>{data.financial_resilience.two_shelf_explanation}</p>
            </div>
          )}
        </div>

        {/* Share */}
        <div
          className="glass-card p-6 text-center"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease 1.3s both' : 'none' }}
        >
          <p className="text-sm text-[#9898AA] mb-3">Share your score</p>
          <p className="text-[#F0F0F5] text-sm italic mb-4">&ldquo;{data.card_text}&rdquo;</p>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-2.5 rounded-lg transition-all"
            style={{ background: '#0066FF', color: 'white' }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>

        {/* CTA */}
        <div className="text-center py-8" style={{ animation: isVisible ? 'fadeInUp 0.6s ease 1.4s both' : 'none' }}>
          <p className="text-[#9898AA] mb-4">
            This is your free assessment. Upgrade to Pro for continuous monitoring, skill gap analysis, and cohort access.
          </p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-1 text-sm transition-colors"
            style={{ color: '#3B8FFF' }}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}
