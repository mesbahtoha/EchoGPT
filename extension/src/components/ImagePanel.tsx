import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FieldLabel, PillGroup, textareaClass } from "./toolFields";

const aspects = ["1:1", "3:2", "2:3", "auto"];
const counts = ["1", "2", "3", "4"];
const imageModels = ["Nano Banana 2 Lite"];

interface Props {
  onUse: (text: string) => void;
}

export default function ImagePanel({ onUse }: Props) {
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState("1:1");
  const [count, setCount] = useState("1");
  const [model, setModel] = useState(imageModels[0]);

  function handleGenerate() {
    onUse(
      prompt.trim()
        ? `Generate an image (${aspect} aspect ratio, ${count} image${count === "1" ? "" : "s"}): "${prompt.trim()}"`
        : `Generate an image (${aspect} aspect ratio, ${count} image${count === "1" ? "" : "s"}): `
    );
  }

  return (
    <section aria-label="Image Studio" className="min-w-0">
      <h2 className="text-[13px] font-bold text-slate-900">Image Studio</h2>
      <p className="mt-0.5 text-[12px] font-normal text-slate-500">Create images that stop the scroll.</p>

      <div className="mt-3">
        <FieldLabel>Prompt</FieldLabel>
        <label htmlFor="img-prompt" className="sr-only">
          Describe the image you want to create
        </label>
        <textarea
          id="img-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="Describe the image you want to create..."
          className={`${textareaClass} min-h-[72px] resize-y`}
        />
      </div>

      <div className="mt-3 grid min-w-0 grid-cols-2 gap-2">
        <div className="min-w-0">
          <FieldLabel>Aspect ratio</FieldLabel>
          <PillGroup options={aspects} value={aspect} onChange={setAspect} label="Aspect ratio" />
        </div>
        <div className="min-w-0">
          <FieldLabel>Count</FieldLabel>
          <PillGroup options={counts} value={count} onChange={setCount} label="Count" />
        </div>
      </div>

      <div className="mt-3 flex min-w-0 items-stretch gap-2">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="img-model" className="sr-only">
            Image model
          </label>
          <select
            id="img-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full appearance-none rounded-[10px] border border-slate-200 bg-white py-2 pl-2.5 pr-8 text-[12px] font-semibold text-slate-800 focus:border-brand-400 focus:outline-none"
          >
            {imageModels.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          className="min-w-0 flex-1 rounded-[10px] bg-brand-500 py-2 text-[12.5px] font-semibold text-white transition hover:bg-brand-600 active:scale-[0.99]"
        >
          Generate
        </button>
      </div>
      <p className="mt-2 text-[11px] font-normal leading-relaxed text-slate-400">
        Each image uses one message from your plan. Generation takes up to a minute.
      </p>

      <p className="mb-1.5 mt-3 text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">
        Your creations
      </p>
      <p className="rounded-[10px] bg-slate-100/70 px-3 py-6 text-center text-[12px] font-normal text-slate-400">
        No creations yet. Generate your first image!
      </p>
    </section>
  );
}
