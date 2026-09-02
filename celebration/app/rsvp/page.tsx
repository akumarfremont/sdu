import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RSVPForm } from "@/components/RSVPForm";
import { event } from "@/data/event";

export const metadata: Metadata = {
  title: "RSVP",
  description: `Let the family know you're coming — dates, numbers, travel, dietary needs and any bookings for ${event.title}.`,
};

export default function RsvpPage() {
  return (
    <>
      <PageHeader
        eyebrow="We'd love to know"
        title="RSVP"
        intro="Tell us when you're arriving, who's coming with you and anything we should plan around. It takes two minutes and it genuinely helps the kitchen, the rooms and the cars."
      />
      <div className="container-page py-10 sm:py-14">
        <RSVPForm />
      </div>
    </>
  );
}
