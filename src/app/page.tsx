"use client";

import React, { useState } from "react";
import {
  Container,
  TablePagination,
  CircularProgress,
  Alert,
  Typography,
  Box,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { theme } from "@/theme/theme";
import { useUsers } from "@/hooks/useUsers";
import { usePagination } from "@/hooks/usePagination";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { UsersTable } from "@/components/dashboard/UsersTable";
import TierExplanation from "@/components/dashboard/TierExplanation";

// Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const UsersPageContent: React.FC = () => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination(0, 25);

  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const { data, isLoading, error } = useUsers({
    page: page + 1, // Convert to 1-based for API
    limit: rowsPerPage,
    sortBy: "total_points_earned",
    sortOrder: "desc",
    tierFilter: selectedTier,
  });

  const { users = [], totalUsers = 0, globalStats } = data || {};

  const handleTierFilter = (tier: number | null) => {
    setSelectedTier(tier);
    // Reset to first page when filtering
    handleChangePage(null, 0);
  };

  if (isLoading && users.length === 0) {
    return (
      <Container maxWidth="xl" className="py-8">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
          flexDirection="column"
          gap={2}
        >
          <CircularProgress size={40} />
          <Typography variant="h6" className="text-gray-600">
            Loading users...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" className="py-8">
        <Alert severity="error" className="mb-6">
          {error instanceof Error
            ? error.message
            : "An error occurred while fetching users"}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="py-8">
      <DashboardHeader totalUsers={totalUsers} />

      {globalStats && <StatsGrid stats={globalStats} />}

      <TierExplanation
        onTierFilter={handleTierFilter}
        selectedTier={selectedTier}
      />

      <UsersTable
        users={users}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={isLoading}
      />

      <TablePagination
        component="div"
        count={totalUsers}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        className="border-t bg-gray-50/50 mt-4"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} of ${count !== -1 ? count : `more than ${to}`} users`
        }
      />

      {isLoading && users.length > 0 && (
        <Box display="flex" justifyContent="center" className="mt-4">
          <CircularProgress size={24} />
          <Typography variant="body2" className="ml-2 text-gray-600">
            Updating...
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default function UsersPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UsersPageContent />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
