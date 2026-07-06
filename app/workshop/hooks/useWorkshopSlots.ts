// hooks/useWorkshopSlots.ts
"use client";

import type {
  AvailableSlotsResponse,
  BookSlotResponse,
  CancelSlotResponse,
  ErrorResponse,
  WorkshopSlot,
} from "@/types/workshop";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export function useWorkshopSlots() {
  const { data: session } = useSession();
  const router = useRouter();
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [slots, setSlots] = useState<WorkshopSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingSlot, setBookingSlot] = useState<string | null>(null);
  const [cancellingSlot, setCancellingSlot] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const loadWorkshopSlots = async () => {
    if (!session?.access_token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/workshop/slots");

      if (response.ok) {
        const data: AvailableSlotsResponse = await response.json();
        setSlots(data.slots);
      } else if (response.status === 401 || response.status === 403) {
        scheduleLoginRedirect();
      } else {
        scrollToTop();
      }
    } catch (err) {
      setError("Netzwerkfehler beim Laden der Slots");
      scrollToTop();
    } finally {
      setLoading(false);
    }
  };

  const handleBookSlot = async (slotId: string) => {
    if (!session) return;

    setBookingSlot(slotId);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/workshop/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId }),
      });

      if (response.ok) {
        const result: BookSlotResponse = await response.json();
        setSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.id === slotId
              ? {
                  ...slot,
                  isBooked: true,
                  bookedBy: session.user.email,
                  bookedByCurrentUser: true,
                  isAvailable: false,
                }
              : slot,
          ),
        );
        setSuccess(result.message || "Werkstatt-Slot erfolgreich gebucht!");
      } else if (response.status === 401 || response.status === 403) {
        scheduleLoginRedirect();
      } else {
        const errorData: ErrorResponse = await response.json();
        setError(errorData.error || "Fehler beim Buchen des Slots");
        scrollToTop();
      }
    } catch (err) {
      setError("Netzwerkfehler beim Buchen des Slots");
      scrollToTop();
    } finally {
      setBookingSlot(null);
    }
  };

  const handleCancelBooking = async (slotId: string) => {
    if (!session) return;

    setCancellingSlot(slotId);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/workshop/book?slotId=${encodeURIComponent(slotId)}`, { method: "DELETE" });

      if (response.ok) {
        const result: CancelSlotResponse = await response.json();
        setSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.id === slotId
              ? {
                  ...slot,
                  isBooked: false,
                  bookedBy: undefined,
                  bookedByCurrentUser: false,
                  isAvailable: true,
                }
              : slot,
          ),
        );
        setSuccess(result.message || "Buchung erfolgreich storniert!");
      } else if (response.status === 401 || response.status === 403) {
        scheduleLoginRedirect();
      } else {
        const errorData: ErrorResponse = await response.json();
        setError(errorData.error || "Fehler beim Stornieren der Buchung");
        scrollToTop();
      }
    } catch (err) {
      setError("Netzwerkfehler beim Stornieren der Buchung");
      scrollToTop();
    } finally {
      setCancellingSlot(null);
    }
  };

  useEffect(() => {
    if (session?.access_token) {
      loadWorkshopSlots();
    }
  }, [session?.access_token]);

  useEffect(() => {
    if (error) {
      scrollToTop();
    }
  }, [error]);

  // Cleanup redirect timer on unmount
  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const scheduleLoginRedirect = useCallback(() => {
    setError("Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.");
    scrollToTop();
    redirectTimerRef.current = setTimeout(() => {
      router.push("/login");
    }, 2000);
  }, [router]);

  return {
    slots,
    loading,
    bookingSlot,
    cancellingSlot,
    error,
    success,
    handleBookSlot,
    handleCancelBooking,
    loadWorkshopSlots,
  };
}
