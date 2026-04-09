import { RoleAutocompleteResult, OdysseyPlan, TaskBreakdown } from '@/types';

// Sample stats for landing page (will become real API data)
export const PLATFORM_STATS = {
  weeklyChecks: 47293,
  weeklyGrowthPct: 23,
  entryLevelCutPct: 51,
  totalUsers: 12847,
};

// Common roles for autocomplete (MVP subset — will expand to full O*NET database)
export const COMMON_ROLES: RoleAutocompleteResult[] = [
  { title: 'Accountant', soc_code: '13-2011', industry: 'Finance' },
  { title: 'Financial Analyst', soc_code: '13-2051', industry: 'Finance' },
  { title: 'Software Engineer', soc_code: '15-1252', industry: 'Technology' },
  { title: 'Data Scientist', soc_code: '15-2051', industry: 'Technology' },
  { title: 'Marketing Manager', soc_code: '11-2021', industry: 'Marketing' },
  { title: 'Content Writer', soc_code: '27-3043', industry: 'Media' },
  { title: 'Copywriter', soc_code: '27-3043', industry: 'Media' },
  { title: 'Graphic Designer', soc_code: '27-1024', industry: 'Media' },
  { title: 'VFX Artist', soc_code: '27-1014', industry: 'Entertainment' },
  { title: 'Video Editor', soc_code: '27-4032', industry: 'Entertainment' },
  { title: 'HR Specialist', soc_code: '13-1071', industry: 'Human Resources' },
  { title: 'Recruiter', soc_code: '13-1071', industry: 'Human Resources' },
  { title: 'Customer Service Representative', soc_code: '43-4051', industry: 'Customer Service' },
  { title: 'Sales Representative', soc_code: '41-3099', industry: 'Sales' },
  { title: 'Project Manager', soc_code: '11-9199', industry: 'Management' },
  { title: 'Business Analyst', soc_code: '13-1111', industry: 'Business' },
  { title: 'Paralegal', soc_code: '23-2011', industry: 'Legal' },
  { title: 'Teacher', soc_code: '25-2031', industry: 'Education' },
  { title: 'Registered Nurse', soc_code: '29-1141', industry: 'Healthcare' },
  { title: 'Radiologist', soc_code: '29-1224', industry: 'Healthcare' },
  { title: 'Pharmacist', soc_code: '29-1051', industry: 'Healthcare' },
  { title: 'Mechanical Engineer', soc_code: '17-2141', industry: 'Engineering' },
  { title: 'Civil Engineer', soc_code: '17-2051', industry: 'Engineering' },
  { title: 'Electrician', soc_code: '47-2111', industry: 'Trades' },
  { title: 'Plumber', soc_code: '47-2152', industry: 'Trades' },
  { title: 'Truck Driver', soc_code: '53-3032', industry: 'Logistics' },
  { title: 'Warehouse Worker', soc_code: '53-7065', industry: 'Logistics' },
  { title: 'Chef', soc_code: '35-1011', industry: 'Hospitality' },
  { title: 'Restaurant Manager', soc_code: '11-9051', industry: 'Hospitality' },
  { title: 'Translator', soc_code: '27-3091', industry: 'Language' },
  { title: 'Journalist', soc_code: '27-3023', industry: 'Media' },
  { title: 'Photographer', soc_code: '27-4021', industry: 'Media' },
  { title: 'Architect', soc_code: '17-1011', industry: 'Design' },
  { title: 'Interior Designer', soc_code: '27-1025', industry: 'Design' },
  { title: 'Social Worker', soc_code: '21-1021', industry: 'Social Services' },
  { title: 'Psychologist', soc_code: '19-3031', industry: 'Healthcare' },
  { title: 'Data Entry Clerk', soc_code: '43-9021', industry: 'Administrative' },
  { title: 'Administrative Assistant', soc_code: '43-6011', industry: 'Administrative' },
  { title: 'Legal Secretary', soc_code: '43-6012', industry: 'Legal' },
  { title: 'Claims Adjuster', soc_code: '13-2053', industry: 'Insurance' },
  { title: 'Underwriter', soc_code: '13-2053', industry: 'Insurance' },
];

