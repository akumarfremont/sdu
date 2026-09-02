"use client";

import { useState } from "react";
import { gallery, galleryAlbums } from "@/data/story";
import { cn } from "@/lib/cn";

/**
 * Placeholder-friendly gallery. Add `src` to an item in data/story.ts and
 * the real photograph replaces the tinted placeholder automatically.
 */
export function GalleryGrid() {
  const [album, setAlbum] = useState<string>("All");
  const albums = ["All", ...galleryAlbums];
  const visible = album === "All" ? gallery : gallery.filter((item) => item.album === album);

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:justify-center sm:px-0">
        {albums.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={album === name}
            onClick={() => setAlbum(name)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-95",
              album === name
                ? "border-plum-600 bg-plum-600 text-ivory"
                : "border-sand bg-white text-ink-soft hover:border-marigold-200 hover:text-plum-600",
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((item) => (
          <li key={item.id}>
            <figure className="group overflow-hidden rounded-3xl border border-sand bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
              {item.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="relative flex aspect-[4/5] w-full items-center justify-center"
                  style={{ backgroundColor: `${item.tint}22` }}
                >
                  <svg viewBox="0 0 80 100" className="h-full w-full" fill="none">
                    <circle cx="40" cy="38" r="18" stroke={item.tint} strokeWidth="1.2" opacity=".6" />
                    <circle cx="40" cy="38" r="9" stroke={item.tint} strokeWidth="1.2" opacity=".45" />
                    <path
                      d="M8 92c6-18 18-28 32-28s26 10 32 28"
                      stroke={item.tint}
                      strokeWidth="1.2"
                      opacity=".5"
                    />
                  </svg>
                </div>
              )}
              <figcaption className="px-3.5 py-3">
                <p className="text-[0.72rem] uppercase tracking-[0.12em] text-ink-faint">
                  {item.album}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-ink">{item.caption}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
