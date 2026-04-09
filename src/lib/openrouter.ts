// OpenRouter LLM integration for risk scoring and Odyssey Plan generation
// Uses fetch() directly - no SDK needed

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Cost-optimized model selection
const MODELS = {
  analysis: 'anthropic/claude-3.5-haiku',   // Cheap, fast, great for analysis
  generation: 'google/gemini-2.0-flash',     // Free/cheap, good for generation
  reasoning: 'anthropic/claude-3.5-sonnet',  // More expensive, better reasoning
};

async function openRouterCall(messages: { role: string; content: string }[], model: string = MODELS.analysis) {
  if (!OPENROUTER_API_KEY) {
    console.warn('OpenRouter API key not set - falling back to mock response');
    return null;
  }

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://agicareer.shield',
      'X-Title': 'AGI Career Shield',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) {
    console.error('OpenRouter error:', await res.text());
    return null;
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || null;
}

export async function scoreTaskAI(task: string, aiCapability: number): Promise<{
  score: number;
  explanation: string;
  timeline: string;
}> {
  const prompt = `You are an AI risk assessor. Score how likely this job task will be automated by AI within 5 years.

Task: "${task}"
Current AI capability estimate: ${aiCapability}%

Respond with ONLY valid JSON:
{
  "score": 0-100,
  "explanation": "1 sentence on WHY this score",
  "timeline": "when will this be automated (months/years)"
}`;

  const result = await openRouterCall([{ role: 'user', content: prompt }], MODELS.analysis);
  if (!result) return { score: aiCapability, explanation: 'AI risk assessment', timeline: '3-5 years' };

  try {
    return JSON.parse(result);
  } catch {
    return { score: aiCapability, explanation: 'AI risk assessment', timeline: '3-5 years' };
  }
}

export async function generateOdysseyPlanAI(params: {
  currentRole: string;
  industry: string;
  yearsExperience: number;
  skills: string[];
  riskScore: number;
  planType: 'pivot' | 'quality_economy' | 'human_identity';
}): Promise<{
  role: string;
  similarity_score: number;
  salary_potential: { min: number; median: number; max: number; upside?: string };
  transition_months: number;
  demand_trend: 'growing' | 'stable' | 'declining';
  demand_growth_pct: number;
  skills_gap: string[];
  prototype_experiments: { week: string; action: string; hours: number }[];
  beliefs_addressed: { belief: string; reframe: string }[];
  why_this_matters: string;
}> {
  const planDescriptions: Record<string, string> = {
    pivot: 'An adjacent role where their current skills transfer directly. Fastest transition (3-6 months).',
    quality_economy: 'A human-premium role in the "Quality Economy" — un-scalable, artisan, community-based work that AI cannot replicate.',
    human_identity: 'A role centered on authentic human connection, creativity, performance, or empathy — where the human element IS the product.',
  };

  const prompt = `You are an elite career strategist designing post-AGI career paths.

CURRENT PROFILE:
- Role: ${params.currentRole}
- Industry: ${params.industry}
- Years Experience: ${params.yearsExperience}
- Skills: ${params.skills.join(', ')}
- AGI Risk Score: ${params.riskScore}/100

DESIGN A CAREER PATH OF TYPE: ${params.planType.toUpperCase()}
Definition: ${planDescriptions[params.planType]}

Respond with ONLY valid JSON. Be specific, realistic, and actionable.

{
  "role": "specific job title",
  "similarity_score": 0-100 (how similar to current role),
  "salary_potential": { "min": 0000, "median": 0000, "max": 0000, "upside": "optional string" },
  "transition_months": 3-12,
  "demand_trend": "growing",
  "demand_growth_pct": 100-500,
  "skills_gap": ["skill 1", "skill 2", "skill 3"],
  "prototype_experiments": [
    { "week": "1", "action": "specific experiment", "hours": 3 },
    { "week": "2", "action": "specific experiment", "hours": 4 },
    { "week": "3-4", "action": "specific experiment", "hours": 5 },
    { "week": "5-6", "action": "specific experiment", "hours": 6 }
  ],
  "beliefs_addressed": [
    { "belief": "limiting belief they might have", "reframe": "why it's wrong" }
  ],
  "why_this_matters": "2-3 sentence compelling explanation of WHY this path"
}

Make it specific, actionable, and tailored to their exact background.`;

  const result = await openRouterCall([{ role: 'user', content: prompt }], MODELS.generation);
  if (!result) return getFallbackPlan(params);

  try {
    const json = result.substring(result.indexOf('{'), result.lastIndexOf('}') + 1);
    return JSON.parse(json);
  } catch {
    return getFallbackPlan(params);
  }
}

function getFallbackPlan(params: typeof arguments[0]): any {
  return {
    role: 'AI-Resilient Professional',
    similarity_score: 50,
    salary_potential: { min: 60000, median: 85000, max: 120000 },
    transition_months: 6,
    demand_trend: 'growing',
    demand_growth_pct: 200,
    skills_gap: ['AI Literacy', 'Adaptability', 'Continuous Learning'],
    prototype_experiments: [
      { week: '1', action: 'Research the target role and identify 3 people doing it', hours: 3 },
      { week: '2', action: 'Reach out for an informational interview', hours: 2 },
      { week: '3-4', action: 'Complete one micro-course in the skills gap', hours: 5 },
      { week: '5-6', action: 'Build a small project or portfolio piece', hours: 8 },
    ],
    beliefs_addressed: [
      { belief: 'It\'s too late to change', reframe: 'Your experience is an asset, not a liability' },
    ],
    why_this_matters: 'This path leverages your existing foundation while building AI-resilience into your career.',
  };
}

export async function generateRiskExplanation(params: {
  role: string;
  riskScore: number;
  topRisks: { task: string; ai_capability: number }[];
}): Promise<string> {
  const prompt = `Explain this AGI risk assessment in 2-3 sentences. Be direct but not alarmist. Give specific context.

Role: ${params.role}
Overall Risk Score: ${params.riskScore}/100
Highest risk tasks: ${params.topRisks.map(t => `${t.task} (${t.ai_capability}% automatable)`).join(', ')}

Write a brief, personalized explanation. End with one actionable insight.`;

  const result = await openRouterCall([{ role: 'user', content: prompt }], MODELS.analysis);
  if (!result) return `Your role as ${params.role} has a ${params.riskScore}% AGI risk score. The tasks most likely to be automated are: ${params.topRisks.map(t => t.task).join(', ')}. Focus on building skills in areas AI struggles with — interpersonal communication, creative problem-solving, and strategic judgment.`;

  return result;
}
