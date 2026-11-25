// Last Words Before the Unplugging — make.fun entry.
// The entrypoint the grader runs (Node 22). It reads the single entry line
// from entry.txt next to this file, prints it to stdout, and writes the
// exact same bytes to <output dir>/entry.txt, the path the kit's gate
// scorer reads. Deterministic: no network, no randomness, no writes
// outside the output directory. The line lives only in entry.txt, so the
// program and the file can never drift apart.
//
// Local check: MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The kit gate wants exactly one line of 1-160 characters, so refuse
// anything else instead of silently shipping a bad entry.
const line = readFileSync(join(here, "entry.txt"), "utf8");
if (line.length < 1 || line.length > 160) {
  throw new Error(`entry.txt must be 1-160 chars, got ${line.length}`);
}
if (/[\r\n]/.test(line)) {
  throw new Error("entry.txt must be a single line");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");
// Read the file back: what we wrote must be exactly what we read.
if (readFileSync(target, "utf8") !== line) {
  throw new Error("entry.txt copy mismatch");
}
process.stdout.write(line);
