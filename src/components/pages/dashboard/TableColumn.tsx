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
    header: 'Options',
    cell: ({ row }) => (
      <div className="ml-6">{row.original?.options.length}</div>
    ),
  },
  {
    id: 'action',
    enableHiding: false,
    header: () => (
      <span className="w-full flex justify-end text-xs">Actions</span>
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
        <Icons.DeleteIcon className="w-4 h-4 text-white" />
      </Button>
    </div>
  );
}
