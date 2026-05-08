"use client";

// Splash / login page. First-time players tap "Enter SDU" — a player is
// created and they're routed to /cold-open. Returning players are redirected
// to /cold-open if they haven't seen it yet, otherwise straight to /dashboard.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlayer, enterAsNew } from "@/lib/store";

export default function SplashPage() {
  const router = useRouter();
  const player = usePlayer();

  useEffect(() => {
    if (player) {
      if (!player.has_seen_cold_open) {
        router.replace("/cold-open");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [player, router]);

  function enter() {
    enterAsNew();
    router.push("/cold-open");
  }

  return (
    <main className="min-h-screen bg-ink text-bone">
      <div className="mx-auto flex min-h-screen max-w-screen flex-col px-6 pb-10 pt-16">
        <header className="text-center">
          <p className="tag text-bone/50">A judgment training game</p>
          <h1 className="mt-5 font-proc text-[64px] font-bold leading-none tracking-proc">
            SDU
          </h1>
          <p className="mt-2 font-proc text-[13px] italic tracking-[0.22em] text-bone/80">
            Sharp Diligence Unit
          </p>
        </header>

        <div className="mt-14 border-t border-hairline-dim pt-8">
          <p className="font-serif text-[16px] leading-[1.6] text-bone/85">
            AI agents do most of the analytical work in M&amp;A diligence now —
            the models, the comps, the memos. They can't make the judgment
            calls.
          </p>
          <p className="mt-4 font-serif text-[16px] leading-[1.6] text-bone/85">
            That's the muscle SDU trains. Eight cases, every one inspired by a
            real failed transaction. The agent reads the room first. Your job
            is to decide whether to follow it or override it.
          </p>
        </div>

        <button
          type="button"
          onClick={enter}
          className="mt-12 flex h-14 w-full items-center justify-center bg-evidence font-mono text-[13px] font-semibold uppercase tracking-[0.22em] text-ink shadow-[0_0_0_1px_rgba(201,169,97,0.5),0_0_28px_rgba(201,169,97,0.35)] hover:bg-evidence/90 active:animate-tapPulse"
        >
          Enter SDU
        </button>

        <footer className="mt-auto pt-12 text-center font-proc text-[11px] italic tracking-[0.16em] text-bone/35">
          One attempt per case. No re-do.
        </footer>
      </div>
    </main>
  );
}
