import Link from "next/link";
import { event, navLinks, secondaryLinks } from "@/data/event";
import { DiamondRule, LotusMark, MarigoldGarland } from "./Motifs";

export function Footer() {
  return (
    <footer className="pad-bottom-nav mt-24 border-t border-sand/70 bg-cream/50 lg:pb-0">
      <MarigoldGarland className="-mt-2.5 opacity-70" />
      <div className="container-page py-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <LotusMark className="h-7 w-11 text-marigold-400" />
          <h2 className="font-display text-2xl text-plum-600">{event.title}</h2>
          <p className="max-w-prose text-sm text-ink-soft">{event.tagline}</p>
          <DiamondRule className="w-48" />
          <p className="text-sm text-ink-soft">
            {event.dateRange} · {event.venue.name}, {event.venue.city}
          </p>
        </div>

        <nav aria-label="Footer" className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-faint">
              The celebration
            </h3>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-soft hover:text-plum-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-faint">
              More
            </h3>
            <ul className="mt-3 space-y-2">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-soft hover:text-plum-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-faint">
              Need a hand?
            </h3>
            <ul className="mt-3 space-y-2">
              {event.contacts.map((contact) => (
                <li key={contact.role} className="text-sm text-ink-soft">
                  <span className="block text-ink">{contact.role}</span>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-underline">
                    {contact.name} · {contact.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <p className="mt-12 text-center text-xs text-ink-faint">
          Made with love by the family. Please share it with anyone who is coming.
        </p>
      </div>
    </footer>
  );
}
