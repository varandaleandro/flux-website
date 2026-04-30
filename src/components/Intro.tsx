// clamp: 32px at ~390px viewport → 96px at 1440px
// slope = (96-32)/(1440-390) = 64/1050 ≈ 6.1vw
// intercept = 32 - 0.061*390 ≈ 8px
const textStyle = {
  fontSize: "clamp(32px, calc(8px + 6.1vw), 96px)",
  letterSpacing: "-0.08em",
  lineHeight: "0.84",
};

// Indentation mirrors Figma pixel values but scales with viewport so the
// stagger feels proportional as the font grows.
// At 1440px: 214px ≈ 14.9vw, 610px ≈ 42.4vw, 606px ≈ 42.1vw
const indent2 = { paddingLeft: "clamp(0px, 14.9vw, 214px)" };
const indent3 = { paddingLeft: "clamp(0px, 42.4vw, 610px)" };
const indent5 = { paddingLeft: "clamp(0px, 42.1vw, 606px)" };

export default function Intro() {
  return (
    <section className="overflow-x-hidden px-4 py-12 md:px-8 md:py-[120px]">
      {/* Label + rule */}
      <div className="flex flex-col items-end gap-3 mb-6">
        <span className="font-mono text-[14px] text-[#1f1f1f] uppercase">
          [ 8+ years in industry ]
        </span>
        <div className="w-full h-px bg-[#1f1f1f]" />
      </div>

      {/* Staggered tagline */}
      <div className="relative flex flex-col gap-2 uppercase">

        {/* Line 1 — "001" above on mobile, inline on desktop */}
        <div className="flex items-start gap-3 justify-center md:justify-start">
          <span className="font-mono text-[14px] text-[#1f1f1f] mt-1 md:hidden">001</span>
          <p className="font-light text-black text-center md:text-left whitespace-pre" style={textStyle}>
            A creative director   /
          </p>
          <span className="hidden md:block font-mono text-[14px] text-[#1f1f1f] mt-1">001</span>
        </div>

        {/* Line 2 */}
        <div style={indent2}>
          <p className="font-light text-black text-center md:text-left" style={textStyle}>
            Photographer
          </p>
        </div>

        {/* Line 3 — & in Playfair italic */}
        <div style={indent3}>
          <p className="font-light text-black text-center md:text-left whitespace-nowrap" style={textStyle}>
            Born{" "}
            <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>
              &amp;
            </span>
            {" "}raised
          </p>
        </div>

        {/* Line 4 — no indent */}
        <p className="font-light text-black text-center md:text-left" style={textStyle}>
          on the south side
        </p>

        {/* Line 5 — text only, tag is out of flow */}
        <div style={indent5}>
          <p className="font-light text-black text-center md:text-left" style={textStyle}>
            of chicago.
          </p>
        </div>

        {/* Freelancer tag — absolute on desktop so it never affects line 5's layout */}
        <span className="hidden md:block absolute right-0 font-mono text-[14px] text-[#1f1f1f]" style={{ bottom: "-30px" }}>
          [ creative freelancer ]
        </span>
        {/* Mobile: stacked below, centered */}
        <span className="md:hidden self-center font-mono text-[14px] text-[#1f1f1f]">
          [ creative freelancer ]
        </span>

      </div>
    </section>
  );
}
