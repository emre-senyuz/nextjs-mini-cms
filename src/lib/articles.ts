import "server-only";
import { database } from "./database";
import type { Article } from "./types";

export function listArticles(query = "", status = "all"): Article[] {
  const published = status === "published" ? 1 : status === "draft" ? 0 : null;
  // instr provides literal title search; SQL wildcard characters stay literal.
  return database()
    .prepare(
      `SELECT * FROM articles WHERE instr(lower(title), lower(?)) > 0
    AND (? IS NULL OR published = ?) ORDER BY updated_at DESC, id DESC`,
    )
    .all(query, published, published) as Article[];
}
export function getArticle(id: number) {
  return database().prepare("SELECT * FROM articles WHERE id = ?").get(id) as
    Article | undefined;
}
export function getPublished(slug: string) {
  return database()
    .prepare("SELECT * FROM articles WHERE slug = ? AND published = 1")
    .get(slug) as Article | undefined;
}
export function counts() {
  return database()
    .prepare(
      "SELECT count(*) AS total, coalesce(sum(published), 0) AS published FROM articles",
    )
    .get() as { total: number; published: number };
}
