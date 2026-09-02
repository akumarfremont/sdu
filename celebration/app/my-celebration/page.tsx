import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MySchedule } from "@/components/MySchedule";

export const metadata: Metadata = {
  title: "My Celebration",
  description: "Your own list of activities for the week, saved privately in this browser.",
  robots: { index: false, follow: true },
};

export default function MyCelebrationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your own plan"
        title="My Celebration"
        intro="Everything you've marked across the week, gathered in one place and grouped by day. It lives in this browser only — no account needed."
      />
      <div className="container-page py-10 sm:py-14">
        <MySchedule />
      </div>
    </>
  );
}
