export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      ) : null}
      <input
        className={`rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${className}`}
        {...props}
      />
      {error ? <div className="text-sm text-red-600">{error}</div> : null}
    </div>
  );
}
