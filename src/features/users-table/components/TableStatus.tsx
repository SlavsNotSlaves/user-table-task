import React from 'react';

interface TableStatusProps {
  status: 'loading' | 'error' | 'empty';
  colSpan: number;
}

const statusAssets = {
  loading: {
    img: '/fallback/Loader.png',
    alt: 'Loading',
    text: 'Loading...'
  },
  error: {
    img: '/fallback/Error.png',
    alt: 'Error',
    text: 'Oops, something went wrong'
  },
  empty: {
    img: '/fallback/NotFound.png',
    alt: 'No data',
    text: 'Not Found'
  }
};

const TableStatus: React.FC<TableStatusProps> = ({ status, colSpan }) => {
  const asset = statusAssets[status];

  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center py-10">
          <img src={asset.img} alt={asset.alt} style={{ width: 64, height: 64, marginBottom: 16 }} />
          <div
            style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: 20,
              lineHeight: '20px',
              letterSpacing: 0,
              textAlign: 'center',
              textTransform: 'capitalize',
              color: status === 'error' ? '#ef4444' : '#6b7280',
            }}
          >
            {asset.text}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableStatus;
