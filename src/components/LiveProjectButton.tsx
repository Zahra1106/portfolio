interface LiveProjectButtonProps {
  className?: string;
  /** Link to the live project. When empty the button is shown but does nothing. */
  href?: string;
}

const LiveProjectButton = ({ className = "", href }: LiveProjectButtonProps) => {
  const classes = `rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-300 hover:bg-[#D7E2EA]/10 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block text-center ${classes}`}
      >
        Live Project
      </a>
    );
  }

  return <button className={classes}>Live Project</button>;
};

export default LiveProjectButton;
