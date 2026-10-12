export type Article = {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: number;
  created_at: string;
  updated_at: string;
};
export type ActionState = {
  error?: string;
  fields?: Record<string, string[] | undefined>;
};
