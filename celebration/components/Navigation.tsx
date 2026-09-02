"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { event, navLinks, secondaryLinks } from "@/data/event";
import { cn } from "@/lib/cn";
import { useItinerary } from "@/lib/useItinerary";
import {
  IconCalendar,
  IconClose,
  IconHeart,
  IconHome,
  IconMenu,
  IconSparkle,
} from "./Icons";
import { LotusMark } from "./Motifs";

const mobileTabs = [
  { href: "/", label: "Home", Icon: IconHome },
  { href: "/schedule", label: "Schedule", Icon: IconCalendar },
  { href: "/activities", label: "Activities", Icon: IconSparkle },
  { href: "/my-celebration", label: "My Plan", Icon: IconHeart },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useItinerary();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-sand/70 bg-ivory/90 backdrop-blur-md"
            : "border-b border-transparent bg-ivory/60 backdrop-blur-sm",
        )}
      >
        <nav
          aria-label="Main"
          className="container-page flex h-16 items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl py-1 pr-2 text-plum-600"
            aria-label={`${event.title} — home`}
          >
            <LotusMark className="h-5 w-8 shrink-0 text-marigold-400" />
            <span className="leading-none">
              <span className="block font-display text-lg font-semibold tracking-tight">
                {event.years} Years
              </span>
              <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-ink-faint">
                {event.coupleShort}
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive(pathname, link.href)
                      ? "bg-marigold-50 text-plum-600"
                      : "text-ink-soft hover:bg-cream hover:text-plum-600",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/my-celebration"
              className="hidden items-center gap-2 rounded-full border border-sand bg-white/80 px-3 py-2 text-sm font-medium text-plum-600 transition-colors hover:border-marigold-200 hover:bg-marigold-50 sm:inline-flex"
            >
              <IconHeart className="h-4 w-4 text-rose-400" />
              <span>My Celebration</span>
              {count > 0 ? (
                <span className="rounded-full bg-rose-400 px-1.5 py-0.5 text-[0.65rem] font-bold text-white">
                  {count}
                </span>
              ) : null}
            </Link>
            <Link href="/rsvp" className="btn-primary hidden h-10 min-h-0 px-4 text-sm md:inline-flex">
              RSVP
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand bg-white/80 text-plum-600 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <IconMenu />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop: the close button below is the accessible way out. */}
          <div
            aria-hidden
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 animate-fadeIn bg-plum-700/40 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 bottom-0 top-16 animate-sheetUp overflow-y-auto rounded-t-4xl border-t border-sand bg-ivory p-6 shadow-sheet">
            <div className="mb-5 flex items-center justify-between">
              <p className="eyebrow">Explore</p>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-white text-plum-600"
                aria-label="Close menu"
              >
                <IconClose />
              </button>
            </div>
            <ul className="grid gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex min-h-[3.25rem] items-center justify-between rounded-2xl border px-4 text-base font-medium transition-colors",
                      isActive(pathname, link.href)
                        ? "border-marigold-200 bg-marigold-50 text-plum-600"
                        : "border-sand bg-white text-ink hover:border-marigold-200",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-7">More</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-[3rem] items-center rounded-2xl border border-sand bg-white px-4 text-sm font-medium text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/rsvp" className="btn-primary mt-6 w-full">
              RSVP for the celebration
            </Link>
            <p className="pad-bottom-nav mt-6 text-center text-xs text-ink-faint">
              {event.dateRange} · {event.venue.name}
            </p>
          </div>
        </div>
      ) : null}

      <BottomNav pathname={pathname} count={count} onMore={() => setMenuOpen(true)} />
    </>
  );
}

function BottomNav({
  pathname,
  count,
  onMore,
}: {
  pathname: string;
  count: number;
  onMore: () => void;
}) {
  return (
    <nav
      aria-label="Quick navigation"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-sand/80 bg-ivory/95 backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {mobileTabs.map(({ href, label, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-[4.5rem] flex-col items-center justify-center gap-1 text-[0.68rem] font-medium transition-colors",
                  active ? "text-plum-600" : "text-ink-faint",
                )}
              >
                <span className="relative">
                  <Icon className={cn("h-[1.35rem] w-[1.35rem]", active && "text-marigold-500")} />
                  {href === "/my-celebration" && count > 0 ? (
                    <span className="absolute -right-2 -top-1.5 rounded-full bg-rose-400 px-1 text-[0.6rem] font-bold text-white">
                      {count}
                    </span>
                  ) : null}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={onMore}
            className="flex h-[4.5rem] w-full flex-col items-center justify-center gap-1 text-[0.68rem] font-medium text-ink-faint"
          >
            <IconMenu className="h-[1.35rem] w-[1.35rem]" />
            More
          </button>
        </li>
      </ul>
    </nav>
  );
}
