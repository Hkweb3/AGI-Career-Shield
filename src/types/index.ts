export interface User {
  id: string;
  email: string;
  full_name: string | null;
  subscription_tier: 'free' | 'pro' | 'premium';
  created_at: string;
}

export interface AnalyzeRequest {
  role: string;
  industry: string;
  years_experience: number;
  skills: string[];
  email?: string;
}

export interface TaskBreakdown {
  task: string;
  ai_capability: number;
  time_spent_pct: number;
  risk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface BrutalSkillsAudit {
  task_breakdown: TaskBreakdown[];
  entry_level_vulnerability: number;
  bottleneck_vs_accessory: 'bottleneck' | 'accessory';
  bottleneck_explanation: string;
}

export interface RiskBreakdown {
  task_automation_score: number;
  market_demand_score: number;
  skill_redundancy_score: number;
  timeline_acceleration: number;
}

export interface PrototypeExperiment {
  week: string;
  action: string;
  hours: number;
  status: 'pending' | 'completed';
}

export interface BeliefReframe {
  belief: string;
  reframe: string;
}

export interface OdysseyPlan {
  rank: number;
  plan_type: 'pivot' | 'quality_economy' | 'human_identity';
  plan_label: string;
  role: string;
  similarity_score: number;
  salary_potential: { min: number; median: number; max: number; upside?: string };
  transition_months: number;
  demand_trend: 'growing' | 'stable' | 'declining';
  demand_growth_pct: number;
  skills_gap: string[];
  prototype_experiments: PrototypeExperiment[];
  beliefs_addressed: BeliefReframe[];
  why_this_matters: string;
  cohort_available?: boolean;
  cohort_name?: string;
  cohort_spots_left?: number;
}

export interface FinancialResilience {
  recommended_buffer: string;
  two_shelf_warning: boolean;
  two_shelf_explanation: string;
  data_dividend_opportunity: boolean;
}

export interface AnalyzeResponse {
  assessment_id: string;
  overall_risk_score: number;
  risk_level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  percentile: string;
  brutal_skills_audit: BrutalSkillsAudit;
  breakdown: RiskBreakdown;
  odyssey_plans: OdysseyPlan[];
  financial_resilience: FinancialResilience;
  dysfunctional_beliefs_identified: string[];
  shareable_card_url: string;
  card_text: string;
  ai_explanation?: string;  // LLM-generated explanation
}

export interface WaitlistEntry {
  email: string;
  role?: string;
  industry?: string;
  source?: string;
}

export interface RoleAutocompleteResult {
  title: string;
  soc_code: string;
  industry: string;
}
