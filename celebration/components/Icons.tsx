import { cn } from "@/lib/cn";

type IconProps = { className?: string };

const base = "h-5 w-5";

function wrap(children: React.ReactNode, className?: string) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(base, className)}
    >
      {children}
    </svg>
  );
}

export const IconHome = ({ className }: IconProps) =>
  wrap(<><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V20h13V9.5" /><path d="M10 20v-5h4v5" /></>, className);

export const IconCalendar = ({ className }: IconProps) =>
  wrap(<><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></>, className);

export const IconSparkle = ({ className }: IconProps) =>
  wrap(<><path d="M12 3v18M3 12h18" /><path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" opacity=".5" /></>, className);

export const IconHeart = ({ className }: IconProps) =>
  wrap(<path d="M12 20s-7-4.4-7-9.2A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />, className);

export const IconMenu = ({ className }: IconProps) =>
  wrap(<><path d="M4 7h16M4 12h16M4 17h16" /></>, className);

export const IconClose = ({ className }: IconProps) =>
  wrap(<><path d="M6 6l12 12M18 6L6 18" /></>, className);

export const IconShare = ({ className }: IconProps) =>
  wrap(<><path d="M12 16V4M8 7l4-3 4 3" /><path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" /></>, className);

export const IconClock = ({ className }: IconProps) =>
  wrap(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 1.8" /></>, className);

export const IconPin = ({ className }: IconProps) =>
  wrap(<><path d="M12 21s6.5-5.6 6.5-10a6.5 6.5 0 1 0-13 0c0 4.4 6.5 10 6.5 10Z" /><circle cx="12" cy="11" r="2.4" /></>, className);

export const IconShirt = ({ className }: IconProps) =>
  wrap(<><path d="M9 3 4.5 5.5 6 10l2-1v11h8V9l2 1 1.5-4.5L15 3l-3 2Z" /></>, className);

export const IconUsers = ({ className }: IconProps) =>
  wrap(<><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20c0-3.2 2.5-5.4 5.5-5.4S14.5 16.8 14.5 20" /><path d="M16 5.2A3.2 3.2 0 0 1 16 11M17 14.9c2.1.6 3.5 2.5 3.5 5.1" opacity=".6" /></>, className);

export const IconTicket = ({ className }: IconProps) =>
  wrap(<><path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.5a2.5 2.5 0 0 0 0 5V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5a2.5 2.5 0 0 0 0-5Z" /><path d="M13 6v12" strokeDasharray="2 2.5" /></>, className);

export const IconChevron = ({ className }: IconProps) =>
  wrap(<path d="m9 5 7 7-7 7" />, className);

export const IconChevronDown = ({ className }: IconProps) =>
  wrap(<path d="m5 9 7 7 7-7" />, className);

export const IconSearch = ({ className }: IconProps) =>
  wrap(<><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>, className);

export const IconArrowUp = ({ className }: IconProps) =>
  wrap(<><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>, className);

export const IconCheck = ({ className }: IconProps) =>
  wrap(<path d="m5 12.5 4.5 4.5L19 7" />, className);

export const IconPlus = ({ className }: IconProps) =>
  wrap(<><path d="M12 5v14M5 12h14" /></>, className);

export const IconLeaf = ({ className }: IconProps) =>
  wrap(<><path d="M20 4c0 9-5.5 13-11 13a5 5 0 0 1 0-10c4 0 6-1 11-3Z" /><path d="M4 20c2-4 5-6.5 9-8" /></>, className);

export const IconBowl = ({ className }: IconProps) =>
  wrap(<><path d="M3.5 11h17a8.5 8.5 0 0 1-17 0Z" /><path d="M9 7c0-1.5 1.3-2 1.3-3.2M13.5 7c0-1.5 1.3-2 1.3-3.2" opacity=".7" /><path d="M4 20h16" /></>, className);

export const IconMap = ({ className }: IconProps) =>
  wrap(<><path d="m3 6.5 6-2.5 6 2.5 6-2.5v13l-6 2.5-6-2.5-6 2.5Z" /><path d="M9 4v13M15 6.5v13" /></>, className);

export const IconInfo = ({ className }: IconProps) =>
  wrap(<><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8.2v.1" /></>, className);

export const IconCar = ({ className }: IconProps) =>
  wrap(<><path d="M4 16v2.5M20 16v2.5" /><path d="M3 15.5v-3l1.8-4.2A2 2 0 0 1 6.6 7h10.8a2 2 0 0 1 1.8 1.3L21 12.5v3Z" /><circle cx="7.5" cy="15.5" r="1.2" /><circle cx="16.5" cy="15.5" r="1.2" /></>, className);

export const IconSun = ({ className }: IconProps) =>
  wrap(<><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></>, className);

export const IconStar = ({ className }: IconProps) =>
  wrap(<path d="m12 4 2.3 4.9 5.2.7-3.8 3.7 1 5.3-4.7-2.6-4.7 2.6 1-5.3L4.5 9.6l5.2-.7Z" />, className);
