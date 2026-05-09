export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold transition focus-visible:outline-none";

  const variants = {
    primary:
      "bg-sky-600 text-white shadow-lg shadow-sky-600/25 hover:bg-sky-700 disabled:opacity-60 disabled:hover:bg-sky-600",
    secondary:
      "bg-white text-slate-900 ring-1 ring-slate-200 shadow-sm hover:-translate-y-0.5",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:hover:bg-red-600",
  };

  return (
    <button
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
