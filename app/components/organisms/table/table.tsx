import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import { nodes } from './data';

const TableComponent: React.FC = () => {
  const data = { nodes };

  const theme = useTheme(getTheme());

  const COLUMNS = [
    { label: 'Task', renderCell: (item: any) => item.name },
    {
      label: 'Deadline',
      renderCell: (item: any) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Type', renderCell: (item: any) => item.type },
    {
      label: 'Complete',
      renderCell: (item: any) => item.isComplete.toString(),
    },
    { label: 'Subtareas', renderCell: (item: any) => item.nodes?.length || 0 },
  ];

  return (
    <div className="w-full">
      <CompactTable columns={COLUMNS} data={data} theme={theme} />
    </div>
  );
};

export default TableComponent;