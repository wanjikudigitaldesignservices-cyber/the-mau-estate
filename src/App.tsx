import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Luxury Fallback Spinner
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory-light text-forest">
    <div className="text-center space-y-3">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
      <span className="font-serif text-sm tracking-widest uppercase text-stone-light block">The Mau Estate</span>
    </div>
  </div>
);

// Public Pages (Lazy Loaded)
const HomePage = lazy(() => import('./pages/public/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/public/AboutPage').then((m) => ({ default: m.AboutPage })));
const AccommodationPage = lazy(() => import('./pages/public/AccommodationPage').then((m) => ({ default: m.AccommodationPage })));
const RoomDetailPage = lazy(() => import('./pages/public/RoomDetailPage').then((m) => ({ default: m.RoomDetailPage })));
const DiningPage = lazy(() => import('./pages/public/DiningPage').then((m) => ({ default: m.DiningPage })));
const ExperiencesPage = lazy(() => import('./pages/public/ExperiencesPage').then((m) => ({ default: m.ExperiencesPage })));
const GalleryPage = lazy(() => import('./pages/public/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const OffersPage = lazy(() => import('./pages/public/OffersPage').then((m) => ({ default: m.OffersPage })));
const OfferDetailPage = lazy(() => import('./pages/public/OfferDetailPage').then((m) => ({ default: m.OfferDetailPage })));
const MeetingsEventsPage = lazy(() => import('./pages/public/MeetingsEventsPage').then((m) => ({ default: m.MeetingsEventsPage })));
const WeddingsCelebrationsPage = lazy(() => import('./pages/public/WeddingsCelebrationsPage').then((m) => ({ default: m.WeddingsCelebrationsPage })));
const ContactPage = lazy(() => import('./pages/public/ContactPage').then((m) => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import('./pages/public/FAQPage').then((m) => ({ default: m.FAQPage })));
const BookingPage = lazy(() => import('./pages/public/BookingPage').then((m) => ({ default: m.BookingPage })));
const BookingConfirmationPage = lazy(() => import('./pages/public/BookingConfirmationPage').then((m) => ({ default: m.BookingConfirmationPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/public/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsConditionsPage = lazy(() => import('./pages/public/TermsConditionsPage').then((m) => ({ default: m.TermsConditionsPage })));
const CancellationPolicyPage = lazy(() => import('./pages/public/CancellationPolicyPage').then((m) => ({ default: m.CancellationPolicyPage })));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Customer Pages (Lazy Loaded)
const AccountDashboard = lazy(() => import('./pages/customer/AccountDashboard').then((m) => ({ default: m.AccountDashboard })));
const ProfilePage = lazy(() => import('./pages/customer/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const CustomerReservationsPage = lazy(() => import('./pages/customer/CustomerReservationsPage').then((m) => ({ default: m.CustomerReservationsPage })));

// Admin Pages (Lazy Loaded)
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview').then((m) => ({ default: m.AdminOverview })));
const AdminReservations = lazy(() => import('./pages/admin/AdminReservations').then((m) => ({ default: m.AdminReservations })));
const AdminRooms = lazy(() => import('./pages/admin/AdminRooms').then((m) => ({ default: m.AdminRooms })));
const AdminRoomTypes = lazy(() => import('./pages/admin/AdminRoomTypes').then((m) => ({ default: m.AdminRoomTypes })));
const AdminAvailability = lazy(() => import('./pages/admin/AdminAvailability').then((m) => ({ default: m.AdminAvailability })));
const AdminRates = lazy(() => import('./pages/admin/AdminRates').then((m) => ({ default: m.AdminRates })));
const AdminGuests = lazy(() => import('./pages/admin/AdminGuests').then((m) => ({ default: m.AdminGuests })));
const AdminOffers = lazy(() => import('./pages/admin/AdminOffers').then((m) => ({ default: m.AdminOffers })));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery').then((m) => ({ default: m.AdminGallery })));
const AdminContent = lazy(() => import('./pages/admin/AdminContent').then((m) => ({ default: m.AdminContent })));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries').then((m) => ({ default: m.AdminEnquiries })));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics').then((m) => ({ default: m.AdminAnalytics })));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings').then((m) => ({ default: m.AdminSettings })));

// Auth Pages (Lazy Loaded)
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })));

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/accommodation" element={<AccommodationPage />} />
            <Route path="/accommodation/:slug" element={<RoomDetailPage />} />
            <Route path="/dining" element={<DiningPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/offers/:slug" element={<OfferDetailPage />} />
            <Route path="/meetings-and-events" element={<MeetingsEventsPage />} />
            <Route path="/weddings-and-celebrations" element={<WeddingsCelebrationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking/confirmation/:reference" element={<BookingConfirmationPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
            <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />

            {/* AUTHENTICATION ROUTES */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* CUSTOMER ACCOUNT ROUTES (PROTECTED) */}
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/reservations"
              element={
                <ProtectedRoute>
                  <CustomerReservationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/reservations/:reference"
              element={
                <ProtectedRoute>
                  <BookingConfirmationPage />
                </ProtectedRoute>
              }
            />

            {/* HOTEL ADMIN DASHBOARD ROUTES (STAFF & ADMIN ONLY) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireStaff>
                  <AdminOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reservations"
              element={
                <ProtectedRoute requireStaff>
                  <AdminReservations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/rooms"
              element={
                <ProtectedRoute requireStaff>
                  <AdminRooms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/room-types"
              element={
                <ProtectedRoute requireStaff>
                  <AdminRoomTypes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/availability"
              element={
                <ProtectedRoute requireStaff>
                  <AdminAvailability />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/rates"
              element={
                <ProtectedRoute requireStaff>
                  <AdminRates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/guests"
              element={
                <ProtectedRoute requireStaff>
                  <AdminGuests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/offers"
              element={
                <ProtectedRoute requireStaff>
                  <AdminOffers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute requireStaff>
                  <AdminGallery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/content"
              element={
                <ProtectedRoute requireStaff>
                  <AdminContent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/enquiries"
              element={
                <ProtectedRoute requireStaff>
                  <AdminEnquiries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requireStaff>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requireStaff>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
