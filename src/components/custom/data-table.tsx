import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    useReactTable,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import * as React from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    Cross2Icon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    PlusCircledIcon
} from "@radix-ui/react-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    searchPlaceholder?: string;
    hiddenColumnIds?: string[];
    handleAdd?: () => void;
    addPlaceholder?: string;
    isAdding?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    isAdding = false,
    data,
    addPlaceholder = "Add New",
    searchKey = "",
    hiddenColumnIds = [],
    searchPlaceholder = "Search...",
    handleAdd
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState({});

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
        const initial: VisibilityState = {};
        hiddenColumnIds?.forEach((id) => {
            initial[id] = false;
        });
        return initial;
    });

    const table = useReactTable({
        data,
        columns,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
                    <div className="flex gap-1">
                        <Input
                            placeholder={searchPlaceholder}
                            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn(searchKey)?.setFilterValue(event.target.value)
                            }
                            className="h-8 w-[150px] lg:w-[250px]"
                        />
                    </div>
                    {isAdding && handleAdd && (
                        <Button
                            variant='outline'
                            size='sm'
                            className='ml-auto hidden h-8 lg:flex'
                            onClick={() => handleAdd()}
                        >
                            <PlusCircledIcon className='mr-2 h-4 w-4' />
                            {addPlaceholder}
                        </Button>
                    )}
                    {isFiltered && (
                        <Button
                            variant='secondary'
                            onClick={() => table.resetColumnFilters()}
                            className='h-8 px-2 lg:px-3'
                        >
                            Reset
                            <Cross2Icon className='ml-2 h-4 w-4' />
                        </Button>
                    )}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Columns
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <div className="flex gap-2 p-2 border-b">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs"
                                onClick={() => {
                                    table.getAllColumns()
                                        .filter(column => column.getCanHide())
                                        .forEach(column => column.toggleVisibility(true));
                                }}
                            >
                                Select All
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs"
                                onClick={() => {
                                    table.getAllColumns()
                                        .filter(column => column.getCanHide())
                                        .forEach(column => column.toggleVisibility(false));
                                }}
                            >
                                Unselect All
                            </Button>
                        </div>
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {typeof column.columnDef.header === "string"
                                            ? column.columnDef.header
                                            : /^[A-Z0-9]+$/.test(column.id)
                                                ? column.id
                                                : column.id.replace(/([a-z])([A-Z])/g, '$1 $2').trim()
                                        }
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-lg border bg-card shadow-sm">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-muted/30">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="font-semibold">
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
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-muted/20 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className='flex items-center justify-between overflow-auto px-2'>
                <div className='hidden flex-1 text-sm text-muted-foreground sm:block'>
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className='flex items-center sm:space-x-6 lg:space-x-8'>
                    <div className='flex items-center space-x-2'>
                        <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger className='h-8 w-[70px]'>
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side='top'>
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Button
                            variant='outline'
                            className='hidden h-8 w-8 p-0 lg:flex'
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className='sr-only'>Go to first page</span>
                            <DoubleArrowLeftIcon className='h-4 w-4' />
                        </Button>
                        <Button
                            variant='outline'
                            className='h-8 w-8 p-0'
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className='sr-only'>Go to previous page</span>
                            <ChevronLeftIcon className='h-4 w-4' />
                        </Button>
                        <Button
                            variant='outline'
                            className='h-8 w-8 p-0'
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className='sr-only'>Go to next page</span>
                            <ChevronRightIcon className='h-4 w-4' />
                        </Button>
                        <Button
                            variant='outline'
                            className='hidden h-8 w-8 p-0 lg:flex'
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className='sr-only'>Go to last page</span>
                            <DoubleArrowRightIcon className='h-4 w-4' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
