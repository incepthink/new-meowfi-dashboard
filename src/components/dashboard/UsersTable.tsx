import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import { RankBadge } from "@/components/ui/RankBadge";
import { AddressDisplay } from "@/components/ui/AddressDisplay";
import { TierChip } from "@/components/ui/TierChip";
import {
  formatUserData,
  formatRelativeTime,
  formatFullDateTime,
} from "@/utils/formatters";
import { User } from "@/types/user";

interface UsersTableProps {
  users: User[];
  page: number;
  rowsPerPage: number;
  loading?: boolean;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  page,
  rowsPerPage,
  loading = false,
}) => {
  if (users.length === 0 && !loading) {
    return (
      <Paper className="p-8 text-center">
        <Typography variant="h6" className="text-gray-500">
          No users found
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} className="overflow-hidden border border-gray-200">
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Balance (WMON)</TableCell>
              <TableCell align="center">Tier</TableCell>
              <TableCell align="right">Total Points</TableCell>
              <TableCell>Last Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => {
              const formatted = formatUserData(user);
              if (index === 0) {
                console.log("First user formatted data:", formatted);
              }
              const rank = page * rowsPerPage + index + 1;

              return (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <TableCell>
                    <RankBadge rank={rank} />
                  </TableCell>

                  <TableCell>
                    <AddressDisplay address={formatted.address} />
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      className="font-mono text-base font-semibold"
                    >
                      {formatted.balance}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <TierChip tier={formatted.tier as any} />
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body1" className="font-bold text-lg">
                      {formatted.totalPoints}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box>
                      <Typography variant="body2" className="font-medium">
                        {formatRelativeTime(formatted.lastUpdate)}
                      </Typography>
                      <Tooltip title={formatFullDateTime(formatted.lastUpdate)}>
                        <Typography
                          variant="caption"
                          className="text-gray-500 cursor-help"
                        >
                          {(() => {
                            const timestamp = parseInt(formatted.lastUpdate);
                            const timestampMs =
                              timestamp < 946684800000
                                ? timestamp * 1000
                                : timestamp;
                            const date = new Date(timestampMs);
                            return isNaN(date.getTime())
                              ? "Invalid Date"
                              : date.toLocaleDateString();
                          })()}
                        </Typography>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
