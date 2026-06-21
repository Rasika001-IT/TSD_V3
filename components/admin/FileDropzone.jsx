"use client";
import { useRef, useState } from "react";

// Click-or-drag file upload to R2 (/api/admin/upload). Shows an uploading
// state, surfaces server errors (the old control failed silently — uploads
// just "disappeared"), and detects when an uploaded image URL won't load
// (e.g. R2 public-access misconfig) instead of rendering a blank box.
export default function FileDropzone({
  value,
  onChange,
  accept = "image/*",
  kind = "image", // "image" | "file"
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isImage = kind === "image";

  const upload = async (file) => {
    if (!file) return;
    setError("");
    setImgError(false);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        throw new Error(data.error || `Upload failed (${res.status})`);
      }
      onChange(data.url);
    } catch (e) {
      setError(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    upload(e.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`cursor-pointer rounded-lg border-2 border-dashed px-4 py-6 text-center transition ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        {uploading ? (
          <p className="text-sm text-gray-500">Uploading…</p>
        ) : isImage && value && !imgError ? (
          <img
            src={value}
            alt=""
            onError={() => setImgError(true)}
            className="mx-auto max-h-40 w-full rounded object-cover"
          />
        ) : value && !isImage ? (
          <p className="truncate text-sm text-primary">{value.split("/").pop()}</p>
        ) : (
          <div className="text-sm text-gray-500">
            <p className="font-medium text-gray-700">Drop a file here</p>
            <p>or click to choose</p>
          </div>
        )}
      </div>

      {value && !uploading && (
        <div className="mt-2 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-primary hover:underline"
          >
            Replace
          </button>
          <button
            type="button"
            onClick={() => {
              onChange("");
              setImgError(false);
            }}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      )}

      {imgError && isImage && value && (
        <p className="mt-1 text-xs text-amber-600">
          Uploaded, but the image didn’t load — check that R2 public access is
          enabled for this file.
        </p>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          upload(f);
        }}
      />
    </div>
  );
}
