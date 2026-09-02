/**
 * RSVP architecture. Version 1 has no backend: `submitRsvp` simply waits a
 * moment and stores the reply in localStorage so the guest sees their
 * answer. The shape below is deliberately the shape a real endpoint would
 * take — swap the body of `submitRsvp` for a `fetch("/api/rsvp", …)` when
 * you are ready and nothing in the UI needs to change.
 */
export interface RsvpSubmission {
  guestName: string;
  familyName: string;
  email: string;
  phone: string;
  attending: "yes" | "partly" | "no";
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  hotel: string;
  needsTransport: boolean;
  transportNotes: string;
  dietary: string;
  /** Activity keys chosen on the site ("26:raj-garba"). */
  activitySelections: string[];
  wellnessBookings: string[];
  excursionBookings: string[];
  accessibilityNotes: string;
  message: string;
  submittedAt: string;
}

export type RsvpResult = { ok: true; reference: string } | { ok: false; error: string };

const STORAGE_KEY = "celebration.rsvp.v1";

export async function submitRsvp(submission: RsvpSubmission): Promise<RsvpResult> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (!submission.guestName.trim()) {
    return { ok: false, error: "Please tell us your name." };
  }

  const reference = `SM50-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...submission, reference }),
    );
  } catch {
    /* storage unavailable — the confirmation still shows */
  }

  return { ok: true, reference };
}

export function loadSavedRsvp(): (RsvpSubmission & { reference: string }) | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
