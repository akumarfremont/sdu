import Link from "next/link";
import { quickLinks } from "@/data/event";
import { IconChevron } from "./Icons";

export function QuickLinks() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {quickLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group flex h-full min-h-[5.5rem] flex-col justify-between rounded-3xl border border-sand bg-white/80 p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-marigold-300 hover:shadow-lift"
          >
            <span className="font-display text-lg font-semibold leading-tight text-plum-600 transition-colors group-hover:text-marigold-600">
              {link.label}
            </span>
            <span className="mt-2 flex items-center justify-between text-xs text-ink-faint">
              {link.hint}
              <IconChevron className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
