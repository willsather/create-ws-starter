"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyInstallCommand() {
  const [copied, setCopied] = useState(false);
  const command = "pnpm ws-starter";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="flex items-center justify-between rounded-lg bg-gray-900 p-4 font-mono text-white">
        <span className="mr-4 text-lg text-white">{"▲"}</span>
        <span className="mr-4 text-lg">{command}</span>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-md bg-gray-600 text-white hover:bg-gray-700 hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={copyToClipboard}
          aria-label="Copy to clipboard"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
