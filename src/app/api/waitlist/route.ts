import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, role, industry, source } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Try to save to Supabase (graceful fallback if not connected)
    if (supabase) {
      try {
        const { error } = await supabase
          .from('waitlist')
          .insert({ email, role: role || null, industry: industry || null, source: source || null });

        if (error && error.code !== '23505') { // Ignore duplicate errors
          console.error('Supabase error:', error);
        }
      } catch (dbError) {
        console.log('Waitlist entry (DB error):', { email, role, industry, source });
      }
    } else {
      // Graceful fallback — store in memory/log for MVP
      console.log('Waitlist entry (DB not connected):', { email, role, industry, source });
    }

    return NextResponse.json(
      { success: true, message: "You're on the list. We'll notify you when your risk report is ready." },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
