import Link from "next/link";
import { LotusMark } from "@/components/Motifs";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <LotusMark className="h-9 w-14 text-marigold-300" />
      <h1 className="mt-5 text-4xl">This page wandered off</h1>
      <p className="mt-3 max-w-prose text-ink-soft">
        Probably somewhere near the chai counter. Try the schedule instead.
      </p>
      <div className="mt-7 flex flex-col gap-2 sm:flex-row">
        <Link href="/" className="btn-primary">
          Back to the celebration
        </Link>
        <Link href="/schedule" className="btn-ghost">
          See the schedule
        </Link>
      </div>
    </div>
  );
}
