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
  query GetAllUsers($limit: Int, $offset: Int, $orderBy: [User_order_by!]) {
    User(limit: $limit, offset: $offset, order_by: $orderBy) {
      id
      current_balance_wei
      current_balance
      current_tier
      total_points_earned
      last_update_timestamp
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

// GET /api/users - Fetch all users with pagination
interface GetUsersRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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
    
    // Build order by clause
    const orderBy = [{ [sortBy]: sortOrder }];
    
    // Execute queries in parallel
    const [usersResult, countResult, globalStatsResult] = await Promise.all<any>([
      graphqlClient.request(GET_ALL_USERS_QUERY, {
        limit,
        offset,
        orderBy
      }),
      // graphqlClient.request(GET_USER_COUNT_QUERY),
      {},
      graphqlClient.request(GET_GLOBAL_STATS_QUERY)
    ]);
    
    console.log(usersResult);
    console.log(countResult);
    console.log(globalStatsResult);
    
    const users: User[] = usersResult.User || [];
    const totalUsers: number = globalStatsResult.GlobalStats?.[0].total_users || 0;
    const globalStats: GlobalStats | undefined = globalStatsResult.GlobalStats?.[0];
    
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

