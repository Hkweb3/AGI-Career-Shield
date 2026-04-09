import { NextRequest, NextResponse } from 'next/server';
import { COMMON_ROLES } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('search') || '';

    if (!query) {
      return NextResponse.json(COMMON_ROLES.slice(0, 10));
    }

    const results = COMMON_ROLES.filter(
      (r) => r.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Roles search error:', error);
    return NextResponse.json([], { status: 200 });
  }
}
