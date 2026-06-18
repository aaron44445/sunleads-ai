"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    question: "How is this different from buying leads from a lead gen company?",
    answer:
      "Lead gen companies sell you a name and a phone number. We build the full pipeline — from ad to qualified, booked appointment. You're not buying leads. You're buying sits with pre-vetted homeowners who agreed to a specific time on your calendar.",
  },
  {
    question: "What counts as a \"qualified\" appointment?",
    answer:
      "Homeowner (not renter), roof in serviceable condition, $150+ electric bill, 650+ credit score or cash/loan-ready, decision-maker present or scheduled, in your service area, and confirmed the appointment time. If it doesn't meet all seven, it doesn't count toward your 30.",
  },
  {
    question: "What if I already have a CRM and ad account?",
    answer:
      "We work inside your existing ad account and CRM. You keep full ownership of everything — the ad account, the leads, the data, the funnel. Nothing is locked behind our system.",
  },
  {
    question: "How much ad spend do I need?",
    answer:
      "Minimum $50/day, paid directly to Meta. You control the ad account. We recommend $75–$100/day for faster ramp-up in competitive markets, but $50/day is enough to start generating qualified appointments.",
  },
  {
    question: "What happens if I don't get 30 appointments?",
    answer:
      "We keep running the system at no additional charge until we deliver all 30. The guarantee is simple — we don't stop until you have 30 qualified, booked sits.",
  },
  {
    question: "Do I need to do anything on my end?",
    answer:
      "Your reps show up to appointments and close. That's it. We handle the ads, the AI calling, the qualification, the booking, and the no-show prevention. You'll need to grant Meta ad account access and provide your reps' calendar availability during onboarding.",
  },
  {
    question: "How fast do I start seeing appointments?",
    answer:
      "Most campaigns start generating qualified appointments within the first 7–10 days after launch. Full pipeline load (consistent daily flow) typically happens by week 3–4. We don't promise overnight results — we promise a system that compounds.",
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
      {/* Section Header */}
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

      {/* FAQ Items */}
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
                  maxHeight: isOpen ? "400px" : "0px",
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
