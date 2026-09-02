import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Wedding photographs, early years, the family as it grew, and pictures from the celebration itself.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fifty years in pictures"
        title="Gallery"
        intro="Placeholders for now. Drop your photographs into public/images/gallery and point each item at its file — the layout does the rest."
      />
      <div className="container-page py-10 sm:py-14">
        <GalleryGrid />
        <p className="mt-10 text-center text-xs text-ink-faint">
          To add a real photograph, set <code>src: &quot;/images/gallery/your-photo.jpg&quot;</code>{" "}
          on any item in <code>data/story.ts</code>.
        </p>
      </div>
    </>
  );
}
