import { NextRequest, NextResponse } from 'next/server';
import { AnalyzeRequest } from '@/types';
import { analyzeRisk } from '@/lib/risk-engine';
import { generateOdysseyPlanAI, generateRiskExplanation } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();

    if (!body.role || !body.industry) {
      return NextResponse.json({ error: 'Role and industry are required' }, { status: 400 });
    }

    if (!body.skills || !Array.isArray(body.skills)) {
      return NextResponse.json({ error: 'Skills array is required' }, { status: 400 });
    }

    // Get base risk score from rule-based engine (fast, free)
    const baseResult = analyzeRisk(body);

    // If OpenRouter is configured, enhance with LLM
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    if (openrouterKey) {
      try {
        // Generate 3 AI-powered Odyssey Plans in parallel
        const [planA, planB, planC] = await Promise.all([
          generateOdysseyPlanAI({
            currentRole: body.role,
            industry: body.industry,
            yearsExperience: body.years_experience || 3,
            skills: body.skills,
            riskScore: baseResult.overall_risk_score,
            planType: 'pivot',
          }),
          generateOdysseyPlanAI({
            currentRole: body.role,
            industry: body.industry,
            yearsExperience: body.years_experience || 3,
            skills: body.skills,
            riskScore: baseResult.overall_risk_score,
            planType: 'quality_economy',
          }),
          generateOdysseyPlanAI({
            currentRole: body.role,
            industry: body.industry,
            yearsExperience: body.years_experience || 3,
            skills: body.skills,
            riskScore: baseResult.overall_risk_score,
            planType: 'human_identity',
          }),
        ]);

        // Generate AI explanation
        const aiExplanation = await generateRiskExplanation({
          role: body.role,
          riskScore: baseResult.overall_risk_score,
          topRisks: baseResult.brutal_skills_audit.task_breakdown.slice(0, 3),
        });

        const castPlan = (plan: any) => ({
          ...plan,
          demand_trend: plan.demand_trend as 'growing' | 'stable' | 'declining',
        });

        baseResult.odyssey_plans = [
          { ...baseResult.odyssey_plans[0], ...castPlan(planA) },
          { ...baseResult.odyssey_plans[1], ...castPlan(planB) },
          { ...baseResult.odyssey_plans[2], ...castPlan(planC) },
        ];
        baseResult.ai_explanation = aiExplanation;
      } catch (llmError) {
        console.error('LLM enhancement failed, using fallback:', llmError);
        // Keep the rule-based results
      }
    }

    return NextResponse.json(baseResult, { status: 200 });
  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
