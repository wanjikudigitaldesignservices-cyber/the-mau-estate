import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError(null);

    if (isSupabaseConfigured) {
      const { error: err } = await supabase.auth.updateUser({ password: newPassword });
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Set New Password"
        description="Choose a new secure password for your account."
        canonicalPath="/reset-password"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 flex items-center justify-center py-32 px-4">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl text-forest font-normal">Choose New Password</h1>
            <p className="text-stone text-xs font-light">
              Enter your new resident account password below.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="p-6 bg-emerald-50 text-center space-y-3 rounded border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl text-emerald-900">Password Updated</h3>
              <p className="text-xs text-emerald-800">
                Your password has been reset successfully. Redirecting to sign in...
              </p>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                  <Lock className="w-4 h-4 text-stone-light absolute right-3 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                  />
                  <Lock className="w-4 h-4 text-stone-light absolute right-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? 'Updating...' : 'Set New Password'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
