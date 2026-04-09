'use client';

import { useState, useEffect } from 'react';

// Target: ~300 days from today (Feb 2027)
const TARGET_DATE = new Date('2027-02-03T00:00:00Z');

export default function AGICountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = TARGET_DATE.getTime() - new Date().getTime();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const p = (n: number) => n.toString().padStart(2, '0');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, fontFamily: 'var(--font-geist-mono)' }}>
      <span style={{ color: '#9898AA', fontFamily: 'var(--font-geist)' }}>Estimated AGI arrival:</span>
      <span style={{ color: '#F0F0F5', fontWeight: 600 }}>{timeLeft.days}d</span>
      <span style={{ color: '#55556A' }}>{p(timeLeft.hours)}h</span>
      <span style={{ color: '#55556A' }}>{p(timeLeft.minutes)}m</span>
      <span style={{ color: '#FF0044', fontWeight: 700 }}>{p(timeLeft.seconds)}s</span>
    </div>
  );
}
