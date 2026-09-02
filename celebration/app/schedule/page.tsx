import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ScheduleView } from "@/components/ScheduleView";
import { event } from "@/data/event";

export const metadata: Metadata = {
  title: "Schedule",
  description: `The full seven-day schedule, ${event.dateRange} — morning wellness, Bhagwat every afternoon, and the main celebration evenings on the ${event.mainDaysLabel}.`,
};

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow={event.dateRange}
        title="The Schedule"
        intro="Seven days at the farm. Browse day by day, or jump straight to the three main celebration days. Tap any activity for times, location, dress and whether it needs booking."
      />
      <div className="container-page py-10 sm:py-14">
        <Suspense fallback={<p className="py-20 text-center text-sm text-ink-faint">Loading the schedule…</p>}>
          <ScheduleView />
        </Suspense>
      </div>
    </>
  );
}
