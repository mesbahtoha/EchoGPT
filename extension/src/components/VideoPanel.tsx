import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FieldLabel, PillGroup, textareaClass } from "./toolFields";

const aspects = ["16:9", "9:16", "1:1"];
const videoModels = ["Veo 3.1 fast"];

interface Props {
  onUse: (text: string) => void;
}

export default function VideoPanel({ onUse }: Props) {
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState("16:9");
  const [model, setModel] = useState(videoModels[0]);

  function handleGenerate() {
    onUse(
      prompt.trim()
        ? `Generate a video (${aspect} aspect ratio, ${model}): "${prompt.trim()}"`
        : `Generate a video (${aspect} aspect ratio, ${model}): `
    );
  }

  return (
    <section aria-label="Video Studio" className="min-w-0">
      <h2 className="text-[13px] font-bold text-slate-900">Video Studio</h2>
      <p className="mt-0.5 text-[12px] font-normal text-slate-500">
        Just type what you imagine, and the video makes itself.
      </p>

      <div className="mt-3">
        <FieldLabel>Prompt</FieldLabel>
        <label htmlFor="vid-prompt" className="sr-only">
          Describe your video
        </label>
        <textarea
          id="vid-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="Describe your video..."
          className={`${textareaClass} min-h-[72px] resize-y`}
        />
      </div>

      <div className="mt-3">
        <FieldLabel>Aspect ratio</FieldLabel>
        <PillGroup options={aspects} value={aspect} onChange={setAspect} label="Aspect ratio" />
      </div>

      <div className="mt-3 flex min-w-0 items-stretch gap-2">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="vid-model" className="sr-only">
            Video model
          </label>
          <select
            id="vid-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full appearance-none rounded-[10px] border border-slate-200 bg-white py-2 pl-2.5 pr-8 text-[12px] font-semibold text-slate-800 focus:border-brand-400 focus:outline-none"
          >
            {videoModels.map((m) => (
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
        Each video uses one message from your plan and takes a few minutes to render.
      </p>

      <p className="mb-1.5 mt-3 text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">
        Your creations
      </p>
      <p className="rounded-[10px] bg-slate-100/70 px-3 py-6 text-center text-[12px] font-normal text-slate-400">
        No creations yet. Generate your first video!
      </p>
    </section>
  );
}
