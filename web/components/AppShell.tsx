"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SignInModal from "./SignInModal";
import { navIdFromPath, routeMap } from "@/lib/routes";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const activeNav = navIdFromPath(pathname);

  function handleNavigate(id: string) {
    setSidebarOpen(false);
    router.push(routeMap[id] ?? "/");
  }

  function handleNewChat() {
    setSidebarOpen(false);
    router.push("/");
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#100d1a]">
      <Sidebar
        activeNav={activeNav}
        onNavigate={handleNavigate}
        onNewChat={handleNewChat}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header onMenu={() => setSidebarOpen(true)} onSignIn={() => setSignInOpen(true)} />
        {children}
      </div>
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </div>
  );
}
