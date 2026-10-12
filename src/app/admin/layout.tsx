import Link from "next/link";
import {
  BookOpen,
  ArrowUpRight,
  Feather,
  LayoutDashboard,
  HardDrive,
} from "lucide-react";
export const dynamic = "force-dynamic";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <Link href="/admin" className="brand">
          <span className="brand-icon">
            <Feather size={23} />
          </span>
          margin<span className="brand-dot">.</span>
        </Link>
        <p className="sidebar-caption">YOUR EDITORIAL SPACE</p>
        <nav>
          <Link className="nav-active" href="/admin">
            <LayoutDashboard size={18} />
            Articles
          </Link>
          <Link href="/blog">
            <BookOpen size={18} />
            View blog
            <ArrowUpRight size={15} className="push" />
          </Link>
        </nav>
        <div className="sidebar-bottom">
          <span className="status-dot" />
          Local workspace
          <p>
            <HardDrive size={13} />
            Saved on this device
          </p>
        </div>
      </aside>
      <div className="admin-body">
        <header className="topbar">
          <span>
            Workspace <span className="crumb">/</span> <strong>Articles</strong>
          </span>
          <span className="local-badge">LOCAL DEMO</span>
        </header>
        <main className="admin-main">
          <div className="demo-notice">
            Local demo · /admin is intentionally unprotected. Do not deploy
            publicly.
          </div>
          {children}
        </main>
        <footer className="admin-footer">
          A little space. A lot of possibility.<span>Margin / Mini CMS</span>
        </footer>
      </div>
    </div>
  );
}
