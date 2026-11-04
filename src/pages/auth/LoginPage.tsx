import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Shield, User, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { useAuth } from '../../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, loginAsDemoUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/account';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await login(email, password);
    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('staff')) {
        navigate('/admin');
      } else {
        navigate(from);
      }
    }
  };

  const handleDemoSignIn = (role: 'admin' | 'staff' | 'guest') => {
    loginAsDemoUser(role);
    if (role === 'admin' || role === 'staff') {
      navigate('/admin');
    } else {
      navigate('/account');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Sign In to Resident Account"
        description="Access your bookings, profile, and concierge communications at The Mau Estate."
        canonicalPath="/login"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 flex items-center justify-center py-32 px-4">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block">
              Resident Access
            </span>
            <h1 className="font-serif text-3xl text-forest font-normal">Sign In to Your Account</h1>
            <p className="text-stone text-xs font-light">
              Manage your upcoming stays and personalized itineraries.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
                />
                <Mail className="w-4 h-4 text-stone-light absolute right-3 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[11px] text-gold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold transition-colors"
                />
                <Lock className="w-4 h-4 text-stone-light absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </button>
          </form>

          {/* Quick Demo Login Triggers for Instant Evaluation */}
          <div className="pt-4 border-t border-ivory-cream space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-stone-light font-semibold block text-center">
              Quick Preview Logins (One-Click)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSignIn('admin')}
                className="p-2 text-center rounded bg-forest/5 hover:bg-forest/10 border border-forest/20 text-forest text-[11px] font-medium transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-gold mx-auto mb-1" />
                <span>Admin GM</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSignIn('staff')}
                className="p-2 text-center rounded bg-forest/5 hover:bg-forest/10 border border-forest/20 text-forest text-[11px] font-medium transition-colors"
              >
                <User className="w-3.5 h-3.5 text-gold mx-auto mb-1" />
                <span>Staff Desk</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSignIn('guest')}
                className="p-2 text-center rounded bg-forest/5 hover:bg-forest/10 border border-forest/20 text-forest text-[11px] font-medium transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold mx-auto mb-1" />
                <span>Resident</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-stone pt-2">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-gold font-semibold hover:underline">
              Register as Resident
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
