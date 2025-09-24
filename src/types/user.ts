export interface User {
  id: string;
  current_balance_wei: number;
  current_balance: string;
  current_tier: number;
  total_points_earned: string;
  last_update_timestamp: string;
}

export interface GlobalStats {
  total_users: string;
  total_points_distributed: string;
  current_week_number: string;
  last_snapshot_hour: string;
}

export interface GetUsersResponse {
  users: User[];
  totalUsers: number;
  globalStats?: GlobalStats;
}

export interface UsersQueryParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  search?: string;
  tierFilter?: number | null;
}

export interface FormattedUser {
  id: string;
  address: string;
  balance: string;
  tier: number;
  totalPoints: string;
  lastUpdate: string;
}

export type TierLevel = 0 | 1 | 2 | 3 | 4;