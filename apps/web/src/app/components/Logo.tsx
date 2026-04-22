type LogoVariant = "default" | "black";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
};

export const Logo = ({ variant = "default", className = "" }: LogoProps) => {
  const colorClass =
    variant === "black" ? "text-[#070415]" : "text-[#6366F1]";

  return (
    <span
      aria-label="Freelancia"
      className={`inline-block font-black tracking-tight leading-none select-none ${colorClass} ${className}`}
      style={{
        fontFamily:
          "var(--font-geist-sans), Inter, system-ui, -apple-system, sans-serif",
        letterSpacing: "-0.02em",
      }}
    >
      freelancia
    </span>
  );
};
