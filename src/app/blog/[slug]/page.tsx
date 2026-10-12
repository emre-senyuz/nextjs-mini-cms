import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPublished } from "@/lib/articles";
import { date, readingTime } from "@/lib/format";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = getPublished((await params).slug);
  return { title: article?.title ?? "Article not found" };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = getPublished((await params).slug);
  if (!article) notFound();
  return (
    <article className="reading">
      <Link className="back-link" href="/blog">
        <ArrowLeft size={16} />
        Back to the journal
      </Link>
      <p className="eyebrow">THE MARGIN JOURNAL</p>
      <h1>{article.title}</h1>
      <div className="reading-meta">
        <time dateTime={article.created_at}>{date(article.created_at)}</time>
        <span>{readingTime(article.content)} min read</span>
      </div>
      <div className="prose">
        {article.content.split(/\n\s*\n/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="reading-end">
        ✳<p>Thanks for spending a little time in the margin.</p>
        <small>Last updated {date(article.updated_at)} (UTC)</small>
      </div>
    </article>
  );
}
