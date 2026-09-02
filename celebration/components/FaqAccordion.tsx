"use client";

import { useState } from "react";
import { faqs, faqTopics } from "@/data/faq";
import { cn } from "@/lib/cn";
import { IconChevronDown } from "./Icons";

export function FaqAccordion() {
  const [topic, setTopic] = useState("All");
  const topics = ["All", ...faqTopics];
  const visible = topic === "All" ? faqs : faqs.filter((faq) => faq.topic === topic);

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        {topics.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={topic === name}
            onClick={() => setTopic(name)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-95",
              topic === name
                ? "border-plum-600 bg-plum-600 text-ivory"
                : "border-sand bg-white text-ink-soft hover:border-marigold-200 hover:text-plum-600",
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {visible.map((faq) => (
          <li key={faq.id}>
            <details className="card group overflow-hidden">
              <summary className="flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                <span className="text-[1.02rem] font-semibold leading-snug text-plum-600">
                  {faq.question}
                </span>
                <IconChevronDown className="h-5 w-5 shrink-0 text-marigold-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="border-t border-sand/70 px-5 py-4 text-[0.95rem] leading-relaxed text-ink-soft">
                {faq.answer}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
