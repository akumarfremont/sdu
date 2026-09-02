import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ActivitiesExplorer } from "@/components/ActivitiesExplorer";
import { allActivities, uniqueActivities } from "@/lib/schedule";

const count = uniqueActivities(allActivities).length;

export const metadata: Metadata = {
  title: "Activities",
  description: `Browse all ${count} activities across the week — spiritual, music, dance, wellness, sports, nature, kids and excursions. Filter by category, day, age group and booking.`,
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${count} things to do`}
        title="Explore Activities"
        intro="Everything happening across the week, browsable by what it is rather than when it is. Filter by category, day, who it's for and whether it needs booking."
      />
      <div className="container-page py-10 sm:py-14">
        <ActivitiesExplorer />
      </div>
    </>
  );
}
