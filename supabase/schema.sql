-- AGI Career Shield — Supabase Schema
-- Run this in your Supabase SQL Editor after creating the project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'premium')),
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES users(id)
);

-- User profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  current_role TEXT NOT NULL,
  industry TEXT,
  years_experience INTEGER,
  skills TEXT[],
  salary_range JSONB,
  location TEXT,
  resume_url TEXT,
  linkedin_url TEXT,
  life_domains JSONB,
  dysfunctional_beliefs TEXT[],
  primary_motivation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Risk assessments
CREATE TABLE IF NOT EXISTS risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL,
  task_automation_score INTEGER,
  market_demand_score INTEGER,
  skill_redundancy_score INTEGER,
  timeline_acceleration INTEGER,
  task_breakdown JSONB,
  entry_level_vulnerability INTEGER,
  bottleneck_vs_accessory TEXT,
  breakdown JSONB,
  ai_analysis TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial assessments
CREATE TABLE IF NOT EXISTS financial_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  months_of_buffer DECIMAL,
  emergency_fund_adequate BOOLEAN,
  capital_ownership_pct DECIMAL,
  two_shelf_positioning TEXT,
  data_dividend_eligible BOOLEAN,
  recommended_actions JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6-Domain life assessments
CREATE TABLE IF NOT EXISTS life_domain_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID REFERENCES risk_assessments(id) ON DELETE CASCADE,
  domain TEXT NOT NULL CHECK (domain IN ('employment', 'home', 'health', 'education', 'civic', 'social')),
  readiness_score INTEGER,
  agi_exposure INTEGER,
  notes TEXT,
  data JSONB
);

-- Odyssey Plans
CREATE TABLE IF NOT EXISTS odyssey_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID REFERENCES risk_assessments(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('pivot', 'quality_economy', 'human_identity')),
  plan_label TEXT,
  target_role TEXT NOT NULL,
  similarity_score INTEGER,
  salary_potential JSONB,
  transition_months INTEGER,
  demand_trend TEXT,
  demand_growth_pct DECIMAL,
  required_skills TEXT[],
  skills_gap TEXT[],
  recommended_resources JSONB[],
  prototype_experiments JSONB,
  beliefs_addressed JSONB,
  why_this_matters TEXT,
  rank INTEGER,
  user_progress JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Waitlist
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT,
  industry TEXT,
  source TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  notified_at TIMESTAMPTZ
);

-- Shared risk cards
CREATE TABLE IF NOT EXISTS shared_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  card_url TEXT,
  risk_score INTEGER,
  role TEXT,
  percentile_rank TEXT,
  shared_on TEXT,
  views INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Risk snapshots (monitoring)
CREATE TABLE IF NOT EXISTS risk_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  overall_score INTEGER,
  change_from_previous INTEGER,
  reason_for_change TEXT,
  macro_events JSONB,
  snapshot_date TIMESTAMPTZ DEFAULT NOW(),
  data JSONB
);

-- Cohorts
CREATE TABLE IF NOT EXISTS cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  odyssey_plan_type TEXT,
  target_role TEXT,
  name TEXT,
  max_members INTEGER DEFAULT 10,
  current_members INTEGER DEFAULT 0,
  start_date DATE,
  status TEXT DEFAULT 'forming' CHECK (status IN ('forming', 'active', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cohort members
CREATE TABLE IF NOT EXISTS cohort_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID REFERENCES cohorts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  engagement_score INTEGER,
  UNIQUE(cohort_id, user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_risk_assessments_user ON risk_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_odyssey_plans_assessment ON odyssey_plans(assessment_id);
CREATE INDEX IF NOT EXISTS idx_risk_snapshots_user ON risk_snapshots(user_id, snapshot_date DESC);
CREATE INDEX IF NOT EXISTS idx_cohort_members_cohort ON cohort_members(cohort_id);
CREATE INDEX IF NOT EXISTS idx_cohort_members_user ON cohort_members(user_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Anyone can insert into waitlist
CREATE POLICY "Anyone can join waitlist" ON waitlist FOR INSERT WITH CHECK (true);

-- Users can only see their own data
CREATE POLICY "Users see own data" ON risk_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users see own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Public stats count function
CREATE OR REPLACE FUNCTION get_waitlist_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM waitlist;
$$ LANGUAGE sql SECURITY DEFINER;
