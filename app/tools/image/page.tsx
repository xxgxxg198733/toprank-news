import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { ImageGenerator } from "@/components/image/image-generator";

export const metadata: Metadata = {
  title: "Image Generation",
  description: "AI Image Generator — create stunning images from text descriptions. Multiple styles and sizes.",
};

export default function ImagePage() {
  return (
    <ToolShell>
      <div>
        <h2 className="text-xl font-bold mb-1">Image Generation</h2>
        <p className="text-sm text-muted-foreground mb-4">
          AI Image Generation from Text · Multiple Sizes
        </p>
        <ImageGenerator />
      </div>
    </ToolShell>
  );
}
