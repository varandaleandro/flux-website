import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type Project = {
  _id: string;
  title: string;
  tags: string[] | null;
  image?: { asset: { _ref: string }; hotspot?: unknown } | null;
  tall: boolean;
};

const QUERY = `*[_type == "project"] | order(order asc) {
  _id, title, tags, image, tall
}`;

const PLACEHOLDER_BG = ["#d4d0c8", "#c8ccd4", "#d0c8cc", "#c8d0c8"];

function Tag({ label }: { label: string }) {
  return (
    <span className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[#111] text-[13px] font-medium tracking-[-0.04em] whitespace-nowrap">
      {label}
    </span>
  );
}

function ArrowIcon() {
  return (
    <div className="flex items-center justify-center size-8 rounded-full bg-black shrink-0">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M3 11L11 3M11 3H5M11 3V9"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function ProjectCard({
  title,
  tags,
  image,
  tall,
  index,
}: {
  title: string;
  tags: string[] | null;
  image?: Project["image"];
  tall: boolean;
  index: number;
}) {
  const imgUrl = image ? urlFor(image).width(800).url() : null;

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div
        className={`relative w-full overflow-hidden flex flex-col justify-end p-4
          aspect-[4/5]
          ${tall ? "md:aspect-[5/6]" : "md:aspect-square"}
        `}
        style={!imgUrl ? { backgroundColor: PLACEHOLDER_BG[index % PLACEHOLDER_BG.length] } : undefined}
      >
        {imgUrl && (
          <img
            src={imgUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="relative flex gap-2 items-center flex-wrap">
          {(tags ?? []).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p
          className="font-black text-black uppercase leading-[1.1]"
          style={{
            fontSize: "clamp(20px, calc(14px + 1.5vw), 36px)",
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </p>
        <ArrowIcon />
      </div>
    </div>
  );
}

function CtaBox() {
  return (
    <div className="relative p-6 flex flex-col gap-4 items-start w-full md:max-w-[465px]">
      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-black" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-black" />
      <p className="italic text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.04em]">
        Discover how my creativity transforms ideas into impactful digital
        experiences — schedule a call with me to get started.
      </p>
      <button className="flex items-center justify-center px-4 py-3 bg-black text-white text-[14px] font-medium tracking-[-0.04em] rounded-full cursor-pointer hover:bg-neutral-800 transition-colors">
        Let&apos;s talk
      </button>
    </div>
  );
}

export default async function SelectedWork() {
  const projects: Project[] = await client.fetch(QUERY, {}, { next: { revalidate: 60 } });

  const headingStyle = {
    fontSize: "clamp(40px, calc(20px + 5.3vw), 96px)",
    letterSpacing: "-0.08em",
    lineHeight: "0.86",
  };

  return (
    <section className="overflow-x-hidden px-4 py-16 md:px-8 md:py-20">

      {/* ── Mobile header ── */}
      <div className="md:hidden flex flex-col gap-2 mb-10">
        <span className="font-mono text-[14px] text-[#1f1f1f] uppercase">
          [ portfolio ]
        </span>
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-light text-black uppercase" style={headingStyle}>
            Selected<br />Work
          </h2>
          <span className="font-mono text-[14px] text-[#1f1f1f] shrink-0 mt-1">004</span>
        </div>
      </div>

      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-center justify-between mb-[61px]">
        <div className="flex items-start gap-2.5 uppercase">
          <h2 className="font-light text-black" style={headingStyle}>
            Selected<br />Work
          </h2>
          <span className="font-mono text-[14px] text-[#1f1f1f] mt-1">004</span>
        </div>
        <div className="flex items-center justify-center h-[110px] w-[15px]">
          <span className="-rotate-90 font-mono text-[14px] text-[#1f1f1f] uppercase whitespace-nowrap">
            [ portfolio ]
          </span>
        </div>
      </div>

      {/* ── Mobile: single column ── */}
      <div className="flex flex-col gap-10 md:hidden">
        {projects.map((p, i) => (
          <ProjectCard key={p._id} {...p} index={i} />
        ))}
        <CtaBox />
      </div>

      {/* ── Desktop: two-column masonry ── */}
      <div className="hidden md:flex gap-6 items-start">
        <div className="flex-1 flex flex-col gap-6">
          {projects[0] && <ProjectCard {...projects[0]} index={0} />}
          {projects[1] && <ProjectCard {...projects[1]} index={1} />}
          <CtaBox />
        </div>
        <div
          className="flex-1 flex flex-col"
          style={{
            paddingTop: "clamp(80px, 16.7vw, 240px)",
            gap: "clamp(24px, 8.1vw, 117px)",
          }}
        >
          {projects[2] && <ProjectCard {...projects[2]} index={2} />}
          {projects[3] && <ProjectCard {...projects[3]} index={3} />}
        </div>
      </div>

    </section>
  );
}
