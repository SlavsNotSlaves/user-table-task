import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTableSettingsStore } from './store';
import { fetchUsers } from './features/users-table/api';
import type { UsersApiResponse } from './features/users-table/types';
import UserSearch from './components/UserSearch';
import Layout from './components/Layout';
import { UserTable, Pagination } from './features/users-table/components';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { visibleColumns, restore } = useTableSettingsStore();

  useEffect(() => {
    restore();
    // eslint-disable-next-line
  }, []);

  const { data, isLoading, error } = useQuery<UsersApiResponse>({
    queryKey: ['users', { search: debouncedSearch, page, limit }],
    queryFn: () => fetchUsers({ search: debouncedSearch, limit, skip: (page - 1) * limit }),
  });

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow p-4 mt-4 flex flex-col flex-1 min-h-0">
        <UserSearch value={search} onChange={setSearch} />
        <UserTable
          users={data?.users || []}
          visibleColumns={visibleColumns}
          isLoading={isLoading}
          error={error}
        />
        <div className="pt-4 flex-shrink-0">
          <Pagination
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            total={data?.total || 0}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
