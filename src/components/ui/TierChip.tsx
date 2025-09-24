// components/ui/TierChip.tsx
import React from "react";
import { Chip } from "@mui/material";

interface TierChipProps {
  tier: number;
  size?: "small" | "medium";
}

const getTierName = (tier: number): string => {
  const tierNames: { [key: number]: string } = {
    0: "Basic",
    1: "Bronze",
    2: "Silver",
    3: "Gold",
    4: "Platinum",
  };
  return tierNames[tier] || `Tier ${tier}`;
};

const getTierConfig = (tier: number) => {
  const tierConfigs: { [key: number]: { gradient: string; text: string } } = {
    0: {
      gradient: "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)",
      text: "#f9fafb",
    },
    1: {
      gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
      text: "#ffffff",
    },
    2: {
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
      text: "#ffffff",
    },
    3: {
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
      text: "#ffffff",
    },
    4: {
      gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
      text: "#ffffff",
    },
  };

  return tierConfigs[tier] || tierConfigs[0]; // Default to tier 0 config
};

export const TierChip: React.FC<TierChipProps> = ({ tier, size = "small" }) => {
  const tierConfig = getTierConfig(tier);

  return (
    <Chip
      label={getTierName(tier)}
      size={size}
      sx={{
        background: tierConfig.gradient,
        color: tierConfig.text,
        fontWeight: 600,
        fontSize: size === "small" ? "0.75rem" : "0.875rem",
        border: "none",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        "& .MuiChip-label": {
          paddingX: size === "small" ? 1.5 : 2,
        },
      }}
    />
  );
};
