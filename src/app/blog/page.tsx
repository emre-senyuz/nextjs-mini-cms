import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { listArticles } from "@/lib/articles";
import { date, readingTime } from "@/lib/format";
export const metadata = { title: "The journal" };
export default function Blog() {
  const articles = listArticles("", "published");
  return (
    <>
      <div className="blog-hero">
        <p className="eyebrow">THE MARGIN JOURNAL</p>
        <h1>
          Room for a<br />
          <em>different perspective.</em>
        </h1>
        <p>Notes on making, noticing, and finding meaning in the everyday.</p>
      </div>
      <div className="section-heading">
        <h2>Latest stories</h2>
        <span>{articles.length} published</span>
      </div>
      {articles.length ? (
        <div className="blog-grid">
          {articles.map((article, index) => (
            <Link
              className="story-card"
              href={`/blog/${article.slug}`}
              key={article.id}
            >
              <div className={`story-art art-${index % 3}`} aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </div>
              <div className="story-meta">
                {date(article.created_at)} <span>·</span>{" "}
                {readingTime(article.content)} min read
              </div>
              <h2>{article.title}</h2>
              <p>
                {article.content.slice(0, 160)}
                {article.content.length > 160 ? "…" : ""}
              </p>
              <span className="read-story">
                Read the story
                <ArrowUpRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty">
          <BookOpen size={38} />
          <h2>Good stories take a little time</h2>
          <p>
            The journal is quiet for now. Published articles will appear here.
          </p>
          <Link className="button" href="/admin">
            Go to the editorial desk
          </Link>
        </div>
      )}
    </>
  );
}
