import { useState } from "react";

interface Connector {
  id: string;
  name: string;
  url: string;
}

export default function ConnectorsPanel() {
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [auth, setAuth] = useState("");
  const [error, setError] = useState<string | null>(null);

  function openForm() {
    setError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setError(null);
  }

  function handleContinue() {
    if (!name.trim()) {
      setError("Please enter a connector name.");
      return;
    }
    if (!url.trim()) {
      setError("Please enter the server URL.");
      return;
    }
    if (!url.trim().startsWith("https://")) {
      setError("The server URL must begin with https://");
      return;
    }
    setConnectors((prev) => [...prev, { id: `c-${Date.now()}`, name: name.trim(), url: url.trim() }]);
    setName("");
    setUrl("");
    setAuth("");
    setError(null);
    setShowForm(false);
  }

  const inputClass =
    "w-full rounded-[10px] border border-slate-200 bg-white px-2.5 py-2 text-[12.5px] font-normal text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

  return (
    <section aria-label="Connectors" className="min-w-0">
      <h2 className="text-[13px] font-bold text-slate-900">Connectors</h2>
      <p className="mt-0.5 text-[12px] font-normal leading-relaxed text-slate-500">
        Connect an MCP server and its tools become available while you chat.
      </p>

      <div className="mt-3 flex min-w-0 items-center gap-2">
        <span className="shrink-0 text-[12px] font-medium text-slate-500">
          {connectors.length} connected
        </span>
        <button
          type="button"
          onClick={openForm}
          className="min-w-0 flex-1 rounded-[10px] bg-brand-500 py-2 text-[12.5px] font-semibold text-white transition hover:bg-brand-600 active:scale-[0.99]"
        >
          Add connector
        </button>
      </div>

      {showForm && (
        <div className="anim-expand-in mt-2 rounded-[10px] border border-slate-200 bg-white p-3 shadow-card">
          <p className="text-[13px] font-semibold text-slate-900">Add custom connector</p>
          <div className="mt-2.5 space-y-2.5">
            <div>
              <label htmlFor="mcp-name" className="sr-only">
                Connector name
              </label>
              <input
                id="mcp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name — shown in the connectors list"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="mcp-url" className="sr-only">
                Server URL
              </label>
              <input
                id="mcp-url"
                type="url"
                inputMode="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://mcp.example.com/mcp"
                className={inputClass}
              />
              <p className="mt-1 text-[11px] font-normal leading-relaxed text-slate-400">
                The HTTPS address where the server accepts MCP requests.
              </p>
            </div>
            <div>
              <label htmlFor="mcp-auth" className="sr-only">
                Authorization header
              </label>
              <input
                id="mcp-auth"
                type="text"
                value={auth}
                onChange={(e) => setAuth(e.target.value)}
                placeholder="Authorization header (optional), e.g. Bearer..."
                className={inputClass}
              />
              <p className="mt-1 text-[11px] font-normal leading-relaxed text-slate-400">
                Only connect servers you trust — their tools can act on your behalf.
              </p>
            </div>
          </div>
          {error && (
            <p role="alert" className="anim-fade-in mt-2 text-[12px] font-medium text-rose-600">
              {error}
            </p>
          )}
          <div className="mt-3 flex min-w-0 items-stretch gap-2">
            <button
              type="button"
              onClick={closeForm}
              className="shrink-0 rounded-[10px] border border-slate-200 px-4 py-2 text-[12.5px] font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="min-w-0 flex-1 rounded-[10px] bg-brand-500 py-2 text-[12.5px] font-semibold text-white transition hover:bg-brand-600 active:scale-[0.99]"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {connectors.length === 0 ? (
        <p className="mt-2 rounded-[10px] bg-slate-100/70 px-3 py-6 text-center text-[12px] font-normal text-slate-400">
          No connectors yet. Add your first MCP server!
        </p>
      ) : (
        <ul className="mt-2 space-y-2">
          {connectors.map((c) => (
            <li
              key={c.id}
              className="flex min-w-0 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-2.5 py-2"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-semibold text-slate-900">{c.name}</span>
                <span className="block truncate text-[11px] font-normal text-slate-400">{c.url}</span>
              </span>
              <span className="shrink-0 rounded-md bg-emerald-50 px-1.5 py-[3px] text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                Connected
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
