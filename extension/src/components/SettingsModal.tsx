import { useEffect } from "react";
import { LogOut, X } from "lucide-react";
import { mockUser } from "../lib/user";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="anim-fade-in fixed inset-0 z-50 grid place-items-center bg-[#101840]/50 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        onClick={(e) => e.stopPropagation()}
        className="anim-pop-in w-full max-w-[340px] rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_24px_70px_rgba(16,24,64,0.3)]"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-slate-900">Settings</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center text-center">
          <span
            className="grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-[16px] font-bold text-white"
            aria-hidden
          >
            {mockUser.initials}
          </span>
          <p className="mt-2.5 flex items-center gap-2 text-[14px] font-bold text-slate-900">
            {mockUser.name}
            <span className="rounded-md bg-slate-100 px-1.5 py-[2px] text-[10px] font-bold uppercase tracking-wide text-slate-500">
              {mockUser.plan}
            </span>
          </p>
          <p className="mt-1 text-[12.5px] text-slate-500">{mockUser.email}</p>
        </div>

        <hr className="my-4 border-slate-100" />

        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 py-2.5 text-[13.5px] font-semibold text-rose-600 transition hover:bg-rose-100 active:scale-[0.99]"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sign Out
        </button>
      </div>
    </div>
  );
}
