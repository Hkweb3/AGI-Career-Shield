import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { risk_score, role, percentile } = body;

    // For MVP, return a URL to a generated card
    // In production, use @vercel/og or puppeteer to generate actual images
    const cardId = crypto.randomUUID();

    return NextResponse.json({
      card_url: `/cards/${cardId}`,
      og_image: `/api/og?score=${risk_score}&role=${encodeURIComponent(role)}`,
    });
  } catch (error) {
    console.error('Share card error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
