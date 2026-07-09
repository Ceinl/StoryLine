import type { TimelineData } from "./timeline";

export const curatedTimelineData: TimelineData = {
  tracks: [
    {
      id: "general",
      name: "General AI",
      color: "#E5E5E5",
      description: "Cross-provider AI product and infrastructure news"
    },
    {
      id: "openai",
      name: "OpenAI",
      color: "#10A37F",
      description: "OpenAI model releases, product changes, and API limits"
    },
    {
      id: "anthropic",
      name: "Anthropic",
      color: "#D4A574",
      description: "Claude model releases, access changes, and safety restrictions"
    },
    {
      id: "google",
      name: "Google DeepMind",
      color: "#4285F4",
      description: "Gemini, Imagen, Veo, and Google DeepMind releases"
    },
    {
      id: "xai",
      name: "xAI",
      color: "#B8F35D",
      description: "Grok model releases and xAI API limits"
    },
    {
      id: "open-source",
      name: "Open Source Models",
      color: "#4CAF50",
      description: "Open and open-weight model releases from major labs"
    },
    {
      id: "restrictions",
      name: "Restrictions",
      color: "#FF3B30",
      description: "Usage limits, model retirements, policy limits, and access restrictions"
    }
  ],
  events: [
    {
      id: "chatgpt-2022-11-30",
      date: "2022-11-30",
      title: "ChatGPT Launches",
      description: "OpenAI releases ChatGPT as a conversational research preview, making instruction-following language models broadly visible to consumers.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/chatgpt/" }]
    },
    {
      id: "gpt-4-2023-03-14",
      date: "2023-03-14",
      title: "GPT-4 Launches",
      description: "OpenAI introduces GPT-4, a multimodal model family initially available in ChatGPT Plus and the API waitlist.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/gpt-4-research/" }]
    },
    {
      id: "claude-2-2023-07-11",
      date: "2023-07-11",
      title: "Claude 2 Launches",
      description: "Anthropic releases Claude 2 with stronger coding, math, and reasoning performance and a larger context window.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-2" }]
    },
    {
      id: "mistral-7b-2023-09-27",
      date: "2023-09-27",
      title: "Mistral 7B Released",
      description: "Mistral AI releases Mistral 7B as an Apache 2.0 open-weight model, establishing the lab's open-model strategy.",
      track: "open-source",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/announcing-mistral-7b" }]
    },
    {
      id: "mixtral-8x7b-2023-12-11",
      date: "2023-12-11",
      title: "Mixtral 8x7B Released",
      description: "Mistral AI releases Mixtral 8x7B, an open-weight sparse mixture-of-experts model with strong multilingual and coding ability.",
      track: "open-source",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/mixtral-of-experts" }]
    },
    {
      id: "claude-3-2024-03-04",
      date: "2024-03-04",
      title: "Claude 3 Family Launches",
      description: "Anthropic introduces Claude 3 Haiku, Sonnet, and Opus, adding stronger reasoning, analysis, and multimodal capabilities.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-3-family" }]
    },
    {
      id: "devin-2024-03-12",
      date: "2024-03-12",
      title: "Cognition Introduces Devin",
      description: "Cognition introduces Devin as an autonomous AI software engineer that can plan and execute coding tasks, use developer tools, and submit completed work.",
      track: "general",
      links: [{ label: "Cognition", url: "https://cognition.ai/blog/introducing-devin" }]
    },
    {
      id: "llama-3-2024-04-18",
      date: "2024-04-18",
      title: "Meta Llama 3 Released",
      description: "Meta releases Llama 3 8B and 70B, continuing its open-weight model program with stronger instruction tuning and safety tooling.",
      track: "open-source",
      links: [{ label: "Meta", url: "https://ai.meta.com/blog/meta-llama-3/" }]
    },
    {
      id: "gpt-4o-2024-05-13",
      date: "2024-05-13",
      title: "GPT-4o Launches",
      description: "OpenAI launches GPT-4o as a flagship omni model for text, vision, and low-latency voice experiences.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/hello-gpt-4o/" }]
    },
    {
      id: "codestral-license-2024-05-29",
      date: "2024-05-29",
      title: "Codestral Released With Non-Production License",
      description: "Mistral AI releases Codestral for code generation with a research and testing license, making the initial open release unsuitable for production use.",
      track: "restrictions",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/codestral" }]
    },
    {
      id: "gpt-4o-mini-2024-07-18",
      date: "2024-07-18",
      title: "GPT-4o Mini Launches",
      description: "OpenAI launches GPT-4o mini as a low-cost small model with text and vision support in the API.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/" }]
    },
    {
      id: "llama-3-1-2024-07-23",
      date: "2024-07-23",
      title: "Llama 3.1 Released",
      description: "Meta releases Llama 3.1, including the 405B open-weight model, extending context length and multilingual support.",
      track: "open-source",
      links: [{ label: "Meta", url: "https://ai.meta.com/blog/meta-llama-3-1/" }]
    },
    {
      id: "claude-3-5-sonnet-2024-06-20",
      date: "2024-06-20",
      title: "Claude 3.5 Sonnet Launches",
      description: "Anthropic releases Claude 3.5 Sonnet, raising its coding, reasoning, and visual-analysis performance.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-3-5-sonnet" }]
    },
    {
      id: "o1-preview-2024-09-12",
      date: "2024-09-12",
      title: "OpenAI o1 Preview Launches",
      description: "OpenAI introduces the o1 reasoning model series, focused on harder math, coding, and scientific reasoning tasks.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-openai-o1-preview/" }]
    },
    {
      id: "llama-3-2-2024-09-25",
      date: "2024-09-25",
      title: "Llama 3.2 Adds Vision and Edge Models",
      description: "Meta releases Llama 3.2 with 11B and 90B vision models plus smaller 1B and 3B text models for local and edge deployment.",
      track: "open-source",
      links: [{ label: "Meta", url: "https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/" }]
    },
    {
      id: "claude-computer-use-2024-10-22",
      date: "2024-10-22",
      title: "Anthropic Introduces Computer Use",
      description: "Anthropic introduces computer use in public beta, allowing Claude to inspect screens, move a cursor, click buttons, and type through the API.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/3-5-models-and-computer-use" }]
    },
    {
      id: "anthropic-mcp-2024-11-25",
      date: "2024-11-25",
      title: "Anthropic Introduces Model Context Protocol",
      description: "Anthropic launches MCP as an open standard for connecting AI assistants to tools, data sources, and external systems through reusable servers and clients.",
      track: "general",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/model-context-protocol" }]
    },
    {
      id: "gpt-35-retirements-2024-09-13",
      date: "2024-09-13",
      title: "OpenAI Retires Legacy GPT-3.5 API Models",
      description: "OpenAI retires several legacy GPT-3.5 and older completion models, moving developers toward current chat and reasoning models.",
      track: "restrictions",
      links: [{ label: "OpenAI deprecations", url: "https://platform.openai.com/docs/deprecations" }]
    },
    {
      id: "deepseek-v3-2024-12-26",
      date: "2024-12-26",
      title: "DeepSeek-V3 Released",
      description: "DeepSeek releases DeepSeek-V3, a large MoE model that becomes a key open-model reference point for coding and reasoning.",
      track: "open-source",
      links: [{ label: "DeepSeek", url: "https://api-docs.deepseek.com/news/news1226" }]
    },
    {
      id: "deepseek-r1-2025-01-20",
      date: "2025-01-20",
      title: "DeepSeek-R1 Released",
      description: "DeepSeek releases DeepSeek-R1 and distilled variants, accelerating open reasoning-model adoption.",
      track: "open-source",
      links: [{ label: "DeepSeek", url: "https://api-docs.deepseek.com/news/news250120" }]
    },
    {
      id: "openai-operator-2025-01-23",
      date: "2025-01-23",
      title: "OpenAI Introduces Operator",
      description: "OpenAI launches Operator as a research preview agent that can use its own browser to perform web tasks for Pro users in the U.S.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-operator/" }]
    },
    {
      id: "claude-code-preview-2025-02-24",
      date: "2025-02-24",
      title: "Anthropic Introduces Claude Code",
      description: "Anthropic introduces Claude Code as a limited research preview command-line tool for delegating substantial engineering tasks to Claude from the terminal.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-3-7-sonnet" }]
    },
    {
      id: "phi-4-multimodal-mini-2025-02-26",
      date: "2025-02-26",
      title: "Microsoft Phi-4 Multimodal and Mini Launch",
      description: "Microsoft releases Phi-4-multimodal and Phi-4-mini, expanding the Phi small-model family with speech, vision, text, and efficient reasoning capabilities.",
      track: "open-source",
      links: [{ label: "Microsoft", url: "https://azure.microsoft.com/en-us/blog/empowering-innovation-the-next-generation-of-the-phi-family/" }]
    },
    {
      id: "mistral-small-3-2025-01-30",
      date: "2025-01-30",
      title: "Mistral Small 3 Released",
      description: "Mistral AI releases Mistral Small 3 as a low-latency open model for local and commercial deployments.",
      track: "open-source",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/mistral-small-3" }]
    },
    {
      id: "mistral-ocr-2025-03-06",
      date: "2025-03-06",
      title: "Mistral OCR Released",
      description: "Mistral AI launches Mistral OCR, a document-understanding model for extracting structured content from PDFs and images.",
      track: "general",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/mistral-ocr" }]
    },
    {
      id: "mistral-small-3-1-2025-03-17",
      date: "2025-03-17",
      title: "Mistral Small 3.1 Released",
      description: "Mistral AI upgrades its small open model line with stronger instruction following and multimodal support.",
      track: "open-source",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/mistral-small-3-1" }]
    },
    {
      id: "gpt-4-1-2025-04-14",
      date: "2025-04-14",
      title: "GPT-4.1 Family Launches in the API",
      description: "OpenAI releases GPT-4.1, GPT-4.1 mini, and GPT-4.1 nano for better coding, instruction following, and long-context use.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/gpt-4-1/" }]
    },
    {
      id: "codex-cli-2025-04-16",
      date: "2025-04-16",
      title: "OpenAI Releases Codex CLI",
      description: "OpenAI shares Codex CLI as an open-source terminal coding agent that runs locally and uses reasoning models such as o3 and o4-mini.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-o3-and-o4-mini/" }]
    },
    {
      id: "qwen3-2025-04-29",
      date: "2025-04-29",
      title: "Qwen3 Released",
      description: "Alibaba releases Qwen3, a new generation of open-weight dense and mixture-of-experts models with hybrid thinking and non-thinking modes.",
      track: "open-source",
      links: [{ label: "Qwen", url: "https://qwenlm.github.io/blog/qwen3/" }]
    },
    {
      id: "amazon-nova-premier-2025-04-30",
      date: "2025-04-30",
      title: "Amazon Nova Premier Launches",
      description: "AWS releases Amazon Nova Premier, its most capable Nova foundation model for complex reasoning, instruction following, and multimodal understanding.",
      track: "general",
      links: [{ label: "AWS", url: "https://aws.amazon.com/blogs/aws/amazon-nova-premier-our-most-capable-model-for-complex-tasks-and-teacher-for-model-distillation/" }]
    },
    {
      id: "gpt-image-1-2025-04-23",
      date: "2025-04-23",
      title: "gpt-image-1 Launches in the API",
      description: "OpenAI brings ChatGPT image-generation capabilities to developers through the gpt-image-1 API model.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/image-generation-api/" }]
    },
    {
      id: "llama-4-2025-04-05",
      date: "2025-04-05",
      title: "Llama 4 Scout and Maverick Released",
      description: "Meta introduces Llama 4 Scout and Maverick as open-weight multimodal models with long-context and mixture-of-experts designs.",
      track: "open-source",
      links: [{ label: "Meta", url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/" }]
    },
    {
      id: "mistral-medium-3-2025-05-07",
      date: "2025-05-07",
      title: "Mistral Medium 3 Released",
      description: "Mistral AI launches Mistral Medium 3 for enterprise coding, reasoning, and multimodal work at lower cost.",
      track: "general",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/mistral-medium-3" }]
    },
    {
      id: "claude-web-search-api-2025-05-07",
      date: "2025-05-07",
      title: "Anthropic Launches Web Search API",
      description: "Anthropic adds web search to the Claude API, allowing applications to retrieve current information with citations.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/web-search-api" }]
    },
    {
      id: "codex-preview-2025-05-16",
      date: "2025-05-16",
      title: "OpenAI Introduces Codex",
      description: "OpenAI launches Codex as a cloud-based software engineering agent that can work on coding tasks in parallel inside isolated repository sandboxes.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-codex/" }]
    },
    {
      id: "github-copilot-coding-agent-preview-2025-05-19",
      date: "2025-05-19",
      title: "GitHub Copilot Coding Agent Public Preview",
      description: "GitHub launches Copilot coding agent in public preview, letting developers assign issues or tasks that run in the background and return draft pull requests.",
      track: "general",
      links: [{ label: "GitHub", url: "https://github.blog/changelog/2025-05-19-github-copilot-coding-agent-in-public-preview/" }]
    },
    {
      id: "copilot-agent-premium-requests-2025-05-19",
      date: "2025-05-19",
      title: "Copilot Coding Agent Uses Premium Requests",
      description: "GitHub says Copilot coding agent will consume one premium request per model request starting June 4, making usage accounting part of the preview rollout.",
      track: "restrictions",
      links: [{ label: "GitHub", url: "https://github.blog/changelog/2025-05-19-github-copilot-coding-agent-in-public-preview/" }]
    },
    {
      id: "devstral-2025-05-21",
      date: "2025-05-21",
      title: "Devstral Released",
      description: "Mistral AI and All Hands AI release Devstral, an Apache 2.0 open model optimized for software-engineering agents.",
      track: "open-source",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/devstral" }]
    },
    {
      id: "windsurf-swe-1-2025-05-15",
      date: "2025-05-15",
      title: "Windsurf Launches SWE-1 Models",
      description: "Windsurf launches its SWE-1 model family, optimized for the broader software engineering workflow rather than only isolated coding tasks.",
      track: "general",
      links: [{ label: "Windsurf", url: "https://windsurf.com/blog/windsurf-wave-9-swe-1" }]
    },
    {
      id: "claude-4-2025-05-22",
      date: "2025-05-22",
      title: "Claude Opus 4 and Sonnet 4 Launch",
      description: "Anthropic launches Claude Opus 4 and Claude Sonnet 4, positioning Opus for long-running agentic work and Sonnet as a high-performance daily model.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-4" }]
    },
    {
      id: "claude-code-ga-2025-05-22",
      date: "2025-05-22",
      title: "Claude Code Becomes Generally Available",
      description: "Anthropic makes Claude Code generally available and adds background tasks through GitHub Actions plus native VS Code and JetBrains integrations.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-4" }]
    },
    {
      id: "gemini-2-5-pro-2025-05-20",
      date: "2025-05-20",
      title: "Gemini 2.5 Pro Broadens at I/O",
      description: "Google expands Gemini 2.5 Pro and related Gemini app capabilities, making reasoning and multimodal upgrades central to its 2025 model stack.",
      track: "google",
      links: [{ label: "Google", url: "https://blog.google/technology/google-deepmind/google-gemini-updates-io-2025/" }]
    },
    {
      id: "jules-public-2025-05-20",
      date: "2025-05-20",
      title: "Google Introduces Jules Coding Agent",
      description: "Google presents Jules as an asynchronous AI coding agent that can read code, understand intent, and work autonomously on software tasks.",
      track: "google",
      links: [{ label: "Google", url: "https://blog.google/innovation-and-ai/models-and-research/google-labs/jules/" }]
    },
    {
      id: "veo-3-2025-05-20",
      date: "2025-05-20",
      title: "Veo 3 and Imagen 4 Announced",
      description: "Google announces Veo 3 for video generation with native audio and Imagen 4 for higher-quality image generation.",
      track: "google",
      links: [{ label: "Google", url: "https://blog.google/technology/ai/google-flow-veo-ai-filmmaking-tool/" }]
    },
    {
      id: "magistral-2025-06-10",
      date: "2025-06-10",
      title: "Magistral Reasoning Models Launch",
      description: "Mistral AI introduces Magistral Small and Medium, its first reasoning-model family for transparent step-by-step problem solving.",
      track: "open-source",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/magistral" }]
    },
    {
      id: "qwen3-embedding-reranker-2025-06-05",
      date: "2025-06-05",
      title: "Qwen3 Embedding and Reranker Released",
      description: "Alibaba releases Qwen3 Embedding and Qwen3 Reranker models for multilingual retrieval, search, and ranking workflows.",
      track: "open-source",
      links: [{ label: "Qwen", url: "https://qwenlm.github.io/blog/qwen3-embedding/" }]
    },
    {
      id: "windsurf-planning-mode-2025-06-10",
      date: "2025-06-10",
      title: "Windsurf Launches Planning Mode",
      description: "Windsurf introduces Planning Mode, a workflow where Cascade creates and edits implementation plans for longer-running coding work.",
      track: "general",
      links: [{ label: "Windsurf", url: "https://windsurf.com/blog/windsurf-wave-10-planning-mode" }]
    },
    {
      id: "gemini-cli-2025-06-25",
      date: "2025-06-25",
      title: "Google Launches Gemini CLI",
      description: "Google launches Gemini CLI as a free open-source terminal agent for coding, problem solving, task management, and access to Gemini 2.5 Pro.",
      track: "google",
      links: [{ label: "Google", url: "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent/" }]
    },
    {
      id: "kimi-k2-2025-07-11",
      date: "2025-07-11",
      title: "Kimi K2 Released",
      description: "Moonshot AI releases Kimi K2 as an open-weight agentic MoE model focused on coding, tool use, and long-context workflows.",
      track: "open-source",
      links: [{ label: "Kimi", url: "https://github.com/MoonshotAI/Kimi-K2" }]
    },
    {
      id: "glm-4-5-2025-07-28",
      date: "2025-07-28",
      title: "Z.ai Releases GLM-4.5",
      description: "Z.ai releases GLM-4.5 as an open-weight reasoning, coding, and agentic model family with flagship and Air variants.",
      track: "open-source",
      links: [{ label: "Z.ai", url: "https://z.ai/blog/glm-4.5" }]
    },
    {
      id: "voxtral-2025-07-15",
      date: "2025-07-15",
      title: "Voxtral Speech Models Released",
      description: "Mistral AI launches Voxtral, an open speech-understanding model family for transcription and audio reasoning.",
      track: "open-source",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/voxtral" }]
    },
    {
      id: "chatgpt-agent-2025-07-17",
      date: "2025-07-17",
      title: "OpenAI Launches ChatGPT Agent",
      description: "OpenAI launches ChatGPT agent, combining research, browsing, connectors, and computer-use capabilities so ChatGPT can take action across web workflows.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-chatgpt-agent/" }]
    },
    {
      id: "qwen3-coder-2025-07-22",
      date: "2025-07-22",
      title: "Qwen3-Coder Released",
      description: "Alibaba releases Qwen3-Coder, an open agentic coding model family focused on software engineering and tool-use workflows.",
      track: "open-source",
      links: [{ label: "Qwen", url: "https://qwenlm.github.io/blog/qwen3-coder/" }]
    },
    {
      id: "gpt-oss-2025-08-05",
      date: "2025-08-05",
      title: "OpenAI Releases gpt-oss Open-Weight Models",
      description: "OpenAI releases gpt-oss-120b and gpt-oss-20b under Apache 2.0, bringing OpenAI reasoning models to local and self-hosted deployments.",
      track: "open-source",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-gpt-oss/" }]
    },
    {
      id: "gpt-5-2025-08-07",
      date: "2025-08-07",
      title: "GPT-5 Launches",
      description: "OpenAI launches GPT-5 as its unified flagship model for ChatGPT and the API, with stronger reasoning, coding, and agentic behavior.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-gpt-5/" }]
    },
    {
      id: "claude-opus-4-1-2025-08-05",
      date: "2025-08-05",
      title: "Claude Opus 4.1 Launches",
      description: "Anthropic releases Claude Opus 4.1 as an upgrade to Opus 4 for coding, agentic workflows, and complex reasoning.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-opus-4-1" }]
    },
    {
      id: "qwen-image-2025-08-04",
      date: "2025-08-04",
      title: "Qwen-Image Released",
      description: "Alibaba releases Qwen-Image, a foundation image-generation model focused on complex text rendering and precise image editing.",
      track: "open-source",
      links: [{ label: "Qwen", url: "https://qwenlm.github.io/blog/qwen-image/" }]
    },
    {
      id: "gemini-deep-think-2025-08-01",
      date: "2025-08-01",
      title: "Gemini Deep Think Rolls Out",
      description: "Google launches Deep Think in Gemini for Ultra subscribers after previewing its advanced reasoning mode at I/O.",
      track: "google",
      links: [{ label: "Google", url: "https://blog.google/products-and-platforms/products/gemini/gemini-2-5-deep-think/" }]
    },
    {
      id: "jules-ga-2025-08-06",
      date: "2025-08-06",
      title: "Google Jules Leaves Public Beta",
      description: "Google makes Jules generally available as an asynchronous coding agent powered by Gemini 2.5, with usage limits published on the Jules site.",
      track: "google",
      links: [{ label: "Google", url: "https://blog.google/innovation-and-ai/models-and-research/google-labs/jules-now-available/" }]
    },
    {
      id: "gpt-realtime-2025-08-28",
      date: "2025-08-28",
      title: "OpenAI Launches gpt-realtime",
      description: "OpenAI releases gpt-realtime and Realtime API updates for production voice agents, including MCP server support, image input, and SIP phone calling.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-gpt-realtime/" }]
    },
    {
      id: "claude-sonnet-4-5-2025-09-29",
      date: "2025-09-29",
      title: "Claude Sonnet 4.5 Launches",
      description: "Anthropic introduces Claude Sonnet 4.5, emphasizing coding, complex agents, computer use, reasoning, and math.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-sonnet-4-5" }]
    },
    {
      id: "glm-4-6-2025-09-30",
      date: "2025-09-30",
      title: "Z.ai Releases GLM-4.6",
      description: "Z.ai releases GLM-4.6 as a GLM-4.5 successor with longer context, stronger coding and reasoning, and improved agent performance.",
      track: "open-source",
      links: [{ label: "Z.ai", url: "https://z.ai/blog/glm-4.6" }]
    },
    {
      id: "github-copilot-coding-agent-ga-2025-09-25",
      date: "2025-09-25",
      title: "GitHub Copilot Coding Agent GA",
      description: "GitHub makes Copilot coding agent generally available for paid Copilot subscribers, with task delegation through issues, GitHub, and VS Code.",
      track: "general",
      links: [{ label: "GitHub", url: "https://github.blog/changelog/2025-09-25-copilot-coding-agent-is-now-generally-available/" }]
    },
    {
      id: "qwen3guard-2025-09-23",
      date: "2025-09-23",
      title: "Qwen3Guard Safety Model Released",
      description: "Alibaba releases Qwen3Guard, an open safety-classification model for moderating LLM inputs and outputs.",
      track: "open-source",
      links: [{ label: "Qwen", url: "https://qwenlm.github.io/blog/qwen3guard/" }]
    },
    {
      id: "qwen3guard-moderation-limit-2025-09-23",
      date: "2025-09-23",
      title: "Qwen3Guard Frames Safety as a Dedicated Model Layer",
      description: "Qwen3Guard separates policy classification from generation, highlighting a restriction pattern where deployments add explicit moderation models around open LLMs.",
      track: "restrictions",
      links: [{ label: "Qwen", url: "https://qwenlm.github.io/blog/qwen3guard/" }]
    },
    {
      id: "openai-apps-sdk-2025-10-06",
      date: "2025-10-06",
      title: "OpenAI Launches Apps SDK",
      description: "OpenAI introduces apps in ChatGPT and the Apps SDK preview, letting developers build chat-native tools and experiences inside ChatGPT.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-apps-in-chatgpt/" }]
    },
    {
      id: "openai-agentkit-2025-10-06",
      date: "2025-10-06",
      title: "OpenAI Introduces AgentKit",
      description: "OpenAI launches AgentKit for building, deploying, and optimizing agent workflows with Agent Builder, ChatKit, connectors, evals, and guardrails.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-agentkit/" }]
    },
    {
      id: "codex-ga-2025-10-06",
      date: "2025-10-06",
      title: "OpenAI Makes Codex Generally Available",
      description: "OpenAI makes Codex generally available with Slack integration, a Codex SDK, GitHub Actions support, and new admin controls for engineering teams.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/codex-now-generally-available/" }]
    },
    {
      id: "cursor-plan-mode-2025-10-07",
      date: "2025-10-07",
      title: "Cursor Introduces Plan Mode",
      description: "Cursor launches Plan Mode so agents can research a codebase, create editable implementation plans, and run longer coding tasks from those plans.",
      track: "xai",
      links: [{ label: "Cursor", url: "https://cursor.com/blog/plan-mode" }]
    },
    {
      id: "anthropic-skills-2025-10-16",
      date: "2025-10-16",
      title: "Anthropic Introduces Skills",
      description: "Anthropic launches Skills, folders of instructions, scripts, and resources that Claude can load when relevant for specialized tasks.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/skills" }]
    },
    {
      id: "windsurf-swe-grep-2025-10-16",
      date: "2025-10-16",
      title: "Windsurf Launches SWE-grep Fast Context",
      description: "Windsurf introduces SWE-grep and SWE-grep-mini as fast agentic retrieval models powering a Fast Context subagent for coding workflows.",
      track: "general",
      links: [{ label: "Windsurf", url: "https://cognition.ai/blog/swe-grep" }]
    },
    {
      id: "claude-code-web-2025-10-20",
      date: "2025-10-20",
      title: "Claude Code Comes to the Web",
      description: "Anthropic launches Claude Code on the web as a research preview for delegating parallel coding tasks from a browser, with an early iOS mobile experience.",
      track: "anthropic",
      links: [{ label: "Claude", url: "https://claude.com/blog/claude-code-on-the-web" }]
    },
    {
      id: "cursor-2-composer-2025-10-29",
      date: "2025-10-29",
      title: "Cursor 2.0 and Composer Launch",
      description: "Cursor launches Cursor 2.0 with its first agentic coding model, Composer, plus a multi-agent interface using worktrees or remote machines.",
      track: "xai",
      links: [{ label: "Cursor", url: "https://cursor.com/blog/2-0" }]
    },
    {
      id: "jules-tools-api-2025-10-02",
      date: "2025-10-02",
      title: "Google Launches Jules Tools and API",
      description: "Google adds Jules Tools, a lightweight CLI, and opens Jules API access so teams can integrate the coding agent into CI/CD, Slack, and internal workflows.",
      track: "google",
      links: [{ label: "Google", url: "https://blog.google/innovation-and-ai/models-and-research/google-labs/jules-tools-jules-api/" }]
    },
    {
      id: "kimi-k2-thinking-2025-11-06",
      date: "2025-11-06",
      title: "Kimi K2 Thinking Released",
      description: "Moonshot AI releases Kimi K2 Thinking as an open-source thinking-agent model for extended reasoning and agentic tasks.",
      track: "open-source",
      links: [{ label: "Kimi", url: "https://github.com/MoonshotAI/Kimi-K2" }]
    },
    {
      id: "gpt-5-1-2025-11-13",
      date: "2025-11-12",
      title: "GPT-5.1 Launches",
      description: "OpenAI updates the GPT-5 line with GPT-5.1 models across ChatGPT and API surfaces.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/gpt-5-1/" }]
    },
    {
      id: "gpt-5-2-2025-12-11",
      date: "2025-12-11",
      title: "GPT-5.2 Launches",
      description: "OpenAI rolls out GPT-5.2 Instant, Thinking, and Pro to paid ChatGPT plans, with GPT-5.1 remaining temporarily available under legacy models before sunset.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-gpt-5-2/" }]
    },
    {
      id: "deepseek-v3-2-2025-12-01",
      date: "2025-12-01",
      title: "DeepSeek-V3.2 Released",
      description: "DeepSeek releases DeepSeek-V3.2 and related API updates for its current chat and reasoning model line.",
      track: "open-source",
      links: [{ label: "DeepSeek", url: "https://api-docs.deepseek.com/news/news251201" }]
    },
    {
      id: "mistral-3-2025-12-02",
      date: "2025-12-02",
      title: "Mistral 3 Family Released",
      description: "Mistral AI releases the Mistral 3 family, expanding its open and enterprise model portfolio.",
      track: "open-source",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/mistral-3" }]
    },
    {
      id: "devstral-2-2025-12-09",
      date: "2025-12-09",
      title: "Devstral 2 and Vibe CLI Launch",
      description: "Mistral AI releases Devstral 2 and a coding CLI for software-agent workflows.",
      track: "open-source",
      links: [{ label: "Mistral", url: "https://mistral.ai/news/devstral-2-vibe-cli/" }]
    },
    {
      id: "amazon-nova-2-2025-12-02",
      date: "2025-12-02",
      title: "Amazon Nova 2 Models Launch",
      description: "AWS launches the Amazon Nova 2 model family, including Lite, Pro, Sonic, and Omni variants for text, multimodal, speech, and unified-generation workflows.",
      track: "general",
      links: [{ label: "AWS", url: "https://aws.amazon.com/about-aws/whats-new/2025/12/nova-2-foundation-models-amazon-bedrock/" }]
    },
    {
      id: "gpt-image-1-5-2026-02-10",
      date: "2026-02-10",
      title: "gpt-image-1.5 Batch Support Arrives",
      description: "OpenAI adds Batch API support for gpt-image-1.5, making the image model usable for asynchronous bulk generation workloads.",
      track: "openai",
      links: [{ label: "OpenAI changelog", url: "https://platform.openai.com/docs/changelog" }]
    },
    {
      id: "glm-image-2026-02-10",
      date: "2026-02-10",
      title: "Z.ai Releases GLM-Image",
      description: "Z.ai releases GLM-Image for prompt-guided image generation and editing, extending the GLM family into visual creation.",
      track: "open-source",
      links: [{ label: "Z.ai", url: "https://z.ai/blog/glm-image" }]
    },
    {
      id: "cursor-composer-1-5-2026-02-09",
      date: "2026-02-09",
      title: "Cursor Releases Composer 1.5",
      description: "Cursor releases Composer 1.5, scaling reinforcement learning for its agentic coding model and adding self-summarization for longer tasks.",
      track: "xai",
      links: [{ label: "Cursor", url: "https://cursor.com/blog/composer-1-5" }]
    },
    {
      id: "realtime-audio-2026-02-23",
      date: "2026-02-23",
      title: "OpenAI Realtime and Audio 1.5 Models Launch",
      description: "OpenAI updates its audio stack with newer realtime, speech-to-text, and text-to-speech models.",
      track: "openai",
      links: [{ label: "OpenAI changelog", url: "https://platform.openai.com/docs/changelog" }]
    },
    {
      id: "glm-5-2026-02-17",
      date: "2026-02-17",
      title: "Z.ai Releases GLM-5",
      description: "Z.ai releases GLM-5, positioning it for agentic engineering workflows that move beyond vibe coding into structured software-agent work.",
      track: "open-source",
      links: [{ label: "Z.ai", url: "https://z.ai/blog/glm-5" }]
    },
    {
      id: "gpt-5-3-codex-2026-02-24",
      date: "2026-02-24",
      title: "GPT-5.3-Codex Released",
      description: "OpenAI releases GPT-5.3-Codex as a coding-specialized model variant for agentic software-development workflows.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-gpt-5-3-codex/" }]
    },
    {
      id: "gpt-5-4-2026-03-05",
      date: "2026-03-05",
      title: "GPT-5.4 Launches",
      description: "OpenAI releases GPT-5.4 as a newer flagship model line for ChatGPT, API, and Codex use cases.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-gpt-5-4/" }]
    },
    {
      id: "cursor-composer-2-2026-03-19",
      date: "2026-03-19",
      title: "Cursor Releases Composer 2",
      description: "Cursor releases Composer 2 as a frontier-level coding model with a cheaper pricing profile and a fast default variant for agentic coding.",
      track: "xai",
      links: [{ label: "Cursor", url: "https://cursor.com/blog/composer-2" }]
    },
    {
      id: "cursor-self-hosted-cloud-agents-2026-03-25",
      date: "2026-03-25",
      title: "Cursor Adds Self-Hosted Cloud Agents",
      description: "Cursor launches self-hosted cloud agents so enterprise code, secrets, builds, and tool execution can stay inside a customer's own network.",
      track: "xai",
      links: [{ label: "Cursor", url: "https://cursor.com/changelog/03-25-26" }]
    },
    {
      id: "sora-2-edit-restriction-2026-03-12",
      date: "2026-03-12",
      title: "Sora 2 Update Replaces Remix With Video Edits",
      description: "OpenAI introduces the Sora 2 preview model and says video edits replace the older remix endpoint, with remix scheduled for removal after a six-month transition.",
      track: "restrictions",
      links: [{ label: "OpenAI changelog", url: "https://platform.openai.com/docs/changelog" }]
    },
    {
      id: "nvidia-nemotron-3-super-2026-03-11",
      date: "2026-03-11",
      title: "NVIDIA Nemotron 3 Super Released",
      description: "NVIDIA releases Nemotron 3 Super, an open reasoning model for agentic and enterprise AI workloads.",
      track: "open-source",
      links: [{ label: "NVIDIA", url: "https://developer.nvidia.com/blog/nvidia-nemotron-3-ultra-powers-faster-more-efficient-reasoning-for-long-running-agents/" }]
    },
    {
      id: "mistral-small-4-2026-03-16",
      date: "2026-03-16",
      title: "Mistral Small 4 and Leanstral 1.5 Released",
      description: "Mistral AI releases Small 4 and Leanstral 1.5, refreshing its efficient open and enterprise model lineup.",
      track: "open-source",
      links: [{ label: "Mistral models", url: "https://docs.mistral.ai/getting-started/models/models_overview/" }]
    },
    {
      id: "gpt-5-4-mini-nano-2026-03-17",
      date: "2026-03-17",
      title: "GPT-5.4 Mini and Nano Launch",
      description: "OpenAI adds smaller GPT-5.4 variants for lower-latency and lower-cost API workloads.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-gpt-5-4-mini-and-nano/" }]
    },
    {
      id: "voxtral-tts-2026-03-23",
      date: "2026-03-23",
      title: "Voxtral TTS Released",
      description: "Mistral AI expands the Voxtral line with text-to-speech capabilities.",
      track: "open-source",
      links: [{ label: "Mistral models", url: "https://docs.mistral.ai/getting-started/models/models_overview/" }]
    },
    {
      id: "meta-muse-spark-2026-04-08",
      date: "2026-04-08",
      title: "Meta Muse Spark Launches",
      description: "Meta introduces Muse Spark as a stronger creative-generation model for Meta AI experiences.",
      track: "general",
      links: [{ label: "Meta AI", url: "https://ai.meta.com/blog/" }]
    },
    {
      id: "kimi-k2-6-2026-04-20",
      date: "2026-04-20",
      title: "Kimi K2.6 Released",
      description: "Moonshot AI updates Kimi K2 with a newer open-source coding and agentic model release.",
      track: "open-source",
      links: [{ label: "Kimi", url: "https://github.com/MoonshotAI/Kimi-K2" }]
    },
    {
      id: "nvidia-nemotron-3-nano-omni-2026-04-28",
      date: "2026-04-28",
      title: "NVIDIA Nemotron 3 Nano Omni Released",
      description: "NVIDIA releases Nemotron 3 Nano Omni, a compact multimodal model designed for text, image, and audio understanding.",
      track: "open-source",
      links: [{ label: "NVIDIA", url: "https://developer.nvidia.com/blog/nvidia-nemotron-3-nano-omni-powers-multimodal-agent-reasoning-in-a-single-efficient-open-model/" }]
    },
    {
      id: "gpt-5-5-context-cache-limit-2026-04-24",
      date: "2026-04-24",
      title: "GPT-5.5 Launches With Staged Availability",
      description: "OpenAI launches GPT-5.5 for ChatGPT and Codex paid users while saying API availability will follow soon, making rollout timing and plan access part of the release.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-gpt-5-5/" }]
    },
    {
      id: "openai-chat-latest-2026-05-05",
      date: "2026-05-05",
      title: "chat-latest Model Alias Added for Testing",
      description: "OpenAI introduces chat-latest as a fast-moving model alias intended for evaluation of current ChatGPT behavior rather than stable production pinning.",
      track: "restrictions",
      links: [{ label: "OpenAI changelog", url: "https://platform.openai.com/docs/changelog" }]
    },
    {
      id: "glm-5-1-2026-05-07",
      date: "2026-05-07",
      title: "Z.ai Releases GLM-5.1",
      description: "Z.ai releases GLM-5.1 as a next-generation flagship update for reasoning, coding, and agentic workflows.",
      track: "open-source",
      links: [{ label: "Z.ai", url: "https://z.ai/blog/glm-5.1" }]
    },
    {
      id: "codex-mobile-remote-ssh-hooks-2026-05-14",
      date: "2026-05-14",
      title: "Codex Comes to ChatGPT Mobile",
      description: "OpenAI brings Codex to the ChatGPT mobile app in preview, makes Remote SSH and Hooks available on all plans, and adds enterprise programmatic access tokens.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/work-with-codex-from-anywhere/" }]
    },
    {
      id: "cursor-sdk-2026-04-29",
      date: "2026-04-29",
      title: "Cursor SDK Public Beta Launches",
      description: "Cursor introduces the Cursor SDK so developers can build programmatic agents using the same runtime, harness, and models that power Cursor.",
      track: "xai",
      links: [{ label: "Cursor", url: "https://cursor.com/changelog/sdk-release" }]
    },
    {
      id: "mistral-model-deprecations-2026-05-22",
      date: "2026-05-22",
      title: "Mistral Deprecates Older Model Versions",
      description: "Mistral deprecates older Medium, Small, Leanstral, and Voxtral variants as newer model generations become available.",
      track: "restrictions",
      links: [{ label: "Mistral models", url: "https://docs.mistral.ai/getting-started/models/models_overview/" }]
    },
    {
      id: "mistral-medium-3-5-2026-05-22",
      date: "2026-05-22",
      title: "Mistral Medium 3.5 Released",
      description: "Mistral AI releases Medium 3.5, updating its frontier enterprise model family.",
      track: "general",
      links: [{ label: "Mistral models", url: "https://docs.mistral.ai/getting-started/models/models_overview/" }]
    },
    {
      id: "cohere-command-a-plus-2026-05-20",
      date: "2026-05-20",
      title: "Cohere Command A+ Released",
      description: "Cohere releases Command A+, a multilingual enterprise model with a large context window, agentic tool use, and private deployment options.",
      track: "general",
      links: [{ label: "Cohere", url: "https://cohere.com/blog/command-a-plus" }]
    },
    {
      id: "cursor-composer-2-5-2026-05-18",
      date: "2026-05-18",
      title: "Cursor Releases Composer 2.5",
      description: "Cursor releases Composer 2.5 with stronger long-running task behavior, targeted textual feedback during RL, and training on more complex synthetic tasks.",
      track: "xai",
      links: [{ label: "Cursor", url: "https://cursor.com/blog/composer-2-5" }]
    },
    {
      id: "cohere-command-a-plus-deployment-2026-05-20",
      date: "2026-05-20",
      title: "Command A+ Emphasizes Private Enterprise Deployment",
      description: "Cohere highlights that Command A+ can be deployed in private clouds and controlled enterprise environments, making access and governance a core part of the release.",
      track: "restrictions",
      links: [{ label: "Cohere", url: "https://cohere.com/blog/command-a-plus" }]
    },
    {
      id: "claude-opus-4-8-2026-05-28",
      date: "2026-05-28",
      title: "Claude Opus 4.8 Launches",
      description: "Anthropic introduces Claude Opus 4.8 as an upgrade to its Opus model line with stronger coding, agentic-task, and professional-work performance.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-opus-4-8" }]
    },
    {
      id: "claude-dynamic-workflows-2026-05-28",
      date: "2026-05-28",
      title: "Claude Dynamic Workflows Preview",
      description: "Anthropic launches dynamic workflows in Claude Code research preview, allowing Claude to plan larger tasks, run parallel subagents, verify outputs, and report back.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-opus-4-8" }]
    },
    {
      id: "xai-search-realtime-limits-2026-05-29",
      date: "2026-05-29",
      title: "xAI Limits Live Search in Realtime Workflows",
      description: "xAI limits live-search support by model family and excludes it from realtime and asynchronous requests.",
      track: "restrictions",
      links: [{ label: "xAI docs", url: "https://docs.x.ai/docs/overview" }]
    },
    {
      id: "grok-build-cli-2026-06-03",
      date: "2026-06-03",
      title: "xAI Launches Grok Build CLI",
      description: "xAI launches Grok Build in early beta as a terminal coding agent for professional software engineering and complex coding work.",
      track: "xai",
      links: [{ label: "xAI", url: "https://x.ai/news/grok-build-cli" }]
    },
    {
      id: "xai-agent-tools-api-2026-06-10",
      date: "2026-06-10",
      title: "xAI Launches Agent Tools API",
      description: "xAI announces Grok 4.1 Fast with the Agent Tools API, giving agents access to X data, web search, remote code execution, and client-side tools.",
      track: "xai",
      links: [{ label: "xAI", url: "https://x.ai/news/grok-4-1-fast" }]
    },
    {
      id: "openai-agent-builder-deprecation-2026-06-03",
      date: "2026-06-03",
      title: "OpenAI Deprecates Agent Builder",
      description: "OpenAI announces Agent Builder deprecation, plans to sunset it at the end of 2026, and directs teams to migrate to the Agents SDK and ChatKit.",
      track: "restrictions",
      links: [{ label: "OpenAI", url: "https://openai.com/index/agent-builder-deprecation/" }]
    },
    {
      id: "ideogram-4-2026-06-03",
      date: "2026-06-03",
      title: "Ideogram 4.0 Released",
      description: "Ideogram releases Ideogram 4.0, an image-generation model update focused on prompt adherence, typography, and image realism.",
      track: "open-source",
      links: [{ label: "Ideogram", url: "https://ideogram.ai/news/ideogram-4.0/" }]
    },
    {
      id: "ideogram-api-constraints-2026-06-03",
      date: "2026-06-03",
      title: "Ideogram 4.0 API Access Has Credit and Feature Limits",
      description: "Ideogram ties API and product access to paid plans, credits, and model-specific feature availability rather than unrestricted use.",
      track: "restrictions",
      links: [{ label: "Ideogram", url: "https://ideogram.ai/models/4.0/" }]
    },
    {
      id: "claude-fable-mythos-2026-06-09",
      date: "2026-06-09",
      title: "Claude Fable 5 and Mythos 5 Launch",
      description: "Anthropic launches Claude Fable 5 for broader use and Claude Mythos 5 for a small group of cyberdefenders and infrastructure providers through Project Glasswing.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-fable-5-mythos-5" }]
    },
    {
      id: "anthropic-limits-fable-mythos-2026-06-09",
      date: "2026-06-12",
      title: "Anthropic Suspends Fable and Mythos Access",
      description: "Anthropic says a U.S. government directive requires it to suspend access to Fable 5 and Mythos 5 while all other Claude models remain unaffected.",
      track: "restrictions",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/fable-mythos-access" }]
    },
    {
      id: "kimi-k2-7-code-2026-06-16",
      date: "2026-06-16",
      title: "Kimi K2.7 Code Released",
      description: "Moonshot AI releases Kimi K2.7 Code for coding-agent workflows, extending the Kimi K2 open-model line.",
      track: "open-source",
      links: [{ label: "Kimi", url: "https://github.com/MoonshotAI/Kimi-K2" }]
    },
    {
      id: "glm-5-2-2026-06-16",
      date: "2026-06-16",
      title: "Z.ai Releases GLM-5.2",
      description: "Z.ai releases GLM-5.2, highlighting advances in reasoning, coding, agentic tasks, and multimodal capability.",
      track: "open-source",
      links: [{ label: "Z.ai", url: "https://z.ai/blog/glm-5.2" }]
    },
    {
      id: "loop-engineering-2026-06-17",
      date: "2026-06-17",
      title: "Peter Steinberger Pushes Agent Loops",
      description: "OpenClaw creator Peter Steinberger argues developers should stop directly prompting coding agents and instead design loops that prompt agents through repeated plan, run, inspect, and fix cycles.",
      track: "general",
      links: [{ label: "Peter Steinberger on X", url: "https://x.com/steipete/status/2063697162748260627" }]
    },
    {
      id: "mistral-ocr-4-2026-06-23",
      date: "2026-06-23",
      title: "Mistral OCR 4 Released",
      description: "Mistral AI updates its OCR/document model line with OCR 4.",
      track: "general",
      links: [{ label: "Mistral models", url: "https://docs.mistral.ai/getting-started/models/models_overview/" }]
    },
    {
      id: "claude-tag-2026-06-23",
      date: "2026-06-23",
      title: "Claude Tag Launches",
      description: "Anthropic introduces Claude Tag as a new way for teams to work with Claude.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/introducing-claude-tag" }]
    },
    {
      id: "deepseek-v4-2026-06-27",
      date: "2026-06-27",
      title: "DeepSeek-V4 Released",
      description: "DeepSeek updates its API model line with DeepSeek-V4, documented in the official changelog as a new model release.",
      track: "open-source",
      links: [{ label: "DeepSeek updates", url: "https://api-docs.deepseek.com/updates" }]
    },
    {
      id: "claude-sonnet-5-2026-06-30",
      date: "2026-06-30",
      title: "Claude Sonnet 5 Launches",
      description: "Anthropic introduces Claude Sonnet 5 as its most agentic Sonnet model, designed to plan, use browsers and terminals, and run autonomously.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-sonnet-5" }]
    },
    {
      id: "claude-science-2026-06-30",
      date: "2026-06-30",
      title: "Claude Science Workbench Launches",
      description: "Anthropic launches Claude Science, an AI workbench for scientists that integrates research tools, produces auditable artifacts, and provides flexible compute access.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/claude-science-ai-workbench" }]
    },
    {
      id: "claude-fable-5-returns-2026-07-01",
      date: "2026-07-01",
      title: "Claude Fable 5 Returns Globally",
      description: "Anthropic makes Claude Fable 5 available globally again on Claude Platform, Claude.ai, Claude Code, and Claude Cowork after export controls are lifted.",
      track: "anthropic",
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/redeploying-fable-5" }]
    },
    {
      id: "gemini-3-5-2026-06-17",
      date: "2026-06-17",
      title: "Gemini 3.5 Flash and Pro Launch",
      description: "Google introduces Gemini 3.5, including a fast Flash model and Pro variant for complex reasoning and multimodal work.",
      track: "google",
      links: [{ label: "Google", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/" }]
    },
    {
      id: "gpt-5-6-preview-2026-06-26",
      date: "2026-06-26",
      title: "OpenAI Previews GPT-5.6 Sol",
      description: "OpenAI previews GPT-5.6 Sol as part of a new GPT-5.6 preview series, highlighting stronger scientific reasoning, coding, visual reasoning, and medical knowledge.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/previewing-gpt-5-6-sol/" }]
    },
    {
      id: "gpt-5-6-preview-access-2026-06-26",
      date: "2026-06-26",
      title: "GPT-5.6 Preview Starts With Restricted Access",
      description: "OpenAI describes GPT-5.6 Sol as initially available to select research, nonprofit, and public-sector partners before broader rollout.",
      track: "restrictions",
      links: [{ label: "OpenAI", url: "https://openai.com/index/previewing-gpt-5-6-sol/" }]
    },
    {
      id: "google-nano-banana-2-lite-2026-06-30",
      date: "2026-06-30",
      title: "Nano Banana 2 Lite and Gemini Omni Flash Launch",
      description: "Google releases Nano Banana 2 Lite for faster image generation and Gemini Omni Flash for live multimodal interaction.",
      track: "google",
      links: [{ label: "Google Cloud", url: "https://cloud.google.com/blog/products/ai-machine-learning/nano-banana-2-lite-and-gemini-omni-flash-available" }]
    },
    {
      id: "gemini-computer-use-2026-06-24",
      date: "2026-06-24",
      title: "Google Introduces Computer Use in Gemini 3.5 Flash",
      description: "Google introduces computer use in Gemini 3.5 Flash, expanding Gemini agents toward browser and UI-control workflows.",
      track: "google",
      links: [{ label: "Google", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-computer-use-gemini-3-5-flash/" }]
    },
    {
      id: "google-june-preview-limits-2026-06-30",
      date: "2026-06-30",
      title: "Google June Model Updates Have Preview Limits",
      description: "Google notes that Gemini Omni Flash is developer-preview only and Nano Banana 2 Lite is initially available in the Gemini API and Vertex AI Studio.",
      track: "restrictions",
      links: [{ label: "Google Cloud", url: "https://cloud.google.com/blog/products/ai-machine-learning/nano-banana-2-lite-and-gemini-omni-flash-available" }]
    },
    {
      id: "google-model-deprecations-2026-06-30",
      date: "2026-06-30",
      title: "Google Marks Older Gemini and Imagen Models Deprecated",
      description: "Google deprecates or retires several older Gemini and Imagen models, directing developers to Gemini 3.x, Imagen 5, and Veo model lines.",
      track: "restrictions",
      links: [{ label: "Gemini models", url: "https://ai.google.dev/gemini-api/docs/models" }]
    },
    {
      id: "anthropic-fable-5-restored-2026-07-01",
      date: "2026-06-30",
      title: "Fable and Mythos Export Controls Lifted",
      description: "Anthropic says export controls on Fable 5 and Mythos 5 have been lifted, with Fable 5 returning globally on July 1 and Mythos 5 restored for approved U.S. organizations.",
      track: "restrictions",
      tracks: ["restrictions", "anthropic"],
      links: [{ label: "Anthropic", url: "https://www.anthropic.com/news/redeploying-fable-5" }]
    },
    {
      id: "grok-4-5-2026-07-08",
      date: "2026-07-08",
      title: "xAI Launches Grok 4.5",
      description: "xAI releases Grok 4.5 for coding, agentic tasks, and knowledge work. It is available in Grok Build, Cursor, and the xAI API, with EU availability expected later in July.",
      track: "xai",
      links: [{ label: "xAI", url: "https://x.ai/news/grok-4-5" }]
    },
    {
      id: "claude-fable-5-access-extension-2026-07-07",
      date: "2026-07-07",
      title: "Anthropic Extends Claude Fable 5 Included Access",
      description: "Anthropic extends included Claude Fable 5 access for paid-plan users through July 12, up to 50% of their weekly usage limits. After the extension, additional Fable 5 usage requires usage credits.",
      track: "anthropic",
      links: [{ label: "Anthropic on X", url: "https://x.com/AnthropicAI" }]
    },
    {
      id: "gpt-live-1-2026-07-08",
      date: "2026-07-08",
      title: "OpenAI Launches GPT-Live-1",
      description: "OpenAI launches GPT-Live-1 and GPT-Live-1 mini as a new full-duplex voice experience for ChatGPT. The models can listen and speak continuously, making interruptions and turn-taking feel more natural; GPT-Live-1 serves paid users and the mini model serves Free users.",
      track: "openai",
      links: [{ label: "OpenAI", url: "https://openai.com/index/introducing-gpt-live/" }]
    },
    {
      id: "gpt-5-6-general-availability-2026-07-09",
      date: "2026-07-09",
      title: "OpenAI Launches GPT-5.6 and ChatGPT Work",
      description: "OpenAI makes the GPT-5.6 family generally available: Sol as the flagship tier, Terra for everyday work, and Luna as the fastest, most affordable tier. The rollout begins across ChatGPT, Codex, and the API alongside ChatGPT Work, a GPT-5.6-powered agent for long-running work across connected apps, files, web, mobile, and desktop. The updated desktop app brings Chat, Work, and Codex together in one place.",
      track: "openai",
      links: [
        { label: "GPT-5.6 release", url: "https://openai.com/index/gpt-5-6/" },
        { label: "ChatGPT Work", url: "https://openai.com/index/chatgpt-for-your-most-ambitious-work/" }
      ]
    }
  ]
};
