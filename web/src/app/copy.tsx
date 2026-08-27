"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const installCommand = "pnpm create ws-starter@latest";
const agentPrompt = `Create a new project with pnpm create ws-starter@latest. Ask me whether I want a Next.js app or a Turborepo and what to name it, then run the CLI non-interactively with explicit flags. After scaffolding, inspect the generated README and package.json before making changes.`;

type CopyTarget = "command" | "prompt";

export function CopyActions() {
  const [copied, setCopied] = useState<CopyTarget | null>(null);

  const copyToClipboard = async (target: CopyTarget, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(target);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="mx-auto inline-flex max-w-full items-stretch overflow-hidden rounded-full border border-neutral-800 bg-neutral-950 font-mono text-sm">
      <button
        type="button"
        onClick={() => copyToClipboard("command", installCommand)}
        aria-label="Copy install command to clipboard"
        className="group flex min-w-0 items-center gap-3 px-5 py-3.5 text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
      >
        <span className="truncate">{installCommand}</span>
        {copied === "command" ? (
          <Check className="size-4 shrink-0" />
        ) : (
          <Copy className="size-4 shrink-0 text-neutral-600 group-hover:text-white" />
        )}
      </button>
      <button
        type="button"
        onClick={() => copyToClipboard("prompt", agentPrompt)}
        aria-label="Copy coding agent prompt to clipboard"
        className="group flex shrink-0 items-center gap-2 border-neutral-800 border-l px-4 py-3.5 text-neutral-500 transition-colors hover:bg-neutral-900 hover:text-white"
      >
        <span className="hidden sm:inline">copy prompt</span>
        {copied === "prompt" ? (
          <Check className="size-4" />
        ) : (
          <Copy className="size-4 text-neutral-600 group-hover:text-white" />
        )}
      </button>
    </div>
  );
}
