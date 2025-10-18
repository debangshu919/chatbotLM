import * as cli from "@clack/prompts";
import pc from "picocolors";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

async function selectModel() {
  return (await cli.select({
    message: "Choose a LLM model",
    options: [
      { value: "openai/gpt-oss-20b", label: "gpt-oss-20b" },
      { value: "openai/gpt-oss-120b", label: "gpt-oss-120b" },
      { value: "deepseek-ai/DeepSeek-V3", label: "DeepSeek-V3" },
      { value: "deepseek-ai/DeepSeek-R1-0528", label: "DeepSeek-R1" },
      { value: "google/gemma-2-9b-it-fast", label: "gemma-2-9b-it-fast" },
      { value: "google/gemma-2-2b-it", label: "gemma-2-2b-it" },
      {
        value: "meta-llama/Llama-3.3-70B-Instruct",
        label: "Llama-3.3-70B-Instruct",
      },
      {
        value: "meta-llama/Meta-Llama-3.1-8B-Instruct",
        label: "Llama-3.1-8B-Instruct",
      },
      { value: "mistralai/Devstral-Small-2505", label: "Devstral-Small-2505" },
      {
        value: "Qwen/Qwen3-Coder-30B-A3B-Instruct",
        label: "Qwen3-Coder-30B-A3B-Instruct",
      },
      { value: "Qwen/Qwen3-14B", label: "Qwen3-14B" },
      { value: "zai-org/GLM-4.5-Air", label: "GLM-4.5-Air" },
    ],
  })) as string;
}

async function main() {
  cli.intro(pc.bgCyan(pc.bold(pc.black(`      Welcome to ChatbotLM      `))));

  const client = new OpenAI({
    baseURL: "https://api.studio.nebius.com/v1/",
    apiKey: process.env.NEBIUS_API_KEY,
  });

  const SYSTEM_PROMPT = `You are a helpful assistant. 
    Important formatting rules:
    - Respond in plain text only
    - Do not use markdown syntax (no *, **, \`, #, etc.)
    - Do not use code blocks or inline code formatting
    - Do not use headers or bullet points with special characters
    - Use simple line breaks and plain text for lists if needed
    - Write naturally as if in a plain text conversation`;

  let messages: ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  let model = await selectModel();

  let prompt = "";
  let inputTokens = 0;
  let outputTokens = 0;
  let totalTokens = 0;

  while (true) {
    prompt = (await cli.text({
      message: "Enter your prompt",
    })) as string;

    if (prompt === "/exit") {
      break;
    } else if (prompt === "/clear") {
      messages = [];
      cli.log.info(pc.cyan("Memory cleared"));
      continue;
    } else if (prompt === "/switch") {
      model = await selectModel();
      cli.log.info(pc.cyan("Model switched"));
      continue;
    } else if (prompt === "/help") {
      cli.log.info(pc.green(pc.bold("Available commands")));
      cli.log.message(
        `${pc.cyan("/clear")} - Clear memory\n${pc.cyan(
          "/switch"
        )} - Switch model\n${pc.cyan("/exit")} - Exit chat\n${pc.cyan(
          "/help"
        )} - Show help\n${pc.cyan("/stats")} - Show stats`
      );
      continue;
    } else if (prompt === "/stats") {
      cli.log.info(pc.green(pc.bold("Stats")));
      cli.log.message(
        `${pc.cyan("Input tokens")}: ${inputTokens}\n${pc.cyan(
          "Output tokens"
        )}: ${outputTokens}\n${pc.cyan("Total tokens")}: ${totalTokens}`
      );
      continue;
    }

    messages.push({
      role: "user",
      content: prompt,
    });

    const stream = await client.chat.completions.create({
      model,
      messages,
      stream: true,
      stream_options: { include_usage: true },
    });

    let response = "";
    async function* responseGenerator() {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          response += content;
          yield content;
        }

        if (chunk.usage) {
          inputTokens += chunk.usage.prompt_tokens;
          outputTokens += chunk.usage.completion_tokens;
          totalTokens += chunk.usage.total_tokens;
        }
      }
    }

    await cli.stream.success(responseGenerator());

    messages.push({
      role: "assistant",
      content: response,
    });
  }

  cli.outro(`Bye, have a nice day!`);
}
main();
