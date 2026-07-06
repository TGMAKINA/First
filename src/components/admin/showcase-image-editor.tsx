"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import {
  recordShowcaseImage,
  deleteShowcaseImage,
} from "@/app/admin/(dashboard)/tg1300x/actions";
import { ConfirmDialog } from "./confirm-dialog";

export function ShowcaseImageEditor({
  slug,
  imageUrl,
}: {
  slug: string;
  imageUrl: string | null;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const blob = await upload(`showcases/${slug}/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });
      await recordShowcaseImage(blob.url, blob.pathname);
      toast.success("Görsel güncellendi.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Yükleme başarısız oldu.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteShowcaseImage();
      toast.success("Görsel silindi.");
      router.refresh();
    });
  }

  return (
    <div>
      {imageUrl && (
        <div className="group relative mb-4 aspect-square w-full max-w-xs overflow-hidden rounded-xl border-2 border-zinc-200">
          <Image src={imageUrl} alt="" fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <ConfirmDialog
              message="Bu görseli silmek istediğinize emin misiniz?"
              onConfirm={handleDelete}
            >
              {(open) => (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={open}
                  className="rounded bg-white px-3 py-1.5 text-xs font-medium text-red-600"
                >
                  Sil
                </button>
              )}
            </ConfirmDialog>
          </div>
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex max-w-xs cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          dragActive ? "border-brand-600 bg-zinc-50" : "border-zinc-300 hover:border-zinc-400"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-sm font-medium text-zinc-600">
          {isUploading
            ? "Yükleniyor..."
            : imageUrl
              ? "Görseli değiştir"
              : "Görsel yüklemek için tıklayın veya sürükleyin"}
        </p>
        <p className="mt-1 text-xs text-zinc-400">JPG, PNG, WEBP — maks. 8MB</p>
      </div>
    </div>
  );
}
