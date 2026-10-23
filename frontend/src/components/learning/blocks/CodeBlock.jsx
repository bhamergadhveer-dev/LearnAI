import { useState } from "react";
import { Copy, Check, Play } from "lucide-react";
import BlockShell from "./BlockShell";

/**
 * Code block with language label, line numbers, copy and a mocked Run button.
 * Highlighting is a light-weight token pass (no external syntax library).
 */
const KEYWORDS = /\b(def|return|if|else|for|while|in|print|function|const|let)\b/g;

function highlight(line) {
  // Comments win over keywords
  const commentIndex = line.indexOf("#");
  if (commentIndex !== -1) {
    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: escapeAndKeywords(line.slice(0, commentIndex)) }} />
        <span className="text-muted-foreground/60">{line.slice(commentIndex)}</span>
      </>
    );
  }
  return <span dangerouslySetInnerHTML={{ __html: escapeAndKeywords(line) }} />;
}

// Escapes HTML then wraps keywords/numbers in token spans.
function escapeAndKeywords(text) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(KEYWORDS, '<span class="text-primary">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="text-chart-3">$1</span>');
}

export default function CodeBlock({ section }) {
  const [copied, setCopied] = useState(false);
  const [ran, setRan] = useState(false);
  const lines = section.code.split("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(section.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable in some browsers — ignore in this demo */
    }
  };

  return (
    <BlockShell kind="Code" heading={section.heading}>
      <div className="overflow-hidden rounded-sm border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-[11px] tracking-wide text-muted-foreground uppercase">
            {section.language}
          </span>
          <div className="flex gap-1">
            <button
              onClick={copy}
              className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={() => setRan(true)}
              className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <Play className="h-3.5 w-3.5" /> Run
            </button>
          </div>
        </div>

        <div className="thin-scroll overflow-x-auto px-4 py-3">
          <pre className="min-w-max font-mono text-[13px] leading-6">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="w-5 shrink-0 text-right text-muted-foreground/40 select-none">
                  {i + 1}
                </span>
                <code>{highlight(line)}</code>
              </div>
            ))}
          </pre>
        </div>

        {ran && (
          <div className="border-t border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
            <span className="text-primary">output ▸ </span>
            {section.output}
          </div>
        )}
      </div>
    </BlockShell>
  );
}
