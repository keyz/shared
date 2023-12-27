#!/usr/bin/env node

import { spawnSync } from "child_process";
import OpenAI from "openai";

let openai: OpenAI;

async function main() {
  // TODO: asyncify and handle errors
  const { stdout } = spawnSync("op", ["read", "op://Personal/OpenAI/klm"], {
    encoding: "utf-8",
  });
  const OPENAI_API_KEY = stdout.trim();

  openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "Say this is a test" }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
