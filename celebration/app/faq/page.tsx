import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/Reveal";
import { DiamondRule } from "@/components/Motifs";
import { event } from "@/data/event";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about the Bhagwat, food, dress, children, wellness bookings, transport and gifts.",
};

/** Structured data so the answers can surface in search results. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        eyebrow="Asked and answered"
        title="Questions"
        intro="The things guests ask most often. If yours isn't here, call the guest coordination number and someone will sort it out."
      />

      <div className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion />

          <Reveal className="mt-12">
            <section className="rounded-4xl border border-marigold-200 bg-gradient-to-br from-marigold-50 to-white p-8 text-center shadow-card">
              <h2 className="text-2xl">Still not sure?</h2>
              <DiamondRule className="mx-auto my-4 w-36" />
              <p className="mx-auto max-w-prose text-sm leading-relaxed text-ink-soft">
                Call {event.contacts[0].name} on{" "}
                <a
                  href={`tel:${event.contacts[0].phone.replace(/\s/g, "")}`}
                  className="link-underline font-semibold text-plum-600"
                >
                  {event.contacts[0].phone}
                </a>
                , or have a look through the guest information.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                <Link href="/guest-info" className="btn-primary">
                  Guest information
                </Link>
                <Link href="/rsvp" className="btn-ghost">
                  RSVP
                </Link>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </>
  );
}
