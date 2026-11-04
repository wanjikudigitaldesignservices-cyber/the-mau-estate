import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSupabaseConfigured) {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Password Recovery"
        description="Reset your resident account password."
        canonicalPath="/forgot-password"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 flex items-center justify-center py-32 px-4">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl text-forest font-normal">Password Recovery</h1>
            <p className="text-stone text-xs font-light">
              Enter your resident email address to receive password reset instructions.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-ivory-light text-center space-y-3 rounded border border-gold/40">
              <CheckCircle2 className="w-10 h-10 text-gold mx-auto" />
              <h3 className="font-serif text-xl text-forest">Instructions Dispatched</h3>
              <p className="text-xs text-stone leading-relaxed">
                If an account exists for <span className="font-semibold">{email}</span>, a secure reset link has been dispatched via Resend.
              </p>
              <Link to="/login" className="text-xs text-gold underline font-semibold block pt-2">
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. resident@example.com"
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                  <Mail className="w-4 h-4 text-stone-light absolute right-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? 'Sending...' : 'Send Reset Link'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-stone hover:text-forest">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
