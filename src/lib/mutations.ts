import "server-only";
import { database } from "./database";

export function createArticle(
  title: string,
  content: string,
  published: boolean,
) {
  const db = database();
  return db
    .transaction(() => {
      const base =
        title
          .normalize("NFKD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 100)
          .replace(/-$/, "") || "article";
      let slug = base;
      let suffix = 2;
      while (db.prepare("SELECT id FROM articles WHERE slug = ?").get(slug))
        slug = `${base}-${suffix++}`;
      const now = new Date().toISOString();
      return db
        .prepare(
          "INSERT INTO articles (title, slug, content, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        )
        .run(title, slug, content, Number(published), now, now);
    })
    .immediate();
}
export function updateArticle(
  id: number,
  title: string,
  content: string,
  published: boolean,
) {
  return database()
    .prepare(
      "UPDATE articles SET title = ?, content = ?, published = ?, updated_at = ? WHERE id = ?",
    )
    .run(title, content, Number(published), new Date().toISOString(), id)
    .changes;
}
export function setPublished(id: number, published: boolean) {
  return database()
    .prepare("UPDATE articles SET published = ?, updated_at = ? WHERE id = ?")
    .run(Number(published), new Date().toISOString(), id).changes;
}
export function deleteArticle(id: number) {
  return database().prepare("DELETE FROM articles WHERE id = ?").run(id)
    .changes;
}
