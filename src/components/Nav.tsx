"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
      style={{
        background: scrolled
          ? "rgba(8,11,16,0.9)"
          : "rgba(8,11,16,0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0 font-display text-2xl font-bold tracking-tight">
          <span className="text-white">SunLeads</span>
          <span style={{ color: "#7FFF00" }}>AI</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative py-1 text-sm font-medium transition-colors duration-200"
                style={{ color: "#8B95A8" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#EAEAEA")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#8B95A8")
                }
              >
                {link.label}
                {/* Gold underline on hover */}
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: "#F5A623" }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#book"
          className="hidden rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 md:inline-flex"
          style={{
            background: "#7FFF00",
            color: "#000",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#8FFF20";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#7FFF00";
          }}
        >
          Book a Call
        </a>

        {/* Mobile Hamburger */}
        <button
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className="block h-[2px] w-6 rounded-full bg-white transition-all duration-300"
            style={{
              transform: mobileOpen
                ? "translateY(5px) rotate(45deg)"
                : "none",
            }}
          />
          <span
            className="block h-[2px] w-6 rounded-full bg-white transition-all duration-300"
            style={{
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-[2px] w-6 rounded-full bg-white transition-all duration-300"
            style={{
              transform: mobileOpen
                ? "translateY(-5px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ background: "rgba(8,11,16,0.97)" }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="font-display text-2xl font-semibold text-white transition-colors duration-200 hover:text-gold"
            style={{ color: "#EAEAEA" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#F5A623")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#EAEAEA")
            }
          >
            {link.label}
          </a>
        ))}
        <a
          href="#book"
          onClick={() => setMobileOpen(false)}
          className="mt-4 rounded-lg px-8 py-3 text-base font-semibold"
          style={{ background: "#7FFF00", color: "#000" }}
        >
          Book a Call
        </a>
      </div>
    </nav>
  );
}
