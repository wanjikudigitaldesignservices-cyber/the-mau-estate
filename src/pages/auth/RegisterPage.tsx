import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/common/Footer';
import { SEOHead } from '../../components/seo/SEOHead';
import { useAuth } from '../../hooks/useAuth';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await register(email, password, name);
    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      navigate('/account');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light text-forest">
      <SEOHead
        title="Resident Registration"
        description="Register a resident guest profile with The Mau Estate."
        canonicalPath="/register"
      />

      <Navbar transparentOnTop={false} />

      <main className="flex-1 flex items-center justify-center py-32 px-4">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-sm border border-ivory-dark shadow-subtle space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block">
              Join The Sanctuary
            </span>
            <h1 className="font-serif text-3xl text-forest font-normal">Create Resident Profile</h1>
            <p className="text-stone text-xs font-light">
              Enjoy tailored bookings, priority arrivals, and private offers.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lady Catherine Montgomery"
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                />
                <User className="w-4 h-4 text-stone-light absolute right-3 top-3" />
              </div>
            </div>

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
                  placeholder="e.g. c.montgomery@example.com"
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                />
                <Mail className="w-4 h-4 text-stone-light absolute right-3 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-forest font-semibold block">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-ivory-light border border-ivory-dark text-forest text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-gold"
                />
                <Lock className="w-4 h-4 text-stone-light absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-forest hover:bg-forest-deep text-gold text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Registering...' : 'Register Profile'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </button>
          </form>

          <div className="text-center text-xs text-stone pt-2">
            Already registered?{' '}
            <Link to="/login" className="text-gold font-semibold hover:underline">
              Sign In Instead
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
