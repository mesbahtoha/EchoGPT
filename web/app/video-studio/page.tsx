"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeading from "@/components/PageHeading";
import StudioGenerationPanel from "@/components/StudioPanel";
import { useToast } from "@/components/Toast";

export default function VideoStudioPage() {
  const toast = useToast();
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState("16:9");
  const [model, setModel] = useState("Veo 3.1 fast");

  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-10 sm:px-8">
          <PageHeading title="Video Studio" subtitle="Just type what you imagine, and the video makes itself." />

          <div className="mt-8">
            <StudioGenerationPanel
              prompt={prompt}
              onPromptChange={setPrompt}
              promptPlaceholder="Describe your video..."
              aspects={["16:9", "9:16", "1:1"]}
              aspect={aspect}
              onAspectChange={setAspect}
              models={["Veo 3.1 fast"]}
              model={model}
              onModelChange={setModel}
              paidNote="Video generation is a paid feature — upgrade to start creating videos."
              onGenerate={() => toast("Demo: video generation runs on the live site")}
              onAdd={() => document.getElementById("studio-prompt")?.focus()}
            />
          </div>

          <p className="mt-3 text-center text-[12px] font-normal text-slate-400 dark:text-slate-500">
            Each video uses one message from your plan and takes a few minutes to render.
          </p>

          <p className="mt-8 text-[14px] font-semibold text-ink-900 dark:text-slate-100">Your creations</p>
          <p className="mt-6 text-center text-[14px] font-normal text-slate-400 dark:text-slate-500">
            Nothing here yet — describe a video above to get started.
          </p>
        </div>
      </main>
    </AppShell>
  );
}
