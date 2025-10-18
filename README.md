<div align="center">
<img width="480" height="270" alt="logo" src="https://github.com/user-attachments/assets/954a9846-1b42-4e70-b6cd-439689760922" />


<h3>A CLI tool to interact with open-source LLMs</h3>
<img alt="Dynamic JSON Badge" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fdebangshu919%2FchatbotLM%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.version&style=for-the-badge&label=version&color=91EAE4&labelColor=black&link=https%3A%2F%2Fgithub.com%2Fdebangshu919%2FchatbotLM">
<a href="https://studio.nebius.com/"><img alt="Static Badge" src="https://img.shields.io/badge/nebius-brightgreen?style=for-the-badge&label=powered%20by&labelColor=black&color=86A8E7"></a>
<a href="https://github.com/debangshu919/chatbotLM/blob/main/LICENSE"><img alt="Static Badge" src="https://img.shields.io/badge/mit-brightgreen?style=for-the-badge&label=license&labelColor=black&color=7F7FD5"></a>

</div>

## Installation

1. Clone the repository

```bash
git clone https://github.com/debangshu919/chatbotLM.git
cd chatbotLM
```

2. Install dependencies

```bash
pnpm install
```

3. Create the `.env` file
```bash
cp .env.example .env
```

4. Add your [Nebius Studio API key](https://studio.nebius.com/) into the `.env` file

5. Run the application

```bash
pnpm run dev
```

## Tech Stack

- TypeScript
- OpenAI SDK
- CLack

## Available models
- **openai/gpt-oss-20b**
- **openai/gpt-oss-120b**
- **deepseek-ai/DeepSeek-V3**
- **deepseek-ai/DeepSeek-R1-0528**
- **google/gemma-2-9b-it-fast**
- **google/gemma-2-2b-it**
- **meta-llama/Llama-3.3-70B-Instruct**
- **meta-llama/Meta-Llama-3.1-8B-Instruct**
- **mistralai/Devstral-Small-2505**
- **Qwen/Qwen3-Coder-30B-A3B-Instruct**
- **Qwen/Qwen3-14B**
- **zai-org/GLM-4.5-Air**

## Supported commands
- `/help` - Shows all available commands
- `/clear` - Clears the memory
- `/switch` - Switch LLM
- `/exit` - Exit the CLI
- `/stats` - Shows a summary of token consumptions.
