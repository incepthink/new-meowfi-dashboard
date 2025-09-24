import React from "react";
import { Box } from "@mui/material";
import { StatCard } from "@/components/ui/StatCard";
import {
  People,
  EmojiEvents,
  CalendarToday,
  Schedule,
} from "@mui/icons-material";
import { GlobalStats } from "@/types/user";

interface StatsGridProps {
  stats: GlobalStats;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Users"
        value={parseInt(stats.total_users).toLocaleString()}
        color="blue"
        icon={<People />}
      />

      <StatCard
        title="Total Points"
        value={parseInt(stats.total_points_distributed).toLocaleString()}
        color="green"
        icon={<EmojiEvents />}
      />

      <StatCard
        title="Current Week"
        value={stats.current_week_number}
        color="purple"
        icon={<CalendarToday />}
      />

      <StatCard
        title="Last Snapshot"
        value={`${stats.last_snapshot_hour}h ago`}
        color="orange"
        icon={<Schedule />}
      />
    </Box>
  );
};
