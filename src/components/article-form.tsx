"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import { saveArticle } from "@/app/actions";
import type { Article } from "@/lib/types";

export function ArticleForm({ article }: { article?: Article }) {
  const [state, action, pending] = useActionState(saveArticle, {});
  const [title, setTitle] = useState(article?.title ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [published, setPublished] = useState(article?.published ? "1" : "0");
  return (
    <form action={action} className="editor">
      {article && <input type="hidden" name="id" value={article.id} />}
      <div className="editor-main panel">
        <label htmlFor="title">Article title</label>
        <input
          id="title"
          name="title"
          className="title-input"
          placeholder="A story worth sharing…"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={160}
          required
          aria-invalid={!!state.fields?.title}
          aria-describedby="title-error"
        />
        <p id="title-error" className="field-error">
          {state.fields?.title?.join(" ")}
        </p>
        <label htmlFor="content">Your story</label>
        <p className="hint">
          Plain text. Use blank lines to separate your paragraphs.
        </p>
        <textarea
          id="content"
          name="content"
          placeholder="Start with an idea…"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={50000}
          required
          aria-invalid={!!state.fields?.content}
          aria-describedby="content-error"
        />
        <p id="content-error" className="field-error">
          {state.fields?.content?.join(" ")}
        </p>
      </div>
      <aside className="panel editor-aside">
        <h2>Publishing</h2>
        <p className="hint">A little care before it goes out into the world.</p>
        <label htmlFor="published">Visibility</label>
        <select
          id="published"
          name="published"
          value={published}
          onChange={(event) => setPublished(event.target.value)}
        >
          <option value="0">Draft — just for you</option>
          <option value="1">Published — visible on blog</option>
        </select>
        {state.fields?.published && (
          <p className="field-error">{state.fields.published.join(" ")}</p>
        )}
        <div className="note">
          <strong>Permanent link</strong>
          <p>
            {article
              ? `/blog/${article.slug}`
              : "A unique URL is generated from your title when you first save."}
          </p>
          {article && <small>Kept unchanged when you edit the title.</small>}
        </div>
        {state.error && (
          <p role="alert" className="field-error">
            {state.error}
          </p>
        )}
        <button className="button primary full" disabled={pending}>
          <Save size={16} />
          {pending ? "Saving…" : "Save article"}
        </button>
        <Link href="/admin" className="button full">
          <ArrowLeft size={16} />
          Back to articles
        </Link>
        <p className="hint center">
          Changes are saved only when you click Save.
        </p>
      </aside>
    </form>
  );
}
