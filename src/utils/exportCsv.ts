import { Reservation } from '../types';

export const exportReservationsToCsv = (reservations: Reservation[]): void => {
  const headers = [
    'Reference',
    'Status',
    'Payment Status',
    'Guest Name',
    'Guest Email',
    'Telephone',
    'Country',
    'Room Category',
    'Check In',
    'Check Out',
    'Nights',
    'Adults',
    'Children',
    'Rooms',
    'Total USD',
    'Special Requests',
    'Created At',
  ];

  const rows = reservations.map((r) => [
    `"${r.booking_reference}"`,
    `"${r.status}"`,
    `"${r.payment_status}"`,
    `"${(r.guest?.full_name || '').replace(/"/g, '""')}"`,
    `"${(r.guest?.email || '').replace(/"/g, '""')}"`,
    `"${(r.guest?.telephone || '').replace(/"/g, '""')}"`,
    `"${(r.guest?.country || '').replace(/"/g, '""')}"`,
    `"${(r.room_type?.name || '').replace(/"/g, '""')}"`,
    `"${r.check_in_date}"`,
    `"${r.check_out_date}"`,
    r.total_nights,
    r.adults_count,
    r.children_count,
    r.rooms_count,
    r.total_amount,
    `"${(r.special_requests || '').replace(/"/g, '""')}"`,
    `"${r.created_at}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `the_mau_estate_reservations_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
