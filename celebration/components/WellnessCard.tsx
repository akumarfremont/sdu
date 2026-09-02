import type { ScheduledActivity } from "@/data/types";
import { dressCodeById } from "@/data/dressCodes";
import { registrationById, venueFor } from "@/lib/schedule";
import { cn } from "@/lib/cn";
import { IconClock, IconPin, IconShirt, IconTicket } from "./Icons";

export function WellnessCard({ activity }: { activity: ScheduledActivity }) {
  const wellness = activity.wellness;
  if (!wellness) return null;
  const registration = registrationById[activity.registration];
  const venue = venueFor(activity);
  const dress = dressCodeById[activity.dressCodeId];

  return (
    <article className="card card-hover flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl leading-snug">{activity.name}</h3>
        <span className={cn("chip shrink-0", registration?.tone)}>{registration?.name}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{activity.description}</p>

      <dl className="mt-5 space-y-2.5 border-t border-sand/70 pt-4 text-sm">
        <Row icon={<IconClock className="h-4 w-4" />} term="Duration">
          {wellness.duration}
        </Row>
        <Row icon={<IconTicket className="h-4 w-4" />} term="Booking">
          {wellness.booking}
        </Row>
        {activity.capacity ? (
          <Row term="Capacity">{activity.capacity}</Row>
        ) : null}
        <Row icon={<IconShirt className="h-4 w-4" />} term="What to wear">
          {wellness.wear}
          <span className="block text-ink-faint">{dress?.summary}</span>
        </Row>
        <Row icon={<IconPin className="h-4 w-4" />} term="Where">
          {venue?.name}
        </Row>
      </dl>

      <p className="mt-4 rounded-2xl border border-sand bg-cream/60 px-4 py-3 text-xs leading-relaxed text-ink-soft">
        <span className="font-semibold text-plum-600">Please note: </span>
        {wellness.avoidIf}
      </p>
    </article>
  );
}

function Row({
  term,
  children,
  icon,
}: {
  term: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-3">
      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
        {icon}
        {term}
      </dt>
      <dd className="text-ink-soft">{children}</dd>
    </div>
  );
}
