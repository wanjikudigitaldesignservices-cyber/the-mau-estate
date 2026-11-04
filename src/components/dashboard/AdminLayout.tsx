import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  BedDouble, 
  Sliders, 
  CalendarDays, 
  DollarSign, 
  Users, 
  Tag, 
  Image, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  ShieldCheck 
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isStaff } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Reservations', path: '/admin/reservations', icon: CalendarCheck },
    { label: 'Rooms & Units', path: '/admin/rooms', icon: BedDouble },
    { label: 'Room Types', path: '/admin/room-types', icon: Sliders },
    { label: 'Availability', path: '/admin/availability', icon: CalendarDays },
    { label: 'Rates & Pricing', path: '/admin/rates', icon: DollarSign },
    { label: 'Guest Directory', path: '/admin/guests', icon: Users },
    { label: 'Special Offers', path: '/admin/offers', icon: Tag },
    { label: 'Photo Archive', path: '/admin/gallery', icon: Image },
    { label: 'Content Management', path: '/admin/content', icon: FileText },
    { label: 'Guest Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { label: 'Analytics & Revenue', path: '/admin/analytics', icon: TrendingUp },
    { label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-forest flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-forest text-white p-4 flex items-center justify-between border-b border-forest-border z-30">
        <Logo variant="light" size="sm" />
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 text-ivory hover:text-white"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-40 w-64 bg-forest-deep text-ivory border-r border-forest-border flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-forest-surface flex items-center justify-between">
          <Logo variant="light" size="md" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm transition-all uppercase tracking-wider text-[11px] font-medium ${
                  isActive
                    ? 'bg-gold text-forest-deep font-semibold shadow-sm'
                    : 'text-stone-light hover:text-white hover:bg-forest-surface'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-forest-deep' : 'text-gold'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer Card */}
        <div className="p-4 border-t border-forest-surface bg-forest/40 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="truncate pr-2">
              <span className="font-semibold text-white block truncate">{user?.full_name || 'Staff Member'}</span>
              <span className="text-[10px] text-gold uppercase tracking-wider block capitalize">
                {user?.role || 'Hotel Staff'}
              </span>
            </div>
            <Link
              to="/"
              className="p-1.5 rounded text-stone-light hover:text-gold"
              title="Return to Public Site"
            >
              <Home className="w-4 h-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-1.5 px-3 rounded text-[11px] uppercase tracking-wider border border-forest-border text-stone-light hover:text-red-400 hover:border-red-400 transition-colors flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-ivory-dark px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-forest font-medium">{title}</h1>
            {subtitle && <p className="text-stone text-xs font-light mt-0.5">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm border border-ivory-dark text-stone hover:text-forest text-xs font-medium transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-gold" />
              <span>Public Website</span>
            </Link>
            <Link
              to="/booking"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-forest text-gold text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-forest-deep transition-all"
            >
              + Create Booking
            </Link>
          </div>
        </header>

        {/* Child View */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};
