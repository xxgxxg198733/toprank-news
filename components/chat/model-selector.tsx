"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProviderBadge } from "@/components/shared/provider-badge";

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  category: string;
}

interface Props {
  models: ModelInfo[];
  providers: { id: string; name: string }[];
  modelId: string;
  providerId: string;
  onModelChange: (modelId: string | null) => void;
  onProviderChange: (providerId: string | null) => void;
}

export function ModelSelector({
  models,
  providers,
  modelId,
  providerId,
  onModelChange,
  onProviderChange,
}: Props) {
  const chatModels = models.filter((m) => m.category !== "image");
  const providerModels = chatModels.filter((m) => m.provider === providerId);

  return (
    <div className="flex items-center gap-2">
      <Select value={providerId} onValueChange={onProviderChange}>
        <SelectTrigger className="h-7 w-[100px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {providers.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              <div className="flex items-center gap-1.5">
                <ProviderBadge provider={p.id} />
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={modelId} onValueChange={onModelChange}>
        <SelectTrigger className="h-7 w-[120px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {providerModels.map((m) => (
            <SelectItem key={m.id} value={m.id}>
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
