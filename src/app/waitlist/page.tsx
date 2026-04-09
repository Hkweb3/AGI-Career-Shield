'use client';

import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">You&apos;re On The List.</h1>
          <p className="text-[#a3a3a3] leading-relaxed">
            We&apos;ll notify you at <strong className="text-white">{email}</strong> when your personalized
            AGI risk report is ready. We&apos;re building this fast — expect it within weeks.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-md mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Get Early <span className="gradient-text">Access</span>
          </h1>
          <p className="text-[#a3a3a3]">
            Join the waitlist. Be the first to check your AGI risk score and build your Odyssey Plan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-white placeholder-[#525252] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Financial Analyst"
              className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-white placeholder-[#525252] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-[#262626] disabled:text-[#525252] text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Joining...
              </>
            ) : (
              'Join Waitlist'
            )}
          </button>
        </form>

        <p className="text-xs text-[#a3a3a3] text-center mt-6">
          No spam. Unsubscribe anytime. We respect your data.
        </p>
      </div>
    </section>
  );
}
