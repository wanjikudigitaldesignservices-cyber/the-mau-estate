import { BookingSearchParams, PriceCalculationResult, Reservation, RoomType } from '../types';
import { siteConfig } from '../config/siteConfig';

export class BookingEngine {
  /**
   * Calculates the number of nights between two ISO date strings (YYYY-MM-DD)
   */
  public static calculateNights(checkIn: string, checkOut: string): number {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }

  /**
   * Performs server-side rate and tax calculations
   * Follows Kenyan hospitality tax framework: 16% VAT, 2% Tourism Levy, 5% Service Charge
   */
  public static calculatePricing(
    room: RoomType,
    checkIn: string,
    checkOut: string,
    roomsCount: number = 1,
    discountPercentage: number = 0
  ): PriceCalculationResult {
    const nights = this.calculateNights(checkIn, checkOut);
    const baseRatePerNight = Number(room.base_rate_per_night);
    
    // Calculate raw subtotal before discount
    const rawSubtotal = baseRatePerNight * nights * roomsCount;
    
    // Apply special offer discount if applicable
    const discountAmount = discountPercentage > 0 
      ? Number(((rawSubtotal * discountPercentage) / 100).toFixed(2)) 
      : 0;

    const subtotalAfterDiscount = rawSubtotal - discountAmount;

    // Kenya statutory hospitality taxes
    const vatTaxAmount = Number((subtotalAfterDiscount * siteConfig.taxes.vat).toFixed(2));
    const tourismLevyAmount = Number((subtotalAfterDiscount * siteConfig.taxes.tourismLevy).toFixed(2));
    const serviceChargeAmount = Number((subtotalAfterDiscount * siteConfig.taxes.serviceCharge).toFixed(2));

    const totalAmount = Number((subtotalAfterDiscount + vatTaxAmount + tourismLevyAmount + serviceChargeAmount).toFixed(2));
    const exchangeRateKes = siteConfig.taxes.kesExchangeRate;
    const totalAmountKes = Math.round(totalAmount * exchangeRateKes);

    return {
      nights,
      baseRatePerNight,
      subtotal: Number(rawSubtotal.toFixed(2)),
      vatTaxAmount,
      tourismLevyAmount,
      serviceChargeAmount,
      discountAmount,
      totalAmount,
      currency: room.currency || 'USD',
      exchangeRateKes,
      totalAmountKes,
    };
  }

  /**
   * Checks whether the requested dates overlap with confirmed bookings
   * and ensures room inventory is never exceeded.
   */
  public static isRoomAvailable(
    room: RoomType,
    checkIn: string,
    checkOut: string,
    requestedRooms: number,
    existingReservations: Reservation[]
  ): boolean {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) return false;

    // Generate each day of the proposed stay
    const dates: string[] = [];
    let cur = new Date(checkInDate);
    while (cur < checkOutDate) {
      dates.push(cur.toISOString().split('T')[0]);
      cur.setDate(cur.getDate() + 1);
    }

    // Check inventory on each day
    for (const dateStr of dates) {
      const curDay = new Date(dateStr);
      let dayBooked = 0;

      for (const res of existingReservations) {
        if (
          res.room_type_id === room.id &&
          (res.status === 'confirmed' || res.status === 'checked_in')
        ) {
          const resIn = new Date(res.check_in_date);
          const resOut = new Date(res.check_out_date);

          if (curDay >= resIn && curDay < resOut) {
            dayBooked += res.rooms_count;
          }
        }
      }

      if (dayBooked + requestedRooms > room.total_inventory) {
        return false;
      }
    }

    return true;
  }

  /**
   * Generates a unique luxury booking reference
   * Example: MNE-2026-001048
   */
  public static generateBookingReference(): string {
    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    return `MNE-${year}-${randomSeq}`;
  }
}
