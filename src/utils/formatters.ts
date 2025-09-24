import { User, FormattedUser, TierLevel } from '@/types/user';

export const formatUserData = (user: User): FormattedUser => {
  return {
    id: user.id,
    address: user.id,
    balance: parseFloat(user.current_balance).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }),
    tier: user.current_tier,
    totalPoints: parseFloat(user.total_points_earned).toLocaleString('en-US'),
    lastUpdate: user.last_update_timestamp
  };
};

export const getTierName = (tier: TierLevel): string => {
  const tierNames = {
    0: 'Basic',
    1: 'Bronze',
    2: 'Silver', 
    3: 'Gold',
    4: 'Platinum'
  };
  return tierNames[tier] || 'Unknown';
};

export const formatAddress = (address: string): string => {
  if (!address || address.length < 14) return address;
  return `${address.slice(0, 8)}...${address.slice(-6)}`;
};
export const formatRelativeTime = (dateString: string): string => {
  // Convert string timestamp to number, handle both seconds and milliseconds
  const timestamp = parseInt(dateString);
  
  // If timestamp is less than year 2000 in milliseconds (946684800000), 
  // assume it's in seconds and convert to milliseconds
  const timestampMs = timestamp < 946684800000 ? timestamp * 1000 : timestamp;
  
  const date = new Date(timestampMs);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Unknown';
  }
  
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};

export const formatFullDateTime = (dateString: string): string => {
  // Convert string timestamp to number, handle both seconds and milliseconds
  const timestamp = parseInt(dateString);
  
  // If timestamp is less than year 2000 in milliseconds, assume it's in seconds
  const timestampMs = timestamp < 946684800000 ? timestamp * 1000 : timestamp;
  
  const date = new Date(timestampMs);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};

