import React from "react";
import { Typography, Box } from "@mui/material";

interface DashboardHeaderProps {
  totalUsers: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  totalUsers,
}) => {
  return (
    <Box className="mb-6">
      <Typography
        variant="h4"
        component="h1"
        className="font-bold text-white mb-2"
      >
        SPIKE Users Dashboard
      </Typography>
      <Typography variant="subtitle1" className="text-gray-200">
        Total users: {totalUsers.toLocaleString()}
      </Typography>
    </Box>
  );
};
