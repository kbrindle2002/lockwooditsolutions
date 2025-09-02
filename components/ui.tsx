export function Card({ children, className = '' }: any) {
  return <div className={`rounded-2xl border border-slate-800 p-5 bg-slate-950/60 ${className}`}>{children}</div>
}
export function Input({ label, ...props }: any) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <input {...props} className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500" />
    </label>
  )
}
