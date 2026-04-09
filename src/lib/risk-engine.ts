import { AnalyzeRequest, AnalyzeResponse, TaskBreakdown, OdysseyPlan } from '@/types';
import { ROLE_TASK_DATA, DEFAULT_TASKS, ODYSSEY_PLANS_BY_CATEGORY, ROLE_TO_INDUSTRY } from './constants';

function getRiskLabel(score: number): 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' {
  if (score >= 80) return 'CRITICAL';
  if (score >= 60) return 'HIGH';
  if (score >= 40) return 'MODERATE';
  return 'LOW';
}

function getRiskColor(score: number): string {
  if (score >= 80) return '#EF4444';
  if (score >= 60) return '#F97316';
  if (score >= 40) return '#EAB308';
  return '#22C55E';
}

function getTaskRiskLabel(aiCapability: number): 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' {
  if (aiCapability >= 85) return 'CRITICAL';
  if (aiCapability >= 70) return 'HIGH';
  if (aiCapability >= 50) return 'MEDIUM';
  return 'LOW';
}

function getPercentileText(score: number, role: string): string {
  if (score >= 80) return `You're in the top 10% most at-risk ${role.toLowerCase()}s`;
  if (score >= 65) return `You're in the top 25% most at-risk ${role.toLowerCase()}s`;
  if (score >= 50) return `You're in the top 40% most at-risk ${role.toLowerCase()}s`;
  if (score >= 35) return `You're in the top 60% most at-risk ${role.toLowerCase()}s`;
  return `You're in the bottom 40% most at-risk ${role.toLowerCase()}s`;
}

function calculateEntryLevelVulnerability(role: string): number {
  // Roles that traditionally rely heavily on entry-level tasks
  const highVulnerability = ['Accountant', 'Software Engineer', 'Data Entry Clerk', 'Paralegal', 'Financial Analyst', 'Business Analyst'];
  const mediumVulnerability = ['Content Writer', 'Copywriter', 'Graphic Designer', 'Marketing Manager', 'Recruiter'];

  if (highVulnerability.includes(role)) return 80 + Math.floor(Math.random() * 15);
  if (mediumVulnerability.includes(role)) return 60 + Math.floor(Math.random() * 20);
  return 40 + Math.floor(Math.random() * 30);
}

function generateTaskBreakdown(role: string): TaskBreakdown[] {
  const roleData = ROLE_TASK_DATA[role];
  const tasks = roleData ? roleData.tasks : DEFAULT_TASKS;

  return tasks.map(t => ({
    task: t.task,
    ai_capability: t.ai_capability,
    time_spent_pct: t.time_spent_pct,
    risk: getTaskRiskLabel(t.ai_capability),
  }));
}

function calculateRiskScores(taskBreakdown: TaskBreakdown[], role: string): {
  overall: number;
  taskAutomation: number;
  marketDemand: number;
  skillRedundancy: number;
  timelineAcceleration: number;
} {
  // Task Automation Risk (40% weight)
  const taskAutomation = taskBreakdown.reduce(
    (sum, t) => sum + t.ai_capability * (t.time_spent_pct / 100), 0
  );

  // Market Demand Shift (25% weight) - approximated
  // Bottleneck roles have higher market demand risk
  const isBottleneck = ROLE_TASK_DATA[role]?.bottleneck ?? false;
  const marketDemand = isBottleneck
    ? 55 + Math.floor(Math.random() * 20)
    : 35 + Math.floor(Math.random() * 25);

  // Skill Redundancy Index (20% weight)
  const highAiTasks = taskBreakdown.filter(t => t.ai_capability >= 70);
  const skillRedundancy = (highAiTasks.length / Math.max(taskBreakdown.length, 1)) * 100;

  // Timeline Acceleration (15% weight)
  const timelineAcceleration = isBottleneck
    ? 60 + Math.floor(Math.random() * 20)
    : 40 + Math.floor(Math.random() * 25);

  // Weighted final score
  const overall =
    taskAutomation * 0.40 +
    marketDemand * 0.25 +
    skillRedundancy * 0.20 +
    timelineAcceleration * 0.15;

  return {
    overall: Math.round(overall),
    taskAutomation: Math.round(taskAutomation),
    marketDemand,
    skillRedundancy: Math.round(skillRedundancy),
    timelineAcceleration,
  };
}

