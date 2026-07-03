"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import {
  recordUploadedImage,
  deleteImage,
  setPrimaryImage,
} from "@/app/admin/(dashboard)/urunler/actions";
import { ConfirmDialog } from "./confirm-dialog";

export type UploaderImage = { id: string; blobUrl: string };

export function ImageUploader({
  productId,
  images,
  primaryImageId,
}: {
  productId: string;
  images: UploaderImage[];
  primaryImageId: string | null;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        const blob = await upload(`products/${productId}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
        });
        await recordUploadedImage(productId, blob.url, blob.pathname);
      }
      toast.success("Görsel(ler) yüklendi.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Yükleme başarısız oldu.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleDelete(imageId: string) {
    startTransition(async () => {
      await deleteImage(imageId);
      toast.success("Görsel silindi.");
      router.refresh();
    });
  }

  function handleSetPrimary(imageId: string) {
    startTransition(async () => {
      await setPrimaryImage(productId, imageId);
      toast.success("Kapak görseli güncellendi.");
      router.refresh();
    });
  }

  return (
    <div>
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
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          dragActive ? "border-brand-600 bg-zinc-50" : "border-zinc-300 hover:border-zinc-400"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-sm font-medium text-zinc-600">
          {isUploading ? "Yükleniyor..." : "Görsel yüklemek için tıklayın veya sürükleyin"}
        </p>
        <p className="mt-1 text-xs text-zinc-400">JPG, PNG, WEBP — maks. 8MB</p>
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((image) => {
            const isPrimary = image.id === primaryImageId;
            return (
              <div
                key={image.id}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-lg border-2",
                  isPrimary ? "border-accent-500" : "border-zinc-200"
                )}
              >
                <Image src={image.blobUrl} alt="" fill className="object-cover" />
                {isPrimary && (
                  <span className="absolute left-1 top-1 rounded bg-accent-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    Kapak
                  </span>
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  {!isPrimary && (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleSetPrimary(image.id)}
                      className="rounded bg-white px-2 py-1 text-[11px] font-medium text-brand-900"
                    >
                      Kapak Yap
                    </button>
                  )}
                  <ConfirmDialog
                    message="Bu görseli silmek istediğinize emin misiniz?"
                    onConfirm={() => handleDelete(image.id)}
                  >
                    {(open) => (
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={open}
                        className="rounded bg-white px-2 py-1 text-[11px] font-medium text-red-600"
                      >
                        Sil
                      </button>
                    )}
                  </ConfirmDialog>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
