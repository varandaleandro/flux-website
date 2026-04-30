"use client";

import { useState } from "react";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between py-6 w-full z-20">
      <span className="font-semibold text-base tracking-[-0.04em] capitalize text-black">
        H.Studio
      </span>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-14 font-semibold text-base tracking-[-0.04em] capitalize text-black">
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" className="hover:opacity-60 transition-opacity">
            {link}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <button className="hidden md:flex items-center justify-center px-4 py-3 bg-black text-white text-sm font-medium tracking-[-0.04em] rounded-full cursor-pointer hover:bg-neutral-800 transition-colors">
        Let&apos;s talk
      </button>

      {/* Mobile hamburger */}
      <button
        className="md:hidden cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="2" y1="6" x2="22" y2="6" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="18" x2="22" y2="18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full left-[-16px] right-[-16px] bg-white/95 backdrop-blur-sm flex flex-col gap-5 px-6 py-6 font-semibold text-base tracking-[-0.04em] capitalize text-black shadow-lg z-30">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="hover:opacity-60 transition-opacity">
              {link}
            </a>
          ))}
          <button className="flex items-center justify-center px-4 py-3 bg-black text-white text-sm font-medium tracking-[-0.04em] rounded-full w-fit mt-1 cursor-pointer">
            Let&apos;s talk
          </button>
        </div>
      )}
    </nav>
  );
}
