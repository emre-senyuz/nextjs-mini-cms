// Low-level connection also used by the standalone seed script.
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

const globalDb = globalThis as typeof globalThis & {
  cmsDb?: Database.Database;
};
export function database() {
  if (!globalDb.cmsDb) {
    const directory = path.join(process.cwd(), "data");
    mkdirSync(directory, { recursive: true });
    const db = new Database(path.join(directory, "cms.db"));
    db.pragma("journal_mode = WAL");
    db.pragma("busy_timeout = 5000");
    db.exec(`CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      published INTEGER NOT NULL DEFAULT 0 CHECK (published IN (0,1)),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`);
    globalDb.cmsDb = db;
  }
  return globalDb.cmsDb;
}
