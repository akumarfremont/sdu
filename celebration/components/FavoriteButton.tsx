"use client";

import { cn } from "@/lib/cn";
import { useItinerary } from "@/lib/useItinerary";
import { IconCheck, IconPlus } from "./Icons";

/**
 * "Add to My Celebration" — stores the activity key in localStorage.
 */
export function FavoriteButton({
  activityKey,
  name,
  className,
  variant = "icon",
}: {
  activityKey: string;
  name: string;
  className?: string;
  variant?: "icon" | "full";
}) {
  const { has, toggle } = useItinerary();
  const saved = has(activityKey);

  const label = saved ? `Remove ${name} from My Celebration` : `Add ${name} to My Celebration`;

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => toggle(activityKey)}
        aria-pressed={saved}
        className={cn(
          "btn w-full border",
          saved
            ? "border-leaf-300 bg-leaf-100 text-leaf-600"
            : "border-sand bg-white text-plum-600 hover:border-marigold-200 hover:bg-marigold-50",
          className,
        )}
      >
        {saved ? <IconCheck className="h-4 w-4" /> : <IconPlus className="h-4 w-4" />}
        {saved ? "In My Celebration" : "Add to My Celebration"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(activityKey);
      }}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all active:scale-95",
        saved
          ? "border-leaf-300 bg-leaf-100 text-leaf-600"
          : "border-sand bg-white/90 text-ink-faint hover:border-marigold-300 hover:text-marigold-500",
        className,
      )}
    >
      {saved ? <IconCheck className="h-[1.1rem] w-[1.1rem]" /> : <IconPlus className="h-[1.1rem] w-[1.1rem]" />}
    </button>
  );
}
