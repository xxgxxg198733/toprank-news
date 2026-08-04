import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Zicisi AI Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 max-w-3xl py-12">
      <h1 className="text-3xl font-extrabold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: August 2026</p>

      <div className="prose dark:prose-invert max-w-none space-y-6">
        <h2>1. Information Collection</h2>
        <p>
          Zicisi AI does not actively collect your personal information. Conversations and generated content are not stored on our servers. Your API keys are only used to forward requests to your chosen AI provider.
        </p>

        <h2>2. API Key Security</h2>
        <p>
          Your AI provider API keys are stored only in your local or Vercel environment variables. All AI requests are proxied through server-side API routes, and API keys are never exposed to the browser.
        </p>

        <h2>3. Third-Party Services</h2>
        <p>
          When using AI tools, your requests are forwarded to the corresponding AI provider (such as OpenAI, Anthropic, Google, DeepSeek, ByteDance). Each provider has its own privacy policy — we recommend reviewing their privacy terms.
        </p>

        <h2>4. Cookies</h2>
        <p>
          We may use necessary cookies to save your preferences (such as dark mode). Not used for tracking or advertising purposes.
        </p>

        <h2>5. Contact</h2>
        <p>
          For any privacy questions, please contact us via GitHub Issues: github.com/xxgxxg198733/toprank-news
        </p>
      </div>
    </div>
  );
}
