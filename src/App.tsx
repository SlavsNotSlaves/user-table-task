import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from './features/users-table/api';

function App() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;


  return (
    <>
      <div>Users count: {users?.length ?? 0}</div>
    </>
  );
}

export default App;
