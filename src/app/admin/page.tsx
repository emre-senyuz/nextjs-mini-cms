import Link from "next/link";
import {
  Plus,
  Search,
  ArrowUpRight,
  FileText,
  Pencil,
  CircleCheck,
  Layers,
} from "lucide-react";
import { listArticles, counts } from "@/lib/articles";
import { date, readingTime } from "@/lib/format";
import { ArticleControls } from "@/components/article-controls";
export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.slice(0, 160) : "";
  const filter =
    params.status === "published" || params.status === "draft"
      ? params.status
      : "all";
  const articles = listArticles(q, filter),
    totals = counts();
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">MAKE ROOM FOR GOOD IDEAS</p>
          <h1>
            Your articles<span className="accent">.</span>
          </h1>
          <p className="subtitle">
            From first thoughts to published stories. It all starts here.
          </p>
        </div>
        <Link className="button primary" href="/admin/new">
          <Plus size={18} />
          New article
        </Link>
      </div>
      {(params.notice === "saved" || params.notice === "deleted") && (
        <p className="success" role="status">
          {params.notice === "saved"
            ? "Article saved. Your latest changes are ready."
            : "Article deleted."}
        </p>
      )}
      <div className="stats">
        <div className="stat">
          <span>
            All articles
            <Layers size={18} />
          </span>
          <strong>{String(totals.total).padStart(2, "0")}</strong>
          <small>Your growing collection</small>
        </div>
        <div className="stat">
          <span>
            Published
            <CircleCheck size={18} />
          </span>
          <strong>{String(totals.published).padStart(2, "0")}</strong>
          <small>
            <i className="status-dot" />
            Out in the world
          </small>
        </div>
        <div className="stat">
          <span>
            Drafts
            <FileText size={18} />
          </span>
          <strong>
            {String(totals.total - totals.published).padStart(2, "0")}
          </strong>
          <small>Good things in progress</small>
        </div>
      </div>
      <section className="article-section">
        <div className="section-heading">
          <h2>The story shelf</h2>
          <span>
            {articles.length} {articles.length === 1 ? "article" : "articles"}
          </span>
        </div>
        <form className="filters" action="/admin">
          <div className="search">
            <Search size={18} />
            <input
              name="q"
              aria-label="Search by title"
              placeholder="Search articles by title…"
              defaultValue={q}
              maxLength={160}
            />
          </div>
          <select
            aria-label="Filter by status"
            name="status"
            defaultValue={filter}
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <button className="button" type="submit">
            Filter
          </button>
          {(q || filter !== "all") && (
            <Link href="/admin" className="clear">
              Clear
            </Link>
          )}
        </form>
        {articles.length ? (
          <div className="article-list">
            <div className="list-labels">
              <span>ARTICLE</span>
              <span>STATUS</span>
              <span>LAST SAVED · UTC</span>
              <span>ACTIONS</span>
            </div>
            {articles.map((article) => (
              <article key={article.id} className="article-row">
                <div className="article-title">
                  <span className="document-icon">
                    <FileText size={21} />
                  </span>
                  <div>
                    <Link href={`/admin/${article.id}/edit`}>
                      {article.title}
                    </Link>
                    <p>
                      {readingTime(article.content)} min read <span>·</span> /
                      {article.slug}
                    </p>
                  </div>
                </div>
                <span
                  className={`badge ${article.published ? "published" : "draft"}`}
                >
                  <i />
                  {article.published ? "Published" : "Draft"}
                </span>
                <time dateTime={article.updated_at} title={article.updated_at}>
                  {date(article.updated_at)}
                </time>
                <div className="row-actions">
                  <Link
                    className="icon-button"
                    href={`/admin/${article.id}/edit`}
                    aria-label={`Edit ${article.title}`}
                    title="Edit article"
                  >
                    <Pencil size={17} />
                  </Link>
                  {!!article.published && (
                    <Link
                      className="icon-button"
                      href={`/blog/${article.slug}`}
                      aria-label={`Read ${article.title}`}
                      title="Read article"
                    >
                      <ArrowUpRight size={17} />
                    </Link>
                  )}
                  <ArticleControls
                    id={article.id}
                    title={article.title}
                    published={!!article.published}
                  />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            <FileText size={36} />
            <h2>
              {totals.total
                ? "No stories match just yet"
                : "Every story starts somewhere"}
            </h2>
            <p>
              {totals.total
                ? "Try a different title or clear your filters to see every article."
                : "Give your first idea a title. You can keep it as a draft until it is ready."}
            </p>
            <Link
              className="button primary"
              href={totals.total ? "/admin" : "/admin/new"}
            >
              {totals.total ? "Clear filters" : "Write your first article"}
            </Link>
          </div>
        )}
      </section>
      <div className="bottom-note">
        <FeatherNote />{" "}
        <p>
          Your next good idea deserves a place.
          <br />
          <span>Save a draft today. Share it when you’re ready.</span>
        </p>
        <Link href="/admin/new">
          Start writing <ArrowUpRight size={16} />
        </Link>
      </div>
    </>
  );
}
function FeatherNote() {
  return <span className="note-symbol">✳</span>;
}
