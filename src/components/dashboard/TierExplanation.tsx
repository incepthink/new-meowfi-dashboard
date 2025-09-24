import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface TierExplanationProps {
  onTierFilter?: (tier: number | null) => void;
  selectedTier?: number | null;
}

const TierExplanation: React.FC<TierExplanationProps> = ({
  onTierFilter,
  selectedTier = null,
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const allTiers = [
    {
      level: null,
      name: "All Tiers",
      range: "All Users",
      color: "#374151",
      gradient: "linear-gradient(135deg, #374151 0%, #6b7280 100%)",
    },
    {
      level: 0,
      name: "Basic",
      range: "0-10 SPIKE",
      color: "#6b7280",
      gradient: "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)",
    },
    {
      level: 1,
      name: "Bronze",
      range: "10-30 SPIKE",
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    },
    {
      level: 2,
      name: "Silver",
      range: "30-100 SPIKE",
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    },
    {
      level: 3,
      name: "Gold",
      range: "100-500 SPIKE",
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    },
    {
      level: 4,
      name: "Platinum",
      range: "500+ SPIKE",
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    },
  ];

  const handleTierFilter = (tier: number | null) => {
    if (onTierFilter) {
      onTierFilter(tier);
    }
  };

  return (
    <Card className="mb-6 overflow-hidden shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <Typography
          variant="h6"
          className="font-semibold! text-gray-800! mb-6! text-center"
        >
          Filter by Tier
        </Typography>

        <Box
          className={`grid ${
            isLargeScreen ? "grid-cols-6" : "grid-cols-2 md:grid-cols-3"
          } gap-4`}
        >
          {allTiers.map((tier) => (
            <Box
              key={tier.level === null ? "all" : tier.level}
              className={`flex flex-col items-center text-center p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                selectedTier === tier.level
                  ? "bg-blue-50 border-2 border-blue-300 shadow-lg transform scale-105"
                  : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200 hover:shadow-md"
              }`}
              onClick={() => handleTierFilter(tier.level)}
            >
              <Chip
                label={tier.level === null ? "All" : `Tier ${tier.level}`}
                sx={{
                  background: tier.gradient,
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  mb: 2,
                  minWidth: "80px",
                  height: "32px",
                  boxShadow:
                    selectedTier === tier.level
                      ? "0 4px 8px rgba(0,0,0,0.2)"
                      : "0 2px 4px rgba(0,0,0,0.1)",
                  transform:
                    selectedTier === tier.level ? "translateY(-1px)" : "none",
                  transition: "all 0.2s ease",
                }}
              />
              <Typography
                variant="body2"
                className={`font-semibold mb-1 ${
                  selectedTier === tier.level
                    ? "text-blue-800"
                    : "text-gray-700"
                }`}
              >
                {tier.name}
              </Typography>
              <Typography
                variant="caption"
                className={`font-medium ${
                  selectedTier === tier.level
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {tier.range}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Active Filter Display */}
        {/* {selectedTier !== null && (
          <Box className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <Typography
              variant="body2"
              className="text-blue-800 font-semibold text-center"
            >
              Showing: {allTiers.find((t) => t.level === selectedTier)?.name}
              <span className="text-blue-600 ml-2 font-normal">
                ({allTiers.find((t) => t.level === selectedTier)?.range})
              </span>
            </Typography>
          </Box>
        )} */}
      </CardContent>
    </Card>
  );
};

export default TierExplanation;
