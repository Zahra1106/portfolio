import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText = ({ text, className = "", style = {} }: AnimatedTextProps) => {
  const targetRef = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.8", "end 0.2"],
  });

  // Letters are still revealed one by one, but each word is kept together
  // so a line can only break between words (never in the middle of one).
  const total = text.length;
  const words = text.split(" ");
  let cursor = 0;

  return (
    <p ref={targetRef} className={className} style={style} aria-label={text}>
      {words.map((word, w) => {
        const wordStart = cursor;
        cursor += word.length + 1; // +1 for the space after the word

        return (
          <span key={w} aria-hidden="true">
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {word.split("").map((char, i) => {
                const start = (wordStart + i) / total;
                const end = start + 1 / total;
                return (
                  <Character
                    key={i}
                    char={char}
                    progress={scrollYProgress}
                    range={[start, end]}
                    reduceMotion={reduceMotion}
                  />
                );
              })}
            </span>
            {w < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </p>
  );
};

interface CharacterProps {
  char: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduceMotion: boolean;
}

const Character = ({ char, progress, range, reduceMotion }: CharacterProps) => {
  const opacity = useTransform(progress, range, reduceMotion ? [1, 1] : [0.2, 1]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ visibility: "hidden" }}>{char}</span>
      <motion.span style={{ position: "absolute", left: 0, top: 0, opacity }}>
        {char}
      </motion.span>
    </span>
  );
};

export default AnimatedText;
