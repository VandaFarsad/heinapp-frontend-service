// types/workshop.ts
// TypeScript types for Workshop API responses based on backend views.py

export interface WorkshopSlot {
  id: string;
  date: string;
  time: string;
  isAvailable: boolean;
  isBooked: boolean;
  bookedBy?: string;
  bookedByCurrentUser?: boolean;
}

export interface BookingDetail {
  id: number;
  date: string;
  time_slot: string;
  user: string;
}

export interface AvailableSlotsResponse {
  slots: WorkshopSlot[];
}

export interface BookSlotResponse {
  success: boolean;
  message: string;
  booking: BookingDetail;
}

export interface CancelSlotResponse {
  success: boolean;
  message: string;
}

export interface ErrorResponse {
  error: string;
}
