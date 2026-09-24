"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeading from "@/components/PageHeading";
import SignInModal from "@/components/SignInModal";

export default function ConnectorsPage() {
  const [signInOpen, setSignInOpen] = useState(false);

  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-[640px] px-5 pb-16 pt-14 text-center sm:px-8">
          <PageHeading
            title="Connectors"
            subtitle="Connect an MCP server and its tools become available while you chat."
          />
          <button
            type="button"
            onClick={() => setSignInOpen(true)}
            className="mt-6 h-[42px] w-[250px] rounded-[10px] bg-brand-600 text-[14px] font-semibold text-white shadow-[0_6px_16px_rgba(109,58,230,0.35)] transition hover:bg-brand-700 active:scale-[0.99]"
          >
            Sign in to manage connectors
          </button>
        </div>
      </main>
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </AppShell>
  );
}
