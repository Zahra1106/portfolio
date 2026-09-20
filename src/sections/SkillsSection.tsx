import FadeIn from "../components/FadeIn";

// TODO: keep only the skills that are really yours, and add any that are missing.
const skills = [
  "Flutter",
  "Dart",
  "React",
  "JavaScript",
  "HTML & CSS",
  "Firebase",
  "REST APIs",
  "Git & GitHub",
  "Node.js"
];

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Skills
        </h2>
      </FadeIn>

      <ul className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 sm:gap-4">
        {skills.map((skill, i) => (
          <FadeIn key={skill} as="li" delay={i * 0.05} y={20}>
            <span className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm md:text-base">
              {skill}
            </span>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
};

export default SkillsSection;
