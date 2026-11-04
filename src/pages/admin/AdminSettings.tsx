import React, { useState } from 'react';
import { Settings, Mail, Smartphone, ShieldCheck, Check, Eye, Send, Code } from 'lucide-react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { ResendService, EmailTemplateType } from '../../services/resendService';
import { siteConfig } from '../../config/siteConfig';

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'taxes' | 'mpesa' | 'resend'>('taxes');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplateType>('confirmation');
  const [testEmailRecipient, setTestEmailRecipient] = useState('guest@example.com');
  const [testSendResult, setTestSendResult] = useState<string | null>(null);

  // Sample data for template preview
  const sampleReservationData = {
    reference: 'MNE-2026-001001',
    guestName: 'Lady Catherine Montgomery',
    guestEmail: testEmailRecipient,
    guestPhone: '+254 700 882 100',
    roomName: 'Executive Suite',
    checkIn: '2026-11-12',
    checkOut: '2026-11-15',
    nights: 3,
    adults: 2,
    children: 0,
    totalAmount: 2509.20,
    currency: 'USD',
    receiptNumber: 'SK94821033',
  };

  const preview = ResendService.generateHtml(selectedTemplate, sampleReservationData);

  const handleTestSend = async () => {
    setTestSendResult('Sending simulated test email...');
    const result = await ResendService.sendEmail(selectedTemplate, testEmailRecipient, {
      id: 'res_sample',
      booking_reference: sampleReservationData.reference,
      status: 'confirmed',
      payment_status: 'successful',
      check_in_date: sampleReservationData.checkIn,
      check_out_date: sampleReservationData.checkOut,
      total_nights: sampleReservationData.nights,
      adults_count: sampleReservationData.adults,
      children_count: sampleReservationData.children,
      rooms_count: 1,
      room_type_id: 'rt_1',
      room_type: { name: sampleReservationData.roomName } as any,
      subtotal_rate: 2040,
      vat_tax_amount: 326.40,
      tourism_levy_amount: 40.80,
      service_charge_amount: 102,
      discount_amount: 0,
      total_amount: sampleReservationData.totalAmount,
      currency: sampleReservationData.currency,
      guest: {
        full_name: sampleReservationData.guestName,
        email: testEmailRecipient,
        telephone: sampleReservationData.guestPhone,
        country: 'United Kingdom',
      },
      created_at: new Date().toISOString(),
    });
    setTestSendResult(result.message);
    setTimeout(() => setTestSendResult(null), 5000);
  };

  return (
    <AdminLayout
      title="System Settings & Integrations"
      subtitle="Financial tax compliance, Safaricom Daraja credentials, and Resend email notification templates"
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-ivory-dark pb-2 text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab('taxes')}
            className={`pb-2 transition-colors ${
              activeTab === 'taxes' ? 'text-forest border-b-2 border-forest' : 'text-stone-light hover:text-forest'
            }`}
          >
            Taxes & Currency
          </button>
          <button
            onClick={() => setActiveTab('mpesa')}
            className={`pb-2 transition-colors ${
              activeTab === 'mpesa' ? 'text-forest border-b-2 border-forest' : 'text-stone-light hover:text-forest'
            }`}
          >
            M-Pesa Daraja Gateway
          </button>
          <button
            onClick={() => setActiveTab('resend')}
            className={`pb-2 transition-colors ${
              activeTab === 'resend' ? 'text-forest border-b-2 border-forest' : 'text-stone-light hover:text-forest'
            }`}
          >
            Resend Email Templates ({5})
          </button>
        </div>

        {/* Tab 1: Taxes & Currency */}
        {activeTab === 'taxes' && (
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-ivory-dark shadow-subtle space-y-6 max-w-2xl text-xs text-stone">
            <h3 className="font-serif text-xl text-forest font-medium">Kenyan Hospitality Tax Framework</h3>
            <p className="text-stone-light leading-relaxed">
              These statutory levies are verified server-side on every booking calculation:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-ivory-light rounded border border-ivory-dark space-y-1">
                <span className="text-[10px] uppercase text-stone-light block">Kenya VAT</span>
                <span className="font-serif text-2xl font-bold text-forest">16.0%</span>
                <span className="text-[10px] text-stone-light block">Statutory Value Added Tax</span>
              </div>

              <div className="p-4 bg-ivory-light rounded border border-ivory-dark space-y-1">
                <span className="text-[10px] uppercase text-stone-light block">Tourism Levy</span>
                <span className="font-serif text-2xl font-bold text-forest">2.0%</span>
                <span className="text-[10px] text-stone-light block">Tourism Training Levy (TFL)</span>
              </div>

              <div className="p-4 bg-ivory-light rounded border border-ivory-dark space-y-1">
                <span className="text-[10px] uppercase text-stone-light block">Service Charge</span>
                <span className="font-serif text-2xl font-bold text-forest">5.0%</span>
                <span className="text-[10px] text-stone-light block">Luxury Hospitality Gratuity</span>
              </div>

              <div className="p-4 bg-ivory-light rounded border border-ivory-dark space-y-1">
                <span className="text-[10px] uppercase text-stone-light block">KES FX Exchange Rate</span>
                <span className="font-serif text-2xl font-bold text-forest">128.50</span>
                <span className="text-[10px] text-stone-light block">1 USD = 128.50 KES</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: M-Pesa Daraja Gateway */}
        {activeTab === 'mpesa' && (
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-ivory-dark shadow-subtle space-y-6 max-w-2xl text-xs text-stone">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <h3 className="font-serif text-xl text-forest font-medium">Safaricom Daraja 2.0 Integration Boundaries</h3>
            </div>

            <p className="text-stone-light leading-relaxed">
              The platform implements direct STK push and webhook reconciliation boundaries.
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-ivory-light rounded border border-ivory-dark space-y-1">
                <span className="text-[10px] uppercase text-stone-light block">Paybill Number</span>
                <span className="font-mono text-sm font-semibold text-forest">{siteConfig.payments.mpesaPaybill}</span>
              </div>
              <div className="p-3 bg-ivory-light rounded border border-ivory-dark space-y-1">
                <span className="text-[10px] uppercase text-stone-light block">Account Reference Prefix</span>
                <span className="font-mono text-sm font-semibold text-forest">{siteConfig.payments.mpesaAccountPrefix}</span>
              </div>
              <div className="p-3 bg-ivory-light rounded border border-ivory-dark space-y-1">
                <span className="text-[10px] uppercase text-stone-light block">Webhook Endpoint</span>
                <span className="font-mono text-xs text-forest">/functions/v1/mpesa-callback</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Resend Email Templates Interactive Previewer */}
        {activeTab === 'resend' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl text-forest font-medium">Resend HTML Email Template Suite</h3>
                  <p className="text-xs text-stone-light">Select and inspect all 5 luxury responsive templates</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={testEmailRecipient}
                    onChange={(e) => setTestEmailRecipient(e.target.value)}
                    placeholder="Test recipient email"
                    className="bg-ivory-light border border-ivory-dark text-xs p-2 rounded-sm text-forest"
                  />
                  <button
                    type="button"
                    onClick={handleTestSend}
                    className="px-4 py-2 bg-forest text-gold text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-forest-deep flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Test</span>
                  </button>
                </div>
              </div>

              {testSendResult && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs">
                  {testSendResult}
                </div>
              )}

              {/* Template selector pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { key: 'guest_acknowledgement', label: '1. Guest Acknowledgement' },
                  { key: 'admin_alert', label: '2. Admin Notification' },
                  { key: 'confirmation', label: '3. Stay Confirmed' },
                  { key: 'cancellation', label: '4. Cancellation Notice' },
                  { key: 'payment_success', label: '5. Payment Receipt' },
                ].map((tpl) => (
                  <button
                    key={tpl.key}
                    onClick={() => setSelectedTemplate(tpl.key as EmailTemplateType)}
                    className={`px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all ${
                      selectedTemplate === tpl.key
                        ? 'bg-gold text-forest-deep font-semibold shadow-sm'
                        : 'bg-ivory-light text-stone hover:text-forest border border-ivory-dark'
                    }`}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Rendered Preview Frame */}
            <div className="bg-white p-6 rounded-sm border border-ivory-dark shadow-subtle space-y-3">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-ivory-cream">
                <div>
                  <span className="text-stone-light font-medium">Subject Line: </span>
                  <span className="font-semibold text-forest">{preview.subject}</span>
                </div>
                <span className="text-stone-light text-[11px]">Rendered HTML Preview</span>
              </div>

              <div className="border border-ivory-dark rounded-sm overflow-hidden bg-[#F8F6F1] p-4">
                <div
                  className="max-w-2xl mx-auto"
                  dangerouslySetInnerHTML={{ __html: preview.html }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
