import Image from "next/image";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero.png"
        alt="Harvey Specter"
        fill
        className="object-cover object-[center_15%] -z-10"
        priority
      />

      {/* Gradient overlay — kept below content so blend modes work */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none"
        style={{ zIndex: -1 }}
      />

      {/* Smooth-fading backdrop blur — kept below content so blend modes work */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)] pointer-events-none"
        style={{
          zIndex: -1,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 55%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 55%)",
        }}
      />

      {/* Navbar */}
      <div className="relative z-30 px-4 md:px-8">
        <Navbar />
      </div>

      {/*
        Mobile: flex-1 spacer pushes the name+description block to the bottom.
        Desktop: fixed 240px gap then name, then description.
      */}
      <div className="flex-1 md:flex-none md:h-[240px]" />

      {/* Name block — no z-index so the section's stacking context is used and mix-blend-mode works against the photo */}
      <div className="relative w-full px-4 md:px-8">
        <div className="flex items-center px-[18px] mb-[-12px] md:mb-[-15px]">
          <span className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">
            [ Hello i&apos;m ]
          </span>
        </div>
        <h1
          className="text-white mix-blend-overlay font-medium capitalize text-center w-full"
          style={{
            fontSize: "clamp(96px, calc(9.58vw + 60px), 198px)",
            letterSpacing: "-0.07em",
            lineHeight: "1.0",
          }}
        >
          Harvey{"   "}Specter
        </h1>
      </div>

      {/* Description + CTA */}
      <div className="relative px-4 md:px-8 flex justify-center md:justify-end pb-6 md:pb-8 mt-4 md:mt-2">
        <div className="flex flex-col gap-[17px] w-[294px]">
          <p className="text-[#1f1f1f] text-[14px] uppercase tracking-[-0.04em] leading-[1.1]">
            <strong className="font-bold italic">H.Studio is a </strong>
            <em className="font-normal">full-service</em>
            <strong className="font-bold italic">
              {" "}creative studio creating beautiful digital experiences and
              products. We are an{" "}
            </strong>
            <em className="font-normal">award winning</em>
            <strong className="font-bold italic">
              {" "}design and art group specializing in branding, web design and
              engineering.
            </strong>
          </p>
          <button className="flex items-center justify-center px-4 py-3 bg-black text-white text-[14px] font-medium tracking-[-0.04em] rounded-full w-fit cursor-pointer hover:bg-neutral-800 transition-colors">
            Let&apos;s talk
          </button>
        </div>
      </div>
    </section>
  );
}
