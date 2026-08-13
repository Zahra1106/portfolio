import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText = ({ text, className = "", style = {} }: AnimatedTextProps) => {
  const targetRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const characters = text.split("");

  return (
    <p ref={targetRef} className={className} style={style}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + 1 / characters.length;
        return (
          <Character key={i} char={char} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </p>
  );
};

interface CharacterProps {
  char: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

const Character = ({ char, progress, range }: CharacterProps) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const display = char === " " ? "\u00A0" : char;

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ visibility: "hidden" }}>{display}</span>
      <motion.span style={{ position: "absolute", left: 0, top: 0, opacity }}>
        {display}
      </motion.span>
    </span>
  );
};

export default AnimatedText;
