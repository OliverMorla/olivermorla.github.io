/**
 * Incremental parser for an OpenAI-compatible chat completion stream
 * (`data: {...}` lines, ending with `data: [DONE]`). Feed it raw text chunks
 * as they arrive; network chunks can split a line anywhere.
 */
export function createSseParser() {
  let buffer = "";
  let done = false;

  function push(chunk: string): { text: string; done: boolean } {
    buffer += chunk;
    const lines = buffer.split(/\r?\n/);
    // The last piece may be half a line; keep it for the next chunk.
    buffer = lines.pop() ?? "";

    let text = "";
    for (const line of lines) {
      if (done || !line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (data === "[DONE]") {
        done = true;
        continue;
      }
      try {
        const json = JSON.parse(data) as {
          choices?: { delta?: { content?: unknown } }[];
        };
        const content = json.choices?.[0]?.delta?.content;
        if (typeof content === "string") text += content;
      } catch {
        // Not JSON (a comment or keep-alive); skip it.
      }
    }
    return { text, done };
  }

  return { push };
}
