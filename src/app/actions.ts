"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createArticle,
  updateArticle,
  setPublished,
  deleteArticle,
} from "@/lib/mutations";
import type { ActionState } from "@/lib/types";

const idSchema = z.coerce
  .number()
  .int()
  .positive()
  .max(Number.MAX_SAFE_INTEGER);
const articleSchema = z.object({
  title: z.string().trim().min(1, "Enter a title.").max(160),
  content: z.string().trim().min(1, "Write some content.").max(50000),
  published: z.enum(["0", "1"]),
});
function refresh() {
  revalidatePath("/admin", "layout");
  revalidatePath("/blog", "layout");
}
export async function saveArticle(
  _previous: ActionState,
  form: FormData,
): Promise<ActionState> {
  if (!(form instanceof FormData)) return { error: "Invalid form submission." };
  const parsed = articleSchema.safeParse(
    Object.fromEntries(
      ["title", "content", "published"].map((key) => [key, form.get(key)]),
    ),
  );
  if (!parsed.success)
    return {
      error: "Please review the highlighted fields.",
      fields: parsed.error.flatten().fieldErrors,
    };
  const rawId = form.get("id");
  const id = rawId === null ? null : idSchema.safeParse(rawId);
  if (id && !id.success) return { error: "Invalid article ID." };
  try {
    const { title, content, published } = parsed.data;
    if (id?.success) {
      if (!updateArticle(id.data, title, content, published === "1"))
        return { error: "This article no longer exists." };
    } else createArticle(title, content, published === "1");
  } catch (error) {
    console.error("Save failed", error);
    return { error: "Could not save your article. Please try again." };
  }
  refresh();
  redirect("/admin?notice=saved");
}
export async function changeStatus(
  _previous: ActionState,
  form: FormData,
): Promise<ActionState> {
  if (!(form instanceof FormData)) return { error: "Invalid form submission." };
  const parsed = z
    .object({ id: idSchema, published: z.enum(["0", "1"]) })
    .safeParse({ id: form.get("id"), published: form.get("published") });
  if (!parsed.success) return { error: "Invalid status request." };
  try {
    if (!setPublished(parsed.data.id, parsed.data.published === "1"))
      return { error: "Article not found." };
  } catch (error) {
    console.error(error);
    return { error: "Status could not be saved." };
  }
  refresh();
  return {};
}
export async function removeArticle(
  _previous: ActionState,
  form: FormData,
): Promise<ActionState> {
  if (!(form instanceof FormData)) return { error: "Invalid form submission." };
  const parsed = z
    .object({ id: idSchema, confirmation: z.literal("delete") })
    .safeParse({ id: form.get("id"), confirmation: form.get("confirmation") });
  if (!parsed.success) return { error: "Confirm deletion before continuing." };
  try {
    if (!deleteArticle(parsed.data.id))
      return { error: "Article no longer exists." };
  } catch (error) {
    console.error(error);
    return { error: "Article could not be deleted." };
  }
  refresh();
  redirect("/admin?notice=deleted");
}
