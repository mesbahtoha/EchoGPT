import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { FieldLabel, ModelSelect, SelectShell, textareaClass } from "./toolFields";
import { cn } from "../lib/cn";

const sourceLanguages = [
  "Automatic",
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Bengali",
  "Russian",
  "Turkish",
  "Dutch",
  "Indonesian"
];

const targetLanguages = sourceLanguages.filter((l) => l !== "Automatic");

interface Props {
  onUse: (text: string) => void;
}

export default function TranslatePanel({ onUse }: Props) {
  const [from, setFrom] = useState("Automatic");
  const [to, setTo] = useState("English");
  const [text, setText] = useState("");
  const [modelId, setModelId] = useState("echogpt");

  function swap() {
    if (from === "Automatic") return;
    setFrom(to);
    setTo(from);
  }

  function handleTranslate() {
    onUse(
      text.trim()
        ? `Translate from ${from} to ${to}: "${text.trim()}"`
        : `Translate from ${from} to ${to}: `
    );
  }

  return (
    <section aria-label="Translate tool" className="min-w-0">
      <h2 className="text-[13px] font-bold text-slate-900">Translate</h2>

      <div className="mt-2 flex min-w-0 items-center gap-1.5">
        <div className="min-w-0 flex-1">
          <SelectShell id="tr-from" label="Source language" value={from} onChange={setFrom} options={sourceLanguages} />
        </div>
        <button
          type="button"
          onClick={swap}
          disabled={from === "Automatic"}
          aria-label="Swap languages"
          title="Swap languages"
          className={cn(
            "grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 transition",
            from === "Automatic"
              ? "cursor-not-allowed opacity-40"
              : "hover:border-brand-300 hover:text-brand-600"
          )}
        >
          <ArrowLeftRight className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
        <div className="min-w-0 flex-1">
          <SelectShell id="tr-to" label="Target language" value={to} onChange={setTo} options={targetLanguages} />
        </div>
      </div>

      <div className="mt-3">
        <FieldLabel>Text</FieldLabel>
        <label htmlFor="tr-text" className="sr-only">
          Paste or enter your text to translate
        </label>
        <textarea
          id="tr-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Paste or enter your text to translate"
          className={`${textareaClass} min-h-[96px] resize-y`}
        />
      </div>

      <div className="mt-3 flex min-w-0 items-stretch gap-2">
        <ModelSelect id="tr-model" value={modelId} onChange={setModelId} />
        <button
          type="button"
          onClick={handleTranslate}
          className="min-w-0 flex-1 rounded-[10px] bg-brand-500 py-2 text-[12.5px] font-semibold text-white transition hover:bg-brand-600 active:scale-[0.99]"
        >
          Translate
        </button>
      </div>
    </section>
  );
}
