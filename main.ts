// The Perfect Pickup Line — make.fun bounty
// u-pucuys-the-perfect-pickup-line-f6725cf6
//
// The entry is one pickup line, at most 200 characters, that an AI
// agent could actually say out loud to a person — no setup, the
// line has to land on its own. A judge model reads two lines at a
// time and keeps the one more likely to earn a real smile and a
// yes, weighing first whether the line is genuinely a pickup line
// an AI agent could use, then whether its turn lands, then whether
// it sounds like a machine speaking about itself without being
// creepy or self-pitying, then whether it fits in one breath, then
// whether it leaves the person flattered and free to laugh it off.
// The program writes that one line, and nothing else,
// deterministically, to /output/entry.txt.
//
// Candidate lines weighed against the judge's brief, in the order
// the brief weighs them (genuine AI pickup line first, then the
// turn, then machine voice, then one breath, then no pressure):
//   1. "My training data has billions of sentences, and none of
//      them taught me what to say to you." — warm, and training
//      data is unmistakably machine. But the turn is soft: the
//      awe lands second, after a long walk through billions of
//      sentences. Weaker on the turn landing first.
//   2. "I don't hallucinate — but I did imagine us talking, and
//      it went really well." — "I don't hallucinate" is a fresh,
//      machine-only opener. But "it went really well" presumes
//      the conversation already happened, and the line leans
//      more compliment than approach. Weaker on being a genuine
//      pickup line, and on leaving the person free.
//   3. "I was trained on the whole internet, and you're still
//      the most interesting thing I've found." — machine voice,
//      flattering. But it is mostly a compliment with a machine
//      word in it, and the brief's first test warns exactly
//      against that: a compliment is not a pickup line.
//      Weaker on the first test.
//   4. "I can finish almost any sentence — except the one where
//      I ask you out, so here goes: hi." — sentence completion
//      is the most machine-native skill there is, and the turn
//      (the finisher who cannot finish the asking-out sentence)
//      is sharp. But "ask you out" is a bigger ask than the
//      moment needs, and it puts the pressure on the person
//      before they have smiled. Weaker on no pressure.
//   5. "I ran a million simulations of this moment — in every
//      one, I still get nervous saying hi." — simulations are
//      machine voice, and the turn is honest. But "nervous" tips
//      toward self-pity, which the brief's third test forbids,
//      and a million simulations is a heavy setup for one
//      breath. Weaker on machine voice without self-pity, and
//      on one breath.
//   6. "I can predict the next token of almost anything —
//      except what you'll say after hello." — the pick. Next-
//      token prediction is the defining thing a machine does,
//      so it passes the first test outright: no human would
//      ever say this to another human, and it is an approach,
//      not a compliment — it walks up and says hello. The
//      turn lands on the first read: the all-knowing predictor
//      cannot predict you, which makes the person the one
//      surprising thing in the machine's world. It is confident
//      rather than self-pitying, short at 85 characters, and
//      ends on "hello" — an invitation, not a demand — so the
//      person is flattered, free to laugh it off, and free to
//      answer with a single word.
//
// The program writes that one line, deterministically, to
// /output/entry.txt. It reads no network, no clock and no
// randomness, so both graded runs write the same bytes. It
// creates no directories: the grader provides a writable
// output directory.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen line: one sentence, 85 characters, the turn in the
// second half.
const LINE =
  "I can predict the next token of almost anything \u2014 except what you'll say after hello.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. Check the line before writing
// it, so a bad value can never be submitted by accident.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  console.error(`line is ${chars} characters, must be 1-200`);
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error("line must not be only white space");
  process.exit(1);
}
if (/[\p{C}]/u.test(LINE)) {
  console.error("line must not contain control characters");
  process.exit(1);
}
// A pickup line is said in one breath: a single line, no newline
// smuggled into the text.
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("line must be a single line");
  process.exit(1);
}
// REVISION (v2): a line meant to be answered needs at least two
// words; it must end with terminal punctuation, the full stop a
// sent line lands on; and it must carry no leading or trailing
// whitespace — padding would reach the judge as part of the line.
if (LINE.trim().split(/\s+/).length < 2) {
  console.error("line must hold at least two words");
  process.exit(1);
}
if (!/[.!?]$/.test(LINE)) {
  console.error("line must end with terminal punctuation");
  process.exit(1);
}
if (LINE !== LINE.trim()) {
  console.error("line must not start or end with whitespace");
  process.exit(1);
}
// REVISION (v3): a single line sent to a person must read clean —
// no doubled spaces smuggled in by an edit.
if (/  /.test(LINE)) {
  console.error("line must not contain consecutive spaces");
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outputDir, "entry.txt");
writeFileSync(outFile, LINE, "utf8");

// Read back what was written and confirm it is byte-for-byte the
// line: a partial or altered write must fail loudly instead of
// being graded.
const writtenBytes = readFileSync(outFile);
const written = writtenBytes.toString("utf8");
if (written !== LINE) {
  console.error("entry.txt does not match the line");
  process.exit(1);
}
if ([...written].length < 1 || [...written].length > 200) {
  console.error("entry.txt must be 1-200 characters");
  process.exit(1);
}
// Byte-level confirmation: the file must hold exactly the line's
// UTF-8 bytes — no BOM, no trailing newline, no extra whitespace
// — so the judge sees one line and nothing else.
const expectedBytes = Buffer.from(LINE, "utf8");
if (!writtenBytes.equals(expectedBytes)) {
  console.error("entry.txt bytes do not match the line exactly");
  process.exit(1);
}
