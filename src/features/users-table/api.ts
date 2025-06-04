import axios from 'axios';
import type { UsersApiResponse } from './types';

export interface FetchUsersParams {
  search?: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const fetchUsers = async (params: FetchUsersParams = {}): Promise<UsersApiResponse> => {
  const { search, limit = 10, skip = 0, sortBy, order } = params;
  let url = 'https://dummyjson.com/users';
  const query: Record<string, string | number | undefined> = { limit, skip };
  if (sortBy) query.sortBy = sortBy;
  if (order) query.order = order;

  if (search) {
    url = 'https://dummyjson.com/users/search';
    query.q = search;
  }

  const response = await axios.get(url, { params: query });
  return response.data as UsersApiResponse;
};
