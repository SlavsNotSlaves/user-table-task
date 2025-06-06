export interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  gender: string;
  [key: string]: any;
}

export interface UsersApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
