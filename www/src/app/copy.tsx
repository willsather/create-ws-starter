"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyInstallCommand() {
  const [copied, setCopied] = useState(false);
  const command = "pnpm create ws-starter";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      aria-label="Copy install command to clipboard"
      className="group flex items-center gap-4 rounded-full bg-neutral-900 px-6 py-4 font-mono text-base transition-colors hover:bg-neutral-800"
    >
      <span className="text-neutral-500">$</span>
      <span className="text-white">{command}</span>
      <span className="text-neutral-400 transition-colors group-hover:text-white">
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </span>
    </button>
  );
}
