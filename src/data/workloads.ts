export interface Workload {
  id: string;
  title: string;
  description: string;
  narrative: string;
  models: string;
  dataset: string;
  githubUrl: string;
  variables: {
    isl: string;
    islNewPerTurn: string;
    osl: string;
    distribution: string;
    multiTurn: string;
    turnsMean: string;
    systemPrompt: string;
    timeBetweenTurns: string;
    modelTemperature: string;
    serverOptimizations: string;
  };
}

export const workloads: Workload[] = [
  {
    id: "interactive-chat",
    title: "Interactive Chat (Standard Multi-Turn)",
    description: "Simulates human-driven chat with long idle times, testing the system's ability to manage KV cache retention and P/D disaggregation for prefill-heavy, multi-turn traffic.",
    narrative: "Modern chat is no longer a 1:1 token ratio. Users accumulate long conversation histories (up to 15k tokens) but only type short follow-ups (50 tokens) and receive short answers (300 tokens). Because users take a long time to read the response (45 seconds), sessions sit idle for extended periods.",
    models: "Qwen3.5-397B, DeepSeek-V3.2, GLM-5",
    dataset: "https://github.com/alibaba-edu/qwen-bailian-usagetraces-anon",
    githubUrl: "https://github.com/kubernetes-sigs/inference-perf/tree/main/workload-catalog/interactive-chat",
    variables: {
      isl: "4000, 15000 (mean, max)",
      islNewPerTurn: "50",
      osl: "300, 1000 (mean, max)",
      distribution: "Normal",
      multiTurn: "Yes",
      turnsMean: "4",
      systemPrompt: "1000",
      timeBetweenTurns: "45s",
      modelTemperature: "0.8",
      serverOptimizations: "Prefix aware routing, P/D disaggregation"
    }
  },
  {
    id: "code-generation",
    title: "Code Generation Agent (Tree of Thought)",
    description: "Represents coding agents evaluating parallel paths over massive codebases, stressing prefix-aware routing and KV offloading to prevent OOM errors across shared branches.",
    narrative: "Represents advanced coding agents evaluating multiple logical paths. The context is massive (up to 100k tokens) because the entire codebase is in the prompt. The high \"new ISL\" (2,000 tokens) represents the agent injecting large blocks of generated code back into the prompt to evaluate them.",
    models: "GLM-5, Kimi K2.5, Qwen3-Coder",
    dataset: "https://huggingface.co/datasets/togethercomputer/CoderForge-Preview",
    githubUrl: "https://github.com/kubernetes-sigs/inference-perf/tree/main/workload-catalog/code-generation",
    variables: {
      isl: "55000, 120000 (mean, max)",
      islNewPerTurn: "2000",
      osl: "800, 4000 (mean, max)",
      distribution: "Log Normal",
      multiTurn: "Yes (ToT)",
      turnsMean: "6",
      systemPrompt: "3000",
      timeBetweenTurns: "45s",
      modelTemperature: "0.2",
      serverOptimizations: "Prefix aware routing, KV offloading"
    }
  },
  {
    id: "deep-research",
    title: "Deep Research Agent (Sequential ReAct)",
    description: "Simulates autonomous agents executing rapid-fire tool calls, testing KV cache retention and prefix reuse during causally dependent wait periods as context grows exponentially.",
    narrative: "The ultimate test of agentic tool-calling. An autonomous agent loops through 15 rapid-fire turns. The 25 seconds between turns represents automated API/web search latency, not human reading time. Context accumulates exponentially up to 100k tokens as tool outputs are appended to the scratchpad.",
    models: "Kimi K2.5, MiMo-V2-Flash, Devstral 2",
    dataset: "https://huggingface.co/datasets/iMeanAI/Mind2Web-Live",
    githubUrl: "https://github.com/kubernetes-sigs/inference-perf/tree/main/workload-catalog/deep-research",
    variables: {
      isl: "45000, 150000 (mean, max)",
      islNewPerTurn: "3000",
      osl: "300, 4000 (mean, max)",
      distribution: "Exponential",
      multiTurn: "Yes",
      turnsMean: "15",
      systemPrompt: "2000",
      timeBetweenTurns: "25s",
      modelTemperature: "0.1",
      serverOptimizations: "Prefix aware routing, KV offloading"
    }
  },
  {
    id: "deep-thinking",
    title: "Deep Thinking (Chain-of-Thought)",
    description: "Represents o1/o3-style reasoning with massive uninterrupted generation, acting as the definitive bandwidth-bound decode stress test that requires P/D disaggregation.",
    narrative: "Represents o1/o3 style reasoning models. A relatively short prompt triggers a massive, uninterrupted generation phase of up to 32,000 tokens. There are no multi-turn pauses or tool calls; the model simply \"thinks\" and outputs.",
    models: "GLM-5 (Reasoning), Kimi K2.5 (Reasoning), DeepSeek-V3.2 Speciale",
    dataset: "https://huggingface.co/datasets/opencompass/AIME2025",
    githubUrl: "https://github.com/kubernetes-sigs/inference-perf/tree/main/workload-catalog/reasoning",
    variables: {
      isl: "1000, 5000 (median, max)",
      islNewPerTurn: "-",
      osl: "8000, 32000 (median, max)",
      distribution: "Exponential",
      multiTurn: "No",
      turnsMean: "1",
      systemPrompt: "250",
      timeBetweenTurns: "-",
      modelTemperature: "0.6",
      serverOptimizations: "P/D disaggregation"
    }
  },
  {
    id: "batch-summarization",
    title: "Batch Summarization (Stateless RAG)",
    description: "A single-turn batch job processing massive distinct documents, serving as a pure compute-bound prefill stress test that relies on prefix-aware routing to deduplicate system prompts.",
    narrative: "A batch job processing massive, distinct corporate documents (up to 50,000 tokens) to produce a short 500-token summary. Because it is stateless and single-turn, the KV cache is immediately discarded after the generation completes.",
    models: "Qwen3-8B, Gemma 4 31B, Devstral Small 2",
    dataset: "https://huggingface.co/datasets/caskcsg/LongBench-Pro",
    githubUrl: "https://github.com/kubernetes-sigs/inference-perf/tree/main/workload-catalog/batch-summarization-rag",
    variables: {
      isl: "15000, 80000 (mean, max)",
      islNewPerTurn: "-",
      osl: "500, 2000 (mean, max)",
      distribution: "Bimodal",
      multiTurn: "No",
      turnsMean: "1",
      systemPrompt: "500",
      timeBetweenTurns: "-",
      modelTemperature: "0.0",
      serverOptimizations: "Prefix aware routing, KV offloading"
    }
  },
  {
    id: "synthetic-data-generation",
    title: "Synthetic Data Generation (High-Throughput Batch)",
    description: "Represents massive-scale, asynchronous batch jobs generating synthetic data, serving as the ultimate throughput-maximization stress test that relies on P/D disaggregation and tiered KV caching to process massive unique contexts.",
    narrative: "Represents massive-scale, asynchronous batch jobs designed to generate synthetic training data. Researchers submit millions of rows of seed data or prompts. Unlike interactive workloads, this is entirely throughput-oriented.",
    models: "Qwen3-Coder-480B, DeepSeek-V3.2, GLM-5",
    dataset: "https://huggingface.co/datasets/HuggingFaceTB/cosmopedia",
    githubUrl: "https://github.com/kubernetes-sigs/inference-perf/tree/main/workload-catalog/batch-synthetic-data-generation",
    variables: {
      isl: "500, 15000 (mean, max)",
      islNewPerTurn: "-",
      osl: "4000, 8000 (mean, max)",
      distribution: "Log-Normal",
      multiTurn: "No",
      turnsMean: "1",
      systemPrompt: "4000",
      timeBetweenTurns: "-",
      modelTemperature: "0.7",
      serverOptimizations: "P/D disaggregation, Prefix aware routing, Tiered KV cache, Wide Expert Parallelism, Fault-tolerant queueing"
    }
  }
];