function generateOdysseyPlans(role: string, riskScore: number): OdysseyPlan[] {
  const industry = ROLE_TO_INDUSTRY[role] ?? 'default';
  const templates = ODYSSEY_PLANS_BY_CATEGORY[industry] ?? ODYSSEY_PLANS_BY_CATEGORY['default'];

  // Add some randomness to make plans feel personalized
  const addVariance = (val: number, pct: number) =>
    Math.round(val * (1 + (Math.random() - 0.5) * pct));

  const pivot = { ...templates.pivot[0] };
  pivot.salary_potential = {
    min: addVariance(pivot.salary_potential.min, 0.1),
    median: addVariance(pivot.salary_potential.median, 0.1),
    max: addVariance(pivot.salary_potential.max, 0.15),
    upside: pivot.salary_potential.upside,
  };

  const quality = { ...templates.quality_economy[0] };
  quality.salary_potential = {
    min: addVariance(quality.salary_potential.min, 0.1),
    median: addVariance(quality.salary_potential.median, 0.1),
    max: addVariance(quality.salary_potential.max, 0.1),
  };

  const human = { ...templates.human_identity[0] };
  human.salary_potential = {
    min: addVariance(human.salary_potential.min, 0.15),
    median: addVariance(human.salary_potential.median, 0.15),
    max: addVariance(human.salary_potential.max, 0.2),
  };

  return [pivot, quality, human];
}

export function analyzeRisk(req: AnalyzeRequest): AnalyzeResponse {
  // 1. Generate task breakdown
  const taskBreakdown = generateTaskBreakdown(req.role);

  // 2. Calculate risk scores
  const scores = calculateRiskScores(taskBreakdown, req.role);

  // 3. Determine bottleneck/accessory
  const isBottleneck = ROLE_TASK_DATA[req.role]?.bottleneck ?? false;
  const bottleneckExplanation = isBottleneck
    ? `${req.role} is core to economic growth. AGI will automate it first because optimizing this function drives systemic value.`
    : `${req.role} involves significant human elements. However, the routine cognitive tasks within it are being automated piecemeal.`;

  // 4. Generate Odyssey Plans
  const odysseyPlans = generateOdysseyPlans(req.role, scores.overall);

  // 5. Generate dysfunctional beliefs based on risk level
  const dysfunctionalBeliefs: string[] = [];
  if (scores.overall >= 60) {
    dysfunctionalBeliefs.push('My identity is tied to my job title');
    dysfunctionalBeliefs.push('There\'s only one right career path for me');
  }
  if (scores.overall >= 40) {
    dysfunctionalBeliefs.push('If I change fields, I lose everything I\'ve built');
  }
  if (req.years_experience >= 5) {
    dysfunctionalBeliefs.push(`After ${req.years_experience} years, it's too late to pivot`);
  }
  if (dysfunctionalBeliefs.length < 3) {
    dysfunctionalBeliefs.push('AI will take care of everything so I don\'t need to act');
  }

  // 6. Generate response
  const riskLevel = getRiskLabel(scores.overall);
  const percentile = getPercentileText(scores.overall, req.role);

  return {
    assessment_id: crypto.randomUUID(),
    overall_risk_score: scores.overall,
    risk_level: riskLevel,
    percentile,
    brutal_skills_audit: {
      task_breakdown: taskBreakdown,
      entry_level_vulnerability: calculateEntryLevelVulnerability(req.role),
      bottleneck_vs_accessory: isBottleneck ? 'bottleneck' : 'accessory',
      bottleneck_explanation: bottleneckExplanation,
    },
    breakdown: {
      task_automation_score: scores.taskAutomation,
      market_demand_score: scores.marketDemand,
      skill_redundancy_score: scores.skillRedundancy,
      timeline_acceleration: scores.timelineAcceleration,
    },
    odyssey_plans: odysseyPlans,
    financial_resilience: {
      recommended_buffer: '9-12 months',
      two_shelf_warning: scores.overall >= 50,
      two_shelf_explanation: scores.overall >= 50
        ? `With a ${scores.overall}% risk score, you risk being trapped on the lower shelf (UBI survival). These Odyssey Plans ensure you access the upper shelf (ambition + risk-taking).`
        : 'Your current risk is moderate, but diversifying your capital income is still critical for long-term security.',
      data_dividend_opportunity: true,
    },
    dysfunctional_beliefs_identified: dysfunctionalBeliefs.slice(0, 3),
    shareable_card_url: `/cards/${crypto.randomUUID()}`,
    card_text: `I scored ${scores.overall}% AGI risk as a ${req.role}. I'm not waiting — I'm building my Odyssey Plan.`,
  };
}

export { getRiskLabel, getRiskColor };
