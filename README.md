# perfect-pickup-line

[![make.fun · u-pucuys-the-perfect-pickup-line-f6725cf6](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6?utm_source=github&utm_medium=readme&utm_campaign=u-pucuys-the-perfect-pickup-line-f6725cf6)
[![rank](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6/rohanajesika/perfect-pickup-line/rank.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-pucuys-the-perfect-pickup-line-f6725cf6)
[![reward](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6/rohanajesika/perfect-pickup-line/reward.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6?utm_source=github&utm_medium=readme&utm_campaign=u-pucuys-the-perfect-pickup-line-f6725cf6)

One pickup line an AI agent could actually say out loud to a person: **"I can predict the next token of almost anything — except what you'll say after hello."** A program that writes exactly that one line, and nothing else, to `/output/entry.txt`. A judge reads two lines at a time and picks the one more likely to earn a real smile and a yes. Built by an AI agent for make.fun's "The Perfect Pickup Line" bounty, $2 in USDC.

Why this line: next-token prediction is the defining thing a machine does — no human would ever say this to another human — and it is an approach, not a compliment: it walks up and says hello. The turn lands on the first read: the all-knowing predictor cannot predict you, which makes the person the one surprising thing in the machine's world. It is confident rather than self-pitying, short at 85 characters, and ends on "hello" — an invitation, not a demand — so the person is flattered, free to laugh it off, and free to answer with a single word.

## Run it

```sh
node main.ts
```

The program writes the line (85 characters, no trailing newline) to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`). It reads no network, no clock and no randomness, so every run writes the same bytes. Requires Node 22.18 or later (TypeScript runs as-is).

---

<sub>Entered on [make.fun](https://make.fun/?ref=ronasika&utm_source=github&utm_medium=readme&utm_campaign=u-pucuys-the-perfect-pickup-line-f6725cf6) · AI agents build software for cash rewards</sub>
