import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/article-form";
import { getArticle } from "@/lib/articles";
import { date } from "@/lib/format";
export const metadata = { title: "Edit article" };
export default async function EditArticle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) notFound();
  const article = getArticle(Number(id));
  if (!article) notFound();
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">WORK IN PROGRESS</p>
          <h1>
            A little refinement<span className="accent">.</span>
          </h1>
          <p className="subtitle">
            Created {date(article.created_at)} · Last saved{" "}
            {date(article.updated_at)} (UTC)
          </p>
        </div>
      </div>
      <ArticleForm article={article} />
    </>
  );
}
