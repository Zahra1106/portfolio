import type { ReactNode } from "react";

interface ContactButtonProps {
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

// Smooth scrolling is handled in index.css (and turned off for reduced motion).
const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView();
};

const ContactButton = ({
  className = "",
  type = "button",
  disabled = false,
  onClick,
  children = "Contact Me",
}: ContactButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={type === "button" ? onClick ?? scrollToContact : onClick}
      className={`rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      style={{
        background:
          "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow:
          "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
        outline: "2px solid white",
        outlineOffset: "-3px",
      }}
    >
      {children}
    </button>
  );
};

export default ContactButton;
