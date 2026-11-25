// Monday Morning Punchlines — one-liner entry.
//
// The program holds a single Monday-morning joke, validates it against the
// bounty gate (1-200 characters, one line, no control characters, not only
// whitespace), then writes it to entry.txt inside the output directory the
// grader provides (MAKEFUN_OUTPUT_DIR, defaulting to /output). The entry is
// written with no trailing newline, exactly as the judge will read it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Monday morning: my coffee asked for a raise, my inbox asked for a meeting, and my bed asked for a lawyer.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`Line must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("Line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Line must be a single line");
  }
  // Reject control characters (except none are expected here).
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error(`Line contains a control character: U+${ch.charCodeAt(0).toString(16)}`);
    }
  }
}

function main(): void {
  validate(LINE);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  const outPath = join(outputDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  console.log(`Wrote entry.txt (${LINE.length} characters, ${LINE.split(/\s+/).length} words) to ${outPath}`);
}

main();
