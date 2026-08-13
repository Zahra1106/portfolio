import { useEffect, useRef, useState } from "react";

const gifUrls = [
  "https://i.postimg.cc/05KM4YWX/Chat-GPT-Image-Aug-12-2026-10-55-46-PM.png",
  "https://i.postimg.cc/PrkxFB8q/Chat-GPT-Image-Aug-3-2026-07-12-05-PM.png",
  "https://i.postimg.cc/Xq6VmCXb/Chat-GPT-Image-Aug-3-2026-07-28-05-PM.png",
  "https://i.postimg.cc/pd9RdZnc/Chat-GPT-Image-Aug-3-2026-07-50-46-PM.png",
  "https://i.postimg.cc/Z5QzXdDH/Chat-GPT-Image-Jul-25-2026-06-51-30-PM.png",
  "https://i.postimg.cc/kXXr4c0N/Chat-GPT-Image-Jul-25-2026-07-00-33-PM.png",
  "https://i.postimg.cc/0yDCqgt8/Chat-GPT-Image-Jul-25-2026-06-44-56-PM.png",
  "https://i.postimg.cc/05KM4YWX/Chat-GPT-Image-Aug-12-2026-10-55-46-PM.png",
  "https://i.postimg.cc/PrkxFB8q/Chat-GPT-Image-Aug-3-2026-07-12-05-PM.png",
  "https://i.postimg.cc/Xq6VmCXb/Chat-GPT-Image-Aug-3-2026-07-28-05-PM.png",
  "https://i.postimg.cc/Z5QzXdDH/Chat-GPT-Image-Jul-25-2026-06-51-30-PM.png",
  "https://i.postimg.cc/pd9RdZnc/Chat-GPT-Image-Aug-3-2026-07-50-46-PM.png",
  "https://i.postimg.cc/Z5QzXdDH/Chat-GPT-Image-Jul-25-2026-06-51-30-PM.png",
  "https://i.postimg.cc/kXXr4c0N/Chat-GPT-Image-Jul-25-2026-07-00-33-PM.png",
];

const row1 = gifUrls.slice(0, 11);
const row2 = gifUrls.slice(11);

const tripledRow1 = [...row1, ...row1, ...row1];
const tripledRow2 = [...row2, ...row2, ...row2];

const Tile = ({ src, index }: { src: string; index: number }) => (
  <img
    key={index}
    src={src}
    alt=""
    loading="lazy"
    className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
  />
);

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const value = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(value);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${offset - 200}px)`, willChange: "transform" }}
        >
          {tripledRow1.map((src, i) => (
            <Tile src={src} index={i} key={`r1-${i}`} />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: "transform" }}
        >
          {tripledRow2.map((src, i) => (
            <Tile src={src} index={i} key={`r2-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
