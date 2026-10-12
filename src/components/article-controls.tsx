"use client";
import { useActionState, useRef } from "react";
import { Trash2, Globe, FilePenLine } from "lucide-react";
import { changeStatus, removeArticle } from "@/app/actions";

export function ArticleControls({
  id,
  title,
  published,
}: {
  id: number;
  title: string;
  published: boolean;
}) {
  const [status, statusAction, statusPending] = useActionState(
    changeStatus,
    {},
  );
  const [deletion, deleteAction, deletePending] = useActionState(
    removeArticle,
    {},
  );
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <div className="controls">
      <form action={statusAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="published" value={published ? "0" : "1"} />
        <button
          className="icon-button"
          disabled={statusPending}
          title={published ? "Move to draft" : "Publish article"}
          aria-label={`${published ? "Unpublish" : "Publish"} ${title}`}
        >
          {published ? <FilePenLine size={17} /> : <Globe size={17} />}
        </button>
      </form>
      <button
        className="icon-button danger"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Delete ${title}`}
        title="Delete article"
      >
        <Trash2 size={17} />
      </button>
      {status.error && (
        <p role="alert" className="field-error">
          {status.error}
        </p>
      )}
      <dialog
        ref={dialog}
        aria-labelledby={`delete-title-${id}`}
        onCancel={(event) => {
          if (deletePending) event.preventDefault();
        }}
      >
        <div className="dialog-content">
          <span className="delete-icon">
            <Trash2 size={24} />
          </span>
          <h2 id={`delete-title-${id}`}>Delete this article?</h2>
          <p>“{title}” will be permanently removed. This cannot be undone.</p>
          <form action={deleteAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="confirmation" value="delete" />
            {deletion.error && (
              <p role="alert" className="field-error">
                {deletion.error}
              </p>
            )}
            <div className="dialog-actions">
              <button
                type="button"
                className="button"
                disabled={deletePending}
                onClick={() => dialog.current?.close()}
              >
                Keep article
              </button>
              <button className="button destructive" disabled={deletePending}>
                {deletePending ? "Deleting…" : "Delete article"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