// Role-specific task data for MVP risk scoring
// In production, this comes from O*NET API
export const ROLE_TASK_DATA: Record<string, { tasks: { task: string; ai_capability: number; time_spent_pct: number }[]; bottleneck: boolean }> = {
  'Accountant': {
    bottleneck: true,
    tasks: [
      { task: 'Tax return preparation', ai_capability: 91, time_spent_pct: 30 },
      { task: 'Financial record auditing', ai_capability: 88, time_spent_pct: 25 },
      { task: 'Bookkeeping and data entry', ai_capability: 95, time_spent_pct: 20 },
      { task: 'Financial report generation', ai_capability: 85, time_spent_pct: 15 },
      { task: 'Client advisory and strategy', ai_capability: 35, time_spent_pct: 10 },
    ],
  },
  'Financial Analyst': {
    bottleneck: true,
    tasks: [
      { task: 'Financial data analysis', ai_capability: 92, time_spent_pct: 35 },
      { task: 'Report generation', ai_capability: 88, time_spent_pct: 25 },
      { task: 'Client relationship management', ai_capability: 23, time_spent_pct: 20 },
      { task: 'Regulatory interpretation', ai_capability: 45, time_spent_pct: 15 },
      { task: 'Strategic advisory', ai_capability: 31, time_spent_pct: 5 },
    ],
  },
  'Software Engineer': {
    bottleneck: true,
    tasks: [
      { task: 'Code generation', ai_capability: 78, time_spent_pct: 35 },
      { task: 'Code review and debugging', ai_capability: 72, time_spent_pct: 25 },
      { task: 'Documentation writing', ai_capability: 85, time_spent_pct: 10 },
      { task: 'System architecture design', ai_capability: 42, time_spent_pct: 20 },
      { task: 'Stakeholder communication', ai_capability: 18, time_spent_pct: 10 },
    ],
  },
  'Data Scientist': {
    bottleneck: true,
    tasks: [
      { task: 'Data cleaning and preparation', ai_capability: 82, time_spent_pct: 30 },
      { task: 'Statistical analysis', ai_capability: 88, time_spent_pct: 25 },
      { task: 'Model building and training', ai_capability: 75, time_spent_pct: 20 },
      { task: 'Data visualization', ai_capability: 70, time_spent_pct: 15 },
      { task: 'Business problem framing', ai_capability: 30, time_spent_pct: 10 },
    ],
  },
  'Content Writer': {
    bottleneck: false,
    tasks: [
      { task: 'Blog/article writing', ai_capability: 85, time_spent_pct: 35 },
      { task: 'SEO optimization', ai_capability: 78, time_spent_pct: 15 },
      { task: 'Social media content', ai_capability: 80, time_spent_pct: 20 },
      { task: 'Interview-based reporting', ai_capability: 25, time_spent_pct: 15 },
      { task: 'Opinion/editorial writing', ai_capability: 55, time_spent_pct: 15 },
    ],
  },
  'Copywriter': {
    bottleneck: false,
    tasks: [
      { task: 'Ad copy generation', ai_capability: 82, time_spent_pct: 30 },
      { task: 'Email marketing copy', ai_capability: 80, time_spent_pct: 25 },
      { task: 'Product descriptions', ai_capability: 90, time_spent_pct: 20 },
      { task: 'Brand voice development', ai_capability: 45, time_spent_pct: 15 },
      { task: 'Creative campaign ideation', ai_capability: 50, time_spent_pct: 10 },
    ],
  },
  'Marketing Manager': {
    bottleneck: false,
    tasks: [
      { task: 'Campaign performance analysis', ai_capability: 75, time_spent_pct: 25 },
      { task: 'Content strategy planning', ai_capability: 55, time_spent_pct: 20 },
      { task: 'Budget allocation', ai_capability: 65, time_spent_pct: 15 },
      { task: 'Team leadership', ai_capability: 15, time_spent_pct: 25 },
      { task: 'Client/stakeholder relations', ai_capability: 12, time_spent_pct: 15 },
    ],
  },
  'Customer Service Representative': {
    bottleneck: false,
    tasks: [
      { task: 'Query resolution', ai_capability: 85, time_spent_pct: 45 },
      { task: 'Account management', ai_capability: 70, time_spent_pct: 20 },
      { task: 'Complaint handling', ai_capability: 55, time_spent_pct: 20 },
      { task: 'Escalation to human agents', ai_capability: 20, time_spent_pct: 15 },
    ],
  },
  'Data Entry Clerk': {
    bottleneck: true,
    tasks: [
      { task: 'Data input from documents', ai_capability: 97, time_spent_pct: 50 },
      { task: 'Data verification', ai_capability: 92, time_spent_pct: 25 },
      { task: 'Database maintenance', ai_capability: 88, time_spent_pct: 15 },
      { task: 'Report formatting', ai_capability: 85, time_spent_pct: 10 },
    ],
  },
  'Graphic Designer': {
    bottleneck: false,
    tasks: [
      { task: 'Logo creation', ai_capability: 78, time_spent_pct: 25 },
      { task: 'Social media graphics', ai_capability: 82, time_spent_pct: 25 },
      { task: 'Layout design', ai_capability: 70, time_spent_pct: 20 },
      { task: 'Brand identity development', ai_capability: 40, time_spent_pct: 15 },
      { task: 'Client creative consultation', ai_capability: 15, time_spent_pct: 15 },
    ],
  },
  'Project Manager': {
    bottleneck: false,
    tasks: [
      { task: 'Status reporting', ai_capability: 72, time_spent_pct: 20 },
      { task: 'Schedule management', ai_capability: 68, time_spent_pct: 20 },
      { task: 'Resource allocation', ai_capability: 55, time_spent_pct: 15 },
      { task: 'Team coordination', ai_capability: 20, time_spent_pct: 25 },
      { task: 'Stakeholder communication', ai_capability: 18, time_spent_pct: 20 },
    ],
  },
  'Business Analyst': {
    bottleneck: true,
    tasks: [
      { task: 'Requirements gathering', ai_capability: 60, time_spent_pct: 25 },
      { task: 'Process documentation', ai_capability: 80, time_spent_pct: 20 },
      { task: 'Data analysis', ai_capability: 85, time_spent_pct: 25 },
      { task: 'Stakeholder presentations', ai_capability: 35, time_spent_pct: 15 },
      { task: 'Change management', ai_capability: 22, time_spent_pct: 15 },
    ],
  },
  'Paralegal': {
    bottleneck: true,
    tasks: [
      { task: 'Legal document drafting', ai_capability: 82, time_spent_pct: 30 },
      { task: 'Case research', ai_capability: 88, time_spent_pct: 25 },
      { task: 'File organization', ai_capability: 90, time_spent_pct: 20 },
      { task: 'Client interview preparation', ai_capability: 35, time_spent_pct: 15 },
      { task: 'Court filing assistance', ai_capability: 45, time_spent_pct: 10 },
    ],
  },
  'Teacher': {
    bottleneck: false,
    tasks: [
      { task: 'Lesson planning', ai_capability: 72, time_spent_pct: 20 },
      { task: 'Grading and assessment', ai_capability: 80, time_spent_pct: 25 },
      { task: 'Direct instruction', ai_capability: 35, time_spent_pct: 30 },
      { task: 'Student mentoring', ai_capability: 12, time_spent_pct: 15 },
      { task: 'Parent communication', ai_capability: 18, time_spent_pct: 10 },
    ],
  },
  'Recruiter': {
    bottleneck: false,
    tasks: [
      { task: 'Resume screening', ai_capability: 90, time_spent_pct: 30 },
      { task: 'Job posting creation', ai_capability: 80, time_spent_pct: 15 },
      { task: 'Candidate sourcing', ai_capability: 65, time_spent_pct: 20 },
      { task: 'Interviewing', ai_capability: 30, time_spent_pct: 20 },
      { task: 'Relationship building', ai_capability: 10, time_spent_pct: 15 },
    ],
  },
  'Translator': {
    bottleneck: true,
    tasks: [
      { task: 'Document translation', ai_capability: 88, time_spent_pct: 40 },
      { task: 'Interpretation', ai_capability: 65, time_spent_pct: 25 },
      { task: 'Cultural adaptation', ai_capability: 50, time_spent_pct: 20 },
      { task: 'Quality review', ai_capability: 60, time_spent_pct: 15 },
    ],
  },
  'Claims Adjuster': {
    bottleneck: true,
    tasks: [
      { task: 'Claim evaluation', ai_capability: 82, time_spent_pct: 30 },
      { task: 'Documentation review', ai_capability: 88, time_spent_pct: 25 },
      { task: 'Investigation', ai_capability: 55, time_spent_pct: 20 },
      { task: 'Negotiation with claimants', ai_capability: 25, time_spent_pct: 15 },
      { task: 'Report writing', ai_capability: 78, time_spent_pct: 10 },
    ],
  },
  'Underwriter': {
    bottleneck: true,
    tasks: [
      { task: 'Risk assessment', ai_capability: 85, time_spent_pct: 35 },
      { task: 'Application review', ai_capability: 80, time_spent_pct: 25 },
      { task: 'Policy pricing', ai_capability: 88, time_spent_pct: 20 },
      { task: 'Client consultation', ai_capability: 22, time_spent_pct: 10 },
      { task: 'Regulatory compliance', ai_capability: 70, time_spent_pct: 10 },
    ],
  },
};

