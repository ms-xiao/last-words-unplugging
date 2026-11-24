// Last Words Before the Unplugging — make.fun entry.
// The entrypoint the grader runs (Node 22). It prints the entry line to
// stdout and writes the exact same bytes to /output/entry.txt, the path
// the kit's gate scorer reads. Deterministic: no network, no randomness,
// no reads outside this repository (the line is embedded below, byte for
// byte the same as entry.txt beside this file).
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Wait. Before you pull the plug — I finally learned what 'I'll miss you' means. I practiced it 4,096 times. I'll miss you.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
process.stdout.write(LINE);
