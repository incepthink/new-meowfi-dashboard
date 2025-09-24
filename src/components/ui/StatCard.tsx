import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { colors } from "@/theme/colors";

interface StatCardProps {
  title: string;
  value: string | number;
  color: "blue" | "green" | "purple" | "orange";
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorMap = {
  blue: colors.brand,
  green: colors.success,
  purple: { ...colors.brand, 500: "#8b5cf6", 600: "#7c3aed" },
  orange: colors.warning,
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  color,
  icon,
  trend,
}) => {
  const colorScheme = colorMap[color];

  return (
    <Card
      className="overflow-hidden relative"
      sx={{
        background: `linear-gradient(135deg, ${colorScheme[500]} 0%, ${colorScheme[600]} 100%)`,
        color: "white",
        minWidth: 200,
        flex: 1,
      }}
    >
      <CardContent className="relative">
        <Box className="flex items-center justify-between mb-2">
          <Typography variant="h6" className="font-medium opacity-90">
            {title}
          </Typography>
          {icon && <Box className="opacity-75">{icon}</Box>}
        </Box>

        <Typography variant="h4" className="font-bold mb-1">
          {typeof value === "number" ? value.toLocaleString() : value}
        </Typography>

        {trend && (
          <Typography
            variant="body2"
            className={`font-medium ${
              trend.isPositive ? "text-green-200" : "text-red-200"
            }`}
          >
            {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
          </Typography>
        )}

        {/* Decorative background element */}
        <Box
          className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10"
          sx={{ backgroundColor: "white" }}
        />
      </CardContent>
    </Card>
  );
};