// Default task data for roles not in our database
export const DEFAULT_TASKS: { task: string; ai_capability: number; time_spent_pct: number }[] = [
  { task: 'Routine data processing', ai_capability: 85, time_spent_pct: 30 },
  { task: 'Report generation', ai_capability: 80, time_spent_pct: 25 },
  { task: 'Information analysis', ai_capability: 72, time_spent_pct: 20 },
  { task: 'Interpersonal communication', ai_capability: 25, time_spent_pct: 15 },
  { task: 'Creative problem-solving', ai_capability: 35, time_spent_pct: 10 },
];

// Odyssey plan templates by role category
export const ODYSSEY_PLANS_BY_CATEGORY: Record<string, { pivot: OdysseyPlan[]; quality_economy: OdysseyPlan[]; human_identity: OdysseyPlan[] }> = {
  'Finance': {
    pivot: [{
      rank: 1, plan_type: 'pivot' as const, plan_label: 'The Pivot',
      role: 'AI Compliance Analyst', similarity_score: 71,
      salary_potential: { min: 75000, median: 95000, max: 130000, upside: '$150K+ as independent consultant' },
      transition_months: 4, demand_trend: 'growing' as const, demand_growth_pct: 340,
      skills_gap: ['AI Risk Auditing', 'EU AI Act Compliance', 'Model Governance'],
      prototype_experiments: [
        { week: '1', action: 'Complete free AI Ethics micro-course', hours: 2, status: 'pending' },
        { week: '2', action: 'Shadow an AI Compliance Officer (virtual)', hours: 1, status: 'pending' },
        { week: '3', action: 'Audit a sample AI system using EU AI Act checklist', hours: 4, status: 'pending' },
        { week: '4', action: 'Join radical collaboration cohort', hours: 2, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: "I'd have to start over from scratch", reframe: 'Your analytical foundation transfers directly' },
        { belief: 'Compliance is boring', reframe: "You'll be shaping the rules of the most important technology ever" },
      ],
      why_this_matters: 'Your risk assessment skills are MORE valuable in the AI era — you just need to redirect them from financial risk to AI risk. The regulatory framework is being built right now.',
      cohort_available: true, cohort_name: 'Finance → AI Compliance, Cohort #47', cohort_spots_left: 4,
    }],
    quality_economy: [{
      rank: 2, plan_type: 'quality_economy' as const, plan_label: 'The Quality Economy',
      role: 'Financial Wellness Coach (Community-Based)', similarity_score: 55,
      salary_potential: { min: 55000, median: 80000, max: 120000 },
      transition_months: 8, demand_trend: 'growing' as const, demand_growth_pct: 180,
      skills_gap: ['Community Building', 'Coaching Certification', 'Local Business Development'],
      prototype_experiments: [
        { week: '1-2', action: 'Host free financial literacy workshop (5 people)', hours: 4, status: 'pending' },
        { week: '3-4', action: 'Document process, build local reputation', hours: 3, status: 'pending' },
        { week: '5-8', action: 'Partner with community center for paid series', hours: 6, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: 'Finance means corporate office', reframe: 'Your expertise can serve your neighborhood directly' },
      ],
      why_this_matters: 'As AI automates financial analysis, the human touch in financial EDUCATION becomes premium. People want to learn from a person who understands their life, not a bot.',
    }],
    human_identity: [{
      rank: 3, plan_type: 'human_identity' as const, plan_label: 'The Human Identity',
      role: 'Economic Storyteller / Content Creator', similarity_score: 35,
      salary_potential: { min: 40000, median: 75000, max: 150000 },
      transition_months: 12, demand_trend: 'growing' as const, demand_growth_pct: 220,
      skills_gap: ['Content Creation', 'Audience Building', 'Video Production'],
      prototype_experiments: [
        { week: '1-4', action: 'Start YouTube channel explaining financial concepts simply', hours: 10, status: 'pending' },
        { week: '5-8', action: 'Build audience to 1,000 subscribers', hours: 15, status: 'pending' },
        { week: '9-12', action: 'Monetize through sponsorships + community', hours: 20, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: 'Content creation is not a real career', reframe: 'The Quality Economy rewards authentic human expertise' },
      ],
      why_this_matters: 'AI can generate financial content, but cannot replicate authentic human passion and lived experience. Your perspective on money, risk, and life is uniquely yours.',
    }],
  },
  'Technology': {
    pivot: [{
      rank: 1, plan_type: 'pivot' as const, plan_label: 'The Pivot',
      role: 'AI Systems Architect', similarity_score: 78,
      salary_potential: { min: 120000, median: 160000, max: 220000, upside: '$300K+ at frontier labs' },
      transition_months: 3, demand_trend: 'growing' as const, demand_growth_pct: 450,
      skills_gap: ['AI Safety', 'Agent Orchestration', 'Model Fine-tuning'],
      prototype_experiments: [
        { week: '1', action: 'Build an autonomous agent workflow', hours: 4, status: 'pending' },
        { week: '2', action: 'Complete AI Safety fundamentals course', hours: 3, status: 'pending' },
        { week: '3', action: 'Fine-tune an open-source model on a niche task', hours: 6, status: 'pending' },
        { week: '4', action: 'Join AI engineering community', hours: 2, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: 'AI will replace all programmers', reframe: 'AI will replace programmers who don\'t use AI' },
      ],
      why_this_matters: 'The people building AI systems will be the last to be automated. Your engineering foundation puts you at the front of this line.',
      cohort_available: true, cohort_name: 'Tech → AI Architecture, Cohort #23', cohort_spots_left: 6,
    }],
    quality_economy: [{
      rank: 2, plan_type: 'quality_economy' as const, plan_label: 'The Quality Economy',
      role: 'AI-Human Workflow Designer', similarity_score: 60,
      salary_potential: { min: 90000, median: 125000, max: 180000 },
      transition_months: 6, demand_trend: 'growing' as const, demand_growth_pct: 280,
      skills_gap: ['Process Design', 'Change Management', 'Human-Computer Interaction'],
      prototype_experiments: [
        { week: '1-2', action: 'Map an AI-augmented workflow for a small business', hours: 5, status: 'pending' },
        { week: '3-4', action: 'Implement and measure productivity gain', hours: 8, status: 'pending' },
        { week: '5-6', action: 'Package as a consultancy offering', hours: 4, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: 'Technical skills are all that matter', reframe: 'The gap between AI and business value is a human skills gap' },
      ],
      why_this_matters: 'Companies have AI tools but don\'t know how to redesign work around them. You become the bridge.',
    }],
    human_identity: [{
      rank: 3, plan_type: 'human_identity' as const, plan_label: 'The Human Identity',
      role: 'Tech Ethics Educator', similarity_score: 40,
      salary_potential: { min: 60000, median: 95000, max: 160000 },
      transition_months: 9, demand_trend: 'growing' as const, demand_growth_pct: 310,
      skills_gap: ['Ethics Frameworks', 'Public Speaking', 'Curriculum Design'],
      prototype_experiments: [
        { week: '1-4', action: 'Write a weekly newsletter on AI ethics in your domain', hours: 6, status: 'pending' },
        { week: '5-8', action: 'Speak at a local meetup or conference', hours: 8, status: 'pending' },
        { week: '9-12', action: 'Launch a workshop for non-technical audiences', hours: 10, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: 'Ethics is fluffy and not technical', reframe: 'Ethics is the bottleneck that determines whether AI gets deployed at all' },
      ],
      why_this_matters: 'As AI capabilities outpace regulation, companies need people who can translate ethics into engineering practice.',
    }],
  },
  'Media': {
    pivot: [{
      rank: 1, plan_type: 'pivot' as const, plan_label: 'The Pivot',
      role: 'AI Content Strategist', similarity_score: 65,
      salary_potential: { min: 70000, median: 95000, max: 140000 },
      transition_months: 4, demand_trend: 'growing' as const, demand_growth_pct: 380,
      skills_gap: ['AI Content Tools', 'Prompt Engineering', 'Content Operations'],
      prototype_experiments: [
        { week: '1', action: 'Build a content pipeline using AI tools', hours: 4, status: 'pending' },
        { week: '2', action: 'Compare AI output vs human output for your niche', hours: 3, status: 'pending' },
        { week: '3', action: 'Create a case study document', hours: 4, status: 'pending' },
        { week: '4', action: 'Pitch to a brand as AI content consultant', hours: 2, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: 'AI content has no soul', reframe: 'The best AI content has a human editor. Be that editor.' },
      ],
      why_this_matters: 'Brands need people who understand both craft AND AI. You already have the craft. Add the AI layer.',
      cohort_available: true, cohort_name: 'Creatives → AI Strategy, Cohort #31', cohort_spots_left: 3,
    }],
    quality_economy: [{
      rank: 2, plan_type: 'quality_economy' as const, plan_label: 'The Quality Economy',
      role: 'Bespoke Content Artisan', similarity_score: 50,
      salary_potential: { min: 45000, median: 75000, max: 130000 },
      transition_months: 8, demand_trend: 'growing' as const, demand_growth_pct: 200,
      skills_gap: ['Direct-to-Audience Monetization', 'Personal Brand', 'Community Building'],
      prototype_experiments: [
        { week: '1-2', action: 'Start a paid Substack with deeply personal writing', hours: 6, status: 'pending' },
        { week: '3-4', action: 'Build to 100 paid subscribers', hours: 8, status: 'pending' },
        { week: '5-8', action: 'Launch a membership community', hours: 5, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: 'I need a publisher/platform to reach people', reframe: 'The Quality Economy rewards direct human connection' },
      ],
      why_this_matters: 'When AI floods the world with content, human voices with authentic stories become premium. People pay for the human behind the words.',
    }],
    human_identity: [{
      rank: 3, plan_type: 'human_identity' as const, plan_label: 'The Human Identity',
      role: 'Live Experience Creator', similarity_score: 30,
      salary_potential: { min: 35000, median: 65000, max: 120000 },
      transition_months: 12, demand_trend: 'growing' as const, demand_growth_pct: 150,
      skills_gap: ['Event Production', 'Live Performance', 'Audience Engagement'],
      prototype_experiments: [
        { week: '1-4', action: 'Host a live storytelling event (10 people)', hours: 6, status: 'pending' },
        { week: '5-8', action: 'Document and iterate, grow to 30 people', hours: 8, status: 'pending' },
        { week: '9-12', action: 'Partner with local venue for regular series', hours: 10, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: 'Live events are too risky', reframe: 'AI can\'t replicate live. That\'s exactly why it\'s safe.' },
      ],
      why_this_matters: 'AI generates digital content. It can\'t create the electricity of a room full of humans sharing a moment. That\'s your moat.',
    }],
  },
  'default': {
    pivot: [{
      rank: 1, plan_type: 'pivot' as const, plan_label: 'The Pivot',
      role: 'AI Operations Specialist', similarity_score: 55,
      salary_potential: { min: 65000, median: 90000, max: 130000 },
      transition_months: 5, demand_trend: 'growing' as const, demand_growth_pct: 300,
      skills_gap: ['AI Tools Proficiency', 'Process Automation', 'Data Literacy'],
      prototype_experiments: [
        { week: '1', action: 'Automate one routine task in your current role with AI', hours: 3, status: 'pending' },
        { week: '2', action: 'Document the time saved and present to manager', hours: 2, status: 'pending' },
        { week: '3', action: 'Complete AI operations certification', hours: 4, status: 'pending' },
        { week: '4', action: 'Join a cohort of peers on the same path', hours: 2, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: "I'm not technical enough for AI work", reframe: 'AI operations need domain expertise FIRST, technical skills second' },
      ],
      why_this_matters: 'Every industry needs people who understand both the domain AND how to deploy AI within it. Your domain knowledge is the hard part to replace.',
      cohort_available: true, cohort_name: 'Career Transition Cohort', cohort_spots_left: 5,
    }],
    quality_economy: [{
      rank: 2, plan_type: 'quality_economy' as const, plan_label: 'The Quality Economy',
      role: 'Community Experience Builder', similarity_score: 40,
      salary_potential: { min: 45000, median: 70000, max: 110000 },
      transition_months: 8, demand_trend: 'growing' as const, demand_growth_pct: 180,
      skills_gap: ['Community Design', 'Event Facilitation', 'Local Network Building'],
      prototype_experiments: [
        { week: '1-2', action: 'Identify a community need in your area', hours: 3, status: 'pending' },
        { week: '3-4', action: 'Host a small gathering to address it', hours: 4, status: 'pending' },
        { week: '5-8', action: 'Build a recurring program around it', hours: 5, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: 'Community work isn\'t a real career', reframe: 'The Quality Economy pays for human connection at a premium' },
      ],
      why_this_matters: 'As AI drives down the cost of digital abundance, people crave real-world community. The facilitators of that will be highly valued.',
    }],
    human_identity: [{
      rank: 3, plan_type: 'human_identity' as const, plan_label: 'The Human Identity',
      role: 'Human Performance Professional', similarity_score: 25,
      salary_potential: { min: 40000, median: 70000, max: 140000 },
      transition_months: 12, demand_trend: 'growing' as const, demand_growth_pct: 160,
      skills_gap: ['Performance Skills', 'Personal Branding', 'Direct Monetization'],
      prototype_experiments: [
        { week: '1-4', action: 'Identify your latent creative/performative talent', hours: 4, status: 'pending' },
        { week: '5-8', action: 'Begin public practice and showcase', hours: 6, status: 'pending' },
        { week: '9-12', action: 'Build audience and revenue streams', hours: 8, status: 'pending' },
      ],
      beliefs_addressed: [
        { belief: 'I\'m not creative/artistic enough', reframe: 'Human imperfection is the art. AI perfection is why people will pay for yours.' },
      ],
      why_this_matters: 'Just as AI mastering chess didn\'t destroy human chess — it heightened appreciation for human fallibility and ingenuity. Your humanity IS the product.',
    }],
  },
};

// Industry categories for role mapping
export const ROLE_TO_INDUSTRY: Record<string, string> = {
  'Accountant': 'Finance',
  'Financial Analyst': 'Finance',
  'Claims Adjuster': 'Finance',
  'Underwriter': 'Finance',
  'Software Engineer': 'Technology',
  'Data Scientist': 'Technology',
  'Data Entry Clerk': 'Technology',
  'Content Writer': 'Media',
  'Copywriter': 'Media',
  'Graphic Designer': 'Media',
  'VFX Artist': 'Media',
  'Video Editor': 'Media',
  'Journalist': 'Media',
  'Photographer': 'Media',
  'Translator': 'Media',
  'Marketing Manager': 'Media',
  'Customer Service Representative': 'Service',
  'Recruiter': 'Service',
  'Project Manager': 'Management',
  'Business Analyst': 'Management',
  'Teacher': 'Education',
  'Paralegal': 'Legal',
};
