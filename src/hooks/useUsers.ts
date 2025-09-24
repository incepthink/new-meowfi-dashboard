import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { UsersQueryParams, GetUsersResponse } from '@/types/user';

const fetchUsers = async (params: UsersQueryParams): Promise<GetUsersResponse> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const useUsers = (
  params: UsersQueryParams,
  options?: Omit<UseQueryOptions<GetUsersResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes (previously cacheTime)
    ...options,
  });
};