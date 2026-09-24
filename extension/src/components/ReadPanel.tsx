import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "../lib/cn";

interface Props {
  onUse: (text: string) => void;
}

export default function ReadPanel({ onUse }: Props) {
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleReadLink() {
    const link = url.trim();
    onUse(link ? `Read and summarize this page: ${link}` : "Read and summarize this page: ");
  }

  function handleFiles(files: FileList | null) {
    if (files && files.length > 0) {
      setFileName(files[0].name);
      onUse(`Read this file: ${files[0].name}`);
    }
  }

  return (
    <section aria-label="Read tool" className="min-w-0">
      <h2 className="mb-2 text-[15px] font-bold text-slate-900">Read</h2>
      <div>
        <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">Read a link</p>
        <div className="flex min-w-0 items-center gap-2">
          <label htmlFor="read-url" className="sr-only">
            Enter a web page link
          </label>
          <input
            id="read-url"
            type="url"
            inputMode="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleReadLink();
            }}
            placeholder="Enter a web page link"
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-[12.5px] font-normal text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="button"
            onClick={handleReadLink}
            className="shrink-0 rounded-xl bg-brand-500 px-4 py-2 text-[12.5px] font-semibold text-white transition hover:bg-brand-600 active:scale-[0.98]"
          >
            Read
          </button>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">Read a file</p>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          aria-label="Click or drag files here to upload"
          className={cn(
            "flex h-[100px] w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed bg-white px-3 text-center transition",
            dragging ? "border-brand-400 bg-brand-50" : "border-slate-300 hover:border-brand-300 hover:bg-slate-50"
          )}
        >
          <Upload className="h-5 w-5 text-slate-400" strokeWidth={2} aria-hidden />
          <span className="text-[12px] font-medium text-slate-500">Click or drag files here to upload</span>
          {fileName && (
            <span className="max-w-full truncate text-[11px] font-semibold text-brand-600">{fileName}</span>
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          className="sr-only"
          tabIndex={-1}
          aria-hidden
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
    </section>
  );
}
