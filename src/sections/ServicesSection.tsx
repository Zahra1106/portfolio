import FadeIn from "../components/FadeIn";

const services = [
  {
    number: "01",
    name: "Web Development",
    description:
      "Building fast, responsive websites and web apps with clean code, modern frameworks, and pixel-perfect execution from design to deployment.",
  },
  {
    number: "02",
    name: "App Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android, built for smooth performance, reliable functionality, and real user needs.",
  },
  {
    number: "03",
    name: "UI/UX Design",
    description:
      "Designing intuitive, user-first interfaces that balance visual clarity with usability, backed by research and iterative testing.",
  },
  {
    number: "04",
    name: "Backend & APIs",
    description:
      "Architecting secure, scalable backend systems and APIs that power products reliably, from databases to authentication and beyond.",
  },
  {
    number: "05",
    name: "Maintenance & Support",
    description:
      "Ongoing updates, performance tuning, and bug fixes to keep apps and websites running smoothly long after launch.",
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn delay={0} y={30}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-center gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
              style={{ borderBottom: "1px solid rgba(12, 12, 12, 0.15)" }}
            >
              <span
                className="font-black text-[#0C0C0C] flex-shrink-0"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2 sm:gap-3">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)", opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
