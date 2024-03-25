'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTableRowActions } from './TableColumn';

interface DataTableProps<TData, TValue> {
  data: TData[];
  isLoading?: boolean;
  refetch: () => void;
}

export function QuestionTable<TData, TValue>({
  isLoading,
  data,
  refetch,
}: DataTableProps<TData, TValue>) {
  const columns: ColumnDef<any>[] = [
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
      cell: ({ row }) => <DataTableRowActions row={row} refetch={refetch} />,
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full ">
      <div className="rounded-md">
        <Table data-testid="question-table">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="pl-3 bg-[#FAFAFA] " key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="py-4" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from(Array(10).keys()).map((id) => (
                <TableRow key={id}>
                  {Array.from(Array(3).keys()).map((row) => (
                    <TableCell key={row} className="py-6 pl-2 pr-3">
                      <div className="w-full h-4 rounded-md animate-pulse bg-slate-200" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (table?.getRowModel()?.rows ?? []).length !== 0 ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data && data?.length > 0 && (
        <div className="flex items-center justify-end space-x-2 px-5 pt-5 border-t">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
