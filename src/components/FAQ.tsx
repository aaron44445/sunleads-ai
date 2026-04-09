"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    question: "Does the AI actually sound human?",
    answer:
      "Yes. Built on the latest voice AI technology, our callers sound natural in conversation. Homeowners just know someone called them back fast.",
  },
  {
    question: "How much do I need to spend on ads?",
    answer:
      "We recommend $50\u2013$100/day for solar campaigns. This generates a consistent flow of leads in your service area. Ad spend goes directly to Facebook \u2014 not through us.",
  },
  {
    question: "What if the leads aren\u2019t qualified?",
    answer:
      "Our AI asks qualifying questions before booking \u2014 homeownership, roof condition, electric bill, and timeline. Only qualified homeowners make it to your calendar.",
  },
  {
    question: "Is this compliant with calling regulations?",
    answer:
      "100%. We follow all FCC and TCPA guidelines. Every lead opts in through the ad form, the AI discloses it\u2019s automated, and opt-out is offered on every call.",
  },
  {
    question: "What happens if I don\u2019t see results?",
    answer:
      "We keep working until you do \u2014 at no extra cost. We don\u2019t collect a check and disappear. If the system isn\u2019t delivering, we optimize until it does.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveals = section.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden px-6 py-12 sm:py-16"
    >
      {/* ── Section Header ── */}
      <div className="mx-auto max-w-6xl text-center" data-reveal>
        {/* Section Tag */}
        <div className="mb-4 flex items-center justify-center gap-4">
          <span
            className="block h-[1px] w-6"
            style={{ background: "#F5A623" }}
          />
          <span
            className="text-xs font-semibold uppercase"
            style={{
              color: "#F5A623",
              fontSize: "11px",
              letterSpacing: "3px",
            }}
          >
            FAQ
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display text-4xl font-bold text-white sm:text-5xl"
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "-0.8px",
          }}
        >
          Got Questions?
        </h2>
      </div>

      {/* ── FAQ Items ── */}
      <div className="mx-auto mt-8" style={{ maxWidth: "740px" }}>
        {FAQS.map((faq, i) => {
          const isOpen = openItems.includes(i);

          return (
            <div
              key={i}
              data-reveal
              style={{
                transitionDelay: `${(i + 1) * 0.08}s`,
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                onClick={() => toggleItem(i)}
                className="group flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left transition-colors duration-300"
              >
                <span
                  className="font-display font-semibold transition-colors duration-300 group-hover:text-[#F5A623]"
                  style={{
                    fontSize: "17px",
                    color: isOpen ? "#F5A623" : "#EAEAEA",
                  }}
                >
                  {faq.question}
                </span>

                {/* Toggle Icon */}
                <span
                  className="flex shrink-0 items-center justify-center rounded-lg transition-transform duration-300"
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "rgba(245,166,35,0.08)",
                    border: "1px solid rgba(245,166,35,0.2)",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <span
                    className="font-display text-lg font-bold leading-none"
                    style={{ color: "#F5A623" }}
                  >
                    +
                  </span>
                </span>
              </button>

              {/* Answer Body */}
              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: isOpen ? "300px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p
                  className="pb-6"
                  style={{
                    color: "#8B95A8",
                    fontSize: "15px",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
