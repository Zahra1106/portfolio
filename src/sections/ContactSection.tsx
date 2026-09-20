import type { ChangeEvent, FormEvent } from "react";
import FadeIn from "../components/FadeIn";
import ContactButton from "../components/ContactButton";
import { useContact } from "../store/ContactContext";
import type { ContactFields } from "../store/contactReducer";

/**
 * TODO before submitting the project — connect the form:
 *  1. Web3Forms (free, no account): go to web3forms.com, enter your email, and paste
 *     the access key they email you into WEB3FORMS_ACCESS_KEY below. Messages arrive in your inbox.
 *     (The access key is meant to be public, it is safe to keep in the code.)
 *  2. Optional fallback: put your email in CONTACT_EMAIL. If no access key is set, the visitor's
 *     email app opens with the message filled in.
 */
const WEB3FORMS_ACCESS_KEY = "0b0348fd-0e1d-4270-9d21-74924173f1ed";
const CONTACT_EMAIL = "";

const fieldClasses =
  "w-full bg-transparent border-2 border-[#D7E2EA]/40 focus:border-[#D7E2EA] text-[#D7E2EA] placeholder:text-[#D7E2EA]/40 px-6 py-3.5 sm:py-4 text-base transition-colors duration-300";
const labelClasses =
  "text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm";

const ContactSection = () => {
  const {
    state: { fields, status },
    dispatch,
  } = useContact();

  const handleChange =
    (field: keyof ContactFields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      dispatch({ type: "FIELD_CHANGED", field, value: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (data.get("botcheck")) return; // hidden checkbox, only bots tick it

    if (WEB3FORMS_ACCESS_KEY) {
      dispatch({ type: "SUBMIT_STARTED" });
      data.append("access_key", WEB3FORMS_ACCESS_KEY);
      data.append("subject", `Portfolio message from ${String(data.get("name") ?? "")}`);
      data.append("from_name", "Portfolio contact form");
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        const result = await res.json();
        if (res.ok && result.success) {
          dispatch({ type: "SUBMIT_SUCCEEDED" });
        } else {
          dispatch({ type: "SUBMIT_FAILED" });
        }
      } catch {
        dispatch({ type: "SUBMIT_FAILED" });
      }
      return;
    }

    if (CONTACT_EMAIL) {
      const name = String(data.get("name") ?? "");
      const email = String(data.get("email") ?? "");
      const message = String(data.get("message") ?? "");
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      dispatch({ type: "EMAIL_APP_OPENED" });
      return;
    }

    console.warn("Contact form is not connected yet. Set WEB3FORMS_ACCESS_KEY or CONTACT_EMAIL in ContactSection.tsx.");
    dispatch({ type: "SUBMIT_FAILED" });
  };

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-6 sm:mb-8"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Contact
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="text-[#D7E2EA]/70 font-light text-center max-w-xl mx-auto mb-12 sm:mb-14 md:mb-16"
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
        >
          Have a project in mind? Tell me about it and I&apos;ll reply by email.
        </p>
      </FadeIn>

      <FadeIn delay={0.2} y={30}>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex flex-col gap-5 sm:gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className={labelClasses}>
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                value={fields.name}
                onChange={handleChange("name")}
                type="text"
                required
                maxLength={80}
                autoComplete="name"
                placeholder="Your name"
                className={`${fieldClasses} rounded-full`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className={labelClasses}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                value={fields.email}
                onChange={handleChange("email")}
                type="email"
                required
                maxLength={120}
                autoComplete="email"
                placeholder="you@example.com"
                className={`${fieldClasses} rounded-full`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className={labelClasses}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={fields.message}
              onChange={handleChange("message")}
              required
              maxLength={2000}
              rows={6}
              placeholder="Tell me about your project"
              className={`${fieldClasses} rounded-[30px] sm:rounded-[36px] resize-y`}
            />
          </div>

          {/* Spam trap: hidden from people, bots tend to tick it */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4 mt-4">
            <ContactButton type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </ContactButton>

            <p
              role="status"
              aria-live="polite"
              className={`text-center text-sm sm:text-base min-h-[1.5rem] ${
                status === "error" ? "text-[#FF8A8A]" : "text-[#D7E2EA]"
              }`}
            >
              {status === "sent" && "Thanks! Your message has been sent."}
              {status === "error" &&
                "Your message could not be sent. Please try again in a moment."}
            </p>
          </div>
        </form>
      </FadeIn>

      <p className="text-[#D7E2EA]/40 text-center text-sm mt-20 sm:mt-24">
        © {new Date().getFullYear()} Zahra. All rights reserved.
      </p>
    </section>
  );
};

export default ContactSection;
