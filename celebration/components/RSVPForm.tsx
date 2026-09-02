"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { event } from "@/data/event";
import { days } from "@/data/days";
import { allActivities, wellnessExperiences } from "@/lib/schedule";
import { useItinerary } from "@/lib/useItinerary";
import { submitRsvp, type RsvpSubmission } from "@/lib/rsvp";
import { cn } from "@/lib/cn";
import { IconCheck } from "./Icons";
import { DiamondRule } from "./Motifs";

const hotels = [
  "Staying at the farm",
  "Partner hotel — city centre",
  "Partner hotel — airport road",
  "Staying with family",
  "Making my own arrangements",
];

const excursions = allActivities.filter((activity) => activity.category === "excursions");

export function RSVPForm() {
  const { keys } = useItinerary();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState("");
  const [attending, setAttending] = useState<RsvpSubmission["attending"]>("yes");

  const wellnessOptions = useMemo(
    () => wellnessExperiences.filter((item) => item.registration === "advance"),
    [],
  );

  async function onSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const form = new FormData(formEvent.currentTarget);
    setStatus("sending");
    setError(null);

    const submission: RsvpSubmission = {
      guestName: String(form.get("guestName") ?? ""),
      familyName: String(form.get("familyName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      attending,
      arrivalDate: String(form.get("arrivalDate") ?? ""),
      departureDate: String(form.get("departureDate") ?? ""),
      adults: Number(form.get("adults") ?? 1),
      children: Number(form.get("children") ?? 0),
      hotel: String(form.get("hotel") ?? ""),
      needsTransport: form.get("needsTransport") === "on",
      transportNotes: String(form.get("transportNotes") ?? ""),
      dietary: String(form.get("dietary") ?? ""),
      activitySelections: keys,
      wellnessBookings: form.getAll("wellness").map(String),
      excursionBookings: form.getAll("excursions").map(String),
      accessibilityNotes: String(form.get("accessibilityNotes") ?? ""),
      message: String(form.get("message") ?? ""),
      submittedAt: new Date().toISOString(),
    };

    const result = await submitRsvp(submission);
    if (result.ok) {
      setReference(result.reference);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setError(result.error);
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf-100 text-leaf-600">
          <IconCheck className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-3xl">Thank you — we have you down.</h2>
        <DiamondRule className="mx-auto my-5 w-40" />
        <p className="leading-relaxed text-ink-soft">
          Your reference is{" "}
          <span className="font-semibold text-plum-600">{reference}</span>. Someone from the family
          will be in touch about rooms, transport and any bookings you asked for.
        </p>
        <p className="mt-3 text-sm text-ink-faint">
          This is a demonstration form — nothing has been emailed anywhere yet. See the README for
          how to connect it to a real inbox or sheet.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/schedule" className="btn-primary">
            Plan your days
          </Link>
          <button type="button" onClick={() => setStatus("idle")} className="btn-ghost">
            Edit my reply
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-6">
      <Fieldset legend="Who is coming" description="The basics, so we know who to expect.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" name="guestName" required autoComplete="name" />
          <Field label="Family / group name" name="familyName" placeholder="e.g. The Agarwals, Pune" />
          <Field label="Email" name="email" type="email" autoComplete="email" />
          <Field label="Mobile" name="phone" type="tel" autoComplete="tel" placeholder="+91" />
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-ink">Will you be joining us?</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {(
              [
                { id: "yes", label: "Yes, the whole week" },
                { id: "partly", label: "Some of the days" },
                { id: "no", label: "Sadly can't make it" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={attending === option.id}
                onClick={() => setAttending(option.id)}
                className={cn(
                  "min-h-[3rem] rounded-2xl border px-4 text-sm font-medium transition-all active:scale-[0.99]",
                  attending === option.id
                    ? "border-plum-600 bg-plum-600 text-ivory"
                    : "border-sand bg-white text-ink-soft hover:border-marigold-200",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </Fieldset>

      {attending !== "no" ? (
        <>
          <Fieldset
            legend="Your dates"
            description={`Most guests arrive for the ${event.mainDaysLabel}. The 28th is a departure day.`}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Arriving"
                name="arrivalDate"
                type="date"
                defaultValue={event.startDate}
                min={event.startDate}
                max={event.endDate}
              />
              <Field
                label="Departing"
                name="departureDate"
                type="date"
                defaultValue={event.endDate}
                min={event.startDate}
                max={event.endDate}
              />
              <Field label="Adults" name="adults" type="number" min="0" max="30" defaultValue="2" />
              <Field label="Children" name="children" type="number" min="0" max="20" defaultValue="0" />
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              The celebration runs {days[0].label} – {days[days.length - 1].label}, {event.dateRange}.
            </p>
          </Fieldset>

          <Fieldset legend="Staying & getting around">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Where are you staying?</span>
              <select
                name="hotel"
                defaultValue={hotels[0]}
                className="min-h-[3rem] w-full rounded-2xl border border-sand bg-white px-4 text-sm text-ink focus:border-marigold-300"
              >
                {hotels.map((hotel) => (
                  <option key={hotel}>{hotel}</option>
                ))}
              </select>
            </label>
            <label className="mt-4 flex items-start gap-3 rounded-2xl border border-sand bg-white p-4">
              <input
                type="checkbox"
                name="needsTransport"
                className="mt-0.5 h-5 w-5 rounded border-sand text-plum-600 focus:ring-marigold-400"
              />
              <span className="text-sm text-ink">
                I&rsquo;d like a car arranged
                <span className="mt-0.5 block text-ink-faint">
                  Airport or station pickup, or hotel shuttles during the week.
                </span>
              </span>
            </label>
            <Field
              className="mt-4"
              label="Flight / train details, if you have them"
              name="transportNotes"
              textarea
              rows={2}
              placeholder="e.g. Arriving 24th, 6E-2043, lands 14:20"
            />
          </Fieldset>

          <Fieldset
            legend="Bookings"
            description="Everything here is optional — it simply helps us hold a place for you."
          >
            <CheckGroup
              name="wellness"
              label="Wellness treatments"
              options={wellnessOptions.map((item) => ({ id: item.id, label: item.name }))}
            />
            <CheckGroup
              className="mt-5"
              name="excursions"
              label="Excursions"
              options={excursions.map((item) => ({
                id: item.id,
                label: `${item.name} — ${item.dayLabel}`,
              }))}
            />
            <div className="mt-5 rounded-2xl border border-marigold-100 bg-marigold-50/60 p-4 text-sm">
              <p className="font-semibold text-plum-600">
                {keys.length > 0
                  ? `${keys.length} ${keys.length === 1 ? "activity" : "activities"} from My Celebration will be sent with this reply.`
                  : "Nothing picked from the schedule yet."}
              </p>
              <p className="mt-1 text-ink-soft">
                Browse the{" "}
                <Link href="/schedule" className="link-underline font-medium text-plum-600">
                  schedule
                </Link>{" "}
                and tap the + on anything you&rsquo;d like to join.
              </p>
            </div>
          </Fieldset>

          <Fieldset legend="Anything we should know">
            <Field
              label="Dietary needs or allergies"
              name="dietary"
              textarea
              rows={2}
              placeholder="Jain, satvik, nut allergy, no dairy…"
            />
            <Field
              className="mt-4"
              label="Accessibility or seating needs"
              name="accessibilityNotes"
              textarea
              rows={2}
              placeholder="Chair seating at the Bhagwat, ground-floor room, wheelchair…"
            />
            <Field
              className="mt-4"
              label="A message for Sharda & Manoj"
              name="message"
              textarea
              rows={3}
              placeholder="Optional — it will be read out, so make it good."
            />
          </Fieldset>
        </>
      ) : (
        <Fieldset legend="We'll miss you">
          <Field
            label="Leave a message for Sharda & Manoj"
            name="message"
            textarea
            rows={4}
            placeholder="We'll make sure they read it."
          />
        </Fieldset>
      )}

      {error ? (
        <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-500">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary w-full sm:w-auto sm:px-10 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send my RSVP"}
        </button>
        <p className="text-center text-xs text-ink-faint">
          Demonstration form — your reply is kept in this browser only. No payment is ever taken.
        </p>
      </div>
    </form>
  );
}

function Fieldset({
  legend,
  description,
  children,
}: {
  legend: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="card p-6 sm:p-7">
      <legend className="px-1 font-display text-xl font-semibold text-plum-600">{legend}</legend>
      {description ? <p className="mb-4 mt-1 text-sm text-ink-soft">{description}</p> : <div className="mb-4" />}
      {children}
    </fieldset>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  className,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const shared =
    "w-full rounded-2xl border border-sand bg-white px-4 text-sm text-ink placeholder:text-ink-faint focus:border-marigold-300";
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {textarea ? (
        <textarea name={name} className={cn(shared, "py-3")} {...rest} />
      ) : (
        <input type={type} name={name} className={cn(shared, "min-h-[3rem]")} {...rest} />
      )}
    </label>
  );
}

function CheckGroup({
  name,
  label,
  options,
  className,
}: {
  name: string;
  label: string;
  options: { id: string; label: string }[];
  className?: string;
}) {
  if (options.length === 0) return null;
  return (
    <div className={className}>
      <p className="mb-2 text-sm font-medium text-ink">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex min-h-[2.75rem] items-center gap-3 rounded-2xl border border-sand bg-white px-4 py-2.5 text-sm text-ink-soft transition-colors hover:border-marigold-200"
          >
            <input
              type="checkbox"
              name={name}
              value={option.id}
              className="h-5 w-5 shrink-0 rounded border-sand text-plum-600 focus:ring-marigold-400"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
