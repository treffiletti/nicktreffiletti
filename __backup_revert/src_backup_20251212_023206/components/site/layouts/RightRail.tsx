export default function RightRail({ toc = [] as { id: string; text: string; level: number }[] }) {
  return (
    <div className="sticky top-24 space-y-6">
      {toc.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs uppercase tracking-wider text-slate-500">On this page</h4>
          <ul className="space-y-1 text-sm">
            {toc.map((h) => (
              <li key={h.id} className={`pl-[${(h.level - 1) * 12}px]`}>
                <a href={`#${h.id}`} className="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400">
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="rounded-xl border border-slate-200 dark:border-white/10 p-4">
        <div className="text-sm font-medium mb-1">Subscribe</div>
        <p className="text-sm text-slate-500 mb-3">Get new essays on architecture & leadership.</p>
        <a href="/subscribe" className="inline-flex items-center rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-1.5 text-sm">Join the list</a>
      </div>
    </div>
  );
}
