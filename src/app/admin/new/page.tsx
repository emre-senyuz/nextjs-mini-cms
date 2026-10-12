import { ArticleForm } from "@/components/article-form";
export const metadata = { title: "New article" };
export default function NewArticle() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">A FRESH PAGE</p>
          <h1>
            Make it a story<span className="accent">.</span>
          </h1>
          <p className="subtitle">Get the idea down. The rest can follow.</p>
        </div>
      </div>
      <ArticleForm />
    </>
  );
}
