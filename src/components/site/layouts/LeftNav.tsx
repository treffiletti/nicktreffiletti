import Link from "next/link";

const sections = [
  { href: "/articles", label: "Articles" },
  { href: "/library/architecture", label: "Architecture" },
  { href: "/library/data", label: "Data" },
  { href: "/library/leadership", label: "Leadership" },
  { href: "/library/career", label: "Career" },
];

export default function LeftNav() {
  return (
    <nav className="sticky top-24 space-y-2">
      {sections.map((s) => (
        <Link 
          key={s.href} 
          href={s.href} 
          className="block rounded-md px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
        >
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
