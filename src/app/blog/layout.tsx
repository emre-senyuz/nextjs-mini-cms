import Link from "next/link";
import { Feather, ArrowUpRight } from "lucide-react";
export const dynamic = "force-dynamic";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-shell">
      <header className="blog-header">
        <Link className="brand" href="/blog">
          <span className="brand-icon">
            <Feather size={23} />
          </span>
          margin<span className="brand-dot">.</span>
        </Link>
        <Link href="/admin" className="blog-admin">
          Editorial desk
          <ArrowUpRight size={16} />
        </Link>
      </header>
      <main>{children}</main>
      <footer className="blog-footer">
        Thoughtfully written. Simply shared.
        <span>Margin / A local editorial demo</span>
      </footer>
    </div>
  );
}
