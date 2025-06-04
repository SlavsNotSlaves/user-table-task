import axios from 'axios';
import type { User } from './types';

export const fetchUsers = async (search?: string): Promise<User[]> => {
  const params = search ? { q: search } : {};
  const response = await axios.get('https://dummyjson.com/users', { params });
  const data = response.data as { users: User[] };
  return data.users;
};
