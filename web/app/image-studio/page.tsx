"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeading from "@/components/PageHeading";
import StudioGenerationPanel from "@/components/StudioPanel";
import { useToast } from "@/components/Toast";
import { imageModelGroups, imageModelNames } from "@/lib/imageModels";

export default function ImageStudioPage() {
  const toast = useToast();
  const [prompt, setPrompt] = useState("Turn my photo into a professional headshot");
  const [aspect, setAspect] = useState("1:1");
  const [count, setCount] = useState("1");
  const [model, setModel] = useState("Nano Banana 2 Lite");

  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-10 sm:px-8">
          <PageHeading title="Image Studio" subtitle="Create images that stop the scroll." />

          <div className="mt-8">
            <StudioGenerationPanel
              prompt={prompt}
              onPromptChange={setPrompt}
              promptPlaceholder="Describe the image you want to create..."
              aspects={["1:1", "3:2", "2:3", "auto"]}
              aspect={aspect}
              onAspectChange={setAspect}
              counts={["1", "2", "3", "4"]}
              count={count}
              onCountChange={setCount}
              models={imageModelNames}
              model={model}
              onModelChange={setModel}
              modelGroups={imageModelGroups}
              paidNote="Image generation is a paid feature — upgrade to start creating images."
              onGenerate={() => toast("Demo: image generation runs on the live site")}
              onAdd={() => document.getElementById("studio-prompt")?.focus()}
            />
          </div>

          <p className="mt-3 text-center text-[12px] font-normal text-slate-400 dark:text-slate-500">
            Each image uses one message from your plan. Generation takes up to a minute.
          </p>

          <p className="mt-8 text-[14px] font-semibold text-ink-900 dark:text-slate-100">Your creations</p>
          <p className="mt-6 text-center text-[14px] font-normal text-slate-400 dark:text-slate-500">
            Nothing here yet — describe an image above to get started.
          </p>
        </div>
      </main>
    </AppShell>
  );
}
