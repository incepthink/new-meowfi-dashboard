// Next.js API route to get all users data
import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';

// Replace with your actual indexer GraphQL endpoint
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/v1/graphql';

// Create GraphQL client instance
const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers($limit: Int, $offset: Int, $orderBy: [User_order_by!], $where: User_bool_exp) {
    User(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      id
      current_balance_wei
      current_balance
      current_tier
      total_points_earned
      last_update_timestamp
    }
  }
`;

 const GET_USER_COUNT_QUERY = gql`
  query MyQuery {
  User_aggregate {
    count
  }
}
`;

const GET_GLOBAL_STATS_QUERY = gql`
  query GetGlobalStats {
    GlobalStats(where: { id: { _eq: "global" } }) {
      id
      total_users
      total_points_distributed
      current_week_number
      last_snapshot_hour
      tier_distribution
    }
  }
`;

interface User {
  id: string;
  current_balance_wei: string;
  current_balance: string;
  current_tier: number;
  total_points_earned: string;
  last_update_timestamp: string;
}

interface GlobalStats {
  id: string;
  total_users: string;
  total_points_distributed: string;
  current_week_number: string;
  last_snapshot_hour: string;
  tier_distribution: string;
}

interface GetUsersResponse {
  users: User[];
  totalUsers: number;
  globalStats?: GlobalStats;
}

interface ApiError {
  error: string;
  message: string;
}

interface GetUsersRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  tierFilter?: number | null;
}

export async function POST(request: NextRequest) {
  try {
    const body: GetUsersRequest = await request.json();
    
    // Pagination parameters with defaults
    const page = body.page || 1;
    const limit = body.limit || 50;
    const offset = (page - 1) * limit;
    
    // Sorting parameters with defaults
    const sortBy = body.sortBy || 'total_points_earned';
    const sortOrder = body.sortOrder || 'desc';
    const tierFilter = body.tierFilter;
    
    // Build order by clause
    const orderBy = [{ [sortBy]: sortOrder }];
    
    // Build where clause for tier filtering
    let whereClause = {};
    if (tierFilter !== null && tierFilter !== undefined) {
      whereClause = {
        current_tier: { _eq: tierFilter }
      };
    }
    
    // Execute queries
    const [usersResult, globalStatsResult] = await Promise.all<any>([
      graphqlClient.request(GET_ALL_USERS_QUERY, {
        limit,
        offset,
        orderBy,
        where: whereClause
      }),
      graphqlClient.request(GET_GLOBAL_STATS_QUERY)
    ]);
    
    const users: User[] = usersResult.User || [];
    const globalStats: GlobalStats | undefined = globalStatsResult.GlobalStats?.[0];
    
    // Calculate totalUsers based on tier filtering
    let totalUsers: number;
    
    if (tierFilter !== null && tierFilter !== undefined) {
      // Parse tier_distribution from global stats if available
      // Assuming tier_distribution is a JSON string like: {"0": 1000, "1": 2500, "2": 1200, "3": 800, "4": 500}
      if (globalStats?.tier_distribution) {
        try {
          const tierDistribution = JSON.parse(globalStats.tier_distribution);
          totalUsers = tierDistribution[tierFilter.toString()] || 0;
        } catch (error) {
          console.error('Error parsing tier_distribution:', error);
          // Fallback: estimate based on current results
          totalUsers = users.length < limit ? users.length : users.length * 10; // rough estimate
        }
      } else {
        // Fallback if no tier_distribution available
        totalUsers = users.length < limit ? users.length : users.length * 10; // rough estimate
      }
    } else {
      // No filter, use total users from global stats
      totalUsers = parseInt(globalStats?.total_users || '0');
    }
    
    const response: GetUsersResponse = {
      users,
      totalUsers,
      globalStats
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    
    const errorResponse: ApiError = {
      error: 'FETCH_USERS_FAILED',
      message: error instanceof Error ? error.message : 'Failed to fetch users data'
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}