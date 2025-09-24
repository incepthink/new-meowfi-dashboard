import React from "react";
import { Box } from "@mui/material";

interface RankBadgeProps {
  rank: number;
}

export const RankBadge: React.FC<RankBadgeProps> = ({ rank }) => {
  const getGradient = (rank: number) => {
    if (rank <= 3) return "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)";
    if (rank <= 10) return "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)";
    if (rank <= 50) return "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
    return "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)";
  };

  return (
    <Box
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
      sx={{
        background: getGradient(rank),
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      }}
    >
      {rank}
    </Box>
  );
};
