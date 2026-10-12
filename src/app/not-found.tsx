import Link from "next/link";
export default function NotFound() {
  return (
    <div className="empty standalone">
      <p className="eyebrow">404 / A BLANK PAGE</p>
      <h1>This story isn’t here.</h1>
      <p>It may be unpublished, deleted, or at a different address.</p>
      <Link className="button primary" href="/blog">
        Back to the journal
      </Link>
    </div>
  );
}
