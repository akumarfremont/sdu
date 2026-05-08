"use client";

// The cold open as its own route. Lands here from the splash (after "Enter
// SDU") or from the dashboard's "Replay cold open" link. Plays straight
// through, then redirects to /dashboard.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ColdOpen from "@/components/ColdOpen";
import { markColdOpenSeen } from "@/lib/store";

export default function ColdOpenPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  // If the user navigates straight to /cold-open with no player in storage,
  // send them back to the splash.
  useEffect(() => {
    setHydrated(true);
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("sdu.player.v1");
    if (!raw) router.replace("/");
  }, [router]);

  if (!hydrated) {
    return <div className="fixed inset-0 bg-ink" />;
  }

  return (
    <ColdOpen
      autoPlay
      onDone={() => {
        markColdOpenSeen();
        router.replace("/dashboard");
      }}
    />
  );
}
