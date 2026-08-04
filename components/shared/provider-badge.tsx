const providerColors: Record<string, string> = {
  deepseek: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  openai: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  anthropic: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  google: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const providerNames: Record<string, string> = {
  deepseek: "DeepSeek",
  openai: "OpenAI",
  anthropic: "Claude",
  google: "Gemini",
};

export function ProviderBadge({ provider }: { provider: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
        providerColors[provider] || "bg-gray-100 text-gray-700"
      }`}
    >
      {providerNames[provider] || provider}
    </span>
  );
}
