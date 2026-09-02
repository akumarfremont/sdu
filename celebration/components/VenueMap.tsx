"use client";

import { useState } from "react";
import { venueMapImage, venueZones } from "@/data/venues";
import { allActivities } from "@/lib/schedule";
import { cn } from "@/lib/cn";
import { IconPin } from "./Icons";

/**
 * A stylised property map. When a real plan is ready, set `venueMapImage`
 * in data/venues.ts to an image path — the pins keep working on top of it.
 */
export function VenueMap() {
  const [activeId, setActiveId] = useState<string>(venueZones[0].id);
  const active = venueZones.find((zone) => zone.id === activeId) ?? venueZones[0];
  const here = allActivities.filter((activity) => activity.locationId === active.id);
  const uniqueHere = Array.from(new Map(here.map((a) => [a.id, a])).values());

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative self-start overflow-hidden rounded-4xl border border-sand bg-gradient-to-br from-leaf-100/70 via-cream to-peacock-50 p-3 shadow-card">
        {/* 4:3 matches the illustration's viewBox so the pins land where they should. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
          {venueMapImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={venueMapImage}
              alt="Map of the property"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <IllustrativeMap />
          )}

          {venueZones.map((zone) => {
            const isActive = zone.id === active.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setActiveId(zone.id)}
                aria-pressed={isActive}
                style={{ left: `${zone.map.x}%`, top: `${zone.map.y}%` }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200",
                  isActive ? "z-20 scale-110" : "z-10 hover:scale-105",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-card transition-colors",
                    isActive
                      ? "border-plum-600 bg-plum-600 text-ivory"
                      : zone.kind === "service"
                        ? "border-white bg-ink-faint text-white"
                        : "border-white bg-marigold-400 text-plum-700",
                  )}
                >
                  <IconPin className="h-4 w-4" />
                </span>
                <span className="sr-only">{zone.name}</span>
              </button>
            );
          })}

          <p className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint backdrop-blur">
            Illustrative — not to scale
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-5">
          <p className="eyebrow">{active.kind === "service" ? "Arrival & parking" : active.kind}</p>
          <h3 className="mt-1 text-2xl">{active.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{active.description}</p>
          {active.note ? (
            <p className="mt-3 rounded-2xl border border-marigold-100 bg-marigold-50/70 px-3.5 py-2.5 text-sm text-ink-soft">
              {active.note}
            </p>
          ) : null}
          {uniqueHere.length > 0 ? (
            <>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                What happens here
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {uniqueHere.slice(0, 8).map((activity) => (
                  <li key={activity.id} className="chip bg-cream text-ink-soft ring-sand">
                    {activity.name}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <div className="card max-h-80 overflow-y-auto p-3">
          <ul className="space-y-1">
            {venueZones.map((zone) => (
              <li key={zone.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(zone.id)}
                  className={cn(
                    "flex min-h-[2.75rem] w-full items-center gap-2.5 rounded-xl px-3 text-left text-sm transition-colors",
                    zone.id === active.id
                      ? "bg-marigold-50 font-semibold text-plum-600"
                      : "text-ink-soft hover:bg-cream",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      zone.kind === "service" ? "bg-ink-faint" : "bg-marigold-400",
                    )}
                  />
                  {zone.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** The placeholder property illustration. */
function IllustrativeMap() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="lawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E3EBD4" />
          <stop offset="100%" stopColor="#D7E3C3" />
        </linearGradient>
        <pattern id="grove" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="9" r="3.4" fill="#A8BE84" opacity=".45" />
        </pattern>
      </defs>

      <rect width="400" height="300" fill="url(#lawn)" />
      <rect x="6" y="6" width="388" height="288" rx="18" fill="none" stroke="#B9C79E" strokeWidth="1.5" />

      {/* groves */}
      <rect x="70" y="14" width="110" height="46" rx="18" fill="url(#grove)" />
      <rect x="20" y="150" width="70" height="120" rx="18" fill="url(#grove)" />

      {/* water */}
      <path d="M250 62 q30 -14 58 4 q22 14 8 34 q-16 22 -46 12 q-30 -10 -20 -50Z" fill="#CBE5E2" opacity=".85" />

      {/* main path */}
      <path
        d="M150 292 C 150 240 190 210 200 160 C 208 118 240 100 300 92"
        stroke="#EADFCC"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M200 160 C 240 172 300 176 356 140"
        stroke="#EADFCC"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M200 160 C 150 168 100 150 60 112"
        stroke="#EADFCC"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M200 160 C 200 200 210 240 300 220"
        stroke="#EADFCC"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />

      {/* walking loop */}
      <rect
        x="26"
        y="26"
        width="348"
        height="248"
        rx="60"
        fill="none"
        stroke="#C7B79B"
        strokeWidth="2"
        strokeDasharray="5 7"
        opacity=".8"
      />

      {/* buildings */}
      <rect x="176" y="124" width="48" height="34" rx="6" fill="#F6EEE1" stroke="#C7B79B" />
      <path d="M176 124 L200 108 L224 124" fill="#EFB65B" opacity=".6" />
      <rect x="56" y="94" width="42" height="28" rx="6" fill="#F6EEE1" stroke="#C7B79B" />
      <rect x="330" y="120" width="44" height="30" rx="6" fill="#F6EEE1" stroke="#C7B79B" />
      <rect x="176" y="218" width="72" height="38" rx="8" fill="#F6EEE1" stroke="#C7B79B" />

      {/* canopy */}
      <path d="M140 62 l32 -22 l32 22 z" fill="#F7D9DC" opacity=".8" />
      <rect x="140" y="62" width="64" height="24" rx="5" fill="#F6EEE1" stroke="#C7B79B" />

      {/* courts */}
      <rect x="336" y="88" width="46" height="26" rx="4" fill="#94CBC6" opacity=".55" stroke="#7FB4AF" />
      <rect x="326" y="164" width="50" height="26" rx="4" fill="#E5D7E2" opacity=".7" stroke="#C6A9C0" />

      {/* parking */}
      <rect x="10" y="252" width="60" height="34" rx="6" fill="#EADFCC" stroke="#C7B79B" />
      <path d="M22 262h36M22 270h36M22 278h36" stroke="#C7B79B" strokeWidth="1.4" />
    </svg>
  );
}
