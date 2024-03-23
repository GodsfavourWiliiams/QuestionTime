import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/assets/icons';
import { CaretSortIcon } from '@radix-ui/react-icons';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'question',
    header: 'Question',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('question')}</div>
    ),
  },
  {
    accessorKey: 'no_options',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Options
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('no_options')}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-40">
          <span>{row.getValue('date')}</span>
        </div>
      );
    },
  },
  {
    id: 'action',
    enableHiding: false,
    header: () => (
      <span className="w-full flex justify-end text-xs">Action</span>
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

interface DataTableRowActionsProps {
  row: any;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  return (
    <div className="flex items-center gap-2 justify-end w-full">
      <Button
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex h-8 w-8 p-0 hover:bg-[#1c3267]/80 bg-[#1c3267]"
      >
        <Icons.EditIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex h-8 w-8 p-0 hover:bg-[#E03137]/80 bg-[#E03137] "
      >
        <Icons.DeleteIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
